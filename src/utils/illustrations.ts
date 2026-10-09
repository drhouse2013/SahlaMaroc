/** Résolution des illustrations SVG (importées => fingerprint + cache 1 an). */
import type { ImageMetadata } from 'astro';
import type { Scene } from '../data/home';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/illustrations/*.svg', { eager: true });

/** Villes sans illustration propre : mêmes illustrations que leurs guides « où loger ». */
const ILLUSTRATION_ALIAS: Partial<Record<Scene, Scene>> = { nador: 'sahara', tetouan: 'chefchaouen' };

export function illustration(scene: Scene): ImageMetadata {
  const hit = files[`../assets/illustrations/${ILLUSTRATION_ALIAS[scene] ?? scene}.svg`];
  if (!hit) throw new Error(`Illustration introuvable : ${scene}`);
  return hit.default;
}
