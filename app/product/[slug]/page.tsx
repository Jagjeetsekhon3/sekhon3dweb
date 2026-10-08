import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Icon } from "@/components/icon";
export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const db = await createClient();
  const { data: p, error } = await db
    .from("products")
    .select(
      "id,name,slug,price,compare_at_price,description,short_description,product_type,product_images(storage_path,is_primary),product_variants(id,name,sku,price,active)",
    )
    .eq("active", true)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error("Product unavailable");
  if (!p) notFound();
  const image =
    p.product_images?.find((i) => i.is_primary) ?? p.product_images?.[0];
  const src = image?.storage_path
    ? process.env.NEXT_PUBLIC_SUPABASE_URL +
      "/storage/v1/object/public/product-images/" +
      image.storage_path
    : null;
  return (
    <>
      <Navigation />
      <main className="inner-page">
        <Link className="text-link" href="/shop">
          ← Back to the collection
        </Link>
        <div className="product-detail" style={{ marginTop: 35 }}>
          <div className="product-photo">
            {src ? (
              <Image
                src={src}
                alt={p.name}
                fill
                priority
                sizes="(max-width:760px) 90vw, 45vw"
              />
            ) : (
              <Icon name="box" width={64} height={64} />
            )}
          </div>
          <section>
            <p className="eyebrow">
              {p.product_type === "custom"
                ? "MADE PERSONAL"
                : "THE STUDIO COLLECTION"}
            </p>
            <h1>{p.name}</h1>
            <p className="price" style={{ fontSize: 24 }}>
              ₹{Number(p.price).toLocaleString("en-IN")}{" "}
              {p.compare_at_price &&
              Number(p.compare_at_price) > Number(p.price) ? (
                <del className="muted">
                  ₹{Number(p.compare_at_price).toLocaleString("en-IN")}
                </del>
              ) : null}
            </p>
            <p className="product-description">
              {p.description || p.short_description}
            </p>
            {p.product_variants?.filter((v) => v.active).length ? (
              <div className="variant-summary">
                <h2>Available options</h2>
                {p.product_variants
                  .filter((v) => v.active)
                  .map((v) => (
                    <p key={v.id}>
                      {v.name || v.sku}{" "}
                      {v.price !== null
                        ? " · ₹" + Number(v.price).toLocaleString("en-IN")
                        : ""}
                    </p>
                  ))}
              </div>
            ) : null}
            <div className="contact-note">
              <p>
                Online purchasing is being prepared. Explore custom 3D for
                studio contact details and personalized creations.
              </p>
              <Link className="button black" href="/custom">
                Explore custom 3D <Icon name="arrow" />
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
