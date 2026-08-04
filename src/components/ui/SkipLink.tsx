/**
 * Skip-link (WCAG 2.1 AA, 2.4.1 „Bypass Blocks").
 * Prvi fokusabilni element u <body>; vizuelno skriven dok ne dobije fokus,
 * tada jasno vidljiv (stil `.skip-link` u globals.css). Vodi na glavni
 * sadržaj `#glavni-sadrzaj`. Bez klijentskog JS-a.
 */
export function SkipLink() {
  return (
    <a href="#glavni-sadrzaj" className="skip-link">
      Pređi na glavni sadržaj
    </a>
  );
}
