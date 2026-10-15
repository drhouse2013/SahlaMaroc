/** Convertisseur euro-dirham : logique pure. Le taux est saisi/modifiable ; aucun taux n'est déterminé ici. */
export function parseNum(v) {
  if (typeof v === 'number') return Number.isFinite(v) ? v : NaN;
  const s = String(v ?? '').trim().replace(/\s/g, '').replace(',', '.');
  if (s === '') return NaN;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}
/** Arrondi au centime (demi vers le haut, tolérance flottante). */
export const round2 = (x) => Math.round(x * 100 + 1e-7) / 100;
/** @param {{amount:number, rate:number, direction:'eur-mad'|'mad-eur'}} i  rate = dirhams pour 1 euro */
export function convert(i) {
  const errors = [];
  if (!Number.isFinite(i.amount)) errors.push({ field: 'amount', code: 'required' });
  else if (i.amount < 0) errors.push({ field: 'amount', code: 'negative' });
  if (!Number.isFinite(i.rate)) errors.push({ field: 'rate', code: 'required' });
  else if (i.rate <= 0) errors.push({ field: 'rate', code: 'positive' });
  if (errors.length) return { ok: false, errors };
  const result = i.direction === 'mad-eur' ? i.amount / i.rate : i.amount * i.rate;
  return { ok: true, result: round2(result), inverseRate: 1 / i.rate };
}
