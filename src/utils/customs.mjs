/**
 * Logique pure du calculateur « Frais de dédouanement d'une voiture » (aucune dépendance, testable avec node:test).
 *
 * Ce que le module calcule (rien d'autre) :
 *   base imposable   = valeur saisie − abattement
 *   droit d'import.  = base imposable × taux DI
 *   taxe parafiscale= base imposable × taux TPI
 *   TVA              = (base imposable + DI + TPI) × taux TVA
 *   total            = DI + TPI + TVA
 * La « valeur saisie » est la valeur retenue par la douane (valeur à l'état neuf de sa grille, ou valeur imposable
 * qu'elle a communiquée) : le module NE la détermine PAS. Aucun barème d'âge du véhicule n'est appliqué : un éventuel
 * abattement autre que celui de 90 % doit être saisi par l'utilisateur tel que communiqué par la douane.
 *
 * Abattement de 90 % (MRE de 60 ans et plus) : appliqué à la valeur dans la limite d'un plafond ; la part au-delà
 * du plafond est retenue sans abattement (« droit commun »). Les conditions d'éligibilité sont contrôlées et chaque
 * condition non remplie renvoie un code explicite (le composant les traduit).
 * Convention d'arrondi : chaque ligne est arrondie au dirham, le total est la somme des lignes arrondies.
 */

