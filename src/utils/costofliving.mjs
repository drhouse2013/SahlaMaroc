/**
 * Logique pure du calculateur « Coût de la vie par ville » (testable avec node:test).
 * Mensuel en MAD : loyer (ménage) x coefficient ville ; alimentation, transport local et loisirs
 * (par personne et par jour x 30 jours) x coefficient ville x nombre de personnes ; forfait mobile par personne
 * (sans coefficient). Valeurs de base : src/config/costs.ts.
 */
export const LINES = ['housing', 'food', 'transport', 'leisure', 'mobile'];

export function costsByCity(base, factors, style, persons) {
  if (!Number.isInteger(persons) || persons < 1) return null;
  if (!base.rentMonth[style]) return null;
  const rows = Object.keys(factors).map((city) => {
    const f = factors[city];
    const housing = Math.round(base.rentMonth[style] * f);
    const food = Math.round(base.foodDay[style] * 30 * f * persons);
    const transport = Math.round(base.transportDay[style] * 30 * f * persons);
    const leisure = Math.round(base.funDay[style] * 30 * f * persons);
    const mobile = Math.round(base.simMonth * persons);
    return { city, housing, food, transport, leisure, mobile, total: housing + food + transport + leisure + mobile };
  });
  return rows.sort((a, b) => a.total - b.total || a.city.localeCompare(b.city));
}
