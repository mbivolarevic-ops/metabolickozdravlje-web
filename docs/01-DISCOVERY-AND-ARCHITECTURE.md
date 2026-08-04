# 01 — Discovery & Architecture

**Projekat:** metabolickozdravlje.rs
**Verzija:** 0.1 (nacrt za pregled vlasnika projekta)
**Datum:** 4. avgust 2026.
**Status:** Predlog — ne implementirati dok vlasnik projekta ne odobri.
**Grana:** `docs/01-discovery-and-architecture` (nije mergovano u `main`)

> **Napomena o statusu dokumenta.** Ovo je arhitektonski predlog, ne finalna specifikacija. Sve što je označeno sa **TBD** ili **[ODLUKA]** čeka odluku vlasnika projekta. Nijedan produkcioni kod, deployment, DNS promena, plaćeni servis ni medicinski sadržaj nisu kreirani niti aktivirani u okviru ovog zadatka.

---

## Sadržaj

1. [Sažetak poslovnog cilja](#1-sažetak-poslovnog-cilja)
2. [Pozicioniranje platforme](#2-pozicioniranje-platforme)
3. [Ciljne grupe](#3-ciljne-grupe)
4. [Predloženi sitemap](#4-predloženi-sitemap)
5. [Glavni korisnički tokovi](#5-glavni-korisnički-tokovi)
6. [Predložena Next.js arhitektura](#6-predložena-nextjs-arhitektura)
7. [Predložena struktura repozitorijuma](#7-predložena-struktura-repozitorijuma)
8. [Sanity content model](#8-sanity-content-model)
9. [SEO topic-cluster model](#9-seo-topic-cluster-model)
10. [Lead funnel arhitektura](#10-lead-funnel-arhitektura)
11. [Buduća quiz arhitektura](#11-buduća-quiz-arhitektura)
12. [Referral model](#12-referral-model)
13. [Analytics event plan](#13-analytics-event-plan)
14. [Privacy i compliance rizici](#14-privacy-i-compliance-rizici)
15. [Staging i production model](#15-staging-i-production-model)
16. [Potrebni spoljni nalozi i integracije](#16-potrebni-spoljni-nalozi-i-integracije)
17. [Odluke koje čekaju vlasnika projekta](#17-odluke-koje-čekaju-vlasnika-projekta)
18. [Roadmap za prvih 16 nedelja](#18-roadmap-za-prvih-16-nedelja)

---

## 1. Sažetak poslovnog cilja

### 1.1 Šta gradimo

Nezavisnu edukativnu platformu o metaboličkom zdravlju na srpskom jeziku, koja u roku od 12–18 meseci treba da postane referentna tačka za pretragu tema kao što su insulinska rezistencija, predijabetes, metabolički sindrom i regulacija glukoze na domaćem tržištu.

### 1.2 Zašto ovo ima smisla kao poslovni potez

Tri strukturne prilike:

**Praznina u sadržaju.** Srpsko govorno područje ima izrazito malo strukturiranog, stručno recenziranog i pretraživački optimizovanog sadržaja o metaboličkom zdravlju. Pretraga na srpskom jeziku danas najčešće vraća forumske teme, portalske članke bez autora, prodajne stranice suplemenata i prevedeni sadržaj bez lokalnog konteksta (domaće laboratorijske referentne vrednosti, dostupnost analiza, način funkcionisanja zdravstvenog sistema). To je klasična situacija u kojoj kvalitet i doslednost pobeđuju budžet.

**Visok volumen namere, nizak nivo razumevanja.** Ljudi masovno rade osnovne analize krvi i dobijaju nalaze koje ne umeju da protumače. Pretraga tipa „šta znači povišen HbA1c" ili „insulinska rezistencija simptomi" je pretraga osobe u trenutku aktivne zabrinutosti — dakle osobe koja je spremna da čita duže sadržaje i ostavi kontakt za koristan materijal.

**Trajnost sredstva.** Za razliku od plaćenog saobraćaja, edukativni sadržaj sa izgrađenim autoritetom postaje sredstvo koje generiše kvalifikovan saobraćaj godinama i ne gasi se kad se ugasi budžet.

### 1.3 Merljivi ciljevi

Ciljevi su predlog i podležu korekciji nakon prve tri mesečne kohorte podataka.

| Horizont | Cilj | Metrika |
|---|---|---|
| Nedelja 16 | Tehnički temelj i prvi sadržaj | 12–16 objavljenih recenziranih članaka, Core Web Vitals u zelenom, sajt indeksiran |
| Mesec 6 | Rani organski saobraćaj | 3.000–6.000 organskih sesija mesečno, 25+ ključnih reči u top 10 |
| Mesec 6 | Prvi lead sloj | 400–800 potvrđenih pretplatnika (double opt-in), stopa konverzije na vodič 4–8% |
| Mesec 12 | Autoritet klastera | Vidljivost na 3+ kompletna klastera, prvi prirodni backlinkovi, kviz u produkciji |
| Mesec 18 | Aktivacija monetizacije | Referral sloj aktivan i meren, uz očuvan urednički integritet |

**Šta ovo nije.** Nije cilj brzi lead volumen po svaku cenu. Model je izgradnja poverenja pa tek onda upućivanje — obrnut redosled u zdravstvenoj vertikali sistematski uništava i konverziju i pravnu poziciju.

---

## 2. Pozicioniranje platforme

### 2.1 Definicija u jednoj rečenici

> Metabolickozdravlje.rs objašnjava metaboličko zdravlje razumljivim jezikom, na osnovu proverenih izvora, i pomaže čitaocu da pripremi bolji razgovor sa svojim lekarom.

### 2.2 Granice pozicioniranja

Ove granice su strukturne — ugrađuju se u šablone, komponente i uređivačka pravila, a ne dopisuju se kao ograda na kraju.

**Platforma jeste:**
- edukativni izvor o širem polju metaboličkog zdravlja;
- alat za pripremu korisnika za razgovor sa zdravstvenim stručnjakom;
- mesto sa jasno navedenim autorstvom, recenzijom i izvorima;
- lokalizovana za srpski kontekst (nazivi analiza, referentne vrednosti, dostupnost).

**Platforma nije:**
- MOVU sajt niti vizuelno izveden iz MOVU identiteta;
- internet prodavnica;
- sajt jednog suplementa;
- GLP-1 platforma;
- promocija bilo kog leka;
- prikriveni advertorijal;
- zamena za lekara, dijagnozu ili zdravstvenu ustanovu.

### 2.3 Odnos prema GLP-1 temi

GLP-1 se **ne pojavljuje u prvoj fazi**. Uvodi se najranije kada platforma ima izgrađen autoritet na osnovnim temama, i tada isključivo kao kontrolisan edukativni klaster o mehanizmu i mestu ove klase lekova u lečenju — nikada kao brend, nikada sa pozivom na nabavku, nikada uz cenu, svedočenje ili poređenje proizvoda. Detaljna pravna analiza u sekciji 14.4.

Tehnička posledica za arhitekturu: content model mora imati polje za nivo uredničke kontrole (`editorialTier`) tako da se osetljivi klasteri mogu podvrgnuti strožem workflow-u (obavezna medicinska recenzija + pravni pregled pre objave), i to se sprovodi validacijom u CMS-u, ne dogovorom.

### 2.4 Formulacija o vlasništvu i finansiranju

Termin „nezavisna platforma" koristi se u smislu uredničke nezavisnosti. **Ne koristi se tvrdnja „not pharma-owned" ni bilo koja varijanta te formulacije** dok se vlasnička, izdavačka i disclosure formulacija ne definiše precizno i pravno proveri. Do tada, stranica `/transparentnost/` postoji u sitemap-u kao **placeholder bez teksta** — struktura je spremna, sadržaj čeka pravnu potvrdu.

### 2.5 Ton komunikacije

| Princip | Šta znači u praksi |
|---|---|
| Smiruje, ne alarmira | „Povišena glukoza natašte ne znači automatski dijabetes. Evo šta znači i šta je sledeći korak." |
| Bez krivice | Nikada „nedostatak volje" ili „samo se manje jede". Gojaznost i metabolički poremećaji tretiraju se kao medicinska stanja sa fiziološkim mehanizmima. |
| Konkretno | Svaki članak završava sa „šta je sledeći korak", uključujući konkretna pitanja koja korisnik može poneti lekaru. |
| Bez obećanja | Nema brojki o gubitku kilograma, nema „za 30 dana", nema before/after prikaza. |
| Otvoreno o neizvesnosti | Kada su dokazi slabi ili podeljeni, to se kaže. |

---

## 3. Ciljne grupe

Segmentacija je urađena po **nameri i trenutku**, ne po demografiji — jer namera određuje i sadržaj i strukturu stranice i mesto u funnelu. Demografija se koristi samo za ton i kanal.

### 3.1 Primarni segmenti

**S1 — Osoba sa svežim nalazom („zabrinuti skrining")**
Dobila je nalaz sa povišenom glukozom, HbA1c, trigliceridima, ALT/AST ili nalaz masne jetre na ultrazvuku. Traži prevod nalaza na razumljiv jezik, sada.
- Namera: informaciona, visoka hitnost, visoka spremnost na dužu formu.
- Ulazna tačka: pretraga tipa „referentne vrednosti", „šta znači", „da li je opasno".
- Sadržaj koji ga hvata: klaster laboratorijskih analiza, objašnjenja pojedinačnih parametara.
- Vrednost za platformu: **najkvalitetniji lead segment** — visoka namera, prirodno vodi ka „razgovarajte sa lekarom".

**S2 — Žene 35–55 sa metaboličkim simptomima**
Umor, teško regulisanje telesne mase uprkos trudu, često i PCOS ili perimenopauza. Iza sebe često ima više neuspelih pokušaja sa dijetama i osećaj lične krivice.
- Namera: objašnjenje „zašto kod mene ne radi ono što radi kod drugih".
- Emocionalni okidač: olakšanje kada sazna da postoji fiziološki mehanizam.
- Rizik: ovo je segment koji industrija najagresivnije eksploatiše. Naš diferencijator je odsustvo obećanja.

**S3 — Muškarci 40–60, visceralna gojaznost**
Povišen obim struka, hipertenzija, često izbegava sistematske preglede. Dolazi obično posle „opomene" — tuđe dijagnoze, lošeg nalaza na sistematskom.
- Namera: praktična, rezultatska, izbegava „wellness" ton.
- Sadržaj koji radi: brojke, mehanizmi, rizik izražen konkretno, kratki formati.

**S4 — Porodična istorija dijabetesa tipa 2**
Roditelj ili brat/sestra sa T2D. Preventivna namera, niža hitnost, ali visoka lojalnost sadržaju.
- Prirodan korisnik kviza i newslettera.

**S5 — Osoba sa postavljenom dijagnozom predijabetesa**
Dobila dijagnozu i uputstvo „promenite životni stil", bez konkretne podrške.
- Najviša spremnost za lead magnet i najduže zadržavanje.

### 3.2 Sekundarni segment

**S6 — Zdravstveni radnici i nutricionisti**
Ne ciljna grupa za konverziju, ali važni za autoritet: citiranje, deljenje, potencijalna saradnja i recenzija. Utiču na E-E-A-T signale.

### 3.3 Mapiranje segmenata na funnel

| Segment | Faza svesti | Primarni klaster | Funnel stage sadržaja |
|---|---|---|---|
| S1 | Simptom/nalaz | Laboratorijske analize | TOFU → MOFU |
| S2 | Problem, bez imena | Insulinska rezistencija, telesna masa | TOFU |
| S3 | Nesvestan/odbijajući | Metabolički sindrom, visceralno salo | TOFU |
| S4 | Rizik | Prevencija T2D | MOFU |
| S5 | Rešenje | Ishrana, aktivnost, san i stres | MOFU → BOFU |

`funnelStage` je polje u content modelu (sekcija 8) kako bi se merio doprinos svakog klastera, a ne samo saobraćaj.

---

## 4. Predloženi sitemap

### 4.1 Konvencije

- **Pismo:** latinica kao primarno. Ćirilična verzija je **[ODLUKA 2]** — ima SEO vrednost na domaćem tržištu, ali udvostručuje uređivački teret i traži `hreflang`/canonical strategiju. Preporuka: latinica u fazi 1, ćirilica kao potencijalna faza 3.
- **Slugovi:** bez dijakritike (`insulinska-rezistencija`, `masna-jetra`). Nikada ID-evi ni datumi u URL-u.
- **Dubina:** maksimalno tri nivoa. Klaster → članak, bez dodatnog gnežđenja.
- **Stabilnost:** slug se nakon objave ne menja bez 301 redirekcije upisane u CMS (`redirect` dokument, sekcija 8).

### 4.2 Struktura

```
/                                       Početna
/teme/                                  Pregled svih klastera (hub)
  /teme/insulinska-rezistencija/        Pillar
    /teme/insulinska-rezistencija/[slug]/   Članci klastera
  /teme/metabolicki-sindrom/
  /teme/predijabetes/
  /teme/regulacija-glukoze/
  /teme/telesna-masa-i-metabolizam/
  /teme/ishrana/
  /teme/fizicka-aktivnost/
  /teme/san-i-stres/
  /teme/masna-jetra/
  /teme/laboratorijske-analize/
  /teme/prevencija-dijabetesa-tip-2/

/vodici/                                Pregled besplatnih vodiča (lead magneti)
  /vodici/[slug]/                       Landing stranica pojedinačnog vodiča
  /vodici/[slug]/hvala/                 Potvrda prijave (noindex)
  /vodici/potvrda/                      Double opt-in potvrda (noindex)

/pitanja/                               FAQ baza, grupisana po klasterima
  /pitanja/[slug]/                      Pojedinačno pitanje sa detaljnim odgovorom

/recnik/                                Rečnik pojmova
  /recnik/[termin]/                     Definicija + veze ka klasterima

/kviz/                                  FAZA 2 — ne gradi se sada
  /kviz/rezultat/                       noindex

/o-nama/                                O platformi i misiji
/urednicka-politika/                    Kako nastaje sadržaj, izvori, recenzija
/strucni-recenzenti/                    Profili recenzenata
/kontakt/

/pravno/politika-privatnosti/
/pravno/uslovi-koriscenja/
/pravno/kolacici/
/pravno/medicinski-disclaimer/
/transparentnost/                       PLACEHOLDER — tekst TBD, pravno neproveren

/pretraga/                              Interna pretraga (noindex)
/sitemap.xml  /robots.txt  /rss.xml
```

### 4.3 Obrazloženje ključnih izbora

**Zašto `/teme/` a ne `/blog/`.** „Blog" signalizira hronološki, lični, neobavezan sadržaj. Struktura klastera signalizira referentnu bazu. To utiče i na percepciju korisnika i na način na koji pretraživač tumači arhitekturu sajta.

**Zašto zaseban `/pitanja/` sloj.** Kratka pitanja („da li je insulinska rezistencija isto što i dijabetes") ne zaslužuju članak od 2.000 reči, ali hvataju veliki volumen dugorepe pretrage i savršeno se uklapaju u glasovnu pretragu i AI odgovore. Zaseban tip dokumenta dozvoljava i `FAQPage` strukturirane podatke i ugrađivanje istog pitanja unutar više članaka bez dupliranja sadržaja.

**Zašto `/recnik/`.** Najjeftiniji način da se izgradi interna mreža linkova i pokrije terminološka pretraga. Svaki termin postaje čvor koji vezuje klastere.

**Zašto `/urednicka-politika/` i `/strucni-recenzenti/` od prvog dana.** Ovo je YMYL (Your Money or Your Life) niša. Bez vidljivog autorstva, kvalifikacija recenzenta i izvora, sadržaj ima strukturno ograničen domet — bez obzira na kvalitet teksta.

---

## 5. Glavni korisnički tokovi

### 5.1 Tok A — Organski dolazak → edukacija → lead (primarni)

```
Google/AI pretraga
   ↓
Članak u klasteru (npr. „Šta znači povišen HbA1c")
   ↓  [sadržaj odgovara na pitanje u prvih 100 reči]
Ključni zaključci → objašnjenje mehanizma → šta dalje
   ↓
Kontekstualni CTA (inline, ne popup): „Preuzmite besplatan praktični vodič…"
   ↓
Landing vodiča → forma (email + saglasnost)
   ↓
Ekran „Proverite email"
   ↓
Email sa potvrdom (double opt-in)
   ↓
Potvrda → dostava vodiča preko potpisanog linka sa rokom važenja
   ↓
Nurture sekvenca (edukativna, bez prodaje)
```

**Namerne odluke u ovom toku:**
- **Bez exit-intent popupa i bez tajmera.** U zdravstvenom kontekstu prekidajući obrasci narušavaju poverenje kod segmenta koji je najvredniji (S1, u stanju zabrinutosti). Inline CTA sa nižom stopom klika a višom kvalitetom prijave je bolja razmena.
- **Double opt-in nije opcija nego zahtev** — dokaziv pristanak po ZZPL, viša isporučivost, čista baza.
- **Vodič se ne servira direktno posle forme** nego posle potvrde, i to preko linka sa rokom važenja. Sprečava sakupljanje sadržaja botovima i čini pristanak proverljivim.

### 5.2 Tok B — Dubinsko istraživanje (bez konverzije)

```
Ulaz na članak → „Povezano" → pillar stranica → drugi članak → rečnik → FAQ
```
Cilj nije konverzija nego dubina sesije i povratak. Meri se kao `pages_per_session` i udeo povratnih posetilaca po klasteru. Svaki članak mora imati 3–5 relevantnih internih veza, generisanih iz `cluster` + `relatedArticles` polja, nikada ručno održavanih listi.

### 5.3 Tok C — Priprema za lekara (diferencijator)

```
Članak → sekcija „Pitanja za vašeg lekara" → PDF/print verzija liste pitanja
```
Ovo je najjači element diferencijacije i ujedno najbezbedniji sa compliance strane: platforma ne daje savet, nego povećava kvalitet konsultacije. Implementira se kao ponovljivi Portable Text blok (`doctorQuestions`), dostupan za štampu bez email gate-a.

### 5.4 Tok D — Kviz (faza 2, arhitektonski predviđen)

```
Ulazna tačka → kviz (bez PII) → obrazovna kategorija rezultata → preporučeni sadržaj → „razgovarajte sa lekarom"
                                          ↓ opciono
                                    email za detaljniji materijal
```
Detalji i pravna ograničenja u sekciji 11.

### 5.5 Tok E — Referral (faza 3, danas neaktivan)

```
Članak → kontekstualni blok destinacije → vidljivo obelodanjivanje → izlazni link sa UTM
```
U fazi 1 komponenta postoji, ali **nijedna destinacija nije aktivna** i komponenta ne renderuje ništa. Detalji u sekciji 12.

---

## 6. Predložena Next.js arhitektura

### 6.1 Osnovni izbori

| Sloj | Izbor | Obrazloženje |
|---|---|---|
| Framework | Next.js, App Router | Server komponente, granularna revalidacija, dobra podrška strukturiranim podacima |
| Jezik | TypeScript, `strict: true` | Content model sa medicinskim poljima mora biti tipski proveren |
| Stilizacija | Tailwind CSS + `@tailwindcss/typography` | Dugački tekstualni sadržaj traži disciplinovan tipografski sistem |
| CMS | Sanity (hostovan studio na `/studio` ili zaseban) | Portable Text, validacija na nivou dokumenta, GROQ, dobra podrška urednicima |
| Renderovanje | SSG + ISR preko tagova | Sadržaj je pretežno statičan; revalidacija se pokreće webhookom iz CMS-a |
| Runtime | Node.js 20 LTS | Zahtev Hostinger okruženja |
| Build output | `output: 'standalone'` | Manji artefakt, predvidljiviji start na upravljanom hostingu |
| Paketi | npm | Nema tehničkog razloga za odstupanje |

### 6.2 Strategija renderovanja po tipu stranice

| Ruta | Strategija | Revalidacija |
|---|---|---|
| `/`, `/teme/**`, `/pitanja/**`, `/recnik/**` | Statički generisano | `revalidateTag` iz Sanity webhooka + vremenski fallback 1h |
| `/vodici/[slug]` | Statički | Webhook |
| `/pravno/**`, `/o-nama/` | Statički | Webhook |
| `/pretraga/` | Klijentski, nad prethodno izgrađenim indeksom | Build-time |
| `/api/leads/subscribe` | Server rutа (Node runtime) | — |
| `/api/revalidate` | Server ruta, potpis webhooka obavezan | — |
| `/kviz/` (faza 2) | Statička ljuska, klijentsko izračunavanje | — |

**Važno ograničenje:** ne koristiti Edge runtime niti oslanjati se na funkcije specifične za Vercel (Image Optimization sa spoljnim loaderom, Edge Middleware sa geo podacima). Hostinger je upravljano Node okruženje — arhitektura mora ostati prenosiva čistim `next start`.

### 6.3 Rizik: ISR na upravljanom Node hostingu

ISR upisuje regenerisane stranice u keš na disku. Na upravljanim platformama to zahteva postojan i upisiv fajl sistem i, kod više instanci, deljen keš. **Ovo je najozbiljniji tehnički rizik projekta** i traži proveru pre nego što se arhitektura zaključa.

Redosled mitigacije:
1. **Provera** — test ISR ponašanja na stvarnom Hostinger paketu pre nedelje 4 (sekcija 16.2).
2. **Ako ISR ne radi pouzdano** — prelazak na potpuno statički build sa deploy hookom: promena u CMS-u pokreće rebuild preko GitHub Actions. Sporije (2–4 min do vidljivosti) ali potpuno pouzdano, i za edukativni sadžaj bez vesti sasvim prihvatljivo.
3. **Ako ni to nije izvodljivo** — razgovor o promeni paketa. Nikakva promena hostinga se ne izvodi bez odobrenja vlasnika.

Arhitektura se zato piše tako da je prelaz između ova dva režima izmena jedne konfiguracione vrednosti, a ne prepisivanje aplikacije.

### 6.4 Sloj pristupa podacima

Sve GROQ upite držati u `src/sanity/queries/`, nikada inline u komponentama. Razlog: medicinski sadržaj ima polja koja se moraju uvek povlačiti zajedno (recenzent, datum recenzije, izvori). Centralizovani upiti sprečavaju da neki šablon slučajno prikaže članak bez atribucije recenzenta.

```ts
// src/sanity/queries/article.ts  — ilustracija, ne finalni kod
export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    title, slug, excerpt, body, funnelStage, editorialTier,
    "cluster": cluster->{title, "slug": slug.current},
    "author": author->{name, credentials, "slug": slug.current},
    "reviewer": reviewedBy->{name, credentials, licenseNote, "slug": slug.current},
    reviewDate, nextReviewDate,
    references[]{label, url, publisher, year},
    "related": relatedArticles[]->{title, excerpt, "slug": slug.current}
  }
`
```

### 6.5 Performanse (budžet, ne aspiracija)

| Metrika | Cilj | Kako se drži |
|---|---|---|
| LCP (mobilni, 4G) | < 2,0 s | Statički HTML, `next/font` sa `display: swap`, bez hero videa |
| INP | < 150 ms | Minimalno klijentskog JS-a; interaktivne su samo forma, pretraga, kviz |
| CLS | < 0,05 | Eksplicitne dimenzije slika, rezervisan prostor za CTA blokove |
| JS na članku | < 100 KB gzip | Server komponente kao podrazumevano; `'use client'` je izuzetak koji se obrazlaže |

Uvodi se `@next/bundle-analyzer` i provera veličine paketa u CI-ju od prve nedelje — regresija performansi se najjeftinije sprečava dok je kodna baza mala.

### 6.6 Pristupačnost

WCAG 2.1 AA kao ulazni kriterijum, ne naknadna revizija. Konkretno: minimalni kontrast 4,5:1 za tekst, potpuna navigacija tastaturom, vidljiv fokus, semantička hijerarhija naslova (jedan `h1`), `prefers-reduced-motion`, minimalna veličina teksta 16px na mobilnom. Ciljna publika uključuje osobe 50+ sa mogućim dijabetesnim oštećenjem vida — ovo je funkcionalni zahtev, ne formalnost.

### 6.7 Bezbednost

- Content Security Policy sa `nonce` vrednostima, bez `unsafe-inline` za skripte.
- Svi tajni podaci isključivo u environment varijablama; nikada u repozitorijumu, nikada u klijentskom paketu (samo `NEXT_PUBLIC_*` ide na klijent, i to sadrži isključivo nepoverljive vrednosti).
- Ograničenje broja zahteva na `/api/leads/subscribe` (po IP-u i globalno) + honeypot polje + provera vremena popunjavanja forme. Bez CAPTCHA u prvoj fazi — dodaje trenje i šalje podatke trećoj strani.
- Obavezna provera potpisa Sanity webhooka na `/api/revalidate`.
- Sigurnosna zaglavlja: `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` sa isključenim nekorišćenim API-jima.
- Sanity API token sa isključivo read pravima za javni sajt; write token postoji samo u studiju.

---

## 7. Predložena struktura repozitorijuma

> **Ne kreirati dok vlasnik projekta ne odobri.** Prikazano radi pregleda.

```
metabolickozdravlje.rs/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # lint, typecheck, test, build, bundle budget
│       └── deploy-staging.yml        # TBD nakon potvrde Hostinger paketa
├── docs/
│   ├── 01-DISCOVERY-AND-ARCHITECTURE.md    # ovaj dokument
│   ├── 02-CONTENT-MODEL.md                 # TBD
│   ├── 03-EDITORIAL-GUIDELINES.md          # TBD — obavezno pre prvog članka
│   ├── 04-COMPLIANCE-CHECKLIST.md          # TBD — obavezno pre prvog članka
│   ├── 05-DEPLOYMENT.md                    # TBD nakon potvrde hostinga
│   └── adr/                                # Architecture Decision Records
│       └── 0001-hosting-and-rendering.md
├── public/
│   ├── fonts/
│   └── favicon/
├── sanity/
│   ├── schemas/
│   │   ├── documents/                # article, cluster, faq, guide, author…
│   │   ├── objects/                  # portableText, seo, reference, callout…
│   │   └── index.ts
│   ├── lib/                          # klijent, image url builder
│   ├── desk/                         # struktura studija za urednike
│   └── sanity.config.ts
├── src/
│   ├── app/
│   │   ├── (site)/                   # javne stranice sa zajedničkim layoutom
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── teme/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [cluster]/
│   │   │   │       ├── page.tsx
│   │   │   │       └── [slug]/page.tsx
│   │   │   ├── vodici/[slug]/
│   │   │   ├── pitanja/
│   │   │   ├── recnik/
│   │   │   ├── pravno/[slug]/
│   │   │   └── transparentnost/      # placeholder
│   │   ├── (legal-lite)/             # stranice bez CTA slojeva
│   │   ├── api/
│   │   │   ├── leads/subscribe/route.ts
│   │   │   ├── revalidate/route.ts
│   │   │   └── health/route.ts
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── content/                  # PortableText renderers, Callout, KeyTakeaways
│   │   ├── medical/                  # ReviewerByline, MedicalDisclaimer, ReferenceList
│   │   ├── funnel/                   # GuideCta, LeadForm, DoctorQuestions
│   │   ├── referral/                 # ReferralLink, ReferralDisclosure (neaktivno)
│   │   ├── layout/
│   │   └── ui/
│   ├── lib/
│   │   ├── analytics/                # tipizirani event tracker
│   │   ├── seo/                      # metadata + JSON-LD generatori
│   │   ├── leads/                    # validacija, provider adapter
│   │   ├── referral/                 # resolver destinacija + UTM builder
│   │   └── utils/
│   ├── sanity/
│   │   ├── client.ts
│   │   ├── queries/
│   │   └── types.ts                  # generisano iz šema
│   └── styles/
├── tests/
│   ├── unit/
│   └── e2e/                          # Playwright: lead forma, navigacija, a11y
├── .env.example                      # bez ijedne stvarne vrednosti
├── .eslintrc.json  .prettierrc  tsconfig.json
├── next.config.mjs  tailwind.config.ts
├── package.json
└── README.md
```

### 7.1 Obrazloženje netrivijalnih izbora

**`sanity/` odvojen od `src/`.** Šeme su domenski model, ne aplikacioni kod. Odvajanje omogućava da se studio kasnije izdvoji u zaseban deployment bez preseljenja koda.

**`components/medical/` kao zasebna kategorija.** Komponente koje nose pravnu težinu (potpis recenzenta, medicinski disclaimer, lista izvora) drže se odvojeno od običnog UI-ja. Cilj je da izmena tih komponenti bude uočljiva u code review-u — ne sme se desiti da neko „očisti" disclaimer refaktorisanjem stila.

**`components/referral/` postoji od početka, prazan od sadržaja.** Referral sloj se gradi kao infrastruktura sada da se kasnije ne bi improvizovao pod pritiskom roka.

**ADR folder.** Odluke tipa „zašto ISR a ne pun rebuild" moraju imati pisani trag sa datumom i kontekstom, jer će se preispitivati za šest meseci.

---

## 8. Sanity content model

### 8.1 Princip modela

Model je izgrađen oko jednog pravila: **medicinski sadržaj ne može biti objavljen bez atribucije i datuma recenzije.** To se ne sprovodi uputstvom uredniku nego validacijom koja blokira objavu. Sve ostalo je izvedeno iz tog pravila.

### 8.2 Tipovi dokumenata

| Tip | Svrha | Ključna polja |
|---|---|---|
| `cluster` | Pillar tema (npr. insulinska rezistencija) | `title`, `slug`, `intro`, `pillarBody`, `seo`, `order`, `icon` |
| `article` | Edukativni članak unutar klastera | vidi 8.3 |
| `faq` | Pojedinačno pitanje i odgovor | `question`, `answer` (kratki PT), `cluster`, `reviewedBy`, `reviewDate` |
| `glossaryTerm` | Pojam u rečniku | `term`, `slug`, `shortDefinition`, `longDefinition`, `synonyms[]`, `relatedTerms[]` |
| `guide` | Lead magnet | `title`, `slug`, `promise`, `whatYouGet[]`, `coverImage`, `assetFile`, `landingBody`, `consentTextRef`, `active` |
| `author` | Autor teksta | `name`, `slug`, `bio`, `credentials`, `photo`, `links[]` |
| `medicalReviewer` | Stručni recenzent | `name`, `slug`, `credentials`, `specialty`, `institutionNote`, `bio`, `photo` |
| `legalPage` | Pravne stranice | `title`, `slug`, `body`, `version`, `effectiveDate`, `lastLegalReview` |
| `siteSettings` | Singleton | navigacija, footer, podrazumevani SEO, globalni disclaimer, kontakt |
| `referralDestination` | Registar referral destinacija | vidi sekciju 12 |
| `redirect` | 301 mapiranja | `from`, `to`, `permanent`, `createdAt`, `reason` |
| `quizDefinition` | FAZA 2 | vidi sekciju 11 |

### 8.3 Šema članka (najvažniji tip)

```ts
// sanity/schemas/documents/article.ts — ilustracija strukture, ne finalni kod
defineType({
  name: 'article',
  title: 'Članak',
  type: 'document',
  groups: [
    { name: 'content', title: 'Sadržaj', default: true },
    { name: 'medical', title: 'Medicinska kontrola' },
    { name: 'seo',     title: 'SEO' },
    { name: 'funnel',  title: 'Funnel' },
  ],
  fields: [
    // ——— SADRŽAJ ———
    { name: 'title',    type: 'string', group: 'content', validation: R => R.required().max(70) },
    { name: 'slug',     type: 'slug',   group: 'content', options: { source: 'title', maxLength: 72 } },
    { name: 'excerpt',  type: 'text',   group: 'content', rows: 3,
      description: 'Direktan odgovor na pitanje iz naslova, u 2–3 rečenice.',
      validation: R => R.required().max(200) },
    { name: 'cluster',  type: 'reference', to: [{ type: 'cluster' }], group: 'content',
      validation: R => R.required() },
    { name: 'contentType', type: 'string', group: 'content',
      options: { list: ['objasnjenje', 'kako-uraditi', 'provera-mita', 'tumacenje-nalaza', 'pregled-dokaza'] } },
    { name: 'keyTakeaways', type: 'array', of: [{ type: 'string' }], group: 'content',
      description: '3–5 zaključaka. Prikazuju se na vrhu članka.',
      validation: R => R.min(3).max(5) },
    { name: 'body',     type: 'portableText', group: 'content' },
    { name: 'doctorQuestions', type: 'array', of: [{ type: 'string' }], group: 'content',
      description: 'Pitanja koja čitalac može poneti lekaru.' },

    // ——— MEDICINSKA KONTROLA ———
    { name: 'author',       type: 'reference', to: [{ type: 'author' }], group: 'medical',
      validation: R => R.required() },
    { name: 'reviewedBy',   type: 'reference', to: [{ type: 'medicalReviewer' }], group: 'medical' },
    { name: 'reviewDate',   type: 'date', group: 'medical' },
    { name: 'nextReviewDate', type: 'date', group: 'medical',
      description: 'Podrazumevano 18 meseci od recenzije.' },
    { name: 'editorialTier', type: 'string', group: 'medical',
      options: { list: [
        { title: 'Standardno (opšta edukacija)', value: 'standard' },
        { title: 'Povišeno (dijagnostika, laboratorija)', value: 'elevated' },
        { title: 'Osetljivo (terapije, lekovi) — traži i pravni pregled', value: 'sensitive' },
      ]},
      initialValue: 'standard', validation: R => R.required() },
    { name: 'references', type: 'array', of: [{ type: 'reference_item' }], group: 'medical',
      description: 'Primarni izvori: SZO, EASD/ADA, NICE, recenzirani radovi.' },
    { name: 'legalReviewed', type: 'boolean', group: 'medical', initialValue: false,
      hidden: ({ document }) => document?.editorialTier !== 'sensitive' },

    // ——— FUNNEL ———
    { name: 'funnelStage', type: 'string', group: 'funnel',
      options: { list: ['TOFU', 'MOFU', 'BOFU'] } },
    { name: 'targetPersona', type: 'array', of: [{ type: 'string' }], group: 'funnel',
      options: { list: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'] } },
    { name: 'primaryGuide', type: 'reference', to: [{ type: 'guide' }], group: 'funnel',
      description: 'Vodič koji se nudi u kontekstualnom CTA bloku.' },
    { name: 'relatedArticles', type: 'array', of: [{ type: 'reference', to: [{ type: 'article' }] }],
      group: 'funnel', validation: R => R.max(6) },

    // ——— SEO ———
    { name: 'seo', type: 'seo', group: 'seo' },
  ],

  // KLJUČNA VALIDACIJA: bez recenzenta i datuma nema objave
  validation: R => R.custom((doc) => {
    if (doc?.editorialTier === 'standard') return true
    if (!doc?.reviewedBy || !doc?.reviewDate)
      return 'Članci povišenog i osetljivog nivoa ne mogu se objaviti bez stručnog recenzenta i datuma recenzije.'
    if (doc?.editorialTier === 'sensitive' && !doc?.legalReviewed)
      return 'Osetljiv sadržaj zahteva potvrđen pravni pregled.'
    return true
  }),
})
```

### 8.4 Portable Text — dozvoljeni blokovi

Uredniku se **ne daje slobodan HTML**. Dozvoljeni su isključivo definisani blokovi, jer svaki nosi semantiku koja se koristi za strukturirane podatke i pristupačnost:

| Blok | Namena |
|---|---|
| `callout` | Napomena, upozorenje ili važna informacija (varijante: info, oprez, važno) |
| `keyFigure` | Istaknut podatak sa obaveznim izvorom |
| `comparisonTable` | Poređenje (npr. glukoza natašte vs. OGTT vs. HbA1c) |
| `stepList` | Numerisan postupak |
| `faqEmbed` | Ugrađuje postojeći `faq` dokument (bez dupliranja teksta) |
| `guideCta` | Kontekstualni CTA za vodič |
| `referralBlock` | **Neaktivno u fazi 1.** Renderuje se samo ako je destinacija aktivna |
| `doctorQuestions` | Blok „pitanja za lekara" |
| `imageWithCaption` | Obavezan `alt` tekst, validacija blokira snimanje bez njega |
| `citationMark` | Inline oznaka izvora, vezuje se za `references[]` |

Namerno **nema** blokova za: cene, before/after galerije, odbrojavanje, svedočenja pacijenata. Ono što ne postoji u modelu ne može se objaviti pod pritiskom roka.

### 8.5 Uređivački workflow

```
Nacrt → Autorski pregled → Medicinska recenzija → [Pravni pregled ako je osetljivo] → Objavljeno
                                                                                          ↓
                                                                        Zakazana ponovna recenzija (18 meseci)
```

Sanity struktura studija (`desk/`) prikazuje uredniku tri liste: „Čeka recenziju", „Za ponovnu recenziju (istekao rok)", „Objavljeno". Sadržaj kome je istekao `nextReviewDate` prikazuje se u frontendu sa nenametljivom oznakom datuma poslednje provere — transparentnost umesto tihe zastarelosti.

### 8.6 Datasetovi

- `production` — javni sadržaj.
- `staging` — testni sadržaj, nikada realni lični podaci.

Sadržaj se ne kopira automatski između njih. Migracije idu skriptom sa eksplicitnim pokretanjem.

---

## 9. SEO topic-cluster model

### 9.1 Struktura

Model je hub-and-spoke: jedan pillar po klasteru, 6–12 potpornih članaka, dodatno FAQ i pojmovi rečnika kao mreža sitnijih čvorova.

```
        [Pillar: Insulinska rezistencija]
                     │
   ┌──────────┬──────┴──────┬────────────┐
   ▼          ▼             ▼            ▼
Simptomi   Dijagnostika   Ishrana    Odnos prema T2D
   │          │             │            │
   └──── FAQ i pojmovi rečnika (unakrsno) ────┘
```

### 9.2 Pravila internog povezivanja

Sprovode se kodom, ne uređivačkom disciplinom:
- svaki članak automatski linkuje ka svom pillar-u (breadcrumb + kontekstualno);
- pillar linkuje ka svim člancima klastera;
- 3–5 unakrsnih veza po članku iz `relatedArticles`;
- prvo pojavljivanje pojma iz rečnika automatski se linkuje (jednom po stranici, ne više);
- nema linkova ka spoljnim komercijalnim odredištima u fazi 1.

### 9.3 Prioritet klastera za prvih 16 nedelja

Redosled je određen odnosom namere i konkurencije, ne volumenom pretrage.

| Prioritet | Klaster | Obrazloženje |
|---|---|---|
| 1 | Laboratorijske analize | Najviša namera (S1), najslabija domaća konkurencija, prirodan izlaz ka „razgovarajte sa lekarom" |
| 2 | Insulinska rezistencija | Najveći volumen, veliki emocionalni naboj (S2), definiše platformu |
| 3 | Predijabetes | Jasna namera, direktno vezuje prevenciju |
| 4 | Metabolički sindrom | Krovni pojam koji povezuje sve ostalo |
| 5 | Masna jetra | Rastuća svest, gotovo prazan domaći sadržaj |
| 6+ | Ishrana, aktivnost, san i stres, telesna masa, glukoza, prevencija T2D | Faza 2 |

**Namerno se ne kreće od klastera „ishrana"** — najviši volumen ali i najzasićenija konkurencija, uz najmanju diferencijaciju.

### 9.4 Strukturirani podaci

| Tip stranice | Schema.org |
|---|---|
| Članak (medicinski) | `MedicalWebPage` + `Article`, sa `reviewedBy` i `lastReviewed` |
| Pillar | `CollectionPage` + `BreadcrumbList` |
| FAQ stranica | `FAQPage` |
| Pojam rečnika | `DefinedTerm` unutar `DefinedTermSet` |
| Recenzent | `Person` sa `hasCredential` |
| Ceo sajt | `Organization` (naziv izdavača **TBD**, sekcija 17) i `WebSite` sa `SearchAction` |

`reviewedBy` i `lastReviewed` polja u `MedicalWebPage` postoje upravo zbog YMYL sadržaja i predstavljaju eksplicitan signal kvaliteta koji naša konkurencija na domaćem tržištu gotovo nikada ne šalje.

### 9.5 Vidljivost u AI odgovorima

Sve veći udeo zdravstvenih pretraga završava u generisanim odgovorima bez klika. Prilagođavanje:
- direktan odgovor u prve dve rečenice (`excerpt` polje je namenski dizajnirano za to);
- „Ključni zaključci" u strukturiranoj listi na vrhu;
- pitanja kao naslovi sekcija (`h2` formulisan kao pitanje);
- svaka tvrdnja sa izvorom koji se može navesti;
- `llms.txt` u korenu sajta sa opisom platforme i uređivačke politike.

Rezultat se ne meri samo klikovima nego i pojavljivanjem naziva platforme kao citiranog izvora — što treba pratiti ručno, mesečno.

### 9.6 Tehnički SEO

Kanonske adrese na svakoj stranici; dinamički `sitemap.xml` iz Sanity podataka sa `lastmod` iz `reviewDate`; `noindex` na `/pretraga/`, `/vodici/*/hvala/`, `/kviz/rezultat/`; 301 redirekcije iz `redirect` dokumenata; `hreflang` samo ako se uvede ćirilica; Google Search Console i Bing Webmaster od prvog dana.

**Ne radi se:** masovna generacija članaka, programatski SEO, sadržaj bez recenzije. U YMYL niši to je najbrži put do trajnog gubitka vidljivosti.

---

## 10. Lead funnel arhitektura

### 10.1 CTA hijerarhija (faza 1)

| Nivo | Poruka | Mesto |
|---|---|---|
| Primarni | „Preuzmite besplatan praktični vodič za ishranu koja podržava metaboličko zdravlje." | Inline u članku (posle ~60% teksta), na kraju članka, `/vodici/` |
| Sekundarni | „Istražite teme o metaboličkom zdravlju." | Zaglavlje, kraj članka, početna |
| Nema trećeg nivoa | Bez referral, bez prodaje, bez zakazivanja | — |

### 10.2 Tehnički tok prijave

```
Klijent: forma (email + obavezna saglasnost + honeypot + vremenska oznaka)
   │  POST
   ▼
/api/leads/subscribe  (Node runtime)
   ├─ Zod validacija + provera formata email-a
   ├─ Honeypot i minimalno vreme popunjavanja (< 2s = odbaci)
   ├─ Ograničenje broja zahteva (po IP-u + globalno)
   ├─ Upis pristanka: tekst pristanka, verzija, vremenska oznaka, izvorna stranica
   ├─ Poziv ka provajderu (adapter interfejs, provajder TBD)
   └─ Vraća neutralan odgovor (isti odgovor i ako email već postoji — bez otkrivanja baze)
   ▼
Transakcioni email sa potvrdom (double opt-in), token važi 72h
   ▼
/vodici/potvrda?token=…  → verifikacija → dostava vodiča preko potpisanog URL-a (rok 24h)
   ▼
Nurture sekvenca
```

### 10.3 Šta se čuva, a šta namerno ne

**Čuva se:** email adresa; vremenska oznaka i verzija teksta pristanka; stranica sa koje je prijava došla; identifikator vodiča; UTM parametri kampanje; status potvrde.

**Ne čuva se:** ime i prezime (nepotrebno za dostavu vodiča); nikakav podatak o zdravstvenom stanju, telesnoj masi, simptomima ni nalazima; broj telefona; datum rođenja.

Ovo je namerna arhitektonska odluka, ne propust. Podaci o zdravstvenom stanju su po Zakonu o zaštiti podataka o ličnosti posebna vrsta podataka sa znatno strožim režimom obrade. Segmentacija se postiže **ponašanjem** (koji vodič, koji klaster, šta je otvoreno), što daje gotovo istu marketinšku preciznost bez ulaska u režim posebnih kategorija. Kad se jednom u bazi nađe podatak „korisnik ima predijabetes", sve — od izbora provajdera do ugovora o obradi i obaveze prijave incidenta — postaje višestruko složenije.

### 10.4 Nurture sekvenca (predlog, sadržaj TBD)

Pet edukativnih poruka kroz 14 dana, isključivo obrazovnih:

| # | Dan | Tema | CTA |
|---|---|---|---|
| 1 | 0 | Dostava vodiča + kako ga koristiti | Otvorite vodič |
| 2 | 2 | Najčešća zabluda o metaboličkom zdravlju | Pročitajte članak |
| 3 | 5 | Kako razumeti svoj nalaz | Klaster laboratorije |
| 4 | 9 | Šta pitati lekara na sledećem pregledu | Preuzmite listu pitanja |
| 5 | 14 | Šta dalje + poziv na odgovor | Odgovorite sa svojim pitanjem |

Peta poruka traži odgovor namerno: podiže isporučivost i daje kvalitativan uvid u stvarna pitanja publike — najbolji ulaz za planiranje sledećih tema. Svaka poruka sadrži jasan link za odjavu i identitet pošiljaoca.

### 10.5 Merenje

| Metrika | Referentni cilj |
|---|---|
| Prikaz CTA → klik | 6–12% |
| Klik → započeta forma | 40–60% |
| Forma → poslata | 55–75% |
| Poslata → potvrđena (double opt-in) | 60–80% |
| Ukupna konverzija posete u potvrđen lead | 2–5% |
| Otvaranje nurture sekvence | 35%+ |

Praćenje po klasteru — očekivanje je da klaster laboratorijskih analiza značajno nadmašuje ostale, što bi tada trebalo da preusmeri prioritet sadržaja.

---

## 11. Buduća quiz arhitektura

> **Faza 2. Ne implementira se sada.** Ovde se definišu ograničenja da bi arhitektura bila spremna.

### 11.1 Najvažnije ograničenje

Kviz **ne sme** davati procenu rizika, verovatnoću, skor niti bilo šta što liči na dijagnostički zaključak. Softver koji na osnovu unetih zdravstvenih podataka daje individualnu procenu zdravstvenog stanja može potpasti pod regulativu o medicinskim sredstvima — što bi značilo potpuno drugačiji režim, sertifikaciju i odgovornost.

Bezbedno pozicioniranje: **obrazovni orijentir, ne procena.**

| Ne sme | Sme |
|---|---|
| „Vaš rizik od dijabetesa je 34%" | „Teme koje su najvažnije za vašu situaciju" |
| „Verovatno imate insulinsku rezistenciju" | „Evo šta insulinska rezistencija jeste i koje analize se obično rade" |
| „Preporučena terapija" | „Pitanja koja možete poneti lekaru" |
| Numerički skor rizika | Kategorija sadržaja |

Ako se ikada poželi validirani instrument procene rizika, to je zaseban projekat sa pravnom analizom, a ne proširenje kviza.

### 11.2 Tehnički pristup

- 7–10 pitanja, definisanih kao `quizDefinition` dokument u Sanity — logika u sadržaju, ne u kodu, da bi se menjala bez deploy-a.
- **Izračunavanje isključivo na klijentu.** Odgovori ne napuštaju uređaj i ne šalju se serveru.
- Rezultat je kategorija sadržaja (npr. „fokus na razumevanje nalaza"), koja mapira na klastere i članke.
- Analytics beleži samo `quiz_start`, `quiz_complete` i kategoriju rezultata — nikada pojedinačne odgovore.
- Email nije uslov za rezultat. Rezultat se prikazuje odmah; email se nudi tek posle rezultata i samo za dodatni materijal. **[ODLUKA 9]**
- Obavezan disclaimer pre prvog pitanja i uz rezultat, uz alarmno pravilo: ako odgovori ukažu na simptome koji traže hitnu pažnju, prikazuje se jasna preporuka da se odmah obrati lekaru — bez obzira na ostatak toka.

### 11.3 Zašto je vredno uprkos ograničenjima

Kviz je najbolji mehanizam za razvrstavanje prometa po segmentu bez postavljanja ijednog direktnog pitanja o zdravlju u bazi, daje visok angažman i prirodno vodi ka relevantnom sadržaju. Vrednost je u navigaciji i personalizaciji sadržaja, ne u prikupljanju podataka.

---

## 12. Referral model

### 12.1 Stanje u fazi 1

**Nema aktivnih referral linkova. Nema pominjanja MOVU. Nema pominjanja NN.** Gradi se isključivo infrastruktura koja kasnije može primiti destinaciju, uz mogućnost trenutnog isključivanja.

### 12.2 Model podataka

```ts
// sanity/schemas/documents/referralDestination.ts — struktura
{
  name: 'referralDestination',
  fields: [
    { name: 'internalName',   type: 'string' },   // interna oznaka
    { name: 'partnerName',    type: 'string' },   // javno ime destinacije
    { name: 'relationType',   type: 'string',
      options: { list: [
        'affiliate',            // komercijalna provizija
        'owned',                // povezano lice/projekat istog vlasnika
        'partnership',          // ugovorno partnerstvo
        'editorial',            // bez komercijalnog interesa
      ]}},                                        // određuje obavezan disclosure tekst
    { name: 'baseUrl',        type: 'url' },
    { name: 'utmSource',      type: 'string' },
    { name: 'utmMedium',      type: 'string' },
    { name: 'utmCampaign',    type: 'string' },
    { name: 'campaignId',     type: 'string' },
    { name: 'ctaVariant',     type: 'string' },
    { name: 'disclosureText', type: 'text' },     // obavezno; validacija blokira prazno
    { name: 'analyticsEvent', type: 'string' },
    { name: 'activeFrom',     type: 'datetime' },
    { name: 'activeUntil',    type: 'datetime' },
    { name: 'isActive',       type: 'boolean', initialValue: false },  // KILL SWITCH
    { name: 'allowedClusters', type: 'array' },   // gde sme da se pojavi
    { name: 'legalApproved',  type: 'boolean', initialValue: false },
  ]
}
```

### 12.3 Pravila sprovođenja

Sprovode se kodom:

1. **Podrazumevano isključeno.** `<ReferralLink>` renderuje `null` ako je `isActive === false`, ako je van vremenskog opsega, ako `legalApproved !== true` ili ako `disclosureText` nedostaje. Nema tihe degradacije u običan link.
2. **Trenutni prekidač.** Isključivanje `isActive` u CMS-u + webhook revalidacija uklanja link sa svih stranica bez deploy-a.
3. **Obelodanjivanje je neodvojivo od linka.** Disclosure se renderuje unutar iste komponente. Nije moguće prikazati link bez njega.
4. **Ograničenje konteksta.** `allowedClusters` sprečava da se komercijalna destinacija pojavi u osetljivom sadržaju.
5. **Urednički zid.** Referral destinacija nikada ne utiče na zaključak teksta. Konkretno pravilo: nijedan članak ne sme biti napisan ili izmenjen da bi opravdao postojanje linka. Referral blok se ubacuje samo tamo gde je članak već bio potpun i tačan bez njega.
6. **Izlazni linkovi:** `rel="sponsored noopener"` za komercijalne, `rel="noopener"` za uredničke.
7. **Bez linkova u email sekvenci** dok se ne odobri posebno.

### 12.4 MOVU — priprema bez aktivacije

Kada bude aktiviran, MOVU je jedna od mogućih destinacija u registru, sa `relationType: 'owned'` ili `'affiliate'` (**TBD**, zavisi od pravne strukture) i pripadajućim obelodanjivanjem. Ograničenja: MOVU proizvod se nikada ne predstavlja kao terapija, zamena za lekara ni rešenje za medicinsko stanje; vizuelni identitet platforme ostaje potpuno odvojen; nijedan članak se ne piše zbog MOVU proizvoda.

### 12.5 NN — TBD

Sve u vezi sa NN je otvoreno: poslovni model, identitet, pravna struktura, dozvoljene CTA poruke, pravila prikupljanja podataka, obaveze obelodanjivanja i način upućivanja korisnika. **Ne pravi se nikakva pretpostavka o prirodi NN-a.** Registar destinacija je namerno agnostičan u pogledu tipa destinacije upravo zato da bi NN mogao biti dodat kasnije bez arhitektonske izmene.

---

## 13. Analytics event plan

### 13.1 Izbor alata

**Preporuka: analitika koja ne koristi kolačiće (Plausible ili samostalno hostovan Umami) kao primarni izvor**, umesto Google Analytics 4. **[ODLUKA 5]**

Obrazloženje: bez kolačića nema potrebe za blokiranjem merenja do saglasnosti, pa se meri 100% saobraćaja umesto 50–70%; podaci ostaju u EU; znatno jednostavnija politika privatnosti; brže učitavanje. Gubi se detaljna analiza kohorti i direktna integracija sa Google Ads — što u fazi 1 ne koristimo.

**Meta Pixel se ne postavlja u fazi 1.** Slanje događaja sa stranica o zdravstvenim stanjima reklamnoj platformi je istovremeno najveći privacy rizik projekta i potencijalno kršenje pravila same platforme o osetljivim kategorijama. Ako se kasnije pokrene plaćena kampanja, radi se odvojeno, sa server-side slanjem, striktnim filtriranjem i bez ijednog događaja koji nosi zdravstveni kontekst.

### 13.2 Plan događaja

| Događaj | Okidač | Parametri |
|---|---|---|
| `page_view` | Učitavanje stranice | `path`, `cluster`, `contentType`, `funnelStage` |
| `scroll_75` | 75% dubine članka | `slug`, `cluster` |
| `read_complete` | Kraj članka + 30s zadržavanja | `slug`, `cluster` |
| `takeaways_view` | Prikaz bloka ključnih zaključaka | `slug` |
| `doctor_questions_view` | Prikaz bloka pitanja za lekara | `slug` |
| `doctor_questions_print` | Klik na štampu | `slug` |
| `cta_view` | CTA ušao u vidno polje | `guideId`, `placement`, `slug` |
| `cta_click` | Klik na CTA | `guideId`, `placement`, `slug` |
| `lead_form_start` | Fokus na polje email-a | `guideId`, `sourcePage` |
| `lead_form_submit` | Uspešno slanje | `guideId`, `sourcePage` |
| `lead_form_error` | Greška validacije | `guideId`, `errorType` |
| `lead_confirmed` | Potvrđen double opt-in | `guideId` |
| `guide_download` | Preuzimanje fajla | `guideId` |
| `faq_expand` | Otvaranje pitanja | `faqSlug`, `cluster` |
| `internal_search` | Interna pretraga | `query`, `resultsCount` |
| `glossary_click` | Klik na pojam rečnika | `term`, `sourceSlug` |
| `related_click` | Klik na povezani članak | `fromSlug`, `toSlug` |
| `quiz_start` / `quiz_complete` | Faza 2 | `resultCategory` (bez odgovora) |
| `referral_click` | Faza 3 | `destinationId`, `campaignId`, `ctaVariant`, `sourcePage` |
| `outbound_click` | Izlazni link | `domain`, `linkType` |

### 13.3 Implementacija

Jedan tipizirani modul (`src/lib/analytics/`) sa TypeScript definicijom svakog događaja i njegovih parametara. Nema direktnih poziva analitike iz komponenti. Razlog: nekonzistentna imena događaja su najčešći uzrok bezvrednih podataka posle šest meseci, a tipovi to sprečavaju na nivou kompilacije.

Interna pretraga se prati posebno — pitanja koja korisnici traže a ne nalaze su najpouzdaniji izvor za planiranje sledećih tema.

### 13.4 Šta se namerno ne prati

Bez snimanja sesija i toplotnih mapa na stranicama sa zdravstvenim sadržajem ili formama (rizik snimanja unosa). Bez identifikovanja pojedinačnog korisnika kroz sadržaj. Bez slanja `path` vrednosti sa zdravstvenim kontekstom trećim reklamnim stranama.

---

## 14. Privacy i compliance rizici

> Ovaj deo je tehnička i uređivačka procena, **ne pravno mišljenje**. Pre objave javnog sadržaja i pre puštanja lead sistema potrebna je provera kod advokata specijalizovanog za zaštitu podataka i zdravstvenu regulativu u Srbiji. **[ODLUKA 8]**

### 14.1 Registar rizika

| # | Rizik | Verovatnoća | Uticaj | Mitigacija |
|---|---|---|---|---|
| R1 | Prikupljanje podataka o zdravlju bez odgovarajućeg osnova | Srednja | **Visok** | Arhitektonska zabrana: nijedno polje ne prikuplja zdravstveni podatak (10.3) |
| R2 | Sadržaj protumačen kao oglašavanje leka | Niska–srednja | **Visok** | Bez GLP-1 u fazi 1; `editorialTier: sensitive` traži pravni pregled (14.4) |
| R3 | Sadržaj protumačen kao medicinski savet | Srednja | Visok | Disclaimer na svakoj stranici, ton „pripremite se za lekara", bez individualizovanih preporuka |
| R4 | Kviz kvalifikovan kao medicinsko sredstvo | Niska | **Visok** | Bez skora i procene rizika (11.1) |
| R5 | Prenos podataka izvan Srbije bez osnova | Srednja | Srednji | Provera lokacije provajdera; standardne ugovorne klauzule po potrebi |
| R6 | Slanje osetljivog konteksta reklamnim platformama | Niska (uz naše pravilo) | **Visok** | Bez Meta Pixela u fazi 1 (13.1) |
| R7 | Zastareo medicinski sadržaj | **Visoka** | Srednji | `nextReviewDate` + lista za ponovnu recenziju + vidljiv datum provere |
| R8 | Netransparentna komercijalna veza | Niska (dok je neaktivno) | Visok | Obelodanjivanje neodvojivo od linka (12.3) |
| R9 | Nedovoljno definisan identitet izdavača u pravnim tekstovima | **Visoka danas** | Srednji | Blokira objavu; `/transparentnost/` ostaje placeholder |
| R10 | Curenje podataka iz lead baze | Niska | Visok | Minimalan skup podataka, bez PII osim email-a, tajne u env varijablama |

### 14.2 Zaštita podataka o ličnosti

Primenjuje se Zakon o zaštiti podataka o ličnosti („Sl. glasnik RS", br. 87/2018), koji je u velikoj meri usklađen sa GDPR-om, uz nadzor Poverenika. Ako platforma bude imala posetioce iz EU, GDPR se primenjuje paralelno.

Praktične obaveze:
- **Pravni osnov** za email marketing: pristanak, koji mora biti dobrovoljan, konkretan, informisan i dokaziv. Otuda double opt-in i čuvanje verzije teksta pristanka.
- **Politika privatnosti** mora imati identifikovanog rukovaoca — dakle konkretno pravno lice sa adresom i kontaktom. **Ovo je danas blokirajuća stavka.**
- **Evidencija radnji obrade** — vodi se, u jednostavnom obliku.
- **Ugovori o obradi** sa svakim procesorom (CMS, email, analitika, hosting).
- **Prava lica**: pristup, ispravka, brisanje, prenosivost, prigovor. Potreban jednostavan kanal (email adresa dovoljna u ovoj fazi) i interna procedura odgovora.
- **Lice za zaštitu podataka (DPO)**: verovatno nije obavezno jer se posebne kategorije ne obrađuju u velikom obimu — ali upravo zato je zabrana prikupljanja zdravstvenih podataka i strateška, ne samo higijenska.
- **Kolačići i slični alati**: bez saglasnosti se ne postavljaju oni koji nisu neophodni. Uz analitiku bez kolačića, banner se svodi na informisanje umesto na blokirajući izbor.

### 14.3 Zdravstveni sadržaj

Svaka stranica sa medicinskim sadržajem nosi: potpis autora i recenzenta sa kvalifikacijama, datum poslednje provere, listu izvora, i disclaimer da sadržaj ne zamenjuje pregled, dijagnozu ili terapiju. Sadržaj nikada ne daje individualizovanu preporuku, ne navodi doze, ne podstiče na samolečenje niti na prekid propisane terapije.

### 14.4 Oglašavanje lekova — zašto je GLP-1 odloženo

Oblast uređuju Zakon o lekovima i medicinskim sredstvima („Sl. glasnik RS", br. 30/2010 sa izmenama) i Pravilnik o načinu oglašavanja leka, odnosno medicinskog sredstva („Sl. glasnik RS", br. 79/2010). Ključne tačke koje oblikuju našu arhitekturu:

- **Definicija oglašavanja je široka.** Pravilnik ga određuje kao svaki oblik davanja informacija o leku opštoj ili stručnoj javnosti radi podsticanja propisivanja, snabdevanja, prodaje ili potrošnje. Dakle, ne štiti nas odsustvo reči „reklama".
- **Lekovi na recept ne smeju se oglašavati opštoj javnosti.** Zabrana obuhvata i lekove za dijabetes i druge poremećaje metabolizma — što je tačno polje kojim se ova platforma bavi.
- **Zabranjeno je prikazivanje bolesti i uspeha lečenja na način koji navodi na samolečenje**, kao i senzacionalistički prikaz rezultata lečenja.
- **Odobravanje promotivnog materijala je u nadležnosti ALIMS-a.**

*Izvori za proveru pri pravnom pregledu: alims.gov.rs (sekcija „Oglašavanje lekova"), tekst Zakona o lekovima i medicinskim sredstvima (čl. 164–169), Pravilnik o načinu oglašavanja leka (čl. 2 i 5).*

**Šta iz ovoga sledi za platformu:**

| Dozvoljeno (uz oprez) | Nije dozvoljeno |
|---|---|
| Opšta edukacija o bolesti i mehanizmima | Pominjanje zaštićenog imena leka u kontekstu koji podstiče upotrebu |
| Objašnjenje da postoje različiti pristupi lečenju, uz upućivanje na lekara | Cene, dostupnost, način nabavke |
| Neutralan prikaz klase lekova, bez brenda i bez poziva na akciju | Svedočenja, before/after, prikaz rezultata |
| Podsticanje razgovora sa lekarom | Bilo šta što navodi na samolečenje |

Granica između edukacije o bolesti i prikrivenog oglašavanja je u nameri i formulaciji, ne u odsustvu imena leka. Zato GLP-1 klaster, kada dođe, ide kroz `editorialTier: sensitive` i obavezan pravni pregled pre objave.

**Dodatna napomena za MOVU:** suplementi ne smeju nositi tvrdnje o lečenju, sprečavanju ili ublažavanju bolesti. Zdravstvene izjave su posebno regulisane. To je razlog više da referral sloj bude odvojen i kontrolisan.

### 14.5 Etička ograničenja

Iznad zakonskog minimuma, ugrađuju se u model podataka i šablone: bez sadržaja koji izaziva stid zbog telesne mase; bez slika koje dehumanizuju; bez brojki o gubitku kilograma; bez veštačke hitnosti; bez sadržaja koji podržava restriktivne ili poremećene obrasce ishrane. Kod tema u dodiru sa poremećajima ishrane obavezan je putokaz ka stručnoj pomoći.

---

## 15. Staging i production model

### 15.1 Okruženja

| Okruženje | Namena | Sanity dataset | Indeksiranje | Pristup |
|---|---|---|---|---|
| Lokalno | Razvoj | `staging` | — | Programer |
| Staging | Pregled i odobrenje | `staging` | `noindex` + `robots: disallow` | HTTP basic auth |
| Produkcija | Javni sajt | `production` | Indeksira se | Javno |

Staging **mora** biti zaštićen lozinkom i označen kao neindeksiran. Duplirani sadržaj u indeksu je jedna od retkih grešaka koje se posle teško i sporo ispravljaju.

### 15.2 Grane i tok rada

```
main            → produkcija (zaštićena grana, samo preko PR-a)
  ↑
staging         → staging okruženje
  ↑
feat/*, docs/*, fix/*   → radne grane
```

Pravila: `main` je zaštićena (nema direktnog push-a); svaki PR mora proći CI (lint, typecheck, testovi, build, budžet paketa); commit poruke po Conventional Commits konvenciji; izmene u `components/medical/` i `components/referral/` obavezno traže eksplicitno odobrenje vlasnika projekta u PR-u.

### 15.3 Deployment

Preporučeni tok, uslovljen potvrdom Hostinger paketa (16.2): GitHub repozitorijum se povezuje sa Hostinger Node.js aplikacijom; produkciona aplikacija prati granu `main`, staging aplikacija granu `staging`; environment varijable se postavljaju u hPanel-u, nikada u repozitorijumu; Node 20 LTS; build komanda `npm ci && npm run build`, start `npm run start`.

**Ograde koje se poštuju bez izuzetka:** deployment na produkcioni domen se ne pokreće bez eksplicitnog odobrenja; DNS se ne menja; plaćeni servisi se ne aktiviraju; email kampanje se ne šalju; osetljivi podaci se ne unose.

### 15.4 Environment varijable

```
# .env.example — bez ijedne stvarne vrednosti
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_READ_TOKEN=
SANITY_WEBHOOK_SECRET=
EMAIL_PROVIDER_API_KEY=          # TBD
TRANSACTIONAL_EMAIL_API_KEY=     # TBD
NEXT_PUBLIC_ANALYTICS_DOMAIN=    # TBD
GUIDE_DOWNLOAD_SIGNING_SECRET=
RATE_LIMIT_SECRET=
```

### 15.5 Rezervne kopije i oporavak

Sanity ima ugrađenu istoriju verzija dokumenata; dodatno se radi nedeljni izvoz dataseta skriptom. Kod je u Git-u. Lead baza je kod email provajdera — potreban je mesečni izvoz kao rezerva. Cilj oporavka: potpuna rekonstrukcija sajta iz Git-a i Sanity izvoza za manje od dva sata.

### 15.6 Nadzor

Provera dostupnosti (`/api/health`), praćenje grešaka (Sentry, besplatan nivo dovoljan u fazi 1), nedeljna provera Core Web Vitals, mesečna provera pokrivenosti u Search Console-u, i posebno upozorenje na neuspele prijave na lead formu — tiho pokvarena forma je najskuplja greška u ovom sistemu.

---

## 16. Potrebni spoljni nalozi i integracije

### 16.1 Pregled

| Servis | Svrha | Ko otvara | Trošak | Status |
|---|---|---|---|---|
| GitHub | Repozitorijum, CI | Postoji | Besplatno | ✅ |
| Sanity | CMS | Vlasnik | Besplatan nivo dovoljan u fazi 1 | ⏳ |
| Hostinger | Hosting | Vlasnik (postoji) | Postojeći paket | ⚠️ traži proveru |
| Domen `metabolickozdravlje.rs` | Produkcija | Vlasnik (postoji) | — | ✅ |
| Email marketing | Nurture sekvenca | Vlasnik | Besplatan nivo dovoljan na startu | **[ODLUKA 4]** |
| Transakcioni email | Double opt-in, dostava vodiča | Vlasnik | Besplatan nivo dovoljan | **[ODLUKA 4]** |
| Analitika | Merenje | Vlasnik | ~10 €/mes ili samostalni hosting | **[ODLUKA 5]** |
| Google Search Console | Indeksiranje | Vlasnik | Besplatno | ⏳ |
| Bing Webmaster | Indeksiranje | Vlasnik | Besplatno | ⏳ |
| Sentry | Praćenje grešaka | Vlasnik | Besplatan nivo | ⏳ |
| Stočna fotografija | Vizuali | Vlasnik | Postojeći nalog | ⏳ |
| Stručni recenzent | Medicinska recenzija | Vlasnik | Honorar | **[ODLUKA 3]** — blokirajuće |
| Pravni savetnik | Pravni pregled | Vlasnik | Honorar | **[ODLUKA 8]** — blokirajuće |

Sve naloge otvara vlasnik projekta. Ja ne kreiram naloge, ne aktiviram plaćene servise i ne unosim podatke o plaćanju.

### 16.2 Provera Hostinger paketa — šta mi tačno treba

Nemam konektor ka Hostinger nalogu i ne mogu proveriti konkretan paket. Iz javne dokumentacije stanje je sledeće: Hostinger nudi upravljano Node.js hostovanje sa automatskim prepoznavanjem Next.js-a i deployment-om direktno iz GitHub repozitorijuma, ali **ta funkcionalnost postoji samo na Business web hosting paketu i na Cloud paketima** — na nižim shared paketima (Single, Premium) je nema, a VPS je zahteva ručnu konfiguraciju.

Molim da mi dostaviš sledeće (screenshot hPanel-a je najbrži put):

1. **Tačan naziv paketa** — Single / Premium / Business / Cloud Startup / Cloud Professional / Agency / VPS.
2. **Da li u hPanel-u pod `Websites → Add Website` postoji opcija „Node.js Apps".** Ovo je jedini presudan test — ako te opcije nema, paket ne podržava planiranu arhitekturu.
3. **Ponuđene verzije Node.js-a** (potreban je 20 LTS ili noviji).
4. **Koliko Node aplikacija paket dozvoljava** — treba nam minimum dve (produkcija + staging). Ako dozvoljava samo jednu, staging ide na zaseban besplatni servis ili se radi lokalni pregled, uz odgovarajuću izmenu plana.
5. **Resursna ograničenja** — RAM i CPU po aplikaciji.
6. **Lokacija data centra** — relevantno i za brzinu i za pravni deo (prenos podataka).
7. **Da li domen `metabolickozdravlje.rs` već stoji na tom nalogu** i da li je na njemu trenutno išta objavljeno (parking stranica, stari sajt).
8. **Da li je moguće dodeliti poddomen** tipa `staging.metabolickozdravlje.rs` zasebnoj aplikaciji.

Kada dobijem tačke 1 i 2, mogu potvrditi ili korigovati predloženu arhitekturu renderovanja. Do tada je sekcija 6.3 otvoreni rizik.

**Neću menjati hosting ni DNS podešavanja ni u jednom slučaju.**

---

## 17. Odluke koje čekaju vlasnika projekta

Poređane po tome koliko blokiraju rad. Prvih pet blokiraju početak implementacije.

| # | Odluka | Zašto je važna | Preporuka |
|---|---|---|---|
| **1** | **Potvrda Hostinger paketa** (podaci iz 16.2) | Određuje da li je ISR arhitektura izvodljiva ili idemo na pun statički rebuild. Ne mogu inicijalizovati projekat bez ovoga. | Dostaviti tačke 1–2 iz 16.2 kao prioritet |
| **2** | **Ko je stručni recenzent** — konkretno ime, kvalifikacije, saglasnost za javno navođenje | Bez toga se ne može objaviti ni jedan medicinski članak, ni izgraditi E-E-A-T. Ovo je najduži rok za nabavku u celom projektu. | Početi pregovore odmah, u nedelji 1 |
| **3** | **Pravno lice izdavača** — naziv, sedište, matični broj, kontakt | Nužno za politiku privatnosti, uslove korišćenja, `Organization` strukturirane podatke i formulaciju o transparentnosti. Blokira sve pravne stranice. | Potvrditi pre nedelje 4 |
| **4** | **Pismo: samo latinica u fazi 1?** | Utiče na strukturu ruta i uređivački teret. Naknadno dodavanje je skupo. | Latinica u fazi 1; ćirilica kao faza 3 |
| **5** | **Email provajder** (marketing + transakcioni) | Određuje adapter sloj, ugovor o obradi i lokaciju podataka. | Preporuka: provajder sa serverima u EU; konkretan izbor uz proveru cene |
| **6** | **Analitika: bez kolačića ili GA4** | Utiče na politiku privatnosti, banner za kolačiće i tačnost merenja. | Bez kolačića (Plausible ili Umami); bez Meta Pixela u fazi 1 |
| **7** | **Prvi lead magnet** — tačan naslov, obim, ko piše, ko recenzira | Bez toga funnel ne može biti završen, a to je jedina konverzija u fazi 1. | Praktičan vodič od 12–16 strana, uz obaveznu recenziju |
| **8** | **Vizuelni identitet** — logo, boje, tipografija, fotografija | Potreban pre izrade komponenti da se izbegne prepravka. Mora biti jasno različit od MOVU. | Dostaviti smernice ili odobriti da predložim tri pravca |
| **9** | **Kviz: email obavezan za rezultat?** | Utiče na poverenje i pravni profil. | Rezultat bez email-a; email tek posle rezultata, za dodatni materijal |
| **10** | **Obim sadržaja u fazi 1 i ko piše tekstove** | Određuje realnost roadmap-a. | 12–16 članaka kroz dva klastera; potvrditi pisca |

Predlog: odgovoriti prvo na 1, 2 i 3 — one otključavaju rad, ostalo može teći paralelno.

---

## 18. Roadmap za prvih 16 nedelja

Roadmap pretpostavlja da su odluke 1–3 rešene do kraja nedelje 2. Kašnjenje kod recenzenta (odluka 2) direktno pomera sve rokove objave.

### Faza 0 — Temelji (nedelje 1–2)

| Isporuka | Napomena |
|---|---|
| Odobrenje ovog dokumenta | Vlasnik projekta |
| Potvrda Hostinger paketa | Vlasnik dostavlja podatke iz 16.2 |
| Otvaranje Sanity projekta | Vlasnik |
| Pokrenuti pregovori sa recenzentom | Vlasnik — najduži rok |
| `docs/03-EDITORIAL-GUIDELINES.md` | Ja |
| `docs/04-COMPLIANCE-CHECKLIST.md` | Ja |
| Inicijalizacija repozitorijuma sa strukturom iz sekcije 7 | Ja, **nakon odobrenja** |

*Kapija faze:* stack potvrđen, repozitorijum inicijalizovan, uređivačka pravila napisana.

### Faza 1 — Tehnički temelj (nedelje 3–6)

Next.js projekat sa TypeScript, Tailwind, ESLint i Prettier konfiguracijom; Sanity šeme za `cluster`, `article`, `faq`, `author`, `medicalReviewer`, `siteSettings`, uključujući validaciju recenzije; dizajn sistem i osnovne komponente; šabloni početne, pillar i članka; renderovanje Portable Text-a sa svim dozvoljenim blokovima; SEO sloj (metadata, JSON-LD, sitemap, robots); CI pipeline; testovi pristupačnosti; **provera ISR ponašanja na Hostinger staging-u (kritična tačka)**.

*Kapija faze:* jedan probni članak prolazi ceo put od CMS-a do staging-a, sa recenzijom, izvorima i ispravnim strukturiranim podacima.

### Faza 2 — Sadržaj i funnel (nedelje 7–10)

Klaster laboratorijskih analiza: pillar + 6–8 članaka; klaster insulinske rezistencije: pillar + 4–6 članaka; 15–20 FAQ unosa; 20–30 pojmova rečnika; landing stranica vodiča, lead forma, API ruta, double opt-in tok; integracija sa email provajderom; nurture sekvenca (napisana, **ne poslata**); pravne stranice sa stvarnim podacima izdavača; analitika sa svim događajima iz 13.2.

*Kapija faze:* kompletan tok od članka do potvrđenog lead-a radi na staging-u, sav sadržaj recenziran.

### Faza 3 — Priprema lansiranja (nedelje 11–13)

Kompletna revizija pristupačnosti; podešavanje performansi do budžeta iz 6.5; provera compliance liste za svaku stranicu; pravni pregled celokupnog sadržaja; interna pretraga; 404 i stanja greške; Search Console i Bing; testiranje na stvarnim uređajima; `docs/05-DEPLOYMENT.md`; obuka urednika za rad u Sanity studiju.

*Kapija faze:* **eksplicitno odobrenje vlasnika projekta za objavu.** Do tada nema deployment-a na produkcioni domen.

### Faza 4 — Lansiranje i stabilizacija (nedelje 14–16)

Objava (samo uz odobrenje); nadzor grešaka i performansi; slanje sitemap-a i praćenje indeksiranja; aktiviranje nurture sekvence (posebno odobrenje); nedeljno praćenje metrika; prve iteracije na osnovu stvarnih podataka; plan sadržaja za nedelje 17–32.

*Kapija faze:* sajt stabilan, sadržaj indeksiran, prvi potvrđeni lead-ovi, prvi podaci za odluku o sledećem klasteru.

### Šta se namerno **ne** radi u prvih 16 nedelja

Kviz (faza 2 projekta); GLP-1 sadržaj; bilo koji referral link; MOVU i NN pominjanja; plaćene kampanje; masovna produkcija članaka; ćirilična verzija; korisnički nalozi.

---

## Prilog A — Otvorena pitanja koja nisu odluke vlasnika

Tehnička pitanja koja ću rešiti tokom implementacije i dokumentovati kao ADR:

- Da li interna pretraga ide preko unapred izgrađenog indeksa (Fuse.js) ili Sanity GROQ pretrage — zavisi od količine sadržaja.
- Da li Sanity studio ide na `/studio` ili zaseban deployment — zavisi od broja Node aplikacija koje paket dozvoljava.
- Strategija optimizacije slika — `next/image` sa lokalnim loaderom ili Sanity CDN transformacije.
- Da li generisati TypeScript tipove iz Sanity šema automatski (`sanity typegen`) — verovatno da.

## Prilog B — Šta je urađeno u okviru ovog zadatka

- Pregledan postojeći repozitorijum: dva fajla (`README.md`, `.gitignore`), bez koda.
- Kreirana grana `docs/01-discovery-and-architecture`.
- Kreiran ovaj dokument.
- **Nije** kreirana struktura repozitorijuma, nije inicijalizovan projekat, nije pokrenut deployment, nisu menjani DNS ni hosting, nisu aktivirani plaćeni servisi, nije objavljen medicinski sadržaj, nisu generisani SEO članci, nije mergovano u `main`.
