import { createClient } from "@/lib/supabase/server";
export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price: number | null;
  short_description: string | null;
  product_images: { storage_path: string; is_primary: boolean }[];
};
export async function getProducts(q = "", limit = 24) {
  const db = await createClient();
  let query = db
    .from("products")
    .select(
      "id,name,slug,price,compare_at_price,short_description,product_images(storage_path,is_primary)",
    )
    .eq("active", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);
  if (q) query = query.ilike("name", "%" + q.replace(/[%_]/g, "") + "%");
  const { data, error } = await query;
  return { products: (data ?? []) as Product[], error: !!error };
}
