/**
 * Medicinska napomena na nivou članka.
 *
 * Tekst je DOSLOVNO iz projektne dokumentacije i identičan je na oba mesta
 * gde se pojavljuje:
 *   - docs/02 §3.1, blok ⑯ DISCLAIMER
 *   - docs/03 §11, Gold Standard Article Template
 *
 * Namerno NEMA `children` ni prop za tekst: napomena nosi pravnu težinu i ne
 * sme se menjati kroz poziv komponente. Izmena teksta traži izričito odobrenje
 * vlasnika projekta (CLAUDE.md §10, §14).
 *
 * Napomena za razlikovanje: podnožje sajta nosi drugu, širu formulaciju
 * („Sadržaj je edukativan…“, docs/02 §2.2 ⑧) i ona već postoji u `Footer`.
 * Ova komponenta je za pojedinačan tekst.
 *
 * Vizuelno je mirna: bez crvene, bez ikone upozorenja i bez alarmantnog
 * tona (docs/02 §6.2, §6.10) — ali sa jasnom ivicom i punim kontrastom, da
 * ostane vidljiva i čitljiva.
 */

/**
 * Odobrena formulacija. Ne menjati bez odobrenja vlasnika projekta.
 *
 * Namerno INTERNA — ne izvozi se ni iz ovog modula ni iz barrel-a. Tekst
 * napomene nosi pravnu težinu; ruta ga ne treba ni čitati ni prikazivati
 * mimo ove komponente.
 */
const MEDICAL_DISCLAIMER_TEXT =
  "Ovaj tekst je edukativan i ne zamenjuje pregled, dijagnozu ni terapiju koju određuje vaš lekar.";

export function MedicalDisclaimer() {
  return (
    <aside
      aria-label="Medicinska napomena"
      className="rounded-md border border-border border-l-4 border-l-callout-important bg-surface p-4"
    >
      <p className="text-text">{MEDICAL_DISCLAIMER_TEXT}</p>
    </aside>
  );
}
