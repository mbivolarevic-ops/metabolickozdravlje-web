import { serializeJsonLd, type JsonLdNode } from "@/site/jsonLd";

/**
 * Ubacuje strukturirane podatke u dokument.
 *
 * ⛔ BEZ `dangerouslySetInnerHTML`, iako je to uobičajen način za JSON-LD.
 * Projekat ga zabranjuje (CLAUDE.md §10) i zabrana ovde nije smetnja nego
 * pomaže: tera nas da izlaz bude inertan po sadržaju, a ne po tome kako ga
 * ubacujemo.
 *
 * Zašto običan tekstualni sadržaj radi: `serializeJsonLd` je već zamenio
 * znakove `<`, `>` i `&` escape nizovima, pa u stringu ne ostaje nijedan znak
 * koji bi React escape-ovao niti koji bi HTML parser protumačio. Rezultat je
 * isti bajt po bajt, bez otvaranja rupe.
 *
 * Time i sadržaj iz CMS-a koji sadrži „</script>“ ostaje bezopasan tekst.
 */
export function JsonLd({ data }: { data: JsonLdNode }) {
  return <script type="application/ld+json">{serializeJsonLd(data)}</script>;
}
