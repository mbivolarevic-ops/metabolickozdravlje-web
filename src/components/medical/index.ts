/**
 * Javni API medicinskih komponenti.
 *
 * Izvozi se samo ono što buduće rute treba da koriste. Pomoćne funkcije
 * (`toSafeExternalUrl`, `formatReviewDate`) ostaju interne — nema stvarne
 * potrebe da ih rute pozivaju, a uži API znači manje mesta na kojima se
 * pravila mogu zaobići.
 *
 * `MEDICAL_DISCLAIMER_TEXT` se NAMERNO ne izvozi: tekst napomene nosi pravnu
 * težinu i ruta ga ne treba ni čitati ni prikazivati mimo komponente. Ostaje
 * interan u `MedicalDisclaimer.tsx`.
 *
 * Komponente su namerno nezavisne od Next.js ruta, `notFound()`, Sanity
 * klijenta i mreže — primaju gotove podatke i samo ih prikazuju.
 */

export { ReviewerByline, type ReviewerBylineProps } from "./ReviewerByline";
export { MedicalDisclaimer } from "./MedicalDisclaimer";
export {
  ReferenceList,
  type ReferenceListItem,
  type ReferenceListProps,
} from "./ReferenceList";
