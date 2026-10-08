/** Index de recherche par langue (/fr/search-index.json), généré au build. */
import type { APIRoute, GetStaticPaths } from 'astro';
import { LOCALES, HUB_SLUGS, useTranslations, type Locale } from '../../i18n';
import { CATEGORIES } from '../../i18n/categories';
import { PILLARS } from '../../data/pillars';
import { TOOLS } from '../../data/tools';
import { CITY_PAGES, cityLabel } from '../../data/cities';
import { categoryPath, cityPath, entryPath, getActiveCategories, getArticles, getPages, hubPath } from '../../utils/i18n';
import { checklistsIn } from '../../utils/content';

export const getStaticPaths: GetStaticPaths = () => LOCALES.map((lang) => ({ params: { lang } }));

const clip = (s: string, n = 140) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as Locale;
  const t = useTranslations(lang);
  const items: { t: string; d: string; u: string; k: string; c?: string; x?: string }[] = [];
  const articles = await getArticles(lang);
  const pages = await getPages(lang);

  for (const id of await getActiveCategories(lang)) {
    items.push({ t: CATEGORIES[id].label[lang], d: clip(PILLARS[id].intro[lang]), u: categoryPath(lang, id), k: 'topic', x: CATEGORIES[id].slug[lang] });
  }
  for (const tool of TOOLS) {
    const page = pages.find((p) => p.data.translationKey === tool.key);
    if (page) items.push({ t: tool.title[lang], d: tool.text[lang], u: entryPath(lang, page.data.slug), k: 'tool' });
  }
  for (const c of CITY_PAGES) {
    const name = cityLabel(c.id, lang);
    items.push({ t: name, d: clip(c.text[lang].intro), u: cityPath(lang, c.slug[lang]), k: 'city', x: `${c.id} ${c.slug[lang]} ${c.text[lang].areas.map((a) => a.name).join(' ')}` });
  }
  for (const a of articles) {
    const cat = CATEGORIES[a.data.category].label[lang];
    items.push({ t: a.data.title, d: clip(a.data.description), u: entryPath(lang, a.data.slug), k: 'article', c: cat, x: a.data.tags.join(' ') });
    for (const cl of checklistsIn(a.body)) items.push({ t: cl.title, d: a.data.title, u: `${entryPath(lang, a.data.slug)}#checklist-${cl.id}`, k: 'checklist' });
  }
  const hubs: [keyof typeof HUB_SLUGS, string, string][] = [
    ['mre', t('hub.mre.title'), t('hub.mre.description')],
    ['visit', t('hub.visit.title'), t('hub.visit.description')],
    ['cities', t('city.hub.title'), t('city.hub.description')],
    ['checklists', t('checklists.title'), t('checklists.description')],
  ];
  for (const [hub, title, desc] of hubs) items.push({ t: title, d: clip(desc), u: hubPath(lang, hub), k: 'page' });
  for (const p of pages) {
    if (TOOLS.some((tool) => tool.key === p.data.translationKey)) continue;
    items.push({ t: p.data.title, d: clip(p.data.description), u: entryPath(lang, p.data.slug), k: 'page' });
  }
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
