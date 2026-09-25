import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { siteConfig } from "../lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.currentUrl),
  title: { default: siteConfig.siteName, template: `%s | ${siteConfig.siteName}` },
  description: "Explore Buddhist scripture through text, sound, contemplative practice, and place.",
  openGraph: {
    title: siteConfig.siteName,
    description: "Buddhist texts are not only read. They are heard, repeated, remembered, and lived.",
    url: siteConfig.currentUrl,
    siteName: siteConfig.siteName,
    type: "website",
  },
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.siteName,
  url: siteConfig.currentUrl,
  description: "A public humanities project about Buddhist scripture, sound, contemplative practice, and place.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
