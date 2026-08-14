/**
 * Sidra na podnaslovima u telu članka.
 *
 * Jedan izvor istine za `id`-jeve: i sadržaj članka i sam tekst dobijaju ih iz
 * `collectBodyHeadings()`. Dva mesta koja računaju `id` svako za sebe pre ili
 * kasnije se raziđu, a razilaženje se ovde vidi kao link koji ne vodi nigde.
 *
 * Veza između liste i renderovanog naslova je REDNI BROJ BLOKA u telu, ne tekst
 * i ne `_key`. Tekst se ponavlja, a `_key` ne postoji u svakom zapisu (ni model
 * ni `isRenderableBody()` ga ne zahtevaju), pa bi oslanjanje na njega značilo da
 * sidra tiho nestanu za deo članaka.
 *
 * Funkcije su čiste: bez mreže i bez bočnih efekata. Neispravan ulaz daje praznu
 * listu, nikada izuzetak — telo je već prošlo `isRenderableBody()`, pa ovde nema
 * šta da se brani ponovo.
 */

/** Nivoi koje telo sme da renderuje. `h1` nosi naslov stranice (docs/01 §6.6). */
const HEADING_STYLES = ["h2", "h3"] as const;

export type HeadingLevel = (typeof HEADING_STYLES)[number];

export type BodyHeading = {
  /** Pozicija bloka u telu — spoj između sadržaja članka i renderovanog naslova. */
  blockIndex: number;
  level: HeadingLevel;
  text: string;
  id: string;
};

/**
 * „đ“ i „Đ“ nemaju kanonsku dekompoziciju, pa ih NFD ne rastavlja i preostali
 * koraci bi ih obrisali. Zato se preslikavaju unapred; „č ć š ž“ NFD razlaže na
 * osnovno slovo i znak koji se posle uklanja.
 */
const NON_DECOMPOSABLE: Record<string, string> = { đ: "d", Đ: "d" };

/**
 * Kombinujući znakovi koje NFD odvoji od osnovnog slova (kvačica, akut…).
 * Zapisani kao escape sekvence namerno: sirovi kombinujući znak je u editoru
 * nevidljiv i lako ga je pri kopiranju izgubiti a da se ne primeti.
 */
const COMBINING_MARKS = /[\u0300-\u036f]/g;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Tekst podnaslova → deo adrese.
 *
 * Bez dijakritike i bez velikih slova, jer adresa mora ostati čitljiva i
 * prenosiva kroz poruke i dokumente (CLAUDE.md §12). Vraća prazan niz kada od
 * ulaza ne ostane nijedan upotrebljiv znak — pozivalac tada koristi rezervu.
 */
export function slugifyHeading(value: unknown): string {
  if (typeof value !== "string") return "";

  let text = "";
  for (const char of value) {
    text += NON_DECOMPOSABLE[char] ?? char;
  }

  return text
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Spaja tekst iz `children` bloka. Zapisi bez upotrebljivog teksta daju „“. */
function blockText(block: Record<string, unknown>): string {
  const children = block.children;
  if (!Array.isArray(children)) return "";

  let text = "";
  for (const child of children) {
    if (!isRecord(child)) continue;
    if (typeof child.text === "string") text += child.text;
  }

  return text.replace(/\s+/g, " ").trim();
}

function headingLevel(block: Record<string, unknown>): HeadingLevel | null {
  const style = block.style;
  for (const level of HEADING_STYLES) {
    if (style === level) return level;
  }
  return null;
}

/**
 * Podnaslovi tela, redosledom pojavljivanja, sa jedinstvenim `id`-jevima.
 *
 * Dva podnaslova istog teksta nisu greška u sadržaju — u dugom tekstu se
 * „Kada se ponavlja nalaz?“ može pojaviti u dva odeljka. Zato drugi i svaki
 * naredni dobijaju brojčani sufiks; bez toga bi sidro vodilo uvek na prvi, pa bi
 * polovina linkova iz sadržaja tiho promašila.
 */
export function collectBodyHeadings(value: unknown): BodyHeading[] {
  if (!Array.isArray(value)) return [];

  const headings: BodyHeading[] = [];
  const used = new Set<string>();

  value.forEach((block, blockIndex) => {
    if (!isRecord(block)) return;
    if (block._type !== "block") return;

    const level = headingLevel(block);
    if (level === null) return;

    const text = blockText(block);
    if (text.length === 0) return;

    // Podnaslov od samih znakova interpunkcije daje prazan slug; adresa tada
    // nosi redni broj odeljka, koji je i dalje stabilan i jedinstven.
    const base = slugifyHeading(text) || `odeljak-${blockIndex + 1}`;

    let id = base;
    let suffix = 2;
    while (used.has(id)) {
      id = `${base}-${suffix}`;
      suffix += 1;
    }
    used.add(id);

    headings.push({ blockIndex, level, text, id });
  });

  return headings;
}

/** Mapa `redni broj bloka → id`, u obliku u kojem je telu potrebna pri renderu. */
export function headingIdByBlockIndex(
  headings: readonly BodyHeading[],
): ReadonlyMap<number, string> {
  return new Map(headings.map((heading) => [heading.blockIndex, heading.id]));
}
