# ADR-0006 — Priprema za lansiranje: metapodaci, robots, sitemap i strukturirani podaci

**Status:** Prihvaćeno (odobrio vlasnik projekta)
**Datum:** 7. avgust 2026.
**Kontekst:** Sprint 6 — PR 18 (grana `feat/launch-readiness-foundation`)

## Kontekst

Posle PR-a #17 platforma ima početnu, teme i članke, ali nema ništa od onoga
što stranicu čini deljivom i pripremljenom za lansiranje: nema kanonske adrese,
`robots.txt`, sitemap-a, strukturiranih podataka, favicona, social slike ni
globalne 404 stranice.

Ovo izdanje dodaje tu osnovu — i istovremeno je drži **zaključanom**.

## Odluka

### 1. Kanonski domen je `https://metabolickozdravlje.rs`

Jedno mesto (`src/site/config.ts`) nosi naziv, domen, opis, jezik i pomoćne
funkcije za apsolutne adrese.

**Bez promenljive okruženja za javni URL.** Adresa je ista u svakoj sredini:
staging se ne indeksira i nije javno odredište, pa kanonska adresa nikada ne
sme da pokazuje na njega. Promenljiva bi značila da kanonska adresa može da se
razlikuje po okruženju — a to je upravo greška koju kanonska adresa treba da
spreči.

Svaka adresa se sastavlja kroz `URL` API, a segmenti se enkodiraju. Nije
kozmetika: slug dolazi iz CMS-a, a segment sa `?`, `#` ili kosom crtom bi pri
prostom spajanju stringova napravio upit, fragment ili sasvim drugu putanju.

### 2. Globalni `noindex` ostaje aktivan

`robots: { index: false, follow: false }` u root layout-u se **ne dira**.

Platforma još nema nijedan objavljen medicinski tekst. Prvi utisak koji
pretraživač zapamti teško se ispravlja, a sadržaj koji lekar treba da preporuči
ne sme da se pojavi u rezultatima pre nego što ga lekar potpiše.

**Dodavanje metapodataka nije dozvola za indeksiranje.** Kanonske adrese,
sitemap i strukturirani podaci su priprema; prekidač je na dva mesta i oba su
zatvorena.

### 3. `robots.txt` blokira sve

```
User-Agent: *
Disallow: /

Host: metabolickozdravlje.rs
```

**Bez ijedne dozvoljene putanje.** Pravilo se ne otključava automatski — ni po
`NODE_ENV`, ni po hosting okruženju, ni po tome što domen postoji. Svaka takva
„pametna“ provera značila bi da jedan pogrešno podešen build otvara sajt
pretraživačima bez ijedne ljudske odluke. Modul zato uopšte i ne čita
okruženje, i test to proverava.

`sitemap` se namerno **ne navodi** u `robots.txt`: uputiti crawlera na spisak
adresa koje mu istovremeno zabranjujemo je protivrečna poruka. Navodi se kada
se indeksiranje otvori.

`host` se navodi jer imenuje kanonski domen i ne otvara nijednu putanju.

**Indeksiranje se uključuje isključivo posebnim PR-om koji vlasnik izričito
odobrava.** Taj PR menja tri stvari zajedno: `robots.ts`, globalni `robots` u
layout-u, i test koji danas brani zabranu.

### 4. Sitemap

Sadrži početnu, `/teme`, validne teme i prikazive članke — ništa više.

| Pravilo | Zašto |
|---|---|
| Isti guardovi kao rute | Sitemap sa adresom koja vraća 404 je gori nego da ga nema |
| Članak bez upotrebljivog tela ne ulazi | Njegova stranica daje 404 |
| Draft i nevalidan dokument ne ulaze | Filter objavljivosti je deo upita |
| Bez Studija, tehničkih ruta i 404 stranica | Nisu javni sadržaj |
| Bez konfiguracije: samo dve statične rute | Pošteno prazno stanje |
| Malformiran odgovor obara build | Kvar se ne pretvara u „nema sadržaja“ |

