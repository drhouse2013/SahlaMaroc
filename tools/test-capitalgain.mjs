/**
 * Tests de src/utils/capitalgain.mjs et src/utils/fx.mjs :  node --test tools/test-capitalgain.mjs
 * Valeurs attendues calculées à la main (commentaires). Paramètres = copie de CAPITAL_GAINS (src/config/capital-gains.ts).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { computeCapitalGain, checkExemption, parseNum } from '../src/utils/capitalgain.mjs';
import { convert } from '../src/utils/fx.mjs';

const P = {
  ratePct: 20, minPct: 3, acquisitionCostFlatPct: 15, smallSalesCapMad: 140000, mainResidenceYears: 5,
  mainResidencePriceCapMad: 4000000, vacancyMaxMonths: 12, socialYears: 4, socialAreaMin: 50, socialAreaMax: 80, socialPriceCapMad: 250000,
};
const c = (o) => computeCapitalGain({ price: 1000000, acquisitionPrice: 600000, coefficient: 1, acquisitionCosts: 0, works: 0, ...o }, P);

test('parseNum : virgule, vide', () => {
  assert.equal(parseNum('1 234,5'), 1234.5);
  assert.ok(Number.isNaN(parseNum('')));
});

test('profit standard : forfait 15 %', () => {
  // frais forfaitaires 600000 x 15 % = 90000 ; base 690000 ; profit 310000 ; 20 % = 62000 ; min 3 % = 30000
  const r = c({});
  assert.equal(r.costsUsed, 90000);
  assert.equal(r.costsKind, 'flat');
  assert.equal(r.profit, 310000);
  assert.equal(r.tax, 62000);
  assert.equal(r.minTax, 30000);
});

test('frais réels supérieurs au forfait + coefficient + travaux', () => {
  // réévalué 600000 x 1,2 = 720000 ; frais réels 100000 > 90000 ; travaux 50000 ; base 870000 ; profit 130000 ; 20 % = 26000 ; min 30000
  const r = c({ coefficient: 1.2, acquisitionCosts: 100000, works: 50000 });
  assert.equal(r.costsKind, 'actual');
  assert.equal(r.acquisitionBase, 870000);
  assert.equal(r.profit, 130000);
  assert.equal(r.tax, 30000); // le minimum de 3 % l'emporte
});

test('perte : minimum de 3 % du prix de cession', () => {
  const r = c({ price: 500000 }); // base 690000, profit -190000, impôt = 3 % x 500000
  assert.equal(r.loss, true);
  assert.equal(r.tax, 15000);
});

test('habitation principale éligible : exonérée, minimum de 3 % au-delà de 4 000 000', () => {
  const base = { exemption: 'main', occupancyYears: 6, rented: false, usedRecently: false, vacancyMonths: 0 };
  assert.equal(c({ ...base }).tax, 0);
  assert.equal(c({ ...base, price: 5000000, acquisitionPrice: 1000000 }).tax, 30000); // 3 % x 1 000 000
});

test('habitation principale non éligible : retombe sur le régime standard', () => {
  const r = c({ exemption: 'main', occupancyYears: 3, rented: true, usedRecently: false, vacancyMonths: 14 });
  assert.equal(r.applied, 'none');
  assert.equal(r.tax, 62000);
  assert.deepEqual([...r.blockers].sort(), ['main_rented', 'main_vacancy', 'main_years']);
});

test('logement social et petites cessions', () => {
  const s = { exemption: 'social', occupancyYears: 4, areaM2: 70, firstSale: true };
  assert.equal(c({ ...s, price: 250000, acquisitionPrice: 150000 }).tax, 0);
  assert.ok(checkExemption({ ...s, price: 300000 }, P).blockers.includes('social_price'));
  assert.equal(c({ exemption: 'small', price: 140000, acquisitionPrice: 50000, yearSalesTotal: 140000 }).tax, 0);
  assert.ok(checkExemption({ exemption: 'small', yearSalesTotal: 140001 }, P).blockers.includes('small_total'));
});

test('validation des saisies', () => {
  assert.equal(c({ price: NaN }).ok, false);
  assert.equal(c({ coefficient: 0.9 }).errors[0].code, 'coef_min');
  assert.equal(c({ works: -1 }).ok, false);
});

test('convertisseur euro-dirham', () => {
  assert.equal(convert({ amount: 100, rate: 11, direction: 'eur-mad' }).result, 1100);
  assert.equal(convert({ amount: 1100, rate: 11, direction: 'mad-eur' }).result, 100);
  assert.equal(convert({ amount: 100, rate: 0, direction: 'eur-mad' }).ok, false);
  assert.equal(convert({ amount: -5, rate: 11, direction: 'eur-mad' }).ok, false);
  assert.equal(convert({ amount: 10, rate: 10.85, direction: 'mad-eur' }).result, 0.92); // 0,9217
});
