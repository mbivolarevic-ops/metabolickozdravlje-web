# 04 — Health Literacy & User Understanding

**Sistem za proveru razumljivosti**
**Organizacija:** Edukativni studio — Centar za metaboličko zdravlje (CMZ)
**Verzija:** 0.1 — nacrt za usvajanje
**Datum:** 4. avgust 2026.
**Nadređeni dokumenti:** `00-CMZ-OPERATING-SYSTEM.md` (ustav) → `03-CONTENT-OPERATING-SYSTEM.md`

---

## Zašto ovaj dokument postoji

Dokument 03 definiše kako se pravi **tačan** sadržaj. Ovaj dokument definiše kako proveravamo da li je taj sadržaj **stvarno razumljiv osobi kojoj je namenjen** — i da li ona može da koristi sajt bez ičije pomoći.

To su dve različite stvari i njihovo mešanje je najčešći uzrok neuspeha zdravstvenih platformi. Tekst može biti savršeno tačan, potpisan od strane lekara, potkrepljen izvorima — i potpuno beskoristan za osobu koja ne zna razliku između glukoze i insulina.

> **Osnovno pravilo ovog dokumenta:**
> **Ne pretpostavljamo da korisnik poznaje medicinski termin, laboratorijsku proceduru ili digitalnu funkciju dok mu to jasno ne objasnimo.**

---

## Sadržaj

