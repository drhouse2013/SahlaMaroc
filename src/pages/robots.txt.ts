/** robots.txt généré (sitemap sur le bon domaine ; les index de recherche JSON ne sont pas à explorer). */
import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\nDisallow: /*/search-index.json$\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
