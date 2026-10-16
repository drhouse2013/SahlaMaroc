/**
 * Barème de la taxe spéciale annuelle sur les véhicules (TSAV, « vignette »), véhicules <= 3 000 kg.
 * Source lue le 2026-10-16 : fiche officielle DGI « الضريبة الخصوصية السنوية على السيارات » (tax.gov.ma, PDF, section arabe,
 * version française du même PDF introuvable : HTTP 503). Le PDF ne porte pas de date d'édition ; à revérifier à chaque loi de finances.
 */
export const VIGNETTE_LAST_CHECKED = '2026-10-16';

/** Montants annuels (DH) par tranche de puissance fiscale : [< 8 CV, 8-10 CV, 11-14 CV, >= 15 CV] */
export const VIGNETTE = {
  petrol: [350, 650, 3000, 8000],
  diesel: [700, 1500, 6000, 20000],
  /** Droit pour la délivrance d'un duplicata de vignette (DH) */
  duplicateMad: 100,
};