/** Convertit une saisie en nombre. Accepte la virgule décimale. Renvoie NaN si vide ou invalide. */
export function parseNum(v) {
  if (typeof v === 'number') return Number.isFinite(v) ? v : NaN;
  const s = String(v ?? '').trim().replace(/\s/g, '').replace(',', '.');
  if (s === '') return NaN;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

/** Arrondi au dirham (demi vers le haut, tolérance aux erreurs flottantes). */
export const round = (x) => Math.round(x + 1e-9);

/**
 * Contrôle des conditions de l'abattement de 90 %.
 * @param {object} i
 * @param {number} i.beneficiaryAge  âge du demandeur (ans révolus)
 * @param {number} i.residenceYears  années de résidence effective à l'étranger
 * @param {boolean} i.passengerCar   voiture de tourisme de 9 places au plus (conducteur compris)
 * @param {boolean} i.alreadyUsed    abattement déjà utilisé une fois
 * @param {boolean} i.settled        déjà installé de façon permanente au Maroc
 * @param {number} i.vehicleAge      âge du véhicule en années (NaN si inconnu)
 * @param {object} p                 paramètres (voir src/config/customs.ts)
 * @returns {{eligible:boolean, blockers:string[], warnings:string[]}}
 */
export function checkEligibility90(i, p) {
  const blockers = [];
  const warnings = [];
  if (i.beneficiaryAge < p.minAge) blockers.push('age_below');
  if (i.residenceYears < p.minResidenceYears) blockers.push('residence_below');
  else if (i.residenceYears === p.minResidenceYears) warnings.push('residence_borderline'); // texte : « plus de 10 ans »
  if (!i.passengerCar) blockers.push('vehicle_kind');
  if (i.alreadyUsed) blockers.push('already_used');
  if (i.settled) blockers.push('settled');
  if (Number.isNaN(i.vehicleAge)) warnings.push('vehicle_age_missing');
  else if (i.vehicleAge > p.ageExtended) blockers.push('vehicle_too_old');
  else if (i.vehicleAge === p.ageExtended) warnings.push('vehicle_age_borderline');
  return { eligible: blockers.length === 0, blockers, warnings };
}

const isRate = (x) => Number.isFinite(x) && x >= 0 && x <= 100;

/**
 * Calcule les droits et taxes estimés.
 * @param {object} input
 * @param {number} input.value               valeur retenue par la douane (MAD)
 * @param {'standard'|'abatement90'} input.regime
 * @param {number} [input.otherAbatementPct] abattement communiqué par la douane (régime standard), 0 par défaut
 * @param {number} input.diPct               taux du droit d'importation (%)
 * @param {number} input.tpiPct              taux de la taxe parafiscale (%)
 * @param {number} input.vatPct              taux de TVA (%)
 * @param {number} [input.vehicleAge]        âge du véhicule (ans), NaN/absent si inconnu
 * @param {number} [input.beneficiaryAge]    régime 90 % uniquement
 * @param {number} [input.residenceYears]    régime 90 % uniquement
 * @param {boolean} [input.passengerCar]     régime 90 % uniquement
 * @param {boolean} [input.alreadyUsed]      régime 90 % uniquement
 * @param {boolean} [input.settled]          régime 90 % uniquement
 * @param {object} params paramètres officiels (voir src/config/customs.ts, CUSTOMS_VALUES)
 */
export function computeCustoms(input, params) {
  const errors = [];
  const value = input.value;
  if (!Number.isFinite(value)) errors.push({ field: 'value', code: 'value_required' });
  else if (value <= 0) errors.push({ field: 'value', code: 'value_positive' });
  for (const f of ['diPct', 'tpiPct', 'vatPct']) {
    if (!Number.isFinite(input[f])) errors.push({ field: f, code: 'rate_required' });
    else if (!isRate(input[f])) errors.push({ field: f, code: 'rate_range' });
  }
  const other = input.otherAbatementPct === undefined || Number.isNaN(input.otherAbatementPct) ? 0 : input.otherAbatementPct;
  if (input.regime === 'standard' && !isRate(other)) errors.push({ field: 'otherAbatementPct', code: 'rate_range' });
  const vehicleAge = input.vehicleAge === undefined ? NaN : input.vehicleAge;
  if (!Number.isNaN(vehicleAge) && (!Number.isFinite(vehicleAge) || vehicleAge < 0)) errors.push({ field: 'vehicleAge', code: 'age_invalid' });
  let elig = null;
  if (input.regime === 'abatement90') {
    if (!Number.isFinite(input.beneficiaryAge) || input.beneficiaryAge < 0) errors.push({ field: 'beneficiaryAge', code: 'age_invalid' });
    if (!Number.isFinite(input.residenceYears) || input.residenceYears < 0) errors.push({ field: 'residenceYears', code: 'age_invalid' });
  }
  if (errors.length) return { ok: false, errors };

  const blockers = [];
  const warnings = [];
  if (input.regime === 'abatement90') {
    elig = checkEligibility90({
      beneficiaryAge: input.beneficiaryAge,
      residenceYears: input.residenceYears,
      passengerCar: input.passengerCar !== false,
      alreadyUsed: input.alreadyUsed === true,
      settled: input.settled === true,
      vehicleAge,
    }, params);
    blockers.push(...elig.blockers);
    warnings.push(...elig.warnings);
  } else if (!Number.isNaN(vehicleAge)) {
    if (vehicleAge > params.ageExtended) blockers.push('vehicle_too_old');
    else if (vehicleAge >= params.ageGeneral) warnings.push('vehicle_age_5_10');
  }
  if (!Number.isNaN(vehicleAge) && vehicleAge >= params.ageGeneral && vehicleAge <= params.ageExtended && input.regime === 'abatement90') warnings.push('vehicle_age_5_10');

  // Un véhicule trop ancien n'est pas dédouanable : aucun montant n'est proposé.
  if (blockers.includes('vehicle_too_old')) {
    return { ok: true, eligible90: elig ? elig.eligible : null, cleared: false, applied: 'none', blockers, warnings, lines: [], total: 0 };
  }

  const use90 = input.regime === 'abatement90' && elig !== null && elig.eligible;
  let abatement;
  let abatementPct;
  let abatementBase = value;
  if (use90) {
    abatementBase = Math.min(value, params.capMad);
    abatementPct = params.abatementPct;
    abatement = round((abatementBase * abatementPct) / 100);
  } else {
    abatementPct = other;
    abatement = round((value * abatementPct) / 100);
  }
  const base = value - abatement;
  const di = round((base * input.diPct) / 100);
  const tpi = round((base * input.tpiPct) / 100);
  const vat = round(((base + di + tpi) * input.vatPct) / 100);
  const total = di + tpi + vat;
  if (value >= params.luxuryThreshold) warnings.push('luxury_stamp');
  if (use90 && value > params.capMad) warnings.push('cap_exceeded');

  return {
    ok: true,
    eligible90: elig ? elig.eligible : null,
    cleared: true,
    applied: use90 ? 'abatement90' : 'standard',
    blockers: blockers.filter((b) => b !== 'vehicle_too_old'),
    warnings,
    lines: [
      { id: 'value', base: null, ratePct: null, amount: round(value) },
      { id: 'abatement', base: round(abatementBase), ratePct: abatementPct, amount: -abatement },
      { id: 'base', base: null, ratePct: null, amount: base },
      { id: 'di', base, ratePct: input.diPct, amount: di },
      { id: 'tpi', base, ratePct: input.tpiPct, amount: tpi },
      { id: 'vat', base: base + di + tpi, ratePct: input.vatPct, amount: vat },
    ],
    taxableBase: base,
    di, tpi, vat, total,
    totalPctOfValue: (total / value) * 100,
  };
}
