/**
 * Liaisons maritimes vers le Maroc et péages ADM (classe 1).
 * Source unique : guides publiés « ferry-guide » (durées, compagnies, programmes été 2026)
 * et « motorway » (grille tarifaire ADM). Aucun prix de traversée : voir le site de la compagnie.
 * Sebta : aucune liaison documentée dans nos guides, donc non listée.
 */
export const FERRIES_LAST_CHECKED = '2026-10-10';

export type Dest = 'tangermed' | 'tangercity' | 'nador' | 'alhoceima';
export type Origin = 'es' | 'fr' | 'it';

export interface Route {
  from: string;
  origin: Origin;
  dest: Dest;
  /** Durée indicative en heures [min, max] ; max null = « et plus » */
  hours: [number, number | null];
  companies: string[];
  checked: string;
}

const C = FERRIES_LAST_CHECKED;

export const ROUTES: Route[] = [
  { from: 'Algeciras', origin: 'es', dest: 'tangermed', hours: [1.5, 2.5], companies: ['Baleària', 'Trasmed', 'AML', 'FRS', 'Naviera Armas'], checked: C },
  { from: 'Tarifa', origin: 'es', dest: 'tangercity', hours: [1, 1], companies: ['Baleària', 'AML'], checked: C },
  { from: 'Motril', origin: 'es', dest: 'tangermed', hours: [5, 8], companies: ['Baleària', 'Trasmed'], checked: C },
  { from: 'Motril', origin: 'es', dest: 'alhoceima', hours: [5, 8], companies: ['Baleària', 'Trasmed'], checked: C },
  { from: 'Almería', origin: 'es', dest: 'nador', hours: [7, 11], companies: ['Naviera Armas', 'Trasmed', 'Baleària'], checked: C },
  { from: 'Barcelona', origin: 'es', dest: 'tangermed', hours: [29, 34], companies: ['GNV'], checked: C },
  { from: 'Sète', origin: 'fr', dest: 'tangermed', hours: [34, 48], companies: ['GNV', 'Baleària'], checked: C },
  { from: 'Sète', origin: 'fr', dest: 'nador', hours: [34, 48], companies: ['GNV', 'Baleària'], checked: C },
  { from: 'Gênes', origin: 'it', dest: 'tangermed', hours: [48, null], companies: ['GNV'], checked: C },
];

/** Péages ADM, classe 1 (voiture de tourisme), grille consultée le 10/10/2026. */
export const TOLLS: { from: string; to: string; dh: number; approx?: boolean }[] = [
  { from: 'Kénitra Nord', to: 'Port Tanger Med', dh: 89 },
  { from: 'Kénitra Nord', to: 'Tanger Est', dh: 78 },
  { from: 'Kénitra Nord', to: 'Tanger Ouest', dh: 68 },
  { from: 'Kénitra Nord', to: 'Larache', dh: 41 },
  { from: 'Kénitra Nord', to: 'Moulay Bousselham', dh: 29 },
  { from: 'Casablanca', to: 'Rabat', dh: 25, approx: true },
];
