import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/paths";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: site.seo.title,
  description: site.seo.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "Ilham Rohan",
    "Industrial and Production Engineering",
    "IPE",
    "SUST",
    "Shahjalal University of Science and Technology",
    "Machine Learning",
    "Industrial Engineering",
    "SolidWorks",
    "Portfolio",
  ],
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    type: "profile",
    url: `${siteUrl}/`,
    title: site.seo.title,
    description: site.seo.description,
    siteName: site.name,
    firstName: site.firstName,
    lastName: site.lastName,
    images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: `${site.name} — ${site.title}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [`${siteUrl}/og.png`],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f6f6f4" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint: stored choice → system preference.
const themeScript = `(function(){try{var d=document.documentElement;if(d.dataset.theme)return;var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Industrial & Production Engineering Student",
  email: `mailto:${site.email}`,
  url: `${siteUrl}/`,
  address: { "@type": "PostalAddress", addressLocality: "Sylhet", addressCountry: "BD" },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Shahjalal University of Science and Technology",
  },
  knowsAbout: site.research.map((r) => r.area),
  sameAs: site.profiles.map((p) => p.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
