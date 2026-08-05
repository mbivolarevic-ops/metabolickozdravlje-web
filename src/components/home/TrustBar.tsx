/**
 * Traka principa poverenja.
 *
 * Formulisano kao PRAVILA po kojima će sadržaj nastajati, a ne kao tvrdnja
 * da je neobjavljen sadržaj već pregledan (docs/00 §5.1: poverenje se
 * dokazuje postupcima). Bez ikona i bedževa koji liče na sertifikate
 * (docs/02 §2.3, red ②).
 */
const PRINCIPLES = [
  {
    title: "Stručna provera",
    description:
      "Nijedan tekst se ne objavljuje bez potpisa lekara koji je proverio medicinsku tačnost.",
  },
  {
    title: "Navedeni izvori",
    description:
      "Uz tvrdnje se navode izvori na koje se oslanjaju, tako da čitalac može da ih proveri.",
  },
  {
    title: "Bez senzacionalizma",
    description: "Bez reklama, bez obećanja rezultata i bez jezika koji plaši.",
  },
] as const;

export function TrustBar() {
  return (
    <ul className="grid list-none gap-6 sm:grid-cols-3">
      {PRINCIPLES.map((principle) => (
        <li key={principle.title}>
          <p className="font-sans font-semibold text-primary">
            {principle.title}
          </p>
          <p className="mt-2 text-text-muted">{principle.description}</p>
        </li>
      ))}
    </ul>
  );
}
