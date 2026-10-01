/**
 * Helpers de routage multilingue.
 * Toutes les URLs du site passent par ces fonctions => une seule source de vérité.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { LOCALES, DEFAULT_LOCALE, TOPICS_SEGMENT, isIndexable, type Locale } from '../i18n/config';
import { CATEGORIES, type CategoryId } from '../i18n/categories';

export type Entry = CollectionEntry<'articles'> | CollectionEntry<'pages'>;
/** Map langue -> URL (relative) d'une même page dans chaque langue disponible */
export type Alternates = Partial<Record<Locale, string>>;

export const homePath = (lang: Locale) => `/${lang}`;
export const entryPath = (lang: Locale, slug: string) => `/${lang}/${slug}`;
export const categoryPath = (lang: Locale, id: CategoryId) =>
  `/${lang}/${TOPICS_SEGMENT[lang]}/${CATEGORIES[id].slug[lang]}`;
export const rssPath = (lang: Locale) => `/${lang}/rss.xml`;

/** En prod on masque les brouillons ; en dev on les affiche pour relecture. */
const isVisible = (e: Entry) => import.meta.env.DEV || !e.data.draft;

export async function getArticles(lang?: Locale) {
  const all = await getCollection('articles', isVisible);
  return all
    .filter((a) => !lang || a.data.lang === lang)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getPages(lang?: Locale) {
  const all = await getCollection('pages', isVisible);
  return all.filter((p) => !lang || p.data.lang === lang);
}

/**
 * Pour un contenu donné, retourne les URLs de toutes ses traductions existantes
 * (via translationKey). Sert aux balises hreflang et au LanguageSwitcher.
 *
 * Choix SEO : si une traduction n'existe pas, on NE crée PAS de page de repli en anglais
 * sous /fr/... (contenu dupliqué). Le switcher renverra vers la home de la langue.
 */
export async function getEntryAlternates(entry: Entry): Promise<Alternates> {
  const pool: Entry[] = entry.collection === 'articles' ? await getArticles() : await getPages();
  const alt: Alternates = {};
  for (const e of pool) {
    if (e.data.translationKey === entry.data.translationKey && !e.data.machineTranslated && isIndexable(e.data.lang)) {
      alt[e.data.lang] = entryPath(e.data.lang, e.data.slug);
    }
  }
  // La page courante est toujours présente (même si traduite auto).
  alt[entry.data.lang] = entryPath(entry.data.lang, entry.data.slug);
  return alt;
}

/** Alternates pour les pages qui existent dans toutes les langues (home, catégories). */
export function allLocalesAlternates(build: (lang: Locale) => string): Alternates {
  return Object.fromEntries(LOCALES.filter(isIndexable).map((l) => [l, build(l)])) as Alternates;
}

/** IDs de catégories ayant au moins un article publié dans la langue (évite les pages vides). */
export async function getActiveCategories(lang: Locale): Promise<CategoryId[]> {
  const articles = await getArticles(lang);
  return [...new Set(articles.map((a) => a.data.category))];
}

/** URL d'une page "système" (about, privacy, disclosure, outil) dans une langue, repli EN. */
export async function getPageUrl(lang: Locale, translationKey: string): Promise<string | undefined> {
  const pages = await getPages();
  const match =
    pages.find((p) => p.data.translationKey === translationKey && p.data.lang === lang) ??
    pages.find((p) => p.data.translationKey === translationKey && p.data.lang === DEFAULT_LOCALE);
  return match ? entryPath(match.data.lang, match.data.slug) : undefined;
}

/**
 * Garde-fou au build : deux contenus d'une même langue ne peuvent pas partager un slug.
 */
export function assertUniqueSlugs(entries: Entry[]) {
  const seen = new Map<string, string>();
  for (const e of entries) {
    const key = `${e.data.lang}/${e.data.slug}`;
    if (seen.has(key)) throw new Error(`Slug dupliqué "${key}" : ${seen.get(key)} et ${e.id}`);
    seen.set(key, e.id);
  }
}

/** Article d'une langue par translationKey (null si pas encore traduit). */
export async function getArticleByKey(lang: Locale, translationKey: string) {
  const list = await getArticles(lang);
  return list.find((a) => a.data.translationKey === translationKey) ?? null;
}
