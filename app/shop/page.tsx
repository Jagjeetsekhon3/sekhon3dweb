import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProductGrid } from "@/components/product-grid";
import { getProducts } from "@/lib/catalog";
import { Icon } from "@/components/icon";
export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const { products, error } = await getProducts(q);
  return (
    <>
      <Navigation />
      <main className="storefront inner-page">
        <div className="page-heading">
          <p className="eyebrow">THE STUDIO COLLECTION</p>
          <h1>
            Objects with <em>character.</em>
          </h1>
          <p>
            Thoughtfully designed. Layer by layer. Find something that feels
            like you.
          </p>
        </div>
        <div className="catalog-toolbar">
          <span>
            {products.length} {products.length === 1 ? "object" : "objects"}
          </span>
          <form className="search-form" action="/shop">
            <Icon name="search" />
            <input
              id="catalog-search"
              aria-label="Search products"
              name="q"
              defaultValue={q}
              placeholder="Find your next favourite…"
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <ProductGrid products={products} error={error} search={!!q} />
      </main>
      <Footer />
    </>
  );
}
