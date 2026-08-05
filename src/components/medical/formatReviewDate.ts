/**
 * Formatiranje datuma stručne provere za srpski latinični prikaz.
 *
 * Sanity `date` polje čuva „YYYY-MM-DD“ bez vremena i bez zone. Ako se takav
 * niz prosledi u `new Date(...)`, tumači se kao ponoć po UTC-u — pa bi se u
 * zonama iza UTC-a prikazao PRETHODNI dan. Kod datuma poslednje medicinske
 * provere to nije kozmetička greška, pa se datum rastavlja ručno i nikada ne
 * prolazi kroz lokalnu zonu.
 *
 * Meseci se ispisuju iz fiksne tabele, a ne kroz `Intl`: ICU podaci se
 * razlikuju između okruženja (lokalno vs. CI), pa bi prikaz — i testovi —
 * mogli da variraju. Oblik prati primer iz docs/02 §3.1: „12. jun 2026.“
 */

const MONTHS_SR_LATN = [
  "januar",
  "februar",
  "mart",
  "april",
  "maj",
  "jun",
  "jul",
  "avgust",
  "septembar",
  "oktobar",
  "novembar",
  "decembar",
] as const;

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Vraća datum u obliku „5. avgust 2026.“ ili `null` ako ulaz nije ispravan
 * datum u obliku „YYYY-MM-DD“. Nikada ne baca izuzetak.
 */
export function formatReviewDate(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const match = ISO_DATE.exec(value.trim());
  if (match === null) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (month < 1 || month > 12) return null;

  // Odbacuje datume koji „preliju“, npr. 2026-02-31. Poređenje ide preko
  // UTC-a, pa lokalna zona ne može da pomeri rezultat.
  const utc = new Date(Date.UTC(year, month - 1, day));
  if (
    utc.getUTCFullYear() !== year ||
    utc.getUTCMonth() !== month - 1 ||
    utc.getUTCDate() !== day
  ) {
    return null;
  }

  return `${day}. ${MONTHS_SR_LATN[month - 1]} ${year}.`;
}
