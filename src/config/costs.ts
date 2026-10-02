/**
 * Données du calculateur de budget (en MAD).
 * ⚠️ ESTIMATIONS DE DÉPART À CALIBRER SUR LE TERRAIN (Yassine) puis à mettre à jour chaque trimestre.
 * Un chiffre vérifié et daté = un avantage SEO (E-E-A-T) et des backlinks naturels.
 */
export const COSTS_LAST_UPDATED = '2026-10-01';

export const CITIES = ['marrakech', 'casablanca', 'rabat', 'tangier', 'agadir', 'essaouira', 'fes'] as const;
export type City = (typeof CITIES)[number];

export const CITY_LABEL: Record<City, string> = {
  marrakech: 'Marrakech',
  casablanca: 'Casablanca',
  rabat: 'Rabat',
  tangier: 'Tangier / Tanger',
  agadir: 'Agadir / Taghazout',
  essaouira: 'Essaouira',
  fes: 'Fès / Fez',
};

/** Coefficient de prix par ville (1 = moyenne nationale des grandes villes) */
export const CITY_FACTOR: Record<City, number> = {
  casablanca: 1.15,
  marrakech: 1.1,
  rabat: 1.05,
  tangier: 1.0,
  agadir: 0.95,
  essaouira: 0.9,
  fes: 0.85,
};

export type Lifestyle = 'budget' | 'mid' | 'comfort';

/** Coûts de référence (MAD), avant coefficient ville */
export const BASE = {
  /** Loyer mensuel meublé (studio/1 ch. hors medina touristique) */
  rentMonth: { budget: 4500, mid: 7000, comfort: 11000 },
  /** Nuit d'hébergement court séjour (auberge / riad / hôtel 4*) */
  nightStay: { budget: 200, mid: 650, comfort: 1400 },
  /** Nourriture par jour et par personne */
  foodDay: { budget: 90, mid: 180, comfort: 350 },
  /** Transport local par jour (tram, petit taxi, Careem/inDrive) */
  transportDay: { budget: 20, mid: 50, comfort: 120 },
  /** Loisirs, sorties, visites par jour */
  funDay: { budget: 30, mid: 80, comfort: 200 },
  /** Forfait mobile 30 jours (~10-20 Go chez les opérateurs locaux, 100-130 MAD) */
  simMonth: 130,
  /** Coworking : abonnement mensuel / journée */
  coworkingMonth: 1500,
  coworkingDay: 120,
} as const;
