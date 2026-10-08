import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Icon } from "@/components/icon";
import { ProductGrid } from "@/components/product-grid";
import { getProducts } from "@/lib/catalog";
export default async function HomePage() {
  const { products, error } = await getProducts("", 8);
  return (
    <>
      <Navigation />
      <main className="storefront">
        <section className="studio-hero">
          <Image
            src="/images/studio-hero.png"
            alt="Monochrome sculptural objects illustrating the possibilities of 3D printing"
            fill
            priority
            sizes="100vw"
            className="hero-image"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow light">
              <span /> A NEW DIMENSION OF DESIGN
            </p>
            <h1>
              From an idea.
              <br />
              To <em>your world.</em>
            </h1>
            <p className="hero-description">
              Objects with character. Gifts with meaning.
              <br />
              3D printed creations, made personal.
            </p>
            <div className="hero-buttons">
              <Link className="button white" href="/shop">
                Explore the collection <Icon name="arrow" />
              </Link>
              <Link className="button glass" href="/custom">
                Create something yours <Icon name="spark" />
              </Link>
            </div>
          </div>
          <div className="hero-bottom">
            <span>IMAGINED BY YOU. CRAFTED BY SEKHON.</span>
            <span>01 — FORM / FUNCTION / FEELING</span>
          </div>
          <div className="hero-object-label">
            <span>THE POSSIBILITIES OF PRINT</span>
            <small>Concept objects · Studio inspiration</small>
          </div>
        </section>
        <section className="studio-values" aria-label="Studio approach">
          {[
            ["layers", "Layer by layer", "Precision in every detail."],
            ["spark", "Uniquely yours", "Bring your own ideas to life."],
            [
              "box",
              "Made with intention",
              "Considered form. Everyday purpose.",
            ],
            ["check", "From design to object", "A thoughtful making process."],
          ].map(([icon, title, desc]) => (
            <div key={title}>
              <Icon name={icon as "layers"} />
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </section>
        <section className="content-section" id="collections">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EXPLORE THE POSSIBILITIES</p>
              <h2>
                A little extraordinary.
                <br />
                For every day.
              </h2>
            </div>
            <Link href="/categories" className="text-link">
              Our collections <Icon name="arrow" />
            </Link>
          </div>
          <div className="collection-mosaic">
            <Link
              className="collection-panel collection-tall"
              href="/custom?idea=home"
            >
              <div className="collection-art">
                <div className="ribbed-vase" />
                <div className="art-ring" />
              </div>
              <div className="collection-copy">
                <span>01 / YOUR SPACE</span>
                <h3>Objects for living.</h3>
                <p>Bring character to your everyday surroundings.</p>
                <span className="collection-link">
                  Explore the possibilities <Icon name="arrow" />
                </span>
              </div>
            </Link>
            <Link
              className="collection-panel collection-wide"
              href="/custom?idea=personal"
            >
              <div className="letter-art" aria-hidden="true">
                S.
              </div>
              <div className="collection-copy">
                <span>02 / YOUR STORY</span>
                <h3>Personal by design.</h3>
                <p>Names, memories, and ideas. Made tangible.</p>
                <span className="collection-link">
                  Make it personal <Icon name="arrow" />
                </span>
              </div>
            </Link>
            <Link
              className="collection-panel collection-small"
              href="/custom?idea=desk"
            >
              <Icon
                name="layers"
                className="category-art"
                width={96}
                height={96}
              />
              <div className="collection-copy">
                <span>03 / YOUR EVERYDAY</span>
                <h3>A better desk.</h3>
                <span className="collection-link">
                  Think beyond ordinary <Icon name="arrow" />
                </span>
              </div>
            </Link>
            <Link
              className="collection-panel collection-small dark-panel"
              href="/custom?idea=original"
            >
              <Icon
                name="spark"
                className="category-art"
                width={96}
                height={96}
              />
              <div className="collection-copy">
                <span>04 / YOUR IMAGINATION</span>
                <h3>Entirely your idea.</h3>
                <span className="collection-link">
                  Let’s create it <Icon name="arrow" />
                </span>
              </div>
            </Link>
          </div>
        </section>
        <section className="content-section collection-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE STUDIO COLLECTION</p>
              <h2>Small details. Big character.</h2>
            </div>
            <Link href="/shop" className="text-link">
              View all objects <Icon name="arrow" />
            </Link>
          </div>
          <ProductGrid products={products} error={error} />
        </section>
        <section className="custom-banner">
          <div>
            <p className="eyebrow light">YOUR IDEA. OUR NEXT CREATION.</p>
            <h2>
              Some things don’t exist.
              <br />
              <em>Until you imagine them.</em>
            </h2>
            <p>
              From a personal gift to a one-of-a-kind object,
              <br />
              discover what 3D printing can bring to life.
            </p>
          </div>
          <Link href="/custom" className="button white">
            Explore custom 3D <Icon name="arrow" />
          </Link>
        </section>
        <section className="process-section">
          <p className="eyebrow">THE ART OF MAKING</p>
          <div className="process-grid">
            {[
              [
                "01",
                "Imagine it.",
                "Start with a purpose, a reference, or a little inspiration.",
              ],
              [
                "02",
                "Shape it.",
                "Consider the dimensions, material, and finishing details.",
              ],
              [
                "03",
                "Make it real.",
                "A digital design becomes an object, one layer at a time.",
              ],
            ].map(([n, t, d]) => (
              <div key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
