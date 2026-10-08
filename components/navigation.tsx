"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./icon";
const links: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/shop", label: "Shop", icon: "search" },
  { href: "/categories", label: "Collections", icon: "grid" },
  { href: "/custom", label: "Custom 3D", icon: "spark" },
];
export function Navigation() {
  const path = usePathname();
  return (
    <>
      <header className="site-header">
        <Link href="/" className="wordmark" aria-label="Sekhon Studio home">
          <span className="brand-symbol">
            <i />
            <i />
            <i />
          </span>
          <span>
            SEKHON<span className="wordmark-sub">STUDIO</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={path === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            className="round-button"
            href="/shop#catalog-search"
            aria-label="Search products"
          >
            <Icon name="search" />
          </Link>
          <Link className="header-cta" href="/custom">
            Make it yours <Icon name="arrow" />
          </Link>
        </div>
      </header>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {[
          ...links,
          { href: "/admin/login", label: "Studio", icon: "user" as IconName },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={path === l.href ? "page" : undefined}
          >
            <Icon name={l.icon} />
            <span>{l.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
