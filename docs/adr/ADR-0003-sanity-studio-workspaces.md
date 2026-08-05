# ADR-0003 — Sanity Studio: jedan projekat, dva workspace-a

**Status:** Prihvaćeno (odobrio vlasnik projekta)
**Datum:** 5. avgust 2026.
**Kontekst:** Sprint 3 — PR 11 (grana `feat/sanity-studio-foundation`)

## Kontekst

ADR-0002 je postavio dizajn-sistem, a PR 10 content model i blokirajuće
validacije koje se testiraju bez Sanity projekta. Sada postoji stvarni Sanity
projekat i potrebno je uredničko okruženje (Studio) koje koristi te iste šeme.

`docs/01` §6.1 je ostavio otvorenim da li Studio ide na `/studio` javnog sajta
ili zasebno, a Prilog A je to vezao za broj Node aplikacija koje hosting
dozvoljava. Vlasnik je odluku doneo.

## Odluka

### Jedan projekat, dva dataseta

| Stavka | Vrednost |
|---|---|
| Sanity projekat | `jjinmc3k` — „Metabolicko zdravlje" |
| Datasetovi | `production` i `staging` |
| Vidljivost | oba **javna** |

Vidljivost je potvrđena neautentifikovanim upitom na javni API: oba dataseta
odgovaraju sa HTTP 200 bez tokena. Javna vidljivost je namerna — sadržaj je
ionako javan, pa token nije potreban za čitanje objavljenog sadržaja, čime se
smanjuje broj tajni u sistemu.

### Dva workspace-a

| Workspace | Base path | Dataset | Uloga |
|---|---|---|---|
| `staging` | `/staging` | `staging` | Testno okruženje; **prikazuje se prvo** |
| `production` | `/production` | `production` | Javni sadržaj |

`staging` je prvi u nizu namerno: Studio otvara prvi workspace podrazumevano,
pa je podrazumevana radnja bezbedna. Naslovi su eksplicitni
(„— STAGING" / „— PRODUCTION"), uz podnaslov koji uredniku odmah kaže u kom je
okruženju.

**Dataset se ne čita iz promenljive okruženja.** Upisan je doslovno u
konfiguraciju svakog workspace-a, jer bi pogrešno podešena promenljiva mogla
tiho da prebaci Studio na `production` i da urednik objavi na javni dataset
misleći da je u testu. Iz promenljive (`SANITY_STUDIO_PROJECT_ID`) dolazi samo
project ID, koji nije tajna i ne može promeniti okruženje.

### Sadržaj se ne kopira automatski

Između `staging` i `production` nema automatske sinhronizacije (`docs/01` §8.6).
Migracije idu skriptom sa eksplicitnim pokretanjem, kada za tim bude potrebe.

### Hostovanje

Studio se **ne ugrađuje** u Next.js rutu `/studio`. Biće hostovan zasebno preko
Sanity hostinga (`*.sanity.studio`). Posledice: javni sajt ne nosi težinu
Studio paketa, a uredničko okruženje ima svoj životni ciklus, nezavisan od
deployment-a sajta.

**U ovom PR-u nema deployment-a**: nije zadat hostname ni app ID, nema deploy
skripte i Studio nije objavljen.

### CORS i pristup

CORS se **sada ne podešava**. Trebaće tek kada se Next.js aplikacija bude
povezivala sa Sanity-jem ili kada Studio bude hostovan — i tada uz izričito
odobrenje vlasnika.

Vlasnik je trenutno **jedini administrator** projekta. Stručni recenzent je
dokument u modelu sadržaja (`medicalReviewer`), a ne Sanity korisnička uloga;
plaćene uredničke uloge razmatraju se kasnije.

### Plan

Cilj je **Free plan** posle isteka automatskog Growth Trial perioda koji Sanity
dodeljuje novim projektima. Pre isteka treba proveriti da korišćenje staje u
okvire besplatnog nivoa; nijedna plaćena mogućnost se ne aktivira bez odluke
vlasnika.

## Šta ovaj ADR namerno NE odlučuje

- Povezivanje Next.js aplikacije sa Sanity-jem (klijent, GROQ upiti, revalidacija).
- Strukturu uredničkog pregleda (`desk`/`structure` liste iz `docs/01` §8.5).
- Objavljivanje Studija i pripadajući hostname.
- Tokene, webhook-ove i CORS zapise.

## Posledice

- Uredničko okruženje koristi **iste** šeme i iste blokirajuće validacije koje
  pokrivaju testovi — nema drugog izvora istine.
- Prelazak na ugrađen Studio ili na drugi hosting ostaje moguć bez seljenja
  koda, jer su šeme odvojene od aplikacije (`docs/01` §7.1).
- Svaka buduća izmena dataseta ili workspace-a vidi se u `sanity.config.ts` i
  prolazi kroz code review.
