import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/catalog";
import { Icon } from "./icon";
export function ProductGrid({
  products,
  error = false,
  search = false,
}: {
  products: Product[];
  error?: boolean;
  search?: boolean;
}) {
  return products.length ? (
    <div className="product-grid">
      {products.map((p) => {
        const image =
          p.product_images?.find((i) => i.is_primary) ?? p.product_images?.[0];
        const src = image?.storage_path
          ? process.env.NEXT_PUBLIC_SUPABASE_URL +
            "/storage/v1/object/public/product-images/" +
            image.storage_path
          : null;
        return (
          <Link className="product-card" href={"/product/" + p.slug} key={p.id}>
            <div className="product-photo">
              {src ? (
                <Image
                  src={src}
                  alt={p.name}
                  fill
                  sizes="(max-width:600px) 50vw, 25vw"
                />
              ) : (
                <Icon name="box" width={48} height={48} />
              )}
              <span className="product-arrow">
                <Icon name="arrow" />
              </span>
            </div>
            <div className="product-meta">
              <h3>{p.name}</h3>
              <span>₹{Number(p.price).toLocaleString("en-IN")}</span>
            </div>
            <p>{p.short_description}</p>
          </Link>
        );
      })}
    </div>
  ) : (
    <div className="catalog-empty">
      <span className="empty-icon">
        <Icon name={error ? "layers" : "box"} width={28} height={28} />
      </span>
      <div>
        <h3>
          {error
            ? "The collection is temporarily unavailable"
            : search
              ? "No objects found"
              : "Something worth making is on its way."}
        </h3>
        <p>
          {error
            ? "Please try again in a moment."
            : search
              ? "Try another search or explore a custom creation."
              : "Our first collection is taking shape. In the meantime, explore what we can create for you."}
        </p>
      </div>
      <Link className="text-link" href="/custom">
        Explore custom 3D <Icon name="arrow" />
      </Link>
    </div>
  );
}
