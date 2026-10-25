/**
 * Logique pure du calculateur « Frais d'autoroute Maroc » (aucune dépendance).
 *
 * Données sources : grille tarifaire officielle ADM (oct. 2026).
 * https://www.adm.co.ma/sites/default/files/2024-01/grille-tarifaire-sur-le-reseau-autoroutier.pdf
 *
 * Format compact _R : [cityA, cityB, classe1, classe2, classe3]
 * Développé en TOLL_RATES bidirectionnel au chargement du module.
 */

// ---------------------------------------------------------------------------
// Tarifs compacts — extraits du PDF ADM page par page
// [from, to, c1, c2, c3]   (DH)
// ---------------------------------------------------------------------------
const _R = [
  // ── A3 CASABLANCA — RABAT ──
  ['casablanca', 'rabat', 23, 34, 41],

  // ── CONTOURNEMENT DE RABAT ──
  ['rabat', 'ain-atiq', 5, 7, 9],

  // ── A2 RABAT — KÉNITRA ──
  ['rabat', 'kenitra', 17, 26, 31],

  // ── A1 KÉNITRA NORD — TANGER MED ──
  ['kenitra', 'larache', 47, 80, 96],
  ['kenitra', 'assilah', 67, 114, 137],
  ['kenitra', 'tanger', 76, 129, 155],
  ['kenitra', 'port-tanger-med', 87, 148, 179],
  ['larache', 'assilah', 20, 34, 41],
  ['larache', 'tanger', 29, 49, 59],
  ['larache', 'port-tanger-med', 40, 68, 83],
  ['assilah', 'tanger', 9, 15, 18],
  ['assilah', 'port-tanger-med', 20, 34, 42],
  ['tanger', 'port-tanger-med', 11, 19, 24],

  // ── TÉTOUANE — FNIDEQ ──
  ['tetouan', 'fnideq', 10, 15, 19],

  // ── A4 RABAT — FÈS — OUJDA ──
  ['rabat', 'meknes', 60, 102, 123],
  ['rabat', 'fes', 82, 139, 168],
  ['rabat', 'taza', 118, 200, 242],
  ['rabat', 'oujda', 164, 278, 336],
  ['meknes', 'fes', 22, 37, 45],
  ['meknes', 'taza', 58, 98, 119],
  ['meknes', 'oujda', 104, 176, 213],
  ['fes', 'taza', 36, 61, 74],
  ['fes', 'oujda', 82, 139, 168],
  ['taza', 'oujda', 46, 78, 94],

  // ── A7 CASABLANCA — MARRAKECH — AGADIR (via Nouaceur/Berrechid) ──
  // Casa → gares sud (tarifs PDF depuis Nouaceur, +6 DH péage aéroport approx.)
  ['casablanca', 'berrechid', 11, 16, 20],
  ['casablanca', 'settat', 27, 40, 49],
  ['casablanca', 'marrakech', 93, 140, 169],
  ['casablanca', 'agadir', 174, 293, 353],
  ['berrechid', 'settat', 16, 24, 29],
  ['berrechid', 'marrakech', 82, 124, 149],
  ['berrechid', 'agadir', 163, 277, 333],
  ['settat', 'marrakech', 66, 100, 120],
  ['settat', 'agadir', 147, 253, 304],
  ['marrakech', 'agadir', 81, 153, 184],

  // ── A5 / A8 — BEN AHMED — KHOURIBGA — BÉNI MELLAL ──
  ['berrechid', 'khouribga', 29, 43, 52],
  ['berrechid', 'beni-mellal', 65, 100, 120],
  ['khouribga', 'beni-mellal', 36, 57, 68],
  ['casablanca', 'khouribga', 40, 59, 72],
  ['casablanca', 'beni-mellal', 76, 116, 140],
  ['settat', 'khouribga', 45, 67, 81],
  ['settat', 'beni-mellal', 81, 124, 149],

  // ── A3 CASABLANCA — EL JADIDA — SAFI ──
  ['casablanca', 'el-jadida', 30, 47, 58],
  ['casablanca', 'safi', 80, 126, 156],
  ['el-jadida', 'safi', 50, 79, 98],

  // ── CASABLANCA — AÉROPORT MOHAMMED V ──
  ['casablanca', 'aeroport-med-v', 6, 9, 11],

  // ── Liaisons cross-corridor calculées (somme des segments) ──
  // Casa — Tanger (via Rabat + Kenitra)
  ['casablanca', 'tanger', 116, 189, 227],
  ['casablanca', 'port-tanger-med', 127, 208, 251],
  ['casablanca', 'larache', 87, 140, 168],
  ['casablanca', 'assilah', 107, 174, 209],
  ['casablanca', 'kenitra', 40, 60, 72],

  // Casa — Fès/Meknès/Oujda (via Rabat)
  ['casablanca', 'meknes', 83, 136, 164],
  ['casablanca', 'fes', 105, 173, 209],
  ['casablanca', 'taza', 141, 234, 283],
  ['casablanca', 'oujda', 187, 312, 377],

  // Rabat — Tanger/Larache/Assilah (via Kenitra)
  ['rabat', 'tanger', 93, 155, 186],
  ['rabat', 'port-tanger-med', 104, 174, 210],
  ['rabat', 'larache', 64, 106, 127],
  ['rabat', 'assilah', 84, 140, 168],

  // Fès — Tanger (via Rabat + Kenitra)
  ['fes', 'tanger', 175, 294, 354],
  ['fes', 'kenitra', 99, 165, 199],

  // Marrakech — Fès (via Casa-Rabat)
  ['marrakech', 'fes', 198, 313, 378],
  ['marrakech', 'rabat', 116, 174, 210],
  ['marrakech', 'meknes', 176, 276, 333],

  // Agadir — Rabat/Fès
  ['agadir', 'rabat', 197, 327, 394],
  ['agadir', 'fes', 279, 466, 562],

  // Kenitra — Fès/Meknès (via Rabat)
  ['kenitra', 'fes', 99, 165, 199],
  ['kenitra', 'meknes', 77, 128, 154],

  // Tanger — Fès/Meknès
  ['tanger', 'fes', 175, 294, 354],
  ['tanger', 'meknes', 153, 257, 309],

  // El Jadida — Marrakech (via Casa corridor)
  ['el-jadida', 'marrakech', 123, 187, 227],

  // Tetouan — Tanger
  ['tetouan', 'tanger', 21, 34, 42],
];

