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
