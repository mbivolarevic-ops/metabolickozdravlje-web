# ADR-0007 — Automatizovana isporuka uz bezbednosne kapije

**Status:** Prihvaćeno (izričito odobrio vlasnik projekta)
**Datum:** 11. avgust 2026.
**Kontekst:** Governance promena — standardni tok grana → provere → PR → CI → merge → čišćenje

## Kontekst i razlog

Dosadašnji proces je za svaki merge tražio dodatni vlasnički korak čak i kada je vlasnik u početnom zahtevu već jasno odobrio ograničen, niskorizičan tehnički zadatak i njegovu isporuku. To je stvaralo ponovljeno odobravanje bez dodatne zaštite.

Odluka automatizuje samo standardni tehnički transport već odobrene promene. Ne prenosi na agenta medicinsku, uredničku, pravnu, produkcionu ili launch odluku. Te kapije ostaju ljudske jer posledice nisu samo tehničke i reverzibilne.

## Odluka

Agent može bez dodatnog klika vlasnika da dovrši izričito odobren niskorizični tehnički zadatak kroz radnu granu, lokalne provere, PR, required CI, standardni merge commit i čišćenje grane.

Direktan push na `main`, force push, admin/bypass merge i menjanje ruleset-a nisu deo ovog toka. Auto-merge može biti uključen kao mehanizam čekanja, ali ne menja nijednu kapiju: PR se ne sme spojiti dok GitHub ne potvrdi sve zahteve.

## Granice

### Automatski dozvoljeno

- dokumentacija, testovi, održavanje i male tehničke izmene koje su unapred precizno odobrene;
- rad isključivo na sopstvenoj grani i jednom PR-u prema `main`;
- popravka pale provere samo kada uzrok i rešenje ostaju u odobrenom obimu;
- standardni merge commit kada su sve lokalne i GitHub kapije zelene;
- brisanje samo sopstvene, potvrđeno mergovane grane i fast-forward usklađivanje lokalnog `main`.

### Uvek zahteva posebno odobrenje

- medicinski sadržaj ili atribucija stvarnom autoru/recenzentu;
- bilo kakvo korišćenje, objava, izmena ili brisanje Sanity `production` sadržaja;
- deployment sajta ili Studija, DNS, hosting ili domen;
- uklanjanje `noindex`/`robots` zabrane i javno lansiranje;
- secrets, tokeni, novi plaćeni servisi, pravne izjave, privatnost, analitika ili cookie mehanizmi;
- destruktivne operacije, migracije podataka i promene branch protection/ruleset zahteva;
- nove izmene `CLAUDE.md` ili `docs/00`–`docs/04` bez posebnog governance odobrenja.

## Preduslovi

Pre početka autonomne isporuke mora biti dokazivo:

1. vlasnik je pisano odobrio konkretan niskorizični tehnički obim i merge;
2. lokalni `main` je čist, ažuran i 0/0 prema `origin/main`;
3. nema nepoznatog diff-a, otvorenog konflikta ili potrebe za zabranjenom radnjom;
4. radna grana je nova i izvedena iz ažurnog `main`.

Pre merge-a mora biti dokazivo:

1. diff sadrži samo odobrene fajlove i namenu;
2. sve repo-obavezne lokalne provere prolaze, uključujući format, lint, typecheck, test, build, Studio build i typegen check;
3. eventualne Sanity provere su read-only i koriste isključivo `staging`;
4. PR ima bazu `main`, nema konflikt, ažuran je sa bazom i nema nerešenih review zahteva ili razgovora;
5. svi required GitHub checks su zeleni.

## Postuslovi

Posle merge-a agent mora da potvrdi merge hash, obriše samo svoju remote granu, uradi `fetch --prune`, fast-forward uskladi lokalni `main`, obriše lokalnu granu sa `-d` i potvrdi čist status 0/0. Završni izveštaj navodi PR, commit i merge hash, tačan diff, rezultate provera i CI-ja, repo podešavanja pre/posle i sve što je ostalo ručno.

## Stop, incident i rollback ponašanje

Nepoznat diff, crven ili neobjašnjivo zaglavljen CI, konflikt, neočekivana promena zaštićenog fajla, nerešen review zahtev ili proširenje obima odmah zaustavlja automatizaciju. Agent ne uklanja proveru, ne koristi bypass i ne rešava incident promenom produkcionih podataka.

Pre merge-a rollback je odbacivanje ili ispravka samo sopstvene grane bez menjanja `main`. Posle merge-a rollback ide novim, pregledljivim revert PR-om; nema resetovanja ili prepisivanja istorije `main`. Ako incident uključuje medicinu, produkcioni sadržaj, deployment, launch ili pravni sloj, agent samo evidentira tehničke činjenice i traži posebno odobrenje odgovorne osobe pre korektivne radnje.

## Primeri

**Dozvoljeno bez dodatnog klika, kada je početno odobrenje eksplicitno:** ispravka test konfiguracije; dokumentovanje postojećeg tehničkog procesa; mali refaktor bez promene ponašanja van osetljivih foldera; ažuriranje razvojne dokumentacije; popravka CI-ja koja ne slabi proveru.

**Zabranjeno u autonomnom toku:** objava ili izmena članka; postavljanje stvarnog recenzenta; čitanje ili menjanje `production` dataseta; deploy; otključavanje indeksiranja; dodavanje analytics/cookie mehanizma; rotacija tajne; migracija podataka; menjanje required checks ili bypass liste; force push; direktan push na `main`.

## Posledice

Standardni tehnički rad može završiti brže bez ponovljenog odobravanja, dok GitHub ruleset i dokumentovane kapije ostaju izvršne tačke kontrole. Cena je strogo fail-closed ponašanje: svaka nejasnoća ili promena obima prekida automatizaciju umesto da se tumači u njenu korist.
