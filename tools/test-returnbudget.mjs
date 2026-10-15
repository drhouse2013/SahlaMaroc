/** node --test tools/test-returnbudget.mjs (valeurs attendues calculées à la main) */
import test from 'node:test';
import assert from 'node:assert/strict';
import { computeReturnBudget } from '../src/utils/returnbudget.mjs';
import { costsByCity } from '../src/utils/costofliving.mjs';

const P = { vatPct: 20, tpiPct: 0.25, diEvHybridPct: 0, diThermalPct: 17.5, abatementPct: 90, capMad: 300000, minAge: 60, minResidenceYears: 10, ageGeneral: 5, ageExtended: 10, luxuryThreshold: 400000 };
const monthly = { housing: 5000, food: 3000, transport: 500, leisure: 1000, mobile: 130 };

test('sans voiture : ponctuel + 12 mois courants + imprévus', () => {
  // mensuel 9630 ; +10 % = 10 593 ; x12 = 127 116. Caution 2 x 5000 = 10 000. Ponctuel 20000+10000+3000+8000 = 41 000.
  const r = computeReturnBudget({ monthly, oneOff: { moving: 20000, installation: 3000, school: 8000 }, depositMonths: 2, contingencyPct: 10, car: { value: '', regime: 'standard', diPct: 0 }, customsParams: P });
  assert.equal(r.ok, true);
  assert.equal(r.oneOff.deposit, 10000);
  assert.equal(r.oneOffTotal, 41000);
  assert.ok(Math.abs(r.monthlyTotal - 10593) < 1e-6);
  assert.ok(Math.abs(r.first12Running - 127116) < 1e-6);
  assert.ok(Math.abs(r.grandTotal - 168116) < 1e-6);
});

test('voiture : droits via customs.mjs (valeur 100 000, abattement 0, DI 17,5 %)', () => {
  // base 100 000 ; DI 17 500 ; TPI 250 ; TVA (117 750) x 20 % = 23 550 ; total 41 300
  const r = computeReturnBudget({ monthly, oneOff: {}, depositMonths: 0, contingencyPct: 0, car: { value: 100000, regime: 'standard', diPct: 17.5 }, customsParams: P });
  assert.equal(r.ok, true);
  assert.equal(r.oneOff.car, 41300);
});

test('champs invalides signalés', () => {
  const r = computeReturnBudget({ monthly: { ...monthly, food: -1 }, oneOff: { moving: 'abc' }, depositMonths: 0, contingencyPct: 0, customsParams: P });
  assert.equal(r.ok, false);
  assert.deepEqual(r.invalid.sort(), ['food', 'moving']);
});

test('coût par ville : tri croissant et calcul à la main', () => {
  const base = { rentMonth: { mid: 7000 }, foodDay: { mid: 180 }, transportDay: { mid: 50 }, funDay: { mid: 80 }, simMonth: 130 };
  const rows = costsByCity(base, { a: 1, b: 0.5 }, 'mid', 2);
  // a : 7000 + 10800 + 3000 + 4800 + 260 = 25 860 ; b : 3500 + 5400 + 1500 + 2400 + 260 = 13 060
  assert.deepEqual(rows.map((x) => [x.city, x.total]), [['b', 13060], ['a', 25860]]);
  assert.equal(costsByCity(base, { a: 1 }, 'mid', 0), null);
});
