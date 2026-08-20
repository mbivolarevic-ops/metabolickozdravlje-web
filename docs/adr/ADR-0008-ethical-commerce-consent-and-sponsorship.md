# ADR-0008 — Etička prodaja, saglasnost i sponzorstva

**Status:** Prihvaćeno (izričito odobrio vlasnik projekta)
**Datum:** 17. avgust 2026.
**Kontekst:** Governance promena — projekat dobija prihod, a edukativna nezavisnost ostaje merljivo zaštićena

## Kontekst

Do sada je projekat bio bez ikakvog prihoda. `docs/00` §4.4 je prvih dvanaest
meseci definisao kao „bez ikakve monetizacije", a `docs/02` §10 i `CLAUDE.md` §3
su prodaju proizvoda na platformi opisivali kao nešto što se „ne planira ni u
jednoj verziji".

Vlasnik je doneo drugačiju odluku: projekat se izdržava prodajom **jednog**
digitalnog vodiča, dobrovoljnim newsletterom, B2B Patient Support programima i
označenim sponzorisanim projektima.

Ovaj ADR postoji zato što odsustvo novca više nije zaštita nezavisnosti. Kada
prihod uđe u sistem, zaštita mora da postane **zapisano pravilo sa kapijama**, a
ne posledica toga što nema šta da se proda. Pravila se pišu sada, dok nema
pritiska roka i dok nijedna ponuda nije na stolu — to je isti razlog zbog kojeg
je `docs/00` §4.4 uopšte i napisan.

**Ovaj ADR ne odobrava implementaciju.** Ne uvodi checkout, formu, analitiku,
pravni tekst ni jednu liniju koda. Definiše šta sme da postoji i pod kojim
uslovima.

## Odluka

Projekat sme da ostvaruje prihod kroz četiri modela, svaki pod svojim kapijama.
Prodavac je **Edukativni Centar CMZ PR Snežana Bivolarević**, PIB `115841920`,
MB `68681375`.

### Dozvoljeni poslovni modeli

#### 1. Jedan flagship digitalni vodič

| Stavka | Vrednost |
|---|---|
| Proizvod | jedan digitalni vodič o metaboličkom zdravlju |
| Cena | **1.999 RSD** |
| Autor | dr Snežana Bivolarević, specijalista opšte medicine i subspecijalista bolesti zavisnosti |
| Planirani institucionalni recenzent | Naučni odbor Adria LifeMed Association (ALMA) |
| Naplata | Raiffeisen Banka e-commerce, isključivo prema zvaničnoj merchant dokumentaciji |

**Jedan proizvod, ne katalog.** Drugi proizvod traži novu odluku vlasnika. Katalog
pretvara platformu u prodavnicu, a to je promena identiteta, ne proširenje ponude.

⛔ **Javna atribucija institucionalnog recenzenta je zabranjena** dok ne postoje
oba: dokumentovana saglasnost ALMA-e i **identitet odgovorne osobe** koja
recenziju potpisuje. Do tada se ALMA ne pominje ni na sajtu, ni u vodiču, ni u
oglasu, ni u newsletteru. „Planirano" nije „potvrđeno", a recenzent bez imena
nije recenzent.

#### 2. Dobrovoljni newsletter

Saglasnost je **zasebna i neoznačena** — bez unapred štikliranog polja.

⛔ **Kupac se nikada automatski ne prijavljuje na newsletter.** Kupovina je
transakcija, ne pristanak na marketing. Transakcijska komunikacija (potvrda
kupovine, račun, link za preuzimanje) i marketinška saglasnost su **odvojene** i
ostaju odvojene.

#### 3. B2B Patient Support programi

Zaseban komercijalni tok, odvojen od potrošačkog. Ne meša se sa prodajom vodiča i
ne koristi podatke kupaca vodiča.

#### 4. Transparentni sponzorisani projekti

Označeni kao sponzorisani, **pod uredničkom kontrolom CMZ-a**. Vidi sekciju
„Urednička nezavisnost".

## Zabranjene prakse

Nijedna se ne uvodi ni uz odobrenje — ovo su granice identiteta, ne privremena
ograničenja:

- **prodaja leadova** i ustupanje korisničkih podataka bilo kome;
- **referral model** bilo kog oblika, uključujući MOVU i NN (ostaje na snazi
  `CLAUDE.md` ⛔8 i `docs/00` §8.3, tačka 20);
- **oglasi za suplemente** i reklame trećih strana;
- **medicinska trijaža** i individualne preporuke — u proizvodu i u marketingu;
- **prikupljanje zdravstvenih podataka**: dijagnoza, laboratorijskih nalaza,
  terapije i svega srodnog (`CLAUDE.md` ⛔6 ostaje nepromenjen);
- **prinudno ili neodobreno prikupljanje podataka**: unapred štiklirano polje,
  saglasnost skrivena u uslovima korišćenja, newsletter kao uslov kupovine;
- **uslovljavanje pristupa zdravstveno važnoj informaciji plaćanjem**;
- **plaćeni sadržaj bez oznake**;
- **naknada uslovljena preporukom određenog proizvoda**.

### Šta se prodaje, a šta ostaje besplatno

Vodič je **prošireni, praktični materijal**, ne otključavanje informacije koja je
čitaocu potrebna za bezbednost. Sadržaj koji nekome treba da bi razumeo nalaz ili
znao da se javi lekaru ostaje besplatan i nezaključan.

Operativni test: **ako bi izostanak plaćanja nekoga ostavio bez zdravstveno važne
informacije, materijal ne sme biti iza plaćanja.**

## Kapije

### Medicinske

- Nijedan medicinski tekst i **nijedna marketinška medicinska tvrdnja** ne sme
  biti označena kao odobrena bez **imenovanog autora i imenovanog recenzenta**.
  Marketing nije izuzet od uređivačkog postupka: oglas koji tvrdi zdravstveni
  ishod je medicinska tvrdnja bez obzira na to gde stoji.
- Zabrana pisanja o lekovima bez izričite ljudske potvrde ostaje (`CLAUDE.md` ⛔7).
- Vodič ne postavlja dijagnozu, ne procenjuje individualni rizik i ne preporučuje
  terapiju.

### Privatnost i saglasnost

- Zasebna, neoznačena saglasnost za marketing; transakcijska komunikacija odvojena.
- Nijedan zdravstveni podatak se ne prikuplja ni u jednom koraku, uključujući
  polja označena kao „opciono".
- **Analytics, cookies, advertising pixels, novi servisi i payment secrets traže
  zasebno tehničko i privacy odobrenje.** Ovaj ADR ih ne odobrava.
- Pravni tekstovi (uslovi korišćenja, politika privatnosti, politika refundacije)
  su zaseban posao i zaseban pregled.

### Naplata

- Isključivo Raiffeisen Banka e-commerce, prema **zvaničnoj merchant
  dokumentaciji** te banke. Zahtevi se čitaju iz nje, ne iz sećanja.
- Nijedan payment secret, token ni ključ ne ulazi u repozitorijum
  (`CLAUDE.md` §9, Higijena).
- Integracija se ne implementira bez zasebnog odobrenja i bez pravnog pregleda.

### Launch kapije koje ostaju

Production sadržaj, deployment, DNS i uklanjanje `noindex`/`robots` zabrane
**ostaju posebne kapije**; ovaj ADR ih ne otvara (ADR-0006 §2–3, ADR-0007).

## Preduslovi i postuslovi

**Pre bilo koje implementacije mora biti dokazivo:**

1. vlasnik je pisano odobrio konkretan tehnički obim;
2. pravni tekstovi su pripremljeni i pregledani;
3. privacy pristup je odobren zasebno od ovog ADR-a;
4. merchant zahtevi banke su pročitani iz zvanične dokumentacije;
5. medicinski sadržaj vodiča ima imenovanog autora i imenovanog recenzenta.

**Posle isporuke bilo kog komercijalnog elementa mora biti dokazivo:**

1. saglasnost je zasebna i neoznačena, i to je pokriveno testom;
2. kupac nije prijavljen na newsletter bez sopstvene radnje;
3. nijedno polje ne prikuplja zdravstveni podatak;
4. nijedan secret nije u repozitorijumu;
5. oznaka sponzorstva je vidljiva tamo gde se sponzorisani sadržaj prikazuje.

