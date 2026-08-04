# ADR-0001 — Osnovni tehnološki stack MVP-a

**Status:** Prihvaćeno (odobrio vlasnik projekta)
**Datum:** 4. avgust 2026.
**Kontekst:** Sprint 1 — tehnički skelet projekta (grana `feat/project-scaffold`)

## Kontekst

Dokument `docs/01-DISCOVERY-AND-ARCHITECTURE.md` (sekcija 6) definiše predloženi
stack. Vlasnik projekta je odobrio dokumente `docs/01`–`docs/04` kao usvojenu
radnu osnovu za implementaciju MVP-a i korigovao verziju Node.js okruženja:
Node 20 LTS iz dokumentacije zamenjuje se sa Node 24 LTS, jer je Node 20
završio period podrške.

Ovaj ADR dokumentuje **samo osnovni stack** odobren za Sprint 1.

## Odluka

| Sloj | Izbor | Verzija (zaključana u `package-lock.json`) |
|---|---|---|
| Runtime | Node.js | 24 LTS (`.nvmrc`, `engines` u `package.json`) |
| Framework | Next.js, App Router | 16.3.0 |
| UI biblioteka | React / React DOM | 19.2.8 |
| Jezik | TypeScript, `strict: true`, bez `any` | 5.x (aktuelna stabilna 5.9) |
| Stilizacija | Tailwind CSS (preko `@tailwindcss/postcss`) | 4.x |
| Lint | ESLint 9 + `eslint-config-next` + `eslint-config-prettier` | — |
| Formatiranje | Prettier | 3.x |
| Testovi | Vitest + Testing Library (jsdom) | 4.x |
| Package manager | npm (`package-lock.json` je izvor istine za verzije) | — |

Napomena o TypeScript verziji: koristi se aktuelna stabilna linija 5.x, a ne
7.x, jer je 7.x nova generacija alata čija kompatibilnost sa Next.js tool-chainom
još nije potvrđena. Prelazak na noviju liniju biće zaseban, mali ADR kada
ekosistem to podrži.

## Šta ovaj ADR namerno NE odlučuje

- **Hosting i strategija renderovanja** (ISR vs. pun statički rebuild) — otvoren
  rizik iz `docs/01`, sekcije 6.3 i 16.2; čeka potvrdu Hostinger paketa od
  vlasnika. Do tada konfiguracija ostaje minimalna i prenosiva, bez tvrde
  zavisnosti od ISR-a i bez funkcija specifičnih za jednu platformu.
- CMS (Sanity) i content model — naredni sprint, nakon otvaranja Sanity projekta.
- Analitika, email provajder, vizuelni identitet — otvorene odluke vlasnika
  (`docs/01`, sekcija 17).

## Posledice

- CI (lint → typecheck → test → build) radi na Node 24 i mora biti zelen pre
  svakog PR-a (CLAUDE.md, sekcija 9).
- Server komponente su podrazumevane; `'use client'` je izuzetak koji se
  obrazlaže (budžet JS < 100KB gzip na članku, `docs/01` sekcija 6.5).
- Sve buduće arhitektonske odluke (hosting, CMS, pretraga, slike) dobijaju
  svoje ADR zapise u ovom folderu.