// ---------------------------------------------------------------------------
// Développer _R en objet bidirectionnel
// ---------------------------------------------------------------------------
/** @type {Record<string, Record<string, {1:number,2:number,3:number}>>} */
export const TOLL_RATES = {};

for (const [a, b, c1, c2, c3] of _R) {
  const rates = { 1: c1, 2: c2, 3: c3 };
  (TOLL_RATES[a] ??= {})[b] = rates;
  (TOLL_RATES[b] ??= {})[a] = rates;
}

// ---------------------------------------------------------------------------
// Noms des villes — 5 langues
// ---------------------------------------------------------------------------
/** @type {Record<string, Record<string, string>>} */
export const CITIES = {
  casablanca:       { fr: 'Casablanca',       en: 'Casablanca',       es: 'Casablanca',       de: 'Casablanca',       ar: 'الدار البيضاء' },
  rabat:            { fr: 'Rabat',             en: 'Rabat',             es: 'Rabat',             de: 'Rabat',             ar: 'الرباط' },
  kenitra:          { fr: 'Kénitra',           en: 'Kenitra',           es: 'Kenitra',           de: 'Kenitra',           ar: 'القنيطرة' },
  tanger:           { fr: 'Tanger',            en: 'Tangier',           es: 'Tánger',            de: 'Tanger',            ar: 'طنجة' },
  'port-tanger-med':{ fr: 'Port Tanger Med',   en: 'Tanger Med Port',   es: 'Puerto Tánger Med', de: 'Hafen Tanger Med',  ar: 'ميناء طنجة المتوسط' },
  larache:          { fr: 'Larache',           en: 'Larache',           es: 'Larache',           de: 'Larache',           ar: 'العرائش' },
  assilah:          { fr: 'Assilah',           en: 'Asilah',            es: 'Arcila',            de: 'Assilah',           ar: 'أصيلة' },
  tetouan:          { fr: 'Tétouan',           en: 'Tetouan',           es: 'Tetuán',            de: 'Tétouan',           ar: 'تطوان' },
  fnideq:           { fr: 'Fnideq',            en: 'Fnideq',            es: 'Fnideq',            de: 'Fnideq',            ar: 'الفنيدق' },
  fes:              { fr: 'Fès',               en: 'Fez',               es: 'Fez',               de: 'Fes',               ar: 'فاس' },
  meknes:           { fr: 'Meknès',            en: 'Meknes',            es: 'Meknes',            de: 'Meknès',            ar: 'مكناس' },
  taza:             { fr: 'Taza',              en: 'Taza',              es: 'Taza',              de: 'Taza',              ar: 'تازة' },
  oujda:            { fr: 'Oujda',             en: 'Oujda',             es: 'Oujda',             de: 'Oujda',             ar: 'وجدة' },
  berrechid:        { fr: 'Berrechid',         en: 'Berrechid',         es: 'Berrechid',         de: 'Berrechid',         ar: 'برشيد' },
  settat:           { fr: 'Settat',            en: 'Settat',            es: 'Settat',            de: 'Settat',            ar: 'سطات' },
  marrakech:        { fr: 'Marrakech',         en: 'Marrakech',         es: 'Marrakech',         de: 'Marrakesch',        ar: 'مراكش' },
  agadir:           { fr: 'Agadir',            en: 'Agadir',            es: 'Agadir',            de: 'Agadir',            ar: 'أكادير' },
  khouribga:        { fr: 'Khouribga',         en: 'Khouribga',         es: 'Khouribga',         de: 'Khouribga',         ar: 'خريبكة' },
  'beni-mellal':    { fr: 'Béni Mellal',       en: 'Beni Mellal',       es: 'Beni Mellal',       de: 'Beni Mellal',       ar: 'بني ملال' },
  'el-jadida':      { fr: 'El Jadida',         en: 'El Jadida',         es: 'El Jadida',         de: 'El Jadida',         ar: 'الجديدة' },
  safi:             { fr: 'Safi',              en: 'Safi',              es: 'Safi',              de: 'Safi',              ar: 'آسفي' },
  'aeroport-med-v': { fr: 'Aéroport Mohammed V',en: 'Mohammed V Airport',es: 'Aeropuerto Mohammed V', de: 'Flughafen Mohammed V', ar: 'مطار محمد الخامس' },
  'ain-atiq':       { fr: 'Aïn Atiq',          en: 'Ain Atiq',          es: 'Ain Atiq',          de: 'Ain Atiq',          ar: 'عين عتيق' },
};

