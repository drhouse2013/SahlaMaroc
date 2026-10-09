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

/** Check-list imprimable « Retour d'été au Maroc » (PDF généré par `node tools/build-pdf.mjs`, commité dans public/downloads/). */
export const checklistPdfPath = (lang: string) => `/downloads/sahla-checklist-retour-ete-${lang}.pdf`;
