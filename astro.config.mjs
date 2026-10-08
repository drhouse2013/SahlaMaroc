// @ts-check
/**
 * SahlaMaroc — Astro configuration
 * ------------------------------------------------------------
 * - Static output (SSG) : déployable gratuitement sur Vercel / Netlify sans adapter.
 * - i18n : 5 locales, toutes préfixées (/en/..., /fr/...). La racine "/" redirige vers /en/.
 * - Tailwind CSS 4 : branché via le plugin Vite officiel (plus de tailwind.config.js en v4,
 *   la palette est définie en CSS dans src/styles/global.css via @theme).
 * - Sitemap : génère sitemap-index.xml avec les balises hreflang pour chaque langue.
 */
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE_URL, INDEXABLE_LOCALES } from './site.config.mjs';

// Source unique de vérité pour les langues (dupliquée volontairement ici car
// astro.config.mjs est chargé avant la compilation TS de src/).
const LOCALES = ['en', 'fr', 'es', 'de', 'ar'];
const DEFAULT_LOCALE = 'en';

// Mapping locale -> code hreflang (BCP 47) pour le sitemap.
const HREFLANG = {
  en: 'en-US',
  fr: 'fr-FR',
  es: 'es-ES',
  de: 'de-DE',
  ar: 'ar-MA',
};

export default defineConfig({
  // Domaine canonique : voir site.config.mjs (variable d'environnement SITE_URL).
  site: SITE_URL,

  output: 'static',
  trailingSlash: 'never',

  build: {
    // Inline les petites feuilles CSS => moins de requêtes bloquantes (gain LCP).
    inlineStylesheets: 'auto',
    format: 'directory',
  },

  // Préchargement des liens au survol : navigation quasi instantanée, ~1 Ko de JS.
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },

  i18n: {
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    routing: {
      // Toutes les langues ont un préfixe => URLs symétriques et propres pour le SEO.
      prefixDefaultLocale: true,
      // La racine "/" est gérée par src/pages/index.astro (détection de langue navigateur).
      redirectToDefaultLocale: false,
    },
    // Pas de `fallback` Astro : les routes sont dynamiques ([lang]/[slug]) et le
    // repli vers l'anglais est géré dans getStaticPaths (src/utils/i18n.ts, étape suivante).
  },

  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: HREFLANG,
      },
      // Exclut les pages techniques du sitemap.
      filter: (page) => {
        const path = new URL(page).pathname;
        const lang = path.split('/')[1];
        return (
          path !== '/' && // racine = simple redirection (noindex)
          INDEXABLE_LOCALES.includes(lang) && // langues pas encore lancées => hors sitemap
          !path.includes('/404') &&
          // Pages de recherche : contenu dupliqué / sans valeur pour l'index
          !/^\/[a-z]{2}\/(search|recherche|buscar|suche|bahth)$/.test(path)
        );
      },
      // Pas de lastmod global : une date de build identique partout est ignorée par Google.
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],

  // <Image /> applique loading="lazy" + decoding="async" par défaut ; le cadrage est géré en CSS (object-cover).

  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
