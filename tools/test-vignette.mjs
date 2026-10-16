/** Tests de src/utils/vignette.mjs : node --test tools/test-vignette.mjs (barème = copie de src/config/vignette.ts) */
import test from 'node:test';
import assert from 'node:assert/strict';
import { computeVignette, bracket, parseNum } from '../src/utils/vignette.mjs';

const P = { petrol: [350, 650, 3000, 8000], diesel: [700, 1500, 6000, 20000] };
const v = (o) => computeVignette({ cv: 6, fuel: 'petrol', ...o }, P);

test('bornes des tranches', () => {
  assert.deepEqual([7, 8, 10, 11, 14, 15].map(bracket), [0, 1, 1, 2, 2, 3]);
});
test('barème essence et gasoil', () => {
  assert.equal(v({ cv: 7 }).amount, 350);
  assert.equal(v({ cv: 9 }).amount, 650);
  assert.equal(v({ cv: 12 }).amount, 3000);
  assert.equal(v({ cv: 15 }).amount, 8000);
  assert.equal(v({ cv: 7, fuel: 'diesel' }).amount, 700);
  assert.equal(v({ cv: 10, fuel: 'diesel' }).amount, 1500);
  assert.equal(v({ cv: 14, fuel: 'diesel' }).amount, 6000);
  assert.equal(v({ cv: 20, fuel: 'diesel' }).amount, 20000);
});
test('hybride et pick-up de particulier : tarif essence', () => {
  assert.equal(v({ cv: 9, fuel: 'hybrid' }).amount, 650);
  assert.equal(v({ cv: 9, fuel: 'pickup' }).scale, 'petrol');
});
test('prorata par mois restant', () => {
  assert.equal(v({ cv: 9, months: 6 }).amount, 325);
  assert.equal(v({ cv: 9, months: 5 }).amount, 271); // 650 x 5 / 12 = 270,83
  assert.equal(v({ cv: 9, months: 12 }).amount, 650);
});
test('validation', () => {
  assert.equal(v({ cv: NaN }).ok, false);
  assert.equal(v({ cv: 0 }).ok, false);
  assert.equal(v({ cv: 7.5 }).ok, false);
  assert.equal(v({ months: 0 }).ok, false);
  assert.equal(v({ months: 13 }).ok, false);
  assert.equal(v({ fuel: 'x' }).ok, false);
  assert.ok(Number.isNaN(parseNum('')));
});
