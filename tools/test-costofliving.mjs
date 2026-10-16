import test from 'node:test';
import assert from 'node:assert/strict';
import { costsByCity } from '../src/utils/costofliving.mjs';

const base = { rentMonth: { mid: 4000 }, foodDay: { mid: 100 }, transportDay: { mid: 20 }, funDay: { mid: 30 }, simMonth: 100 };
const factors = { A: 1, B: 0.5 };
test('personnes invalides -> null', () => {
  for (const p of [0, -1, 1.5, NaN, undefined]) assert.equal(costsByCity(base, factors, 'mid', p), null);
});
test('style inconnu -> null', () => assert.equal(costsByCity(base, factors, 'x', 1), null));
test('calcul et tri croissant', () => {
  const r = costsByCity(base, factors, 'mid', 2);
  assert.equal(r[0].city, 'B');
  assert.equal(r[1].total, 4000 + 6000 + 1200 + 1800 + 200);
});
