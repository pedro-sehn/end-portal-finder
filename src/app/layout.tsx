import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "End Portal Finder — Triangulate Your Stronghold";
const description =
  "Find the End Portal in your Minecraft world. Enter two eye-of-ender throw angles and the distance you walked, and get the stronghold's X and Z coordinates instantly.";
const ogDescription =
  "Enter two eye-of-ender throw angles and the distance you walked to get your Minecraft stronghold's X and Z coordinates.";

export const metadata: Metadata = {
  metadataBase: new URL("https://pedro-sehn.github.io/end-portal-finder/"),
  title,
  description,
  authors: [{ name: "Pedro Sehn" }],
  keywords: [
    "Minecraft",
    "End Portal",
    "stronghold finder",
    "eye of ender",
    "triangulation",
    "coordinates calculator",
  ],
  openGraph: {
    type: "website",
    title,
    description: ogDescription,
    url: "https://pedro-sehn.github.io/end-portal-finder/",
    images: ["https://pedro-sehn.github.io/end-portal-finder/icon.svg"],
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title,
    description: ogDescription,
    images: ["https://pedro-sehn.github.io/end-portal-finder/icon.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#04130f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
