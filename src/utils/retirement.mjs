/**
 * Logique pure du calculateur « Budget de retraite au Maroc » (aucune dépendance, testable avec node:test).
 *
 * Deux blocs strictement séparés :
 *  1. budget de vie estimé (postes saisis ou valeurs de départ) ;
 *  2. comparaison avec la pension NETTE saisie par l'utilisateur.
 * Aucun impôt, abattement ou avantage fiscal n'est calculé ici : la pension est prise telle que saisie.
 *
 * Convention : toutes les saisies sont exprimées dans la devise et la périodicité choisies.
 * Le calcul interne se fait par mois, en devise choisie ; les équivalents MAD/EUR utilisent le taux fourni.
 */

/** Postes du budget de vie (clés des champs du formulaire). */
export const ITEMS = ['housing', 'food', 'transport', 'health', 'utilities', 'leisure'];

/**
 * Valeurs d'exemple (en MAD par mois) pour les postes SANS donnée dans src/config/costs.ts.
 * Elles sont affichées comme « exemple modifiable » et ne reposent sur aucune source : à remplacer.
 */
export const EXAMPLE_MAD_MONTH = { health: 600, utilities: 800 };
/** Marge d'imprévus d'exemple, en % du sous-total (exemple modifiable). */
export const EXAMPLE_CONTINGENCY_PCT = 10;

/**
 * Convertit une saisie en nombre. Accepte la virgule décimale. Renvoie NaN si vide ou invalide.
 * @param {unknown} v
 * @returns {number}
 */
export function parseAmount(v) {
  if (typeof v === 'number') return Number.isFinite(v) ? v : NaN;
  const s = String(v ?? '').trim().replace(/\s/g, '').replace(',', '.');
  if (s === '') return NaN;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

/**
 * Convertit un montant mensuel en MAD vers la devise/périodicité demandées.
 * @param {number} madMonth
 * @param {string} currency
 * @param {string} period
 * @param {number} rate 1 EUR = rate MAD
 */
export function fromMadMonth(madMonth, currency, period, rate) {
  const inCur = currency === 'EUR' ? madMonth / rate : madMonth;
  return period === 'annual' ? inCur * 12 : inCur;
}

/**
 * Convertit un montant d'une devise/périodicité vers une autre (utilisé quand on bascule l'affichage).
 * @param {number} amount
 * @param {{currency:string, period:string}} from
 * @param {{currency:string, period:string}} to
 * @param {number} rate
 */
export function convertAmount(amount, from, to, rate) {
  const monthly = from.period === 'annual' ? amount / 12 : amount;
  const mad = from.currency === 'EUR' ? monthly * rate : monthly;
  return fromMadMonth(mad, to.currency, to.period, rate);
}

/**
 * Valeurs de départ des postes pour une ville et un style de vie, à partir de src/config/costs.ts
 * (BASE et CITY_FACTOR, estimations datées) ; santé et énergie/eau/internet/téléphone : exemples.
 * @param {{rentMonth:Record<string,number>, foodDay:Record<string,number>, transportDay:Record<string,number>, funDay:Record<string,number>}} base
 * @param {number} cityFactor
 * @param {string} style 'budget' | 'mid' | 'comfort'
 * @param {string} housingType 'rent' | 'own'  « own » : le loyer n'existe pas, le poste logement part à 0 (charges à saisir)
 * @param {string} currency 'EUR' | 'MAD'
 * @param {string} period 'monthly' | 'annual'
 * @param {number} rate
 */
export function startValues(base, cityFactor, style, housingType, currency, period, rate) {
  const mad = {
    housing: housingType === 'own' ? 0 : base.rentMonth[style] * cityFactor,
    food: base.foodDay[style] * 30 * cityFactor,
    transport: base.transportDay[style] * 30 * cityFactor,
    health: EXAMPLE_MAD_MONTH.health,
    utilities: EXAMPLE_MAD_MONTH.utilities,
    leisure: base.funDay[style] * 30 * cityFactor,
  };
  /** @type {Record<string, number>} */
  const out = {};
  for (const k of ITEMS) out[k] = Math.round(fromMadMonth(mad[k], currency, period, rate));
  return out;
}

/**
 * Calcule le budget et, si une pension est saisie, la comparaison.
 * @param {{
 *   currency:string, period:string, rate:number,
 *   items:Record<string, unknown>, contingencyPct:unknown, pension?:unknown
 * }} input
 * @returns {{ok:false, invalid:string[]} | {
 *   ok:true, currency:string, rate:number,
 *   monthlyItems:Record<string,number>, subtotalMonthly:number, contingencyMonthly:number,
 *   totalMonthly:number, totalAnnual:number, totalMonthlyMad:number, totalMonthlyEur:number,
 *   hasPension:boolean, pensionMonthly:number, pensionAnnual:number,
 *   balanceMonthly:number, balanceAnnual:number, coveragePct:number|null
 * }}
 */
export function computeBudget(input) {
  const { currency, period, rate } = input;
  const invalid = [];
  if (!(typeof rate === 'number' && Number.isFinite(rate) && rate > 0)) invalid.push('rate');
  const div = period === 'annual' ? 12 : 1;

  /** @type {Record<string, number>} */
  const monthlyItems = {};
  for (const k of ITEMS) {
    const raw = input.items?.[k];
    // Poste vide = 0 ; saisie non numérique ou négative = invalide.
    const n = raw === '' || raw === undefined || raw === null ? 0 : parseAmount(raw);
    if (!Number.isFinite(n) || n < 0) { invalid.push(k); continue; }
    monthlyItems[k] = n / div;
  }

  const cRaw = input.contingencyPct;
  const c = cRaw === '' || cRaw === undefined || cRaw === null ? 0 : parseAmount(cRaw);
  if (!Number.isFinite(c) || c < 0) invalid.push('contingency');

  const pRaw = input.pension;
  const hasPensionField = !(pRaw === '' || pRaw === undefined || pRaw === null);
  const p = hasPensionField ? parseAmount(pRaw) : 0;
  if (hasPensionField && (!Number.isFinite(p) || p < 0)) invalid.push('pension');

  if (invalid.length) return { ok: false, invalid };

  const subtotalMonthly = ITEMS.reduce((s, k) => s + monthlyItems[k], 0);
  const contingencyMonthly = (subtotalMonthly * c) / 100;
  const totalMonthly = subtotalMonthly + contingencyMonthly;
  const pensionMonthly = p / div;
  const totalMonthlyMad = currency === 'EUR' ? totalMonthly * rate : totalMonthly;
  const hasPension = hasPensionField && p > 0;
  return {
    ok: true,
    currency,
    rate,
    monthlyItems,
    subtotalMonthly,
    contingencyMonthly,
    totalMonthly,
    totalAnnual: totalMonthly * 12,
    totalMonthlyMad,
    totalMonthlyEur: totalMonthlyMad / rate,
    hasPension,
    pensionMonthly,
    pensionAnnual: pensionMonthly * 12,
    balanceMonthly: pensionMonthly - totalMonthly,
    balanceAnnual: (pensionMonthly - totalMonthly) * 12,
    coveragePct: hasPension && totalMonthly > 0 ? (pensionMonthly / totalMonthly) * 100 : null,
  };
}
