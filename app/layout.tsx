import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "../lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.currentUrl),
  title: siteConfig.siteName,
  description:
    "A curated guide to Buddhist scripture, chanting, sound practice, and contemplative listening.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.siteName,
    description:
      "A curated guide to Buddhist scripture, chanting, sound practice, and contemplative listening.",
    url: siteConfig.currentUrl,
    siteName: siteConfig.siteName,
    type: "website",
  },
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/guided-practice", label: "Guided Practice" },
  { href: "/sources-ethics", label: "Sources & Ethics" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="border-b border-[#eadfc8] bg-[#fbf7ef]/90">
            <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="text-xl font-semibold tracking-wide">
                {siteConfig.siteName}
              </Link>
              <div className="font-sans-soft flex flex-wrap gap-2 text-sm text-[#725f50]">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-[#eadfc8] bg-[#fffdf8] px-4 py-2 transition hover:border-[#b38b3f] hover:text-[#2f2118]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </header>
          {children}
          <footer className="border-t border-[#eadfc8] px-5 py-8 text-center text-sm text-[#725f50]">
            <p>Created as a public humanities project for mindful study and reflection.</p>
          </footer>
        </div>
        {/* Disable this Analytics component if it causes access issues in some regions. */}
        <Analytics />
      </body>
    </html>
  );
}
