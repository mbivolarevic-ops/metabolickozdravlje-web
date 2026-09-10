/**
 * Činjenice za privatni partnerski preview.
 *
 * ⛔ OVO NIJE MEDICINSKI SADRŽAJ. U ovom modulu nema nijednog laboratorijskog
 * praga, referentne vrednosti, preporuke ni tvrdnje o zdravstvenom ishodu, i
 * ne sme ih biti. Naslovi poglavlja su neutralni nazivi tema — ne iznose šta
 * je tačno ni šta čitalac treba da radi.
 *
 * Ovde stoje samo vrednosti koje je vlasnik pisano potvrdio (poslovni podaci,
 * cena, radni naslov vodiča, planirani autor) i uređivački opisi procesa.
 * Demo sadržaj za vizuelni prikaz tema živi odvojeno, u `previewDemo.ts`.
 *
 * Sve je namerno u jednom serverskom modulu, bez promenljivih okruženja: cena
 * i identitet prodavca ne smeju da se razlikuju između stranica ni između
 * sredina. Kada se vrednost menja, menja se ovde, na jednom mestu.
 */

/* ==========================================================================
   Oznake preview-a
   ========================================================================== */

/**
 * Oznaka koja stoji na vrhu svake nove preview stranice.
 *
 * Ne skraćuje se i ne premešta u podnožje. Njena jedina svrha je da niko ko
 * vidi ekran — vlasnik, partner, slučajni posmatrač — ne pomisli da gleda
 * objavljen sajt.
 */
export const PREVIEW_BADGE = "PARTNERSKI PREVIEW — NIJE ZA JAVNU OBJAVU";

/** Dodatna napomena na stranici vodiča, uz oznaku iznad. */
export const GUIDE_REVIEW_NOTICE =
  "Radni sadržaj čeka pregled autora i medicinsku recenziju.";

/* ==========================================================================
   Poslovni identitet — potvrđeni podaci (ADR-0008)
   ========================================================================== */

/** Pravno ime prodavca, kako je zavedeno. */
export const SELLER_LEGAL_NAME = "Edukativni Centar CMZ PR Snezana Bivolarevic";

/** Poreski identifikacioni broj. */
export const SELLER_TAX_ID = "115841920";

/** Matični broj. */
export const SELLER_REGISTRATION_NUMBER = "68681375";

/* ==========================================================================
   Planirani autor
   ========================================================================== */

/**
 * ⛔ Dr Snežana je PLANIRANI autor, ne potvrđeni.
 *
 * Dok ne pregleda i pisano ne prihvati sadržaj, nigde ne sme stajati „Autor:“,
 * „Tekst napisala“, „medicinski odobreno“ ni „stručno recenzirano“. Razlika
 * nije formalna: potpis nosi odgovornost, a odgovornost se ne pretpostavlja.
 *
 * Navedena su isključivo tri podatka koja je vlasnik dostavio. Radno mesto,
 * godine iskustva, članstva, nagrade i fotografija se NE dodaju.
 */
export const PLANNED_AUTHOR = {
  name: "dr Snežana Bivolarević",
  credentials: [
    "specijalista opšte medicine",
    "subspecijalista bolesti zavisnosti",
  ],
  /** Status koji se prikazuje uvek uz ime. */
  status: "Planirani autor",
  statusNote:
    "Sadržaj je u radnoj fazi i još nije pregledan ni odobren od strane autora.",
} as const;

/* ==========================================================================
   Flagship vodič — radni podaci
   ========================================================================== */

/** Cena u dinarima. Jedini brojčani izvor — sve stranice čitaju odavde. */
export const GUIDE_PRICE_RSD = 1999;

/** Valuta, kako se prikazuje korisniku. */
export const GUIDE_PRICE_CURRENCY = "RSD";

/**
 * Formatira ceo broj dinara sa tačkom kao razdelnikom hiljada („1.999“).
 *
 * Namerno bez `Intl.NumberFormat`: izlaz mora biti isti u svakom Node buildu i
 * u testu, bez obzira na to koji je ICU skup ugrađen. Za jedan ceo broj bez
 * decimala ovo je i kraće i predvidljivije.
 */
