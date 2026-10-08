import Link from "next/link";
export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="footer-logo" href="/">
          SEKHON STUDIO<span>Ideas made tangible.</span>
        </Link>
        <p>
          Thoughtful objects. Personal creations.
          <br />A new dimension of everyday design.
        </p>
      </div>
      <div className="footer-links">
        <Link href="/shop">Shop objects</Link>
        <Link href="/categories">Collections</Link>
        <Link href="/custom">Custom 3D</Link>
        <Link href="/admin/login">Studio admin</Link>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Sekhon Studio</span>
        <span>DESIGNED TO BE DIFFERENT.</span>
      </div>
    </footer>
  );
}