1. [Strateški kontekst i provera brojki](#1-strateški-kontekst-i-provera-brojki)
2. [Definicija ciljne razumljivosti](#2-definicija-ciljne-razumljivosti)
3. [CMZ Clarity Standard](#3-cmz-clarity-standard)
4. [Pravilo dva nivoa objašnjenja](#4-pravilo-dva-nivoa-objašnjenja)
5. [CMZ Clarity Test](#5-cmz-clarity-test)
6. [Digitalna pismenost i UX](#6-digitalna-pismenost-i-ux)
7. [Brojevi i laboratorijski nalazi](#7-brojevi-i-laboratorijski-nalazi)
8. [Jednostavno bez ponižavanja](#8-jednostavno-bez-ponižavanja)
9. [Formati za različite nivoe pažnje](#9-formati-za-različite-nivoe-pažnje)
10. [Razumljivost budućeg kviza](#10-razumljivost-budućeg-kviza)
11. [Merenje stvarnog razumevanja](#11-merenje-stvarnog-razumevanja)
12. [Posebne ciljne situacije](#12-posebne-ciljne-situacije)
13. [Doseg bez gubitka kvaliteta](#13-doseg-bez-gubitka-kvaliteta)
14. [Deliverables](#14-deliverables)

---

## 1. Strateški kontekst i provera brojki

### 1.1 Radne pretpostavke

Sledeće tvrdnje koristimo kao **interne radne pretpostavke** za planiranje sadržaja. Nijedna se ne objavljuje javno u ovom obliku:

- veliki broj ljudi u Srbiji živi sa gojaznošću;
- znatno manji broj njih ima kontinuiranu podršku unutar zdravstvenog sistema;
- veliki broj ljudi normalne telesne mase takođe ima faktore rizika za hronične metaboličke bolesti;
- mnogi ne razumeju laboratorijske nalaze ni razliku između faktora rizika, simptoma i dijagnoze;
- značajan deo publike ima nizak nivo zdravstvene i digitalne pismenosti;
- mobilni telefon je primarni uređaj velikog dela publike.

Poslednje tri su najvažnije za ovaj dokument i one određuju sve što sledi.

### 1.2 Rezultat provere brojki „1,4 miliona" i „manje od 5%"

Izvršena je preliminarna provera. **Rezultat: nijedna od dve brojke nije potvrđena u obliku u kojem je navedena, i nijedna se ne sme javno koristiti dok je čovek ne potvrdi u primarnom izvoru.**

#### Šta je pronađeno

| Podatak | Izvor | Godina | Populacija | Status |
|---|---|---|---|---|
| Gojazno 20,8%, predgojazno 36,3%, ukupno prekomerno 57,1% | Istraživanje zdravlja stanovništva Srbije (EHIS), RZS + IJZS „Batut" + Ministarstvo zdravlja | 2019 | **15 i više godina** | `[PROVERITI IZVOR]` — nađeno u sekundarnom prenosu, nije otvorena primarna publikacija |
| Gojazno ~24% odraslih; BMI > 25 kod ~57% | World Obesity Federation / World Obesity Atlas, preneto u domaćim medijima | 2025/2026 | odrasli | `[PROVERITI IZVOR]` — **i pažnja na poreklo, vidi 1.3** |
| Projekcija: „skoro tri miliona osoba sa visokim BMI do 2030." | domaći mediji, pozivaju se na Atlas | — | — | `[PROVERITI IZVOR]` |
| Projekcija: „skoro dva miliona (28%) biće gojazno do 2030." | drugi domaći izvor, poziva se na isti Atlas | — | — | `[PROVERITI IZVOR]` — **protivreči prethodnom redu** |
| „manje od 5% uključeno u zdravstveni tretman ili praćenje" | — | — | — | **IZVOR NIJE PRONAĐEN** |

#### Zašto „1,4 miliona" ne stoji kao potvrđena činjenica

Prosta računica pokazuje da brojka jeste u pravom redu veličine, ali ne izlazi iz nijednog nađenog izvora:

```
20,8% (EHIS 2019, uzrast 15+)  ×  ~5,6 mil. stanovnika 15+   ≈  1,16 miliona
24%   (Atlas, odrasli)         ×  ~5,3 mil. odraslih          ≈  1,27 miliona
```

Do 1,4 miliona se dolazi samo uz drugačiju osnovu (npr. celokupno stanovništvo umesto odraslih), noviju prevalenciju ili projekciju za buduću godinu. **Dok se ne zna koja od tih pretpostavki stoji iza brojke, ona je neupotrebljiva** — i upravo je to vrsta greške koju ova platforma ne sme napraviti, jer bi je struka odmah prepoznala.

#### Zašto je „manje od 5%" najrizičnija tvrdnja

Nije pronađen nijedan izvor. Uz to, tvrdnja je **konceptualno neodređena** — „uključen u tretman" može značiti bilo šta od sledećeg, a brojke se drastično razlikuju:

| Šta se meri | Zašto je to druga brojka |
|---|---|
| Ima postavljenu dijagnozu gojaznosti u kartonu | Kodiranje dijagnoze je često nepotpuno |
| Prati se kod lekara zbog telesne mase | Nema jedinstvene evidencije |
| Prima farmakoterapiju | Uzak podskup |
| Imao barijatrijsku operaciju | Vrlo mali broj |
| Ikada dobio savet o ishrani od lekara | Znatno veći broj |

**Pravilo:** dok ne znamo koja se od ovih stvari meri, brojka se ne koristi ni interno kao argument, a kamoli javno.

### 1.3 Kritična napomena o poreklu podataka

Značajan deo brojki o gojaznosti koje kruže domaćim medijima dolazi iz **saopštenja povezanih sa lansiranjem lekova za gojaznost i iz saopštenja udruženja koja u tome učestvuju.** To ne znači da su netačne — ali znači da ih ne smemo prenositi kao neutralnu javnozdravstvenu statistiku.

Za platformu čija je najveća vrednost percepcija nezavisnosti (ustav, sekcija 4), preuzimanje brojki iz farmaceutskog PR ciklusa je **strukturni rizik, ne sitnica.** Ako naš tekst navodi istu brojku iz istog saopštenja kao i promotivni članci, razlika između nas i njih prestaje da postoji.

**Pravilo:** brojka se citira iz **primarnog izvora** (RZS/Batut publikacija, EHIS baza, Eurostat, SZO, World Obesity Atlas original) — nikada iz medijskog prenosa, nikada iz saopštenja.

### 1.4 Protokol za svaku javnu brojku

```
① Pronađi PRIMARNI izvor. Otvori ga.
② Zapiši: godina · metodologija · definicija · uzrast · uzorak
③ Razdvoji šta se tačno meri:
   gojaznost ≠ prekomerna telesna masa
   dijagnoza ≠ evidentiranje ≠ lečenje ≠ praćenje
   izmereno (visina/masa) ≠ samoprijavljeno
④ Proveri da li postoji noviji podatak
⑤ Ako izvor nije nađen ili je nejasan → [PROVERITI IZVOR]
⑥ Ako ni posle provere nema pouzdanog izvora → KVALITATIVNA FORMULACIJA
⑦ Potpis stručnog urednika
```

**Kvalitativne formulacije koje smemo koristiti bez precizne brojke:**

> ✅ „Prekomerna telesna masa i gojaznost su u Srbiji vrlo česti — prema nacionalnim istraživanjima zdravlja, odnose se na više od polovine odraslog stanovništva."
> ✅ „Veliki broj ljudi sa gojaznošću nema kontinuiranu podršku u sistemu, jer se gojaznost tek odnedavno sistemski tretira kao hronična bolest."
> ❌ „U Srbiji 1,4 miliona ljudi živi sa gojaznošću, a manje od 5% ih se leči."

Druga kvalitativna formulacija je čak i **jača** od brojke, jer je proverljiva i ne može se osporiti.

### 1.5 Šta ovo znači za sadržaj

Iz konteksta sledi jedna strateška posledica koja menja prioritete:

> **Naša publika nije samo osoba sa dijagnozom. To je i osoba normalne telesne mase sa faktorima rizika, koja je ubeđena da je se ovo ne tiče.**

Ta osoba se ne hvata sadržajem o gojaznosti. Hvata se sadržajem o **nalazu** — jer i ona radi analize. To dodatno potvrđuje odluku iz dokumenta 02 da klaster laboratorijskih analiza ide prvi.

---

## 2. Definicija ciljne razumljivosti

### 2.1 Minimalni nivo pretpostavljenog znanja

Pišemo za osobu koja:

**Zna:** da postoji šećer u krvi; da se rade analize krvi; da postoji dijabetes; da lekar tumači nalaze; da telesna masa ima veze sa zdravljem.

**Ne mora da zna ništa drugo.** Konkretno, ne pretpostavljamo da zna: šta je insulin; šta je hormon; razliku između glukoze i šećera koji jede; šta je referentna vrednost; šta znači „natašte"; šta je mmol/L; razliku između faktora rizika i dijagnoze; šta je metabolizam; šta znači „hronično"; šta je prevencija; šta znači „%".

### 2.2 Pet različitih stvari koje se stalno mešaju

Ovo je pojmovno jezgro dokumenta. Tekst može zadovoljiti jednu, a pasti na drugoj — i tada je beskoristan.

| Pojam | Pitanje na koje odgovara | Ko proverava | Primer neuspeha |
|---|---|---|---|
| **Medicinska tačnost** | Da li je tvrdnja istinita prema dokazima? | Stručni urednik | Tekst kaže da HbA1c pokazuje trenutnu glukozu — netačno |
| **Jezička jednostavnost** | Da li su reči i rečenice kratke i obične? | Urednik / alat | „Glikozilirani hemoglobin predstavlja indikator glikoregulacije" — tačno, ali nerazumljivo |
| **Korisničko razumevanje** | Da li je osoba **stvarno razumela poruku**? | Test sa ljudima | Tekst je jednostavan, ali osoba izlazi misleći da ima dijabetes iako nema |
| **Funkcionalna zdravstvena pismenost** | Da li osoba može da **upotrebi** informaciju? | Test sa ljudima | Razumela je tekst, ali ne zna šta sad da uradi |
| **Digitalna pristupačnost** | Da li može da koristi sajt? | Test + tehnička provera | Sve razume, ali ne ume da preuzme vodič |

**Najvažniji uvid:** jednostavan jezik je **nužan ali nedovoljan uslov** za razumevanje. Tekst pisan kratkim rečenicama može ostaviti osobu sa pogrešnim zaključkom. Zato jezička merila (dužina rečenice, čitljivost) nikada nisu dovoljna — mora se testirati sa ljudima (sekcija 5).

### 2.3 Tri sloja pismenosti koje ciljamo

```
NIVO 1 — OSNOVNA         „Razumem šta piše."
                          Cilj: 100% sadržaja
NIVO 2 — INTERAKTIVNA    „Mogu da izvučem ono što se odnosi na mene."
                          Cilj: 100% članaka (sekcija „Šta to znači za vas")
NIVO 3 — KRITIČKA        „Umem da procenim informaciju koju vidim drugde."
                          Cilj: kroz module o mitovima i o granicama dokaza
```

Nivo 3 je dugoročno najvredniji: osoba koja nauči da prepozna preteranu tvrdnju postaje otporna na dezinformaciju i lojalna izvoru koji je tome naučio.

### 2.4 Interni i javni rečnik

| Interno govorimo | Javno nikada ne govorimo |
|---|---|
| niska zdravstvena pismenost | „nepismeni", „polupismeni", „neuki" |
| niska digitalna pismenost | „ne snalaze se sa tehnologijom" |
| ciljna grupa sa ograničenim predznanjem | „prosečan korisnik ne razume" |

U javnoj komunikaciji **nikada** ne govorimo o publici kao o nekome kome treba spustiti nivo. Govorimo o sebi: *„Trudimo se da objasnimo jednostavno i tačno."*

---

## 3. CMZ Clarity Standard

### 3.1 Šta je standard

Skup od 11 provera koje mora proći **svaki** sadržaj koji korisnik vidi: članak, pillar stranica, FAQ, vodič, email, forma, ilustracija, opis dugmeta i budući kviz.

### 3.2 Jedanaest provera

| # | Provera | Kako se proverava | Blokira objavu? |
|---|---|---|---|
| **C1** | Naslov jasno govori šta korisnik dobija | Ljudska procena | ⛔ da |
| **C2** | Prve dve rečenice odgovaraju na pitanje | Ljudska + delimično automatska | ⛔ da |
| **C3** | Svaki stručni termin objašnjen pri prvom pojavljivanju | **Automatski** (rečnik termina) + ljudska | ⛔ da |
| **C4** | Skraćenica prvi put ima pun naziv | **Automatski** (regularni izraz) | ⛔ da |
| **C5** | Jedan nov koncept po pasusu | Ljudska procena | ne, upozorenje |
| **C6** | Postoji konkretan primer | Ljudska procena | ne, upozorenje |
| **C7** | Svaki broj i jedinica objašnjeni | **Automatski** (traži brojeve bez konteksta) + ljudska | ⛔ da |
| **C8** | Korisnik zna šta je sledeći korak | Ljudska procena | ⛔ da |
| **C9** | Tekst ne može biti shvaćen pogrešno | **Test sa ljudima** (sekcija 5) | ⛔ da, za pillar i vodiče |
| **C10** | Dugme jasno opisuje šta će se desiti | Ljudska + lista zabranjenih izraza | ⛔ da |
| **C11** | Radnja se može završiti bez poznavanja digitalnih konvencija | **Test sa ljudima** | ⛔ da, za forme i vodiče |

### 3.3 O „CMZ Clarity Score" — zašto ne pravimo numerički skor

Postoji iskušenje da se od ovoga napravi broj („Clarity Score: 84/100"), jer broj izgleda precizno i lako se prati. **Ne radimo to, i evo zašto.**

Formule čitljivosti (Flesch, SMOG i slične) mere **dužinu reči i rečenica**, ništa više. One ne mere razumevanje. Tekst „Insulin je hormon. Hormon je supstanca. Rezistencija je otpor." ima odličan skor i nikoga ničemu ne uči. Obrnuto, dobra analogija često produžuje rečenicu i „kvari" skor dok drastično poboljšava razumevanje.

Uz to, sve poznate formule čitljivosti kalibrisane su za engleski jezik. Srpski ima duže reči, padeže i drugačiju strukturu — primenjena formula daje broj koji izgleda ozbiljno a ne znači ništa.

**Najveća opasnost je treća:** čim postoji skor, ljudi optimizuju skor. Kad se počne skraćivati rečenice da bi broj porastao, prvo što se izgubi su ograde — a ograde su ono što tekst čini medicinski tačnim („obično", „kod većine ljudi", „potvrđeno u dva nalaza"). **Optimizacija za jednostavnost proizvodi medicinsku netačnost**, i to je najozbiljniji rizik celog ovog dokumenta.

### 3.4 Šta umesto skora

**Trostepena ocena po svakoj proveri**, bez sabiranja u jedan broj:

```
✅ PROLAZI        Ispunjeno.
⚠️ UPOZORENJE     Ispunjeno delimično. Objava moguća uz belešku.
⛔ NE PROLAZI     Nije ispunjeno. Blokira objavu ako je provera blokirajuća.
```

| Šta se meri objektivno (automatski) | Šta traži ljudsku procenu |
|---|---|
| Skraćenica bez punog naziva (C4) | Da li je objašnjenje **stvarno** razumljivo (C3) |
| Termin van rečnika bez objašnjenja (C3, prvi prolaz) | Da li naslov obećava tačno ono što tekst daje (C1) |
| Broj bez jedinice ili bez konteksta (C7) | Da li je primer koristan ili samo prisutan (C6) |
| Prosečna dužina rečenice (informativno) | Da li se tekst može shvatiti pogrešno (C9) |
| Zabranjeni digitalni izrazi (C10) | Da li je sledeći korak stvarno izvodljiv (C8) |
| Nedostaje `alt` opis | Da li osoba može završiti radnju (C11) |

**Zaštita od pojednostavljivanja do netačnosti:** svaka izmena napravljena zbog razumljivosti prolazi ponovo kroz stručnu recenziju. Konkretno pravilo:

> **Ako se radi jednostavnosti briše ograda („obično", „kod većine", „u dva nalaza") — izmena se odbija.**
> Ograda se ne briše nego prevodi: „obično" → „kod većine ljudi, ali ne kod svih".

### 3.5 Kada se standard primenjuje

| Sadržaj | Provere | Test sa ljudima |
|---|---|---|
| Članak | C1–C10 | Ne obavezno |
| Pillar stranica | C1–C11 | **Da, obavezno** |
| Vodič (lead magnet) | C1–C11 | **Da, obavezno** |
| Forma i tok prijave | C10, C11 | **Da, obavezno** |
| Email poruka | C1, C2, C8, C10 | Ne |
| FAQ | C1–C8 | Ne |
| Kviz | Sve + sekcija 10 | **Da, obavezno** |
| Ilustracija | C3, C7 + `alt` opis | Uz pillar test |

---

## 4. Pravilo dva nivoa objašnjenja

### 4.1 Model

Svaki složen pojam uvodi se u dva koraka, **tim redosledom**:

```
KORAK 1 — ŠTA RADI          jednostavnim jezikom, bez termina
KORAK 2 — KAKO SE ZOVE      tačan medicinski termin
```

> **Primer:** „Insulin je hormon koji pomaže da glukoza iz krvi uđe u ćelije i bude iskorišćena kao energija. Kada ćelije slabije odgovaraju na insulin, govori se o **insulinskoj rezistenciji**."

### 4.2 Zašto baš tim redosledom

Ako termin dođe prvi, mozak ga pamti kao praznu etiketu i objašnjenje koje sledi „lepi" se na nepoznatu reč. Ako prvo dođe funkcija, termin dobija mesto na koje se kači — i osoba ga zapamti.

**Praktična posledica koja je i deo misije:** korisnik izlazi sa tačnim terminom u rečniku. Kod lekara može reći „pisalo je nešto o insulinskoj rezistenciji" umesto „nešto sa šećerom". To je merljivo bolji razgovor.

### 4.3 Primena po tipu pojma

**Laboratorijski parametar**

> ✅ „U nalazu se meri koliko je glukoze u krvi bilo prosečno u poslednja dva do tri meseca. Taj parametar se zove **HbA1c** (glikozilirani hemoglobin)."
> ❌ „HbA1c (glikozilirani hemoglobin) je parametar dugoročne glikoregulacije."

**Fiziološki proces**

> ✅ „Posle obroka nivo šećera u krvi raste. Pankreas tada luči insulin, koji pomaže da taj šećer uđe u ćelije. Ceo taj sistem održavanja šećera u ravnoteži zove se **regulacija glukoze**."
> ❌ „Homeostaza glukoze podrazumeva koordinisano dejstvo insulina i kontraregulatornih hormona."

**Dijagnoza** *(najosetljivije — vidi 4.4)*

> ✅ „Kada je šećer u krvi trajno viši nego što bi trebalo, ali još nije dovoljno visok da bi se zvao dijabetes, govori se o **predijabetesu**. To je stanje koje lekar prepoznaje na osnovu nalaza, i koje se u ranoj fazi često može menjati."
> ❌ „Predijabetes je stanje poremećene glikoregulacije koje prethodi dijabetesu tipa 2."

**Faktor rizika** *(najčešće pogrešno shvaćeno)*

> ✅ „Ako je neko u vašoj porodici imao dijabetes tipa 2, vaša verovatnoća da ga dobijete je veća nego kod osobe bez toga u porodici. To **ne znači** da ćete ga dobiti — to je **faktor rizika**, a ne dijagnoza ni predviđanje."
> ❌ „Pozitivna porodična anamneza je značajan faktor rizika za razvoj T2D."

**Statistika** *(vidi i sekciju 7)*

> ✅ „Od 100 ljudi sa predijabetesom, kod nekih će vremenom nastati dijabetes tipa 2, a kod nekih neće — na to utiče više stvari, i deo njih se može menjati."
> ❌ „Konverzija predijabetesa u T2D iznosi otprilike 5–10% godišnje."

**Terapijski pojam** *(uz ograničenja iz ustava, sekcija 13)*

> ✅ „Kada promene u ishrani i aktivnosti nisu dovoljne, lekar može razmotriti i druge načine lečenja. Koji su to načini i da li su u nečijem slučaju odgovarajući, procenjuje isključivo lekar."
> ❌ Bilo koje ime leka, doza ili poređenje terapija.

**Medicinska skraćenica**

Pravilo: **prvi put uvek pun naziv + kratko objašnjenje + skraćenica u zagradi.** Zatim se koristi skraćenica.

> ✅ „test opterećenja glukozom (**OGTT**) — analiza kod koje se šećer u krvi meri pre i dva sata posle popijenog rastvora glukoze"
> ❌ „OGTT se radi po standardnom protokolu."

### 4.4 Posebno pravilo za dijagnoze — zabrana implicitne dijagnoze

Objašnjenje dijagnoze **nikada ne sme biti napisano tako da čitalac zaključi da je ima.**

Formulacija uvek sadrži tri elementa: šta stanje jeste · ko ga prepoznaje (lekar, na osnovu nalaza) · da jedan nalaz nije dovoljan.

| Rizična formulacija | Bezbedna formulacija |
|---|---|
| „Ako imate ove simptome, imate insulinsku rezistenciju." | „Ovi simptomi se mogu javiti kod insulinske rezistencije, ali i kod mnogo drugih stanja. To može razlučiti samo lekar." |
| „Vrednost preko 5,7% znači predijabetes." | „Vrednost od 5,7% do 6,4% ukazuje na predijabetes. Dijagnozu postavlja lekar, obično posle ponovljenog nalaza i uz ostale parametre." |

### 4.5 Kada se pravilo ne primenjuje

Kod pojmova koji su već deo svakodnevnog govora (šećer u krvi, holesterol, pritisak) dvostepeno objašnjenje deluje patronizujuće. Test: **da li bi prosečna osoba ovaj pojam upotrebila u razgovoru?** Ako da — objašnjava se samo ono što je netačno u svakodnevnoj upotrebi (npr. da „šećer u krvi" nije isto što i šećer koji se jede).

---

## 5. CMZ Clarity Test

### 5.1 Osnovno pitanje

> **Može li osoba bez medicinskog obrazovanja, nakon nekoliko minuta čitanja, svojim rečima objasniti glavnu poruku članu porodice — tačno, bez nepotrebnog straha i sa jasnim sledećim korakom?**

Ovo je jedina provera koja meri **stvarno razumevanje**, a ne našu procenu razumljivosti. Sve automatske provere zajedno ne mogu je zameniti.

### 5.2 Šta test meri

| Dimenzija | Pitanje | Kritični ishod |
|---|---|---|
| **Razumevanje** | Šta je osoba razumela? | Prepričava suštinu tačno |
| **Pogrešno tumačenje** | Šta je razumela pogrešno? | **Najvredniji nalaz testa** |
| **Nepoznate reči** | Koje reči nisu bile jasne? | Termin bez objašnjenja |
| **Rizik vs. dijagnoza** | Da li ih razlikuje? | ⛔ Ako ne — tekst se prepravlja |
| **Sledeći korak** | Zna li kada je potreban lekar? | ⛔ Ako ne — tekst se prepravlja |
| **Emocionalni ishod** | Oseća li se mirnije ili uplašenije? | ⛔ Ako je uplašenija — tekst se prepravlja |

Dva ishoda su apsolutno blokirajuća: **ako je osoba pomislila da ima dijagnozu koju nema**, ili **ako je izašla uplašenija nego što je ušla** — tekst se ne objavljuje bez prepravke.

### 5.3 Protokol testiranja

**Koga testiramo:** 3–5 ljudi, bez medicinskog obrazovanja, različitog uzrasta (bar jedna osoba 55+), različitog nivoa obrazovanja, bar jedna osoba koja telefon koristi ograničeno. Ne testiramo prijatelje koji rade u zdravstvu, marketingu ili IT-ju — njihovo razumevanje nije reprezentativno.

**Kada:** obavezno pre objave svake pillar stranice, svakog vodiča, forme za prijavu i kviza. Preporučeno na svakom petom članku.

**Trajanje:** 15–20 minuta po osobi.

**Tok:**

```
① PRIPREMA (1 min)
   „Zanima nas da li je tekst razumljiv. NE testiramo vas —
    testiramo tekst. Ako nešto nije jasno, greška je naša."
   ⚠ Ovo je najvažnija rečenica u celom protokolu. Bez nje ljudi
     kažu da su sve razumeli, iz nelagode.

② ČITANJE (3–5 min)
   Osoba čita na SVOM telefonu, ne na našem uređaju.
   Ne pomažemo, ne objašnjavamo, ne komentarišemo.
   Beležimo: gde zastaje · gde se vraća · gde skroluje brzo · izraz lica.

③ PREPRIČAVANJE (3 min)
   „Zamislite da ovo objašnjavate bratu ili sestri. Šta biste rekli?"
   Beležimo DOSLOVNO. Ne ispravljamo.

④ PITANJA (5 min)
   1. O čemu je ovaj tekst?
   2. Da li je bilo reči koje niste razumeli? Kojih?
   3. Ako neko ima ovaj nalaz — da li to znači da ima bolest?
   4. Šta bi ta osoba trebalo da uradi sledeće?
   5. Kada bi trebalo da ode kod lekara?
   6. Kako se osećate posle čitanja — mirnije, isto ili zabrinutije?
   7. Da li vam je nešto delovalo kao da vam nešto prodajemo?
   8. Da li biste ovo poslali nekome? Kome?

⑤ ZADATAK (samo za vodiče i forme, 3 min)
   „Preuzmite ovaj vodič."
   Ne pomažemo dok osoba sama ne zatraži pomoć.
   Beležimo svako oklevanje i svaki pogrešan klik.

⑥ ZAHVALNOST
   Bez naknade vezane za odgovor. Simboličan poklon je u redu.
```

### 5.4 Kako se čitaju rezultati

| Nalaz | Radnja |
|---|---|
| 3+ od 5 osoba pogrešno prepričalo glavnu poruku | ⛔ Tekst se prepisuje iz osnove |
| 2+ osobe pomislile da imaju dijagnozu | ⛔ Blokira objavu. Prepravlja se po 4.4 |
| 1+ osoba izašla uplašenija | ⛔ Blokira objavu. Menja se ton |
| Ista reč nejasna 2+ osobama | Reč se objašnjava ili menja |
| 2+ osobe ne znaju sledeći korak | Sekcija „Kada razgovarati sa lekarom" se prepravlja |
| 1+ osoba oseća da joj se nešto prodaje | ⛔ CTA blok se preispituje |
| Osoba ne uspeva da preuzme vodič | ⛔ Tok se prepravlja pre objave |

### 5.5 Evidencija

Svaki test se beleži: datum · testirani sadržaj · broj i profil učesnika (bez imena i bez ikakvog zdravstvenog podatka) · doslovna prepričavanja · lista nejasnih reči · zaključci · šta je izmenjeno.

Nejasne reči idu u **zajedničku listu problematičnih termina**, koja postaje deo rečnika i automatske provere C3. Tako svaki test poboljšava ceo sistem, ne samo jedan tekst.

---

## 6. Digitalna pismenost i UX

### 6.1 Osnovna pretpostavka

> **Ne pretpostavljamo da korisnik zna nijednu digitalnu konvenciju.** Ne zna šta je meni sa tri crte, ne zna da se accordion otvara klikom, ne zna gde odlazi preuzeti fajl, ne razlikuje pouzdano oglas od sadržaja.

Ako radnja zahteva prethodno znanje — radnja je loše dizajnirana, a ne korisnik neuk.

### 6.2 Pravila po elementu

| Element | Pravilo | Zašto |
|---|---|---|
| **Mobilna navigacija** | Meni ima **i ikonu i reč „Meni"**. Otvara se preko celog ekrana, sa velikim stavkama i vidljivim dugmetom „Zatvori" (reč, ne samo ×). | Ikona sa tri crte nije univerzalno prepoznata kod starijih korisnika |
| **Ciljevi dodira** | Minimum 44 × 44px, razmak najmanje 8px. Kod formi i primarnih dugmadi 52px visine. | Smanjena preciznost dodira kod starijih i kod drhtavice |
| **Tekst na dugmadima** | Glagol + predmet, iz perspektive korisnika. „Pošaljite mi vodič" umesto „Pošalji". Nikada „Submit", „Dalje", „OK" samo. | Dugme mora reći šta će se desiti |
| **Forme** | **Jedan zadatak po ekranu.** Jedno polje (email) + jedna potvrda saglasnosti + jedno dugme. Vidljiva oznaka iznad polja, ne samo u polju. | Placeholder nestaje kad se počne kucati i osoba zaboravi šta se traži |
| **Poruke o grešci** | Običnim jezikom, kažu **šta da se uradi**. „Izgleda da u adresi nedostaje @. Proverite i pokušajte ponovo." | „Neispravan format" ne pomaže nikome |
| **Preuzimanje vodiča** | Piše šta će se desiti **pre** klika: „Vodič ćemo poslati na vašu email adresu. Stiže odmah po potvrdi." Nikada tiho otvaranje fajla. | Osoba ne zna gde fajl „ode" |
| **Otvaranje PDF-a** | Uz link stoji „PDF, 16 strana, otvara se u novom prozoru". Nudi se i **verzija za čitanje na sajtu**, bez preuzimanja. | Veliki deo korisnika ne ume da nađe preuzet fajl na telefonu |
| **Povratak nazad** | Uvek postoji vidljiv link „← Nazad na [gde]". Ne oslanjamo se na dugme pregledača. | Nova kartica ubija dugme „nazad" |
| **Pretraga** | Vidljivo polje sa rečju „Pretraga", ne samo lupa. Rezultati sa objašnjenjem („Pronađeno 4 teksta"). Kad nema rezultata — predlažu se teme, nikad prazan ekran. | |
| **FAQ (accordion)** | Prvo pitanje **otvoreno**, da se vidi kako radi. Strelica + promena boje pri otvaranju. | Zatvoren accordion mnogi ne prepoznaju kao interaktivan |
| **Štampanje i deljenje** | Dugme „Štampajte" **i** „Pošaljite sebi" (na telefonu se realno šalje u poruke, ne štampa). | |
| **Email potvrda** | Ekran posle prijave kaže: kome je poruka poslata (delimično skrivena adresa), šta da se traži, šta ako ne stigne, gde da se pogleda (promocije/spam). Dugme koje otvara poštu. | Najveće mesto osipanja u celom funnelu |
| **Ako email ne stigne** | Na istom ekranu: „Nije stiglo? [Pošaljite ponovo]" i alternativni kontakt. | |
| **Odjava sa liste** | Link u svakoj poruci, običnim rečima: „Ne želite više ove poruke? Odjavite se ovde." **Jedan klik, bez pitanja zašto, bez prijave.** | Otežana odjava se prijavljuje kao spam i ruši isporučivost |
| **Kolačići** | Kratka traka na dnu, najviše 25% ekrana, obično rečenica, dva jednaka dugmeta („Prihvatam" / „Samo neophodni"). Bez tamnih obrazaca. | |
| **Sporo učitavanje** | Prikazuje se tekst čim je spreman, slike dolaze posle. Nikada prazan beli ekran sa vrtećim krugom. | |

### 6.3 Zabranjeni izrazi u tekstu koji korisnik vidi

**Nikada:** submit · validation error · authentication · verify account · consent management · CTA · resource · download asset · loading · error 404 · session expired · opt-in · newsletter (kao jedini naziv) · subscribe · dashboard · toggle · filter (kao dugme) · accordion · modal · banner · cookie policy (bez prevoda) · required field · invalid input.

**Umesto njih:**

| Ne pišemo | Pišemo |
|---|---|
| Submit / Pošalji | Pošaljite mi vodič |
| Validation error | Izgleda da nešto nedostaje u adresi |
| Verify your account | Potvrdite svoju email adresu |
| Download | Preuzmite (uz objašnjenje šta se dešava) |
| Error 404 | Ova stranica ne postoji. Evo šta možete umesto toga: |
| Session expired | Prošlo je previše vremena. Molimo pokušajte ponovo. |
| Required field | Obavezno |
| Newsletter | Edukativne poruke o metaboličkom zdravlju |
| Opt-in / Subscribe | Prijavite se |
| Filter | Prikaži samo… |
| Loading | Učitavamo… |

---

## 7. Brojevi i laboratorijski nalazi

### 7.1 Zašto je ovo najteži deo

Laboratorijski nalaz je **glavna ulazna tačka platforme** (dokument 02). Istovremeno je i mesto gde publika najviše greši, i gde naša greška najviše košta.

Pet stvari koje se najčešće ne razumeju: procenat; jedinica (mmol/L vs. mg/dL); referentni opseg; razlika između jednog nalaza i dijagnoze; razlika između prosečne i trenutne vrednosti.

### 7.2 Pravila po tipu broja

**Jedinica** — nikada gola. Uz prvo pojavljivanje kratko objašnjenje šta jedinica meri.

> ✅ „Glukoza se u nalazu izražava u milimolima po litru (mmol/L) — to je mera koliko glukoze ima u određenoj količini krvi. U nekim nalazima, posebno stranim, koristi se druga jedinica (mg/dL), pa se iste vrednosti prikazuju drugim brojevima."
> ❌ „Glukoza natašte: 6,3 mmol/L."

**Prag** — uvek uz objašnjenje da prag nije prekidač.

> ✅ „Granica od 6,1 mmol/L ne znači da je 6,0 bezbedno a 6,2 opasno. Granice su dogovorene tačke koje pomažu lekaru da odluči šta dalje, a ne prekidači."
> ❌ „Vrednosti iznad 6,1 mmol/L su patološke."

**Procenat** — uvek preveden u ljude.

> ✅ „Otprilike jedna od pet odraslih osoba u Srbiji ima gojaznost — to je oko 20 od svakih 100 ljudi."
> ❌ „Prevalencija gojaznosti iznosi 20,8%."

Poseban slučaj: **HbA1c se izražava u procentima, ali to nije procenat ljudi ni procenat šećera** — to je udeo hemoglobina za koji je vezana glukoza. Ovo se **mora** objasniti, jer je izvor česte zabune.

**Opseg** — objasniti da nije isto što i „normalno".

> ✅ „Referentni opseg pokazuje vrednosti koje se najčešće nalaze kod zdravih ljudi. Nalaz malo van opsega ne mora značiti bolest, kao što ni nalaz unutar opsega ne znači automatski da je sve u redu."

**Relativni vs. apsolutni rizik** — najopasnija zabuna u zdravstvenom sadržaju.

> ✅ „Ako se rizik poveća sa 2 na 4 od 100 ljudi, to je udvostručenje — ali i dalje znači da se kod 96 od 100 ljudi to neće desiti."
> ❌ „Rizik je dvostruko veći." *(bez apsolutnih brojeva — tehnički tačno, praktično obmanjujuće)*

**Pravilo:** relativni rizik se **nikada** ne navodi bez apsolutnih brojeva.

**Prosečna vs. trenutna vrednost**

> ✅ „HbA1c je prosek za dva do tri meseca. Zato se ne menja zbog jednog obroka ni zbog jednog lošeg dana — ali ni zbog jedne dobre nedelje."

**Nalaz vs. dijagnoza** — obavezna rečenica u svakom tekstu o nalazima:

> „Jedan nalaz nije dijagnoza. Dijagnozu postavlja lekar, obično na osnovu ponovljenog nalaza i uz ostale rezultate i vašu celokupnu sliku."

**Razlike među laboratorijama** — obavezna napomena uz svaku tabelu referentnih vrednosti:

> „Referentni opsezi mogu se malo razlikovati između laboratorija. Uvek gledajte opseg koji piše na vašem nalazu, pored rezultata."

### 7.3 Standardni format prikaza laboratorijskog parametra

Ponovljivi blok, isti na svakoj stranici o nekom parametru. **Šest polja, uvek istim redom** — doslednost je ovde deo razumljivosti, jer korisnik posle drugog nalaza već zna gde da gleda.

```
┌─────────────────────────────────────────────────────────────┐
│  HbA1c (glikozilirani hemoglobin)                           │
├─────────────────────────────────────────────────────────────┤
│  ŠTA MERI                                                   │
│  Koliko je glukoze u krvi bilo prosečno u poslednja         │
│  dva do tri meseca.                                         │
│                                                             │
│  ZAŠTO SE RADI                                              │
│  Da bi se videla dugoročnija slika, koju jedno merenje      │
│  šećera ujutru ne može pokazati.                            │
│                                                             │
│  KAKO IZGLEDA NA NALAZU                                     │
│  [Anonimizovan isečak nalaza sa označenim redom]            │
│  Može pisati: HbA1c · A1c · glikozilirani hemoglobin        │
│  Vrednost je u procentima (%), a ponekad i u mmol/mol.      │
│                                                             │
│  ŠTA MOŽE UTICATI NA REZULTAT                               │
│  Anemija, bolesti bubrega, trudnoća i neka druga stanja     │
│  mogu promeniti ovaj nalaz — u oba smera.                   │
│                                                             │
│  ŠTA OVAJ NALAZ SAM NE MOŽE DA KAŽE                         │
│  Ne može sam da postavi dijagnozu. Ne pokazuje kako vam     │
│  je šećer skakao tokom dana. Ne govori zašto je vrednost    │
│  takva kakva jeste.                                         │
│                                                             │
│  ŠTA PITATI LEKARA                                          │
│  • Da li treba ponoviti nalaz i kada?                       │
│  • Da li moji drugi parametri menjaju tumačenje?            │
│  • Da li kod mene postoji nešto što može uticati na ovaj    │
│    rezultat?                                     [Štampajte]│
└─────────────────────────────────────────────────────────────┘
```

Polje **„Šta ovaj nalaz sam ne može da kaže"** je najvažnije i najređe viđeno. Ono direktno sprečava najčešću grešku — da osoba iz jednog broja izvede zaključak o sebi.

Polje **„Kako izgleda na nalazu"** je najjači praktični diferencijator: korisnik prepoznaje sopstveni papir, uključujući i različite nazive pod kojima parametar može biti upisan.

---

## 8. Jednostavno bez ponižavanja

### 8.1 Princip

> **Jednostavno je za nas, ne za njih.** Naš posao je da složeno prevedemo, ne da spustimo nivo osobi koja čita.

Osoba koja ne zna šta je insulin nije glupa — samo se nije bavila time. Isto tako, mi ne znamo kako se popravlja menjač.

### 8.2 Zabranjeno

| Zabranjeno | Primer |
|---|---|
| Infantilni ton | „Hajde da zajedno naučimo nešto o šećerčiću!" |
| Tepanje | „Vaše telo je pametno i samo zna…" |
| Previše emotikona | Bilo koji emoji u telu medicinskog teksta |
| Reč „samo" uz radnju | „Samo smanjite unos šećera" — sugeriše da je lako |
| Pretpostavka da je pitanje glupo | „Naravno, svi znaju da…" |
| Podsmeh zabludama | „Mit koji i dalje neki veruju" |
| Moralizovanje ishrane | „loša hrana", „greh", „varanje", „čista ishrana" |
| Vezivanje mase i karaktera | „nedostatak volje", „disciplina", „izgovori" |
| Lažno ohrabrivanje | „Vi to možete! Verujemo u vas!" |
| Snishodljivo objašnjavanje | „Da pojednostavimo za one koji nisu upućeni…" |

### 8.3 Kako se poštovanje pokazuje u praksi

- **Objašnjavamo, ne spuštamo.** Termin se daje, ne krije.
- **Priznajemo da je teško.** „Promena navika je teška, i to nije stvar karaktera" umesto „samo treba doslednost".
- **Pretpostavljamo dobru nameru.** Ako neko veruje u zabludu, verovatno je čuo od nekog kome veruje.
- **Objašnjavamo zašto je zabluda nastala**, umesto da je proglasimo glupošću.
- **Ne hvalimo za razumevanje.** „Odlično, sada razumete!" je nastavnički ton.

### 8.4 Dvadeset primera: stručno → banalizovano → CMZ

| # | ❌ Stručno, nerazumljivo | ❌ Banalizovano | ✅ CMZ |
|---|---|---|---|
| 1 | „Insulinska rezistencija je smanjena osetljivost perifernih tkiva na dejstvo insulina." | „Telo se buni protiv insulina!" | „Insulin je hormon koji pomaže da šećer iz krvi uđe u ćelije. Kod insulinske rezistencije ćelije slabije reaguju na njega, pa pankreas mora da luči više insulina za isti posao." |
| 2 | „HbA1c reflektuje prosečnu glikemiju tokom perioda od 8 do 12 nedelja." | „HbA1c je vaš prosek iz šećera." | „HbA1c pokazuje koliko je šećera u krvi bilo prosečno u poslednja dva do tri meseca. Zato ga jedan obrok ne menja." |
| 3 | „Prevalencija predijabetesa u opštoj populaciji je značajna." | „Skoro svi imaju predijabetes!" | „Predijabetes je čest, a mnogi ljudi ne znaju da ga imaju jer često ne daje simptome." |
| 4 | „Postprandijalna hiperglikemija." | „Šećer skoči posle klope." | „Porast šećera u krvi posle obroka. Kod većine ljudi je normalan i prolazan." |
| 5 | „Indikovano je sprovođenje OGTT." | „Treba da popijete onaj slatki napitak." | „Lekar može predložiti test opterećenja glukozom (OGTT) — merenje šećera pre i dva sata posle popijenog rastvora glukoze." |
| 6 | „Visceralna adipoznost korelira sa kardiometaboličkim rizikom." | „Salo na stomaku je najgore!" | „Masno tkivo oko organa u trbuhu drugačije utiče na metabolizam nego masnoća na drugim mestima. Zato lekari mere i obim struka, ne samo telesnu masu." |
| 7 | „Bolest je multifaktorijalne etiologije." | „Za to postoji milion razloga." | „Na nastanak ovog stanja utiče više stvari zajedno — nasleđe, način života, uzrast, hormoni i još neke. Nijedna sama nije uzrok." |
| 8 | „Redukcija telesne mase od 5–10% dovodi do poboljšanja metaboličkih parametara." | „Smršajte 5 kila i sve će biti super!" | „Kod mnogih ljudi već manje smanjenje telesne mase poboljšava nalaze. Koliko je to izvodljivo i na koji način razlikuje se od osobe do osobe, i o tome je najbolje razgovarati sa lekarom." |
| 9 | „Dijagnoza se postavlja na osnovu dva odvojena merenja." | „Jedan nalaz ne znači ništa." | „Za dijagnozu je obično potrebno da povišena vrednost bude potvrđena i u drugom nalazu. Jedan rezultat je znak da treba proveriti dalje, a ne zaključak." |
| 10 | „Pacijent je asimptomatski." | „Ne osećate ništa." | „Ovo stanje često ne daje nikakve tegobe. Zato se najčešće otkrije slučajno, preko analiza." |
| 11 | „Modifikacija životnog stila je terapija prve linije." | „Promenite život!" | „Prvo što se obično preporučuje jesu promene u ishrani, kretanju i snu. To nije „samo savet" — to je deo lečenja." |
| 12 | „Genetska predispozicija." | „To je u genima, ne možete ništa." | „Ako je neko u porodici imao dijabetes tipa 2, vaša verovatnoća je veća. To nije presuda — samo znači da ima smisla ranije proveravati nalaze." |
| 13 | „Vrednosti su u referentnom opsegu." | „Sve je super!" | „Vaše vrednosti su unutar opsega koji se najčešće nalazi kod zdravih ljudi. To je dobar znak, ali se tumači zajedno sa ostalim nalazima." |
| 14 | „Hronično stanje zahteva kontinuirano praćenje." | „Ovo je doživotno." | „Ovo je stanje koje se prati kroz duže vreme, kao što se prati pritisak. Praćenje ne znači da je nešto loše — znači da se na vreme vidi ako se nešto menja." |
| 15 | „Rizik je povećan dvostruko." | „Rizik je duplo veći!" | „Rizik je otprilike dvostruko veći. Konkretno, umesto kod 2 od 100 ljudi, javlja se kod oko 4 od 100 — što i dalje znači da se kod 96 neće javiti." |
| 16 | „Neophodno je izbegavati proste ugljene hidrate." | „Zaboravite slatkiše." | „Namirnice koje se brzo razlažu do šećera brže podižu glukozu u krvi. To ne znači zabranu — količina, kombinacija sa drugom hranom i učestalost menjaju efekat." |
| 17 | „Nalaz je granično povišen." | „Malo ste iznad, ništa strašno." | „Vrednost je blago iznad opsega. To najčešće znači da treba ponoviti nalaz i pogledati ga zajedno sa ostalima — ne da je nešto sigurno u pitanju." |
| 18 | „Pacijenti sa metaboličkim sindromom imaju povećan kardiovaskularni rizik." | „Metabolički sindrom vodi u infarkt." | „Metabolički sindrom je naziv za skup nalaza koji se često javljaju zajedno — obim struka, pritisak, šećer, masnoće. Kada se jave zajedno, povećavaju rizik za srce i krvne sudove više nego svaki pojedinačno." |
| 19 | „Steatoza jetre je reverzibilna u ranim stadijumima." | „Masna jetra se lako sredi." | „Masna jetra u ranoj fazi može da se povuče, i to je važna vest. Koliko i kako, procenjuje lekar na osnovu nalaza i vaše situacije." |
| 20 | „Adherenca terapiji je ključna." | „Morate da budete disciplinovani." | „Za rezultat je važno da se dogovoreni plan sprovodi kroz duže vreme. Ako to ne ide, to je informacija za lekara — često se plan može prilagoditi, umesto da se odustane." |

### 8.5 Test poštovanja

Pre objave, jedno pitanje:

> **Da li bih ovako razgovarao sa svojom majkom, tetkom ili komšijom — a da se ona ne oseti glupo?**

Ako bi ijedna rečenica izazvala nelagodu ili osećaj prekora, menja se.

---

## 9. Formati za različite nivoe pažnje

### 9.1 Pet tipova korisnika na istoj stranici

| Tip | Koliko čita | Šta mu služi | Mora dobiti |
|---|---|---|---|
| **A — Naslov i prvi pasus** | 15 sekundi | Kratak odgovor | Tačan i potpun odgovor |
| **B — Skener podnaslova** | 1 minut | Ključne poruke, podnaslovi kao pitanja, callout blokovi | Suštinu + sledeći korak |
| **C — Gleda samo tabelu** | 30 sekundi | Tabela referentnih vrednosti, blok laboratorijskog parametra | Vrednosti + ogradu da nalaz nije dijagnoza |
| **D — Sluša** | ceo tekst | Audio verzija (v2) | Isto što i čitalac |
| **E — Traži dubinu** | 8 minuta | Ceo tekst, granice dokaza, izvori | Mehanizam + nesigurnosti + reference |

### 9.2 Kako jedna stranica služi svima bez dupliranja

**Ključ je slojevitost, ne verzije.** Ne pravimo „laku" i „stručnu" verziju istog teksta — to udvostručuje uređivački teret, stvara rizik da se verzije raziđu i deli publiku na „one koji mogu" i „one koji ne mogu".

Umesto toga, **isti tekst je organizovan tako da svaki sloj stoji samostalno**:

```
NASLOV
  └─ odgovara tipu A ako ništa drugo ne pročita

KRATAK ODGOVOR (60–90 reči)
  └─ potpun odgovor. Tip A odlazi zadovoljan.

KLJUČNE PORUKE (3–5)
  └─ tip B dobija suštinu za 20 sekundi

PODNASLOVI KAO PITANJA
  └─ tip B skenira i nalazi svoje pitanje

TABELA / BLOK PARAMETRA
  └─ tip C ide pravo ovde. Zato blok SADRŽI ogradu,
     ne oslanja se na tekst iznad.

TELO TEKSTA + GRANICE DOKAZA + IZVORI
  └─ tip E

AUDIO (v2) — čita ceo članak, uključujući ograde
VERZIJA ZA ŠTAMPU — bez navigacije i CTA blokova
PITANJA ZA LEKARA — samostalna, deljiva
```

**Najvažnije pravilo slojevitosti:** svaki sloj koji može biti pročitan samostalno **mora sadržati sopstvenu ogradu.** Tabela referentnih vrednosti izvučena iz konteksta ne sme delovati kao dijagnostički alat — zato napomena „jedan nalaz nije dijagnoza" stoji **u tabeli**, ne samo u tekstu iznad.

### 9.3 Audio verzija (v2)

Kada dođe, pravila: čita se ceo tekst uključujući ograde i disclaimer; ne preskaču se brojevi; tabele se čitaju kao rečenice („vrednost od 5,7 do 6,4 procenta ukazuje na predijabetes"), ne kao niz brojeva; na početku se kaže ko je proverio tekst i kada.

Audio je i **pristupačnost** (slab vid, disleksija) i **doseg** (sluša se u autu, u kuhinji, u šetnji) — dve stvari odjednom.

### 9.4 Verzija za štampu

Bez navigacije, bez CTA blokova, bez slika koje troše toner. Sadrži: naslov, kratak odgovor, ključne poruke, telo teksta, pitanja za lekara, izvore, datum provere i adresu sajta.

**Namena je konkretna:** osoba nosi papir kod lekara. To je najdirektnije ostvarenje misije i zaslužuje da bude urađeno dobro, a ne kao usputna funkcija.

---

## 10. Razumljivost budućeg kviza

> Faza 2. Ovde se definišu ograničenja razumljivosti; pravna i medicinska ograničenja su u dokumentu 01, sekcija 11.

### 10.1 Dvostruko ograničenje

Kviz mora biti razumljiv osobi koja ne zna medicinske termine **i** ne sme ostaviti utisak dijagnoze. Ta dva zahteva vuku na suprotne strane: što je pitanje konkretnije i razumljivije, to više liči na medicinsku anamnezu.

Rešenje: pitanja o **situaciji i ponašanju**, ne o simptomima i nalazima.

### 10.2 Pravila za pitanja

| Element | Pravilo |
|---|---|
| **Dužina pitanja** | Najviše 15 reči. Ako ne staje — pitanje je složeno i deli se. |
| **Jedna ideja po pitanju** | „Da li ste imali povišen šećer **i** povišen pritisak" su dva pitanja. |
| **Bez medicinskih termina** | „Da li vam je lekar rekao da vam je šećer u krvi bio viši nego što bi trebalo?" umesto „Da li imate hiperglikemiju?" |
| **Tipovi odgovora** | Samo jedan izbor od 2–4 ponuđena. Bez klizača, bez unosa brojeva, bez višestrukog izbora. |
| **Obavezno „Ne znam"** | Kod svakog pitanja. Bez toga ljudi nagađaju, a nagađanje kvari i rezultat i poverenje. |
| **Preskakanje** | Uvek moguće, bez objašnjenja. |
| **Zašto pitamo** | Uz svako pitanje jedna rečenica: „Pitamo zato što se kod ljudi sa ovim u porodici nalazi češće proveravaju ranije." |
| **Broj pitanja** | 7–10. Vidljiv napredak („Pitanje 3 od 8"). |

### 10.3 Rezultat bez skora rizika

**Zabranjeno:** procenat, bodovi, skala, „nizak/srednji/visok rizik", bilo šta što liči na procenu.

**Dozvoljeno:** kategorija sadržaja.

```
┌─────────────────────────────────────────────────────────┐
│  Na osnovu vaših odgovora, ovo su teme koje su          │
│  najverovatnije korisne za vašu situaciju.              │
│                                                         │
│  Ovo NIJE procena vašeg zdravlja i NIJE dijagnoza.      │
│  Kviz ne može znati kakvo je vaše zdravstveno stanje.   │
│                                                         │
│  → Razumevanje laboratorijskog nalaza                   │
│  → Šta znači porodična istorija dijabetesa              │
│  → Pitanja koja možete poneti lekaru      [Štampajte]   │
└─────────────────────────────────────────────────────────┘
```

Rečenica „Kviz ne može znati kakvo je vaše zdravstveno stanje" je namerno u prvom licu o kvizu, a ne pravna ograda — jer je **razumljivija** i **istinitija** od „ovaj alat ne predstavlja medicinski savet".

### 10.4 Hitno upozorenje unutar kviza

Ako odgovor ukaže na nešto što ne trpi odlaganje, prikazuje se **odmah**, prekida se kviz, i ne nudi se nastavak pre nego što je poruka viđena. Poruka je kratka, bez dramatizacije, i jedina radnja koju nudi je obraćanje lekaru.

### 10.5 Provera razumljivosti kviza

Kviz obavezno prolazi CMZ Clarity Test (sekcija 5) sa dodatnim pitanjem posle rezultata:

> „Šta mislite da vam je ovaj kviz rekao o vašem zdravlju?"

Ako ijedna osoba od pet odgovori nečim što liči na dijagnozu ili procenu rizika — **kviz se prepravlja pre objave.**

---

## 11. Merenje stvarnog razumevanja

### 11.1 Zašto vreme na stranici ne meri ništa

Dugo vreme na stranici može značiti da je tekst koristan — ili da je zbunjujući pa ga osoba čita triput. Bez dodatnog signala, metrika je neupotrebljiva. Zato merimo razumevanje **direktno, ali nenametljivo**, i bez ijednog zdravstvenog podatka.

### 11.2 Metode

**① Jedno anonimno pitanje na kraju članka**

```
Da li vam je ovaj tekst bio jasan?
[ Da, sve mi je jasno ]  [ Delimično ]  [ Nije mi bilo jasno ]

(ako „Delimično" ili „Nije")
Šta vam nije bilo jasno? (nije obavezno)
[ slobodan unos ]
```

Bez zvezdica, bez ocena od 1 do 5, bez traženja email-a. Odgovor je anoniman; slobodan unos se čuva samo kao tekst, bez ikakvog povezivanja sa osobom. **U uputstvu iznad polja jasno stoji da tu ne treba upisivati podatke o svom zdravlju** — i takvi unosi se brišu.

**② Test sa korisnicima** (sekcija 5) — najpouzdaniji, ali skup. Zato ciljano: pillar stranice, vodiči, forme, kviz.

**③ Analiza interne pretrage** — **najpodcenjeniji izvor uvida.** Ono što ljudi traže a ne nalaze, i ono što traže *posle* čitanja članka, direktno pokazuje šta tekst nije objasnio. Prati se mesečno.

**④ Odgovori na edukativne poruke** — peta poruka u sekvenci traži odgovor. Stvarna pitanja stvarnih ljudi su najbolji izvor za planiranje tema i za otkrivanje nesporazuma.

**⑤ Prijava nejasne formulacije** — pored „Prijavite netačnost" stoji i „Nešto vam nije jasno?". Različite stvari, oba korisna.

**⑥ Posredni signali ponašanja** — udeo onih koji otvore blok „Pitanja za lekara"; udeo onih koji ga odštampaju ili pošalju; dubina skrolovanja do sekcije „Kada razgovarati sa lekarom"; udeo klikova na pojmove iz rečnika (visok udeo = termin nije dovoljno objašnjen u tekstu).

### 11.3 Šta se meri i koji su pragovi

| Pitanje | Kako se meri | Prag za reakciju |
|---|---|---|
| Razume li ključnu poruku | Test + anonimno pitanje | > 15% odgovora „nije jasno" → revizija |
| Zna li sledeći korak | Test, pitanje 4 | 2+ od 5 ne zna → revizija |
| Razlikuje rizik od dijagnoze | Test, pitanje 3 | 2+ od 5 greši → ⛔ blokira |
| Ume da izabere pitanje za lekara | Test, posmatranje | — |
| Oseća li se mirnije | Test, pitanje 6 | 1+ uplašeniji → ⛔ blokira |
| Koje reči zbunjuju | Test + slobodan unos + rečnik-klikovi | Ista reč 2+ puta → objasniti |

### 11.4 Granica

Ne prikupljamo nijedan zdravstveni podatak (ustav, 8.4). Ne pitamo „da li imate dijabetes", ne tražimo nalaze, ne pravimo profil korisnika. Merenje razumevanja se radi **o tekstu**, ne o osobi.

---

## 12. Posebne ciljne situacije

Za svaku situaciju: emocionalno stanje, opasnost, šta radimo, šta ne radimo.

### 12.1 Osoba je upravo dobila loš nalaz

*Stanje:* akutna anksioznost, često kasno uveče, smanjena sposobnost obrade složenog teksta.
*Opasnost:* panika ili suprotno — potpuno poricanje.
**Radimo:** odgovor u prve dve rečenice; rana rečenica koja smiruje bez umanjivanja („jedan nalaz nije dijagnoza"); jasan sledeći korak; pitanja za lekara.
**Ne radimo:** ne nabrajamo komplikacije rano; ne koristimo reč „opasno"; ne tražimo email pre nego što smo pomogli.

### 12.2 Osoba godinama ima višak telesne mase i oseća krivicu

*Stanje:* iscrpljenost od pokušaja, sram, očekivanje prekora.
*Opasnost:* jedna pogrešna rečenica zatvara osobu zauvek.
**Radimo:** fiziološko objašnjenje; eksplicitna rečenica da nije stvar volje; priznanje da je teško; naglasak da postoji više uzroka.
**Ne radimo:** brojke o kilogramima; „samo"; before/after; ohrabrivanje tipa „vi to možete".

### 12.3 Osoba normalne telesne mase misli da nema rizik

*Stanje:* uverena da je se ne tiče.
*Opasnost:* propušten rani signal.
**Radimo:** objašnjavamo da telesna masa nije jedini pokazatelj (obim struka, nasleđe, nalazi); ulaz preko nalaza, ne preko mase.
**Ne radimo:** ne plašimo („i mršavi umiru od dijabetesa"); ne obesmišljavamo normalnu telesnu masu kao dobar znak.

### 12.4 Osoba ima porodičnu istoriju dijabetesa

*Stanje:* preventivna namera, ponekad fatalizam („kod nas svi to dobiju").
*Opasnost:* fatalizam vodi u nečinjenje.
**Radimo:** jasno razdvajamo faktor rizika od predodređenosti; konkretno šta ima smisla proveravati i kada.
**Ne radimo:** ne obećavamo da se sve može sprečiti; ne umanjujemo nasleđe.

### 12.5 Osoba ne zna šta da pita lekara

*Stanje:* nesigurnost, strah da će delovati neznalica ili oduzimati vreme.
**Radimo:** gotova lista pitanja za štampu i deljenje; rečenica koja normalizuje pitanje („Lekari očekuju pitanja").
**Ne radimo:** ne sugerišemo da traži određenu analizu ili terapiju; ne postavljamo lekara kao prepreku.

### 12.6 Osoba je dobila kontradiktorne informacije sa mreža

*Stanje:* zbunjenost, nepoverenje prema svemu, uključujući nas.
*Opasnost:* podsmeh je najbrži način da se izgubi ta osoba.
**Radimo:** objašnjavamo **zašto** je zabluda nastala i gde je zrno istine; pokazujemo kako se prepoznaje pouzdan izvor (nivo 3 pismenosti).
**Ne radimo:** ne ismevamo; ne imenujemo i ne napadamo pojedince; ne tvrdimo da smo mi jedini tačni.

### 12.7 Osoba teško koristi sajt ili email

*Stanje:* frustracija, sklonost da odustane bez traženja pomoći.
**Radimo:** sve iz sekcije 6; alternativa za svaku radnju (čitanje na sajtu umesto preuzimanja); vidljiv kontakt običnim rečima.
**Ne radimo:** ne uslovljavamo pristup sadržaju bilo kakvom radnjom.

### 12.8 Starija osoba sa slabijim vidom i motorikom

*Stanje:* uvećan sistemski font, sporije čitanje, manja preciznost dodira.
**Radimo:** osnovni tekst 18px i uvećanje do 200% bez lomljenja; ciljevi dodira 44–52px; visok kontrast; bez vremenskih ograničenja; verzija za štampu.
**Ne radimo:** ne oslanjamo se na prelaz mišem; ne koristimo sivi tekst na sivoj pozadini; ne stavljamo važne radnje u ugao ekrana.

### 12.9 Član porodice koji istražuje za nekog drugog

*Stanje:* traži kako da pomogne, često i kako da ubedi.
*Opasnost:* sadržaj koji naoruža za pritisak na člana porodice.
**Radimo:** priznajemo ovu ulogu („Ako čitate za nekog bliskog…"); dajemo materijal koji se može podeliti; savetujemo razgovor bez prekora.
**Ne radimo:** ne dajemo mu argumente za pritisak; ne pišemo o njegovoj bliskoj osobi kao o problemu koji treba rešiti.

---

## 13. Doseg bez gubitka kvaliteta

### 13.1 Tri stvari koje nisu iste

Ovo razdvajanje je centralna strateška poenta sekcije:

```
VELIKI DOSEG                = mnogo ljudi dolazi
VELIKI BROJ URL-ova         = mnogo stranica postoji
KVALITETNO POKRIVENA PITANJA = mnogo pitanja je stvarno odgovoreno
```

| | Kako se postiže | Naš odnos |
|---|---|---|
| **Veliki doseg** | Pokrivanjem pitanja koja mnogo ljudi zaista postavlja, odgovorima koji su najbolji dostupni | **Cilj** |
| **Veliki broj URL-ova** | Masovnom produkcijom, varijacijama iste teme | **Nije cilj i aktivno se izbegava** |
| **Kvalitetno pokrivena pitanja** | Jedno pitanje = jedna stranica = potpun odgovor | **Mera uspeha** |

Uobičajena greška je pretpostavka da drugo vodi ka prvom. Ne vodi — u YMYL niši vodi u suprotnom smeru, jer razblažuje autoritet i troši uređivački kapacitet koji je jedini pravi resurs projekta.

### 13.2 Kako se dolazi do velikog dosega bez plitkog sadržaja

**① Dubina umesto širine.** Jedan kompletan klaster (pillar + 8 tekstova + FAQ + rečnik) donosi više saobraćaja od trideset površnih tekstova o trideset tema, jer rangira za stotine varijacija pitanja unutar teme.

**② Različite ulazne tačke ka istom sadržaju.** Isti klaster se dostiže preko nalaza, simptoma, situacije, pojma iz rečnika i pitanja iz FAQ-a. Više vrata, ista soba — bez dupliranja sadržaja.

**③ Klasteri po stvarnim situacijama, ne po dijagnozama.** „Dobio sam nalaz koji ne razumem" hvata publiku koja se ne prepoznaje u terminu „metabolički sindrom". Ovo je i najbolja segmentacija i najveći doseg, bez ijedne dodatne stranice.

**④ Jednostavan jezik kao SEO prednost.** Ljudi kucaju kako govore. Tekst koji koristi svakodnevne reči prirodno se poklapa sa načinom na koji se pretražuje — bez ijedne veštački ubačene ključne reči.

**⑤ Slojevitost umesto verzija.** Ista stranica služi i onome ko čita 15 sekundi i onome ko čita 8 minuta. To udvostručuje korist bez udvostručavanja sadržaja.

**⑥ FAQ i rečnik kao mreža sitnih čvorova.** Kratka pitanja i pojmovi hvataju ogroman volumen dugorepe pretrage uz mali uređivački trošak — a svaki od njih vodi u dubok sadržaj.

### 13.3 Granica koju ne prelazimo

> **Nikada ne pravimo stranicu zato što ima volumen pretrage. Pravimo je zato što neko treba da dobije odgovor.**

Praktično: registar tema beleži i **odbijene** teme sa razlogom. Ako se ista tema odbije triput iz istog razloga, to je signal da je razlog možda pogrešan — ali odluka se donosi svesno, ne prećutno.

---

## 14. Deliverables

### 14.1 CMZ Clarity Checklist — obavezna pre objave

> Blokirajuće stavke označene ⛔. Ova lista dolazi **posle** liste iz dokumenta 03, ne umesto nje.

**Razumljivost teksta**
- [ ] ⛔ Naslov jasno govori šta korisnik dobija (C1)
- [ ] ⛔ Prve dve rečenice odgovaraju na pitanje (C2)
- [ ] ⛔ Svaki stručni termin objašnjen pri prvom pojavljivanju (C3)
- [ ] ⛔ Svaka skraćenica prvi put ima pun naziv i kratko objašnjenje (C4)
- [ ] Jedan nov koncept po pasusu (C5)
- [ ] Postoji bar jedan konkretan primer (C6)
- [ ] ⛔ Svaki broj ima jedinicu, kontekst i objašnjenje (C7)
- [ ] ⛔ Korisnik zna šta je sledeći korak (C8)
- [ ] ⛔ Tekst ne može biti shvaćen kao dijagnoza (C9)

**Pravilo dva nivoa**
- [ ] Svaki složen pojam: prvo funkcija, pa termin
- [ ] Dijagnoza objašnjena bez implicitne dijagnoze (4.4)
- [ ] Faktor rizika izričito razdvojen od dijagnoze
- [ ] Relativni rizik nikada bez apsolutnih brojeva

**Brojevi i nalazi**
- [ ] ⛔ Svaka javna brojka ima primarni izvor ili je kvalitativna (1.4)
- [ ] Nijedna oznaka `[PROVERITI IZVOR]` nije ostala u tekstu
- [ ] Rečenica „jedan nalaz nije dijagnoza" prisutna gde je relevantna
- [ ] Napomena o razlikama među laboratorijama uz svaku tabelu vrednosti
- [ ] Blok laboratorijskog parametra ima svih šest polja (7.3)

**Ton i poštovanje**
- [ ] Nijedan izraz sa liste zabranjenih (8.2)
- [ ] Nema reči „samo" uz radnju
- [ ] Nema moralizovanja ishrane ni vezivanja mase za karakter
- [ ] ⛔ Prolazi test poštovanja (8.5)

**Digitalna pristupačnost**
- [ ] ⛔ Nijedan zabranjeni digitalni izraz u vidljivom tekstu (6.3)
- [ ] ⛔ Svako dugme opisuje šta će se desiti (C10)
- [ ] Uz svaki fajl piše format, veličina i šta se dešava po kliku
- [ ] Postoji alternativa preuzimanju (čitanje na sajtu)
- [ ] Poruke o grešci običnim jezikom, sa rešenjem

**Slojevitost**
- [ ] Kratak odgovor stoji samostalno
- [ ] Tabela sadrži sopstvenu ogradu
- [ ] Pitanja za lekara samostalna i deljiva
- [ ] Verzija za štampu proverena

**Test sa ljudima** *(pillar, vodič, forma, kviz)*
- [ ] ⛔ CMZ Clarity Test sproveden na 3–5 ljudi
- [ ] ⛔ Nijedna osoba nije pomislila da ima dijagnozu
- [ ] ⛔ Nijedna osoba nije izašla uplašenija
- [ ] Nejasne reči prenete u zajedničku listu termina

### 14.2 CMZ Clarity Test Protocol

Sažetak (pun protokol u 5.3): 3–5 ljudi bez medicinskog obrazovanja, bar jedna osoba 55+, čitanje na sopstvenom telefonu, prepričavanje svojim rečima, osam pitanja, zadatak preuzimanja za vodiče i forme, evidencija bez ličnih i zdravstvenih podataka.

Uvodna rečenica je obavezna i doslovna: *„Ne testiramo vas — testiramo tekst. Ako nešto nije jasno, greška je naša."*

### 14.3 Medical Term Explanation Template

```markdown
**[Pojam — običnim rečima, šta radi]**
[1–2 rečenice o funkciji, bez stručnog termina.]

Taj [proces / parametar / stanje] se stručno zove **[termin]**
([pun naziv ako je skraćenica]).

[Ako je relevantno:] Na nalazu može pisati i kao: [varijante naziva].
[Ako je čest nesporazum:] Često se meša sa [pojam] — razlika je [X].
```

Popunjen primer:

> **Insulin** je hormon koji pomaže da šećer iz krvi uđe u ćelije i bude iskorišćen kao energija.
> Kada ćelije slabije reaguju na insulin, to stanje se stručno zove **insulinska rezistencija**.
> Često se meša sa dijabetesom — razlika je u tome što insulinska rezistencija može postojati godinama pre nego što se šećer u krvi uopšte poveća.

### 14.4 Laboratory Result Explanation Template

Šest obaveznih polja, uvek istim redom (razrada u 7.3):

```markdown
### [Naziv parametra] ([pun naziv / skraćenica])

**Šta meri:** […]
**Zašto se radi:** […]
**Kako izgleda na nalazu:** [nazivi pod kojima se javlja · jedinica · isečak nalaza]
**Šta može uticati na rezultat:** […]
**Šta ovaj nalaz sam ne može da kaže:** […]
**Šta pitati lekara:** [3 pitanja] [Štampajte]

> Referentni opsezi mogu se razlikovati između laboratorija.
> Gledajte opseg koji piše na vašem nalazu.
> Jedan nalaz nije dijagnoza.
```

### 14.5 Digital Form Clarity Checklist

- [ ] Jedan zadatak na ekranu
- [ ] ⛔ Najviše jedno polje za unos
- [ ] Oznaka polja iznad polja, ne samo unutra
- [ ] Iznad forme piše šta će se desiti posle slanja
- [ ] ⛔ Dugme opisuje radnju iz perspektive korisnika
- [ ] Tekst saglasnosti razumljiv bez pravnog rečnika
- [ ] Ispod dugmeta jedna rečenica koja uklanja strepnju
- [ ] ⛔ Greške objašnjene običnim jezikom, sa rešenjem
- [ ] Greška ne briše ono što je već uneto
- [ ] Ekran posle slanja kaže: kome je poslato, šta da se traži, šta ako ne stigne
- [ ] Postoji „Pošaljite ponovo"
- [ ] Odjava jednim klikom, bez pitanja zašto
- [ ] ⛔ Ceo tok prošao test sa 3+ osoba, uključujući jednu 55+
- [ ] Radi na telefonu sa uvećanim sistemskim fontom
- [ ] Radi na sporoj vezi

### 14.6 Lista izraza koje korisniku ne prikazujemo

Objedinjeno iz 6.3 i 8.2:

**Digitalni žargon:** submit · validation error · authentication · verify account · consent management · CTA · resource · download asset · loading · error 404 · session expired · opt-in · subscribe · dashboard · toggle · filter · accordion · modal · banner · required field · invalid input · newsletter (kao jedini naziv).

**Ponižavajuće i moralizatorske formulacije:** „samo treba…" · „nedostatak volje" · „disciplina" · „izgovori" · „loša hrana" · „greh" · „varanje" · „čista ishrana" · „naravno, svi znaju" · „mit u koji neki i dalje veruju" · „vi to možete!" · „hajde da naučimo".

**Preterivanja i strah:** šokantno · neverovatno · tajna · ubica · čudotvorno · revolucionarno · „lekari ne govore o ovome" · bilo koji rok („za 30 dana").

### 14.7 Ugradnja u Sanity CMS i QA proces

**Polja u modelu sadržaja** (dopuna dokumentu 01, sekcija 8):

| Polje | Tip | Svrha |
|---|---|---|
| `clarityChecks` | objekat sa 11 polja (✅/⚠️/⛔) | Evidencija provera C1–C11 |
| `clarityTestDone` | boolean | Da li je sproveden test sa ljudima |
| `clarityTestNotes` | tekst | Sažetak nalaza, bez ličnih podataka |
| `explainedTerms` | niz referenci na `glossaryTerm` | Koji su termini objašnjeni |
| `unverifiedClaims` | niz | Tvrdnje sa oznakom `[PROVERITI IZVOR]` |
| `readingLevelNote` | tekst | Beleška urednika, ne skor |

**Validacije koje blokiraju objavu:**

1. Tekst sadrži uglastu zagradu → blokira (hvata `[PROVERITI IZVOR]`, `[BROJ NEPOTVRĐEN]`, ostatke šablona).
2. Skraćenica velikim slovima bez punog naziva u istom pasusu → upozorenje.
3. Termin iz rečnika upotrebljen a nije u `explainedTerms` → upozorenje.
4. Broj bez jedinice u blizini → upozorenje.
5. Reč sa liste 14.6 → blokira.
6. Slika bez `alt` opisa → blokira.
7. Tip sadržaja `pillar` ili `guide` a `clarityTestDone` nije `true` → **blokira**.
8. Bilo koja blokirajuća `clarityChecks` provera na ⛔ → blokira.

**Vidljivo uredniku u studiju:** panel „Razumljivost" sa 11 provera i njihovim statusom; lista termina upotrebljenih a neobjašnjenih; upozorenje ako je tekst tipa pillar bez testa; brojač nerešenih oznaka.

**QA korak pre objave** (dopuna toku iz dokumenta 03, sekcija 7.2): posle stručne recenzije, a pre compliance provere, ubacuje se **Clarity provera** — lista 14.1 + test sa ljudima ako je sadržaj pillar, vodič, forma ili kviz.

```
… ⑥ Stručna recenzija → ⑥b CLARITY PROVERA → ⑦ Compliance → ⑧ Priprema → ⑨ Objava
```

Redosled je namerno takav: **prvo se proverava da li je tačno, pa da li je razumljivo.** Obrnut redosled vodi ka pojednostavljivanju koje kvari tačnost — što je rizik opisan u 3.3.

---

## Prilog A — Kratka verzija za AI agente

1. Ne pretpostavljaj nikakvo predznanje — ni medicinsko, ni digitalno.
2. Prvo funkcija, pa termin. Uvek tim redom.
3. Skraćenica prvi put uvek puna, uz objašnjenje.
4. Nijedan broj bez jedinice, konteksta i objašnjenja.
5. Relativni rizik nikada bez apsolutnih brojeva.
6. Faktor rizika ≠ dijagnoza. Nalaz ≠ dijagnoza. Uvek se izgovara.
7. Brojke o gojaznosti u Srbiji: **nijedna nije potvrđena.** Koristi `[PROVERITI IZVOR]` ili kvalitativnu formulaciju.
8. Ne citiraj brojku iz medijskog prenosa ni iz saopštenja — samo iz primarnog izvora.
9. Nikada digitalni žargon u vidljivom tekstu.
10. Nikada „samo", moralizovanje ishrane, vezivanje mase za karakter.
11. Jednostavnost ne sme obrisati ogradu. Ograda se prevodi, ne briše.
12. Ne pravi numerički skor razumljivosti.
13. Svaki sloj koji se čita samostalno mora imati sopstvenu ogradu.
14. Test: da li bi ovo razumela moja tetka, a da se ne oseti glupo?

## Prilog B — Šta je urađeno u okviru ovog zadatka

- Kreirana grana `docs/04-health-literacy`.
- Kreiran ovaj dokument.
- Izvršena preliminarna provera brojki „1,4 miliona" i „manje od 5%" — **nijedna nije potvrđena** (sekcija 1.2).
- **Nije** pisan produkcioni kod, nije kreiran Next.js projekat, nije postavljen CMS, nije generisana serija članaka, nisu javno korišćene neproverene brojke, nisu prikupljani zdravstveni podaci, nije napravljen dijagnostički kviz, nije mergovano u `main`.
