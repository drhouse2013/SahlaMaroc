/**
 * Maillage et métadonnées dérivés du contenu (aucune donnée inventée) :
 * liens externes cités, checklists contenues dans un guide, sources officielles,
 * calculateurs et villes liés.
 */
import type { CollectionEntry } from 'astro:content';
import { PILLARS } from '../data/pillars';
import { ARTICLE_SOURCES, SOURCES } from '../data/sources';
import { TOOLS } from '../data/tools';
import { CITY_PAGES } from '../data/cities';

type Article = CollectionEntry<'articles'>;

/** Domaines d'affiliation ou de réservation : ce ne sont pas des sources. */
const NOT_SOURCES = /(booking\.com|airalo|wise\.com|getyourguide|viator|safetywing|discovercars)/i;

/** Liens externes cités dans le corps d'un guide (Markdown), dédoublonnés. */
export function citedLinks(body = ''): { url: string; text: string; host: string }[] {
  const seen = new Set<string>();
  const out: { url: string; text: string; host: string }[] = [];
  for (const m of body.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g)) {
    const url = m[2];
    if (NOT_SOURCES.test(url) || seen.has(url)) continue;
    seen.add(url);
    let host = url;
    try { host = new URL(url).hostname.replace(/^www\./, ''); } catch { /* garde l'URL brute */ }
    out.push({ url, text: m[1].replace(/[*_`]/g, ''), host });
  }
  return out;
}

export interface ChecklistInfo { id: string; title: string; items: number }

/** Checklists <Checklist id title> présentes dans un guide, avec leur nombre d'étapes. */
export function checklistsIn(body = ''): ChecklistInfo[] {
  const out: ChecklistInfo[] = [];
  for (const m of body.matchAll(/<Checklist\b([^>]*)>([\s\S]*?)<\/Checklist>/g)) {
    const attrs = m[1];
    const id = /id="([^"]+)"/.exec(attrs)?.[1];
    const title = /title="([^"]+)"/.exec(attrs)?.[1];
    if (!id || !title) continue;
    const items = m[2].split('\n').filter((l) => /^\s*[-*]\s+\S/.test(l)).length;
    out.push({ id, title, items });
  }
  return out;
}

/** Organismes officiels liés à un guide (spécifiques, sinon ceux du thème). */
export function officialSourcesFor(article: Article) {
  const ids = ARTICLE_SOURCES[article.data.translationKey] ?? PILLARS[article.data.category].sources;
  return ids.map((id) => SOURCES[id]).filter(Boolean);
}

/** Calculateurs liés à un guide : ceux qui y renvoient, sinon ceux du thème. */
export function relatedToolsFor(article: Article) {
  const direct = TOOLS.filter((t) => t.guideKey === article.data.translationKey);
  const keys = direct.length ? direct.map((t) => t.key) : PILLARS[article.data.category].tools;
  return TOOLS.filter((t) => keys.includes(t.key)).slice(0, 2);
}

/** Villes dont la page cite ce guide (accès, hébergement, excursions, autres). */
export function relatedCitiesFor(article: Article) {
  const k = article.data.translationKey;
  return CITY_PAGES.filter((c) => [...c.accessKeys, c.stayKey, ...c.tripKeys, ...c.moreKeys].includes(k)).slice(0, 4);
}

/** Thème sensible (règles, impôts, argent) : avertissement renforcé. */
export const isYmyl = (article: Article) => Boolean(PILLARS[article.data.category].ymyl);

export interface ChecklistRef extends ChecklistInfo { article: Article }

/** Toutes les checklists interactives d'une langue, avec le guide qui les contient. */
export async function allChecklists(lang: import('../i18n/config').Locale): Promise<ChecklistRef[]> {
  const { getArticles } = await import('./i18n');
  const articles = await getArticles(lang);
  return articles.flatMap((article) => checklistsIn(article.body).map((c) => ({ ...c, article })));
}
