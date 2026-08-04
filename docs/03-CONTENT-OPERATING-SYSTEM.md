# 03 — Content Operating System

**Operativni sistem za proizvodnju sadržaja**
**Organizacija:** Edukativni studio — Centar za metaboličko zdravlje (CMZ)
**Glavni stručni urednik:** Dr Snežana Bivolarević
**Verzija:** 0.1 — nacrt za usvajanje
**Datum:** 4. avgust 2026.
**Nadređeni dokument:** `00-CMZ-OPERATING-SYSTEM.md` (ustav — u slučaju sukoba, ustav pobeđuje)

---

## Kako se koristi ovaj dokument

Ovo nije stilski priručnik za čitanje jednom. Ovo je **radni alat koji stoji otvoren dok se piše.**

| Ako radiš ovo | Idi na |
|---|---|
| Pišeš novi članak | Sekcija 2 (struktura) → Sekcija 12 (šablon) |
| Ne znaš kako da formulišeš rečenicu | Sekcija 5 (glas) |
| Objašnjavaš složen mehanizam | Sekcija 3.5 (analogije) |
| Biraš vizuelni element | Sekcija 6 (odlučivanje) |
| Radiš SEO | Sekcija 4 |
| Recenziraš tekst | Sekcija 8 (lista provere) |
| Si AI agent | Sekcija 9, pa tek onda ostalo |
| Ne znaš da li je tekst gotov | Sekcija 10 (zlatni standard) |

### Jedno pravilo iznad svih

> **Kada su SEO i kvalitet u sukobu — pobeđuje kvalitet. Uvek, bez rasprave.**
>
> SEO nije cilj nego posledica. Tekst koji je napisan za pretraživač prepoznaju i čovek i pretraživač, i obojica ga kažnjavaju. Tekst koji potpuno i pošteno odgovara na pitanje rangira zato što je najbolji odgovor, ne zato što je optimizovan.

Praktična posledica: **nikada ne dodajemo reči da bismo dostigli dužinu, ne ubacujemo ključne reči u rečenice u kojima smetaju, ne pravimo sekciju koja članku ne treba, i ne pišemo o temi samo zato što ima volumen pretrage.**

---

## Sadržaj

