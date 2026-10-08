import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Icon } from "@/components/icon";
import { createClient } from "@/lib/supabase/server";
export default async function Custom() {
  const db = await createClient();
  const { data: settings } = await db
    .from("site_settings")
    .select("support_email,support_phone")
    .limit(1)
    .maybeSingle();
  return (
    <>
      <Navigation />
      <main className="storefront inner-page">
        <div className="page-heading">
          <p className="eyebrow">MADE PERSONAL</p>
          <h1>
            Your imagination.
            <br />
            <em>A new dimension.</em>
          </h1>
          <p>
            A meaningful gift, a useful everyday object, or a design entirely
            your own. Start with an idea.
          </p>
        </div>
        <div className="custom-detail-grid">
          <section className="brief-card">
            <Icon name="spark" width={36} height={36} />
            <h2>Give your idea a shape.</h2>
            <p>A few details help us understand what you want to create.</p>
            <ol>
              <li>
                <strong>The idea</strong>
                <span>What would you like to make, and who is it for?</span>
              </li>
              <li>
                <strong>The dimensions</strong>
                <span>
                  Approximate size, reference images, or an existing 3D file.
                </span>
              </li>
              <li>
                <strong>The finish</strong>
                <span>
                  Preferred colour, material, and any personalization.
                </span>
              </li>
              <li>
                <strong>The occasion</strong>
                <span>Your quantity and preferred completion date.</span>
              </li>
            </ol>
            {settings?.support_email ? (
              <a
                className="button black"
                href={
                  "mailto:" +
                  settings.support_email +
                  "?subject=Custom%203D%20creation"
                }
              >
                Share your idea <Icon name="arrow" />
              </a>
            ) : (
              <p className="contact-note">
                Custom enquiries will open when the studio’s contact details are
                published. You can explore the collection in the meantime.
              </p>
            )}
            {settings?.support_phone && (
              <a className="text-link" href={"tel:" + settings.support_phone}>
                Call the studio: {settings.support_phone}
              </a>
            )}
          </section>
          <section className="custom-side">
            <p className="eyebrow">FROM SCREEN TO SOMETHING REAL</p>
            <h2>
              Made one
              <br />
              <em>layer at a time.</em>
            </h2>
            <p>
              3D printing opens up new ways to make objects personal. Shape,
              proportion, and fine details give every creation its character.
            </p>
            <Link href="/shop" className="text-link">
              Explore the studio collection <Icon name="arrow" />
            </Link>
            <div className="ribbed-vase" />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