## Incident, refundacija i rollback

**Incident.** Curenje podataka kupaca, nenamerna prijava na newsletter,
neoznačen sponzorisani sadržaj ili objavljena medicinska tvrdnja bez recenzenta
tretiraju se kao incident: rad staje, činjenice se evidentiraju, odgovorna osoba
odlučuje o koraku. Agent tada **ne menja produkcione podatke i ne šalje
komunikaciju korisnicima** — samo evidentira i traži odluku.

**Refundacija.** Politika refundacije je pravni tekst i donosi je vlasnik uz
pravni pregled. Dok je nema, refundacija se ne obećava ni u jednom materijalu, a
sporan zahtev se rešava u korist kupca — jeftinije je od narušenog poverenja.

**Rollback.** Pre merge-a: odbacivanje sopstvene grane. Posle merge-a: novi
revert PR, bez prepisivanja istorije. Ako je komercijalni element već aktivan,
prvo se **isključuje**, pa se onda ispravlja — kod koji uzima novac ne ostaje
uključen dok traje analiza.

## Urednička nezavisnost

**Sponzor ne određuje medicinski zaključak.** Ni temu koja će se prikazati kao
povoljna, ni formulaciju, ni izostavljanje nalaza koji mu ne odgovara.

| Sponzor sme | Sponzor ne sme |
|---|---|
| finansirati nastanak edukativnog materijala | određivati zaključak ili preporuku |
| biti imenovan kao sponzor, vidljivo | tražiti da oznaka bude diskretna |
| predložiti temu | odobravati tekst pre objave |
| dobiti materijal kad i javnost | tražiti pravo veta |

Sponzorisani sadržaj prolazi **isti** uređivački postupak kao svaki drugi:
imenovan autor, imenovan recenzent, izvori, datum provere. Sponzorstvo se
obelodanjuje **pre** nego što korisnik pročita sadržaj, ne u fusnoti.

Ako sponzor traži izmenu medicinskog zaključka, saradnja se prekida i to se ne
prećutkuje. Propast opisana u `docs/00` §2.3 — „komercijalna veza se otkrije a
nismo je sami obelodanili" — ostaje merilo.

## Primeri

**Dozvoljeno**

- Prodaja vodiča po 1.999 RSD, sa imenovanim autorom i recenzentom.
- Newsletter na koji se korisnik prijavljuje sam, zasebnim neoznačenim poljem.
- Email sa računom i linkom za preuzimanje, poslat kupcu koji nije na newsletteru.
- Sponzorisani edukativni materijal sa vidljivom oznakom i punom uredničkom
  kontrolom CMZ-a.
- B2B Patient Support program dogovoren kroz zaseban komercijalni tok.

**Zabranjeno**

- Štiklirano polje „Želim novosti" na stranici plaćanja.
- Automatska prijava kupca na newsletter, čak i uz mogućnost odjave.
- Oglas koji tvrdi da vodič snižava šećer u krvi.
- Pominjanje ALMA-e kao recenzenta pre dokumentovane saglasnosti i imena
  odgovorne osobe.
- Polje „Koju terapiju koristite?" bilo gde, uključujući „opciono".
- Sponzorisani tekst bez oznake, ili sa oznakom ispod preloma.
- Zaključavanje informacije koja čitaocu treba da bi znao da se javi lekaru.

## Posledice

**Dobro**

- Projekat dobija prihod bez tihe promene identiteta, jer je granica zapisana pre
  prvog dinara.
- Sponzorstvo i B2B postaju mogući, a urednička nezavisnost merljiva.
- Zabrane koje su do sada bile posledica odsustva novca sada su pravila.

**Cena**

- Odsustvo komercijalnog interesa više nije signal poverenja koji se može
  koristiti (`docs/00` §4.4, faza 1). Poverenje se od sada brani isključivo
  transparentnošću i kvalitetom.
- Svaki komercijalni element nosi pravni i privacy dug koji se plaća pre
  isporuke, ne posle.

**Otvoreno**

- Pravni tekstovi, privacy pristup, analytics i merchant integracija — svi čekaju
  zasebno odobrenje.
- Dokumentovana saglasnost i identitet odgovorne osobe kod ALMA-e.