**`lastModified` samo iz `_updatedAt`.** To je sistemski podatak koji Sanity
održava sam. Statične rute ga **nemaju**: datum builda nije datum sadržaja, a
lažan datum bi pretraživaču govorio da se stranica menja pri svakom build-u.
Kada podatak nije upotrebljiv, polje se izostavlja.

Sitemap ne povlači tela članaka — treba mu adresa, ne tekst.

### 5. Metapodaci po ruti

| Ruta | Naslov | Canonical | Open Graph |
|---|---|---|---|
| `/` | podrazumevani | `/` | `website` |
| `/teme` | „Teme“ | `/teme` | `website` |
| `/teme/[cluster]` | iz validne teme | `/teme/{slug}` | `website` |
| `/tekstovi/[slug]` | iz prikazivog članka | `/tekstovi/{slug}` | `article` |

Unutrašnje stranice koriste šablon `%s · metabolickozdravlje.rs`.

**Bez dupliranja upita:** `generateMetadata` i sama stranica pozivaju iste
keširane loadere (`getTopic`, `getArticle`), pa se upit izvršava jednom po
zahtevu. Time je kriterijum prikazivosti u metapodacima **doslovno isti** kao
na stranici — metadata ne može biti blaža od kapije.

Nevalidan dokument dobija prazan metadata objekat. To **nije** 404: o tome
odlučuje stranica. Metadata ne izaziva 404 niti ga sprečava — ona samo ne tvrdi
ništa.

**Bez `authors`, `publisher` i `creator`** — nemamo potvrđene pravne ni
organizacione podatke.

### 6. Strukturirani podaci

| Stranica | Tip |
|---|---|
| Početna | `WebSite` |
| Tema | `BreadcrumbList` |
| Članak | `MedicalWebPage` + `BreadcrumbList` |

**Zašto `MedicalWebPage`, a ne `Article`:** sadržaj je zdravstvena edukacija sa
imenovanim stručnim recenzentom i datumom provere. `MedicalWebPage` ima
`lastReviewed` i `reviewedBy` — polja koja tačno opisuju ono što ovaj projekat
stvarno sprovodi. `Article` bi opisao tekst, ne postupak provere.

**`lastReviewed` nije `datePublished`.** Content model **nema** polje datuma
objavljivanja. Predstaviti datum provere kao datum objave bila bi neistina, i
to ona koju pretraživač prikazuje korisniku. Polje se izostavlja; test to brani.

**Bez `Organization`** — pravni naziv, adresa, matični broj i registrovani
nalozi nisu potvrđeni. Schema.org bi tvrdnju prihvatila, ali bi ona bila naša,
ne proverena.

**Bez `medicalSpecialty`, licence i ustanove** — ta polja u modelu ne postoje i
ne izvode se iz slobodnog teksta kvalifikacija.

**JSON-LD nastaje tek posle kapije.** Članak koji `getArticle` odbije nema
stranicu, pa nema ni strukturirane podatke.

### 7. Bezbednost JSON-LD izlaza

Serijalizacija zamenjuje `<`, `>` i `&` escape nizovima. Bez toga bi naslov iz
CMS-a koji sadrži `</script>` zatvorio element, a sve posle njega brauzer bi
čitao kao HTML — uključujući i ono što bi napadač dodao.

Posledica te zamene je da izlaz **ne sadrži nijedan znak koji React escape-uje
niti koji HTML parser tumači**. Zato se JSON-LD ubacuje kao običan tekstualni
sadržaj `<script>` elementa, **bez `dangerouslySetInnerHTML`** — što projekat
i zabranjuje (CLAUDE.md §10). Zabrana ovde nije smetnja: naterala nas je da
izlaz bude inertan po sadržaju, a ne po načinu ubacivanja.

### 8. Privremeni znak i social slika

**Favicon** je monogram `MZ` na petrol podlozi, sa terakota akcentom — iz
postojećih tokena. Slova su iscrtana kao putanje, pa znak ne zavisi ni od jednog
fonta. Bez medicinskog krsta, stetoskopa, vage, injekcije i farmaceutskih
simbola: platforma je edukativni studio, ne zdravstvena ustanova.

