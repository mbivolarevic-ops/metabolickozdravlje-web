# ADR-0005 — Početna stranica: edukacija i poverenje, ne lead funnel

**Status:** Prihvaćeno (odobrio vlasnik projekta)
**Datum:** 6. avgust 2026.
**Kontekst:** Sprint 5 — PR 17 (grana `feat/homepage-content`)

## Kontekst

Dotadašnja početna stranica bila je privremena: statičan tekst, nijedan link i
nijedan podatak iz CMS-a. Postojala je da pokaže da platforma nastaje.

Od PR-a 15 i 16 postoje rute `/teme`, `/teme/[cluster]` i `/tekstovi/[slug]`,
kao i read-only sloj sa kapijama. Početna je mogla da prestane da opisuje
platformu i počne da bude njen ulaz.

`docs/02` §2.2 nosi wireframe početne iz faze planiranja. On sadrži elemente
koji u v1 ne postoje ili nisu odobreni — lead magnet, FAQ i portret stručnog
urednika. Ovaj ADR beleži šta je od toga izostavljeno i zašto.

## Odluka

### 1. Početna vodi do sadržaja, ne do konverzije

Dugoročni put platforme je: edukacija → poverenje → samoprocena → ljudska
provera → konsultacija. Ovo izdanje pokriva **samo prva tri koraka**.

| Nema na stranici | Zašto |
|---|---|
| Kviz i bodovanje | Faza 2 (CLAUDE.md §3); danas bi bio prerani alat |
| Lead forma, e-adresa, telefon | Nijedan podatak se još ne prikuplja |
| CTA za konsultaciju ili zakazivanje | Platforma to nikada ne planira (CLAUDE.md §3) |
| Analitika, kolačići, saglasnost | Zaseban posao, nije deo ovog PR-a |
| Lead magnet i FAQ iz `docs/02` §2.2 | Sadržaj ne postoji; ne prikazuje se nepostojeće |
| Portret stručnog urednika | Vlasnik je ranije odlučio da se fotografija izostavi |

Jedini poziv na akciju vodi na `/teme` — jedino odredište koje stvarno postoji
i ima smisla kao sledeći korak.

### 2. Prikazuje teme i stručno proverene tekstove

Dva pitanja koja čitalac ima odmah — *šta ovde mogu da razumem* i *da li je
ovo živo* — nemaju odgovor bez stvarnog sadržaja. Zato početna povlači teme
(najviše šest, uredničkim redosledom iz polja `order`) i tekstove (najviše
tri).

„Popularnost“ se ne izmišlja: platforma ne meri posete po tekstu, pa ne sme ni
da sugeriše da neki tekst više vredi.

### 3. „Nedavno stručno provereni“, a ne „najnoviji“

Content model **nema datum objavljivanja**. Ima `reviewDate` — datum poslednje
stručne provere.

Reč „najnovije“ bila bi tvrdnja koju sistem ne može da potkrepi. Sortiranje po
`reviewDate` opadajuće je i pošteno i korisnije: čitaocu je važnije kada je
tekst poslednji put proveren nego kada je prvi put objavljen. Zato datum stoji
vidljivo na kartici, ne kao sitan otisak.

### 4. Ponašanje bez sadržaja

Početna mora izgledati namerno i kada je dataset prazan — a danas jeste.

| Stanje | Šta se prikazuje |
|---|---|
| Nema tema | Rečenica koja objašnjava zašto, plus veza ka `/teme` |
| Nema tekstova | „Prvi stručno provereni tekstovi su u pripremi.“ |
| Sanity nije podešen | Isto kao gore — prazno, ali ispravno |
| Odgovor pogrešnog **oblika** | Greška koja obara build |

Prazna mreža se ne renderuje. Razlika između „nema sadržaja“ i „nešto je
puklo“ ostaje oštra: prvo je stanje, drugo je kvar i ne sme da izgleda kao
stanje.

### 5. Anti-stigma nije ukras nego sadržaj

Sekcija „Metaboličko zdravlje nije pitanje karaktera.“ nabraja činioce —
biologiju, genetiku, okruženje, san, mentalno zdravlje, životne okolnosti i
ponašanje — i **ponašanje ostavlja među njima**. Ne tvrdi da ono nema ulogu,
niti da je jedina.

Stranica ne oslovljava čitaoca kao pacijenta, ne postavlja dijagnozu i ne
obećava ishod. Vizuelno: nema fotografija tela, „pre i posle“ prikaza, vaga ni
metara oko struka.

### 6. Terapijske oblasti bez favorizovanja

