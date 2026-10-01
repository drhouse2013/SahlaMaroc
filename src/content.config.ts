/**
 * Content Collections (Astro 5 — Content Layer API).
 *
 * articles : src/content/articles/<lang>/<fichier>.md(x)   -> /<lang>/<slug>
 * pages    : src/content/pages/<lang>/<fichier>.md(x)      -> /<lang>/<slug> (about, privacy, outils…)
 *
 * - `slug` = URL traduite (ex : cost-of-living / cout-de-la-vie).
 * - `translationKey` relie les versions d'un même contenu entre langues
 *   (balises hreflang + LanguageSwitcher). Il doit être IDENTIQUE dans toutes les langues.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { LOCALES } from './i18n/config';
import { CATEGORY_IDS } from './i18n/categories';

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug : minuscules, chiffres et tirets uniquement');

const base = {
  title: z.string().max(70, 'Titre SEO : 70 caractères max'),
  description: z.string().min(50).max(160, 'Meta description : 160 caractères max'),
  slug,
  translationKey: z.string(),
  lang: z.enum(LOCALES),
  draft: z.boolean().default(false),
  /** true si traduit automatiquement et pas encore relu => noindex (protection SEO) */
  machineTranslated: z.boolean().default(false),
};

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      ...base,
      category: z.enum(CATEGORY_IDS),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      /** Date de dernière vérification terrain (prix, procédures) — signal E-E-A-T affiché */
      checkedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      /** Illustration maison utilisée si pas de photo (src/assets/illustrations/<scene>.svg) */
      illustration: z
        .enum(['marrakech', 'casablanca', 'chefchaouen', 'sahara', 'essaouira', 'fes', 'rabat', 'tangier', 'taghazout', 'atlas', 'souk', 'riad'])
        .default('riad'),
      heroAlt: z.string().optional(),
      author: z.string().default('Yassine'),
      tags: z.array(z.string()).default([]),
      /** Mise en avant sur la page d'accueil */
      featured: z.boolean().default(false),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    ...base,
    updatedDate: z.coerce.date().optional(),
    /** Exclure du sitemap / noindex (ex : mentions légales) */
    noindex: z.boolean().default(false),
  }),
});

export const collections = { articles, pages };
