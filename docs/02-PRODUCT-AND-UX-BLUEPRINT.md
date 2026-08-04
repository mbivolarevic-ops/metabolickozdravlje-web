# 02 — Product & UX Blueprint

**Projekat:** metabolickozdravlje.rs
**Organizacija:** Edukativni studio — Centar za metaboličko zdravlje (CMZ)
**Glavni stručni urednik i osnivač:** Dr Snežana Bivolarević, specijalista opšte medicine, subspecijalista bolesti zavisnosti
**Verzija:** 0.1 — nacrt za pregled
**Datum:** 4. avgust 2026.
**Prethodni dokument:** `01-DISCOVERY-AND-ARCHITECTURE.md`
**Grana:** `docs/02-product-and-ux-blueprint`

> **Status.** Ovo je proizvodni i UX nacrt, ne implementacija. Nije pisan produkcioni kod, nije kreiran Next.js projekat, nisu generisane stranice, nije postavljen CMS. Sve što je označeno **[ODLUKA]** čeka vlasnika projekta.

> **Strateški okvir za prvih 6–12 meseci.** Platforma ne pokušava da bude najveći zdravstveni portal. Prioritet je, tim redosledom: organski autoritet → poverenje → kvalitet sadržaja → email baza → spremna infrastruktura za kviz i referral. Svaka UX odluka u ovom dokumentu proverena je pitanjem: *da li ovo služi autoritetu i poverenju, ili služi kratkoročnoj metrici?* Kada su ta dva u sukobu, pobeđuje autoritet.

---

## Sadržaj

