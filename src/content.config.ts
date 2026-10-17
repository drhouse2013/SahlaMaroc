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
      /**
       * Date de dernière VÉRIFICATION FACTUELLE des chiffres et règles auprès de sources officielles
       * (≠ pubDate, ≠ updatedDate qui peut être une simple retouche, ≠ checkedDate = terrain).
       * Ne renseigner que si la vérification a réellement eu lieu ; jamais de date « du jour » par défaut.
       */
      verifiedDate: z.coerce.date().optional(),
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
      /** Niveau affiché sur la carte du guide (facultatif) */
      level: z.enum(['essential', 'advanced']).optional(),
      /** Bloc « En bref » (facultatif) : affiché seulement si au moins un champ est renseigné */
      forWho: z.string().optional(),
      delay: z.string().optional(),
      cost: z.string().optional(),
      /** FAQ structurée (facultatif) : section visible + JSON-LD FAQPage, uniquement si présente */
      faq: z.array(z.object({ q: z.string().min(5), a: z.string().min(10) })).optional(),
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

/**
 * news : src/content/news/<lang>/<fichier>.md -> entrée datée du fil /<lang>/<hub nouveautés>.
 * Ajouter une entrée = ajouter un fichier .md (frontmatter seul, voir docs/NOUVEAUTES-ADMIN-DRAFT.md).
 * `related` = translationKey de guides (liens vers les guides + encadré « Nouveautés liées » dans chaque guide).
 */
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string().max(70, 'Titre : 70 caractères max'),
    summary: z.string().min(50).max(300),
    lang: z.enum(LOCALES),
    translationKey: z.string(),
    theme: z.enum(['civil', 'car', 'tax', 'health', 'travel']),
    /** reminder = rappel / état du droit ; change = changement effectif */
    kind: z.enum(['reminder', 'change']),
    pubDate: z.coerce.date(),
    /** Date de vérification auprès de sources réellement lues (jamais « du jour » par défaut) */
    verifiedDate: z.coerce.date(),
    changes: z.array(z.string()).min(1),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })).min(1),
    limits: z.array(z.string()).min(1),
    related: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    machineTranslated: z.boolean().default(false),
  }),
});

export const collections = { articles, pages, news };
