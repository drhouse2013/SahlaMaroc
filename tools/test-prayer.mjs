/**
 * Tests du calcul des horaires de prière (node --test tools/test-prayer.mjs).
 * Références : calendrier officiel du ministère des Habous et des Affaires islamiques
 * (https://www.habous.gov.ma/prieres/horaire_hijri_2.php?ville=<id>), relevé le 2026-10-10, mois de Rabie II 1448
 * (13 sept. – 12 oct. 2026), heure légale du Maroc (UTC+0 depuis le 20/09/2026).
 * Ordre des colonnes : Fajr, Chourouq, Dhohr, Asr, Maghrib, Icha. Tolérance : 2 minutes.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { prayerTimes, formatHM, nextPrayer, nearestCity, moroccoOffsetMinutes, PRAYER_ORDER } from '../src/utils/prayer.mjs';
import { PRAYER_CITIES } from '../src/data/prayer-cities.ts';

const TOL = 2;
// [id Habous, ville (id site), {jour: horaires}]  — jours : 25 sept., 1er oct., 10 oct. 2026
const REF = [
  [58, 'casablanca', { '9-25': '04:52 06:17 12:27 15:48 18:28 19:41', '10-1': '04:57 06:22 12:25 15:43 18:19 19:33', '10-10': '05:04 06:28 12:23 15:34 18:08 19:21' }],
  [1, 'rabat', { '9-25': '04:49 06:15 12:24 15:45 18:24 19:38', '10-1': '04:53 06:19 12:22 15:39 18:16 19:30', '10-10': '05:00 06:26 12:19 15:31 18:04 19:18' }],
  [104, 'marrakech', { '9-25': '04:56 06:17 12:29 15:50 18:31 19:41', '10-1': '05:00 06:21 12:27 15:45 18:23 19:33', '10-10': '05:06 06:27 12:24 15:37 18:12 19:22' }],
  [14, 'tangier', { '9-25': '04:43 06:09 12:20 15:40 18:21 19:36', '10-1': '04:48 06:14 12:18 15:34 18:12 19:27', '10-10': '04:55 06:22 12:15 15:25 17:59 19:14' }],
  [31, 'oujda', { '9-25': '04:28 05:52 12:04 15:25 18:06 19:19', '10-1': '04:33 05:57 12:02 15:19 17:58 19:11', '10-10': '04:40 06:04 12:00 15:11 17:46 18:58' }],
  [156, 'laayoune', { '9-25': '05:20 06:40 12:50 16:11 18:50 19:59', '10-1': '05:23 06:43 12:48 16:06 18:43 19:52', '10-10': '05:28 06:47 12:45 16:00 18:33 19:42' }],
  [165, 'dakhla', { '9-25': '05:33 06:51 13:01 16:21 19:01 20:08', '10-1': '05:36 06:53 12:59 16:17 18:55 20:02', '10-10': '05:39 06:56 12:56 16:12 18:46 19:53' }],
];
const hm = (s) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
const city = (id) => PRAYER_CITIES.find((c) => c.id === id);

test('écart ≤ 2 min avec le calendrier officiel des Habous (7 villes × 3 jours × 6 horaires)', () => {
  let max = 0, n = 0;
  for (const [hid, id, days] of REF) {
    const c = city(id);
    for (const [key, row] of Object.entries(days)) {
      const [month, day] = key.split('-').map(Number);
      const t = prayerTimes({ year: 2026, month, day, lat: c.lat, lng: c.lng, elevation: c.elevation });
      row.split(' ').forEach((ref, i) => {
        const diff = Math.abs(t[PRAYER_ORDER[i]] - hm(ref));
        max = Math.max(max, diff); n++;
        assert.ok(diff <= TOL, `${id} (Habous ${hid}) ${key} ${PRAYER_ORDER[i]} : calculé ${formatHM(t[PRAYER_ORDER[i]])} vs officiel ${ref}`);
      });
    }
  }
  console.log(`# ${n} comparaisons, écart maximal ${max} min`);
});

test('ordre chronologique des horaires sur toute l’année pour toutes les villes', () => {
  for (const c of PRAYER_CITIES) {
    for (let d = 0; d < 366; d += 5) {
      const dt = new Date(Date.UTC(2027, 0, 1 + d));
      const t = prayerTimes({ year: dt.getUTCFullYear(), month: dt.getUTCMonth() + 1, day: dt.getUTCDate(), lat: c.lat, lng: c.lng });
      const v = PRAYER_ORDER.map((k) => t[k]);
      assert.ok(v.every((x) => Number.isInteger(x)), `${c.id} jour ${d} : valeur manquante`);
      for (let i = 1; i < v.length; i++) assert.ok(v[i] > v[i - 1], `${c.id} jour ${d} : ordre ${v.map(formatHM)}`);
    }
  }
});

test('fuseau : GMT+0 depuis le 20/09/2026 (y compris Ramadan 2027), Intl avant', () => {
  assert.equal(moroccoOffsetMinutes({ year: 2026, month: 9, day: 20 }), 0);
  assert.equal(moroccoOffsetMinutes({ year: 2026, month: 10, day: 10 }), 0);
  assert.equal(moroccoOffsetMinutes({ year: 2027, month: 2, day: 15 }), 0); // Ramadan 2027 : plus de changement d'heure
  assert.equal(moroccoOffsetMinutes({ year: 2027, month: 7, day: 1 }), 0);
  const before = moroccoOffsetMinutes({ year: 2026, month: 7, day: 1 }); // régime antérieur : GMT+1 (Intl)
  assert.ok(before === 60 || before === 0);
  // le décalage explicite prime et décale tous les horaires de la même valeur
  const c = city('casablanca');
  const a = prayerTimes({ year: 2026, month: 10, day: 10, lat: c.lat, lng: c.lng, offsetMinutes: 0 });
  const b = prayerTimes({ year: 2026, month: 10, day: 10, lat: c.lat, lng: c.lng, offsetMinutes: 60 });
  for (const k of PRAYER_ORDER) assert.equal(b[k] - a[k], 60);
});

test('latitude extrême : angle jamais atteint => null sans exception', () => {
  const t = prayerTimes({ year: 2026, month: 6, day: 21, lat: 70, lng: 20, offsetMinutes: 0 });
  assert.equal(t.fajr, null);
  assert.equal(formatHM(t.fajr), '--:--');
});

test('formatHM', () => {
  assert.equal(formatHM(0), '00:00');
  assert.equal(formatHM(305), '05:05');
  assert.equal(formatHM(1440 + 61), '01:01');
});

test('nextPrayer : avant Fajr, entre deux prières, après Icha (lendemain)', () => {
  const t = { fajr: 300, sunrise: 390, dhuhr: 740, asr: 930, maghrib: 1090, isha: 1160 };
  const tm = { fajr: 301 };
  assert.deepEqual(nextPrayer(t, tm, 100), { key: 'fajr', minutes: 300, in: 200 });
  assert.equal(nextPrayer(t, tm, 350).key, 'dhuhr'); // Chourouq n'est pas une prière
  assert.equal(nextPrayer(t, tm, 740).key, 'asr'); // à l'heure exacte : la suivante
  const n = nextPrayer(t, tm, 1300);
  assert.equal(n.key, 'fajr');
  assert.equal(n.minutes, 1741);
  assert.equal(n.in, 441);
});

test('nearestCity : coordonnées proches de Tanger => Tanger ; Sahara => Dakhla', () => {
  assert.equal(nearestCity(PRAYER_CITIES, 35.77, -5.8).city.id, 'tangier');
  assert.equal(nearestCity(PRAYER_CITIES, 23.7, -15.9).city.id, 'dakhla');
  assert.equal(nearestCity([], 0, 0), null);
});

test('liste des villes : au moins 30, ids uniques, noms dans les 5 langues, coordonnées au Maroc', () => {
  assert.ok(PRAYER_CITIES.length >= 30);
  assert.equal(new Set(PRAYER_CITIES.map((c) => c.id)).size, PRAYER_CITIES.length);
  for (const c of PRAYER_CITIES) {
    for (const l of ['fr', 'en', 'es', 'de', 'ar']) assert.ok(c.name[l], `${c.id} ${l}`);
    assert.ok(c.lat > 20 && c.lat < 36.5 && c.lng > -18 && c.lng < -1, c.id);
  }
});
