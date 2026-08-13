# ADR-0004 — Prikaz članka: Portable Text, slike i video

**Status:** Prihvaćeno (odobrio vlasnik projekta)
**Datum:** 6. avgust 2026.
**Kontekst:** Sprint 4 — PR 16 (grana `feat/article-page`)

## Kontekst

Do sada su postojali content model (PR 10), Studio (PR 11), read-only klijent
(PR 12), tipizirani upiti i `isDisplayableArticle()` (PR 13), medicinske
komponente (PR 14) i rute tema (PR 15). Nedostajala je stranica na kojoj se
članak zaista čita.

Ta stranica je prvo mesto na kojem se medicinski tekst prikazuje čitaocu, pa
odluke o njoj nose više težine od uobičajenog: određuju šta se sme naći u telu
teksta, kako se prikazuje medij, i šta se dešava kada podatak nije ispravan.

## Odluka

### 1. Adresa: `/tekstovi/[slug]`, bez sluga teme

Adresa članka NE sadrži temu.

| Razmatrano | Zašto nije izabrano |
|---|---|
| `/teme/[cluster]/[slug]` | Premeštanje članka u drugu temu bi promenilo adresu |
| `/[slug]` | Sudaranje sa budućim stranicama u korenu |

`docs/01` §4.1 traži da se slug posle objave ne menja. Tema je uređivačka
odluka koja se s vremenom menja; adresa objavljenog teksta ne sme da zavisi od
nje. Tema se i dalje prikazuje na stranici i vodi na `/teme/[cluster]`.

### 2. Portable Text kao jedini format tela

Telo se renderuje kroz `@portabletext/react`, sa mapom komponenti definisanom
izvan render funkcije.

- Bez `dangerouslySetInnerHTML` i bez sirovog HTML-a iz CMS-a.
- Bez Markdown-a kao paralelnog sistema — jedan format, jedna provera.
- `h1` se ne renderuje iz tela: jedan `h1` po stranici nosi naslov članka.

Dozvoljeni blokovi su zatvorena lista (`ALLOWED_CONTENT_BLOCK_TYPES`):
`block`, `imageWithCaption`, `videoEmbed`. Lista se proširuje isključivo
odlukom vlasnika, ne usput.

### 3. Fail-closed prikaz: `src/sanity/bodyGuards.ts`

Uvedena je treća brana, pored GROQ filtera objavljivosti i
`isDisplayableArticle()`.

| Provera | Ishod kada padne |
|---|---|
| nepoznat tip bloka | ceo članak se ne prikazuje (404) |
| slika bez `alt` ili bez asseta | ceo članak se ne prikazuje |
| video bez transkripta, naslova ili sa nedozvoljenom adresom | ceo članak se ne prikazuje |
| link sa `javascript:`, `data:`, `file:` ili protokol-relativan | ceo članak se ne prikazuje |

**Zašto ceo članak, a ne samo problematični blok:** tiho preskakanje bi značilo
da medicinski tekst izgubi deo sadržaja a da to niko ne primeti. Tekst kojem
nedostaje ograda ili grafikon opasniji je od teksta kojeg nema. Izostanak je
vidljiv i popravljiv; nepotpun tekst nije.

Sloj podataka i dalje razlikuje tri ishoda: `null` (nema članka ili nije
prikaziv → 404), izuzetak (odgovor pogrešnog **oblika** → build pada), i
članak.

### 4. Slike: `next/image` uz pun Sanity objekat

`ArticleImage` prosleđuje **ceo** Sanity image objekat builderu, pa se `crop` i
`hotspot` poštuju — isečak koji je urednik izabrao je isečak koji čitalac vidi.
Prosleđivanje samo `asset._ref` bi tiho poništilo taj izbor.

- `next.config.ts` dozvoljava tačno jedan spoljni izvor: `cdn.sanity.io`,
  putanja `/images/**`. Nijedan drugi host.
- Fiksne dimenzije okvira (1200×675) drže odnos stranica i sprečavaju skok
  rasporeda (CLS budžet iz `docs/00` §4).
- `alt` je obavezan i blokirajući: slika bez opisa se ne renderuje.
- `credit` je novo, opciono polje — izvor slike se navodi kada postoji.

### 5. Video: allowlist, sastavljena adresa, obavezan transkript

`sanity/validation/videoEmbed.ts` je jedini izvor istine i koristi ga i
validacija u Studiju i prikaz na sajtu.

| Pravilo | Sprovođenje |
|---|---|
| Samo YouTube i Vimeo | zatvorena lista provajdera i hostova |
| Adresa iz CMS-a se NIKADA ne prosleđuje iframe-u | iz nje se izvlači samo identifikator, pa se adresa **sastavlja** iz fiksnog šablona |
| Bez autoplay-a | šablon ga ne sadrži; parametri iz unete adrese se odbacuju |
| Transkript obavezan | blokirajuća validacija + provera pri prikazu |

Posledica sastavljanja adrese: parametri koje bi neko dopisao u CMS-u
(`autoplay`, `list`, bilo šta drugo) ne stižu do iframe-a.

**Klik za učitavanje.** Iframe se ne učitava dok korisnik to ne zatraži; do tada
se ka YouTube-u i Vimeo-u ne šalje nijedan zahtev. To smanjuje praćenje treće
strane. **Ovo NIJE rešenje saglasnosti za kolačiće** i ne treba ga tako
predstavljati — saglasnost je zaseban posao i nije deo ovog PR-a.

`VideoEmbed` je jedina klijentska komponenta na stranici članka, i to zbog
jednog prekidača stanja. Sve ostalo su serverske komponente.

