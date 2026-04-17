import { getProducts, toLegacyProduct } from "@/lib/catalog";
import { ShopContent } from "./_components/shop-content";

export const revalidate = 60; // re-fetch catalog every 60 seconds

export default async function ShopPage() {
  const rows = await getProducts();
  const products = rows.map((row) => ({
    ...toLegacyProduct(row),
    available: row.available,
  }));

  return <ShopContent products={products} />;
}