⚠️ **Ovo je privremeni digitalni znak, ne konačni logo.** Vizuelni identitet je
zasebna odluka vlasnika.

**Social slika** (1200×630) se generiše kodom, u build koraku, bez ijednog
mrežnog zahteva i bez spoljnog fonta. Open Graph i Twitter dele isti render —
dve rute postoje zato što Next konvencija traži zasebne fajlove, ne zato što se
slike razlikuju. Poruka je doslovno naslov sa početne; bez fotografija i bez
tvrdnji o lečenju ili rezultatima.

### 9. Globalna 404 stranica

Nudi tačno dva izlaza, oba postoje: početnu i `/teme`. Bez pretrage (ne
postoji) i bez linka ka nepostojećoj ruti.

Specifične 404 stranice za temu i članak ostaju kakve jesu — one govore
konkretnije, što je čitaocu korisnije od opšte poruke.

## Posledice

**Dobro**

- Deljen link konačno izgleda kao nešto, umesto kao gola adresa.
- Kanonska adresa je jedna, na jednom mestu, i ne može da se razlikuje po sredini.
- Sitemap je spreman i tačan pre nego što zatreba.
- Strukturirani podaci opisuju baš ono što sistem sprovodi — proveru, ne datum objave.
- Zabrana indeksiranja je sada branjena testom, ne samo dogovorom.

**Cena**

- Kanonski domen je u kodu. Promena domena traži izmenu koda, ne podešavanja —
  namerno, jer je to odluka, ne konfiguracija.
- `_updatedAt` se menja i pri sitnoj uredničkoj ispravci, pa `lastModified` može
  da se pomeri i kada se sadržaj suštinski nije promenio.
- Znak je privremen i videće se u tabu brauzera pre nego što identitet bude
  odlučen.

## Šta mora biti urađeno pre lansiranja

1. **Objaviti bar jedan stvarni, stručno proveren članak.** Sve ostalo je prazna ljuska.
2. **Odobriti indeksiranje posebnim PR-om** — `robots.ts`, globalni `robots` i test, zajedno.
3. Potvrditi pravne podatke i tek tada razmotriti `Organization`.
4. Odlučiti o konačnom vizuelnom identitetu i zameniti privremeni monogram.
5. Sprovesti clarity test sa stvarnim čitaocima (`docs/04` §14.7) — još nije rađen.
6. Rešiti saglasnost za kolačiće ako se ikada uvede analitika.
7. Potvrditi ponašanje `next/image` i keša na hostingu (`docs/01` §16.2).
8. Dodati stranice koje dokumentacija predviđa a koje ne postoje (uređivačka
   politika, o nama, stručni recenzenti) — pre nego što se na njih uputi.

## Alternative koje su odbačene

| Alternativa | Zašto ne |
|---|---|
| Javni URL kao promenljiva okruženja | Kanonska adresa bi se mogla razlikovati po sredini — greška koju treba da spreči |
| `robots.txt` koji se otvara po `NODE_ENV` | Pogrešno podešen build otvorio bi sajt bez ljudske odluke |
| Navesti sitemap u `robots.txt` odmah | Protivrečna poruka uz `Disallow: /` |
| `Article` umesto `MedicalWebPage` | Nema `lastReviewed` ni `reviewedBy` — baš ono što ovaj projekat radi |
| `datePublished` iz `reviewDate` | Neistina koju pretraživač prikazuje korisniku |
| `Organization` sa nazivom „CMZ“ | Pravni podaci nisu potvrđeni |
| `dangerouslySetInnerHTML` za JSON-LD | Projekat ga zabranjuje; escape rešava problem bez njega |
| Stock fotografija na social slici | Rizik od vizuelne stigme, bez informativne vrednosti |
| Statične rute sa `lastModified` iz builda | Datum builda nije datum sadržaja |
