/** Photos de villes (optionnelles) : src/assets/photos/cities/ + manifest.json. Repli sur l'illustration si absentes. */
import type { ImageMetadata } from 'astro';
import type { Locale } from '../i18n';

interface Entry { file: string; alt?: Partial<Record<Locale, string>>; credit?: string; source?: string }
export interface CityPhoto { src: ImageMetadata; alt: string; credit?: string; source?: string }

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/cities/*.{jpg,jpeg,png,webp,avif}', { eager: true });
const manifests = import.meta.glob<{ default: Record<string, Entry> }>('../assets/photos/cities/manifest.json', { eager: true });
const manifest: Record<string, Entry> = Object.values(manifests)[0]?.default ?? {};

const CREDIT: Record<Locale, string> = { fr: 'Photo : ', en: 'Photo: ', es: 'Foto: ', de: 'Foto: ', ar: 'صورة: ' };
export const photoCreditLabel = (lang: Locale, credit: string) => `${CREDIT[lang] ?? CREDIT.en}${credit}`;

export function getPhoto(scene: string, lang: Locale): CityPhoto | null {
  const e = manifest[scene];
  const hit = e && files[`../assets/photos/cities/${e.file}`];
  if (!e || !hit) return null;
  return { src: hit.default, alt: e.alt?.[lang] ?? e.alt?.fr ?? e.alt?.en ?? '', credit: e.credit, source: e.source };
}

/** Photos de lieux à visiter : src/assets/photos/spots/<ville>-<lieu>.jpg + manifest.json ({"ville/lieu": entrée}). Optionnelles. */
const spotFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/spots/*.{jpg,jpeg,png,webp,avif}', { eager: true });
const spotManifests = import.meta.glob<{ default: Record<string, Entry> }>('../assets/photos/spots/manifest.json', { eager: true });
const spotManifest: Record<string, Entry> = Object.values(spotManifests)[0]?.default ?? {};

export function getSpotPhoto(cityId: string, spotId: string, lang: Locale): CityPhoto | null {
  const e = spotManifest[`${cityId}/${spotId}`];
  const hit = e && spotFiles[`../assets/photos/spots/${e.file}`];
  if (!e || !hit) return null;
  return { src: hit.default, alt: e.alt?.[lang] ?? e.alt?.fr ?? e.alt?.en ?? '', credit: e.credit, source: e.source };
}
