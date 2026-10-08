/**
 * Réglages partagés entre astro.config.mjs (Node) et le code du site (TypeScript).
 */

/**
 * Domaine canonique.
 * - Tant que sahlamaroc.com n'est pas branché (DNS + domaine ajouté dans Vercel), le site vit sur
 *   sahla-maroc.vercel.app : canonical, sitemap, robots.txt et URL Open Graph doivent pointer vers
 *   CE domaine, sinon Google reçoit des canonical vers un domaine qui ne répond pas.
 * - Migration : ajouter le domaine dans Vercel, puis définir la variable d'environnement
 *   SITE_URL=https://sahlamaroc.com (Production) et redéployer. Aucune modification de code.
 *   Les redirections www / sahlamorocco.com → sahlamaroc.com sont déjà prêtes dans vercel.json.
 */
export const PRODUCTION_DOMAIN = 'https://sahlamaroc.com';
export const SITE_URL = (process.env.SITE_URL || 'https://sahla-maroc.vercel.app').replace(/\/+$/, '');

/**
 * Langues OUVERTES à l'indexation Google.
 * Stratégie : lancer EN + FR (marchés n°1), puis ajouter ES, DE, AR quand chaque langue
 * a au moins ~10 guides RELUS. Les autres langues restent accessibles mais en noindex
 * et hors sitemap => pas de pages "maigres" qui pénalisent tout le domaine.
 * @type {string[]}
 */
export const INDEXABLE_LOCALES = ['en', 'fr'];
