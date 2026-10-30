/**
 * Porte d'accès UNIQUE aux photos de lieux (villes, régions, lieux à visiter, héros).
 * Données : src/assets/photos/{cities,regions,spots}/ + manifest.json. Règles : docs/IMAGES.md.
 * `placePhoto()` renvoie toujours un objet : `status: 'verified'` (image + auteur + licence + lien source)
 * ou `'placeholder'` (image: null) => le composant affiche <PhotoPlaceholder>, jamais une image non vérifiée.
 */
import type { ImageMetadata } from 'astro';
import type { Locale } from '../i18n';
import type { SpotKind } from '../data/spots';
import { regionById } from '../data/regions';
import { isVerified, type PhotoEntry } from './photoStatus';

export type PlaceType = 'city' | 'hero' | 'region' | 'spot';
/** Type de lieu : choisit l'icône du placeholder. */
export type PlaceKind = SpotKind | 'city' | 'region' | 'hero';
export interface PlacePhoto {
  image: ImageMetadata | null;
  alt: string;
  credit: string | null;
  source: string | null;
  status: 'verified' | 'placeholder';
}

type Dir = 'cities' | 'regions' | 'spots';
const DIR: Record<PlaceType, Dir> = { city: 'cities', hero: 'cities', region: 'regions', spot: 'spots' };

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/{cities,regions,spots}/*.{jpg,jpeg,png,webp,avif}', { eager: true });
const manifests = import.meta.glob<{ default: Record<string, PhotoEntry> }>('../assets/photos/{cities,regions,spots}/manifest.json', { eager: true });

const PLACEHOLDER: PlacePhoto = { image: null, alt: '', credit: null, source: null, status: 'placeholder' };

/**
 * @param id ville/hero : id de CITY_PAGES (ou « home-hero ») ; région : id de région ; lieu : « ville/lieu ».
 * Une région sans photo propre reprend la photo (vérifiée) de sa ville chef-lieu, avec l'alt de cette ville.
 */
export function placePhoto(type: PlaceType, id: string, lang: Locale): PlacePhoto {
  const dir = DIR[type];
  const e = manifests[`../assets/photos/${dir}/manifest.json`]?.default?.[id];
  const hit = e && files[`../assets/photos/${dir}/${e.file}`];
  if (!e || !hit || !isVerified(e)) {
    const capital = type === 'region' ? regionById(id)?.capitalCity : undefined;
    return capital ? placePhoto('city', capital, lang) : PLACEHOLDER;
  }
  return { image: hit.default, alt: e.alt?.[lang] ?? e.alt?.fr ?? e.alt?.en ?? '', credit: e.credit ?? null, source: e.source ?? null, status: 'verified' };
}

const CREDIT: Record<Locale, string> = { fr: 'Photo : ', en: 'Photo: ', es: 'Foto: ', de: 'Foto: ', ar: 'صورة: ' };
export const photoCreditLabel = (lang: Locale, credit: string) => `${CREDIT[lang] ?? CREDIT.en}${credit}`;
