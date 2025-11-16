import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import { StructuredData } from "@/components/seo/structured-data";
import { ThemeProvider } from "@/components/theme/theme";
import StoreProvider from "@/store/StoreProvider";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pixel-art-8-bit.mishrashardendu22.is-a.dev"),
  title: {
    default:
      "Pixel UI - 8-Bit Retro Component Library for React & Next.js | 50+ Components",
    template: "%s | Pixel UI - Retro Component Library",
  },
  description:
    "Build nostalgic web experiences with Pixel UI - A complete 8-bit retro component library for React and Next.js. 50+ pixel-perfect components with TypeScript, Tailwind CSS, and Radix UI. Free, open-source, and accessible.",
  keywords: [
    "pixel art",
    "8-bit",
    "retro UI",
    "component library",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "UI components",
    "design system",
    "pixel perfect",
    "retro gaming",
    "arcade style",
    "nostalgic design",
    "pixel art components",
    "8-bit UI library",
    "retro design system",
    "pixel button",
    "retro forms",
    "8-bit animations",
    "arcade UI",
    "gaming UI components",
    "nostalgic web design",
    "pixel perfect borders",
    "retro aesthetic",
    "free component library",
    "open source UI",
    "accessible components",
    "Radix UI",
    "shadcn alternative",
    "retro website builder",
    "8-bit website components",
    "pixel art web design",
    "vintage UI components",
  ],
  authors: [
    {
      name: "Shardendu Mishra",
      url: "https://mishrashardendu22.is-a.dev/",
    },
  ],
  creator: "Shardendu Mishra",
  publisher: "Team Parashuram",
  applicationName: "Pixel UI",
  category: "Developer Tools",
  classification: "UI Component Library",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pixel-art-8-bit.mishrashardendu22.is-a.dev/",
    title: "Pixel UI - 8-Bit Retro Component Library for React & Next.js",
    description:
      "Build nostalgic web experiences with 50+ pixel-perfect components. Free, open-source 8-bit UI library with TypeScript, Tailwind CSS, and full accessibility support.",
    siteName: "Pixel UI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pixel UI - 8-Bit Retro Component Library with 50+ Components",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixel UI - 8-Bit Retro Component Library",
    description:
      "50+ pixel-perfect components for React & Next.js. Free, open-source, accessible. Build nostalgic web experiences with authentic 8-bit aesthetics.",
    creator: "@Shardendu_M",
    site: "@Shardendu_M",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://pixel-art-8-bit.mishrashardendu22.is-a.dev",
  },
  verification: {
    google: "google-site-verification-code",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" prefix="og: https://ogp.me/ns#">
      <head>
        <StructuredData />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        <link type="text/plain" rel="author" href="/humans.txt" />
        <meta
          name="theme-color"
          content="#ff8c00"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <style>{`
          :root {
            --font-press-start: 'Press Start 2P', monospace;
          }
        `}</style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Analytics />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
