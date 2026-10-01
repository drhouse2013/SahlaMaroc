/**
 * Paramètres des calculateurs MRE — valeurs INDICATIVES, datées et sourcées.
 * ⚠️ À revérifier chaque trimestre (loi de finances, barèmes ANCFCC, notaires).
 * Toutes les valeurs restent modifiables par l'utilisateur dans les calculateurs.
 */
export const MRE_LAST_CHECKED = '2026-10-01';

/** Frais d'acquisition immobilière (taux usuels constatés en 2026) */
export const PROPERTY_FEES = {
  /** Droits d'enregistrement : logement 4 % ; terrain nu / local commercial : taux différent (souvent cité à 5 %) */
  registrationHousing: 4,
  registrationLand: 5,
  /** Conservation foncière (ANCFCC) : 1,5 % + montant fixe */
  landRegistry: 1.5,
  landRegistryFixed: 200,
  /** Honoraires du notaire : ~1 % (minimum usuel ~4 000 DH) + TVA */
  notary: 1,
  notaryMin: 4000,
  notaryVat: 20,
  /** Débours divers (timbres, certificats, copies) */
  misc: 1500,
};

/** Programme d'aide directe au logement (Daam Sakane) 2024-2028 — www.daamsakane.ma */
export const DAAM_SAKANE = [
  { maxPrice: 300_000, aid: 100_000 },
  { maxPrice: 700_000, aid: 70_000 },
];

/** Admission temporaire des véhicules immatriculés à l'étranger (MRE) : jours par année civile */
export const CAR_DAYS_PER_YEAR = 180;
