import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="eyebrow">Scripture in Sound</p>
          <p className="site-footer__statement">
            A public humanities project on Buddhist text, voice, practice, and place.
          </p>
        </div>
        <div className="site-footer__links" aria-label="Footer navigation">
          <Link href="/about">About & editorial approach</Link>
          <Link href="/sources-ethics">Sources & ethics</Link>
          <Link href="/sitemap.xml">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
