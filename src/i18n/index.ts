/**
 * i18n runtime : chargement des traductions UI + fonction t() typée.
 * Tout est résolu au build (SSG) => 0 octet de JS envoyé au navigateur.
 */
import en from './ui/en.json';
import fr from './ui/fr.json';
import es from './ui/es.json';
import de from './ui/de.json';
import ar from './ui/ar.json';
import { DEFAULT_LOCALE, type Locale } from './config';

export * from './config';

export type UIKey = keyof typeof en;

const DICTIONARIES: Record<Locale, Record<string, string>> = { en, fr, es, de, ar };

/**
 * Retourne une fonction t(key, vars?) pour une langue.
 * - Repli automatique sur l'anglais si une clé manque.
 * - Interpolation simple : t('article.readingTime', { n: 5 }) => "5 min read".
 */
export function useTranslations(lang: Locale) {
  const dict = DICTIONARIES[lang];
  const fallback = DICTIONARIES[DEFAULT_LOCALE];
  return function t(key: UIKey, vars?: Record<string, string | number>): string {
    let str = dict[key] ?? fallback[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) str = str.replaceAll(`{${k}}`, String(v));
    }
    return str;
  };
}
