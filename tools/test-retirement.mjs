/**
 * Tests du module src/utils/retirement.mjs :  node --test tools/test-retirement.mjs
 * Les valeurs attendues sont calculées à la main (commentaires).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ITEMS, parseAmount, fromMadMonth, convertAmount, startValues, computeBudget, EXAMPLE_MAD_MONTH,
} from '../src/utils/retirement.mjs';

// Copie des valeurs de départ de src/config/costs.ts (BASE) utilisées pour le calcul à la main.
const BASE = {
  rentMonth: { budget: 4500, mid: 7000, comfort: 11000 },
  foodDay: { budget: 90, mid: 180, comfort: 350 },
  transportDay: { budget: 20, mid: 50, comfort: 120 },
  funDay: { budget: 30, mid: 80, comfort: 200 },
};
const RATE = 11; // 1 EUR = 11 MAD (valeur de src/config/site.ts au 2026-09-30)
const near = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} ≠ ${b}`);

const items = { housing: 5000, food: 3000, transport: 500, health: 600, utilities: 800, leisure: 1000 };

test('cas connu mensuel en MAD, sans imprévus ni pension', () => {
  // 5000 + 3000 + 500 + 600 + 800 + 1000 = 10 900 / mois ; x12 = 130 800 / an
  const r = computeBudget({ currency: 'MAD', period: 'monthly', rate: RATE, items, contingencyPct: 0, pension: '' });
  assert.equal(r.ok, true);
  near(r.subtotalMonthly, 10900);
  near(r.totalMonthly, 10900);
  near(r.totalAnnual, 130800);
  near(r.totalMonthlyMad, 10900);
  near(r.totalMonthlyEur, 10900 / 11); // 990,909…
  assert.equal(r.hasPension, false);
  assert.equal(r.coveragePct, null);
});

test('imprévus en pourcentage du sous-total', () => {
  // 10 900 x 10 % = 1 090 ; total 11 990 / mois
  const r = computeBudget({ currency: 'MAD', period: 'monthly', rate: RATE, items, contingencyPct: 10 });
  near(r.contingencyMonthly, 1090);
  near(r.totalMonthly, 11990);
  near(r.totalAnnual, 143880);
});

test('comparaison avec la pension saisie : solde et taux de couverture', () => {
  // pension 12 000 vs 11 990 : solde +10 / mois (+120 / an) ; couverture 12000/11990 = 100,0834 %
  const r = computeBudget({ currency: 'MAD', period: 'monthly', rate: RATE, items, contingencyPct: 10, pension: '12000' });
  assert.equal(r.hasPension, true);
  near(r.balanceMonthly, 10);
  near(r.balanceAnnual, 120);
  near(r.coveragePct, (12000 / 11990) * 100);
  // pension 8 000 : solde -3 990 / mois ; couverture 8000/11990 = 66,72 %
  const d = computeBudget({ currency: 'MAD', period: 'monthly', rate: RATE, items, contingencyPct: 10, pension: 8000 });
  near(d.balanceMonthly, -3990);
  near(d.balanceAnnual, -47880);
  assert.ok(Math.abs(d.coveragePct - 66.72) < 0.01);
});

test('annuel : les saisies sont divisées par 12', () => {
  // postes annuels : 12 000 + 6 000 = 18 000 / an = 1 500 / mois ; pension annuelle 24 000 = 2 000 / mois
  const r = computeBudget({
    currency: 'MAD', period: 'annual', rate: RATE,
    items: { housing: 12000, food: 6000 }, contingencyPct: 0, pension: 24000,
  });
  near(r.totalMonthly, 1500);
  near(r.totalAnnual, 18000);
  near(r.pensionMonthly, 2000);
  near(r.pensionAnnual, 24000);
  near(r.balanceMonthly, 500);
  near(r.balanceAnnual, 6000);
  near(r.coveragePct, 133.3333333333, 1e-6);
});

test('devise EUR : équivalent MAD au taux fourni', () => {
  // 1 000 EUR / mois de postes -> 11 000 MAD ; pension 1 200 EUR -> solde +200 EUR
  const r = computeBudget({
    currency: 'EUR', period: 'monthly', rate: RATE,
    items: { housing: 600, food: 400 }, contingencyPct: 0, pension: 1200,
  });
  near(r.totalMonthly, 1000);
  near(r.totalMonthlyMad, 11000);
  near(r.totalMonthlyEur, 1000);
  near(r.balanceMonthly, 200);
});

test('conversion devise et périodicité', () => {
  near(convertAmount(100, { currency: 'EUR', period: 'monthly' }, { currency: 'MAD', period: 'monthly' }, RATE), 1100);
  near(convertAmount(1100, { currency: 'MAD', period: 'monthly' }, { currency: 'EUR', period: 'monthly' }, RATE), 100);
  near(convertAmount(100, { currency: 'MAD', period: 'monthly' }, { currency: 'MAD', period: 'annual' }, RATE), 1200);
  near(convertAmount(1200, { currency: 'MAD', period: 'annual' }, { currency: 'MAD', period: 'monthly' }, RATE), 100);
  // 120 EUR / an -> 1 320 MAD / an -> 110 MAD / mois
  near(convertAmount(120, { currency: 'EUR', period: 'annual' }, { currency: 'MAD', period: 'monthly' }, RATE), 110);
  // aller-retour sans perte
  const a = { currency: 'EUR', period: 'annual' };
  const b = { currency: 'MAD', period: 'monthly' };
  near(convertAmount(convertAmount(777, a, b, RATE), b, a, RATE), 777);
  near(fromMadMonth(11000, 'EUR', 'annual', RATE), 12000);
});

test('limites : zéro', () => {
  const z = Object.fromEntries(ITEMS.map((k) => [k, 0]));
  const r = computeBudget({ currency: 'MAD', period: 'monthly', rate: RATE, items: z, contingencyPct: 0, pension: 0 });
  assert.equal(r.ok, true);
  assert.equal(r.totalMonthly, 0);
  assert.equal(r.hasPension, false);
  assert.equal(r.coveragePct, null); // pas de division par zéro
  // pension saisie mais budget nul : pas de taux de couverture (division par zéro évitée)
  const p = computeBudget({ currency: 'MAD', period: 'monthly', rate: RATE, items: z, contingencyPct: 0, pension: 5000 });
  assert.equal(p.coveragePct, null);
  near(p.balanceMonthly, 5000);
  // champs vides = 0
  const e = computeBudget({ currency: 'MAD', period: 'monthly', rate: RATE, items: { housing: '' }, contingencyPct: '' });
  assert.equal(e.ok, true);
  assert.equal(e.totalMonthly, 0);
});

test('limites : négatif, texte, taux invalide', () => {
  const neg = computeBudget({ currency: 'MAD', period: 'monthly', rate: RATE, items: { housing: -1, food: 'abc' }, contingencyPct: -5, pension: -100 });
  assert.equal(neg.ok, false);
  assert.deepEqual(neg.invalid.sort(), ['contingency', 'food', 'housing', 'pension']);
  const r0 = computeBudget({ currency: 'EUR', period: 'monthly', rate: 0, items, contingencyPct: 0 });
  assert.equal(r0.ok, false);
  assert.ok(r0.invalid.includes('rate'));
  const rn = computeBudget({ currency: 'EUR', period: 'monthly', rate: NaN, items, contingencyPct: 0 });
  assert.equal(rn.ok, false);
});

test('parseAmount : virgule décimale, vide, invalide', () => {
  assert.equal(parseAmount('1 500,50'), 1500.5);
  assert.equal(parseAmount('12.5'), 12.5);
  assert.ok(Number.isNaN(parseAmount('')));
  assert.ok(Number.isNaN(parseAmount('12abc')));
  assert.ok(Number.isNaN(parseAmount(Infinity)));
  assert.equal(parseAmount(0), 0);
});

test('valeurs de départ : ville Casablanca (x1,15), style « mid », loyer', () => {
  // logement 7000 x 1,15 = 8 050 ; alimentation 180 x 30 x 1,15 = 6 210 ;
  // transport 50 x 30 x 1,15 = 1 725 ; loisirs 80 x 30 x 1,15 = 2 760 ; santé/énergie : exemples
  const v = startValues(BASE, 1.15, 'mid', 'rent', 'MAD', 'monthly', RATE);
  assert.deepEqual(v, { housing: 8050, food: 6210, transport: 1725, health: EXAMPLE_MAD_MONTH.health, utilities: EXAMPLE_MAD_MONTH.utilities, leisure: 2760 });
});

test('valeurs de départ : propriétaire, EUR, annuel', () => {
  // Fès x0,85, « budget » : alimentation 90 x 30 x 0,85 = 2 295 MAD/mois = 208,6 EUR/mois = 2 503,6 EUR/an -> 2 504
  const v = startValues(BASE, 0.85, 'budget', 'own', 'EUR', 'annual', RATE);
  assert.equal(v.housing, 0);
  assert.equal(v.food, Math.round((2295 / 11) * 12));
  assert.equal(v.food, 2504);
  // santé exemple 600 MAD/mois -> 600/11*12 = 654,5 -> 655 EUR/an
  assert.equal(v.health, 655);
});
