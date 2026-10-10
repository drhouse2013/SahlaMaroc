/**
 * Tests du module src/utils/customs.mjs :  node --test tools/test-customs.mjs
 * Les valeurs attendues sont calculées à la main (commentaires). Les paramètres ci-dessous sont une copie de
 * CUSTOMS_VALUES (src/config/customs.ts) : si la config change, ce fichier doit être relu.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseNum, round, checkEligibility90, computeCustoms } from '../src/utils/customs.mjs';

const P = {
  vatPct: 20, tpiPct: 0.25, diEvHybridPct: 2.5, diThermalPct: 17.5,
  abatementPct: 90, capMad: 300000, minAge: 60, minResidenceYears: 10,
  ageGeneral: 5, ageExtended: 10, luxuryThreshold: 400000,
};
const std = (o) => computeCustoms({ regime: 'standard', diPct: 17.5, tpiPct: 0.25, vatPct: 20, ...o }, P);
const r90 = (o) => computeCustoms({
  regime: 'abatement90', diPct: 17.5, tpiPct: 0.25, vatPct: 20,
  beneficiaryAge: 62, residenceYears: 15, passengerCar: true, alreadyUsed: false, settled: false, vehicleAge: 2, ...o,
}, P);
const line = (r, id) => r.lines.find((l) => l.id === id);

test('parseNum : virgule décimale, vide, texte', () => {
  assert.equal(parseNum('1 234,5'), 1234.5);
  assert.ok(Number.isNaN(parseNum('')));
  assert.ok(Number.isNaN(parseNum('abc')));
  assert.equal(parseNum(12), 12);
});

test('round : demi vers le haut', () => {
  assert.equal(round(187.5), 188);
  assert.equal(round(38.5), 39);
  assert.equal(round(0.4), 0);
});

test('cas connu standard, sans abattement : 100 000 à 17,5 % / 0,25 % / 20 %', () => {
  // DI = 17 500 ; TPI = 250 ; TVA = (100 000 + 17 500 + 250) × 20 % = 117 750 × 0,2 = 23 550 ; total = 41 300 (41,3 % de la valeur)
  const r = std({ value: 100000 });
  assert.equal(r.ok, true);
  assert.equal(r.applied, 'standard');
  assert.equal(r.di, 17500); assert.equal(r.tpi, 250); assert.equal(r.vat, 23550);
  assert.equal(r.total, 41300);
  assert.equal(r.taxableBase, 100000);
  assert.ok(Math.abs(r.totalPctOfValue - 41.3) < 1e-9);
  assert.equal(line(r, 'vat').base, 117750);
});

test('abattement saisi (communiqué par la douane) : 80 000, 25 %', () => {
  // abattement = 20 000 ; base = 60 000 ; DI = 10 500 ; TPI = 150 ; TVA = 70 650 × 0,2 = 14 130 ; total = 24 780
  const r = std({ value: 80000, otherAbatementPct: 25 });
  assert.equal(line(r, 'abatement').amount, -20000);
  assert.equal(r.taxableBase, 60000);
  assert.equal(r.di, 10500); assert.equal(r.tpi, 150); assert.equal(r.vat, 14130);
  assert.equal(r.total, 24780);
});

test('arrondi au dirham de chaque ligne, total = somme des lignes', () => {
  // 100 000 − 25 % = 75 000 ; DI = 13 125 ; TPI = 187,5 → 188 ; TVA = 88 313 × 0,2 = 17 662,6 → 17 663 ; total = 30 976
  const r = std({ value: 100000, otherAbatementPct: 25 });
  assert.equal(r.tpi, 188); assert.equal(r.vat, 17663);
  assert.equal(r.total, r.di + r.tpi + r.vat);
  assert.equal(r.total, 30976);
});

test('abattement de 90 % : valeur 154 000 (sous le plafond)', () => {
  // abattement = 138 600 ; base = 15 400 ; DI = 2 695 ; TPI = 38,5 → 39 ; TVA = 18 134 × 0,2 = 3 626,8 → 3 627 ; total = 6 361
  const r = r90({ value: 154000 });
  assert.equal(r.eligible90, true);
  assert.equal(r.applied, 'abatement90');
  assert.equal(line(r, 'abatement').amount, -138600);
  assert.equal(r.taxableBase, 15400);
  assert.equal(r.di, 2695); assert.equal(r.tpi, 39); assert.equal(r.vat, 3627);
  assert.equal(r.total, 6361);
  assert.ok(!r.warnings.includes('cap_exceeded'));
});

test('abattement de 90 % : valeur égale au plafond 300 000 (pas d’excédent)', () => {
  // abattement = 270 000 ; base = 30 000 ; DI 2,5 % = 750 ; TPI = 75 ; TVA = 30 825 × 0,2 = 6 165 ; total = 6 990
  const r = r90({ value: 300000, diPct: 2.5 });
  assert.equal(line(r, 'abatement').amount, -270000);
  assert.equal(r.taxableBase, 30000);
  assert.equal(r.total, 750 + 75 + 6165);
  assert.ok(!r.warnings.includes('cap_exceeded'));
});

test('abattement de 90 % : valeur 400 000 > plafond (excédent taxé sans abattement)', () => {
  // abattement sur 300 000 = 270 000 ; base = 130 000 ; DI 2,5 % = 3 250 ; TPI = 325 ; TVA = 133 575 × 0,2 = 26 715 ; total = 30 290
  const r = r90({ value: 400000, diPct: 2.5 });
  assert.equal(line(r, 'abatement').base, 300000);
  assert.equal(r.taxableBase, 130000);
  assert.equal(r.total, 30290);
  assert.ok(r.warnings.includes('cap_exceeded'));
  assert.ok(r.warnings.includes('luxury_stamp')); // 400 000 ≥ seuil
});

test('valeur 0, négative, vide ou invalide : erreur, aucun montant', () => {
  for (const v of [0, -1, -50000]) {
    const r = std({ value: v });
    assert.equal(r.ok, false);
    assert.deepEqual(r.errors, [{ field: 'value', code: 'value_positive' }]);
  }
  assert.deepEqual(std({ value: NaN }).errors, [{ field: 'value', code: 'value_required' }]);
});

test('taux nul accepté ; taux négatif, > 100 ou invalide refusé', () => {
  // DI 0 % : TPI = 125 ; TVA = 50 125 × 0,2 = 10 025 ; total = 10 150
  const r = std({ value: 50000, diPct: 0 });
  assert.equal(r.di, 0); assert.equal(r.total, 10150);
  // tous les taux à 0 : total 0
  assert.equal(std({ value: 50000, diPct: 0, tpiPct: 0, vatPct: 0 }).total, 0);
  assert.equal(std({ value: 1000, diPct: -1 }).errors[0].code, 'rate_range');
  assert.equal(std({ value: 1000, vatPct: 101 }).errors[0].code, 'rate_range');
  assert.equal(std({ value: 1000, tpiPct: NaN }).errors[0].code, 'rate_required');
  assert.equal(std({ value: 1000, otherAbatementPct: 120 }).errors[0].code, 'rate_range');
});

test('abattement saisi de 100 % : base nulle, total nul', () => {
  const r = std({ value: 10000, otherAbatementPct: 100 });
  assert.equal(r.taxableBase, 0); assert.equal(r.total, 0);
});

test('éligibilité 90 % : seuil d’âge du bénéficiaire (59 / 60)', () => {
  assert.deepEqual(r90({ value: 100000, beneficiaryAge: 59 }).blockers, ['age_below']);
  assert.equal(r90({ value: 100000, beneficiaryAge: 60 }).eligible90, true);
});

test('éligibilité 90 % : résidence « plus de 10 ans » (9,9 / 10 / 11)', () => {
  assert.deepEqual(r90({ value: 100000, residenceYears: 9.9 }).blockers, ['residence_below']);
  const lim = r90({ value: 100000, residenceYears: 10 });
  assert.equal(lim.eligible90, true);
  assert.ok(lim.warnings.includes('residence_borderline'));
  const ok = r90({ value: 100000, residenceYears: 11 });
  assert.ok(!ok.warnings.includes('residence_borderline'));
});

test('inéligible : message(s) et repli sur le calcul sans l’abattement de 90 %', () => {
  // 100 000 sans abattement : même total que le cas standard = 41 300
  const r = r90({ value: 100000, beneficiaryAge: 55, residenceYears: 4, alreadyUsed: true, settled: true, passengerCar: false });
  assert.equal(r.eligible90, false);
  assert.deepEqual(r.blockers, ['age_below', 'residence_below', 'vehicle_kind', 'already_used', 'settled']);
  assert.equal(r.applied, 'standard');
  assert.equal(r.total, 41300);
});

test('âge du véhicule : 4 / 5 / 10 / 11 ans (régime standard)', () => {
  assert.deepEqual(std({ value: 100000, vehicleAge: 4 }).warnings, []);
  assert.deepEqual(std({ value: 100000, vehicleAge: 5 }).warnings, ['vehicle_age_5_10']);
  assert.deepEqual(std({ value: 100000, vehicleAge: 10 }).warnings, ['vehicle_age_5_10']);
  const old = std({ value: 100000, vehicleAge: 11 });
  assert.equal(old.cleared, false);
  assert.equal(old.total, 0);
  assert.deepEqual(old.blockers, ['vehicle_too_old']);
  assert.deepEqual(old.lines, []);
});

test('âge du véhicule : régime 90 % (10 ans limite, 11 ans refusé)', () => {
  const lim = r90({ value: 100000, vehicleAge: 10 });
  assert.equal(lim.eligible90, true);
  assert.ok(lim.warnings.includes('vehicle_age_borderline'));
  assert.ok(lim.warnings.includes('vehicle_age_5_10'));
  const old = r90({ value: 100000, vehicleAge: 11 });
  assert.equal(old.cleared, false);
  assert.equal(old.eligible90, false);
  assert.ok(old.blockers.includes('vehicle_too_old'));
  const unknown = r90({ value: 100000, vehicleAge: NaN });
  assert.ok(unknown.warnings.includes('vehicle_age_missing'));
});

test('entrées du régime 90 % invalides : erreur', () => {
  assert.equal(r90({ value: 100000, beneficiaryAge: NaN }).ok, false);
  assert.equal(r90({ value: 100000, residenceYears: -3 }).errors[0].field, 'residenceYears');
});

test('checkEligibility90 direct : tout est conforme', () => {
  const e = checkEligibility90({ beneficiaryAge: 70, residenceYears: 30, passengerCar: true, alreadyUsed: false, settled: false, vehicleAge: 3 }, P);
  assert.deepEqual(e, { eligible: true, blockers: [], warnings: [] });
});

test('avertissement droit de timbre au-delà de 400 000 (standard)', () => {
  assert.ok(std({ value: 399999 }).warnings.indexOf('luxury_stamp') === -1);
  assert.ok(std({ value: 400000 }).warnings.includes('luxury_stamp'));
});
