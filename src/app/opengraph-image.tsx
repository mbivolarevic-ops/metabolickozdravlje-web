import {
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_CONTENT_TYPE,
  SOCIAL_IMAGE_SIZE,
  renderSocialImage,
} from "@/site/socialImage";

/**
 * Open Graph slika sajta.
 *
 * Render je u `src/site/socialImage.tsx` — deli ga sa `twitter-image.tsx`, pa
 * se dve slike ne mogu razići.
 */
export const alt = SOCIAL_IMAGE_ALT;
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = SOCIAL_IMAGE_CONTENT_TYPE;

export default function Image() {
  return renderSocialImage();
}