Pregled nabraja šest oblasti — ishranu i navike, fizičku aktivnost, san i
mentalno zdravlje, lekove, barijatrijsku i metaboličku hirurgiju, i dugoročno
praćenje — ravnopravno i bez isticanja ijedne.

**Nema imena leka ni klase lekova.** Reč „Lekovi“ stoji kao naziv oblasti, uz
rečenicu da o njima odlučuje lekar. Tekst je doslovno onaj koji je vlasnik
odobrio (CLAUDE.md §⛔ 7).

Stavke **nisu linkovi**: odredišta ne postoje, a projekat ne pravi mrtve
linkove. Kada rute nastanu, mogu se povezati bez menjanja teksta.

### 7. Najava procene bez ijedne interakcije

Sekcija „Procena metaboličkog zdravlja“ ima oznaku „U pripremi“ i **ništa što
se može kliknuti**: bez dugmeta, linka, pitanja, polja, bodovanja i medicinskih
pragova.

Napomena da procena neće postavljati dijagnozu ni preporučivati terapiju nije
ograda radi forme — ona unapred zatvara očekivanje koje bi tekst inače mogao
da stvori.

### 8. Metapodaci i `noindex`

Naslov i opis prate hero poruku. **Bez `canonical`** — projekat nema
`metadataBase` ni potvrđen produkcioni domen, pa bi kanonska adresa bila
nagađanje. **Bez Open Graph slike** — nema slike koju bismo pošteno ponudili.
**Bez strukturiranih podataka** — nisu definisani pravilima projekta.

Globalni `noindex` iz layout-a ostaje aktivan.

### 9. Data sloj

Novi upit `recentlyReviewedArticlesQuery` nosi **isti uslov objavljivosti** kao
i sve ostalo, i povlači usku projekciju: naslov, slug, sažetak, datum provere,
temu i naslovnu sliku. Telo, izvori, biografije i SEO se ne povlače — početnoj
ne trebaju.

Nova provera `isValidHomepageArticle` traži sve što traži sažetak, plus
prihvatljivu naslovnu sliku.

**Zašto nevalidna slika izbacuje ceo članak sa liste, a ne samo sličicu:** isti
podatak na stranici članka obara prikaz i daje 404 (ADR-0004 §6). Kartica koja
bi ostala vodila bi čitaoca u 404. Bolje je da je nema.

## Posledice

**Dobro**

- Početna prestaje da opisuje platformu i počinje da vodi do nje.
- Stranica je poštena i prazna: danas prikazuje da sadržaja nema, bez pretvaranja.
- Nijedan podatak se ne prikuplja, pa nema ni pravnog ni tehničkog duga.
- Sav sadržaj iz CMS-a prolazi kroz iste kapije kao i ostale rute.

**Cena**

- Dok nema sadržaja, dve od devet sekcija su prazna stanja. To je tačan prikaz
  stvarnosti, ali stranica deluje mršavije nego što će delovati.
- Terakota je sada u upotrebi kao boja CTA dugmeta; ranije se nije koristila.
  Ako se paleta bude menjala, ovo je mesto koje se prvo vidi.
- Wireframe iz `docs/02` §2.2 i stvarna stranica se sada razlikuju. Dokument
  nije menjan; razlika je zabeležena ovde.

**Ograničenja prvog izdanja**

- Nema fotografija ni ilustracija; vizuelni naglasak nose tipografija i jedna
  suptilna CSS površina.
- Nema ulaznih tačaka „po situaciji“ iz `docs/02` §2.2 ③ — odredišta ne postoje.
- Nema brojača tekstova po temi; podatak postoji, ali bi na praznom datasetu
  svuda pisao nulu.
- Stranica nije testirana sa stvarnim čitaocima. Clarity test sa ljudima
  (`docs/04` §14.7) nije sproveden i ostaje otvoren.

## Alternative koje su odbačene

| Alternativa | Zašto ne |
|---|---|
| Zadržati statičnu početnu dok ne bude sadržaja | Početna bi opisivala platformu umesto da bude ulaz u nju |
| „Najnoviji tekstovi“ | Model nema datum objavljivanja; bila bi tvrdnja bez pokrića |
| Sakriti prazne sekcije | Čitalac ne bi znao da sadržaj tek nastaje; struktura bi se menjala pod nogama |
| Prikazati sve teme na početnoj | Početna nije spisak; pun pregled je `/teme` |
| Cela kartica kao link | Duže ime linka bez dodatnog značenja; naslov je jasnije odredište |
| Dodati kviz kao „samo najavu koja radi“ | Faza 2; najava koja nešto radi više nije najava |
| Stock fotografije ljudi | Rizik od vizuelne stigme, bez informativne vrednosti |
