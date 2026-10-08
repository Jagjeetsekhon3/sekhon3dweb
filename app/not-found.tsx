import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="inner-page">
        <div className="page-heading">
          <p className="eyebrow">404 / OUTSIDE THE COLLECTION</p>
          <h1>
            Let’s find your
            <br />
            <em>next inspiration.</em>
          </h1>
          <p>
            This page or object isn’t available. There’s more to explore in the
            studio.
          </p>
          <Link className="button black" href="/">
            Back to the studio →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
