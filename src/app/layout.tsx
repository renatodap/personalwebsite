import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Martian_Mono } from "next/font/google";
import "./globals.css";

// Barlow Condensed: a DIN-lineage condensed grotesque — the lettering standard
// of technical drawings. Martian Mono: a distinctive monospace for every numeral.
// Both self-hosted by next/font, so the page makes no external request.
const letter = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-letter",
  display: "swap",
});

const data = Martian_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-data",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://renatodap.me"),
  title: "Renato Prado",
  description:
    "Software engineer in Indianapolis. Seven self-taught instruments, a tennis court, a camera, and a laptop — drawn as one assembly.",
  openGraph: {
    title: "Renato Prado",
    description: "An exploded assembly drawing of one person.",
    url: "https://renatodap.me",
    siteName: "Renato Prado",
    type: "profile",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0C2942",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${letter.variable} ${data.variable}`}>
      <body>{children}</body>
    </html>
  );
}
