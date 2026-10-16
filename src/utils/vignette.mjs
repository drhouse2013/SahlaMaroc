/**
 * Logique pure du calculateur « Vignette / TSAV » (aucune dépendance, testable avec node:test).
 * Montant annuel = barème[carburant][tranche de puissance fiscale] ; en cours d'année : montant × mois restants / 12.
 * Carburants : 'petrol' ; 'diesel' ; 'hybrid' (moteur électrique ou double motorisation : tarif essence) ;
 * 'pickup' (pick-up gasoil d'un particulier : tarif essence).
 * Le module ne traite pas les exonérations (véhicules de plus de 3 000 kg, etc.).
 */
export function parseNum(v) {
  if (typeof v === 'number') return Number.isFinite(v) ? v : NaN;
  const s = String(v ?? '').trim().replace(/\s/g, '').replace(',', '.');
  if (s === '') return NaN;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

export function bracket(cv) {
  return cv < 8 ? 0 : cv <= 10 ? 1 : cv <= 14 ? 2 : 3;
}

/**
 * @param {{cv:number, fuel:'petrol'|'diesel'|'hybrid'|'pickup', months?:number}} i
 * @param {{petrol:number[], diesel:number[]}} p
 */
export function computeVignette(i, p) {
  const errors = [];
  if (!Number.isFinite(i.cv)) errors.push({ field: 'cv', code: 'required' });
  else if (i.cv < 1 || !Number.isInteger(i.cv)) errors.push({ field: 'cv', code: 'cv_int' });
  else if (i.cv > 99) errors.push({ field: 'cv', code: 'cv_max' });
  if (!['petrol', 'diesel', 'hybrid', 'pickup'].includes(i.fuel)) errors.push({ field: 'fuel', code: 'required' });
  const months = i.months === undefined ? 12 : i.months;
  if (!Number.isFinite(months) || !Number.isInteger(months) || months < 1 || months > 12) errors.push({ field: 'months', code: 'months' });
  if (errors.length) return { ok: false, errors };
  const scale = i.fuel === 'diesel' ? 'diesel' : 'petrol';
  const b = bracket(i.cv);
  const annual = p[scale][b];
  const amount = Math.round((annual * months) / 12 + 1e-9);
  return { ok: true, scale, bracket: b, annual, months, amount };
}
