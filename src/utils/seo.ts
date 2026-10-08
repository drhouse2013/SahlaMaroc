/**
 * Helpers SEO : titres, URLs absolues, JSON-LD (Schema.org).
 * Le JSON-LD est rendu au build => aucun coût runtime.
 * Règle : chaque donnée structurée décrit exactement ce qui est affiché sur la page.
 */
import { LOCALE_META, HUB_SLUGS, type Locale } from '../i18n/config';
import { SITE_URL } from '../../site.config.mjs';

export const SITE_NAME = 'Sahla Maroc';
/** Nom de marque par langue : « Sahla Maroc » en français, « Sahla Morocco » ailleurs. */
export const brandName = (lang: Locale) => (lang === 'fr' ? 'Sahla Maroc' : 'Sahla Morocco');
/** Logo utilisé dans le JSON-LD Organization (public/logo.png, 512x512) */
export const LOGO_PATH = '/logo.png';
/** Auteur principal (page À propos) */
export const AUTHOR_NAME = 'Yassine';

export function buildTitle(title: string | undefined, lang: Locale): string {
  const name = brandName(lang);
  if (!title) return name;
  // Évite « … | Sahla Maroc » quand le titre contient déjà la marque, et les titres > 70 caractères.
  if (title.includes('Sahla')) return title;
  const full = `${title} | ${name}`;
  return full.length <= 70 ? full : title;
}

export function absoluteUrl(path: string, site: URL | undefined): string {
  return new URL(path, site ?? SITE_URL).toString();
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
  authorUrl?: string;
  site: URL | undefined;
  section?: string;
}

/** Schema.org Article — éligible aux résultats enrichis */
export function articleJsonLd(i: ArticleLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': i.url },
    headline: i.title,
    description: i.description,
    inLanguage: LOCALE_META[i.lang].hreflang,
    image: [i.image ?? absoluteUrl('/og-default.png', i.site)],
    datePublished: i.datePublished.toISOString(),
    dateModified: (i.dateModified ?? i.datePublished).toISOString(),
    articleSection: i.section,
    author: { '@type': 'Person', name: i.author, url: i.authorUrl ?? absoluteUrl(`/${i.lang}`, i.site) },
    publisher: organizationRef(i.site),
  };
}

export function organizationRef(site: URL | undefined) {
  return {
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: 'Sahla Morocco',
    url: absoluteUrl('/', site),
    logo: { '@type': 'ImageObject', url: absoluteUrl(LOGO_PATH, site), width: 512, height: 512 },
  };
}

/** Schema.org WebSite (page d'accueil) avec recherche interne (la page /search?q= existe). */
export function websiteJsonLd(lang: Locale, site: URL | undefined, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: brandName(lang),
    url: absoluteUrl(`/${lang}`, site),
    inLanguage: LOCALE_META[lang].hreflang,
    description,
    publisher: organizationRef(site),
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: absoluteUrl(`/${lang}/${HUB_SLUGS.search[lang]}`, site) + '?q={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Schema.org Organization complète (page d'accueil et À propos) */
export function organizationJsonLd(site: URL | undefined) {
  return { '@context': 'https://schema.org', ...organizationRef(site) };
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

/** Schema.org FAQPage — uniquement pour des questions/réponses visibles sur la page */
export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

/** Schema.org CollectionPage — pages hub (thèmes, villes, checklists) */
export function collectionPageJsonLd(i: { url: string; name: string; description: string; lang: Locale; items: { name: string; url: string }[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: i.name,
    description: i.description,
    url: i.url,
    inLanguage: LOCALE_META[i.lang].hreflang,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: i.items.map((it, idx) => ({ '@type': 'ListItem', position: idx + 1, name: it.name, url: it.url })),
    },
  };
}

/** Schema.org Person — auteur (page À propos) */
export function personJsonLd(site: URL | undefined, url: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR_NAME,
    url,
    description,
    homeLocation: { '@type': 'Place', name: 'Casablanca-Settat, Morocco' },
    knowsLanguage: ['ar', 'fr', 'en'],
    worksFor: organizationRef(site),
  };
}
