import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Source_Serif_4 } from "next/font/google";
import { SkipLink } from "@/components/ui/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "@/styles/globals.css";

/*
 * Fontovi (docs/02 §6.3, odluka vlasnika #3): telo — Source Serif 4,
 * naslovi/UI — Inter. Oba imaju potpunu podršku za srpsku latinicu
 * (subset "latin-ext" pokriva č ć š ž đ Č Ć Š Ž Đ).
 *
 * next/font preuzima i self-hostuje fontove u build koraku — NEMA runtime
 * zahteva prema Google-u. `display: "swap"` drži tekst vidljivim tokom učitavanja.
 */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-source-serif-4",
});

export const metadata: Metadata = {
  title: "Metaboličko zdravlje",
  description:
    "Edukativna platforma o metaboličkom zdravlju na srpskom jeziku — u pripremi.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="sr-Latn-RS"
      className={`${inter.variable} ${sourceSerif.variable}`}
    >
      <body>
        <SkipLink />
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main id="glavni-sadrzaj" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
