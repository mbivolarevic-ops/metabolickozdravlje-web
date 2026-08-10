import type { MetadataRoute } from "next";
import { SITE_DOMAIN } from "@/site/config";

/**
 * `robots.txt` pre lansiranja.
 *
 * ⛔ Blokira SVE crawlere na SVIM putanjama. Ovo nije privremeni previd nego
 * stanje projekta: platforma još nema objavljen medicinski sadržaj, a prvi
 * utisak koji pretraživač zapamti teško se ispravlja.
 *
 * ⛔ Pravilo se NE otključava automatski — ni po `NODE_ENV`, ni po hosting
 * okruženju, ni po tome što domen postoji. Svaka takva „pametna“ provera znači
 * da bi jedan pogrešno podešen build otvorio sajt pretraživačima bez ijedne
 * ljudske odluke. Indeksiranje se uključuje posebnim PR-om koji vlasnik
 * izričito odobrava, i tada se menja i globalni `robots` u `layout.tsx`.
 *
 * `sitemap` se namerno NE navodi. Uputiti crawlera na spisak adresa koje mu
 * istovremeno zabranjujemo je protivrečna poruka; sitemap postoji radi
 * pripreme i lokalne provere, ne radi pozivanja. Navodi se kada se
 * indeksiranje otvori.
 *
 * `host` se navodi jer imenuje kanonski domen i ne otvara nijednu putanju.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    host: SITE_DOMAIN,
  };
}
