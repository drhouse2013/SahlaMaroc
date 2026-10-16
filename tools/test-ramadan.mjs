/**
 * Tests de la page « Ramadan 2027 » (node --test tools/test-ramadan.mjs).
 * Vérifie : fuseau GMT+0 pendant tout le Ramadan 2027, imsak (Fajr) < iftar (Maghrib), 30 jours × 35 villes sans valeur
 * manquante, progression régulière d'un jour à l'autre, valeurs plausibles à Casablanca, cohérence avec GMT_ALL_YEAR_FROM.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { prayerTimes, formatHM, moroccoOffsetMinutes, GMT_ALL_YEAR_FROM } from '../src/utils/prayer.mjs';
import { PRAYER_CITIES } from '../src/data/prayer-cities.ts';

const START = Date.UTC(2027, 1, 8); // 8 février 2027 (prévisionnel) ; option du 9 février couverte par le décalage d'un jour
const days = (n = 30, from = START) => Array.from({ length: n }, (_, i) => new Date(from + i * 86400000));
const at = (c, d) => prayerTimes({ year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate(), lat: c.lat, lng: c.lng, elevation: c.elevation });

test('GMT+0 toute l’année depuis le 20/09/2026 : aucun décalage pendant le Ramadan 2027', () => {
  assert.deepEqual(GMT_ALL_YEAR_FROM, { year: 2026, month: 9, day: 20 });
  for (const d of days(31, Date.UTC(2027, 1, 7))) {
    assert.equal(moroccoOffsetMinutes({ year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() }), 0);
  }
});

test('35 villes × 30 jours : imsak < iftar, entiers, durée du jeûne plausible (11 h 30 – 13 h 30)', () => {
  assert.ok(PRAYER_CITIES.length >= 35);
  for (const c of PRAYER_CITIES) {
    for (const d of days()) {
      const t = at(c, d);
      assert.ok(Number.isInteger(t.fajr) && Number.isInteger(t.maghrib), `${c.id} ${d.toISOString()}`);
      const fast = t.maghrib - t.fajr;
      assert.ok(fast > 690 && fast < 810, `${c.id} ${d.toISOString().slice(0, 10)} : jeûne ${fast} min`);
    }
  }
});

test('progression régulière : l’iftar avance de 0 à 2 min par jour, l’imsak recule de 0 à 2 min (Casablanca)', () => {
  const c = PRAYER_CITIES.find((x) => x.id === 'casablanca');
  const ds = days();
  for (let i = 1; i < ds.length; i++) {
    const a = at(c, ds[i - 1]), b = at(c, ds[i]);
    const dI = b.maghrib - a.maghrib, dF = b.fajr - a.fajr;
    assert.ok(dI >= 0 && dI <= 2, `iftar J${i}: ${dI}`);
    assert.ok(dF >= -2 && dF <= 0, `imsak J${i}: ${dF}`);
  }
});

test('Casablanca, 8 février 2027 : imsak vers 05 h 52, iftar vers 18 h 13 (heure légale GMT+0)', () => {
  const c = PRAYER_CITIES.find((x) => x.id === 'casablanca');
  const t = at(c, new Date(START));
  const f = formatHM(t.fajr), m = formatHM(t.maghrib);
  assert.ok(t.fajr >= 5 * 60 + 50 && t.fajr <= 6 * 60 + 20, `fajr ${f}`);
  assert.ok(t.maghrib >= 18 * 60 + 5 && t.maghrib <= 18 * 60 + 35, `maghrib ${m}`);
});
