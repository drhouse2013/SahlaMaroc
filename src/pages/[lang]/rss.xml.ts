/** Flux RSS par langue : /en/rss.xml, /fr/rss.xml… */
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { LOCALES, useTranslations, type Locale } from '../../i18n';
import { entryPath, getArticles } from '../../utils/i18n';

export function getStaticPaths() {
  return LOCALES.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Locale;
  const t = useTranslations(lang);
  const articles = (await getArticles(lang)).filter((a) => !a.data.machineTranslated);
  return rss({
    title: t('rss.title'),
    description: t('site.description'),
    site: context.site!,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.updatedDate ?? a.data.pubDate,
      link: entryPath(lang, a.data.slug),
      categories: [a.data.category, ...a.data.tags],
      author: a.data.author,
    })),
    customData: `<language>${lang}</language>`,
    trailingSlash: false,
  });
}
