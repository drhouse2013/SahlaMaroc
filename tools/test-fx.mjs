import test from 'node:test';
import assert from 'node:assert/strict';
import { parseNum, convert, round2 } from '../src/utils/fx.mjs';

test('parseNum : virgule, vide, texte, infini', () => {
  assert.equal(parseNum('1 234,56'), 1234.56);
  assert.ok(Number.isNaN(parseNum('')));
  assert.ok(Number.isNaN(parseNum('abc')));
  assert.ok(Number.isNaN(parseNum('1e999')));
  assert.ok(Number.isNaN(parseNum(undefined)));
});
test('convert : négatif, vide, taux nul refusés', () => {
  assert.equal(convert({ amount: -5, rate: 11, direction: 'eur-mad' }).ok, false);
  assert.equal(convert({ amount: NaN, rate: 11, direction: 'eur-mad' }).ok, false);
  assert.equal(convert({ amount: 5, rate: 0, direction: 'eur-mad' }).ok, false);
  assert.equal(convert({ amount: 5, rate: -1, direction: 'mad-eur' }).ok, false);
});
test('convert : calcul et arrondi', () => {
  assert.equal(convert({ amount: 100, rate: 11, direction: 'eur-mad' }).result, 1100);
  assert.equal(convert({ amount: 110, rate: 11, direction: 'mad-eur' }).result, 10);
  assert.equal(round2(1.005), 1.01);
  assert.equal(convert({ amount: 0, rate: 11, direction: 'eur-mad' }).result, 0);
});
test('convert : montant énorme reste fini', () => {
  const r = convert({ amount: 1e15, rate: 11, direction: 'eur-mad' });
  assert.ok(r.ok && Number.isFinite(r.result));
});
