/**
 * Informativna kartica. NIJE interaktivna: nema linka, dugmeta, hover
 * efekta ni pokazivača — u ovoj fazi ne postoje odredišta (samo ruta `/`),
 * pa kartica ne sme da izgleda kao da se može kliknuti.
 * Naslov je h3 i pretpostavlja h2 sekciju iznad sebe.
 */
export function Card({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-md border border-border bg-surface p-5">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-text-muted">{description}</p>
    </div>
  );
}
