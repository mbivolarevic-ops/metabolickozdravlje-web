/**
 * ⛔ DEMO PODACI ZA PREVIEW — NIJE OBJAVLJEN SADRŽAJ.
 *
 * Ovaj modul postoji isključivo da bi partner na ekranu video kako izgleda
 * mreža tema. Nijedan zapis odavde nije prošao uređivački postupak, nema
 * autora, nema recenzenta i nema datum provere.
 *
 * Zato je odvojen u sopstveni fajl, a ne pomešan sa ostalim preview
 * konstantama: razdvajanje je strukturno, ne stvar komentara. Objavljeni
 * sadržaj dolazi isključivo iz Sanity sloja (`src/sanity/`), i ova dva puta se
 * nigde ne sreću.
 *
 * ⛔ Pravila za sadržaj ovog fajla, bez izuzetka:
 *   — nijedna referentna vrednost, prag ni jedinica mere;
 *   — nijedna preporuka, zaključak ni tvrdnja o zdravstvenom ishodu;
 *   — opis je uvek PITANJE na koje budući tekst odgovara, nikada odgovor.
 *
 * ⛔ Ovi podaci se nikada ne upisuju u Sanity, ni u `staging` ni u `production`.
 */

/** Oznaka koju nosi svaka demo kartica. Bez nje se kartica ne prikazuje. */
export const DEMO_BADGE = "Demo sadržaj — nije objavljen";

export type DemoTopicCard = {
  /** Naslov teme, neutralan naziv bez tvrdnje. */
  readonly title: string;
  /** Pitanje na koje budući tekst odgovara. Nikada sam odgovor. */
  readonly question: string;
};

/**
 * Demonstracione kartice tema.
 *
 * Naslovi su preuzeti iz radnog plana sadržaja. Pitanja su napisana tako da
 * pokažu ugao teksta, a da ne iznesu nijedan medicinski zaključak.
 */
export const DEMO_TOPIC_CARDS: readonly DemoTopicCard[] = [
  {
    title: "Šta je metaboličko zdravlje?",
    question: "Zašto se više pokazatelja posmatra zajedno, a ne pojedinačno?",
  },
  {
    title: "Glukoza u krvi",
    question: "Šta se meri kada se meri šećer u krvi, a šta iz toga ne sledi?",
  },
  {
    title: "Insulin i njegova uloga",
    question: "Čemu insulin služi u telu i zašto se o njemu toliko govori?",
  },
  {
    title: "Insulinska rezistencija",
    question: "Šta ovaj pojam znači i odakle dolazi zabuna oko njega?",
  },
  {
    title: "HbA1c",
    question: "Šta ovaj pokazatelj meri i u kom vremenskom okviru?",
  },
  {
    title: "Krvni pritisak",
    question: "Zašto se pritisak posmatra zajedno sa ostalim pokazateljima?",
  },
  {
    title: "Lipidi i kardiometabolički rizik",
    question: "Šta znače stavke na lipidnom nalazu i zašto se ne čitaju same?",
  },
  {
    title: "Razgovor sa lekarom",
    question: "Kako se pripremiti i koja pitanja poneti na pregled?",
  },
];