function formatRsd(amount: number): string {
  return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** Cena spremna za prikaz, npr. „1.999 RSD“. */
export const GUIDE_PRICE_LABEL = `${formatRsd(GUIDE_PRICE_RSD)} ${GUIDE_PRICE_CURRENCY}`;

/** Radni naslov i podnaslov — menjaju se tek kada ih autor potvrdi. */
export const GUIDE_WORKING_TITLE =
  "Metaboličko zdravlje — vodič za razumevanje glukoze, insulina i ključnih pokazatelja";

export const GUIDE_WORKING_SUBTITLE =
  "Od osnovnih pojmova do boljih pitanja za razgovor sa lekarom.";

/** Status proizvoda. Nije „uskoro“ i nije datum — datum lansiranja ne postoji. */
export const GUIDE_STATUS = "U pripremi";

/** Ruta stranice vodiča. Na jednom mestu, da se linkovi ne raziđu. */
export const GUIDE_PATH = "/vodic/metabolicko-zdravlje";

/**
 * Naslovi šesnaest poglavlja, redom.
 *
 * ⛔ Samo naslovi. Bez sadržaja, sažetaka, brojeva i zaključaka — ovo je
 * prikaz obima, ne prikaz tvrdnji.
 */
export const GUIDE_CHAPTERS = [
  "Šta je metaboličko zdravlje",
  "Energija i telo: odakle glukoza dolazi",
  "Insulin: šta radi i zašto je važan",
  "Kada odgovor na insulin oslabi",
  "Glukoza u krvi: šta broj kaže, a šta ne",
  "HbA1c: prosek umesto trenutka",
  "OGTT i drugi testovi",
  "Krvni pritisak",
  "Lipidi i kardiometabolički rizik",
  "Telesna masa, obim struka i šta BMI ne vidi",
  "Šta na metaboličko zdravlje utiče",
  "Kako se pripremiti za razgovor sa lekarom",
  "Kada se javiti lekaru bez odlaganja",
  "Kako čitati laboratorijski nalaz",
  "Česti nesporazumi",
  "Šta ovaj vodič ne može, i zašto je to važno",
] as const;

/**
 * Šta čitalac treba da razume posle čitanja.
 *
 * Formulisano kao PITANJA na koja vodič odgovara, ne kao tvrdnje o tome šta je
 * tačno. Razlika je namerna: opis obima nije medicinska izjava.
 */
export const GUIDE_LEARNING_GOALS = [
  "Šta znači „metaboličko zdravlje“ i zašto se pokazatelji posmatraju zajedno.",
  "Po čemu se razlikuju glukoza, insulin i insulinska rezistencija.",
  "Šta pojedini pokazatelj meri, a šta iz njega ne može da se pročita.",
  "Zašto isti nalaz kod dve osobe ne mora da znači isto.",
  "Kako se pripremiti za razgovor sa lekarom i koja pitanja poneti.",
  "Kako prepoznati sadržaj koji prodaje umesto da objašnjava.",
] as const;

/** Šta vodič jeste. */
export const GUIDE_IS = [
  "Edukativni materijal napisan običnim jezikom.",
  "Objašnjenje pojmova koji se javljaju na nalazu.",
  "Priprema za razgovor sa zdravstvenim radnikom.",
  "Materijal sa navedenim izvorima.",
] as const;

/** Šta vodič nije. Ova lista je važnija od prethodne i ne skraćuje se. */
export const GUIDE_IS_NOT = [
  "Nije zamena za pregled, dijagnozu ni terapiju.",
  "Ne tumači vaš konkretan nalaz.",
  "Ne daje plan ishrane ni plan terapije.",
  "Ne obećava zdravstveni ishod.",
] as const;

/* ==========================================================================
   Uređivački proces
   ========================================================================== */

/**
 * Koraci medicinske provere.
 *
 * Opisuju postupak koji je planiran, u budućem vremenu. Nijedan korak se ne
 * predstavlja kao završen — za prikazani vodič nije.
 */
export const REVIEW_STEPS = [
  {
    title: "Popis medicinskih tvrdnji",
    description:
      "Iz teksta se izdvaja svaka tvrdnja koja dodiruje zdravlje i dobija svoju oznaku.",
  },
  {
    title: "Povezivanje sa izvorima",
    description:
      "Uz svaku tvrdnju se navodi izvor na koji se oslanja, sa datumom pristupa.",
  },
  {
    title: "Pregled autora",
    description:
      "Autor prolazi kroz tekst rečenicu po rečenicu i pisano prihvata ono što stoji.",
  },
  {
    title: "Pregled medicinskog recenzenta",
    description:
      "Recenzent proverava tvrdnje prema izvorima i formulacije prema nivou dokaza.",
  },
  {
    title: "Evidentiranje datuma",
    description:
      "Uz tekst se beleži datum poslednje stručne provere, vidljiv čitaocu.",
  },
  {
    title: "Ponovni pregled posle izmena",
    description:
      "Svaka materijalna izmena vraća tekst na proveru. Datum se tada pomera.",
  },
] as const;

/**
 * Načela uređivačke politike.
 *
 * Svako načelo opisuje pravilo koje sistem već sprovodi ili koje je zapisano u
 * projektnim dokumentima. Ništa iznad toga se ne tvrdi.
 */
export const EDITORIAL_PRINCIPLES = [
  {
    title: "Autorstvo i odgovornost",
    description:
      "Svaki tekst ima imenovanog autora. Odgovornost za medicinsku tvrdnju nosi osoba sa licencom, ne redakcija i ne alat.",
  },
  {
    title: "Izvori",
    description:
      "Tvrdnja bez izvora se ne objavljuje. Izvori se navode uz tekst, tako da se mogu proveriti.",
  },
  {
    title: "Medicinska provera",
    description:
      "Medicinski sadržaj ne izlazi bez imenovanog recenzenta i datuma provere.",
  },
  {
    title: "Ispravke i ažuriranje",
    description:
      "Greška se ispravlja vidljivo, a ne tiho. Uz tekst se vidi kada je poslednji put proveren.",
  },
  {
    title: "Edukacija nije individualni savet",
    description:
      "Tekstovi objašnjavaju pojmove. Ne postavljaju dijagnozu, ne tumače pojedinačan nalaz i ne preporučuju terapiju.",
  },
  {
    title: "Jezik bez stigme",
    description:
      "Jezik koji krivi čitaoca ne prolazi uredničku proveru. To je pravilo, ne stil.",
  },
  {
    title: "Bez referrala i prodaje podataka",
    description:
      "Nema partnerskih linkova, nema prodaje kontakata i nema oglasa za suplemente. Ni uz odobrenje.",
  },
  {
    title: "Urednička nezavisnost",
    description:
      "Sponzor može finansirati nastanak materijala, ali ne određuje medicinski zaključak i nema pravo veta.",
  },
  {
    title: "Transparentno označavanje",
    description:
      "Sponzorisani sadržaj je označen pre nego što ga čitalac pročita, a ne u fusnoti.",
  },
] as const;

/* ==========================================================================
   Sadržaj partnerske prezentacije
   ========================================================================== */

/** Za koga se sadržaj pravi. Opis povoda, ne pripisanog zdravstvenog stanja. */
export const AUDIENCE = [
  {
    title: "Osoba koja je dobila nalaz",
    description:
      "Ima papir sa brojevima i nijednu rečenicu koja objašnjava šta oni znače za nju.",
  },
  {
    title: "Osoba koja je čula pojam",
    description:
      "Naišla je na termin od poznanika ili na internetu i pokušava da razume o čemu je reč.",
  },
  {
    title: "Osoba koja se sprema za pregled",
    description:
      "Želi da iz razgovora sa lekarom izvuče više, a ne zna šta da pita.",
  },
] as const;

/** Načela poverenja koja platforma sprovodi. */
export const TRUST_PRINCIPLES = [
  {
    title: "Imenovan autor i recenzent",
    description:
      "Medicinski tekst se ne prikazuje bez oba imena i bez datuma provere.",
  },
  {
    title: "Navedeni izvori",
    description: "Uz tekst stoje izvori, tako da čitalac može da ih proveri.",
  },
  {
    title: "Priznata nesigurnost",
    description:
      "Kada izvor ne postoji ili nije jednoznačan, to piše — praznina se ne popunjava.",
  },
  {
    title: "Bez stigme",
    description: "Jezik koji krivi čitaoca ne prolazi uredničku proveru.",
  },
  {
    title: "Besplatno ostaje besplatno",
    description:
      "Informacija koja nekome treba da bi razumeo nalaz ili znao da se javi lekaru ne stavlja se iza plaćanja.",
  },
  {
    title: "Bez referrala i oglasa",
    description:
      "Nema partnerskih linkova, prodaje kontakata ni oglasa za suplemente.",
  },
] as const;

/** Poslovni modeli iz ADR-0008. Opis modela, bez brojki i bez projekcija. */
export const BUSINESS_MODELS = [
  {
    title: "Jedan digitalni vodič",
    audience: "B2C",
    description:
      "Prošireni praktični materijal koji se plaća. Jedan proizvod, ne katalog — drugi traži novu odluku vlasnika.",
    status: "U pripremi, čeka medicinsku recenziju",
  },
  {
    title: "Patient Support programi",
    audience: "B2B",
    description:
      "Zasebno ugovoreni edukativni programi, odvojeni od potrošačke prodaje. Ne koriste podatke kupaca vodiča.",
    status: "Mogućnost — nijedan program nije ugovoren",
  },
  {
    title: "Sponzorisani edukativni projekti",
    audience: "B2B",
    description:
      "Sponzor finansira nastanak materijala i biva vidljivo imenovan. Urednička kontrola ostaje kod CMZ-a.",
    status: "Mogućnost — nijedno sponzorstvo nije ugovoreno",
  },
] as const;

/**
 * Faze koje razdvajaju ono što danas postoji od onoga što je pred nama.
 *
 * ⛔ Bez datuma. Datum lansiranja ne postoji, a obećan datum bi bio tvrdnja
 * koju niko ne može da drži — kapije zavise od ljudi izvan projekta.
 */
export const ROADMAP_PHASES = [
  {
    phase: "Preview",
    state: "Trenutno stanje",
    description:
      "Privatni prikaz identiteta, obima vodiča i uređivačkog procesa. Ništa nije objavljeno.",
  },
  {
    phase: "Medicinsko odobrenje",
    state: "Sledeći korak",
    description:
      "Pregled autora, pa medicinskog recenzenta. Bez oba potpisa se ne ide dalje.",
  },
  {
    phase: "Tehnička i pravna priprema",
    state: "Čeka",
    description:
      "Pravni tekstovi, odluka o obradi podataka i naplata prema zvaničnoj dokumentaciji banke.",
  },
  {
    phase: "Javno lansiranje",
    state: "Čeka",
    description:
      "Otvaranje sajta pretraživačima je zasebna odluka vlasnika, posle svih prethodnih kapija.",
  },
] as const;
