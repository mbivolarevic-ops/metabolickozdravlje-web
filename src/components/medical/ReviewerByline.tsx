import { formatReviewDate } from "./formatReviewDate";

/**
 * Potpis stručnog recenzenta (docs/02 §3.1 ① „traka poverenja“).
 *
 * Nosi pravnu težinu: odgovornost za medicinsku tvrdnju pripada imenovanoj
 * osobi sa licencom (docs/00 §5.2). Zato su ime, kvalifikacije i datum
 * poslednje provere OBAVEZNI — komponenta se ne može upotrebiti nepotpuno.
 *
 * Namerno NE tvrdi da je recenzent autor teksta: piše „Stručno proverio“,
 * doslovno kako stoji u dokumentaciji. Autorstvo je zaseban podatak.
 *
 * Bez linka ka profilu — ruta `/strucni-recenzenti/...` još ne postoji, a
 * projekat ne pravi linkove ka nepostojećim odredištima.
 *
 * ⛔ FAIL CLOSED: ako ime, kvalifikacije ili datum nisu upotrebljivi,
 * komponenta ne renderuje NIŠTA. Delimičan potpis stručnog pregleda gori je
 * od izostanka potpisa — čitaocu bi poručio da je tekst pregledan, a ne bi
 * rekao ko ga je pregledao ili kada. Sirova nevalidna vrednost se nikada ne
 * ispisuje.
 *
 * Ovo je odbrana same komponente. Glavna kapija na nivou članka ostaje
 * `isDisplayableArticle()` u `src/sanity/guards.ts`.
 */
export interface ReviewerBylineProps {
  /** Puno ime stručnog recenzenta. */
  name: string;
  /** Kvalifikacije kako se javno navode. */
  credentials: string;
  /** Datum poslednje stručne provere, u obliku „YYYY-MM-DD“. */
  reviewDate: string;
}

/** Vrednost postoji i nije prazna ni posle uklanjanja razmaka. */
function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function ReviewerByline({
  name,
  credentials,
  reviewDate,
}: ReviewerBylineProps) {
  const formattedDate = formatReviewDate(reviewDate);

  // Sve troje mora biti upotrebljivo — inače se ne renderuje ništa.
  if (!hasText(name) || !hasText(credentials) || formattedDate === null) {
    return null;
  }

  return (
    <div className="rounded-md border border-border bg-surface p-4">
      <p className="font-sans">
        <span className="text-text-muted">Stručno proverio: </span>
        <strong className="font-semibold">{name.trim()}</strong>
      </p>
      <p className="mt-1 font-sans text-sm text-text-muted">
        {credentials.trim()}
      </p>
      <p className="mt-2 font-sans text-sm text-text-muted">
        Poslednja provera: <time dateTime={reviewDate}>{formattedDate}</time>
      </p>
    </div>
  );
}
