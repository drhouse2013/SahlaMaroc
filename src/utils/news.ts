/** Fil « Nouveautés et procédures administratives » : src/content/news/<lang>/<fichier>.md */
import { getCollection } from 'astro:content';
import type { IconName } from '../data/icons';
import type { Locale } from '../i18n';

export const NEWS_THEMES = ['civil', 'car', 'tax', 'health', 'travel'] as const;
export type NewsTheme = (typeof NEWS_THEMES)[number];
export const NEWS_THEME_ICON: Record<NewsTheme, IconName> = { civil: 'stamp', car: 'car', tax: 'receipt', health: 'heart', travel: 'plane' };

/** Entrées d'une langue, la plus récente d'abord. */
export async function getNews(lang: Locale) {
  const all = await getCollection('news', (e) => e.data.lang === lang && (import.meta.env.DEV || !e.data.draft));
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