// ---------------------------------------------------------------------------
// Classes de véhicules — 5 langues
// ---------------------------------------------------------------------------
export const VEHICLE_CLASSES = {
  1: { fr: 'Classe 1 — Légers (< 3,5 T)',   en: 'Class 1 — Light (< 3.5 T)',   es: 'Clase 1 — Ligeros (< 3,5 T)',   de: 'Klasse 1 — Leicht (< 3,5 T)',   ar: 'الفئة 1 — خفيفة (< 3.5 طن)' },
  2: { fr: 'Classe 2 — Moyens (3,5–12 T)',   en: 'Class 2 — Medium (3.5–12 T)', es: 'Clase 2 — Medianos (3,5–12 T)', de: 'Klasse 2 — Mittel (3,5–12 T)',   ar: 'الفئة 2 — متوسطة (3.5–12 طن)' },
  3: { fr: 'Classe 3 — Lourds (> 12 T)',     en: 'Class 3 — Heavy (> 12 T)',     es: 'Clase 3 — Pesados (> 12 T)',     de: 'Klasse 3 — Schwer (> 12 T)',     ar: 'الفئة 3 — ثقيلة (> 12 طن)' },
};

// ---------------------------------------------------------------------------
// API publique
// ---------------------------------------------------------------------------

/**
 * Calcule le tarif pour un trajet donné.
 * @param {string} fromCity
 * @param {string} toCity
 * @param {number} vehicleClass  1 | 2 | 3
 * @returns {{ ok: boolean, toll: number, errors: string[] }}
 */
export function calculateToll(fromCity, toCity, vehicleClass) {
  const errors = [];
  if (!fromCity) errors.push('from_city_required');
  if (!toCity) errors.push('to_city_required');
  if (!vehicleClass) errors.push('vehicle_class_required');
  if (fromCity === toCity) errors.push('same_city');
  if (![1, 2, 3].includes(Number(vehicleClass))) errors.push('invalid_class');
  if (errors.length) return { ok: false, toll: 0, errors };

  const route = TOLL_RATES[fromCity]?.[toCity];
  if (!route) return { ok: false, toll: 0, errors: ['no_route'] };

  const toll = route[vehicleClass];
  if (toll === undefined) return { ok: false, toll: 0, errors: ['no_toll_for_class'] };

  return { ok: true, toll, errors: [] };
}

/**
 * Villes de départ disponibles (triées par nom français).
 */
export function getAvailableDepartureCities() {
  return Object.keys(TOLL_RATES)
    .filter((c) => Object.keys(TOLL_RATES[c]).length > 0)
    .sort((a, b) => (CITIES[a]?.fr ?? a).localeCompare(CITIES[b]?.fr ?? b, 'fr'));
}

/**
 * Villes d'arrivée disponibles depuis une ville de départ (triées par nom français).
 */
export function getAvailableDestinationCities(fromCity) {
  if (!fromCity || !TOLL_RATES[fromCity]) return [];
  return Object.keys(TOLL_RATES[fromCity])
    .sort((a, b) => (CITIES[a]?.fr ?? a).localeCompare(CITIES[b]?.fr ?? b, 'fr'));
}
