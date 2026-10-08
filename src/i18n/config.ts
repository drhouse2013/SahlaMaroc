/**
 * i18n — source unique de vérité pour les langues du site.
 * Ajouter une langue = l'ajouter ici + créer src/i18n/ui/<code>.json + l'ajouter à astro.config.mjs.
 */
import { INDEXABLE_LOCALES as INDEXABLE } from '../../site.config.mjs';

export const LOCALES = ['en', 'fr', 'es', 'de', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** Langues ouvertes à l'indexation (voir site.config.mjs) */
export const INDEXABLE_LOCALES = INDEXABLE as Locale[];
export const isIndexable = (lang: Locale) => INDEXABLE_LOCALES.includes(lang);

interface LocaleMeta {
  /** Nom natif affiché dans le sélecteur */
  label: string;
  /** Drapeau emoji (note : Windows affiche les lettres "FR", "GB"… au lieu du drapeau, d'où le label à côté) */
  flag: string;
  dir: 'ltr' | 'rtl';
  /** Code hreflang / attribut lang (BCP 47) */
  hreflang: string;
  /** Locale Intl pour dates & nombres */
  intl: string;
  /** Locale Open Graph */
  og: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { label: 'English', flag: '🇬🇧', dir: 'ltr', hreflang: 'en', intl: 'en-GB', og: 'en_GB' },
  fr: { label: 'Français', flag: '🇫🇷', dir: 'ltr', hreflang: 'fr', intl: 'fr-FR', og: 'fr_FR' },
  es: { label: 'Español', flag: '🇪🇸', dir: 'ltr', hreflang: 'es', intl: 'es-ES', og: 'es_ES' },
  de: { label: 'Deutsch', flag: '🇩🇪', dir: 'ltr', hreflang: 'de', intl: 'de-DE', og: 'de_DE' },
  // Arabe : RTL. Chiffres latins forcés (nu-latn) — usage courant au Maroc.
  ar: { label: 'العربية', flag: '🇲🇦', dir: 'rtl', hreflang: 'ar', intl: 'ar-MA-u-nu-latn', og: 'ar_MA' },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/**
 * Segment d'URL traduit pour les pages de catégorie : /en/topics/visa, /fr/themes/visa…
 */
export const TOPICS_SEGMENT: Record<Locale, string> = {
  en: 'topics',
  fr: 'themes',
  es: 'temas',
  de: 'themen',
  ar: 'mawadi',
};

/**
 * Slugs traduits des pages « hub » (générées par src/pages/[lang]/[slug].astro) et du segment
 * des pages villes (/fr/villes/marrakech). Translittération latine pour l'arabe, comme les articles.
 */
export const HUB_SLUGS = {
  guides: { en: 'guides', fr: 'guides', es: 'guias', de: 'ratgeber', ar: 'adilla' },
  cities: { en: 'cities', fr: 'villes', es: 'ciudades', de: 'staedte', ar: 'mudun' },
  checklists: { en: 'checklists', fr: 'checklists', es: 'listas-de-control', de: 'checklisten', ar: 'qawaim-al-tahaqquq' },
  search: { en: 'search', fr: 'recherche', es: 'buscar', de: 'suche', ar: 'bahth' },
  mre: { en: 'moroccans-abroad', fr: 'mre', es: 'marroquies-en-el-extranjero', de: 'auslandsmarokkaner', ar: 'maghariba-al-alam' },
  visit: { en: 'visit-morocco', fr: 'visiter-le-maroc', es: 'visitar-marruecos', de: 'marokko-besuchen', ar: 'ziyarat-al-maghrib' },
} as const satisfies Record<string, Record<Locale, string>>;
export type HubId = keyof typeof HUB_SLUGS;
