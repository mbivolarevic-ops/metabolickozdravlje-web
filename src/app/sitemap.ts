import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/site/config";
import { loadSitemapArticles, loadSitemapTopics } from "@/sanity/content";

/**
 * Sitemap.
 *
 * ⚠️ Postojanje sitemap-a NIJE dozvola za indeksiranje. `robots.txt` i dalje
 * zabranjuje sve, a globalni `noindex` je aktivan. Ovo je priprema: kada
 * vlasnik odobri lansiranje, spisak adresa je već tačan i proveren.
 *
 * Sadrži samo adrese koje stvarno postoje i stvarno se prikazuju:
 *  - početnu i `/teme`, koje su statične i uvek postoje;
 *  - teme koje prolaze `isValidTopic()`;
 *  - članke koje propušta isti guard koji odlučuje smeju li na listu.
 *
 * Ne sadrži Studio, tehničke rute ni 404 stranice.
 *
 * Bez Sanity konfiguracije ostaju samo dve statične rute — to je pošteno
 * prazno stanje. Odgovor pogrešnog OBLIKA se ne pretvara u „nema sadržaja“:
 * greška se propagira i obara build, kao svuda u ovom sloju.
 */

/** Statične javne rute — postoje bez obzira na CMS. */
const STATIC_ROUTES = ["/", "/teme"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [topics, articles] = await Promise.all([
    loadSitemapTopics(),
    loadSitemapArticles(),
  ]);

  /*
   * Statične rute NEMAJU `lastModified`. Datum builda nije datum sadržaja, a
   * lažan datum je gori od izostalog — pretraživaču bi govorio da se stranica
   * menja svaki put kada nešto sagradimo.
   */
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: canonicalUrl(...path.split("/").filter(Boolean)),
  }));

  const topicEntries: MetadataRoute.Sitemap = topics.map((topic) => ({
    url: canonicalUrl("teme", topic.slug),
    ...(topic.lastModified === null
      ? {}
      : { lastModified: topic.lastModified }),
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: canonicalUrl("tekstovi", article.slug),
    ...(article.lastModified === null
      ? {}
      : { lastModified: article.lastModified }),
  }));

  return [...staticEntries, ...topicEntries, ...articleEntries];
}
