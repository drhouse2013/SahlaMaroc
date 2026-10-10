/**
 * Paramètres des calculateurs MRE — valeurs INDICATIVES, datées et sourcées.
 * ⚠️ À revérifier chaque trimestre (loi de finances, barèmes ANCFCC, notaires).
 * Toutes les valeurs restent modifiables par l'utilisateur dans les calculateurs.
 */
export const MRE_LAST_CHECKED = '2026-10-10';

/** Frais d'acquisition immobilière (taux usuels constatés en 2026) */
export const PROPERTY_FEES = {
  /** Droits d'enregistrement : logement 4 % ; terrain nu / local commercial : taux différent (souvent cité à 5 %) */
  registrationHousing: 4,
  registrationLand: 5,
  /** Conservation foncière (ANCFCC) : 1,5 % + montant fixe */
  landRegistry: 1.5,
  landRegistryFixed: 200,
  /**
   * Honoraires du notaire : ~1 % (hypothèse indicative) ; minimum 4 000 DH pour une vente <= 300 000 DH.
   * Barème du projet de décret n° 2.17.481 (presse, LesEco.ma 14/12/2018 ; adopté en Conseil de gouvernement,
   * BO n° 6910 de 2020 ; publication du texte final NON confirmée) : <= 300 000 DH : 4 000 DH ; 300 001-1 M : 1,5 % ;
   * 1 M-5 M : 1,25 % ; 5 M-10 M : 0,75 % ; > 10 M : 0,5 %. Minima réduits pour un premier contrat : 1 500 DH (faible valeur),
   * 3 000 DH (logement économique), 5 000 DH (moyen standing). Le 1 % ci-dessous sous-estime donc le barème cité.
   * TVA : 20 % depuis le 01/01/2023 (LF 2023, note circulaire DGI n° 733, finances.gov.ma, consultée 2026-10-10).
   */
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
