import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

/**
 * One family, self-hosted, so the page makes no external font request.
 *
 * Archivo carries a width axis, which is why it can be the only face here: the
 * name sets in the expanded cut and everything else in the normal one, so the
 * two registers the site needs come from one file rather than two families.
 *
 * The retired world paired a DIN-lineage condensed face with a monospace. Both
 * were drafting instruments, ISO lettering and a dimension table, and both went
 * with the drafting. There is no monospace on this site.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://renatodap.me"),
  title: "Renato Prado",
  description:
    "Lead software engineer in Indianapolis. Seven self-taught instruments, a tennis court, a camera and a laptop, drawn as one sequence.",
  openGraph: {
    title: "Renato Prado",
    description: "Lead software engineer in Indianapolis, drawn as one sequence.",
    url: "https://renatodap.me",
    siteName: "Renato Prado",
    type: "profile",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b2a45",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
