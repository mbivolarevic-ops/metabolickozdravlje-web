import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Source_Serif_4 } from "next/font/google";
import { SkipLink } from "@/components/ui/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  HTML_LANG,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TITLE,
  siteUrl,
} from "@/site/config";
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

/**
 * Podrazumevani metapodaci za ceo sajt.
 *
 * `metadataBase` je uslov da relativne kanonske adrese i slike postanu
 * apsolutne. Bez njega Next upozorava i emituje relativne adrese, koje čitači
 * linkova ne umeju da razreše.
 *
 * ⛔ `robots: { index: false, follow: false }` OSTAJE dok vlasnik posebnim
 * PR-om ne odobri lansiranje. Postojanje sitemap-a i kanonskih adresa NIJE
 * dozvola za indeksiranje — to su pripreme, a prekidač je ovde i u
 * `src/app/robots.ts`.
 *
 * Namerno bez `authors`, `publisher` i `creator`: nemamo potvrđene pravne ni
 * organizacione podatke, a izmišljeni bi bili gori od izostavljenih.
 */
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: SITE_TITLE,
    // Unutrašnje stranice dodaju svoj naslov ispred naziva platforme.
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  /*
   * ⛔ NEMA `alternates.canonical` ni `openGraph.url` ovde.
   *
   * Sve u root metadata se NASLEĐUJE — i na stranice koje ne postoje. Kanonska
   * adresa postavljena ovde značila bi da svaka nepostojeća adresa tvrdi da je
   * ona zapravo početna stranica. To nije sitnica: kanonska adresa je izjava
   * kojoj je stranica prava, a 404 nije nijedna stranica.
   *
   * Zato canonical postavlja svaka STVARNA stranica za sebe. Globalna 404 ga
   * onda nema — što je tačno, jer nema šta da tvrdi. Lažan canonical na
   * trenutnu nepoznatu adresu bio bi jednako pogrešan.
   */
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: SITE_LOCALE,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
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
      lang={HTML_LANG}
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
