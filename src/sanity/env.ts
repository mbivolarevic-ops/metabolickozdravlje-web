/**
 * Konfiguracija pristupa Sanity Content Lake-u.
 *
 * Pristup je SERVERSKI i READ-ONLY. Token se ne koristi jer su datasetovi
 * javni, pa za čitanje objavljenog sadržaja nije potreban (v. ADR-0003).
 *
 * Promenljive se čitaju EKSPLICITNO, po imenu. Nema dinamičkih imena ni
 * kopiranja `process.env` — da bi se u kodu videlo tačno šta se čita, i da
 * greška ne bi mogla da povuče vrednost koju niko nije nameravao.
 */

/**
 * API verzija je STATIČNA konstanta, ne promenljiva okruženja.
 *
 * Sanity preporučuje hardkodovan datum i izričito upozorava na dinamički:
 * zaključavanje verzije sprečava da promena na njihovoj strani tiho promeni
 * ponašanje. Kao promenljiva, mogla bi da se razlikuje između staging-a i
 * produkcije — pa bi dve sredine radile na dve verzije API-ja.
 */
export const SANITY_API_VERSION = "2026-08-05";

/** Jedine dozvoljene vrednosti dataseta. Bez fallback-a i bez menjanja slova. */
export const ALLOWED_DATASETS = ["staging", "production"] as const;

export type SanityDataset = (typeof ALLOWED_DATASETS)[number];

export interface SanityConfig {
  projectId: string;
  dataset: SanityDataset;
  apiVersion: string;
}

/**
 * Dozvoljeni oblik Sanity project ID-a: mala slova, cifre i crtice.
 * Provera hvata očiglednu grešku (razmak, navodnici, cela URL adresa)
 * pre nego što ode u mrežni poziv.
 */
const PROJECT_ID_PATTERN = /^[a-z0-9-]{6,40}$/;

function isAllowedDataset(value: string): value is SanityDataset {
  return ALLOWED_DATASETS.some((allowed) => allowed === value);
}

/**
 * Čita i proverava konfiguraciju.
 *
 * Poruke greške imenuju promenljivu koja nedostaje ili nije ispravna, ali
 * NIKADA ne ispisuju vrednosti iz okruženja.
 */
export function readSanityConfig(): SanityConfig {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (projectId === undefined || projectId.trim().length === 0) {
    throw new Error(
      "Nedostaje NEXT_PUBLIC_SANITY_PROJECT_ID. Upiši ga u .env.local (v. .env.example).",
    );
  }

  if (!PROJECT_ID_PATTERN.test(projectId)) {
    throw new Error(
      "NEXT_PUBLIC_SANITY_PROJECT_ID nije ispravnog oblika. Očekuju se mala slova, cifre i crtice.",
    );
  }

  if (dataset === undefined || dataset.trim().length === 0) {
    throw new Error(
      `Nedostaje NEXT_PUBLIC_SANITY_DATASET. Dozvoljeno: ${ALLOWED_DATASETS.join(" ili ")}.`,
    );
  }

  // Namerno bez `toLowerCase()` i bez podrazumevane vrednosti: „Production"
  // nije isto što i „production", a tiho popravljanje bi značilo da urednik
  // može da čita pogrešan dataset a da to ne primeti.
  if (!isAllowedDataset(dataset)) {
    throw new Error(
      `NEXT_PUBLIC_SANITY_DATASET ima nedozvoljenu vrednost. Dozvoljeno je tačno: ${ALLOWED_DATASETS.join(" ili ")}.`,
    );
  }

  return { projectId, dataset, apiVersion: SANITY_API_VERSION };
}

/** Ispis konfiguracije se radi najviše jednom po procesu. */
let configAnnounced = false;

/**
 * Glasno saopštava koju sredinu čitamo.
 *
 * Tiha pogrešna konfiguracija je opasna — neko bi mogao da gradi produkciju
 * nad `staging` sadržajem i da to ne primeti. Zato se projekat i dataset vide
 * u logu. Ispisuju se samo ove dve vrednosti, koje nisu tajne.
 */
export function announceSanityConfig(config: SanityConfig): void {
  if (configAnnounced) return;
  configAnnounced = true;

  console.info(
    `Sanity: projekat ${config.projectId}, dataset ${config.dataset}, apiVersion ${config.apiVersion} (read-only, bez tokena)`,
  );
}

/** Samo za testove — vraća stanje ispisa na početno. */
export function resetConfigAnnouncedForTests(): void {
  configAnnounced = false;
}
