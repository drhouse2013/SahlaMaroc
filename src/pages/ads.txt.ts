/**
 * ads.txt — requis par AdSense pour éviter une baisse de revenus.
 * Généré depuis PUBLIC_ADSENSE_CLIENT (ca-pub-XXXX => pub-XXXX).
 */
import type { APIRoute } from 'astro';
import { ADSENSE_CLIENT } from '../config/site';
export const GET: APIRoute = () => {
  const pub = ADSENSE_CLIENT?.replace(/^ca-/, '');
  const body = pub ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n` : '# AdSense non configuré\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