### 6. Naslovna slika: opciona, isti model

Vlasnik je odobrio opciono polje `featuredImage` na `article` dokumentu.

**Isti model, ne drugi.** Polje koristi postojeći `imageWithCaption` objekat.
Nije uveden paralelan image model — dva modela bi značila dva mesta na kojima
se pravilo o obaveznom opisu može razići, i pre ili kasnije bi se razišla.

| Stanje | Ishod |
|---|---|
| polje odsutno ili `null` | dozvoljeno; stranica je potpuna i bez slike |
| slika prisutna i potpuna | prikazuje se posle atribucije, pre teksta |
| slika prisutna ali nevalidna | **fail-closed** — ceo članak daje 404 |

Treći red je namerno strog i isti kao za slike u telu. Delimična naslovna
slika bi značila prazan okvir na vrhu medicinskog teksta, ili sliku bez opisa
— dakle sadržaj koji deo čitalaca ne može da koristi.

**Zašto `crop` i `hotspot`.** Naslovna slika se prikazuje u fiksnom odnosu
16:9, a Open Graph u 1,91:1. Bez isečka i fokusa, automatsko sečenje bi lako
odseklo ono zbog čega je slika izabrana — kod grafikona ili nalaza to nije
estetski problem nego gubitak informacije. Zato se builderu prosleđuje ceo
objekat, a ne samo `asset._ref`.

**Zašto je `alt` obavezan.** Ista pravila kao za slike u telu (`docs/01` §8.4,
`docs/04` §14.7). Naslovna slika je često grafikon ili shema; bez opisa ta
informacija ne postoji za čitaoca koji sliku ne vidi.

**Open Graph.** Kada postoji potpuno validna naslovna slika, iz nje se sastavlja
OG slika — isključivo adresa na Sanity CDN-u, sa fiksnim formatom. Kada slike
nema ili nije validna, OG slika se **ne postavlja**; pogrešna OG slika je gora
od izostanka, jer je čitač linkova prikazuje kao deo teksta. Globalni `noindex`
ostaje na snazi.

Adrese slika su na jednom mestu (`src/sanity/imageUrl.ts`), da prikaz i
metapodaci ne bi mogli da se raziđu oko isečka.

**Projekcija.** Povlači se tačno ono što treba: `alt`, `caption`, `credit`,
`crop`, `hotspot`, identifikator asseta i dimenzije. Ostatak zapisa o fajlu
(URL, paleta, naziv originala, podaci o otpremanju) se ne povlači — to su
podaci o CMS-u, ne o sadržaju.

### 7. Statičko generisanje, bez ISR-a

`generateStaticParams` iz objavljivih članaka + `dynamicParams = false`.
Nepoznat slug daje 404 odmah, bez dinamičkog fallback prikaza. Bez ISR-a,
webhook-ova, preview-a i draft moda — u skladu sa `docs/01` §6.3, koji ISR na
Hostingeru ostavlja nepotvrđenim.

## Posledice

**Dobro**

- Medicinski tekst se ne prikazuje delimično ni pod kojim uslovom.
- Adresa članka je stabilna i preživljava uređivačke promene teme.
- Jedan format sadržaja, jedna zatvorena lista blokova, jedan izvor istine za
  bezbednost video adresa.
- Nijedan spoljni zahtev se ne šalje dok korisnik ne klikne.

**Cena**

- Jedan neispravan blok obara ceo članak. To je namerno, ali znači da urednik
  mora dobiti jasnu poruku u Studiju — validacije postoje, ali je iskustvo
  vredno provere na prvom stvarnom tekstu.
- Dozvoljena lista blokova je uska; svaki novi tip sadržaja traži odluku
  vlasnika i izmenu na tri mesta (šema, `ALLOWED_CONTENT_BLOCK_TYPES`,
  `bodyGuards`).
- Zavisnosti `@portabletext/react` i `@sanity/image-url` postaju produkcione.
- Naslovna slika koja je uneta nepotpuno obara ceo članak. Za urednika to znači
  da je bolje ne dodati sliku nego je dodati napola — što treba i reći, jer
  nije očigledno.

**Otvoreno**

- Saglasnost za kolačiće nije rešena i ne tvrdi se da jeste.
- Ponašanje `next/image` optimizacije na Hostingeru nije potvrđeno
  (`docs/01` §16.2) — ako se optimizacija isključi, slike i dalje rade preko
  Sanity CDN transformacija, ali to treba proveriti pre objave.
- Stranica nije proverena na stvarnom članku, jer stvarnog članka još nema.

## Alternative koje su odbačene

| Alternativa | Zašto ne |
|---|---|
| Renderovati HTML iz CMS-a | `dangerouslySetInnerHTML` je zabranjen; CMS postaje kanal za proizvoljan kod |
| Preskočiti neispravan blok, prikazati ostatak | Nevidljiv gubitak dela medicinskog teksta |
| Proslediti adresu videa direktno iframe-u | CMS bi mogao da učita bilo koji sadržaj |
| Ugraditi video bez transkripta | Sadržaj nedostupan bez zvuka; suprotno WCAG 2.1 AA |
| Dozvoliti proizvoljne image hostove | Svaki host je novi kanal ka trećoj strani |
| Zaseban model za naslovnu sliku | Dva image modela = dva mesta na kojima pravilo o obaveznom opisu može da se raziđe |
| Naslovnu sliku preskočiti kad je nevalidna, a članak prikazati | Prazan okvir ili slika bez opisa na vrhu medicinskog teksta |
| Postaviti OG sliku i kad slika nije potpuna | Čitač linkova je prikazuje kao deo teksta; pogrešna je gora od nijedne |
