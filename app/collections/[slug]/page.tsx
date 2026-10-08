import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProductGrid } from "@/components/product-grid";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/catalog";
export default async function Collection({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const db = await createClient();
  const { data: category, error: categoryError } = await db
    .from("categories")
    .select("id,name,description")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (categoryError) throw new Error("Collection unavailable");
  if (!category) notFound();
  const { data, error } = await db
    .from("products")
    .select(
      "id,name,slug,price,compare_at_price,short_description,product_images(storage_path,is_primary),product_categories!inner(category_id)",
    )
    .eq("active", true)
    .eq("product_categories.category_id", category.id)
    .order("created_at", { ascending: false });
  return (
    <>
      <Navigation />
      <main className="storefront inner-page">
        <div className="page-heading">
          <p className="eyebrow">THE STUDIO COLLECTION</p>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
        <ProductGrid products={(data ?? []) as Product[]} error={!!error} />
      </main>
      <Footer />
    </>
  );
}
