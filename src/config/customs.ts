/**
 * Paramètres du calculateur « Frais de dédouanement d'une voiture » (retour définitif / MRE).
 * Date de la dernière vérification : 2026-10-10. À revérifier à chaque loi de finances et à chaque
 * circulaire ADII (opération Marhaba, en général en mai-juin).
 *
 * Légende du champ `status` :
 *  - 'official'  : règle ou taux lus dans un texte officiel (circulaire/guide ADII, loi) consulté,
 *                  ou confirmé par plusieurs sources dont une institutionnelle ;
 *  - 'secondary' : taux relevé uniquement dans la presse ou des sites professionnels, non retrouvé
 *                  sur un texte officiel : il sert d'ESTIMATION et reste modifiable par l'utilisateur.
 *
 * Note d'accès : douane.gov.ma a refusé les requêtes automatisées pendant la recherche (« Request Rejected »).
 * Les textes ADII ont donc été lus via leurs copies publiées sur finances.gov.ma et via la presse qui les cite.
 * 2026-10-10 : la fiche officielle « Dédouanement d'un véhicule » du catalogue de services ADII (douane.gov.ma, articleId=51643,
 * lue via Firecrawl) confirme l'abattement 90 % (60 ans, > 10 ans de résidence, plafond 300 000 DH, 9 places), le vieillissement
 * de 3 ans (abattement 25 %) pour le retour définitif et les limites d'âge du véhicule. Elle ne donne PAS le taux du droit
 * d'importation (renvoi à l'application MCV, SPA non lisible) ; les pages ADiL (adil/info_2.asp) renvoient « Request Rejected ».
 * Tarif SH 8703 non retrouvé sur un texte officiel : droits d'importation laissés 'secondary' (indicatifs).
 */
export const CUSTOMS_LAST_CHECKED = '2026-10-10';

export interface CustomsParam<T = number> {
  value: T;
  status: 'official' | 'secondary';
  /** Où la valeur a été lue (et à quelle date) */
  source: string;
}

