import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

/** Geometric sans in the spirit of the Athena specimen (wide, light–bold range). */
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://muthamafrancs.github.io/portfolio/";

const metadataBase = new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`);
/** Public preview image for Open Graph, Twitter, messengers (same file as hero profile). */
const ogProfileImage = new URL(
  "assets/images/profileyaalast.jpeg",
  metadataBase,
).href;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Muthama Francis Musau — Software Developer",
    template: "%s · Muthama Francis Musau",
  },
  description:
    "Portfolio of Muthama Francis Musau — full-stack developer building fintech, education, and operations software. Hackathon winner, product-minded engineer.",
  authors: [{ name: "Muthama Francis Musau" }],
  openGraph: {
    title: "Muthama Francis Musau — Software Developer",
    description:
      "Modern portfolio showcasing projects, experience, and engineering craft.",
    url: siteUrl,
    siteName: "Muthama Francis Musau",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: ogProfileImage,
        alt: "Muthama Francis Musau — profile photo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muthama Francis Musau — Full-stack Developer",
    description:
      "Full-stack developer · fintech, education, and automation systems.",
    images: [ogProfileImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#141413" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} min-h-screen font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
