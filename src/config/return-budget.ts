/**
 * Paramètres du calculateur « Budget de retour définitif » (en MAD).
 * Dernière vérification : 2026-10-16. À revoir avec src/config/costs.ts (trimestriel).
 *
 * Règle : aucune valeur n'est inventée.
 *  - dépenses courantes : valeurs de départ dérivées de src/config/costs.ts (estimation datée, modifiable) ;
 *  - déménagement, mois de caution/avance, installation, scolarité : aucun chiffre sourcé dans le dépôt,
 *    valeur de départ 0, à saisir d'après vos devis ;
 *  - droits et taxes du véhicule : src/config/customs.ts (via src/utils/customs.mjs).
 */
import { BASE, CITY_FACTOR, COSTS_LAST_UPDATED, type City, type Lifestyle } from './costs';

export const RETURN_BUDGET_LAST_CHECKED = '2026-10-16';
export { COSTS_LAST_UPDATED };

export type ReturnItemKey = 'housing' | 'food' | 'transport' | 'leisure' | 'mobile';

/** Valeurs de départ mensuelles (MAD) pour une ville et un style de vie, depuis costs.ts. */
export function monthlyStart(city: City, style: Lifestyle): Record<ReturnItemKey, number> {
  const f = CITY_FACTOR[city] ?? 1;
  return {
    housing: Math.round(BASE.rentMonth[style] * f),
    food: Math.round(BASE.foodDay[style] * 30 * f),
    transport: Math.round(BASE.transportDay[style] * 30 * f),
    leisure: Math.round(BASE.funDay[style] * 30 * f),
    mobile: BASE.simMonth,
  };
}
