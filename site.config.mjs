/**
 * Réglages partagés entre astro.config.mjs (Node) et le code du site (TypeScript).
 */
export const SITE_URL = 'https://sahlamaroc.com';

/**
 * Langues OUVERTES à l'indexation Google.
 * Stratégie : lancer EN + FR (marchés n°1), puis ajouter ES, DE, AR quand chaque langue
 * a au moins ~10 guides RELUS. Les autres langues restent accessibles mais en noindex
 * et hors sitemap => pas de pages "maigres" qui pénalisent tout le domaine.
 * @type {string[]}
 */
export const INDEXABLE_LOCALES = ['en', 'fr'];
