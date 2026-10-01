/** Helpers de dates localisées (Intl natif, aucune dépendance). */
import { LOCALE_META, type Locale } from '../i18n/config';

export function formatDate(date: Date, lang: Locale, style: 'long' | 'short' = 'long'): string {
  return new Intl.DateTimeFormat(LOCALE_META[lang].intl, {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
  }).format(date);
}

/** Format ISO 8601 pour <time datetime> et JSON-LD */
export const toISO = (date: Date) => date.toISOString();

/** Temps de lecture estimé (≈ 220 mots/min, valeur moyenne adulte) */
export function readingTime(body = ''): number {
  const words = body.replace(/<[^>]+>|[#*_`>\[\]()!-]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
