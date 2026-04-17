import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const SHIPSTATION_V2_INVENTORY_URL = "https://api.shipstation.com/v2/inventory";
const PRIMARY_WAREHOUSE_ID = "se-241352"; // Woodspring

type ShipStationInventoryResponse = {
  inventory: Array<{
    sku: string;
    on_hand: number;
    available: number;
  }>;
};

/**
 * Vercel Cron target — polls ShipStation V2 Inventory every 10 minutes and
 * upserts into the `inventory` table. Only SKUs that already exist in
 * `products.shipstation_sku` are synced (avoids phantom rows for the
 * 4 unmapped ShipStation SKUs).
 */
export async function GET(req: Request) {
  // Vercel Cron sends an Authorization header with the project's CRON_SECRET.
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const apiKey = process.env.SHIPSTATION_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "SHIPSTATION_API_KEY not set" }, { status: 500 });
  }

  const res = await fetch(SHIPSTATION_V2_INVENTORY_URL, {
    headers: { "API-Key": apiKey },
    cache: "no-store",
  });
  if (!res.ok) {
    return Response.json(
      { error: `ShipStation ${res.status}`, body: await res.text() },
      { status: 502 },
    );
  }

  const { inventory } = (await res.json()) as ShipStationInventoryResponse;
  const supabase = createSupabaseAdminClient();

  // Pull the set of mapped SKUs so we skip unmapped ShipStation SKUs.
  const { data: mapped, error: mappedErr } = await supabase
    .from("products")
    .select("shipstation_sku")
    .not("shipstation_sku", "is", null);
  if (mappedErr) {
    return Response.json({ error: mappedErr.message }, { status: 500 });
  }
  const mappedSkus = new Set(mapped.map((p) => p.shipstation_sku));

  const syncedAt = new Date().toISOString();
  const rows = inventory
    .filter((i) => mappedSkus.has(i.sku))
    .map((i) => ({
      shipstation_sku: i.sku,
      on_hand: i.on_hand,
      available: i.available,
      warehouse_id: PRIMARY_WAREHOUSE_ID,
      synced_at: syncedAt,
    }));

  if (rows.length === 0) {
    return Response.json({ synced: 0, note: "no mapped SKUs found" });
  }

  const { error: upsertErr } = await supabase
    .from("inventory")
    .upsert(rows, { onConflict: "shipstation_sku" });
  if (upsertErr) {
    return Response.json({ error: upsertErr.message }, { status: 500 });
  }

  return Response.json({
    synced: rows.length,
    total_from_shipstation: inventory.length,
    skipped_unmapped: inventory.length - rows.length,
    synced_at: syncedAt,
  });
}
