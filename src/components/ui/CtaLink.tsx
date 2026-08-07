import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Link koji izgleda kao dugme.
 *
 * Ostaje `<a>` jer vodi na drugu stranicu — `<button>` bi lagao o tome šta
 * radi, i pokvario srednji klik, otvaranje u novom tabu i kopiranje adrese.
 *
 * Podvlačenje se ovde izostavlja, i to je izuzetak od pravila iz
 * `globals.css`. Osnovno pravilo postoji zato što boja sama nije dovoljan
 * znak da je nešto link (WCAG 1.4.1). Ovde znak nije boja nego OBLIK —
 * puna površina, ivica i razmak — pa je element prepoznatljiv i za osobu
 * koja boje ne razlikuje. Nijedna druga stvar na stranici nema taj oblik.
 *
 * `accent` (terakota) je rezervisana isključivo za primarni CTA
 * (docs/02 §6.2). Zato `variant` postoji: sekundarni CTA je ne koristi.
 */
export function CtaLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex items-center justify-center rounded-md px-6 py-3 " +
    "font-sans font-semibold no-underline " +
    "transition-colors duration-(--duration-color) ease-(--ease-standard)";

  const look =
    variant === "primary"
      ? "bg-accent text-on-accent hover:bg-primary"
      : "border border-border bg-surface text-primary hover:border-primary";

  return (
    <Link href={href} className={`${base} ${look}`}>
      {children}
    </Link>
  );
}