1. [Kako izgleda savršen CMZ članak](#1-kako-izgleda-savršen-cmz-članak)
2. [Standardna struktura članka](#2-standardna-struktura-članka)
3. [Pravila pisanja](#3-pravila-pisanja)
4. [SEO koji služi korisniku](#4-seo-koji-služi-korisniku)
5. [CMZ Writing Voice](#5-cmz-writing-voice)
6. [Vizuelna pravila sadržaja](#6-vizuelna-pravila-sadržaja)
7. [Editorial Workflow](#7-editorial-workflow)
8. [Lista provere](#8-lista-provere)
9. [AI Writing Workflow](#9-ai-writing-workflow)
10. [Zlatni standard](#10-zlatni-standard)
11. [CMZ Gold Standard Article Template](#11-cmz-gold-standard-article-template)

---

## 1. Kako izgleda savršen CMZ članak

### 1.1 Osnovna ideja

Savršen članak nije najduži, najiscrpniji ni najlepše napisan. Savršen članak je onaj koji **prati redosled pitanja koja korisnik zaista ima u glavi**, i odgovara na svako pre nego što ga postavi.

Većina zdravstvenog sadržaja ima obrnutu strukturu: kreće od definicije, ide ka mehanizmu, pa ka simptomima, i na kraju — ako uopšte — kaže šta to znači za čitaoca. To je redosled udžbenika. Osoba koja u 23h gleda nalaz ne uči gradivo; ona traži odgovor na tri pitanja, tim redom:

```
1. „Šta ovo znači?"           →  odgovor odmah, u prve dve rečenice
2. „Da li treba da brinem?"   →  smirivanje ili jasan signal, rano
3. „Šta sad da radim?"        →  konkretan sledeći korak
```

Sve ostalo — mehanizam, brojevi, nijanse, mitovi — dolazi **između**, kao potpora, i čita ga onaj ko želi dublje. Članak mora biti koristan i ako se pročita samo prvih 150 reči, i potpun ako se pročita ceo.

### 1.2 Tri sloja čitanja

Svaki članak se piše u tri sloja, jer se tako i čita:

| Sloj | Ko ga koristi | Šta mora da dobije | Gde je |
|---|---|---|---|
| **Sloj 1 — Odgovor** | ~50% čitalaca, pročita i ode | Tačan, potpun odgovor na naslovno pitanje | Prvih 150 reči |
| **Sloj 2 — Razumevanje** | ~35%, skenira podnaslove | Zašto je tako, šta to znači za njega, kada kod lekara | Podnaslovi, ključni zaključci, tabele, callout blokovi |
| **Sloj 3 — Dubina** | ~15%, čita sve | Mehanizam, nijanse, dokazi, granice znanja, izvori | Telo teksta i završne sekcije |

**Pravilo:** ako sloj 1 ne stoji sam za sebe, članak nije gotov. Ovo je istovremeno najbolja usluga korisniku i, usput, najbolja pozicija za prikaz u rezultatima pretrage i AI odgovorima — ali redosled razloga je baš taj.

### 1.3 Emocionalni luk

Iz dokumenta 02: članak vodi čitaoca od anksioznosti do osećaja kontrole. Svaka sekcija ima **psihološku funkciju**, ne samo informacionu:

```
ULAZ                     anksioznost, konfuzija, često i sram
  │
  ├─ Traka poverenja  →  „iza ovoga stoji stvarna osoba"        [orijentacija]
  ├─ Kratak odgovor   →  „dobio sam odgovor"                     [olakšanje]
  ├─ Ključne poruke   →  „razumem suštinu i bez čitanja svega"   [kontrola]
  ├─ Objašnjenje      →  „ovo se dešava u mom telu"              [razumevanje]
  ├─ Šta to znači     →  „nije do mene, ima mehanizam"           [SKIDANJE KRIVICE]
  ├─ Kada kod lekara  →  „znam granicu i znam kad je ozbiljno"   [sigurnost]
  ├─ Pitanja za lekara→  „imam nešto konkretno u ruci"           [osnaživanje]
  ├─ Greške i mitovi  →  „ne moram da verujem svemu što čujem"   [otpornost]
  └─ Izvori i potpis  →  „ovo je proverio lekar"                 [potvrda]
IZLAZ                    razumevanje + konkretan sledeći korak
```

Trenutak označen velikim slovima je srce članka. Osoba koja godinama misli da je slaba karaktera sazna da postoji fiziologija koja objašnjava zašto joj je teže. To olakšanje je ono što se pamti i deli.

### 1.4 Šta savršen članak nikada nema

- uvod koji odlaže odgovor („Metabolizam je složen proces koji…");
- rečenicu napisanu da bi se dostigla dužina;
- ključnu reč ubačenu tamo gde smeta;
- tvrdnju bez izvora;
- sigurnost veću nego što dokazi podnose;
- savet upućen konkretno čitaocu („vi treba da…");
- sekciju koja postoji samo zato što je u šablonu.

---

## 2. Standardna struktura članka

### 2.1 Zašto predložena struktura ne može biti fiksna

Predložena lista od 14 sekcija je dobra osnova, ali kao **obavezan** šablon proizvela bi lošiji sadržaj. Tri razloga:

1. **Ne treba svakom članku svaka sekcija.** Tekst „Kako se pripremiti za OGTT" nema mitove; tekst „Da li voće previše podiže šećer" je sav mit i nema šta da doda pod „najčešće greške". Prazna sekcija popunjena da bi postojala je najgora vrsta punjenja.
2. **„Najčešće greške" i „Mitovi i činjenice" se preklapaju** u velikoj meri. Dva odeljka koja govore istu stvar dvaput čine tekst rastresitim.
3. **Nedostaju dve stvari koje ustav zahteva:** sekcija o granicama znanja (dokument 00, sekcija 10.3) i **rani signal za hitno stanje** — osoba sa alarmantnim simptomom ne sme da čeka 2.000 reči da to sazna.

Zato: **jezgro koje je obavezno + moduli koji se biraju po tipu članka.**

### 2.2 Predložena struktura — jezgro i moduli

```
┌──────────────────────────────────────────────────────────────────┐
│  OBAVEZNO JEZGRO — svaki članak, ovim redom                      │
├──────────────────────────────────────────────────────────────────┤
│  0.  Naslov (H1)                                                 │
│  1.  Traka poverenja      recenzent · datum provere · vreme      │
│  2.  Kratak odgovor       60–90 reči, bez uvoda                  │
│  3.  Ključne poruke       3–5 tvrdnji                            │
│ [2b] SIGNAL ZA HITNO      ← samo kad tema to traži, ali TU       │
│  4.  Detaljno objašnjenje 2–5 podnaslova                         │
│  5.  Šta to znači za mene prevod u svakodnevni život             │
│  6.  Kada razgovarati sa lekarom                                 │
│  7.  Pitanja za vašeg lekara                                     │
│  8.  Šta se ne zna sa sigurnošću  ← kad postoji nesigurnost      │
│  9.  Česta pitanja (FAQ)  3–5                                    │
│ 10.  Povezani tekstovi                                           │
│ 11.  Izvori                                                      │
│ 12.  Autor i recenzent · datum provere · disclaimer              │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  MODULI — ubacuju se unutar sekcije 4 ili 5, po potrebi          │
├──────────────────────────────────────────────────────────────────┤
│  M1  Mitovi i činjenice        kad oko teme postoje zablude      │
│  M2  Najčešće greške           kad postoji ponašanje koje škodi  │
│  M3  Tumačenje vrednosti       kad je tema laboratorijska        │
│  M4  Korak po korak            kad je tema postupak              │
│  M5  Poređenje                 kad se dve stvari brkaju          │
│  M6  Šta kaže nauka            kad su dokazi podeljeni           │
│  M7  Kontekstualni CTA         vodič, na ~60% dužine             │
└──────────────────────────────────────────────────────────────────┘
```

**Pravilo o modulima:** modul se uključuje ako ima šta da kaže, ne ako je „lepo imati". M1 i M2 se **nikada ne koriste zajedno** — biraj onaj koji je prirodniji za temu.

### 2.3 Presetovi po tipu članka

| Tip članka | Jezgro | Moduli | Dužina |
|---|---|---|---|
| **Objašnjenje** („Kako nastaje insulinska rezistencija") | Sve | M1 ili M2 | 1.400–2.000 |
| **Tumačenje nalaza** („Šta znači povišen HbA1c") | Sve + obavezan 2b | M3, M5 | 1.200–1.800 |
| **Kako uraditi** („Kako se pripremiti za OGTT") | Sve osim 8 | M4, M2 | 900–1.400 |
| **Provera mita** („Da li voće previše podiže šećer") | Sve | M1, M6 | 1.000–1.500 |
| **Pregled dokaza** („Post i insulinska osetljivost") | Sve, 8 je obavezna i istaknuta | M6 | 1.600–2.400 |

Dužina je **opseg, ne cilj.** Tekst od 900 reči koji potpuno odgovara bolji je od 2.000 reči nategnutog sadržaja. Ako tema traži manje — piše se manje. Ako traži više — deli se na dva teksta.

### 2.4 Sekcija po sekcija — svrha, psihologija, pravila

---

**0 · NASLOV (H1)**

*Informaciona funkcija:* tačno imenuje pitanje na koje tekst odgovara.
*Psihološka funkcija:* prvi test poverenja. Naslov koji obećava previše aktivira odbranu kod publike koja je već prevarena desetak puta.

Pravila: formulisan kao pitanje ili kao čist pojam; 45–65 znakova; sadrži prirodno ono što korisnik zaista kuca u pretragu; bez uzvičnika, brojeva-mamaca („7 znakova") i senzacije. Test iz ustava: *da li bi Dr Snežana ovaj naslov mirno izgovorila pacijentu u ordinaciji?*

---

**1 · TRAKA POVERENJA**

*Informaciona:* ko je proverio, kada, koliko traje čitanje.
*Psihološka:* **najvažniji element na stranici.** Odluka o poverenju donosi se pre nego što se pročita prva rečenica. Ime lekara sa kvalifikacijom odmah ispod naslova je najjači signal koji imamo — i zato je gore, a ne na dnu kao kod skoro svih.

Sadrži: „Stručno proverila: Dr Snežana Bivolarević, spec. opšte medicine" · „Poslednja provera: [mesec godina]" · „[N] min čitanja". Kada tekst piše saradnik: „Napisao: [ime] · Stručno proverila: …". **Nikada „redakcija".**

---

**2 · KRATAK ODGOVOR**

*Informaciona:* potpun odgovor na naslovno pitanje.
*Psihološka:* olakšanje. Ovo je trenutak u kojem osoba prestaje da bude uznemirena i počinje da bude čitalac.

Pravila: **60–90 reči, prva rečenica odgovara direktno.** Bez uvoda, bez „u ovom tekstu ćemo objasniti", bez definisanja pojma pre odgovora. Mora stajati samostalno — ako se izdvoji iz članka, i dalje je tačan i potpun. Sadrži i ogradu ako je potrebna („jedan nalaz sam po sebi nije dijagnoza").

> **Primer — dobro:**
> „HbA1c pokazuje prosečan nivo glukoze u krvi tokom poslednja dva do tri meseca. Vrednost od 5,7% do 6,4% ukazuje na predijabetes, a 6,5% i više, potvrđeno u dva nalaza, obično znači dijabetes tipa 2. Jedan povišen rezultat sam po sebi nije dijagnoza — tumači se zajedno sa ostalim nalazima i vašom celokupnom slikom, što može samo lekar."
>
> **Primer — loše:**
> „Glikozilirani hemoglobin, poznatiji kao HbA1c, jedan je od najvažnijih parametara u savremenoj dijabetologiji. Da bismo razumeli njegov značaj, prvo moramo razumeti kako organizam reguliše nivo glukoze u krvi…"

---

**3 · KLJUČNE PORUKE**

*Informaciona:* 3–5 tvrdnji koje nose suštinu.
*Psihološka:* osećaj kontrole. Osoba koja skenira dobija celinu bez čitanja svega i ne oseća se izgubljeno.

Pravila: 3–5 stavki, svaka jedna rečenica od 10–20 reči, svaka nosi **tvrdnju a ne temu**. Poslednja stavka je gotovo uvek granica („Dijagnozu postavlja isključivo lekar" ili slično).

> Dobro: „HbA1c meri prosek, ne trenutno stanje — zato ga ne menja jedan obrok."
> Loše: „O značaju HbA1c."

---

**2b · SIGNAL ZA HITNO** *(uslovno, ali kad postoji — na ovom mestu)*

*Informaciona:* simptomi koji traže hitnu lekarsku pomoć.
*Psihološka:* **bezbednosna mreža.** Vrednost 1 iz ustava je bezbednost korisnika; osoba sa alarmantnim simptomom ne sme da ga sazna u 1.800. reči.

Uključuje se kod svake teme gde postoji stanje koje ne trpi odlaganje. Format: callout „Važno", kratka lista, jasna uputa da se odmah potraži lekarska pomoć. Bez dramatizacije, bez nabrajanja svega mogućeg — samo ono što stvarno traži hitnost.

---

**4 · DETALJNO OBJAŠNJENJE**

*Informaciona:* mehanizam, kontekst, brojevi, nijanse.
*Psihološka:* razumevanje. Ovde se gradi osećaj „sad mi je jasno".

Pravila: 2–5 podnaslova (H2), svaki formulisan kao pitanje; svaki podnaslov 200–400 reči; jedna ideja po pasusu, pasus do 3 rečenice; ovde se ubacuju moduli i vizuelni elementi; ovde ide kontekstualni CTA (M7) na oko 60% ukupne dužine.

---

**5 · ŠTA TO ZNAČI ZA MENE**

*Informaciona:* prevod medicinske informacije u svakodnevni život.
*Psihološka:* **skidanje krivice** — emocionalni vrhunac teksta.

Ovo je sekcija koju konkurencija najčešće nema, a koja najviše vredi. Ovde se kaže: ovo je fiziološki proces; nije stvar volje; može se menjati; evo šta se realno može očekivati.

Pravila: piše se u drugom licu množine, ali **nikada kao individualan savet.** „Za većinu ljudi to znači…" je dozvoljeno; „Vi treba da…" nije. Bez brojki o kilogramima, bez rokova, bez obećanja.

---

**6 · KADA RAZGOVARATI SA LEKAROM**

*Informaciona:* jasan prag — kada je rutinski, kada je uskoro, kada odmah.
*Psihološka:* sigurnost. Uklanja najgori oblik anksioznosti — onaj bez granice.

Format u tri nivoa: **odmah** (upućuje na hitnu pomoć) · **uskoro / u dogovorenom roku** · **na redovnoj kontroli**. Uvek konkretno, nikada „posavetujte se sa lekarom" kao prazna fraza.

---

**7 · PITANJA ZA VAŠEG LEKARA**

*Informaciona:* 3–6 konkretnih pitanja.
*Psihološka:* osnaživanje. Osoba izlazi sa nečim opipljivim u ruci.

Ovo je **potpis CMZ sadržaja** i direktno ostvarenje misije. Istovremeno je i najbezbednija moguća pozicija: ne dajemo savet, poboljšavamo konsultaciju.

Pravila: pitanja koja lekar može stvarno da odgovori; specifična za temu, ne generička; poređana po važnosti; dostupna za štampu i deljenje bez traženja email-a.

---

**8 · ŠTA SE NE ZNA SA SIGURNOŠĆU** *(kada postoji stvarna nesigurnost)*

*Informaciona:* granice dokaza.
*Psihološka:* poverenje kroz poštenje. Izvor koji zna gde prestaje njegovo znanje pouzdaniji je od izvora koji zna sve.

Sadrži: šta je otvoreno pitanje, zašto, šta to praktično znači, šta bi promenilo sliku. Obavezna kod tipa „pregled dokaza".

---

**9 · ČESTA PITANJA**

*Informaciona:* pitanja koja se javljaju **posle** čitanja.
*Psihološka:* zatvaranje otvorenih petlji.

Pravila: 3–5 pitanja, nikada preformulisan naslov; odgovor 40–80 reči; ako odgovor traži više — postaje zaseban tekst, a ovde ostaje link. Prvo pitanje otvoreno, ostala sklopljena.

---

**10 · POVEZANI TEKSTOVI**

*Psihološka:* nastavak putanje, ne kraj.

Tri teksta, birana kao **sledeći korak u razumevanju**, nikada „najčitanije". Ispod njih link ka pillar stranici klastera.

---

**11 · IZVORI**

*Psihološka:* potvrda. Većina neće otvoriti nijedan link — ali svi vide da postoje.

Pravila: primarni izvori sa godinom; sklopivo na mobilnom sa vidljivim brojem („Izvori (7)"); kod spornih tema rečenica koja objašnjava izbor izvora.

---

**12 · AUTOR, RECENZENT, DATUM, DISCLAIMER**

*Psihološka:* ponovljena potvrda na izlazu — poslednji utisak je da iza teksta stoji odgovorna osoba.

Kartica sa fotografijom, punim kvalifikacijama i linkom na profil; datum poslednje provere i sledeće planirane; medicinski disclaimer; link „Prijavite netačnost".

### 2.5 Zašto baš taj redosled

| Odluka | Obrazloženje |
|---|---|
| Recenzent **pre** teksta | Poverenje se odlučuje pre čitanja, ne posle |
| Odgovor **pre** objašnjenja | Poštovanje prema uznemirenom čoveku; udžbenički redosled služi piscu, ne čitaocu |
| Ključne poruke **posle** odgovora | Prvo se skida napetost, pa se daje mapa |
| Hitno **rano** | Bezbednost je vrednost broj 1 |
| „Šta to znači za mene" **pre** granica i pitanja | Emocionalno olakšanje pre praktičnog dela — obrnuto ne radi |
| Pitanja za lekara **pre** FAQ-a | To je akcija; FAQ je dopuna |
| Nesigurnost **pre** FAQ-a, ne na kraju | Sakrivena na dnu izgleda kao ograda; ovde izgleda kao poštenje |

---

## 3. Pravila pisanja

### 3.1 Naslov

| Pravilo | Objašnjenje |
|---|---|
| Pitanje ili čist pojam | „Šta znači povišen HbA1c" · „Insulinska rezistencija" |
| 45–65 znakova | Duži se seče u rezultatima pretrage |
| Ključni pojam na početku | Prirodno, ne nasilno |
| Bez senzacije | Nema „šokantno", „tajna", „ubica", uzvičnika |
| Bez preteranog obećanja | Naslov ne sme obećati više nego što tekst daje |
| Bez brojeva-mamaca | „7 znakova koje ne smete ignorisati" — ne |

**Test:** izgovori naslov naglas kao da ga kažeš pacijentu preko stola. Ako zvuči neprijatno — menja se.

### 3.2 Podnaslovi

Podnaslovi nose **polovinu vrednosti članka**, jer 35% čitalaca samo njih pročita.

- Formulisani kao pitanja: „Kako se tumače vrednosti?" umesto „Tumačenje vrednosti".
- Svakih 200–400 reči.
- Moraju činiti smislen niz kada se čitaju sami — to je test strukture: ako sadržaj (lista podnaslova) ne priča priču, struktura je loša.
- H2 za glavne celine, H3 za podcele. **H4 se koristi izuzetno retko** — potreba za H4 obično znači da tekst treba podeliti na dva.
- Bez podnaslova tipa „Zaključak", „Uvod", „O ovoj temi".

### 3.3 Uvod

CMZ nema klasičan uvod. **Uvod je kratak odgovor.**

Zabranjeni obrasci: „U današnje vreme sve više ljudi…", „Da bismo razumeli X, moramo prvo…", „Metabolizam je složen proces…", „U ovom tekstu ćemo objasniti…".

Razlog: svaki od njih odlaže odgovor, a osoba koja ga traži nema strpljenja. Uvod koji ne odgovara je najbrži način da se izgubi i čitalac i poverenje.

### 3.4 Zaključak

CMZ nema klasičan zaključak koji sumira. Umesto njega, tekst se završava **radnjom**: „Šta to znači za mene" → „Kada razgovarati sa lekarom" → „Pitanja za lekara".

Ako se pišu završne rečenice, one moraju dodati nešto novo — najčešće perspektivu („Insulinska rezistencija se u ranim fazama može značajno menjati, i to je najvažnija stvar koju treba znati o njoj"). Nikada prepričavanje već rečenog.

### 3.5 Kako objašnjavamo složene teme

**Princip lestvice:** od poznatog ka nepoznatom, jedan korak po jedan.

```
① Vezati za nešto što čitalac već zna
② Uvesti jedan novi pojam, odmah ga objasniti
③ Pokazati kako radi normalno
④ Pokazati šta se menja kad ne radi
⑤ Povezati sa onim što čitalac vidi kod sebe (simptom, nalaz)
```

Pravila: jedan nov pojam po pasusu, nikada dva; termin se uvodi, objašnjava, pa koristi — ne izbegava se; skraćenica se prvi put piše puno; nikada „kao što je poznato" ili „jednostavno rečeno" pa komplikovano objašnjenje.

**Test razumevanja:** može li osobu koja nema veze sa medicinom, posle čitanja jednog odeljka, prepričati suštinu svojim rečima? Ako ne — odeljak se prepisuje.

### 3.6 Analogije

Analogija je najmoćniji i najopasniji alat u medicinskom pisanju.

**Pravila:**

1. **Analogija sme da pojednostavi, ne sme da bude netačna.**
2. **Test istezanja:** ako čitalac produži analogiju sopstvenom logikom, da li dolazi do pogrešnog zaključka? Ako da — analogija se odbacuje.
3. **Jedna po članku.** Više analogija se međusobno mešaju.
4. **Uvek označena:** „može se uporediti sa", „kao kada" — nikada predstavljena kao opis stvarnog procesa.
5. **Odmah posle nje — tačna formulacija.** Analogija otvara vrata, precizan opis ulazi kroz njih.

| Analogija | Ocena |
|---|---|
| „Insulin je kao ključ koji otvara ćeliju za glukozu. Kod insulinske rezistencije ključ i dalje odgovara bravi, ali je treba jače i duže okretati — pa pankreas mora da pravi više ključeva." | **Dobra.** Tačna, izdržava istezanje, objašnjava i kompenzatornu hiperinsulinemiju |
| „HbA1c je kao prosek ocena u polugodištu — jedna petica ga ne popravi, ali stalan trud da." | **Dobra.** Prenosi i vremenski raspon i tromost parametra |
| „Telo je kao motor koji sagoreva gorivo." | **Loša.** Vodi ka zaključku da je sve stvar „sagorevanja kalorija", što je upravo pojednostavljenje koje pravi štetu |
| „Šećer je otrov za telo." | **Loša.** Netačno i zastrašujuće |
| „Masna jetra je kao začepljen filter." | **Loša.** Ne izdržava istezanje — sugeriše „čišćenje" i vodi ka detoks proizvodima |

### 3.7 Primeri

Primeri su konkretizacija, ne priča o pacijentu.

**Radimo:** hipotetički, jasno označeni („Zamislimo osobu čiji je nalaz…"); tipične situacije bez identiteta; poređenja brojeva sa objašnjenjem šta razlika znači.

**Ne radimo — nikada:** priče stvarnih ili izmišljenih pacijenata koje liče na svedočenja; „jedna naša čitateljka je…"; bilo šta što liči na uspešnu priču o lečenju.

### 3.8 Rečenice i pasusi

| Element | Pravilo |
|---|---|
| Rečenica | 15–20 reči prosečno; ispod 30 uvek |
| Pasus | Do 3 rečenice, jedna ideja |
| Glagolski oblik | **Aktiv.** „Insulin prenosi glukozu" umesto „glukoza biva prenošena insulinom" |
| Nominalizacije | Izbegavati. „Nakon vršenja procene" → „nakon procene" |
| Strane reči | Samo kad nema dobre domaće; uvek uz objašnjenje |
| Ponavljanje | Dozvoljeno kad služi jasnoći. Sinonim koji zbunjuje je gori od ponavljanja |
| Brojevi | Uvek sa jedinicom i referentnim opsegom |

### 3.9 Grafikoni, ilustracije, tabele — pravila pisanja uz njih

Vizuelni element **nikada ne stoji sam.** Uz svaki ide:

1. **Uvodna rečenica u tekstu** koja kaže šta se sada gleda.
2. **Opis ispod** koji objašnjava, a ne ponavlja naslov.
3. **`alt` opis** koji prenosi istu informaciju rečima (za čitače ekrana i kad se slika ne učita).
4. **Izvor podataka** kod grafikona i tabela sa vrednostima.

> Loše: opis „Grafikon HbA1c."
> Dobro: opis „HbA1c raste postepeno tokom više meseci, zbog čega jedan obrok ili jedan dan ne menjaju rezultat."

Detaljna pravila o tome **kada** koji vizuelni element koristiti — sekcija 6.

---

## 4. SEO koji služi korisniku

### 4.1 Načelo

> **SEO nije skup trikova nego posledica dobrog odgovora, jasne strukture i dokazane pouzdanosti.**

Sve u ovoj sekciji ima dvostruko opravdanje: pomaže korisniku **i** pomaže vidljivosti. Ako neka tehnika pomaže samo vidljivosti — ne koristimo je.

**Pravilo jednog pitanja:** jedan članak odgovara na **jedno** glavno pitanje. Dva pitanja znače dva teksta. Ovo sprečava i rastresitost i međusobno takmičenje sopstvenih stranica.

**Registar tema:** vodi se lista „pitanje → URL" i pre svakog novog teksta se proverava. Ako pitanje već ima svoju stranicu — postojeća se dopunjuje, nova se ne pravi. Dva teksta o istoj stvari štete i korisniku i vidljivosti.

### 4.2 Standard za URL

```
Format:   /teme/<klaster>/<slug-clanka>/
Primer:   /teme/laboratorijske-analize/sta-znaci-povisen-hba1c/
Pillar:   /teme/insulinska-rezistencija/
FAQ:      /pitanja/<slug-pitanja>/
Rečnik:   /recnik/<pojam>/
Vodič:    /vodici/<slug>/
```

| Pravilo | Detalj |
|---|---|
| Bez dijakritike | `sta-znaci-povisen-hba1c`, ne `šta-znači` |
| Mala slova, crtice | Bez donjih crta, bez razmaka |
| 3–6 reči | Kratko i čitljivo |
| Bez datuma, bez ID-a, bez `.html` | Sadržaj je referentan, ne hronološki |
| Bez „stop reči" kad ne nose značenje | `sta-znaci-povisen-hba1c` je bolje od `sta-znaci-ako-je-hba1c-povisen` |
| **Slug se ne menja posle objave** | Ako mora — obavezna 301 redirekcija upisana u sistem |

### 4.3 Hijerarhija naslova

| Nivo | Upotreba | Pravilo |
|---|---|---|
| **H1** | Naslov članka | **Tačno jedan** po stranici. Nikada u zaglavlju ili logu. |
| **H2** | Glavne sekcije | Formulisan kao pitanje. 4–8 po članku. |
| **H3** | Podcelina unutar H2 | Koristi se kad H2 ima 400+ reči |
| **H4** | Izuzetno retko | Potreba za H4 obično znači da tekst treba podeliti |

Zabranjeno: preskakanje nivoa (H2 → H4); korišćenje naslova radi izgleda umesto strukture; ključna reč ubačena u podnaslov gde smeta.

**Test:** izdvoji sve podnaslove u listu. Da li ta lista sama priča priču i odgovara na naslovno pitanje? Ako da — struktura je dobra, i za čoveka i za pretraživač.

### 4.4 Interno povezivanje

| Pravilo | Sprovođenje |
|---|---|
| Svaki članak → svoj pillar | Automatski (breadcrumb + traka teme) |
| 3–5 unakrsnih veza ka srodnim tekstovima | Ručno biran redosled, kao „sledeći korak u razumevanju" |
| Prvo pojavljivanje pojma → rečnik | Automatski, jednom po stranici |
| Sidreni tekst opisan | „više o tumačenju HbA1c" — nikada „kliknite ovde", nikada nasilno ponovljena ključna reč |
| Link se stavlja gde pomaže | Ne gura se gde prekida čitanje |
| Nijedan tekst bez dolazne veze | Sadržaj bez ijednog linka ka sebi je siroče — upozorenje uredniku |
| Spoljni linkovi samo ka izvorima | U fazi 1 nema nijednog komercijalnog izlaznog linka |

### 4.5 Strukturirani podaci

Pet tipova, svi generisani iz sistema, nikada ručno.

**MedicalWebPage + Article** — na svakom članku:

```json
{
  "@context": "https://schema.org",
  "@type": ["MedicalWebPage", "Article"],
  "headline": "Šta znači povišen HbA1c",
  "description": "<kratak odgovor, 60–90 reči skraćeno>",
  "inLanguage": "sr-Latn-RS",
  "datePublished": "2026-06-12",
  "dateModified": "2026-06-12",
  "lastReviewed": "2026-06-12",
  "reviewedBy": {
    "@type": "Person",
    "name": "Snežana Bivolarević",
    "honorificPrefix": "Dr",
    "jobTitle": "Specijalista opšte medicine",
    "url": "https://metabolickozdravlje.rs/strucni-recenzenti/snezana-bivolarevic/"
  },
  "author": { "@type": "Person", "name": "…" },
  "publisher": { "@id": "https://metabolickozdravlje.rs/#organization" },
  "citation": [ { "@type": "CreativeWork", "name": "…", "url": "…" } ],
  "about": { "@type": "MedicalCondition", "name": "Dijabetes tipa 2" }
}
```

`lastReviewed` i `reviewedBy` postoje upravo za medicinski sadržaj i predstavljaju eksplicitan signal kvaliteta koji domaća konkurencija gotovo nikada ne šalje.

**FAQPage** — na stranicama tipa `/pitanja/` i na člancima sa FAQ sekcijom. Sadržaj u strukturi mora biti **identičan** vidljivom tekstu na stranici. Bez pitanja koja postoje samo u kodu.

**Organization** — jednom, globalno:

```json
{
  "@type": "Organization",
  "@id": "https://metabolickozdravlje.rs/#organization",
  "name": "Edukativni studio — Centar za metaboličko zdravlje",
  "alternateName": "CMZ",
  "url": "https://metabolickozdravlje.rs",
  "founder": { "@type": "Person", "name": "Snežana Bivolarević" },
  "publishingPrinciples": "https://metabolickozdravlje.rs/urednicka-politika/"
}
```

*Napomena:* ne koristi se tip `MedicalOrganization` ni `MedicalClinic` — CMZ je edukativni studio, ne zdravstvena ustanova. Pogrešan tip u strukturi je i netačan podatak i pravni rizik.

**Person (autor i recenzent)** — sa `hasCredential`, `jobTitle`, `knowsAbout`, linkom na profil. Profilna stranica je puna biografija, ne kratka beleška.

**BreadcrumbList** — na svakoj stranici dublje od početne, usklađen sa vidljivim breadcrumb-om.

### 4.6 SEO za slike

| Element | Pravilo |
|---|---|
| Naziv fajla | Opisno, bez dijakritike: `hba1c-nastanak-dijagram.webp` |
| `alt` | **Prenosi informaciju, ne ime fajla.** Ne „dijagram insulina" nego „Insulin se vezuje za receptor i otvara ulaz glukoze u ćeliju." |
| Opis ispod | Objašnjava, ne ponavlja |
| Format | WebP/AVIF, `srcset` za više veličina |
| Dimenzije | Uvek eksplicitne (sprečava pomeranje sadržaja) |
| Učitavanje | Odloženo za sve ispod prvog ekrana |
| Ilustracije | Sopstvene, ne stock — jedinstven vizuelni sadržaj je i signal kvaliteta i izvor saobraćaja iz pretrage slika |

### 4.7 Naslov stranice i opis

**Title tag:** 50–60 znakova, ključni pojam na početku, bez naziva sajta na kraju kod dugih naslova. Može se razlikovati od H1 kada je H1 duži.

**Meta opis:** 140–155 znakova, **obećanje odgovora, ne nabrajanje ključnih reči.** Piše se kao rečenica koju bi čovek rekao.

> Dobro: „HbA1c pokazuje prosečnu glukozu za 2–3 meseca. Objašnjavamo granične vrednosti i kada je potreban razgovor sa lekarom."
> Loše: „HbA1c, glikozilirani hemoglobin, HbA1c vrednosti, HbA1c normalne vrednosti, dijabetes…"

### 4.8 E-E-A-T — kako se stvarno gradi

Za zdravstvene teme ovo je odlučujuće, i ne postiže se podešavanjem nego dokazima:

| Signal | Kako ga stvarno šaljemo |
|---|---|
| **Iskustvo** | Lekar sa gotovo 40 godina kliničke prakse, imenom i biografijom |
| **Stručnost** | Pune kvalifikacije, profilna stranica, `Person` struktura sa `hasCredential` |
| **Autoritativnost** | Dosledno pokriveni klasteri, primarni izvori, citiranost |
| **Pouzdanost** | Datum poslednje provere, uređivačka politika, javna arhiva ispravki, potpuni pravni podaci, odsustvo reklama |

Ono što **ne** radimo: ne kupujemo linkove; ne pišemo gostujuće tekstove radi linkova; ne pravimo lažne profile autora; ne generišemo članke masovno. U YMYL niši to je najbrži put do trajnog gubitka vidljivosti.

### 4.9 Vidljivost u AI odgovorima

Sve veći deo zdravstvenih pretraga završava u generisanim odgovorima. Ono što tu pomaže je **isto ono što pomaže čoveku**:

- direktan odgovor u prve dve rečenice, samostalno razumljiv;
- ključne poruke kao lista tvrdnji;
- podnaslovi formulisani kao pitanja;
- svaka tvrdnja sa izvorom koji se može navesti;
- jasno navedeni autor i recenzent;
- `llms.txt` u korenu sajta sa opisom platforme i uređivačke politike.

Meri se i pojavljivanje imena CMZ kao citiranog izvora, ručno i mesečno — ne samo klikovima.

### 4.10 Šta nikada ne radimo

Ponavljanje ključne reči preko prirodne mere · pisanje do dužine · skrivene ključne reči · naslovi-mamci · sadržaj bez recenzije · masovna generacija · programatski SEO · dva teksta o istom pitanju · struktura koja ne odgovara vidljivom sadržaju · ključna reč u `alt` opisu umesto informacije.

---

## 5. CMZ Writing Voice

### 5.1 Glas u jednoj rečenici

> **Iskusna lekarka koja ima vremena da objasni, sedi preko puta vas i nema šta da vam proda.**

### 5.2 Četiri osobine

| Osobina | Znači | Ne znači |
|---|---|---|
| **Smiren** | Bez alarma, bez hitnosti | Ne znači ravnodušan — ozbiljno stanje se imenuje ozbiljno |
| **Precizan** | Tačni termini, tačni brojevi, tačne ograde | Ne znači suvoparan |
| **Topao** | Bez krivice, sa razumevanjem za teškoću | Ne znači tepanje ni „vi to možete!" |
| **Skroman** | Priznaje granice znanja | Ne znači neodlučan — kad se zna, kaže se jasno |

### 5.3 Primeri — dobro i loše

**Kod saopštavanja neprijatne informacije**

> ✅ „Vrednost od 6,5% i više, potvrđena u dva nalaza, obično znači dijabetes tipa 2. To je stanje koje se leči i prati, a plan lečenja određuje lekar na osnovu celokupne slike."
> ❌ „Nažalost, vaš nalaz ukazuje na dijabetes — ozbiljnu bolest koja može dovesti do teških komplikacija."

*Razlika:* prva verzija daje činjenicu i odmah zatim okvir za dalje. Druga postavlja dijagnozu (što ne smemo) i plaši.

**Kod telesne mase**

> ✅ „Smanjenje telesne mase od nekoliko procenata kod mnogih ljudi poboljšava insulinsku osetljivost. Koliko je to izvodljivo i na koji način razlikuje se od osobe do osobe."
> ❌ „Već sa 5–10% manje kilograma osetićete dramatično poboljšanje! Ključ je u doslednosti."

*Razlika:* prva ne obećava i ne pripisuje odgovornost. Druga obećava rezultat i sugeriše da je stvar volje.

**Kod objašnjenja mehanizma**

> ✅ „Kod insulinske rezistencije ćelije slabije reaguju na insulin, pa pankreas luči veće količine da bi postigao isti efekat. Godinama to može funkcionisati, a zatim kapacitet pankreasa postepeno opada."
> ❌ „Vaše telo se buni protiv insulina i pankreas se iscrpljuje pokušavajući da vas spase."

*Razlika:* prva objašnjava. Druga personifikuje i dramatizuje.

**Kod nesigurnih dokaza**

> ✅ „Pojedina istraživanja ukazuju na povoljan efekat, ali su studije male i kratkotrajne. Za pouzdan zaključak potrebno je više podataka."
> ❌ „Studije su pokazale da ovaj pristup značajno poboljšava metaboličko zdravlje."

**Kod upućivanja na lekara**

> ✅ „O ovome se vredi raspitati na sledećem pregledu — posebno da li u vašem slučaju ima smisla ponoviti nalaz i kada."
> ❌ „Obavezno se posavetujte sa svojim lekarom." *(prazna fraza koja ne daje ništa)*

**Kod mita**

> ✅ „Rasprostranjeno je uverenje da voće treba izbegavati zbog šećera. Dokazi to ne potvrđuju — celo voće sadrži i vlakna koja usporavaju porast glukoze. Količina i oblik su ono što pravi razliku."
> ❌ „Mit: voće je loše. Istina: voće je super! Jedite ga slobodno."

*Razlika:* prva objašnjava zašto je zabluda nastala i gde je nijansa. Druga zamenjuje jedno pojednostavljenje drugim.

### 5.4 Zabranjene reči i konstrukcije

| Zabranjeno | Zašto |
|---|---|
| „šokantno", „neverovatno", „tajna", „ubica" | Senzacija |
| „morate", „obavezno morate" | Naređivanje; i sugeriše savet |
| „vi treba da…" | Individualni savet |
| „samo treba volje / discipline" | Pripisivanje krivice |
| „čudotvorno", „revolucionarno", „proboj" | Preterivanje |
| „dokazano je" bez pokrića | Netačan nivo sigurnosti |
| „loša hrana", „greh", „varanje" | Moralizovanje ishrane |
| „prirodno znači bezbedno" | Netačno i pravno sporno |
| „lekari ne govore o ovome" | Podriva odnos sa lekarom |
| „za samo 30 dana", bilo koji rok | Obećanje rezultata |
| „gojaznost kao posledica nezdravih navika" | Netačno pojednostavljenje |

### 5.5 Lice i obraćanje

Drugo lice množine („vaš nalaz", „možete pitati") — blisko ali sa poštovanjem. **Nikada** drugo lice u obliku saveta („vi treba da smanjite"). Prvo lice množine samo kada govorimo o sebi kao redakciji („navodimo obe smernice jer se razlikuju"). Nikada „ja".

---

## 6. Vizuelna pravila sadržaja

### 6.1 Osnovno pravilo

> **Vizuelni element mora nositi informaciju koju tekst ne prenosi jednako dobro. Ako je dekorativan — ne postoji.**

### 6.2 Tabela odlučivanja

| Ako treba prikazati… | Koristi | Ne koristi |
|---|---|---|
| Granične vrednosti, referentne opsege | **Tabela** | Grafikon, infografik |
| Mehanizam u telu | **Ilustracija** | Fotografija, tabela |
| Redosled koraka u postupku | **Dijagram toka** ili numerisana lista | Ilustracija |
| Poređenje dve stvari koje se brkaju | **Tabela sa dve kolone** | Tekst u pasusima |
| Promenu kroz vreme | **Linijski grafikon** | Tabela |
| Odnos delova celine | **Trakasti grafikon** | Pita grafikon (ljudi loše procenjuju uglove) |
| Ljudsko prisustvo, identitet | **Fotografija** | Ilustracija |
| Kritično upozorenje | **Callout „Važno"** | Boja, podebljanje |
| Nešto što menja tumačenje | **Callout „Oprez"** | Fusnota |
| Dodatni kontekst | **Callout „Informacija"** | Zagrada usred rečenice |
| Kako izgleda laboratorijski nalaz | **Anotirani prikaz nalaza** | Opis rečima |

### 6.3 Pravila po tipu

**Ilustracija (najvažniji format).** Sopstveni stil, prigušena paleta, bez gradijenata i senki, oznake na srpskom. **Mora se razumeti crno-belo** i mora imati `alt` koji prenosi istu informaciju rečima. Prioritet za fazu 1: ulazak glukoze u ćeliju; šta se menja kod insulinske rezistencije; odnos glukoze natašte, OGTT i HbA1c; putanja od insulinske rezistencije do dijabetesa tipa 2, sa naglaskom da je u ranim fazama promenljiva.

**Tabela.** Najvažniji podatkovni format na sajtu. Bez vertikalnih linija; brojevi desno poravnati; zaglavlje lepljivo kod dugih tabela; na mobilnom se tabela sa 3+ kolone pretvara u kartice, nikada horizontalno skrolovanje. Kod referentnih vrednosti **obavezna napomena** da se opsezi mogu razlikovati između laboratorija.

**Grafikon.** Bez 3D, bez senki, bez pozadinske mreže osim tanke horizontalne. Y-osa **uvek počinje od nule** kod poređenja. Izvor podataka ispod. Bez pita grafikona.

**Fotografija.** Retko. Samo za ljudsko prisustvo. Stvarni ljudi, realna okruženja, raznolika telesna građa. **Nikada „isečena glava"** — fotografija gojazne osobe bez lica dehumanizuje i ne koristi se nikada. Nikada stock scene sa centimetrom, vagom ili tanjirom salate.

**Infografik.** Najređe. Koristi se samo kad povezuje 3+ informacije u celinu koju tekst ne može prikazati linearno. Mora biti čitljiv na mobilnom u punoj širini — infografik koji traži zumiranje je promašen.

**Callout.** Četiri tipa (Informacija, Oprez, Važno, Pitanja za lekara). **Maksimalno dva po članku**, inače gube efekat. Bez crvene boje, bez uzvičnika u trouglu.

**Upozorenje o hitnom stanju.** Callout „Važno", postavljen **rano** (sekcija 2b), kratak, bez dramatizacije, sa jasnom uputom da se odmah potraži lekarska pomoć.

### 6.4 Koliko vizuelnih elemenata

| Dužina članka | Vizuelnih elemenata |
|---|---|
| Do 1.200 reči | 1–2 |
| 1.200–2.000 | 2–4 |
| Preko 2.000 | 3–5 |

Više od toga rastura pažnju. Manje od jednog kod objašnjenja mehanizma znači da nešto nije objašnjeno dovoljno dobro.

---

## 7. Editorial Workflow

### 7.1 Uloge

| Uloga | Odgovornost |
|---|---|
| **Vlasnik projekta** | Poslovne odluke, prioriteti, odobrenje objave platforme |
| **Stručni urednik (Dr Snežana)** | Medicinska tačnost. **Apsolutan veto.** Potpis je uslov objave. |
| **Urednik sadržaja** | Struktura, ton, jasnoća, doslednost, plan tema |
| **Pisac** | Istraživanje i pisanje po ovom dokumentu |
| **AI agent** | Podrška u svim koracima osim medicinske odluke (sekcija 9) |
| **Pravni savetnik** | Osetljive teme (lekovi, terapije, komercijalne veze) |

### 7.2 Tok

```
① IDEJA
   Izvori: pitanja korisnika · interna pretraga · klinička praksa ·
   analiza pretrage · praznine u klasteru
   Radi: urednik sadržaja (+ AI)
        ↓
   ⛔ KAPIJA 1 — Test misije i registar tema
      Pomaže li osobi da vodi bolji razgovor sa lekarom?
      Postoji li već stranica za ovo pitanje?
        ↓
② BRIEF
   Pitanje · tip članka · preset sekcija · persona · klaster ·
   veze · vizuelni elementi · vodič za CTA
   Radi: urednik sadržaja (+ AI)
        ↓
③ ISTRAŽIVANJE
   Primarni izvori po hijerarhiji iz ustava (sekcija 9.2).
   Svaki izvor OTVOREN i PROČITAN.
   Radi: pisac / AI  →  ⛔ svaki izvor mora biti proveren
        ↓
④ NACRT
   Po šablonu iz sekcije 11.
   Radi: pisac / AI
        ↓
⑤ UREĐIVANJE
   Struktura, ton, jasnoća, dužina, vizuelni elementi
   Radi: urednik sadržaja
        ↓
⑥ STRUČNA RECENZIJA
   Tačnost · usklađenost sa smernicama · nivo sigurnosti u jeziku ·
   odsustvo navođenja na samolečenje · bezbednost formulacija
   Radi: Dr Snežana
        ↓
   ⛔ KAPIJA 2 — POTPIS. Bez njega nema objave. Bez izuzetka.
        ↓
⑦ COMPLIANCE PROVERA
   Lista iz sekcije 8 + dokument 04
   Radi: urednik sadržaja
        ↓
   ⛔ KAPIJA 3 — Ako tekst dodiruje lekove ili terapije:
      PRAVNI PREGLED je obavezan
        ↓
⑧ PRIPREMA ZA OBJAVU
   Struktura podataka · interne veze · slike sa alt opisom ·
   title i meta opis · datumi provere
        ↓
⑨ OBJAVA
        ↓
⑩ ODRŽAVANJE
   Ponovna provera na 18 meseci ili ranije uz promenu smernica
```

### 7.3 Šta blokira objavu

Bilo šta od sledećeg zaustavlja objavu, bez obzira na rok:

1. Nema potpisa stručnog urednika.
2. Tvrdnja bez proverenog izvora.
3. Izvor koji nije otvoren i pročitan.
4. Nivo sigurnosti u jeziku veći od nivoa dokaza.
5. Individualni savet, dijagnoza ili doza bilo gde u tekstu.
6. Formulacija koja može navesti na odlaganje lekara, prekid terapije ili samolečenje.
7. Ime leka u kontekstu koji podstiče upotrebu.
8. Nedostaje `alt` opis na bilo kojoj slici.
9. Tekst dodiruje lekove, a nema pravni pregled.
10. Nedostaje datum poslednje provere ili podaci o autoru i recenzentu.

**Rok nije razlog za izuzetak.** Iz ustava: rok nije vrednost.

### 7.4 Održavanje objavljenog

| Okidač | Radnja |
|---|---|
| Prošlo 18 meseci | Obavezna ponovna provera; do tada se vidi datum poslednje provere |
| Promena smernice | Hitna provera svih tekstova koje dodiruje |
| Prijava netačnosti | Odgovor u roku od 7 dana |
| Suštinska ispravka | Vidljiva beleška na dnu sa datumom + unos u javnu arhivu ispravki |
| Pravopisna ispravka | Bez beleške |

---

## 8. Lista provere

> Svaki članak prolazi ovu listu pre objave. **Blokirajuće stavke su označene ⛔ — jedno „ne" znači da tekst nije spreman.**

### A · Suština i bezbednost

- [ ] ⛔ Prolazi test misije: pomaže osobi da vodi bolji razgovor sa lekarem
- [ ] ⛔ Nigde nema individualnog saveta („vi treba da…")
- [ ] ⛔ Nigde nema dijagnoze ni sugestije dijagnoze
- [ ] ⛔ Nigde nema doze, preporuke terapije ni saveta o prekidu
- [ ] ⛔ Ništa ne može navesti na odlaganje lekara ni samolečenje
- [ ] ⛔ Ako tema to traži — signal za hitno stanje postoji i postavljen je rano
- [ ] ⛔ Ime leka se ne pojavljuje u kontekstu koji podstiče upotrebu
- [ ] Sekcija „Kada razgovarati sa lekarom" ima tri jasna nivoa

### B · Tačnost i izvori

- [ ] ⛔ Svaka tvrdnja koja nije opšte poznata ima izvor
- [ ] ⛔ Svaki izvor je otvoren i pročitan, i kaže tačno ono što tvrdimo
- [ ] ⛔ Svaki broj prepisan iz primarnog izvora, ne iz sećanja ni iz drugog teksta
- [ ] ⛔ Nivo sigurnosti u jeziku odgovara nivou dokaza (lestvica iz ustava, 10.2)
- [ ] Proveren datum i važeća verzija svake smernice
- [ ] Proverena populacija na koju se rezultat odnosi
- [ ] Namerno potražen suprotan dokaz; ako postoji — naveden
- [ ] Kod referentnih vrednosti stoji napomena o razlikama među laboratorijama
- [ ] Sekcija „Šta se ne zna sa sigurnošću" postoji ako postoji stvarna nesigurnost

### C · Struktura

- [ ] Kratak odgovor stoji samostalno i potpun je (60–90 reči)
- [ ] Prva rečenica odgovara direktno, bez uvoda
- [ ] 3–5 ključnih poruka, svaka nosi tvrdnju
- [ ] Podnaslovi formulisani kao pitanja
- [ ] Lista podnaslova, čitana sama, priča smislenu priču
- [ ] Sekcija „Šta to znači za mene" postoji i skida krivicu
- [ ] 3–6 konkretnih pitanja za lekara
- [ ] 3–5 FAQ pitanja koja nisu preformulisan naslov
- [ ] Nema sekcije koja postoji samo zato što je u šablonu

### D · Jezik i ton

- [ ] Nijedna reč sa liste zabranjenih (5.4)
- [ ] Nema straha, sramote, obećanja ni senzacije
- [ ] Prosečna rečenica 15–20 reči, nijedna preko 30
- [ ] Pasusi do 3 rečenice
- [ ] Aktiv umesto pasiva
- [ ] Najviše jedna analogija, i prolazi test istezanja
- [ ] Nema priča o pacijentima ni bilo čega nalik svedočenju
- [ ] ⛔ Naslov prolazi test „da li bi ovo Dr Snežana mirno rekla pacijentu"

### E · Vizuelno

- [ ] Svaki vizuelni element nosi informaciju koju tekst ne prenosi jednako dobro
- [ ] ⛔ Svaka slika ima `alt` koji prenosi informaciju, ne naziv
- [ ] Uz svaki element ide uvodna rečenica u tekstu i opis ispod
- [ ] Grafikoni i tabele sa vrednostima imaju naveden izvor
- [ ] Ilustracije razumljive crno-belo
- [ ] Tabele sa 3+ kolone imaju mobilnu verziju u karticama
- [ ] Najviše dva callout bloka
- [ ] Nema fotografije koja dehumanizuje

### F · SEO

- [ ] Jedan članak = jedno glavno pitanje
- [ ] Provereno u registru tema da stranica za ovo pitanje ne postoji
- [ ] URL po standardu, bez dijakritike, neće se menjati
- [ ] Tačno jedan H1; nema preskakanja nivoa
- [ ] Title 50–60 znakova; meta opis 140–155, kao rečenica
- [ ] 3–5 internih veza sa opisnim sidrenim tekstom
- [ ] Veza ka pillar stranici klastera
- [ ] Struktura podataka generisana i usklađena sa vidljivim sadržajem
- [ ] Nijedna ključna reč ubačena tamo gde smeta

### G · Formalno

- [ ] ⛔ Potpis stručnog urednika
- [ ] ⛔ Datum poslednje provere i sledeće planirane
- [ ] Autor i recenzent vidljivi na vrhu i na dnu
- [ ] Medicinski disclaimer
- [ ] Link „Prijavite netačnost"
- [ ] ⛔ Ako tekst dodiruje lekove ili terapije — pravni pregled obavljen

### H · Poslednja provera (deset pitanja iz ustava)

- [ ] Da li bih ovaj tekst napisao identično da ne postoji nijedan komercijalni interes?
- [ ] Da li bi lekar koji ovo pročita mogao mirno da ga preporuči pacijentu?

---

## 9. AI Writing Workflow

> Ova sekcija razrađuje sekcije 7 i 8 ustava. U slučaju sukoba — ustav pobeđuje.

### 9.1 Podela odgovornosti

```
AI RADI                          ČOVEK ODLUČUJE
───────────────────────────      ─────────────────────────────
istraživanje i mapiranje         da li je izvor verodostojan
predlog strukture                da li je tvrdnja tačna
nacrt teksta                     da li je nivo sigurnosti ispravan
jezičko uređivanje               da li je formulacija bezbedna
provera protiv liste             POTPIS I OBJAVA
traženje slabih mesta
```

**Granica je jasna:** AI ne donosi nijednu odluku koja nosi medicinsku odgovornost. Ne zato što je nesposoban da napiše tačnu rečenicu, nego zato što **odgovornost mora nositi imenovana osoba sa licencom**, a alat ne može nositi odgovornost.

### 9.2 Korak po korak

**① Istraživanje**
AI traži i sažima primarne izvore, mapira šta smernice kažu, pronalazi gde se razlikuju, označava šta nije uspeo da potvrdi.
*Obaveza:* svaki izvor se navodi sa linkom. Izvor koji nije stvarno pronađen i pročitan — **ne postoji**. Piše se `[IZVOR NEDOSTAJE]`.
*Ljudska provera:* urednik ili stručni urednik otvara **svaki** izvor.

**② Brief**
AI predlaže tip članka, preset sekcija, personu, veze, vizuelne elemente.
*Ljudska provera:* urednik potvrđuje ili menja.

**③ Nacrt**
AI piše po šablonu iz sekcije 11.
*Obaveze u nacrtu:*
- svaka tvrdnja nosi oznaku izvora u zagradi `[1]`, `[2]`;
- svaka nesigurnost nosi `[PROVERITI]`;
- svaka tvrdnja u koju AI nije potpuno siguran nosi `[NISKA SIGURNOST]`;
- brojevi koje nije uspeo da potvrdi u primarnom izvoru nose `[BROJ NEPOTVRĐEN]`;
- razdvaja se šta izvor kaže od onoga što AI zaključuje.

**④ Samoprovera**
AI prolazi listu iz sekcije 8 na sopstvenom tekstu i **izveštava šta nije prošlo**, umesto da to prećuti ili tiho popravi.

**⑤ Uređivanje**
AI pomaže sa jasnoćom, dužinom, tonom, doslednošću. Ne dodaje nove tvrdnje u ovoj fazi.

**⑥ Stručna recenzija**
Isključivo čovek. AI može pripremiti **listu tvrdnji za proveru** — izvučene tvrdnje sa izvorima, da recenzent ne mora da ih traži po tekstu. Ovo najviše štedi vreme stručnom uredniku i najveća je praktična vrednost AI-ja u celom procesu.

**⑦ Finalna validacija**
Vidi 9.4.

### 9.3 Oznake u radnom tekstu

| Oznaka | Značenje | Ko je uklanja |
|---|---|---|
| `[1]`, `[2]` | Veza ka izvoru | Ostaje, prelazi u reference |
| `[PROVERITI]` | Nesigurna tvrdnja | Stručni urednik |
| `[NISKA SIGURNOST]` | AI nije siguran | Stručni urednik |
| `[BROJ NEPOTVRĐEN]` | Broj nije nađen u primarnom izvoru | Stručni urednik |
| `[IZVOR NEDOSTAJE]` | Izvor nije pronađen | Stručni urednik |
| `[PRAVNI PREGLED]` | Dodiruje lekove ili terapije | Pravni savetnik |

**Nijedna oznaka ne sme ostati u objavljenom tekstu.** Automatska provera pred objavu traži uglaste zagrade i blokira objavu ako ih nađe.

### 9.4 Finalna validacija

Pre nego što tekst uđe u objavu, prolazi četiri nezavisna prolaza. **Nijedan ne radi AI sam.**

| Prolaz | Ko | Šta traži |
|---|---|---|
| **1 — Tačnost** | Stručni urednik | Svaka tvrdnja tačna, svaki izvor potvrđen, svaki broj proveren |
| **2 — Bezbednost** | Stručni urednik | Ništa ne navodi na odlaganje lekara, samolečenje ili prekid terapije |
| **3 — Usklađenost** | Urednik sadržaja | Lista iz sekcije 8, ton, zabranjene formulacije, oznake uklonjene |
| **4 — Pravni** | Pravni savetnik | Samo kod tekstova koji dodiruju lekove, terapije ili komercijalne veze |

### 9.5 Poznate zamke i kako ih hvatamo

| Zamka | Kako se ispoljava | Kontrola |
|---|---|---|
| **Izmišljen izvor** | Uverljivo formatirana referenca koja ne postoji | Svaki link se otvara ručno. Bez izuzetka. |
| **Izvor postoji, ali ne kaže to** | „Povezano je sa" postaje „dovodi do" | Prolaz 1 poredi tvrdnju sa originalnim tekstom |
| **Zastarela smernica** | Model zna staru verziju | Provera godine izdanja svake smernice |
| **Uverljiva greška** | Netačnost napisana savršenim tonom | Zato postoji stručna recenzija — ton nije dokaz tačnosti |
| **Klizanje u marketinški registar** | Postepeno pojačavanje, superlativi | Prolaz 3, lista zabranjenih reči |
| **Preterana sigurnost** | Nijansirano pitanje dobija kategoričan odgovor | Jezička lestvica, obavezna |
| **Popuštanje pod insistiranjem** | Odgovor se menja kad se zahtev ponovi | Pravilo iz ustava: ponovljen zahtev ne menja odgovor |
| **Gubitak pravila u dugom radu** | Kroz dugu sesiju se zaboravlja | Ustav i ovaj dokument se ponovo čitaju pri svakom većem zadatku |

### 9.6 Šta AI nikada ne radi u proizvodnji sadržaja

Ne objavljuje · ne potpisuje · ne odlučuje o medicinskoj tačnosti · ne izmišlja izvor ni broj · ne uklanja sopstvenu oznaku nesigurnosti · ne piše o lekovima bez ljudske potvrde · ne menja odgovor kad se zahtev ponovi · ne pretpostavlja da je ranija dozvola trajna.

### 9.7 Transparentnost

Prema preporuci iz ustava (7.6), u uređivačkoj politici stoji: *„U pripremi i uređivanju tekstova koristimo i AI alate. Svaku medicinsku tvrdnju proverava i potpisuje lekar. Odgovornost za sadržaj nosi imenovani stručni urednik, ne alat."*

---

## 10. Zlatni standard

### 10.1 Definicija

> **Zlatni standard je članak koji lekar može bez ustručavanja poslati svom pacijentu — jer mu štedi vreme, ne protivreči ničemu što je rekao i vraća pacijenta njemu sa boljim pitanjima.**

To je najviši mogući standard u ovoj oblasti, i on je istovremeno i najbolji SEO, i najbolji marketing, i najbolja etika — što nije slučajnost nego posledica toga što su sva tri u dugom roku ista stvar.

### 10.2 Pet uslova

**1 — Lekar ne bi morao ništa da ispravi.**
Nijedna tvrdnja nije netačna, preterana ni zastarela. Nivo sigurnosti u jeziku odgovara nivou dokaza. Sve se poziva na izvore koje lekar prepoznaje.

**2 — Ne podriva odnos pacijenta i lekara.**
Nigde ne sugeriše da lekar nije potreban, da nešto „kriju" ili da se odluka može doneti bez njega. Naprotiv — svaka putanja vodi ka boljem razgovoru.

**3 — Štedi lekaru vreme.**
Objašnjava ono što lekar inače objašnjava u pet minuta koje nema. Pacijent dolazi sa razumevanjem osnove i sa konkretnim pitanjima umesto sa strahom i tuđim tvrdnjama sa interneta.

**4 — Ne obećava i ne plaši.**
Nijednog obećanja rezultata, nijedne brojke o kilogramima, nijednog roka. Nijednog straha, nijedne krivice. Ozbiljno stanje se imenuje ozbiljno, ali bez dramatizacije.

**5 — Iza njega stoji imenovana osoba.**
Autor, recenzent, kvalifikacije, datum provere, izvori, mogućnost prijave netačnosti.

### 10.3 Praktičan test

Pre objave, tri pitanja — sva tri moraju dobiti „da":

```
① TEST ORDINACIJE
   Da li bi Dr Snežana ovaj tekst poslala svom pacijentu?

② TEST KOLEGE
   Da li bi ga poslala kolegi endokrinologu bez ograde
   „izvini na pojednostavljenjima"?

③ TEST DESET GODINA
   Da li bi nam bilo neprijatno zbog ijedne rečenice
   kada je pročitamo za deset godina?
```

Test ③ je najstroži i najkorisniji. Ono što se piše zbog trenutnog trenda, trenutnog algoritma ili trenutne prilike gotovo uvek pada na njemu.

### 10.4 Zašto je ovo istovremeno i najbolji SEO

Nije potreban kompromis, jer se zahtevi poklapaju:

| Zlatni standard traži | Vidljivost nagrađuje |
|---|---|
| Direktan, potpun odgovor odmah | Sadržaj koji zadovoljava nameru |
| Jasna struktura sa pitanjima kao podnaslovima | Razumljivu strukturu i mogućnost izdvajanja odgovora |
| Imenovanog autora i recenzenta sa kvalifikacijama | E-E-A-T signale |
| Primarne izvore | Dokaz pouzdanosti |
| Datum provere i održavanje | Svežinu sadržaja |
| Dubinu klastera umesto širine | Tematski autoritet |
| Odsustvo preterivanja | Manje signala niskog kvaliteta |

Zato u ovom dokumentu ne postoji nijedna „SEO tehnika" koja nije istovremeno usluga čitaocu. Kada bi takva postojala, ne bismo je koristili.

---

## 11. CMZ Gold Standard Article Template

> **Jedini šablon koji se koristi za sve buduće članke.**
> Uputstva u uglastim zagradama se brišu pre objave. Automatska provera blokira objavu ako u tekstu ostane ijedna uglasta zagrada.

```markdown
---
# META (u CMS-u, ne u telu teksta)
tip_clanka:        [objašnjenje | tumačenje nalaza | kako uraditi | provera mita | pregled dokaza]
klaster:           [naziv klastera]
glavno_pitanje:    [jedno pitanje na koje tekst odgovara]
persona:           [S1–S6]
funnel:            [TOFU | MOFU | BOFU]
nivo_kontrole:     [standardno | povišeno | osetljivo]
url:               /teme/[klaster]/[slug]/
title_tag:         [50–60 znakova]
meta_opis:         [140–155 znakova, kao rečenica, obećanje odgovora]
primarni_vodic:    [koji vodič ide u CTA blok]
povezani_tekstovi: [3 sluga]
sledeca_provera:   [datum + 18 meseci]
---

# [Naslov — pitanje ili čist pojam, 45–65 znakova]

> ✔ Stručno proverila: Dr Snežana Bivolarević, spec. opšte medicine
> Poslednja provera: [mesec godina] · [N] min čitanja
> [Ako postoji zaseban pisac: Napisao: [ime] · Stručno proverila: …]

[KRATAK ODGOVOR — 60–90 reči. Prva rečenica odgovara direktno, bez uvoda.
Mora stajati samostalno. Sadrži ogradu ako je potrebna.]

## Ključno

- [Tvrdnja, 10–20 reči]
- [Tvrdnja]
- [Tvrdnja]
- [Opciono: tvrdnja]
- [Poslednja stavka je gotovo uvek granica — npr. „Dijagnozu postavlja isključivo lekar."]

[SIGNAL ZA HITNO — samo ako tema to traži. Callout „Važno", kratka lista
simptoma koji ne trpe odlaganje + jasna uputa da se odmah potraži pomoć.
Bez dramatizacije. POSTAVLJA SE OVDE, NE NA KRAJU.]

## [Podnaslov kao pitanje — npr. „Šta HbA1c zapravo meri?"]

[200–400 reči. Pasusi do 3 rečenice. Jedan nov pojam po pasusu.
Tvrdnje sa oznakom izvora [1].]

[VIZUELNI ELEMENT — ilustracija / tabela / dijagram.
Uvodna rečenica u tekstu + opis ispod + alt opis + izvor podataka.]

## [Podnaslov kao pitanje]

[…]

[MODUL po potrebi: M1 Mitovi i činjenice · M2 Najčešće greške ·
M3 Tumačenje vrednosti · M4 Korak po korak · M5 Poređenje ·
M6 Šta kaže nauka. NIKADA M1 i M2 zajedno.]

[KONTEKSTUALNI CTA — na oko 60% ukupne dužine.
Naslov vodiča · tri konkretne stavke · dugme ·
„Bez reklama. Odjava u jednom kliku."]

## [Podnaslov kao pitanje]

[…]

## Šta to znači za vas

[Prevod u svakodnevni život. EMOCIONALNI VRHUNAC TEKSTA — ovde se skida krivica.
„Za većinu ljudi to znači…" je dozvoljeno. „Vi treba da…" NIJE.
Bez brojki o kilogramima, bez rokova, bez obećanja.]

## Kada razgovarati sa lekarom

**Odmah:** [stanja koja ne trpe odlaganje — upućivanje na hitnu pomoć]
**Uskoro:** [u dogovorenom roku, konkretno]
**Na redovnoj kontroli:** [rutinsko praćenje]

## Pitanja za vašeg lekara

1. [Konkretno pitanje na koje lekar može odgovoriti]
2. […]
3. […]
[3–6 pitanja, poređana po važnosti. Dostupno za štampu i deljenje.]

## Šta se ne zna sa sigurnošću

[Samo ako postoji stvarna nesigurnost — a kod tipa „pregled dokaza" je obavezno.
Šta je otvoreno pitanje · zašto · šta to praktično znači · šta bi promenilo sliku.]

## Česta pitanja

**[Pitanje koje se javlja POSLE čitanja, ne preformulisan naslov]**
[40–80 reči. Ako traži više — postaje zaseban tekst, ovde ostaje link.]

**[Pitanje]**
[…]

[3–5 pitanja. Prvo otvoreno, ostala sklopljena.]

## Povezani tekstovi

- [Sledeći korak u razumevanju — ne „najčitanije"]
- […]
- […]

→ [Pregled svih tekstova u temi: [klaster]]

## Izvori

1. [Institucija. Naslov. Godina.] ↗
2. […]

[Kod spornih tema: rečenica koja objašnjava izbor izvora —
npr. „Navodimo i ADA i EASD jer se u ovoj preporuci razlikuju."]

---

[KARTICA AUTORA I RECENZENTA]
Dr Snežana Bivolarević — specijalista opšte medicine, subspecijalista
bolesti zavisnosti. Gotovo 40 godina kliničke prakse. Osnivač i glavni
stručni urednik Edukativnog studija — Centra za metaboličko zdravlje (CMZ).
[Ceo profil →]

Poslednja stručna provera: [datum] · Sledeća planirana: [datum]

Ovaj tekst je edukativan i ne zamenjuje pregled, dijagnozu ni terapiju
koju određuje vaš lekar.

[Prijavite netačnost →]
```

### 11.1 Kako se šablon koristi

1. Otvori šablon i **odmah izbriši sekcije koje ovom tipu članka ne trebaju** (presetovi, sekcija 2.3). Prazna sekcija je gora od sekcije koje nema.
2. Napiši **kratak odgovor prvi**, pre svega ostalog. Ako ne možeš da ga napišeš u 90 reči, ne razumeš temu dovoljno da bi pisao članak.
3. Napiši podnaslove pre tela teksta. Pročitaj ih kao listu — ako ne pričaju priču, struktura je loša.
4. Piši telo teksta uz otvorene izvore. Nijedan broj iz sećanja.
5. Prođi listu iz sekcije 8. Sam.
6. Predaj na stručnu recenziju sa **listom tvrdnji za proveru**, ne samo sa tekstom.
7. Ništa se ne objavljuje bez potpisa.

---

## Prilog A — Kratka verzija za AI agente

1. Prvo ustav (`00`), pa ovaj dokument, pa zadatak.
2. Kvalitet pobeđuje SEO. Uvek.
3. Kratak odgovor prvi, 60–90 reči, bez uvoda, stoji samostalno.
4. Jedan članak = jedno pitanje. Proveri registar tema.
5. Izvor koji nisi otvorio — **ne postoji**. `[IZVOR NEDOSTAJE]`.
6. Broj iz sećanja se **ne piše**. `[BROJ NEPOTVRĐEN]`.
7. Kad nisi siguran u nivo dokaza — spusti nivo.
8. Nikada: individualni savet, dijagnoza, doza, terapija, obećanje, strah, sramota.
9. Analogija — najviše jedna, mora izdržati test istezanja.
10. Nijedna sekcija ne postoji samo zato što je u šablonu.
11. Oznake u uglastim zagradama uklanja **čovek**, ne ti.
12. Ne objavljuješ, ne potpisuješ, ne odlučuješ o medicinskoj tačnosti.
13. Ponovljen zahtev ne menja odgovor.
14. Test: da li bi lekar ovo mirno poslao svom pacijentu?

## Prilog B — Šta je urađeno u okviru ovog zadatka

- Kreirana grana `docs/03-content-operating-system`.
- Kreiran ovaj dokument.
- **Nije** pisan kod, nije kreiran projekat, nije postavljen CMS, nije napisan nijedan članak, nije objavljen medicinski sadržaj, nije pokrenut deployment, nije mergovano u `main`.

## Prilog C — Odluke koje čekaju vlasnika

1. **Potvrda strukture jezgro + moduli** (sekcija 2) umesto fiksnih 14 sekcija.
2. **Potvrda da se M1 i M2 ne koriste zajedno** — spajanje „mitova" i „najčešćih grešaka" u jedan modul po članku.
3. **Signal za hitno stanje ide rano, ne na kraj** (2b) — potvrda ovog rasporeda.
4. **Registar tema** — ko ga vodi i gde stoji (predlog: tabela u CMS-u).
5. **Ko je urednik sadržaja** — uloga postoji u toku rada, osoba još nije određena.
6. **Prvi članak za probu šablona** — predlog: „Šta znači povišen HbA1c" iz klastera laboratorijskih analiza.
