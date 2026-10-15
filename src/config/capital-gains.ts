/**
 * Paramètres du calculateur « Impôt sur la plus-value immobilière (MRE) » (impôt sur le revenu au titre des profits fonciers).
 * Date de la dernière vérification : 2026-10-15. À revérifier à chaque loi de finances.
 *
 * Source unique lue : « Guide fiscal MRE » du ministère chargé des MRE (mre.gov.ma, fichier Guide MRE_FR_2025.pdf,
 * publié 2025-07, lu le 2026-10-15 ; une version « 2026 » n'a pas été trouvée). Il reprend le Code général des impôts
 * (profits fonciers). Le tableau officiel des coefficients de réévaluation n'a pas pu être lu : le coefficient est donc
 * saisi par l'utilisateur (1 = aucune réévaluation).
 */
export const CAPITAL_GAINS_LAST_CHECKED = '2026-10-15';

export const CAPITAL_GAINS = {
  /** Taux de l'impôt sur le profit net imposable */
  ratePct: 20,
  /** Cotisation minimale : 3 % du prix de cession, même en l'absence de profit */
  minPct: 3,
  /** Évaluation forfaitaire des frais d'acquisition : 15 % du prix d'acquisition (si les frais réels sont inférieurs) */
  acquisitionCostFlatPct: 15,
  /** Exonération : cessions de l'année civile dont la valeur totale n'excède pas ce montant (DH) */
  smallSalesCapMad: 140000,
  /** Habitation principale : ancienneté minimale d'occupation (ans) */
  mainResidenceYears: 5,
  /** Habitation principale : au-delà de ce prix, cotisation minimale de 3 % sur la fraction excédentaire (DH) */
  mainResidencePriceCapMad: 4000000,
  /** Habitation principale : délai maximal entre la vacance du logement et la cession (mois) */
  vacancyMaxMonths: 12,
  /** Logement social : ancienneté d'occupation (ans), surface couverte (m²), prix hors TVA (DH) */
  socialYears: 4,
  socialAreaMin: 50,
  socialAreaMax: 80,
  socialPriceCapMad: 250000,
};
