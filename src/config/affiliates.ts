/**
 * Registre central des programmes d'affiliation.
 * -----------------------------------------------------------------
 * - Les IDs viennent des variables d'environnement : changer de compte = 0 modif de code.
 * - Sans ID configuré, le lien pointe vers le site normal (fonctionne, mais sans commission)
 *   et un avertissement s'affiche au build.
 * - `subId` = identifiant de la page source => vous savez QUEL article convertit.
 *
 * Programmes recommandés pour démarrer (acceptent les petits sites) : voir docs/PLAN.md.
 */
export type ProviderId =
  | 'booking'
  | 'airalo'
  | 'wise'
  | 'getyourguide'
  | 'viator'
  | 'safetywing'
  | 'discovercars';

export interface BuildArgs {
  /** Recherche ou destination (ex : "Marrakech") */
  query?: string;
  /** Identifiant de tracking (slug de la page) */
  subId: string;
}

interface Provider {
  name: string;
  /** Variable d'environnement contenant l'ID / le lien d'affilié */
  envKey: string;
  build: (id: string | undefined, a: BuildArgs) => string;
}

const env = import.meta.env as Record<string, string | undefined>;

/** Ajoute des paramètres à une URL en ignorant les valeurs vides. */
function withParams(base: string, params: Record<string, string | undefined>): string {
  const url = new URL(base);
  for (const [k, v] of Object.entries(params)) if (v) url.searchParams.set(k, v);
  return url.toString();
}

export const PROVIDERS: Record<ProviderId, Provider> = {
  booking: {
    name: 'Booking.com',
    envKey: 'PUBLIC_BOOKING_AID',
    build: (aid, { query, subId }) =>
      withParams('https://www.booking.com/searchresults.html', {
        ss: query ?? 'Morocco',
        aid,
        label: aid ? subId : undefined,
      }),
  },
  airalo: {
    name: 'Airalo',
    // Lien de tracking complet fourni par Airalo/Impact (ex : https://airalo.pxf.io/c/123/456/789)
    envKey: 'PUBLIC_AIRALO_URL',
    build: (link, { subId }) =>
      link ? withParams(link, { subId1: subId }) : 'https://www.airalo.com/morocco-esim',
  },
  wise: {
    name: 'Wise',
    // Lien de parrainage Wise (ex : https://wise.com/invite/u/prenomn123)
    envKey: 'PUBLIC_WISE_URL',
    build: (link) => link ?? 'https://wise.com/',
  },
  getyourguide: {
    name: 'GetYourGuide',
    envKey: 'PUBLIC_GYG_PARTNER_ID',
    build: (pid, { query, subId }) =>
      withParams('https://www.getyourguide.com/s/', {
        q: query ?? 'Morocco',
        partner_id: pid,
        cmp: pid ? subId : undefined,
      }),
  },
  viator: {
    name: 'Viator',
    envKey: 'PUBLIC_VIATOR_PID',
    build: (pid, { query, subId }) =>
      withParams('https://www.viator.com/searchResults/all', {
        text: query ?? 'Morocco',
        pid,
        mcid: pid ? '42383' : undefined,
        medium: pid ? 'link' : undefined,
        campaign: pid ? subId : undefined,
      }),
  },
  safetywing: {
    name: 'SafetyWing',
    envKey: 'PUBLIC_SAFETYWING_REF',
    build: (ref) => withParams('https://safetywing.com/nomad-insurance', { referenceID: ref }),
  },
  discovercars: {
    name: 'DiscoverCars',
    envKey: 'PUBLIC_DISCOVERCARS_AID',
    build: (aid, { subId }) =>
      withParams('https://www.discovercars.com/morocco', { a_aid: aid, data1: aid ? subId : undefined }),
  },
};

const warned = new Set<ProviderId>();

/** Construit l'URL trackée d'un fournisseur. */
export function affiliateUrl(provider: ProviderId, args: BuildArgs): string {
  const p = PROVIDERS[provider];
  const id = env[p.envKey];
  if (!id && !warned.has(provider)) {
    warned.add(provider);
    console.warn(`[affiliates] ${p.envKey} non défini : liens ${p.name} sans tracking.`);
  }
  // subId nettoyé : les réseaux n'acceptent souvent que [a-z0-9-_] et ~60 caractères.
  const subId = args.subId.toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'site';
  return p.build(id, { query: args.query, subId });
}
