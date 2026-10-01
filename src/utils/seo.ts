/**
 * Helpers SEO : titres, URLs absolues, JSON-LD (Schema.org).
 * Le JSON-LD est rendu au build => aucun coût runtime.
 */
import { LOCALE_META, type Locale } from '../i18n/config';

export const SITE_NAME = 'SahlaMaroc';
/** Logo utilisé dans le JSON-LD Organization (public/logo.png, 512x512 recommandé) */
export const LOGO_PATH = '/logo.png';

export function buildTitle(title?: string): string {
  return title ? `${title} | ${SITE_NAME}` : SITE_NAME;
}

export function absoluteUrl(path: string, site: URL | undefined): string {
  return new URL(path, site ?? 'https://sahlamaroc.com').toString();
}

interface ArticleLdInput {
  url: string;
  title: string;
  description: string;
  lang: Locale;
  image?: string;
  datePublished: Date;
  dateModified?: Date;
  author: string;
  site: URL | undefined;
  section?: string;
}

/** Schema.org BlogPosting — éligible aux résultats enrichis "Article" */
export function articleJsonLd(i: ArticleLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': i.url },
    headline: i.title,
    description: i.description,
    inLanguage: LOCALE_META[i.lang].hreflang,
    ...(i.image && { image: [i.image] }),
    datePublished: i.datePublished.toISOString(),
    dateModified: (i.dateModified ?? i.datePublished).toISOString(),
    articleSection: i.section,
    author: { '@type': 'Person', name: i.author, url: absoluteUrl(`/${i.lang}`, i.site) },
    publisher: organizationRef(i.site),
  };
}

export function organizationRef(site: URL | undefined) {
  return {
    '@type': 'Organization',
    name: SITE_NAME,
    url: absoluteUrl('/', site),
    logo: { '@type': 'ImageObject', url: absoluteUrl(LOGO_PATH, site) },
  };
}

/** Schema.org WebSite (page d'accueil) */
export function websiteJsonLd(lang: Locale, site: URL | undefined, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: absoluteUrl(`/${lang}`, site),
    inLanguage: LOCALE_META[lang].hreflang,
    description,
    publisher: organizationRef(site),
  };
}

/** Schema.org BreadcrumbList — fil d'Ariane dans les SERP */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
