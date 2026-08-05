import { defineField, defineType } from "sanity";
import { CLARITY_CHECKS } from "../../validation/clarityChecks";

/**
 * Evidencija 11 provera razumljivosti (docs/04 §3.2).
 *
 * Ovo je UREDNIČKA EVIDENCIJA — polje po proveri, sa statusom koji urednik
 * postavlja. Ono NIJE bezbednosna kapija samo po sebi: koje provere zaista
 * blokiraju objavu određuje `isClarityCheckBlocking` u
 * `sanity/validation/clarityChecks.ts`, a sprovodi validacija članka.
 *
 * Polja se izvode iz iste liste koju koristi validacija, pa evidencija i
 * kapija ne mogu da se raziđu.
 */
const STATUS_OPTIONS = [
  { title: "Nije provereno", value: "unchecked" },
  { title: "U redu", value: "ok" },
  { title: "Upozorenje", value: "warning" },
  { title: "Blokira", value: "blocked" },
];

export const clarityChecks = defineType({
  name: "clarityChecks",
  title: "Razumljivost (11 provera)",
  type: "object",
  description:
    "Evidencija uredničke provere. Objavu blokiraju samo provere koje su u dokumentaciji označene kao blokirajuće.",
  fields: CLARITY_CHECKS.map((check) =>
    defineField({
      name: check.id,
      title: `${check.id} — ${check.label}`,
      type: "string",
      initialValue: "unchecked",
      options: { list: STATUS_OPTIONS, layout: "dropdown" },
    }),
  ),
});
