/**
 * Logique pure du calculateur « Budget de retour définitif » (testable avec node:test).
 * Tout est en MAD. Deux blocs :
 *  - dépenses ponctuelles : déménagement, voiture (droits calculés par customs.mjs), caution/avance de loyer
 *    (mois x loyer), installation, scolarité de la première année ;
 *  - dépenses courantes des 12 premiers mois : loyer, alimentation, transport, loisirs, mobile + marge d'imprévus.
 * Aucun montant n'est inventé : les postes sans donnée valent ce que l'utilisateur saisit.
 */
import { computeCustoms, parseNum } from './customs.mjs';

export const MONTHLY = ['housing', 'food', 'transport', 'leisure', 'mobile'];
export const ONE_OFF = ['moving', 'installation', 'school'];

/** Champ vide = 0 ; non numérique ou négatif = invalide (null). */
function amount(raw) {
  if (raw === '' || raw === undefined || raw === null) return 0;
  const n = parseNum(raw);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export function computeReturnBudget(input) {
  const invalid = [];
  const m = {};
  for (const k of MONTHLY) { const v = amount(input.monthly?.[k]); if (v === null) invalid.push(k); else m[k] = v; }
  const o = {};
  for (const k of ONE_OFF) { const v = amount(input.oneOff?.[k]); if (v === null) invalid.push(k); else o[k] = v; }
  const dm = amount(input.depositMonths); if (dm === null) invalid.push('depositMonths');
  const cp = amount(input.contingencyPct); if (cp === null) invalid.push('contingency');

  // Voiture : valeur vide ou 0 = pas de voiture.
  let car = { total: 0, applied: 'none', warnings: [], blockers: [], result: null };
  const cv = amount(input.car?.value);
  if (cv === null) invalid.push('carValue');
  else if (cv > 0) {
    const c = input.car;
    const res = computeCustoms({
      value: cv, regime: c.regime, diPct: parseNum(c.diPct), tpiPct: input.customsParams.tpiPct, vatPct: input.customsParams.vatPct,
      otherAbatementPct: parseNum(c.otherAbatementPct ?? 0),
      vehicleAge: c.vehicleAge === '' || c.vehicleAge === undefined ? NaN : parseNum(c.vehicleAge),
      beneficiaryAge: parseNum(c.beneficiaryAge), residenceYears: parseNum(c.residenceYears),
    }, input.customsParams);
    if (!res.ok) invalid.push(...res.errors.map((e) => e.field));
    else car = { total: res.total, applied: res.applied, warnings: res.warnings, blockers: res.blockers, result: res };
  }
  if (invalid.length) return { ok: false, invalid };

  const deposit = dm * m.housing;
  const oneOffTotal = o.moving + car.total + deposit + o.installation + o.school;
  const monthlySubtotal = MONTHLY.reduce((s, k) => s + m[k], 0);
  const contingencyMonthly = (monthlySubtotal * cp) / 100;
  const monthlyTotal = monthlySubtotal + contingencyMonthly;
  const first12Running = monthlyTotal * 12;
  return {
    ok: true,
    oneOff: { moving: o.moving, car: car.total, deposit, installation: o.installation, school: o.school },
    oneOffTotal, monthlySubtotal, contingencyMonthly, monthlyTotal, first12Running,
    grandTotal: oneOffTotal + first12Running,
    car,
  };
}
