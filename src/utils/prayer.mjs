/**
 * Horaires de prière calculés (module pur, sans dépendance ni réseau).
 * Algorithme astronomique standard (déclinaison solaire + équation du temps, type PrayTimes) avec les
 * paramètres de la méthode « Maroc – ministère des Habous » : Fajr 19°, Icha 17°, Asr ombre ×1 (malékite),
 * ajustements Chourouq −3 min, Dhohr +5 min, Maghrib +5 min. Résultat : estimation, qui peut différer
 * de quelques minutes du calendrier officiel du ministère des Habous et des Affaires islamiques.
 */

export const HABOUS = Object.freeze({ fajrAngle: 19, ishaAngle: 17, asrFactor: 1, sunriseMin: -3, dhuhrMin: 5, maghribMin: 5 });

/** Date légale marocaine du passage à GMT+0 toute l'année (décret n° 2.26.530) : voir le guide « fuseau-horaire-maroc-gmt ». */
export const GMT_ALL_YEAR_FROM = { year: 2026, month: 9, day: 20 };

const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const fix = (x, n) => ((x % n) + n) % n;

function julian(y, m, d) {
  if (m <= 2) { y -= 1; m += 12; }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + b - 1524.5;
}

/** Déclinaison (degrés) et équation du temps (heures) pour un jour julien (0 h UT + fraction). */
function sunPosition(jd) {
  const D = jd - 2451545.0;
  const g = fix(357.529 + 0.98560028 * D, 360);
  const q = fix(280.459 + 0.98564736 * D, 360);
  const L = fix(q + 1.915 * Math.sin(rad(g)) + 0.02 * Math.sin(rad(2 * g)), 360);
  const e = 23.439 - 0.00000036 * D;
  const ra = fix(deg(Math.atan2(Math.cos(rad(e)) * Math.sin(rad(L)), Math.cos(rad(L)))) / 15, 24);
  return { decl: deg(Math.asin(Math.sin(rad(e)) * Math.sin(rad(L)))), eqt: q / 15 - ra };
}

/** Heure UT (en heures) à laquelle le soleil atteint l'altitude `alt` (degrés) ; before = côté matin. null si jamais atteinte. */
function timeAtAltitude(alt, before, noonUT, lat, jd) {
  let t = noonUT;
  for (let i = 0; i < 3; i++) {
    const { decl } = sunPosition(jd + t / 24);
    const c = (Math.sin(rad(alt)) - Math.sin(rad(lat)) * Math.sin(rad(decl))) / (Math.cos(rad(lat)) * Math.cos(rad(decl)));
    if (c < -1 || c > 1) return null;
    const h = deg(Math.acos(c)) / 15;
    t = noonUT + (before ? -h : h);
  }
  return t;
}

/** Décalage légal du Maroc en minutes pour une date civile locale. */
export function moroccoOffsetMinutes({ year, month, day }) {
  const f = GMT_ALL_YEAR_FROM;
  if (year * 10000 + month * 100 + day >= f.year * 10000 + f.month * 100 + f.day) return 0;
  try {
    const noon = new Date(Date.UTC(year, month - 1, day, 12));
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Casablanca', hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }).formatToParts(noon).map((x) => [x.type, +x.value]));
    return Math.round((Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute) - noon.getTime()) / 60000);
  } catch { return 60; }
}

/**
 * Horaires d'un jour civil local. Retour : minutes depuis minuit (heure légale du Maroc), nombres entiers
 * arrondis à la minute la plus proche ; une valeur est null si l'angle n'est jamais atteint.
 */
export function prayerTimes({ year, month, day, lat, lng, elevation = 0, offsetMinutes, params = HABOUS }) {
  const off = (offsetMinutes ?? moroccoOffsetMinutes({ year, month, day })) / 60;
  const base = julian(year, month, day); // 0 h UT du jour civil
  let noonUT = 12 - lng / 15;
  for (let i = 0; i < 3; i++) noonUT = 12 - lng / 15 - sunPosition(base + noonUT / 24).eqt; // midi solaire (UT)
  const dip = 0.0174 * Math.sqrt(Math.max(0, elevation)); // abaissement de l'horizon au lever seulement (degrés, altitude en m) : demi-correction usuelle, ajustée sur le calendrier des Habous
  const ev = (alt, before) => timeAtAltitude(alt, before, noonUT, lat, base);
  const { decl } = sunPosition(base + noonUT / 24);
  const asrAlt = deg(Math.atan(1 / (params.asrFactor + Math.tan(rad(Math.abs(lat - decl))))));
  const raw = {
    fajr: ev(-params.fajrAngle, true),
    sunrise: ev(-0.833 - dip, true),
    dhuhr: noonUT,
    asr: ev(asrAlt, false),
    maghrib: ev(-0.833, false),
    isha: ev(-params.ishaAngle, false),
  };
  const adj = { sunrise: params.sunriseMin, dhuhr: params.dhuhrMin, maghrib: params.maghribMin };
  const out = {};
  for (const k of Object.keys(raw)) {
    const v = raw[k];
    out[k] = v == null ? null : Math.round((v + off) * 60 + (adj[k] ?? 0));
  }
  return out;
}

export const PRAYER_ORDER = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

export function formatHM(min) {
  if (min == null) return '--:--';
  const m = fix(min, 1440);
  return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
}

/**
 * Prochaine prière (Chourouq exclu : ce n'est pas une prière) à partir de `nowMin` (minutes locales).
 * `tomorrow` : horaires du lendemain, utilisés après Icha. Retour { key, minutes (peut dépasser 1440), in (minutes restantes) }.
 */
export function nextPrayer(today, tomorrow, nowMin, nowSec = 0) {
  const now = nowMin + nowSec / 60;
  for (const key of ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']) {
    const v = today[key];
    if (v != null && v > now) return { key, minutes: v, in: v - now };
  }
  const v = tomorrow.fajr;
  return { key: 'fajr', minutes: v + 1440, in: v + 1440 - now };
}

const R = 6371;
export function distanceKm(lat1, lng1, lat2, lng2) {
  const dLat = rad(lat2 - lat1), dLng = rad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

/** Ville la plus proche d'une liste [{id, lat, lng}] ; null si liste vide. */
export function nearestCity(cities, lat, lng) {
  let best = null, bd = Infinity;
  for (const c of cities) {
    const d = distanceKm(lat, lng, c.lat, c.lng);
    if (d < bd) { bd = d; best = c; }
  }
  return best ? { city: best, km: bd } : null;
}
