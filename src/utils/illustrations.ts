/** Résolution des illustrations SVG (importées => fingerprint + cache 1 an). */
import type { ImageMetadata } from 'astro';
import type { Scene } from '../data/home';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/illustrations/*.svg', { eager: true });

export function illustration(scene: Scene): ImageMetadata {
  const hit = files[`../assets/illustrations/${scene}.svg`];
  if (!hit) throw new Error(`Illustration introuvable : ${scene}`);
  return hit.default;
}
