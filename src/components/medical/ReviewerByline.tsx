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
 */
export interface ReviewerBylineProps {
  /** Puno ime stručnog recenzenta. */
  name: string;
  /** Kvalifikacije kako se javno navode. */
  credentials: string;
  /** Datum poslednje stručne provere, u obliku „YYYY-MM-DD“. */
  reviewDate: string;
}

export function ReviewerByline({
  name,
  credentials,
  reviewDate,
}: ReviewerBylineProps) {
  const formattedDate = formatReviewDate(reviewDate);

  return (
    <div className="rounded-md border border-border bg-surface p-4">
      <p className="font-sans">
        <span className="text-text-muted">Stručno proverio: </span>
        <strong className="font-semibold">{name}</strong>
      </p>
      <p className="mt-1 font-sans text-sm text-text-muted">{credentials}</p>
      <p className="mt-2 font-sans text-sm text-text-muted">
        Poslednja provera:{" "}
        {formattedDate === null ? (
          reviewDate
        ) : (
          <time dateTime={reviewDate}>{formattedDate}</time>
        )}
      </p>
    </div>
  );
}