export const CUSTOMS = {
  /**
   * TVA à l'importation : taux normal de 20 %, calculée sur la valeur en douane majorée du droit d'importation
   * et de la taxe parafiscale. Taux : GTAI (agence allemande du commerce extérieur), page du 10/02/2026, consultée
   * le 2026-10-09 ; assiette : Médias24 (01/01/2026, ADII) et Jurispro/Artemis, consultés le 2026-10-09.
   */
  vatPct: { value: 20, status: 'official', source: 'TVA taux normal ; GTAI 10/02/2026 ; assiette DI+TPI : Médias24 01/01/2026' } satisfies CustomsParam,

  /**
   * Taxe parafiscale à l'importation (TPI) : 0,25 %. Source : GTAI, page du 10/02/2026 (consultée 2026-10-09),
   * recoupée par Médias24 (01/01/2026) et plusieurs sites professionnels. Texte de loi non retrouvé : 'secondary'.
   * Assiette retenue : la base imposable (valeur de référence après abattement) ; l'écart avec une assiette
   * « valeur en douane » est négligeable (0,25 % × droit d'importation).
   */
  tpiPct: { value: 0.25, status: 'secondary', source: 'GTAI 10/02/2026 ; Médias24 01/01/2026' } satisfies CustomsParam,

  /**
   * Droit d'importation (DI) : le taux dépend de la position tarifaire (SH 87.03), de la motorisation et de
   * l'origine (accords de libre-échange). Aucun taux n'a pu être lu sur adii.gov.ma. Valeurs INDICATIVES :
   *  - hybride / électrique : 2,5 % (Médias24, 01/01/2026, qui cite l'ADII ; recoupé par deux sites professionnels,
   *    d'autres sources parlent de 0 % pour l'électrique : à confirmer) ;
   *  - voiture thermique de tourisme : 17,5 % (taux le plus souvent cité ; PLF 2018 amendé : « 17,5 % et 25 % »,
   *    Médias24/FNH 20/11/2017 ; Jurispro/Artemis). D'autres sources donnent 10 % à 40 % selon le cas.
   */
  diPresetEvHybridPct: { value: 2.5, status: 'secondary', source: 'Médias24 01/01/2026 (citant l’ADII)' } satisfies CustomsParam,
  diPresetThermalPct: { value: 17.5, status: 'secondary', source: 'FNH 20/11/2017 ; Jurispro/Artemis ; sites professionnels 2025-2026' } satisfies CustomsParam,

  /**
   * Abattement de 90 % des MRE âgés de 60 ans et plus. Sources : circulaire ADII n° 5945/311 du 04/06/2019
   * (copie finances.gov.ma, consultée 2026-10-09) ; guide ADII « Marocains du monde » (copie finances.gov.ma,
   * version 2011 : 85 %, relevé ensuite à 90 %) ; Bladi.net 07/06/2026 et 09/12/2025 (circulaires Marhaba, mêmes
   * conditions) ; Bladi.net 17/07/2023 (citation du guide ADII).
   */
  abatement90Pct: { value: 90, status: 'official', source: 'Fiche ADII « Dédouanement d’un véhicule » (douane.gov.ma, 10/10/2026) ; circulaire 5945/311 (04/06/2019)' } satisfies CustomsParam,
  /** Plafond de la valeur à l'état neuf soumise à l'abattement : au-delà, droit commun (mêmes sources). */
  abatement90CapMad: { value: 300000, status: 'official', source: 'Circulaire ADII 5945/311 ; Marhaba 2026 via Bladi 07/06/2026' } satisfies CustomsParam,
  /** Âge minimal du bénéficiaire (ans révolus). */
  abatement90MinAge: { value: 60, status: 'official', source: 'Circulaire ADII 5945/311 ; Marhaba 2026' } satisfies CustomsParam,
  /** Résidence effective à l'étranger : « plus de dix (10) années » (strictement). */
  abatement90MinResidenceYears: { value: 10, status: 'official', source: 'Circulaire ADII 5945/311 ; guide ADII ; Bladi 17/07/2023' } satisfies CustomsParam,
  /** Nombre maximal de places (conducteur compris) d'une voiture de tourisme éligible. */
  abatement90MaxSeats: { value: 9, status: 'official', source: 'Circulaire ADII 5945/311 ; Marhaba 2026 (le guide 2011 parlait de 7 places)' } satisfies CustomsParam,

  /**
   * Âge du véhicule : règle générale, véhicule de moins de 5 ans ; exception jusqu'à 10 ans pour un MRE retraité
   * (plus de 10 ans de résidence à l'étranger) ou en retour définitif (carrosserie berline, 9 places maximum).
   * Sources : circulaire ADII 5945/311 ; guide ADII (finances.gov.ma) ; Bladi 07/06/2026 et 17/07/2023.
   */
  vehicleAgeGeneralLimitYears: { value: 5, status: 'official', source: 'Circulaire ADII 5945/311 ; Bladi 17/07/2023' } satisfies CustomsParam,
  vehicleAgeExtendedLimitYears: { value: 10, status: 'official', source: 'Circulaire ADII 5945/311 ; Bladi 07/06/2026' } satisfies CustomsParam,

  /**
   * Seuil de valeur à partir duquel un droit de timbre proportionnel sur les voitures de luxe peut s'appliquer
   * (5 % de 400 000 à 600 000 DH, etc.). Non calculé par l'outil (assiette et barème non confirmés sur un texte
   * officiel) : l'outil affiche seulement un avertissement au-delà du seuil. Sources : TelQuel 02/01/2018 (loi de
   * finances 2017, perception par la douane) ; sites professionnels 2026.
   */
  luxuryStampThresholdMad: { value: 400000, status: 'secondary', source: 'TelQuel 02/01/2018 ; sites professionnels 2026' } satisfies CustomsParam,
} as const;

/** Version « valeurs seules » transmise au script du navigateur. */
export const CUSTOMS_VALUES = {
  vatPct: CUSTOMS.vatPct.value,
  tpiPct: CUSTOMS.tpiPct.value,
  diEvHybridPct: CUSTOMS.diPresetEvHybridPct.value,
  diThermalPct: CUSTOMS.diPresetThermalPct.value,
  abatementPct: CUSTOMS.abatement90Pct.value,
  capMad: CUSTOMS.abatement90CapMad.value,
  minAge: CUSTOMS.abatement90MinAge.value,
  minResidenceYears: CUSTOMS.abatement90MinResidenceYears.value,
  ageGeneral: CUSTOMS.vehicleAgeGeneralLimitYears.value,
  ageExtended: CUSTOMS.vehicleAgeExtendedLimitYears.value,
  luxuryThreshold: CUSTOMS.luxuryStampThresholdMad.value,
};
