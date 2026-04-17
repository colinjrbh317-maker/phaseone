import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase/types";
import type { Product, ResearchGroupId, ProductBadge } from "./constants";

/**
 * Catalog reads use the publishable key and hit the public-read RLS policies
 * on `products`, `inventory`, and `restock_pipeline`. No user session needed.
 *
 * Inventory is joined in JS rather than SQL because there is no declared
 * foreign key between `products.shipstation_sku` and `inventory.shipstation_sku`
 * (products can exist without inventory, and unmapped inventory is filtered
 * out by the cron). Two queries is simpler than reshaping the schema.
 */
function publicClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false } },
  );
}

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type InventoryRow = Database["public"]["Tables"]["inventory"]["Row"];

export type CatalogProduct = ProductRow & {
  available: number | null;
  on_hand: number | null;
};

function attachInventory(
  product: ProductRow,
  inventoryByKey: Map<string, InventoryRow>,
): CatalogProduct {
  const inv = product.shipstation_sku
    ? inventoryByKey.get(product.shipstation_sku)
    : undefined;
  return {
    ...product,
    on_hand: inv?.on_hand ?? null,
    available: inv?.available ?? null,
  };
}

export async function getProducts(): Promise<CatalogProduct[]> {
  const supabase = publicClient();
  const [{ data: products, error: prodErr }, { data: inventory, error: invErr }] =
    await Promise.all([
      supabase.from("products").select("*").eq("is_active", true).order("name"),
      supabase.from("inventory").select("*"),
    ]);

  if (prodErr) throw new Error(`getProducts failed: ${prodErr.message}`);
  if (invErr) throw new Error(`getProducts inventory failed: ${invErr.message}`);

  const inventoryByKey = new Map<string, InventoryRow>(
    (inventory ?? []).map((row) => [row.shipstation_sku, row]),
  );

  return (products ?? []).map((p) => attachInventory(p, inventoryByKey));
}

export async function getProductBySlug(
  slug: string,
): Promise<CatalogProduct | null> {
  const supabase = publicClient();
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw new Error(`getProductBySlug failed: ${error.message}`);
  if (!product) return null;

  if (!product.shipstation_sku) {
    return { ...product, on_hand: null, available: null };
  }

  const { data: inventory, error: invErr } = await supabase
    .from("inventory")
    .select("*")
    .eq("shipstation_sku", product.shipstation_sku)
    .maybeSingle();

  if (invErr) throw new Error(`getProductBySlug inventory failed: ${invErr.message}`);

  return {
    ...product,
    on_hand: inventory?.on_hand ?? null,
    available: inventory?.available ?? null,
  };
}

/**
 * Map a Supabase row to the legacy `Product` shape used by existing client
 * components (cart-context, product-drawer-modal, etc.). The cart keys off
 * `sku` — we use `shipstation_sku` so downstream checkout/fulfillment has
 * the correct identifier without additional lookups.
 */
export function toLegacyProduct(row: CatalogProduct): Product {
  const dollars = row.price_cents / 100;
  const priceDisplay = `$${dollars.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })}`;
  return {
    sku: row.shipstation_sku ?? row.slug,
    slug: row.slug,
    name: row.name,
    size: row.size,
    price: dollars,
    priceDisplay,
    group: row.research_group as ResearchGroupId,
    description: row.description,
    badge: (row.badge as ProductBadge) ?? null,
    image: row.image_path,
    disclaimer: row.disclaimer,
  };
}