1. [Brand filozofija](#1-brand-filozofija)
2. [Home Page Blueprint](#2-home-page-blueprint)
3. [Article Blueprint](#3-article-blueprint)
4. [Topic Cluster Blueprint](#4-topic-cluster-blueprint)
5. [Lead Funnel UX](#5-lead-funnel-ux)
6. [Design System](#6-design-system)
7. [Mobile UX](#7-mobile-ux)
8. [Accessibility](#8-accessibility)
9. [Trust System](#9-trust-system)
10. [Future Roadmap](#10-future-roadmap)
11. [20 ideja koje ovaj sajt čine boljim od 99% zdravstvenih sajtova u regionu](#11-20-ideja)

---

## 1. Brand filozofija

### 1.1 Trenutak u kojem nas korisnik zatiče

Skoro niko ne dolazi na sajt o metaboličkom zdravlju iz radoznalosti. Dolazi zato što se nešto desilo.

Dobio je nalaz sa podvučenom vrednošću i rečenicom „javite se lekaru". Lekar je rekao „morate da smršate" i prešao na sledećeg pacijenta. Pojavio se rezultat pretrage u tri ujutru posle sata skrolovanja. Roditelj je dobio dijagnozu, pa se osoba prvi put zapitala za sebe.

To je **korisnik u stanju blage do umerene anksioznosti, sa niskim poverenjem u ono što čita i, vrlo često, sa istorijom ličnog neuspeha iza sebe.** Prosečna osoba koja traži „insulinska rezistencija" već je probala tri dijete. Ne dolazi kao prazna posuda za informacije — dolazi sa ožiljcima od prethodnih obećanja.

Ovo je najvažnija činjenica u celom dokumentu. Sve ostalo iz nje sledi.

### 1.2 Osećaj koji ciljamo

Sajt treba da izazove **kontrolisano olakšanje**, ne uzbuđenje.

Emocionalni luk kroz jednu posetu:

```
DOLAZAK          →  „Nešto nije u redu, a ne razumem šta."
                    (anksioznost, konfuzija, blaga sramota)
                          ↓
PRVIH 10 SEKUNDI →  „Ovo je ozbiljno mesto. Ovde piše ko je ovo napisao."
                    (orijentacija, spuštanje odbrane)
                          ↓
PRVI PASUS       →  „Ovo mi je odgovorilo na pitanje. Odmah, bez okolišanja."
                    (olakšanje)
                          ↓
SREDINA TEKSTA   →  „Ovo se dešava u mom telu. Nije stvar volje."
                    (razumevanje, skidanje krivice — ključni trenutak)
                          ↓
KRAJ             →  „Znam šta je sledeći korak i šta da pitam lekara."
                    (osećaj kontrole)
                          ↓
POSLE            →  „Vratiću se ovde. Ovo je moj izvor."
                    (poverenje, pripadnost)
```

Trenutak u sredini — **skidanje krivice** — je emocionalno srce platforme. Osoba koja godinama misli da je slaba karaktera sazna da postoji fiziološki mehanizam koji objašnjava zašto joj je teže nego drugima. To olakšanje je ono što se pamti, deli i zbog čega se ljudi vraćaju. Nijedan CTA na svetu ne kupuje tu vrstu lojalnosti.

### 1.3 Emocije koje namerno NE izazivamo

| Ne izazivamo | Zašto |
|---|---|
| **Strah** | Radi kratkoročno, uništava poverenje dugoročno i etički je neprihvatljiv u zdravstvu. Nema „ovo vas ubija", nema odbrojavanja do dijabetesa. |
| **Sramota** | Ciljna grupa je već preplavljena njome. Sramota izaziva izbegavanje, ne promenu ponašanja. |
| **Euforija** | „Otkrijte tajnu koju lekari kriju" je jezik prevaranata. Svaka rečenica koja obećava preokret nas spušta na njihov nivo. |
| **Hitnost** | Bez tajmera, bez „ograničen broj mesta", bez „poslednja šansa". Zdravstvena odluka ne sme se donositi pod veštačkim pritiskom. |
| **Zavist / poređenje** | Bez before/after, bez tuđih rezultata, bez brojki o kilogramima. |

Ovo nije samo etika. To je i pozicioniranje: **na tržištu prezasićenom vikanjem, tišina je najuočljiviji signal.** Kada svi obećavaju, jedini koji ne obećava izgleda kao jedini koji zna.

### 1.4 Formula poverenja

Poverenje se u zdravstvenom sadržaju gradi po predvidivom obrascu:

```
POVERENJE = (Kompetentnost × Transparentnost × Doslednost)
            ─────────────────────────────────────────────
                      Percipirani lični interes
```

Svaki činilac ima svoju UX implementaciju:

| Činilac | Kako se vidi na sajtu |
|---|---|
| **Kompetentnost** | Dr Snežana sa punom titulom i 40 godina iskustva, vidljivo pri vrhu članka; izvori uz svaku tvrdnju; precizna terminologija bez pojednostavljivanja do netačnosti |
| **Transparentnost** | Datum poslednje provere na svakoj stranici; navedeni izvori; otvoreno priznata nesigurnost; jasno rečeno ko finansira platformu (kada se pravno definiše) |
| **Doslednost** | Isti ton na svakoj stranici; ista struktura svakog članka; nikada iznenadni prodajni obrt |
| **Nizak lični interes** | Jedini CTA u fazi 1 je besplatan vodič; nema prodaje, nema linkova ka proizvodima, nema reklama. Odsustvo monetizacije je **aktivan** signal poverenja i treba ga koristiti dok traje. |

Poslednja stavka je razlog zbog kojeg je odlaganje referral sistema strateška prednost, a ne odricanje. Prvih 12 meseci bez ijednog komercijalnog linka gradi kapital poverenja koji se kasnije može, oprezno i transparentno, delimično koristiti. Obrnutim redosledom se ne može ništa.

### 1.5 Ličnost brenda

Ako bi platforma bila osoba: **iskusna lekarka koja ima vremena da objasni.**

Ne kolega sa fakulteta, ne influenser, ne korporativni portal, ne „wellness coach". Lekarka koja sedne, nacrta na papiru kako insulin radi, kaže „nije do vas" i na kraju napiše na papiriću šta da pitate specijalistu.

To nije metafora — to je bukvalno Dr Snežana, i to je najveća neiskorišćena prednost projekta. Skoro nijedan domaći zdravstveni sajt nema stvarnog lekara sa imenom, licem i 40 godina iskustva kao vidljivo lice sadržaja. Većina ima anonimne tekstove „redakcije".

**Glas u praksi:**

| Radi | Ne radi |
|---|---|
| „Povišena glukoza natašte ne znači automatski dijabetes." | „Alarmantno: vaš šećer je van kontrole!" |
| „Ovo je fiziološki proces, ne pitanje volje." | „Samo treba više discipline." |
| „Dokazi za ovo su ograničeni. Evo šta se zna, a šta ne." | „Nauka je dokazala da…" |
| „Ovo su pitanja koja možete poneti lekaru." | „Preporučujemo da uzmete…" |
| „Insulinska rezistencija znači da ćelije slabije reaguju na insulin — kao kad ključ i dalje ulazi u bravu, ali je treba jače okretati." | „Insulinska rezistencija je kada telo ne voli šećer." |

Poslednji red pokazuje pravilo o metaforama: **metafora sme da pojednostavi, ne sme da bude netačna.** Analogija ključa i brave je fiziološki odbranjiva. „Telo ne voli šećer" nije.

### 1.6 Vizuelni ekvivalent filozofije

Ako se sve ovo prevede u vizuelni jezik: **prostor, mir, red i odsustvo vike.**

Puno belog prostora (odsustvo pritiska), ozbiljna ali topla tipografija (autoritet bez hladnoće), prigušena paleta bez alarmnih boja (nema crvenog za „loše"), fotografija stvarnih ljudi u realnim situacijama (nema stock modela sa savršenim telima i tanjirom salate), ilustracije koje objašnjavaju mehanizam (a ne ukrašavaju).

Detalji u sekciji 6.

---

## 2. Home Page Blueprint

### 2.1 Strateška uloga početne stranice

Realno: **90% saobraćaja u prvoj godini ući će direktno na članke iz pretrage, ne na početnu.** Početna nije glavni ulaz, ali obavlja tri zadatka koja niko drugi ne može:

1. **Provera verodostojnosti.** Korisnik koji je pročitao članak i pita se „ko su ovi ljudi" klikne na logo. Početna mora odgovoriti za pet sekundi.
2. **Orijentacija u ponudi.** Pokazuje da postoji sistem, ne skup nasumičnih tekstova.
3. **Konverzija posetioca sa namerom.** Onaj ko dođe direktno već je zainteresovan — njemu se nudi vodič.

Početna se zato **ne optimizuje za rangiranje na generičkim pojmovima.** Optimizuje se za poverenje i navigaciju.

### 2.2 Wireframe

```
┌───────────────────────────────────────────────────────────────────┐
│  [Logo CMZ]    Teme   Pitanja   Rečnik   Vodiči   O nama      🔍  │  ← Sticky, minimalan
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌─────────────────────────────────┐  ┌──────────────────────┐   │
│   │  Razumite svoje telo pre nego   │  │                      │   │
│   │  što postane dijagnoza.         │  │   [Foto Dr Snežane]  │   │  ① HERO
│   │                                 │  │                      │   │
│   │  Edukativni sadržaj o metabo-   │  │   Dr Snežana         │   │
│   │  ličkom zdravlju koji piše i    │  │   Bivolarević        │   │
│   │  proverava lekar sa gotovo 40   │  │   Spec. opšte med.   │   │
│   │  godina prakse.                 │  │   Osnivač CMZ        │   │
│   │                                 │  │                      │   │
│   │  [Istražite teme]  [Vodič →]    │  └──────────────────────┘   │
│   └─────────────────────────────────┘                             │
│                                                                   │
├───────────────────────────────────────────────────────────────────┤
│   ✓ Sadržaj proverava lekar   ✓ Navedeni izvori   ✓ Bez reklama   │  ② TRUST BAR
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ODAKLE DA POČNETE?                                              │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐              │  ③ ULAZNE TAČKE
│   │ Dobio/la sam │ │ Teško regu-  │ │ U porodici   │              │     PO SITUACIJI
│   │ nalaz koji   │ │ lišem telesnu│ │ ima dijabe-  │              │
│   │ ne razumem   │ │ masu         │ │ tesa         │              │
│   │      →       │ │      →       │ │      →       │              │
│   └──────────────┘ └──────────────┘ └──────────────┘              │
│                                                                   │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│   TEME                                              [Sve teme →]  │  ④ KLASTERI
│   ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐     │
│   │ Laborato-  │ │ Insulinska │ │ Predija-   │ │ Metabolički│     │
│   │ rijske     │ │ rezisten-  │ │ betes      │ │ sindrom    │     │
│   │ analize    │ │ cija       │ │            │ │            │     │
│   │ 8 tekstova │ │ 6 tekstova │ │ 4 teksta   │ │ 3 teksta   │     │
│   └────────────┘ └────────────┘ └────────────┘ └────────────┘     │
│                                                                   │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌───────────────────────────────────────────────────────────┐   │
│   │  [Naslovnica vodiča]   Besplatan praktični vodič za       │   │  ⑤ LEAD MAGNET
│   │                        ishranu koja podržava metaboličko  │   │
│   │                        zdravlje                           │   │
│   │                        • Šta stvarno utiče na glukozu     │   │
│   │                        • Kako sastaviti obrok             │   │
│   │                        • Pitanja za lekara                │   │
│   │                        [Preuzmite besplatno →]            │   │
│   │                        Bez reklama. Odjava u jednom kliku.│   │
│   └───────────────────────────────────────────────────────────┘   │
│                                                                   │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│   NAJČEŠĆA PITANJA                                                │  ⑥ FAQ
│   › Da li je insulinska rezistencija isto što i dijabetes?        │
│   › Šta znači povišen HbA1c?                                      │
│   › Da li predijabetes uvek prelazi u dijabetes?                  │
│   › Koje analize traže od lekara?                          [Sve →]│
│                                                                   │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│   KAKO NASTAJE OVAJ SADRŽAJ                                       │  ⑦ METODOLOGIJA
│   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐       │
│   │ 1. Izvori│ → │ 2. Pisanje│ → │3. Stručna│ → │4. Redovna│       │
│   │ SZO, ADA │   │ razumljiv │   │ recenzija│   │ provera  │       │
│   │ EASD…    │   │ jezik     │   │ Dr S. B. │   │ na 18 m. │       │
│   └──────────┘   └──────────┘   └──────────┘   └──────────┘       │
│                          [Uređivačka politika →]                  │
│                                                                   │
├───────────────────────────────────────────────────────────────────┤
│   O CMZ · Uređivačka politika · Stručni recenzenti · Kontakt      │  ⑧ FOOTER
│   Politika privatnosti · Uslovi · Kolačići · Medicinski disclaimer│
│   ─────────────────────────────────────────────────────────────   │
│   Sadržaj je edukativan i ne zamenjuje pregled, dijagnozu ni      │
│   terapiju koju određuje vaš lekar.                               │
└───────────────────────────────────────────────────────────────────┘
```

### 2.3 Sekcija po sekcija

| # | Sekcija | Svrha | UX logika | CTA |
|---|---|---|---|---|
| ① | **Hero** | Odgovoriti na „šta je ovo i zašto bih verovao" u 5 sekundi | Lice lekara pored naslova je najjači signal poverenja koji postoji, i radi brže od bilo kog teksta. Namerno nije apstraktna ilustracija. | Primarni: *Istražite teme*. Sekundarni: *Vodič* |
| ② | **Traka poverenja** | Tri činjenice koje se ne mogu osporiti | Kratko, bez ikona koje liče na sertifikate. „Bez reklama" je diferencijator dok traje. | — |
| ③ | **Ulazne tačke po situaciji** | Segmentacija bez postavljanja pitanja | Ljudi se ne prepoznaju u medicinskim terminima („metabolički sindrom"), nego u situacijama („dobio sam nalaz"). Ovo je najvažnija navigaciona inovacija na početnoj i preteča kviza. | Vodi direktno u klaster |
| ④ | **Klasteri** | Pokazati sistem i obim | Broj tekstova po klasteru signalizira dubinu. Klasteri se prikazuju redosledom prioriteta iz dokumenta 01. | Pillar stranica |
| ⑤ | **Lead magnet** | Jedina konverzija na stranici | Postavljen posle dokazivanja vrednosti, ne pre. Ispod dugmeta stoji šta se dešava sa email-om — smanjuje strepnju i podiže kvalitet prijava. | *Preuzmite besplatno* |
| ⑥ | **FAQ** | Uhvatiti dugorepu pretragu i pokazati raspon | Struktura podataka `FAQPage` daje šansu za prikaz u rezultatima pretrage. Pitanja su realna, ne marketinška. | Pojedinačno pitanje |
| ⑦ | **Kako nastaje sadržaj** | Transparentnost procesa | Retko ko na domaćem tržištu ovo pokazuje. Proces u četiri koraka je konkretniji od bilo koje izjave o kvalitetu. | Uređivačka politika |
| ⑧ | **Footer** | Pravna higijena i poverenje | Disclaimer je vidljiv, ne skriven. Pravni linkovi su potpuni. | — |

### 2.4 Šta na početnoj namerno NE postoji

- **Rotirajući slajder.** Nizak angažman, šteti performansama i pristupačnosti.
- **Brojači „10.000 zadovoljnih korisnika".** Nemamo ih, a i da imamo — u zdravstvu je društveni dokaz slab, a stručni dokaz jak.
- **Svedočenja pacijenata.** Pravno rizično i etički sporno u ovom kontekstu.
- **Newsletter popup na ulazu.** Traži nešto pre nego što je bilo šta dato.
- **Blog sa datumima kao glavna sekcija.** Sadržaj je referentan, ne hronološki. Datum objave nije relevantan; datum poslednje provere jeste.
- **Chat widget.** Otvara očekivanje medicinskog saveta koje ne smemo ispuniti.

### 2.5 Prvi ekran na mobilnom

Na mobilnom se preuređuje: naslov → jedna rečenica → fotografija Dr Snežane sa kvalifikacijom → primarno dugme → tri ulazne tačke. Traka poverenja se preseljava odmah ispod dugmeta. Cilj: identitet i kredibilitet vidljivi bez skrolovanja na uređaju od 375px.

---

## 3. Article Blueprint

Članak je proizvod. Početna je izlog, ali članak je ono što se zapravo koristi, deli i po čemu nas pretraživač ocenjuje.

### 3.1 Anatomija savršenog članka

```
┌───────────────────────────────────────────────────────────┐
│  Početna › Teme › Laboratorijske analize                  │  Breadcrumb
│                                                           │
│  Šta znači povišen HbA1c?                                 │  H1
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ ✔ Stručno proverio: Dr Snežana Bivolarević          │  │  ① TRAKA POVERENJA
│  │   Spec. opšte medicine · Osnivač CMZ                │  │     (odmah ispod H1)
│  │   Poslednja provera: 12. jun 2026. · 8 min čitanja  │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  HbA1c pokazuje prosečan nivo glukoze u krvi tokom        │  ② DIREKTAN ODGOVOR
│  poslednja dva do tri meseca. Vrednost iznad 6,5%         │     (2–3 rečenice,
│  ponovljena u dva nalaza obično znači dijabetes, dok       │     bez uvoda)
│  vrednosti od 5,7% do 6,4% ukazuju na predijabetes.       │
│  Jedan povišen nalaz sam po sebi nije dijagnoza.          │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  KLJUČNO                                            │  │  ③ KLJUČNI ZAKLJUČCI
│  │  • HbA1c meri prosek, ne trenutno stanje            │  │
│  │  • Referentne vrednosti: <5,7 / 5,7–6,4 / ≥6,5      │  │
│  │  • Nalaz se uvek tumači uz ostale parametre         │  │
│  │  • Dijagnozu postavlja isključivo lekar             │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  [Sadržaj članka ▾]  ← sklopivo na mobilnom               │  ④ NAVIGACIJA
│                                                           │
│  ## Šta HbA1c zapravo meri                                │  ⑤ TELO TEKSTA
│  Tekst… [insulinska rezistencija] ← pojam iz rečnika      │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │        [Ilustracija: kako nastaje HbA1c]            │  │  ⑥ ILUSTRACIJA
│  │  Opis ispod slike koji objašnjava, ne ponavlja      │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  ## Kako se tumače vrednosti                              │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Vrednost      │ Tumačenje       │ Uobičajen sledeći│  │  ⑦ TABELA
│  │  ispod 5,7%    │ Uredan nalaz    │ Redovna kontrola │  │
│  │  5,7–6,4%      │ Predijabetes    │ Razgovor s lek.  │  │
│  │  6,5% i više   │ Ukazuje na T2D  │ Potvrda nalaza   │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  ⓘ  VAŽNO                                           │  │  ⑧ CALLOUT
│  │  Anemija i bolesti bubrega mogu izmeniti HbA1c.     │  │
│  │  Nalaz uvek tumačite sa lekarem koji zna vašu       │  │
│  │  celokupnu sliku.                                   │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  ─────────────── ~60% dužine teksta ───────────────       │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Praktični vodič za ishranu koja podržava           │  │  ⑨ KONTEKSTUALNI CTA
│  │  metaboličko zdravlje — besplatno                   │  │     (inline, ne popup)
│  │  [Preuzmite →]                                      │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  ## Šta se ne zna sa sigurnošću                           │  ⑩ NESIGURNOST
│  Podeljeni dokazi se navode otvoreno.                     │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  PITANJA ZA VAŠEG LEKARA                    [Štampaj]│  │  ⑪ PITANJA ZA LEKARA
│  │  1. Da li treba ponoviti nalaz i kada?              │  │
│  │  2. Da li moji drugi parametri menjaju tumačenje?   │  │
│  │  3. Koje promene su u mom slučaju prioritet?        │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  ## Česta pitanja                                         │  ⑫ FAQ
│  › Da li HbA1c može da se snizi bez lekova?               │
│  › Koliko često se radi?                                  │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  [Foto]  Dr Snežana Bivolarević                     │  │  ⑬ AUTOR/RECENZENT
│  │          Specijalista opšte medicine, subspecija-   │  │
│  │          lista bolesti zavisnosti. Gotovo 40 godina │  │
│  │          kliničke prakse. Osnivač i glavni stručni  │  │
│  │          urednik CMZ.            [Ceo profil →]     │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  ## Izvori                                                │  ⑭ IZVORI
│  1. Svetska zdravstvena organizacija (2024) …  ↗          │
│  2. ADA Standards of Care (2025) …  ↗                     │
│                                                           │
│  ## Povezani tekstovi                                     │  ⑮ POVEZANO
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                   │
│  │ Glukoza  │ │ OGTT test│ │ Predija- │                   │
│  │ natašte  │ │          │ │ betes    │                   │
│  └──────────┘ └──────────┘ └──────────┘                   │
│                                                           │
│  ─────────────────────────────────────────────────────    │
│  Ovaj tekst je edukativan i ne zamenjuje pregled,         │  ⑯ DISCLAIMER
│  dijagnozu ni terapiju koju određuje vaš lekar.           │
└───────────────────────────────────────────────────────────┘
```

### 3.2 Šta korisnik vidi prvo — pravilo prvog ekrana

Na mobilnom, u prvih 600px, mora stati: naslov, potpis recenzenta sa kvalifikacijom, datum poslednje provere, i **prve dve rečenice koje odgovaraju na pitanje.**

Ne sme stati: reklama, popup, video, „pre nego što počnemo", uvod o tome zašto je tema važna.

Razlog je merljiv: korisnik u anksioznom stanju donosi odluku o poverenju u prve tri sekunde, i to na osnovu dva signala — *da li mi odgovara na pitanje* i *da li iza ovoga stoji neko stvaran*. Klasična struktura zdravstvenih portala („Metabolizam je složen proces koji…") gubi oba.

**Test za svaki članak:** ako korisnik pročita samo prvi pasus i ode, da li je dobio tačan odgovor? Ako nije, članak nije spreman.

### 3.3 Telo teksta

| Element | Pravilo |
|---|---|
| Dužina pasusa | Maksimalno 3 rečenice. Na mobilnom pasus od 5 redova izgleda kao zid. |
| Rečenica | Prosečno 15–20 reči. Duge složene rečenice su najčešći uzrok odustajanja. |
| Podnaslovi | Formulisani kao pitanja (`Kako se tumače vrednosti?`), na svakih 200–300 reči. Služe i skeniranju i vidljivosti u pretrazi. |
| Terminologija | Termin se uvodi, odmah objašnjava, pa se dalje koristi. Ne izbegavamo stručne reči — objašnjavamo ih. Korisnik koji nauči termin bolje razgovara sa lekarom. |
| Brojevi | Uvek sa jedinicom i kontekstom. Nikada gola vrednost bez referentnog opsega. |
| Dužina teksta | 1.200–2.000 reči za standardni članak. Dužina prati pitanje, ne SEO kvotu. Tekst od 800 reči koji potpuno odgovara je bolji od 2.500 reči nategnutog sadržaja. |
| Rečnik pojmova | Prvo pojavljivanje pojma je link sa objašnjenjem na prelaz mišem (mobilno: tap otvara mali panel). Jednom po stranici. |

### 3.4 Slike i ilustracije

Vizuali imaju **jedan zadatak: objasniti mehanizam.** Sve ostalo je trošak performansi.

| Tip | Kada se koristi | Pravila |
|---|---|---|
| **Objašnjavajuća ilustracija** | Mehanizmi (kako insulin ulazi u ćeliju, kako nastaje HbA1c) | Sopstveni stil, prigušena paleta, obavezno opisan tekstom, mora se razumeti i bez boje |
| **Dijagram / grafikon** | Referentni opsezi, tok procesa, poređenja | Bez 3D efekata, bez senki, sa navedenim izvorom podataka |
| **Fotografija** | Retko, i to samo za ljudsko prisustvo (portret lekara, tim) | Stvarni ljudi, realne situacije, raznolika telesna građa, bez osuđujućeg kadriranja |
| **Vizuelizacija „šta piše na nalazu"** | Klaster laboratorijskih analiza | **Najjači potencijalni diferencijator** — anonimizovan prikaz nalaza sa objašnjenim poljima. Korisnik prepoznaje sopstveni papir. |

**Nikada:** stock fotografije mršavih ljudi sa centimetrom; tanjiri sa listom salate; osoba koja u očaju gleda vagu; slike ampula, igala i tableta (aktiviraju strah i približavaju sadržaj promociji terapije); crveno-zelena semaforska logika za vrednosti.

### 3.5 CTA blokovi

Samo dva tipa, oba nenametljiva:

**Kontekstualni CTA za vodič** — na ~60% dužine teksta i još jednom na kraju. Sadrži naslov vodiča, tri konkretne stavke šta korisnik dobija, dugme i jednu rečenicu o email-u („Bez reklama. Odjava u jednom kliku."). Vizuelno je odvojen okvirom, ali istom paletom kao ostatak — ne bleska.

**Navigacioni CTA** — „Istražite temu" ka pillar stranici, tekstualno, bez okvira.

Zabranjeno: exit-intent, popup posle X sekundi, lepljiva traka na dnu koja pokriva sadržaj, „sticky" CTA na mobilnom, dva različita vodiča u istom tekstu.

Razmena je namerna: **niža stopa klika, viši kvalitet lead-a i očuvano poverenje.** Kod ciljne grupe u stanju zabrinutosti prekidajući obrazac šalje poruku „ovima je do email-a, ne do mene".

### 3.6 Reference

Izvori nisu formalnost — oni su proizvod. Prikaz:

```
## Izvori

1. World Health Organization. Diagnosis and management of type 2 diabetes. 2024. ↗
2. American Diabetes Association. Standards of Care in Diabetes. Diabetes Care, 2025. ↗
3. NICE. Type 2 diabetes: prevention in people at high risk. 2023. ↗

Sadržaj se zasniva na smernicama i recenziranim izvorima. Poslednja provera: 12. jun 2026.
Sledeća planirana provera: decembar 2027.
```

Pravila: primarni izvori (SZO, ADA, EASD, NICE, Cochrane, recenzirani časopisi), nikada drugi blogovi; svaki izvor sa godinom; spoljni linkovi otvaraju novi tab sa jasnom oznakom; inline oznake izvora u tekstu tamo gde je tvrdnja specifična; nikada izvor stariji od 5 godina za kliničke preporuke bez napomene zašto.

**Dodatak koji retko ko radi:** rečenica koja objašnjava *zašto* je baš taj izvor izabran, kod spornih tema. Npr. „Navodimo smernice ADA i EASD jer se u pojedinim preporukama razlikuju — obe su navedene."

### 3.7 Autor i recenzent

Razdvajamo dve uloge, i to vidljivo:

| Uloga | Šta znači | Gde se prikazuje |
|---|---|---|
| **Autor** | Napisao tekst | Ispod članka, sa kratkom biografijom |
| **Stručni recenzent** | Proverio medicinsku tačnost i preuzeo odgovornost | **Pri vrhu, odmah ispod naslova** — jer to je signal koji donosi odluku o poverenju |

Prikaz recenzenta pri vrhu je namerno: većina sajtova gura autora na dno gde ga niko ne vidi. Naša najveća prednost — stvarni lekar sa 40 godina prakse — mora biti vidljiva u trenutku kad korisnik odlučuje da li da čita.

Kartica na dnu sadrži fotografiju, puno ime, obe kvalifikacije, dužinu prakse, ulogu u CMZ i link na pun profil. Fotografija je stvarna, profesionalna, u kliničkom ili neutralnom okruženju — ne u studiju sa belom pozadinom i prekrštenim rukama.

Kada tekst piše saradnik a recenzira Dr Snežana, stoji oboje: „Napisao: [ime] · Stručno proverila: Dr Snežana Bivolarević". Nikada „redakcija".

### 3.8 FAQ u članku

3–5 pitanja koja se prirodno javljaju posle čitanja, ne varijacije naslova. Prvo pitanje otvoreno, ostala sklopljena. Svako pitanje je i zaseban dokument u sistemu, pa se isti odgovor može pojaviti u više članaka bez dupliranja teksta i ima sopstvenu stranicu za dugorepu pretragu.

Odgovor: 40–80 reči, direktan. Ako zahteva više — postaje članak i ovde ostaje link.

### 3.9 Povezani sadržaj

Tri kartice, generisane iz klastera i ručno odabranih veza, nikada „najčitanije" ili „najnovije". Logika izbora: **sledeći korak u razumevanju**, ne najpopularniji tekst. Posle „Šta znači povišen HbA1c" ide „Glukoza natašte", „OGTT test", „Predijabetes — šta dalje" — dakle prirodni tok pitanja koje korisnik već ima u glavi.

Ispod povezanog sadržaja stoji link ka pillar stranici klastera: „Pregled svih tekstova o laboratorijskim analizama →".

---

## 4. Topic Cluster Blueprint

### 4.1 Zašto klaster, a ne blog

Blog je hronologija. Klaster je **znanje organizovano onako kako se pitanja postavljaju.**

Za korisnika: nikad se ne oseća izgubljeno, uvek zna gde je i šta je sledeće. Za pretraživač: jasan signal ko je autoritet za temu, jer autoritet nije jedan tekst nego pokrivenost. Za nas: predvidljiva proizvodnja sadržaja i merljiv doprinos svakog klastera.

### 4.2 Anatomija pillar stranice

Pillar nije duži članak. To je **kapija u temu** — hibrid vodiča i sadržaja.

```
┌───────────────────────────────────────────────────────────┐
│  Početna › Teme › Insulinska rezistencija                 │
│                                                           │
│  Insulinska rezistencija                                  │  H1 — čist pojam
│  Sve što treba da razumete, objašnjeno korak po korak     │
│                                                           │
│  ✔ Stručno proverila: Dr Snežana Bivolarević              │
│    Poslednja provera: jun 2026. · 6 tekstova u temi       │
│                                                           │
│  Insulinska rezistencija je stanje u kojem ćelije slabije │  ① DEFINICIJA
│  reaguju na insulin, pa pankreas mora da ga luči više.    │     (odmah, 3–4 reč.)
│  Nije bolest sama po sebi, ali prethodi predijabetesu     │
│  i dijabetesu tipa 2 i može se menjati.                   │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  ODAKLE DA POČNETE                                  │  │  ② PUTANJE PO NAMERI
│  │  → Prvi put čujem za ovo         [Osnove]           │  │
│  │  → Imam nalaz i ne razumem ga    [Dijagnostika]     │  │
│  │  → Znam da imam, šta sad         [Šta pomaže]       │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  ## Kako nastaje                        [Detaljnije →]    │  ③ SAŽECI PODTEMA
│  200–300 reči sažetka, pa link na potporni članak.        │     (6–10 blokova)
│                                                           │
│  ## Simptomi i znaci                    [Detaljnije →]    │
│  ## Koje analize se rade                [Detaljnije →]    │
│  ## Odnos prema predijabetesu           [Detaljnije →]    │
│  ## Šta ishrana menja                   [Detaljnije →]    │
│  ## Fizička aktivnost                   [Detaljnije →]    │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Besplatan vodič  [Preuzmite →]                     │  │  ④ CTA (jednom)
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  ## Pojmovi iz ove teme                                   │  ⑤ REČNIK
│  insulin · glukoza · HOMA-IR · beta ćelije · glikogen     │
│                                                           │
│  ## Česta pitanja (8–12)                                  │  ⑥ FAQ
│  ## Svi tekstovi u ovoj temi (lista)                      │  ⑦ INDEKS
│  ## Povezane teme: Predijabetes · Metabolički sindrom     │  ⑧ SUSEDNI KLASTERI
└───────────────────────────────────────────────────────────┘
```

Dužina: 2.500–4.000 reči. Pillar se ažurira i raste kako se dodaju potporni tekstovi — nikada se ne „završava".

### 4.3 Potporni članci

| Tip | Uloga u klasteru | Primer | Funnel |
|---|---|---|---|
| **Objašnjenje** | Odgovara na „šta je / zašto" | „Kako nastaje insulinska rezistencija" | TOFU |
| **Tumačenje nalaza** | Prevodi laboratorijski papir | „Šta znači HOMA-IR 3,2" | TOFU→MOFU |
| **Kako uraditi** | Praktičan postupak | „Kako se pripremiti za OGTT" | MOFU |
| **Provera mita** | Ispravlja rasprostranjenu zabludu | „Da li voće podiže šećer previše?" | TOFU |
| **Pregled dokaza** | Šta nauka stvarno kaže | „Intermitentni post i insulinska osetljivost" | MOFU |

Svaki klaster teži da ima najmanje jedan tekst svakog tipa. „Provera mita" ima najveći potencijal deljenja; „tumačenje nalaza" najveću nameru; „pregled dokaza" najviše doprinosi autoritetu i najviše se citira.

### 4.4 Navigacija unutar klastera

Četiri sloja, svaki sa svojom funkcijom:

1. **Breadcrumb** — uvek vidljiv, uvek klikabilan. Odgovara na „gde sam".
2. **Traka teme** — tanka traka ispod naslova članka: „Deo teme: Insulinska rezistencija (6 tekstova) →". Vraća korisnika koji je ušao direktno iz pretrage u strukturu. **Ovo je najvažniji navigacioni element na sajtu**, jer 90% saobraćaja ulazi bočno.
3. **Redosled u temi** — na dnu članka: „← Prethodno: Simptomi | Sledeće: Koje analize se rade →". Pretvara skup tekstova u kurs.
4. **Sadržaj članka** — sklopiv, sa oznakom trenutne pozicije pri skrolovanju.

### 4.5 Pravila internog povezivanja

| Pravilo | Sprovođenje |
|---|---|
| Svaki članak → svoj pillar | Automatski (breadcrumb + traka teme) |
| Pillar → svi članci klastera | Automatski iz sistema |
| 3–5 unakrsnih veza po članku | Polje `relatedArticles`, ručno biran redosled |
| Prvo pojavljivanje pojma → rečnik | Automatski, jednom po stranici |
| Klaster → 2–3 susedna klastera | Ručno, na dnu pillar-a |
| Tekst stariji od 12 meseci bez ijedne dolazne veze | Upozorenje uredniku — siroče u strukturi |

Sidreni tekst je **opisan, nikad „kliknite ovde"**. Ne forsira se ključna reč do neprirodnosti — „više o tumačenju HbA1c" je bolje od ponovljenog „HbA1c test".

### 4.6 Redosled izgradnje

Klaster se gradi **od dna ka vrhu**: prvo 3–4 potporna članka, pa tek onda pillar. Pillar napisan pre potpornih tekstova je prazna ljuska sa linkovima koji ne postoje, i pretraživač i korisnik to jednako brzo prepoznaju.

Klaster se smatra „kompletnim" pri 6–8 potpornih tekstova + pillar + 8–12 FAQ unosa + 10–15 pojmova rečnika. Tek tada se prelazi na sledeći. **Jedan kompletan klaster vredi više od tri polovična** — što je najčešća greška domaćih zdravstvenih sajtova.

---

## 5. Lead Funnel UX

### 5.1 Filozofija razmene

Vodič nije mamac. To je **prvi opipljiv dokaz da sadržaj vredi.** Ako je vodič slab, ceo odnos je oštećen na prvom koraku — a jedini pravi cilj funnela u prvoj godini je da neko ko ga prođe pomisli: *ovi ljudi znaju šta rade*.

Zato pravilo: **vodič mora biti bolji od onoga što bi većina naplatila.** 14–18 strana, dizajnirano, sa recenzijom Dr Snežane, praktično upotrebljivo. Ne PDF od tri strane sa listom namirnica.

### 5.2 Kompletan tok

```
① ORGANSKI DOLAZAK
   Pretraga → članak
   Korisnik ne zna ko smo. Nema traženja ničega.
                    ↓
② DOKAZ VREDNOSTI
   Čita članak. Dobija odgovor. Vidi ime lekara i izvore.
   Ovde se stvara pravo na pitanje.
                    ↓
③ PONUDA (na ~60% teksta i na kraju)
   ┌──────────────────────────────────────────────┐
   │ [naslovnica]  Praktični vodič za ishranu     │
   │               koja podržava metaboličko      │
   │               zdravlje                       │
   │               • Kako sastaviti obrok         │
   │               • Šta stvarno utiče na glukozu │
   │               • Lista pitanja za lekara      │
   │               [Preuzmite besplatno →]        │
   │               16 strana · PDF · Bez reklama  │
   └──────────────────────────────────────────────┘
                    ↓
④ LANDING VODIČA  /vodici/[slug]/
   Sadržaj sekvence: naslov → za koga jeste i za koga NIJE →
   sadržaj po poglavljima → ko ga je proverio → forma →
   šta se dešava sa email-om → uzorak strane
                    ↓
⑤ FORMA — jedno polje
   ┌──────────────────────────────────────────────┐
   │  Email adresa                                │
   │  [                                        ]  │
   │  ☐ Saglasan/na sam da primam edukativne      │
   │    poruke. Odjava u svakom trenutku.         │
   │  [Pošaljite mi vodič →]                      │
   │  Nikada ne šaljemo reklame i ne prosleđujemo │
   │  vaše podatke.                               │
   └──────────────────────────────────────────────┘
                    ↓
⑥ EKRAN „PROVERITE POŠTU"
   Ne generička poruka. Konkretno:
   „Poslali smo poruku na j***@gmail.com.
    Kliknite na potvrdu i vodič stiže odmah.
    Nije stigla? Proverite promocije/spam."
   + [Otvorite Gmail] dugme (prepoznaje domen)
   + „Dok čekate, možda vas zanima →" (3 članka)
                    ↓
⑦ EMAIL POTVRDE (double opt-in)
   Kratak. Od „Dr Snežana Bivolarević, CMZ".
   Jedno dugme. Bez slika koje kvare isporučivost.
                    ↓
⑧ POTVRDA → DOSTAVA
   Stranica zahvalnosti + vodič odmah dostupan
   + potpisani link sa rokom u email-u
                    ↓
⑨ NURTURE SEKVENCA (14 dana, 5 poruka)
                    ↓
⑩ TRAJNI ODNOS
   Mesečni newsletter (v2)
```

### 5.3 Ključne UX odluke i zašto

| Odluka | Obrazloženje |
|---|---|
| **Samo email, bez imena** | Svako dodatno polje smanjuje konverziju za 5–10%. Ime nam ne treba — personalizacija po imenu je ionako slab signal, a u zdravstvenom kontekstu može delovati nametljivo. |
| **Double opt-in, iako smanjuje broj** | Gubi se 20–40% prijava, dobija se dokaziv pristanak, čista baza i isporučivost. U zdravstvu je ovo neupitno. |
| **Pošiljalac je Dr Snežana, ne „CMZ tim"** | Ljudi otvaraju poruke od ljudi. Ime lekara u polju pošiljaoca je najveći pojedinačni faktor otvaranja. |
| **Odeljak „za koga ovaj vodič NIJE"** | Deluje protivintuitivno, ali podiže i konverziju i kvalitet — signalizira poštenje i preduhitruje razočaranje. Npr. „Nije za osobe sa dijabetesom tipa 1 ni za trudnice — za njih važe drugačije preporuke." |
| **Uzorak strane vodiča** | Vidljiv dokaz kvaliteta pre nego što se traži email. |
| **Sadržaj dok se čeka potvrda** | Prazan ekran zahvalnosti je izgubljena prilika; tri članka drže sesiju. |
| **Nema ponude vodiča na svakoj stranici** | Pravne stranice, „O nama" i stranica recenzenta nemaju CTA. Doslednost pritiska je odbojna. |

### 5.4 Nurture sekvenca — UX i ton

| # | Dan | Predmet | Sadržaj | Cilj |
|---|---|---|---|---|
| 1 | 0 | Vaš vodič je ovde | Link + 2 rečenice kako ga koristiti | Isporuka |
| 2 | 2 | Najčešća zabluda o metaboličkom zdravlju | Kratak tekst + link na članak | Prva vrednost bez traženja |
| 3 | 5 | Kako da razumete svoj nalaz | Vodi u klaster laboratorije | Segmentacija po ponašanju |
| 4 | 9 | Šta pitati lekara na sledećem pregledu | Lista pitanja za štampu | Najkorisnija poruka u nizu |
| 5 | 14 | Šta vas najviše muči? | Poziv da odgovori na poruku | Isporučivost + istraživanje publike |

Peta poruka je namerno postavljena: odgovori na email podižu reputaciju pošiljaoca i daju direktan uvid u stvarna pitanja publike — najbolji mogući izvor za planiranje sledećih tema. Odgovori se čitaju i koriste, ali **nikada se ne odgovara medicinskim savetom** — standardni odgovor upućuje na sadržaj i na lekara.

Format poruka: čist tekst ili minimalan HTML, bez banera i stock slika. Poruka mora izgledati kao da ju je napisao čovek, jer i jeste.

### 5.5 Merenje i realna očekivanja

| Korak | Očekivano |
|---|---|
| Prikaz CTA → klik | 6–12% |
| Landing → započeta forma | 40–60% |
| Forma → poslata | 55–75% |
| Poslata → potvrđena | 60–80% |
| **Poseta → potvrđen lead** | **2–5%** |
| Otvaranje sekvence | 35–50% |
| Odjava u prvih 14 dana | < 3% |

Pri 4.000 sesija mesečno u šestom mesecu to je 80–200 potvrđenih pretplatnika mesečno. **To je realan i dobar rezultat** za edukativnu platformu bez plaćenog saobraćaja — i cilj nije da bude veći po cenu kvaliteta.

---

## 6. Design System

> Bez crtanja. Definicija principa i vrednosti koje kasnije prelaze u tokene.

### 6.1 Vizuelni princip

**„Klinička preciznost, ljudska toplina."**

Dve zamke koje izbegavamo: hladan korporativni medicinski izgled (plavo-belo, stock stetoskop — deluje kao osiguravajuća kuća, ne kao lekar) i mekani wellness izgled (pastel, listići, „glow" — deluje kao prodaja suplemenata).

Referentni osećaj: ozbiljna medicinska publikacija koju je dizajnirao neko ko voli tipografiju.

### 6.2 Boje

Paleta je namerno uska. **[ODLUKA — potvrditi ili tražiti alternativne pravce]**

| Uloga | Predlog | Obrazloženje |
|---|---|---|
| **Primarna — Duboka petrol zelena** | `#0F4C4A` | Medicinski autoritet bez klišea „bolničkog plavog". Ozbiljna, mirna, retka u domaćoj konkurenciji. |
| **Primarna svetla** | `#1A6B67` | Linkovi, aktivna stanja |
| **Akcenat — Topla terakota** | `#C4633D` | **Samo za CTA i ništa drugo.** Kada se akcenat koristi samo za jednu stvar, ta stvar se uvek vidi. |
| **Pozadina — Topli krem** | `#FAF8F5` | Ne čisto belo. Smanjuje naprezanje očiju kod dugog čitanja i deluje toplije. |
| **Površine** | `#FFFFFF` | Kartice, callout blokovi |
| **Tekst osnovni** | `#1A1F1E` | Ne čisto crno — mekši kontrast, i dalje 15:1 |
| **Tekst sekundarni** | `#5A6360` | Meta podaci, opisi slika (4,6:1 — prolazi AA) |
| **Ivice** | `#E3DFD8` | Tanke, nenametljive |
| **Info** | `#1A6B67` | Callout „informacija" |
| **Oprez** | `#8A6D1F` | Callout „oprez" — **zemljano žuta, ne alarmno narandžasta** |
| **Neutralno-važno** | `#3D4A5C` | Callout „važno" |

**Namerno nema crvene.** Nijedne. Crvena u zdravstvenom kontekstu aktivira alarm, a naš ceo pristup je suprotan. Za tabele referentnih vrednosti koristi se neutralna skala sa tekstualnim oznakama, ne semafor — što je istovremeno i rešenje za daltonizam (8% muškaraca, a muškarci 40–60 su ceo jedan segment).

### 6.3 Tipografija

**Kritično ograničenje za naše tržište:** font mora imati potpunu podršku za `č ć š ž đ Č Ć Š Ž Đ`. Veliki broj popularnih fontova ima loše nacrtano `đ` (ili ga uopšte nema), a `Đ` je često katastrofa. Ovo se proverava **pre** izbora, ne posle.

| Uloga | Predlog | Zašto |
|---|---|---|
| **Telo teksta** | Serifni: **Literata**, **Source Serif 4** ili **Lora** | Serif signalizira ozbiljnost i čitljiviji je za duge tekstove. Sva tri imaju kompletnu podršku za srpsku latinicu i dobro nacrtano `đ`. |
| **Naslovi i UI** | Beskrajni: **Inter**, **Public Sans** ili **Source Sans 3** | Neutralno, odlična čitljivost u malim veličinama, potpuna dijakritika. |
| **Brojevi u tabelama** | Tabularne cifre iste porodice | Nužno da se vrednosti poravnaju u kolonama. |

Kombinacija serif-telo + sans-naslovi je namerna: većina zdravstvenih sajtova koristi sans svuda, pa deluju kao SaaS proizvod. Serif u telu teksta odmah signalizira „ovo se čita, ne skenira".

**Tipografska skala** (osnova 18px na desktopu, 17px na mobilnom — veće od uobičajenog jer publika uključuje osobe 50+):

| Element | Veličina | Prored | Napomena |
|---|---|---|---|
| H1 | 40 / 32px | 1,15 | Jedan po stranici |
| H2 | 30 / 26px | 1,25 | Formulisan kao pitanje |
| H3 | 23 / 21px | 1,3 | |
| Telo | 18 / 17px | **1,7** | Velikodušan prored je najveći pojedinačni faktor čitljivosti |
| Uvodni pasus | 21 / 19px | 1,6 | Prve 2–3 rečenice odgovora |
| Meta / opis slike | 15px | 1,5 | |
| Širina reda | **62–72 znaka** | | Ključno. Šire od 75 znakova gubi se red pri povratku. |

### 6.4 Ikonografija

Linijske ikone, debljina linije 1,5px, ujednačen stil (predlog: Lucide ili Phosphor — obe imaju neutralan medicinski-prihvatljiv skup). Ikone **prate tekst, nikada ga ne zamenjuju** — ikona bez oznake je pogađanje.

Zabranjeno: emoji u sadržaju; ikone srca sa EKG linijom; stetoskopi; ilustracije „doktora sa podignutim palcem"; ikone hrane koje sugerišu zabranu (precrtana pizza).

### 6.5 Spacing

Skala od 4px: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`. Bez međuvrednosti.

Pravilo: **razmak između sekcija je veći nego što deluje potrebno.** Vertikalni ritam u tekstu — 24px između pasusa, 48px pre H2, 32px oko callout blokova, 64px između većih sekcija stranice. Prazan prostor je ovde funkcionalan: on je vizuelni ekvivalent smirenog tona.

Maksimalna širina teksta 680px; širina stranice 1200px.

### 6.6 Fotografija

| Radi | Ne radi |
|---|---|
| Portreti stvarnih ljudi iz CMZ | Stock modeli |
| Prirodno svetlo, realna okruženja | Studijska bela pozadina |
| Raznolika telesna građa, raznolik uzrast | Isključivo vitki, mladi ljudi |
| Kadar koji poštuje dostojanstvo | Kadriranje samo stomaka („isečena glava") |
| Realna hrana u realnim tanjirima | Estetizovana „clean eating" scena |

**Pravilo isečene glave** je važno: fotografije gojaznih osoba snimljene tako da im se ne vidi lice su standard u medijima i duboko dehumanizuju. Nikada ih ne koristimo. Ako se prikazuje osoba, prikazuje se kao osoba.

Fotografije se koriste **retko**. Većina vizuelnog tereta ide na ilustracije koje objašnjavaju.

### 6.7 Ilustracije

Stil: **linijski dijagram sa suzdržanim ispunama**, u primarnoj paleti, bez gradijenta i senki. Bliže naučnoj ilustraciji nego infografici.

Pravila: mora se razumeti crno-belo (test za daltonizam i štampu); mora imati tekstualni opis koji nosi istu informaciju; oznake unutar ilustracije na srpskom; nikada dekorativna ilustracija — ako ne objašnjava, ne postoji.

Prioritetne ilustracije za fazu 1: kako insulin unosi glukozu u ćeliju; šta se menja kod insulinske rezistencije; odnos glukoze natašte, OGTT i HbA1c; putanja od insulinske rezistencije do dijabetesa tipa 2 (sa naglaskom da je reverzibilna u ranim fazama); anatomija laboratorijskog nalaza.

### 6.8 Grafikoni

Minimalistički: bez okvira, bez pozadinske mreže osim tanke horizontalne, bez 3D, bez legendi kad se može označiti direktno na liniji. Uvek sa navedenim izvorom podataka ispod. Y-osa **uvek počinje od nule** kod poređenja — skraćena osa je manipulacija i na zdravstvenom sajtu je neprihvatljiva.

Bez pita grafikona (ljudi loše procenjuju uglove). Umesto njih trakasti.

### 6.9 Tabele

Najvažniji podatkovni format na sajtu — referentne vrednosti su srž klastera laboratorijskih analiza.

Pravila: bez vertikalnih linija; horizontalne tanke i svetle; zaglavlje sa blago drugačijom pozadinom, lepljivo pri skrolovanju kod dugih tabela; brojevi desno poravnati sa tabularnim ciframa; naizmenično senčenje redova samo kod 6+ redova; na mobilnom se tabela sa 3+ kolone pretvara u kartice, **nikada u horizontalno skrolovanje**.

Svaka tabela ima naslov i, kod referentnih vrednosti, napomenu da se vrednosti mogu razlikovati između laboratorija — što je česta i realna zabuna kod korisnika.

### 6.10 Callout blokovi

Četiri tipa, i nijedan više:

| Tip | Kada | Vizuelno |
|---|---|---|
| **Informacija** | Dodatni kontekst | Leva ivica petrol, svetla pozadina |
| **Oprez** | Nešto može izmeniti tumačenje | Leva ivica zemljano žuta |
| **Važno** | Ključno za bezbednost | Leva ivica tamno plavo-siva, blago naglašena pozadina |
| **Pitanja za lekara** | Standardni blok na kraju | Isprekidana ivica, ikona štampanja |

Bez ikone upozorenja sa uzvičnikom u trouglu. Bez crvene. Maksimalno dva callout-a po članku — inače gube efekat.

### 6.11 CTA

| Nivo | Izgled |
|---|---|
| **Primarni** | Puno dugme, terakota, beli tekst, radijus 6px, padding 14/28px, bez senke, bez gradijenta |
| **Sekundarni** | Obrub petrol, providna pozadina |
| **Tekstualni** | Petrol tekst sa strelicom, podvučen pri prelazu |

Tekst dugmeta je **glagol iz perspektive korisnika**: „Pošaljite mi vodič" radi bolje od „Prijavite se". Nikada „Klikni ovde", nikada uzvičnici, nikada velika slova.

Ispod primarnog CTA uvek stoji jedan red mikrokopije koji uklanja strepnju („Bez reklama. Odjava u jednom kliku.").

### 6.12 Pokret

Minimalan. Prelaz boje 150ms, otvaranje sklopivih elemenata 200ms. **Bez animacija pri skrolovanju, bez paralakse, bez pojavljivanja elemenata.** `prefers-reduced-motion` isključuje sve.

Razlog nije samo pristupačnost: pokret signalizira „marketing". Odsustvo pokreta signalizira „dokument".

---

## 7. Mobile UX

### 7.1 Realnost saobraćaja

Za zdravstvene teme na domaćem tržištu očekuje se **70–80% mobilnog saobraćaja**, sa dva izražena vrhunca: kasno uveče (22–01h, „ne mogu da spavam od brige") i odmah posle preuzimanja nalaza. Značajan deo publike su osobe 45–60 godina, često sa uvećanim sistemskim fontom na telefonu.

Zaključak: mobilni nije adaptacija desktop verzije. **Mobilni je primarni proizvod**, a desktop je proširena verzija.

### 7.2 Prvi ekran (375 × 667px, najmanji realan uređaj)

Mora stati: naslov (max 3 reda), potpis recenzenta sa kvalifikacijom, datum poslednje provere, prve dve rečenice odgovora.

Ne sme se pojaviti: nijedan popup, nijedna lepljiva traka, nijedan zahtev za obaveštenja, nijedna reklama, banner za kolačiće koji pokriva sadržaj (dizajniran kao donja traka koja zauzima najviše 25% ekrana).

### 7.3 Prilagođavanja po elementu

| Element | Rešenje na mobilnom |
|---|---|
| **Navigacija** | Lepljivo zaglavlje visine 56px sa logom, pretragom i menijem. Meni se otvara preko celog ekrana sa velikim ciljevima dodira. |
| **Sadržaj članka** | Sklopiv blok odmah ispod ključnih zaključaka, zatvoren podrazumevano |
| **Tabele** | Sa 3+ kolone pretvaraju se u vertikalne kartice („HbA1c 5,7–6,4% → Predijabetes → Razgovor s lekarom"). **Nikada horizontalno skrolovanje.** |
| **Ilustracije** | Puna širina, tap otvara uvećani prikaz sa mogućnošću zumiranja |
| **Traka teme** | Ostaje — na mobilnom je još važnija jer nema bočne navigacije |
| **CTA** | Puna širina, visina 52px, u toku sadržaja. Nikada lepljivo na dnu. |
| **Forma** | `type="email"` da telefon otvori odgovarajuću tastaturu, `autocomplete="email"`, polje visine 52px |
| **Rečnik pojmova** | Tap otvara panel odozdo, ne prelaz mišem |
| **Pitanja za lekara** | Dodatno dugme „Podelite" pored „Štampajte" — realno se šalje sebi u poruke, ne štampa |
| **Povezani sadržaj** | Vertikalna lista, ne horizontalni karusel (karusel se ne primeti) |
| **Izvori** | Sklopivo, zatvoreno podrazumevano, sa brojem („Izvori (7)") — vidljivo je da postoje, ne troše ekran |

### 7.4 Ciljevi dodira i ergonomija

Minimum 44 × 44px za svaki interaktivni element, sa razmakom od najmanje 8px. Primarne radnje u donjoj polovini ekrana gde palac lako stiže. Bez horizontalnih pokreta prstom kao jedinog načina interakcije.

### 7.5 Performanse na mobilnom

Realan uslov: sporija mreža i stariji Android uređaji. Budžet: LCP ispod 2,0s na 4G, ukupna težina prve stranice ispod 500KB, JavaScript ispod 100KB. Slike u WebP/AVIF sa odgovarajućim `srcset`, odloženo učitavanje svega ispod prvog ekrana, font sa `display: swap` i lokalno hostovan.

### 7.6 Noćni režim

**[ODLUKA]** Preporuka: da, u v2. Značajan deo saobraćaja dolazi kasno uveče, od zabrinutih ljudi, u zamračenoj sobi. Tamna tema tu nije estetski dodatak nego obzir. Paleta se priprema sa tom mogućnošću (semantički tokeni, ne fiksne vrednosti boja).

---

## 8. Accessibility

### 8.1 Zašto ovde nije formalnost

Ciljna publika uključuje osobe sa dijabetesnom retinopatijom, starije korisnike sa smanjenom preciznošću dodira i osobe koje čitaju na jarkom svetlu ili kasno uveče umornih očiju. Pristupačnost ovde direktno preklapa se sa osnovnom upotrebljivošću za veliki deo publike.

Standard: **WCAG 2.1 nivo AA**, kao ulazni uslov za svaku komponentu, ne kao naknadna revizija.

### 8.2 Konkretne obaveze

| Oblast | Zahtev |
|---|---|
| **Kontrast** | 4,5:1 za tekst, 3:1 za veliki tekst i elemente korisničkog interfejsa. Paleta iz 6.2 projektovana je da prolazi. |
| **Boja kao informacija** | Nikada jedini nosilac značenja. Referentne vrednosti imaju tekstualnu oznaku, ne samo boju. |
| **Tastatura** | Sve dostupno bez miša, logičan redosled fokusa, vidljiv okvir fokusa (2px, ne uklanjati podrazumevani bez zamene), „preskoči na sadržaj" link. |
| **Čitači ekrana** | Semantički HTML, jedan `h1`, hijerarhija naslova bez preskakanja, `alt` opis obavezan (sistem blokira snimanje slike bez njega), landmark uloge, `aria-expanded` na sklopivim elementima. |
| **Opisi slika** | Kod objašnjavajućih ilustracija `alt` nije naziv nego **prenos informacije**: ne „dijagram insulina" nego „Insulin se vezuje za receptor i otvara ulaz glukoze u ćeliju." |
| **Uvećanje** | Do 200% bez horizontalnog skrolovanja i gubitka sadržaja. Sve mere u relativnim jedinicama. |
| **Pokret** | `prefers-reduced-motion` isključuje sve prelaze. |
| **Forme** | Vidljive oznake polja (ne samo placeholder), greške opisane tekstom i povezane sa poljem, poruke o grešci na srpskom i konkretne. |
| **Jezik** | `lang="sr-Latn-RS"` — bitno za pravilan izgovor kod čitača ekrana. |
| **Vreme** | Bez vremenskih ograničenja bilo gde. |

### 8.3 Kognitivna pristupačnost

Često zanemarena, a ovde presudna — korisnik je pod stresom, a stres smanjuje radnu memoriju:

- kratke rečenice, jedna ideja po pasusu;
- ključni zaključci na vrhu, da se poruka dobije i bez čitanja celine;
- dosledan raspored — svaki članak izgleda isto, pa se ne troši pažnja na orijentaciju;
- termini objašnjeni na mestu upotrebe;
- bez žargona bez prevoda;
- jasan sledeći korak na kraju svake stranice.

### 8.4 Provera

Automatski (axe-core u CI-ju, Lighthouse) hvata oko 30–40% problema. Zato i ručno: navigacija samo tastaturom kroz ključne tokove pre svakog izdanja, provera čitačem ekrana (NVDA/VoiceOver) na članku i formi, provera pri uvećanju od 200%, simulacija daltonizma na svim grafikonima i tabelama.

---

## 9. Trust System

> Ovo je najvažnija sekcija dokumenta. Sve ostalo je izvedivo za bilo koga sa budžetom. Ovo je jedino što se ne može kopirati.

### 9.1 Zašto je poverenje jedini pravi proizvod

Na domaćem tržištu zdravstvenog sadržaja skoro niko ne pokazuje ko piše, ko proverava i odakle informacija dolazi. Portali objavljuju tekstove „redakcije". Prodajni sajtovi se predstavljaju kao edukativni. Forumi nose iskustvo bez konteksta.

U takvom okruženju **transparentnost nije etička obaveza nego konkurentska prednost koju niko ne koristi.**

Sistem poverenja ima pet slojeva, i svaki mora biti vidljiv, ne samo prisutan.

### 9.2 Sloj 1 — Dr Snežana Bivolarević kao lice platforme

Ovo je najveća neiskorišćena prednost projekta i mora se koristiti maksimalno, ali dostojanstveno.

**Šta imamo:**

| Element | Vrednost |
|---|---|
| Specijalista opšte medicine | Idealna specijalnost za ovu platformu — opšta medicina je upravo mesto gde se metabolički poremećaji prvi put prepoznaju, i lekar opšte prakse je onaj s kim korisnik zapravo razgovara |
| Subspecijalista bolesti zavisnosti | **Neočekivana i vrlo relevantna prednost** — vidi 9.3 |
| Gotovo 40 godina kliničke prakse | Retko i neosporivo. Ne može se ubrzati ni kupiti. |
| Osnivač CMZ | Platforma nije korporativni projekat sa unajmljenim licem |

**Gde je vidljiva:**

1. Hero početne stranice — fotografija, ime, kvalifikacija.
2. Traka poverenja na vrhu svakog članka — „Stručno proverila: Dr Snežana Bivolarević".
3. Kartica na dnu članka — fotografija, pune kvalifikacije, dužina prakse.
4. Puna stranica profila `/strucni-recenzenti/snezana-bivolarevic/` — biografija, obrazovanje, pristup radu, šta znači njena uloga u recenziji.
5. Pošiljalac svake email poruke.
6. Strukturirani podaci `Person` sa `hasCredential` — signal i za pretraživače i za AI odgovore.

**Kako se prikazuje:** dostojanstveno i suzdržano. Bez superlativa („vodeći stručnjak", „najbolji"), bez guru pozicioniranja, bez fotografija sa prekrštenim rukama ispred bele pozadine. Fotografija u realnom okruženju, pogled u kameru, bez osmeha iz reklame. Biografija u trećem licu, činjenično.

**Šta se nikada ne radi:** ne koristi se njeno ime uz bilo kakav proizvod, terapiju ili komercijalnu preporuku. Njena verodostojnost je kapital platforme i troši se samo na sadržaj.

### 9.3 Subspecijalizacija iz bolesti zavisnosti kao strateški diferencijator

Ovo zaslužuje poseban tretman jer je najneobičnija prednost projekta.

Metaboličko zdravlje je, u praksi, **problem trajne promene ponašanja**, a ne problem informisanosti. Svako zna da treba manje slatkiša i više kretanja. Znanje nije usko grlo. Usko grlo su obrasci: automatsko jedenje pod stresom, ciklusi restrikcije i prejedanja, sram posle „pada", odustajanje posle prvog prekida.

Lekar sa subspecijalizacijom iz bolesti zavisnosti razume te obrasce profesionalno, kroz rad sa najtežim slučajevima promene ponašanja. To donosi tri stvari koje konkurencija nema:

1. **Autentičan pristup bez osuđivanja.** Odsustvo krivice u tonu nije marketinška odluka nego klinički stav.
2. **Razumevanje recidiva kao dela procesa.** Sadržaj može otvoreno govoriti o tome šta raditi posle prekida — teme koje wellness sadržaj izbegava jer kvari priču o uspehu.
3. **Kompetencija za teme koje drugi ne diraju** — emocionalno jedenje, odnos stresa i ponašanja u ishrani, zašto motivacija nije dovoljna.

**Važno ograničenje:** ne tvrdimo da je hrana zavisnost. To je naučno sporno pitanje i preterana tvrdnja bi ugrozila kredibilitet. Formulacija koja stoji: *promena ustaljenih obrazaca ponašanja je težak proces, i postoji struka koja se time bavi ozbiljno.* Razlika je suštinska.

Ovo postaje zaseban sadržajni klaster u v2 („Ponašanje i navike") i predstavlja odbrambeni jarak koji konkurent sa budžetom ne može preskočiti — jer ne može kupiti 40 godina kliničkog iskustva u toj oblasti.

### 9.4 Sloj 2 — CMZ kao institucionalni okvir

**Edukativni studio — Centar za metaboličko zdravlje (CMZ)** daje platformi institucionalni identitet: sadržaj ne dolazi od pojedinca sa blogom nego od organizacije sa svrhom.

Kako se koristi: puno ime u podnožju i na stranici „O nama", skraćenica u navigaciji i uz potpise; `Organization` strukturirani podaci; jasno objašnjeno šta CMZ jeste — edukativni studio, **ne zdravstvena ustanova, ne ordinacija, ne mesto gde se pružaju zdravstvene usluge.**

**Kritična razlika koju treba dosledno sprovoditi:** formulacije moraju izbeći svaki utisak da CMZ pruža zdravstvenu zaštitu, postavlja dijagnoze ili leči. „Edukativni studio" je precizan i tačan termin i treba ga koristiti dosledno, jer štiti i korisnika i platformu. Ovo takođe treba da bude deo pravnog pregleda (**[ODLUKA]** iz dokumenta 01).

Stranica `/o-nama/` treba da odgovori na četiri pitanja: šta je CMZ, ko ga vodi, zašto postoji, kako se finansira (poslednje — kada se pravno definiše).

### 9.5 Sloj 3 — Transparentnost procesa

Većina sajtova tvrdi da je pouzdana. Mi **pokazujemo kako nastaje sadržaj.**

Stranica `/urednicka-politika/` sadrži:

1. **Kako biramo teme** — iz stvarnih pitanja korisnika, interne pretrage i kliničkog iskustva.
2. **Koje izvore koristimo i kojim redosledom** — SZO, ADA, EASD, NICE, Cochrane, recenzirani časopisi. Nikada drugi blogovi, nikada sajtovi proizvođača.
3. **Ko piše i ko proverava** — imenom i kvalifikacijom.
4. **Šta znači stručna recenzija** — konkretno: provera tačnosti tvrdnji, usklađenosti sa smernicama i odsustva navođenja na samolečenje.
5. **Kako ispravljamo greške** — vidi 9.7.
6. **Kada ažuriramo** — na 18 meseci ili ranije uz promenu smernica.
7. **Šta nikada ne radimo** — ne dajemo individualne savete, ne preporučujemo lekove ni doze, ne objavljujemo plaćeni sadržaj bez oznake, ne prodajemo podatke.

Isti proces prikazan je grafički na početnoj (sekcija ⑦), jer većina ljudi neće otvoriti punu stranicu.

### 9.6 Sloj 4 — Izvori i intelektualno poštenje

| Praksa | Zašto je važna |
|---|---|
| Izvori uz svaki članak, sa godinom | Osnovni higijenski minimum koji većina ne ispunjava |
| Inline oznake kod specifičnih tvrdnji | Pokazuje da izvori nisu ukras nego osnova |
| **Sekcija „Šta se ne zna sa sigurnošću"** | Najjači signal poštenja. Priznanje granice znanja povećava, ne smanjuje, poverenje. |
| **Navođenje kada se smernice razlikuju** | ADA i EASD se u pojedinim preporukama razlikuju — reći to je znak ozbiljnosti |
| Bez preterivanja u zaključcima | „Studije ukazuju" umesto „dokazano je" kada dokazi to ne podnose |
| Datum poslednje provere na svakoj stranici | Rešava najveći problem zdravstvenog sadržaja — tihu zastarelost |
| Vidljiva oznaka kada je tekst star | Bolje priznati nego se pretvarati |

Sekcija „Šta se ne zna sa sigurnošću" je namerno neuobičajena. Nijedan konkurent je nema, jer deluje kao slabost. Zapravo je najsnažniji dokaz da nam nije cilj da prodamo sigurnost koju nemamo.

### 9.7 Sloj 5 — Ispravke i odgovornost

**Politika ispravki** (retka na domaćem tržištu, standard u ozbiljnom novinarstvu):

- svaka stranica ima diskretan link „Prijavite netačnost";
- prijave pregleda stručni urednik u roku od 7 dana;
- suštinske ispravke se beleže vidljivo na dnu članka sa datumom i opisom promene;
- pravopisne i stilske ispravke se ne beleže;
- javna arhiva ispravki na `/urednicka-politika/ispravke/`.

Efekat je protivintuitivan: javna evidencija ispravki **povećava** poverenje, jer dokazuje da neko zaista proverava. Sajt bez ijedne ispravke u dve godine je ili savršen ili ne gleda.

### 9.8 Signali poverenja po stranici — pregled

| Signal | Početna | Članak | Pillar | Vodič | Pravne |
|---|---|---|---|---|---|
| Ime i kvalifikacija recenzenta | ✓ hero | ✓ vrh + dno | ✓ vrh | ✓ | — |
| Datum poslednje provere | — | ✓ | ✓ | ✓ | ✓ verzija |
| Izvori | — | ✓ | ✓ | ✓ | — |
| Medicinski disclaimer | ✓ podnožje | ✓ dno | ✓ dno | ✓ | ✓ |
| Link na uređivačku politiku | ✓ | ✓ | ✓ | ✓ | ✓ |
| Identitet CMZ | ✓ | ✓ podnožje | ✓ podnožje | ✓ | ✓ |
| „Prijavite netačnost" | — | ✓ | ✓ | — | — |
| Bez reklama i praćenja trećih strana | ✓ | ✓ | ✓ | ✓ | ✓ |

### 9.9 Čega se čuvamo

Poverenje se gradi godinama, a gubi jednim potezom. Konkretne zamke:

| Rizik | Zaštita |
|---|---|
| Prvi komercijalni link deluje kao izdaja | Uvodi se tek posle 12+ meseci, uz vidljivo obelodanjivanje i objašnjenje na stranici transparentnosti — pre nego što se pojavi |
| Tekst koji zvuči kao prodaja | Uređivački zid iz dokumenta 01: nijedan članak se ne piše zbog destinacije |
| Zastareo sadržaj | `nextReviewDate` + vidljiv datum + lista za ponovnu recenziju |
| Preterana tvrdnja pod pritiskom saobraćaja | Recenzija je obavezna kapija, ne preporuka |
| Ime lekara na nečemu komercijalnom | Apsolutna zabrana |
| Anonimni sadržaj kad se poveća obim | Svaki tekst ima autora i recenzenta. Nikada „redakcija". |

---

## 10. Future Roadmap

Dve godine, četiri verzije. Svaka verzija ima jedno pitanje na koje odgovara i jasan uslov za prelazak na sledeću.

### v1 — Autoritet (meseci 0–6)

**Pitanje:** Da li možemo napraviti najbolji sadržaj o metaboličkom zdravlju na srpskom jeziku?

| Isporuka | Detalj |
|---|---|
| Dva kompletna klastera | Laboratorijske analize (8 tekstova), insulinska rezistencija (6) |
| 20 FAQ unosa, 30 pojmova rečnika | |
| Prvi vodič + funnel | Double opt-in, 5 poruka |
| Sistem poverenja u punom obimu | Recenzija, izvori, uređivačka politika, ispravke |
| Tehnički temelj | Performanse, pristupačnost, strukturirani podaci |

**Uslov za v2:** 3.000+ organskih sesija mesečno, 300+ potvrđenih pretplatnika, dva klastera kompletna, nula pravnih problema.

**Namerno se NE radi:** kviz, referral, GLP-1, plaćene kampanje, ćirilica, korisnički nalozi, video.

### v2 — Angažman (meseci 6–12)

**Pitanje:** Da li se ljudi vraćaju i da li im možemo pomoći da se snađu?

| Isporuka | Zašto sada |
|---|---|
| **Edukativni kviz** | Baza je dovoljno velika da rezultat vodi u pravi sadržaj; bez skora rizika (dokument 01, sekcija 11) |
| Još 2 klastera | Predijabetes, metabolički sindrom |
| Klaster „Ponašanje i navike" | Iskorišćava subspecijalizaciju Dr Snežane — vidi 9.3 |
| Mesečni newsletter | Prelaz sa sekvence na trajan odnos |
| Noćni režim | Kasnovečernji saobraćaj |
| Interaktivni tumač nalaza (v1) | Korisnik unosi vrednost, dobija objašnjenje opsega. **Bez čuvanja podataka, bez procene rizika.** |
| Referral infrastruktura testirana | Bez ijedne aktivne destinacije |

**Uslov za v3:** 10.000+ sesija mesečno, kviz koristi 15%+ posetilaca, 1.500+ pretplatnika, stopa povratka 20%+.

### v3 — Ekosistem (meseci 12–18)

**Pitanje:** Možemo li od čitalaca napraviti zajednicu i platformu proširiti van sajta?

| Isporuka | Napomena |
|---|---|
| Klaster GLP-1 | **Samo uz pravni pregled**, `editorialTier: sensitive`, bez brendova i poziva na akciju |
| Prve aktivacije referral sistema | Uz punu transparentnost i objašnjenje pre uvođenja |
| Video ili audio format | Dr Snežana objašnjava temu — najviši mogući signal poverenja; kratka forma, bez produkcijskog pretvaranja |
| Segmentirane email putanje | Na osnovu ponašanja, nikada deklarisanog zdravstvenog stanja |
| Sadržaj za zdravstvene radnike | Zaseban sloj — gradi citiranost i profesionalnu reputaciju |
| Ćirilična verzija | **[ODLUKA]** ako podaci pokažu potrebu |

**Uslov za v4:** 25.000+ sesija, prepoznatljivost imena u niši, održiv model finansiranja bez ugrožavanja uređivačke nezavisnosti.

### v4 — Alat (meseci 18–24)

**Pitanje:** Možemo li preći sa čitanja na korišćenje?

| Isporuka | Ograničenje |
|---|---|
| Korisnički nalog (opciono) | Čuvanje sadržaja, praćenje pročitanog. **Nikakav zdravstveni podatak.** |
| Personalizovane putanje učenja | Na osnovu interesovanja, ne dijagnoze |
| Priprema za konsultaciju | Alat koji generiše personalizovanu listu pitanja za lekara — prirodan vrhunac cele filozofije platforme |
| Regionalno proširenje | BiH, Crna Gora, Hrvatska — isti jezik, ista praznina u sadržaju |
| Saradnje sa strukom | Gostujući recenzenti (endokrinolog, hepatolog) za specifične klastere |
| Otvoreni podaci ili istraživanje | Anonimizovani uvidi o tome šta ljudi pitaju — vredan doprinos struci i snažan izvor citiranosti |

**Napomena o v4:** korisnički nalozi menjaju pravni profil platforme (obrada podataka, bezbednost, obaveze). Pre ulaska u v4 obavezan je novi pravni pregled.

### Šta se ne planira ni u jednoj verziji

Prodaja proizvoda direktno na platformi. Zakazivanje pregleda. Telemedicina. Bilo kakva funkcija koja daje individualnu medicinsku procenu. Reklame trećih strana. Prodaja ili ustupanje korisničkih podataka.

Ove granice su deo identiteta, ne privremeno ograničenje.

---

## 11. 20 ideja

> Dvadeset odluka koje ovaj sajt čine boljim od 99% zdravstvenih sajtova u regionu. Poređane po odnosu efekta i uloženog truda.

### Poverenje i verodostojnost

**1. Recenzent na vrhu, ne na dnu.**
Svi sajtovi (oni koji uopšte imaju recenzenta) guraju ga na dno gde ga niko ne vidi. Ime i kvalifikacija Dr Snežane stoje odmah ispod naslova, gde se odluka o poverenju zapravo donosi. Najjeftinija promena sa najvećim efektom u celom dokumentu.

**2. Sekcija „Šta se ne zna sa sigurnošću".**
Otvoreno navođenje granica dokaza u svakom članku gde postoje. Nijedan konkurent to ne radi jer deluje kao slabost. Zapravo je najsnažniji dokaz da nam nije cilj prodati sigurnost koju nemamo.

**3. Javna arhiva ispravki.**
Standard u ozbiljnom novinarstvu, nepoznat u domaćem zdravstvenom sadržaju. Vidljiva evidencija ispravki dokazuje da neko zaista proverava.

**4. Datum poslednje provere umesto datuma objave.**
Rešava najveći tihi problem zdravstvenog sadržaja. Uz to i vidljiva oznaka kada je tekst prešao rok provere — priznanje umesto pretvaranja.

**5. „Kako nastaje ovaj sadržaj" u četiri koraka na početnoj.**
Ne tvrdnja o kvalitetu nego prikaz procesa. Konkretno pobija apstraktno.

**6. Nula reklama i nula praćenja trećih strana — i to izgovoreno naglas.**
Dok traje, ovo je merljiva razlika u odnosu na sve portale. „Bez reklama" u traci poverenja je istinita tvrdnja koju konkurencija ne može ponoviti.

### Sadržaj i uredništvo

**7. Blok „Pitanja za vašeg lekara" u svakom članku, sa opcijom štampe i deljenja.**
Pretvara pasivno čitanje u konkretnu korist na sledećem pregledu. Istovremeno najbezbednija moguća pozicija sa compliance strane: ne dajemo savet, poboljšavamo konsultaciju. Ovo je potencijalno najdeljeniji element sajta.

**8. Direktan odgovor u prve dve rečenice, bez uvoda.**
Suprotno domaćem standardu („Metabolizam je složen proces koji…"). Poštuje vreme uznemirenog čoveka i istovremeno je optimalno za prikaz u rezultatima pretrage i AI odgovorima.

**9. Vizuelni tumač laboratorijskog nalaza.**
Anonimizovan prikaz stvarnog nalaza sa objašnjenim poljima. Korisnik prepoznaje sopstveni papir. Nijedan domaći sajt ovo nema, a to je tačno ono što osoba drži u ruci dok pretražuje.

**10. Formulacija koja skida krivicu, dosledno.**
Gojaznost i insulinska rezistencija tretiraju se kao fiziološka stanja, nikada kao pitanje volje. Emocionalno najvažniji trenutak u celom korisničkom iskustvu — i razlog zbog kojeg se ljudi vraćaju.

**11. Klaster o ponašanju i navikama, zasnovan na subspecijalizaciji iz bolesti zavisnosti.**
Teme koje wellness sadržaj izbegava jer kvare priču o uspehu: šta posle prekida, zašto motivacija nije dovoljna, emocionalno jedenje. Odbrambeni jarak koji se ne može kupiti budžetom.

**12. Rečnik pojmova sa objašnjenjem na mestu upotrebe.**
Termin se ne izbegava nego objašnjava. Korisnik koji nauči termin bolje razgovara sa lekarom — što je i deklarisana svrha platforme.

**13. Kompletan klaster pre prelaska na sledeći.**
Jedan klaster sa 8 tekstova, pillar-om, FAQ-om i rečnikom pobeđuje tri polovična. Najčešća greška domaćih sajtova je širina bez dubine.

### Iskustvo i dizajn

**14. Navigacija po situaciji, ne po dijagnozi.**
„Dobio sam nalaz koji ne razumem" umesto „Metabolički sindrom". Ljudi se prepoznaju u situacijama, ne u medicinskim terminima. Ovo je i preteča kviza i najbolja segmentacija bez ijednog postavljenog pitanja.

**15. Traka teme na svakom članku.**
Pošto 90% saobraćaja ulazi bočno iz pretrage, jedna traka koja kaže „ovo je deo teme sa 6 tekstova" pretvara slučajnu posetu u istraživanje strukture. Najveći uticaj na dubinu sesije od svih navigacionih elemenata.

**16. Tabele koje se na mobilnom pretvaraju u kartice.**
Referentne vrednosti su srž sadržaja, a 75% korisnika ih gleda na telefonu. Horizontalno skrolovanje tabele je mesto gde konkurencija masovno gubi korisnika.

**17. Tipografija projektovana za srpski jezik i stariju publiku.**
Provera kvaliteta znakova `č ć š ž đ Đ` pre izbora fonta, veličina osnovnog teksta 18px, prored 1,7, širina reda do 72 znaka. Zvuči sitno, a odlučuje da li će neko od 55 godina pročitati tekst do kraja.

**18. Nema crvene boje i nema semaforske logike.**
Ni u tabelama, ni u callout blokovima. Crvena aktivira alarm kod publike koja je već uznemirena, a semaforska logika je usput i nepristupačna za daltoniste (8% muškaraca — a muškarci 40–60 su ceo jedan segment).

### Funnel i odnos

**19. Odeljak „za koga ovaj vodič NIJE" na landing stranici.**
Protivintuitivno podiže i konverziju i kvalitet — signalizira poštenje i preduhitruje razočaranje. Retko ko se usuđuje da suzi ponudu, a upravo to gradi poverenje.

**20. Email poruke koje šalje lekar, ne „tim".**
Pošiljalac je Dr Snežana Bivolarević. Peta poruka traži odgovor i odgovori se stvarno čitaju — što podiže isporučivost i daje najbolji mogući izvor za planiranje sledećih tema. Newsletter prestaje da bude kanal i postaje razgovor.

---

## Prilog — Šta je urađeno u okviru ovog zadatka

- Kreirana grana `docs/02-product-and-ux-blueprint`.
- Kreiran ovaj dokument.
- **Nije** pisan produkcioni kod, nije kreiran Next.js projekat, nisu generisane stranice, nije postavljen CMS, nije pokrenut deployment, nije menjan DNS, nisu aktivirani plaćeni servisi, nije objavljen medicinski sadržaj, nije mergovano u `main`.

## Prilog — Odluke iz ovog dokumenta koje čekaju vlasnika

1. Potvrda pravca palete boja (sekcija 6.2) ili zahtev za alternativne predloge.
2. Izbor fonta iz predloženih parova (6.3) — uz obaveznu proveru kvaliteta srpske dijakritike.
3. Fotografija Dr Snežane: profesionalno snimanje u realnom okruženju — ko i kada.
4. Saglasnost za javno objavljivanje pune biografije i kvalifikacija.
5. Potvrda formulacije „Edukativni studio — Centar za metaboličko zdravlje" u pravnim tekstovima, uz pravni pregled razlike u odnosu na zdravstvenu ustanovu.
6. Noćni režim u v2 — da ili ne.
7. Prvi vodič: tačan naslov i obim (predlog: 14–18 strana).
