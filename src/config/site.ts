/**
 * Configuration globale lue depuis les variables d'environnement (.env / dashboard Vercel-Netlify).
 * Préfixe PUBLIC_ = valeur exposée au HTML (normal pour un ID AdSense ou d'affilié, ce ne sont pas des secrets).
 */
export const ADSENSE_CLIENT = import.meta.env.PUBLIC_ADSENSE_CLIENT as string | undefined; // ca-pub-XXXXXXXXXXXXXXXX
export const ADSENSE_SLOTS = {
  banner: import.meta.env.PUBLIC_ADSENSE_SLOT_BANNER as string | undefined,
  'in-article': import.meta.env.PUBLIC_ADSENSE_SLOT_IN_ARTICLE as string | undefined,
  sidebar: import.meta.env.PUBLIC_ADSENSE_SLOT_SIDEBAR as string | undefined,
} as const;

/** Analytics respectueux de la vie privée (Umami Cloud gratuit — pas de bannière cookies nécessaire) */
export const UMAMI_WEBSITE_ID = import.meta.env.PUBLIC_UMAMI_WEBSITE_ID as string | undefined;

/** Taux indicatif pour le calculateur (à mettre à jour mensuellement). 30/09/2026 : 1 EUR ≈ 11.0 MAD */
export const EUR_TO_MAD = 11.0;
export const EUR_TO_MAD_DATE = '2026-09-30';

/**
 * Contact public. ⚠️ L'adresse @sahlamaroc.com ne fonctionnera qu'après l'achat du domaine et la
 * création de la boîte mail : la changer ici (ou via PUBLIC_CONTACT_EMAIL) met tout le site à jour.
 */
export const CONTACT_EMAIL = (import.meta.env.PUBLIC_CONTACT_EMAIL as string | undefined) || 'contact@sahlamaroc.com';

/**
 * Formulaires (site 100 % statique, aucun backend) :
 * - PUBLIC_FORM_ENDPOINT : URL d'un service de formulaires acceptant un POST JSON (Formspree, Basin,
 *   Web3Forms…). Si absente, le formulaire de contact prépare un e-mail dans le logiciel de l'utilisateur.
 * - PUBLIC_NEWSLETTER_ENDPOINT : URL d'inscription (Brevo, Buttondown, ConvertKit… via leur endpoint
 *   de formulaire). Si absente, l'inscription passe aussi par un e-mail pré-rempli.
 * Ce ne sont pas des secrets : ce sont des URL publiques de formulaires.
 */
export const FORM_ENDPOINT = import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined;
export const NEWSLETTER_ENDPOINT = import.meta.env.PUBLIC_NEWSLETTER_ENDPOINT as string | undefined;

/**
 * Mode « fournisseur » de la lettre d'information (voir docs/NEWSLETTER-PDF.md). Aucun secret : seuls des
 * identifiants publics de formulaire sont utilisés.
 * - PUBLIC_NEWSLETTER_PROVIDER = brevo | mailerlite | buttondown
 * - PUBLIC_NEWSLETTER_FORM_ID  = brevo : URL complète du formulaire (https://xxxx.sibforms.com/serve/...) ;
 *                                mailerlite : « <idCompte>/<idFormulaire> » ; buttondown : nom d'utilisateur.
 * - PUBLIC_NEWSLETTER_FORM_ID_FR|EN|ES|DE|AR (facultatif) : identifiant propre à une langue (un formulaire
 *   par langue permet un e-mail de bienvenue par langue). À défaut, PUBLIC_NEWSLETTER_FORM_ID.
 * Priorité : fournisseur valide > PUBLIC_NEWSLETTER_ENDPOINT (JSON) > e-mail pré-rempli.
 */
export type NewsletterProvider = 'brevo' | 'mailerlite' | 'buttondown';
const NL_IDS: Record<string, string | undefined> = {
  default: import.meta.env.PUBLIC_NEWSLETTER_FORM_ID,
  fr: import.meta.env.PUBLIC_NEWSLETTER_FORM_ID_FR,
  en: import.meta.env.PUBLIC_NEWSLETTER_FORM_ID_EN,
  es: import.meta.env.PUBLIC_NEWSLETTER_FORM_ID_ES,
  de: import.meta.env.PUBLIC_NEWSLETTER_FORM_ID_DE,
  ar: import.meta.env.PUBLIC_NEWSLETTER_FORM_ID_AR,
};
/** Construit l'URL publique de soumission ; renvoie null (et avertit au build) si la configuration est absente ou invalide. */
export function newsletterProviderTarget(
  lang: string,
  provider: string | undefined = import.meta.env.PUBLIC_NEWSLETTER_PROVIDER,
  ids: Record<string, string | undefined> = NL_IDS,
): { provider: NewsletterProvider; url: string } | null {
  const p = (provider ?? '').trim().toLowerCase();
  if (!p) return null;
  const id = (ids[lang] || ids.default || '').trim();
  const fail = (why: string) => { console.warn(`[newsletter] PUBLIC_NEWSLETTER_PROVIDER=${p} ignoré : ${why}`); return null; };
  if (!id) return fail('identifiant de formulaire manquant');
  if (p === 'brevo') {
    try {
      const u = new URL(id);
      if (u.protocol !== 'https:' || !u.hostname.endsWith('.sibforms.com') || !u.pathname.startsWith('/serve/')) return fail('URL Brevo attendue : https://xxxx.sibforms.com/serve/...');
      return { provider: 'brevo', url: u.toString() };
    } catch { return fail('URL Brevo invalide'); }
  }
  if (p === 'mailerlite') {
    const m = /^(\d+)\/(\d+)$/.exec(id);
    return m ? { provider: 'mailerlite', url: `https://assets.mailerlite.com/jsonp/${m[1]}/forms/${m[2]}/subscribe` } : fail('format attendu : <idCompte>/<idFormulaire> (chiffres)');
  }
  if (p === 'buttondown') {
    return /^[A-Za-z0-9_-]+$/.test(id) ? { provider: 'buttondown', url: `https://buttondown.com/api/emails/embed-subscribe/${id}` } : fail('nom d\'utilisateur Buttondown attendu (lettres, chiffres, - _)');
  }
  return fail('fournisseur inconnu (brevo | mailerlite | buttondown)');
}

/** Check-list imprimable « Retour d'été au Maroc » (PDF généré par `node tools/build-pdf.mjs`, commité dans public/downloads/). */
export const checklistPdfPath = (lang: string) => `/downloads/sahla-checklist-retour-ete-${lang}.pdf`;
