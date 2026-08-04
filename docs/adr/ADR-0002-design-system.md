# ADR-0002 — Dizajn-sistem: tokeni i pristupačna osnova stila

**Status:** Prihvaćeno (odobrio vlasnik projekta)
**Datum:** 4. avgust 2026.
**Kontekst:** Sprint 2 — PR 1 (grana `feat/design-tokens`)

## Kontekst

Sprint 1 je namerno ostavio `src/styles/globals.css` prazan i vizuelni identitet
nedefinisanim, jer je `docs/01` §17 (ODLUKA 8) izbor boja/tipografije označio kao
odluku vlasnika koju treba doneti pre izrade komponenti, da bi se izbegla prepravka.

Vlasnik projekta je odobrio vizuelni pravac za v1 i doneo konkretne odluke (ispod).
Ovaj ADR dokumentuje **samo dizajn-tokene i osnovu stila** — bez komponenti
(header, footer, dugmad, kartice), koje dolaze u narednim PR-ovima.

Sve vrednosti su izvedene iz `docs/02`: §6.2 (boje), §6.3 (tipografija),
§6.5 (razmaci), §6.11 (radijusi), §6.12 (pokret).

## Odluke vlasnika

1. **Paleta iz `docs/02` §6.2 odobrena** kao vizuelni pravac za v1.
2. **Minimalne korekcije nijansi dozvoljene samo radi WCAG AA kontrasta**, uz
   obavezno prijavljivanje svake korekcije (v. sekciju „Korekcije palete").
3. **Tipografija:** telo teksta — **Source Serif 4**; naslovi i UI — **Inter**;
   obavezna provera srpske latinice; `next/font` sa lokalnim serviranjem, bez
   runtime zahteva prema Google-u.
4. **Logo** je zasad tekstualni „CMZ", ali logo/header **nisu** deo ovog PR-a.
5. **Fotografija Dr Snežane se izostavlja** dok ne stigne odobreni asset — nema
   placeholder fotografije.
6. **Bez linkova ka nepostojećim stranicama**, disabled linkova, namernih 404
   destinacija ili nefunkcionalne pretrage.
7. **Noćni režim je planiran za v2** — sada se pripremaju samo semantički tokeni,
   dark mode se ne implementira.

## Odluka (tehnička)

### Arhitektura tokena — dva sloja

- **Sloj 1 — sirova paleta** (`--cmz-*` u `:root`): konkretne vrednosti boja.
  Ne koristi se direktno u komponentama.
- **Sloj 2 — semantički tokeni** (`@theme`): nazivi opisuju **ulogu**
  (`--color-background`, `--color-primary`, `--color-on-accent`…), ne boju.

`@theme` je namerno **bez `inline`**, pa Tailwind utilitiji referišu `var(--…)`.
Posledica: noćni režim (v2) je izmena vrednosti semantičkog sloja u jednom
selektoru (npr. `[data-theme="dark"]`), bez rekompajliranja ili diranja komponenti.
Ovo je „priprema semantičkih tokena" iz odluke #7 — dark mode se ovde ne uvodi.

### Boje — finalne vrednosti (sloj 1)

| Token | Vrednost | Uloga |
|---|---|---|
| `--cmz-petrol` | `#0F4C4A` | Primarni autoritet, naslovi, fokus prsten |
| `--cmz-petrol-light` | `#1A6B67` | Linkovi, aktivna stanja, callout „informacija" |
| `--cmz-terracotta` | `#B85A37` | Akcenat — **samo CTA** (korigovano, v. dole) |
| `--cmz-cream` | `#FAF8F5` | Pozadina |
| `--cmz-white` | `#FFFFFF` | Površine (kartice, callout) |
| `--cmz-ink` | `#1A1F1E` | Osnovni tekst |
| `--cmz-ink-muted` | `#5A6360` | Sekundarni tekst (meta, opisi) |
| `--cmz-border` | `#E3DFD8` | Ivice (dekorativne) |
| `--cmz-caution` | `#8A6D1F` | Callout „oprez" (zemljano žuta, ne alarm) |
| `--cmz-important` | `#3D4A5C` | Callout „važno" |

Zadržano iz `docs/02`: **namerno nema crvene, nijedne.**

### Korekcije palete (odluka vlasnika #2)

Jedna korekcija je bila neophodna za WCAG AA:

| Token | Predlog `docs/02` | Korigovano | Razlog |
|---|---|---|---|
| Akcenat (terakota) | `#C4633D` | **`#B85A37`** | Beli tekst na `#C4633D` daje **4,04:1** — pada AA za normalan tekst (prag 4,5:1). Minimalno tamnija `#B85A37` daje **4,61:1** (prolazi). Terakota se koristi kao pozadina CTA sa belim tekstom, pa je ovaj par obavezan. |

Sve ostale boje iz `docs/02` §6.2 zadržane su bez izmene.

### Rezultati kontrasta (WCAG 2.1, sRGB)

Prag AA: **4,5:1** za normalan tekst, **3:1** za veliki tekst i UI elemente.

| Par | Odnos | Prag | Ishod |
|---|---|---|---|
| Tekst `#1A1F1E` / krem `#FAF8F5` | 15,74:1 | 4,5 | ✅ |
| Tekst `#1A1F1E` / bela `#FFFFFF` | 16,68:1 | 4,5 | ✅ |
| Sekundarni tekst `#5A6360` / krem | 5,85:1 | 4,5 | ✅ |
| Sekundarni tekst `#5A6360` / bela | 6,20:1 | 4,5 | ✅ |
| Petrol `#0F4C4A` / krem (naslovi) | 9,20:1 | 4,5 | ✅ |
| Petrol `#0F4C4A` / bela | 9,75:1 | 4,5 | ✅ |
| Link `#1A6B67` / krem | 5,93:1 | 4,5 | ✅ |
| Link `#1A6B67` / bela | 6,28:1 | 4,5 | ✅ |
| Beli tekst / terakota `#B85A37` (CTA) | 4,61:1 | 4,5 | ✅ |
| Beli tekst / petrol `#0F4C4A` | 9,75:1 | 4,5 | ✅ |
| Oprez `#8A6D1F` / krem | 4,62:1 | 4,5 | ✅ |
| Oprez `#8A6D1F` / bela | 4,90:1 | 4,5 | ✅ |
| Važno `#3D4A5C` / krem | 8,49:1 | 4,5 | ✅ |
| Važno `#3D4A5C` / bela | 9,00:1 | 4,5 | ✅ |
| Fokus prsten petrol `#0F4C4A` / krem | 9,20:1 | 3,0 | ✅ |
| Ivica `#E3DFD8` / krem | 1,25:1 | 3,0 | ⚠ dekorativno |
| Ivica `#E3DFD8` / bela | 1,33:1 | 3,0 | ⚠ dekorativno |

**Napomena o ivici:** `#E3DFD8` ne dostiže 3:1 prema pozadini. To je namerno i
prihvatljivo — ivica je **dekorativna** (tanki razdelnici, rubovi kartica) i nije
jedini nosilac značenja, stanja ni granica interaktivne kontrole, pa WCAG 1.4.11
(kontrast ne-tekstualnog sadržaja) na nju ne primenjuje prag 3:1. Kada u kasnijim
PR-ovima ivica bude jedini indikator granice kontrole (npr. polje forme), takva
kontrola dobiće zaseban indikator koji zadovoljava 3:1.

### Tipografija

- **Telo:** Source Serif 4. **Naslovi/UI:** Inter. Kombinacija serif-telo +
  sans-naslovi je namerna (`docs/02` §6.3).
- **Srpska latinica:** oba fonta preko `next/font` sa `subsets: ["latin", "latin-ext"]`.
  Subset `latin-ext` pokriva `č ć š ž đ Č Ć Š Ž Đ` (Latin Extended-A). `next/font`
  bi prijavio grešku u buildu da subset ne postoji za dati font — build prolazi
  (v. sekciju „Provere"), što potvrđuje dostupnost.
- **Serviranje:** `next/font/google` preuzima i self-hostuje fontove u build
  koraku; nema runtime zahteva prema Google-u (odluka #3). `display: "swap"`.
- **Skala** (`docs/02` §6.3), mobile-first — mobilna vrednost je podrazumevana,
  desktop se podiže na `min-width: 48rem`:

| Element | Mobilno | Desktop | Prored |
|---|---|---|---|
| Telo | 17px | 18px | 1,7 |
| H1 | 32px | 40px | 1,15 |
| H2 | 26px | 30px | 1,25 |
| H3 | 21px | 23px | 1,3 |

### Razmaci, širine, radijusi, pokret

- **Razmaci:** bazna jedinica `--spacing: 0.25rem` (4px); Tailwind skala se izvodi
  iz nje (`p-1`=4px … `p-24`=96px). Dozvoljeni koraci: 4·8·12·16·24·32·48·64·96.
- **Širine:** `--container-prose` 680px (tekst), `--container-page` 1200px (stranica).
- **Radijusi:** `--radius-sm` 4px, `--radius-md` 6px (primarni CTA), `--radius-lg` 8px.
- **Pokret:** `--duration-color` 150ms, `--duration-collapse` 200ms, `--ease-standard`.
  Globalni `@media (prefers-reduced-motion: reduce)` isključuje sav pokret.

### Pristupačnost u osnovi stila

- Vidljiv fokus: `:focus-visible` → petrol prsten 2px sa odmakom 2px (kontrast 9,2:1).
- `prefers-reduced-motion` poštovan globalno.
- `text-size-adjust: 100%` i relativne (rem) jedinice — podrška za zum do 200% i
  uvećan sistemski font (`docs/04` §12.8).
- `lang="sr-Latn-RS"` (već postavljeno u Sprintu 1) zadržano.

## Šta ovaj ADR namerno NE odlučuje

- Bilo koju UI komponentu (header, footer, navigacija, dugmad, kartice, callout
  blokovi) — naredni PR-ovi Sprinta 2.
- Ikonografski skup (Lucide vs. Phosphor, `docs/02` §6.4) — otvoreno.
- Implementaciju noćnog režima — planirano za v2 (odluka #7); ovde samo priprema.
- Logo (osim tekstualnog „CMZ" kao privremenog rešenja), fotografije, ilustracije.

## Posledice

- Komponente u narednim PR-ovima koriste **isključivo semantičke tokene**, nikada
  sirove `--cmz-*` vrednosti ni hardkodovane heks vrednosti.
- Promena palete ili prelazak na noćni režim ostaje izmena semantičkog sloja, ne
  komponenti.
- `noindex` (`src/app/layout.tsx`) i minimalna, prenosiva `next.config.ts`
  (bez tvrde zavisnosti od ISR-a) ostaju netaknuti.
