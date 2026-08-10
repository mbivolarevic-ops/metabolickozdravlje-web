import {
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_CONTENT_TYPE,
  SOCIAL_IMAGE_SIZE,
  renderSocialImage,
} from "@/site/socialImage";

/**
 * Twitter/X slika sajta.
 *
 * Isti render kao Open Graph. Zasebna ruta postoji zato što Next konvencija
 * traži zaseban fajl, ne zato što se slike razlikuju.
 */
export const alt = SOCIAL_IMAGE_ALT;
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = SOCIAL_IMAGE_CONTENT_TYPE;

export default function Image() {
  return renderSocialImage();
}
