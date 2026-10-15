/**
 * Logique pure du calculateur « Impôt sur la plus-value immobilière (MRE) » (aucune dépendance, testable avec node:test).
 *
 *   base d'acquisition = prix d'acquisition × coefficient de réévaluation (saisi) + frais d'acquisition + dépenses d'investissement
 *   frais d'acquisition = max(frais réels saisis, 15 % × prix d'acquisition)   [évaluation forfaitaire]
 *   profit net          = prix de cession − base d'acquisition
 *   impôt standard      = max(20 % × max(profit net, 0), 3 % × prix de cession)  (minimum même sans profit)
 * Exonérations (le module vérifie les conditions saisies ; chaque condition non remplie renvoie un code) :
 *   'main'   habitation principale occupée depuis 5 ans au moins, non louée, une seule fois en 5 ans, cession dans l'année
 *            suivant la vacance : profit exonéré ; minimum de 3 % sur la fraction du prix > 4 000 000 DH.
 *   'social' première cession d'un logement social (4 ans, 50-80 m², prix <= 250 000 DH HT) : exonérée.
 *   'small'  cessions de l'année <= 140 000 DH au total : exonérées.
 * Le module NE détermine PAS le coefficient de réévaluation ni la qualification d'habitation principale par l'administration.
 * Arrondi : montants arrondis au dirham.
 */
export function parseNum(v) {
  if (typeof v === 'number') return Number.isFinite(v) ? v : NaN;
  const s = String(v ?? '').trim().replace(/\s/g, '').replace(',', '.');
  if (s === '') return NaN;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}
export const round = (x) => Math.round(x + 1e-9);

/** Contrôle des conditions d'une exonération. Renvoie les codes des conditions non remplies. */
export function checkExemption(i, p) {
  const blockers = [];
  const warnings = [];
  if (i.exemption === 'main') {
    if (!(i.occupancyYears >= p.mainResidenceYears)) blockers.push('main_years');
    if (i.rented) blockers.push('main_rented');
    if (i.usedRecently) blockers.push('main_used');
    if (i.vacancyMonths > p.vacancyMaxMonths) blockers.push('main_vacancy');
    if (i.vacancyMonths === p.vacancyMaxMonths) warnings.push('main_vacancy_border');
    warnings.push('main_land');
  } else if (i.exemption === 'social') {
    if (!(i.occupancyYears >= p.socialYears)) blockers.push('social_years');
    if (!(i.areaM2 >= p.socialAreaMin && i.areaM2 <= p.socialAreaMax)) blockers.push('social_area');
    if (!(i.price <= p.socialPriceCapMad)) blockers.push('social_price');
    if (!i.firstSale) blockers.push('social_first');
  } else if (i.exemption === 'small') {
    if (!(i.yearSalesTotal <= p.smallSalesCapMad)) blockers.push('small_total');
  }
  return { eligible: blockers.length === 0, blockers, warnings };
}

/**
 * @param {object} i
 * @param {number} i.price              prix de cession (MAD)
 * @param {number} i.acquisitionPrice   prix d'acquisition (MAD)
 * @param {number} i.coefficient        coefficient de réévaluation saisi (>= 1 ; 1 = aucun)
 * @param {number} [i.acquisitionCosts] frais d'acquisition réels (MAD), 0 par défaut
 * @param {number} [i.works]            dépenses de construction, d'agrandissement ou d'amélioration justifiées (MAD)
 * @param {'none'|'main'|'social'|'small'} [i.exemption]
 * @param {object} p paramètres (CAPITAL_GAINS)
 */
export function computeCapitalGain(i, p) {
  const errors = [];
  const check = (f, positive) => {
    if (!Number.isFinite(i[f])) errors.push({ field: f, code: 'required' });
    else if (i[f] < 0 || (positive && i[f] === 0)) errors.push({ field: f, code: positive ? 'positive' : 'negative' });
  };
  check('price', true);
  check('acquisitionPrice', true);
  if (!Number.isFinite(i.coefficient)) errors.push({ field: 'coefficient', code: 'required' });
  else if (i.coefficient < 1) errors.push({ field: 'coefficient', code: 'coef_min' });
  const costs = Number.isFinite(i.acquisitionCosts) ? i.acquisitionCosts : 0;
  const works = Number.isFinite(i.works) ? i.works : 0;
  if (costs < 0) errors.push({ field: 'acquisitionCosts', code: 'negative' });
  if (works < 0) errors.push({ field: 'works', code: 'negative' });
  if (errors.length) return { ok: false, errors };

  const revalued = round(i.acquisitionPrice * i.coefficient);
  const flatCosts = round((i.acquisitionPrice * p.acquisitionCostFlatPct) / 100);
  const costsUsed = Math.max(round(costs), flatCosts);
  const costsKind = round(costs) >= flatCosts ? 'actual' : 'flat';
  const acquisitionBase = revalued + costsUsed + round(works);
  const profit = i.price - acquisitionBase;
  const minTax = round((i.price * p.minPct) / 100);
  const standardTax = Math.max(round((Math.max(profit, 0) * p.ratePct) / 100), minTax);

  const exemption = i.exemption ?? 'none';
  let applied = 'none';
  let tax = standardTax;
  let blockers = [];
  let warnings = [];
  if (exemption !== 'none') {
    const chk = checkExemption({ ...i, exemption }, p);
    blockers = chk.blockers;
    warnings = chk.warnings;
    if (chk.eligible) {
      applied = exemption;
      if (exemption === 'main') {
        tax = i.price > p.mainResidencePriceCapMad ? round(((i.price - p.mainResidencePriceCapMad) * p.minPct) / 100) : 0;
      } else tax = 0;
    }
  }
  return {
    ok: true, exemption, applied, eligible: exemption === 'none' ? null : applied === exemption,
    blockers, warnings, revalued, costsUsed, costsKind, works: round(works), acquisitionBase, profit,
    loss: profit < 0, minTax, standardTax, tax, netProceeds: i.price - tax,
  };
}
