import type { Locale } from '../i18n';
import { getArticles, getPages, hubPath } from './i18n';

export async function redesignContentPath(lang: Locale, key: string) {
  const entry = await redesignContent(lang, key);
  return entry ? `/${lang}/${entry.data.slug}` : hubPath(lang, 'guides');
}

export async function redesignContent(lang: Locale, key: string) {
  const entries = [...await getArticles(lang), ...await getPages(lang)];
  return entries.find(({ data }) => data.translationKey === key) ?? null;
}
