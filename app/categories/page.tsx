import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Icon } from "@/components/icon";
import { createClient } from "@/lib/supabase/server";
export default async function Categories() {
  const db = await createClient();
  const { data, error } = await db
    .from("categories")
    .select("id,name,slug,description,image_url")
    .eq("active", true)
    .order("sort_order");
  return (
    <>
      <Navigation />
      <main className="storefront inner-page">
        <div className="page-heading">
          <p className="eyebrow">CURATED BY THE STUDIO</p>
          <h1>
            A world of <em>possibilities.</em>
          </h1>
          <p>Explore the collections taking shape at Sekhon Studio.</p>
        </div>
        {data?.length ? (
          <div className="product-grid">
            {data.map((c) => (
              <Link
                href={"/collections/" + c.slug}
                className="product-card"
                key={c.id}
              >
                <div className="product-photo">
                  {c.image_url ? (
                    <Image
                      src={c.image_url}
                      alt={c.name}
                      fill
                      sizes="(max-width:600px) 50vw, 25vw"
                    />
                  ) : (
                    <Icon name="layers" width={48} height={48} />
                  )}
                </div>
                <h2>{c.name}</h2>
                <p>{c.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="catalog-empty">
            <Icon name="layers" width={36} height={36} />
            <div>
              <h3>
                {error
                  ? "Collections are temporarily unavailable"
                  : "Our collections are taking shape."}
              </h3>
              <p>
                {error
                  ? "Please try again shortly."
                  : "Explore a custom creation while we prepare the first objects."}
              </p>
            </div>
            <Link className="text-link" href="/custom">
              Explore custom 3D <Icon name="arrow" />
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
