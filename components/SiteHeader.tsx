import Link from "next/link";
import { siteConfig } from "../lib/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/scriptures", label: "Scriptures" },
  { href: "/listen", label: "Listen" },
  { href: "/practice", label: "Practice" },
  { href: "/places", label: "Sacred Places" },
  { href: "/guide", label: "Guide" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-mark" aria-label={`${siteConfig.siteName} home`}>
          <span className="site-mark__symbol" aria-hidden="true">S</span>
          <span>{siteConfig.siteName}</span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="site-nav__link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
