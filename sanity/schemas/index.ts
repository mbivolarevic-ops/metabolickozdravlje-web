import type { SchemaTypeDefinition } from "sanity";

import { article } from "./documents/article";
import { author } from "./documents/author";
import { cluster } from "./documents/cluster";
import { medicalReviewer } from "./documents/medicalReviewer";

import { clarityChecks } from "./objects/clarityChecks";
import { imageWithCaption } from "./objects/imageWithCaption";
import { portableText } from "./objects/portableText";
import { referenceItem } from "./objects/referenceItem";
import { seo } from "./objects/seo";
import { videoEmbed } from "./objects/videoEmbed";

/**
 * Registar šema.
 *
 * Obim PR 1 je namerno sužen na ono što je odmah potrebno. Tipovi koji
 * postoje u docs/01 §8.2, a ovde ih nema (faq, glossaryTerm, guide,
 * legalPage, siteSettings, redirect, referralDestination, quizDefinition),
 * dolaze u kasnijim PR-ovima — svaki sa svojim validacijama i testovima.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  // Dokumenti
  article,
  cluster,
  author,
  medicalReviewer,
  // Objekti
  portableText,
  imageWithCaption,
  videoEmbed,
  referenceItem,
  clarityChecks,
  seo,
];
