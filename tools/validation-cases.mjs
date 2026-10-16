/**
 * Cas types de validation des calculateurs : node tools/validation-cases.mjs  (écrit docs/VALIDATION-CALCULATEURS.md)
 * Référence = recalcul indépendant depuis le texte officiel (aucun simulateur officiel lisible : MCV/ADII est une SPA vide,
 * simulateurs DGI/Daam Sakane non lisibles). Les calculs « frais d'achat » et « crédit » reprennent la formule des
 * composants .astro (logique inline, non importable). Ne modifie aucun calculateur.
 */
import { writeFileSync } from 'node:fs';
import { computeCustoms } from '../src/utils/customs.mjs';
import { computeCapitalGain } from '../src/utils/capitalgain.mjs';
import { computeBudget } from '../src/utils/retirement.mjs';

const R = (x) => Math.round(x + 1e-9);
const rows = {};
const add = (sec, ref, c, site, expect, note = '', limit = false) => {
  (rows[sec] ??= []).push({ c, site, expect, gap: site - expect, note, limit, ref });
};

/* ---------- Douane ---------- */
const P = { vatPct: 20, tpiPct: 0.25, abatementPct: 90, capMad: 300000, minAge: 60, minResidenceYears: 10, ageGeneral: 5, ageExtended: 10, luxuryThreshold: 400000 };
const refCus = (v, ab, di, tpi = 0.25, tva = 20) => { const b = v - ab; const d = b * di / 100, t = b * tpi / 100; return d + t + (b + d + t) * tva / 100; };
const REF_CUS = 'Calcul manuel formule ADII (DI et TPI sur base ; TVA sur base+DI+TPI) et conditions de la circulaire 5945/311 (60 ans, plus de 10 ans, plafond 300 000)';
for (const [v, di] of [[50000, 17.5], [100000, 17.5], [150000, 2.5], [200000, 17.5], [250000, 10], [300000, 17.5], [80000, 0], [120000, 40]]) {
  const r = computeCustoms({ regime: 'standard', diPct: di, tpiPct: 0.25, vatPct: 20, value: v }, P);
  add('Douane', REF_CUS, `standard valeur ${v}, DI ${di} %`, r.total, refCus(v, 0, di), '', false);
}
const c90 = (label, o, exp, limit, note) => {
  const r = computeCustoms({ regime: 'abatement90', diPct: 17.5, tpiPct: 0.25, vatPct: 20, beneficiaryAge: 62, residenceYears: 15, passengerCar: true, vehicleAge: 2, ...o }, P);
  add('Douane', REF_CUS, label, r.total, exp, note, limit);
};
for (const v of [100000, 200000, 280000]) c90(`90 % valeur ${v} (éligible)`, { value: v }, refCus(v, v * 0.9, 17.5));
c90('90 %, véhicule 8 ans (5-10 ans)', { value: 200000, vehicleAge: 8 }, refCus(200000, 180000, 17.5));
c90('90 %, DI 2,5 % hybride', { value: 250000, diPct: 2.5 }, refCus(250000, 225000, 2.5));
c90('90 %, déjà utilisé -> droit commun', { value: 200000, alreadyUsed: true }, refCus(200000, 0, 17.5));
c90('LIMITE valeur = plafond 300 000', { value: 300000 }, refCus(300000, 270000, 17.5), true);
c90('LIMITE valeur 300 001 (part au-delà sans abattement)', { value: 300001 }, refCus(300001, 270000, 17.5), true, 'Interprétation du site (abattement sur 300 000 seulement) ; à confirmer ADII, voir point 4');
c90('LIMITE valeur 500 000 (plafond dépassé)', { value: 500000 }, refCus(500000, 270000, 17.5), true, 'idem, point 4');
c90('LIMITE âge 59 ans -> droit commun', { value: 200000, beneficiaryAge: 59 }, refCus(200000, 0, 17.5), true);
c90('LIMITE résidence exactement 10 ans (texte : plus de 10)', { value: 200000, residenceYears: 10 }, refCus(200000, 0, 17.5), true, 'Le site accorde le 90 % à 10 ans pile (avertissement seulement) ; le texte exige plus de 10 ans : bug potentiel, point 3');
c90('LIMITE véhicule 11 ans (non dédouanable, total 0)', { value: 200000, vehicleAge: 11 }, 0, true);

/* ---------- Plus-value ---------- */
const CG = { ratePct: 20, minPct: 3, acquisitionCostFlatPct: 15, smallSalesCapMad: 140000, mainResidenceYears: 5, mainResidencePriceCapMad: 4000000, vacancyMaxMonths: 12, socialYears: 4, socialAreaMin: 50, socialAreaMax: 80, socialPriceCapMad: 250000 };
const refCG = (p, a, k = 1, costs = 0, works = 0) => { const fr = Math.max(costs, a * 0.15); const g = p - (a * k + fr + works); return Math.max(0.2 * Math.max(g, 0), 0.03 * p); };
const REF_CG = 'Recalcul manuel CGI (art. 61 à 65 et 73-II-F : 20 %, minimum 3 %, frais forfaitaires 15 %, exonérations art. 63) ; coefficients de réévaluation non lus : saisie utilisateur';
const cg = (label, o, exp, limit, note) => {
  const r = computeCapitalGain({ acquisitionCosts: 0, works: 0, coefficient: 1, exemption: 'none', ...o }, CG);
  add('Plus-value', REF_CG, label, r.ok ? r.tax : NaN, exp, note, limit);
};
cg('1 000 000 / 600 000', { price: 1e6, acquisitionPrice: 6e5 }, refCG(1e6, 6e5));
cg('2 000 000 / 1 000 000 coef 1,1', { price: 2e6, acquisitionPrice: 1e6, coefficient: 1.1 }, refCG(2e6, 1e6, 1.1));
cg('800 000 / 700 000 frais réels 150 000', { price: 8e5, acquisitionPrice: 7e5, acquisitionCosts: 150000 }, refCG(8e5, 7e5, 1, 150000));
cg('1 500 000 / 900 000 travaux 200 000', { price: 15e5, acquisitionPrice: 9e5, works: 2e5 }, refCG(15e5, 9e5, 1, 0, 2e5));
cg('3 000 000 / 1 200 000 coef 1,25 frais 100 000', { price: 3e6, acquisitionPrice: 12e5, coefficient: 1.25, acquisitionCosts: 1e5 }, refCG(3e6, 12e5, 1.25, 1e5));
cg('500 000 / 300 000', { price: 5e5, acquisitionPrice: 3e5 }, refCG(5e5, 3e5));
cg('5 000 000 / 2 000 000', { price: 5e6, acquisitionPrice: 2e6 }, refCG(5e6, 2e6));
cg('Habitation principale 3 000 000, 6 ans, exonérée', { price: 3e6, acquisitionPrice: 1e6, exemption: 'main', occupancyYears: 6, rented: false, usedRecently: false, vacancyMonths: 0 }, 0);
cg('Habitation principale 5 000 000 (3 % sur l\'excédent)', { price: 5e6, acquisitionPrice: 1e6, exemption: 'main', occupancyYears: 8, rented: false, usedRecently: false, vacancyMonths: 0 }, 0.03 * 1e6);
cg('Habitation principale 4 ans -> imposable', { price: 2e6, acquisitionPrice: 1e6, exemption: 'main', occupancyYears: 4, rented: false, usedRecently: false, vacancyMonths: 0 }, refCG(2e6, 1e6));
cg('Logement social 250 000, 60 m², 4 ans, 1re cession', { price: 250000, acquisitionPrice: 150000, exemption: 'social', occupancyYears: 4, areaM2: 60, firstSale: true }, 0);
cg('Logement social 250 001 -> imposable', { price: 250001, acquisitionPrice: 150000, exemption: 'social', occupancyYears: 4, areaM2: 60, firstSale: true }, refCG(250001, 150000));
cg('Petite cession 140 001 -> imposable', { price: 140001, acquisitionPrice: 50000, exemption: 'small', yearSalesTotal: 140001 }, refCG(140001, 50000));
cg('LIMITE perte (vente < achat) -> minimum 3 %', { price: 800000, acquisitionPrice: 1000000 }, refCG(8e5, 1e6), true);
cg('LIMITE profit nul exact (frais 15 %)', { price: 1150000, acquisitionPrice: 1000000 }, refCG(1150000, 1e6), true);
cg('LIMITE 20 % du profit < 3 % du prix', { price: 1160000, acquisitionPrice: 1000000 }, refCG(1160000, 1e6), true);
cg('LIMITE frais réels = forfait (150 000)', { price: 2e6, acquisitionPrice: 1e6, acquisitionCosts: 150000 }, refCG(2e6, 1e6, 1, 150000), true);
cg('LIMITE petite cession 140 000 exonérée', { price: 140000, acquisitionPrice: 50000, exemption: 'small', yearSalesTotal: 140000 }, 0, true);
cg('LIMITE habitation principale 4 000 000 exact', { price: 4e6, acquisitionPrice: 1e6, exemption: 'main', occupancyYears: 5, rented: false, usedRecently: false, vacancyMonths: 0 }, 0, true);
cg('LIMITE habitation principale 5 ans pile + vacance 12 mois', { price: 2e6, acquisitionPrice: 1e6, exemption: 'main', occupancyYears: 5, rented: false, usedRecently: false, vacancyMonths: 12 }, 0, true);

/* ---------- Frais d'achat ---------- */
const REF_FEES = 'ANCFCC tarifs-fr.pdf (lu) : 1,5 % + 100 DH par propriété, minimum 500 DH ; enregistrement 4 % / 5 % (taux usuels) ; notaire = 1 % (modèle du site, barème décret non confirmé) ; Daam Sakane 100 000 / 70 000 DH (presse/AvocatLib, site officiel non lu)';
const siteFees = (p, land, aid) => { const reg = p * (land ? 5 : 4) / 100, cf = Math.max(p * 1.5 / 100 + 100, 500), not = Math.max(p * 0.01, 4000) * 1.2; let a = 0; if (aid && !land) { if (p <= 3e5) a = 1e5; else if (p <= 7e5) a = 7e4; } return reg + cf + not + 1500 - a; };
const refFees = (p, land, aid) => { const reg = p * (land ? 0.05 : 0.04), cf = Math.max(p * 0.015 + 100, 500), nHT = Math.max(p * 0.01, 4000); let a = 0; if (aid && !land) { if (p <= 3e5) a = 1e5; else if (p <= 7e5) a = 7e4; } return reg + cf + nHT * 1.2 + 1500 - a; };
for (const [p, land, aid, lim] of [[500000, 0, 0, 0], [800000, 0, 0, 0], [1200000, 0, 0, 0], [2000000, 0, 0, 0], [3000000, 0, 0, 0], [6000000, 0, 0, 0], [400000, 1, 0, 0], [1500000, 1, 0, 0], [450000, 0, 1, 0], [250000, 0, 1, 0], [900000, 0, 1, 0],
  [300000, 0, 1, 1], [300001, 0, 1, 1], [700000, 0, 1, 1], [700001, 0, 1, 1], [100000, 0, 0, 1], [10000000, 0, 0, 1], [1000000, 0, 0, 1], [33333, 0, 0, 1], [10000001, 0, 0, 1]]) {
  const gapExp = R(siteFees(p, land, aid)) - R(refFees(p, land, aid));
  add("Frais d'achat", REF_FEES, `prix ${p}${land ? ' terrain' : ''}${aid ? ' + Daam Sakane' : ''}`, R(siteFees(p, land, aid)), R(refFees(p, land, aid)),
    gapExp === 0 ? '' : 'Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH)', !!lim);
}

/* ---------- Crédit ---------- */
const siteM = (loan, rate, y) => { const n = Math.max(1, Math.round(y * 12)), r = rate / 1200; return r > 0 ? loan * r / (1 - Math.pow(1 + r, -n)) : loan / n; };
const refM = (loan, rate, y) => { const n = Math.max(1, Math.round(y * 12)), r = rate / 1200; if (r === 0) return loan / n; let lo = 0, hi = loan * 2; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; let b = loan; for (let k = 0; k < n; k++) b = b * (1 + r) - m; if (b > 0) lo = m; else hi = m; } return (lo + hi) / 2; };
for (const [l, r, y, lim] of [[500000, 5, 20, 0], [800000, 4.5, 25, 0], [1e6, 5.5, 15, 0], [300000, 6, 10, 0], [1.5e6, 4, 30, 0], [200000, 7, 5, 0], [900000, 5, 25, 0], [600000, 3.5, 20, 0], [1.2e6, 5, 20, 0], [400000, 4.75, 12, 0], [1e5, 5, 7, 0], [750000, 6.5, 18, 0], [2e6, 5, 25, 0],
  [500000, 0, 20, 1], [500000, 0.01, 20, 1], [500000, 5, 0, 1], [500000, 5, 0.5, 1], [500000, 5, 40, 1], [1, 5, 1, 1], [1e7, 12, 30, 1]]) {
  const s = Math.round(siteM(l, r, y) * 100) / 100, e = Math.round(refM(l, r, y) * 100) / 100;
  add('Crédit', "Tableau d'amortissement itératif (bisection) ; aucun simulateur officiel (taux = offre de banque, hors assurance et frais)", `emprunt ${l}, ${r} %, ${y} ans`, s, e, y === 0 ? 'durée 0 : le site force 1 mois (n=1), mensualité = capital' : '', !!lim);
}

/* ---------- Retraite ---------- */
const rt = (label, inp, exp, lim) => {
  const r = computeBudget({ currency: 'MAD', period: 'monthly', rate: 10.8, contingencyPct: 10, ...inp });
  add('Retraite', 'Recalcul manuel (somme des postes x (1+marge) ; pension - budget). Aucun impôt calculé, donc aucune référence officielle applicable', label, r.ok ? Math.round(r.balanceMonthly * 100) / 100 : NaN, exp, '', lim);
};
const it = (h, f, t, he, u, l) => ({ housing: h, food: f, transport: t, health: he, utilities: u, leisure: l });
for (const [h, f, t, he, u, l, pen] of [[3000, 2000, 500, 600, 800, 700, 8000], [4000, 2500, 800, 700, 900, 1000, 9000], [2500, 1800, 400, 500, 700, 500, 5000], [5000, 3000, 1000, 1000, 1200, 1500, 12000], [3500, 2200, 600, 600, 800, 800, 6000], [6000, 3500, 1200, 900, 1000, 2000, 15000], [2000, 1500, 300, 400, 600, 300, 4000], [4500, 2800, 700, 800, 1000, 1200, 7000]])
  rt(`budget ${h + f + t + he + u + l} MAD, pension ${pen}`, { items: it(h, f, t, he, u, l), pension: pen }, pen - (h + f + t + he + u + l) * 1.1);
rt('EUR', { items: it(300, 200, 50, 50, 70, 80), pension: 900, currency: 'EUR' }, 900 - 750 * 1.1);
rt('marge 20 %', { items: it(2000, 1000, 0, 0, 0, 0), pension: 5000, contingencyPct: 20 }, 5000 - 3000 * 1.2);
rt('virgule décimale', { items: it('1 000,5', 500, 0, 0, 0, 0), pension: '3000,25' }, 3000.25 - 1500.5 * 1.1);
rt('pension seule 10 000', { items: it(0, 0, 0, 0, 0, 0), pension: 10000 }, 10000);
rt('postes élevés 20 000', { items: it(10000, 5000, 2000, 1000, 1000, 1000), pension: 15000 }, 15000 - 20000 * 1.1);
rt('marge 100 %', { items: it(1000, 0, 0, 0, 0, 0), pension: 2000, contingencyPct: 100 }, 0);
rt('pension vide', { items: it(1000, 0, 0, 0, 0, 0), pension: '' }, -1100);
rt('LIMITE tout vide, pension 0', { items: it('', '', '', '', '', ''), pension: 0 }, 0, true);
rt('LIMITE marge 0 %', { items: it(1000, 1000, 0, 0, 0, 0), pension: 2500, contingencyPct: 0 }, 500, true);
rt('LIMITE pension = budget exact', { items: it(1000, 0, 0, 0, 0, 0), pension: 1100 }, 0, true);
rt('LIMITE saisie négative (invalide -> NaN attendu)', { items: it(-1, 0, 0, 0, 0, 0), pension: 100 }, NaN, true);
rt('LIMITE annuel (pension 90 000/an)', { items: it(36000, 24000, 0, 0, 0, 0), pension: 90000, period: 'annual' }, 90000 / 12 - 5000 * 1.1, true);

/* ---------- Rapport ---------- */
let md = '# Validation des calculateurs\n\nGénéré par `node tools/validation-cases.mjs` (2026-10-16). 20 cas par calculateur dont 5 limites (marqués L).\n\n';
md += "**Méthode.** Aucun simulateur officiel n'a pu être lu : le simulateur ADII (MCV, douane.gov.ma/mcv) est une application web dont le contenu reste vide au scraping ; les simulateurs DGI et Daam Sakane ne sont pas accessibles ; il n'existe pas de simulateur public pour crédit/retraite. Les références sont donc des **recalculs manuels indépendants depuis le texte officiel** (formule indiquée par section). Seul le tarif ANCFCC (tarifs-fr.pdf, ancfcc.gov.ma) a été lu directement : inscription d'une vente = droit ad valorem 1,5 % + droit fixe 100 DH par propriété, minimum de perception 500 DH. Daam Sakane (100 000 DH jusqu'à 300 000 ; 70 000 DH de 300 001 à 700 000) vient de la presse et d'AvocatLib, pas du site officiel.\n\n";
for (const [sec, list] of Object.entries(rows)) {
  md += `## ${sec}\n\nRéférence : ${list[0].ref}\n\n| # | Cas | Résultat site | Référence | Écart | Explication |\n|---|---|---|---|---|---|\n`;
  list.forEach((r, i) => {
    const bothNaN = Number.isNaN(r.site) && Number.isNaN(r.expect);
    const g = bothNaN ? 0 : r.gap;
    const ok = Math.abs(g) <= 3;
    const expl = r.note || (ok ? 'concordant' : 'écart non expliqué');
    md += `| ${i + 1}${r.limit ? ' L' : ''} | ${r.c} | ${r.site} | ${typeof r.expect === 'number' && !Number.isNaN(r.expect) ? Math.round(r.expect * 100) / 100 : 'refus'} | ${Number.isNaN(g) ? 'n/a' : Math.round(g * 100) / 100} | ${expl} |\n`;
  });
  md += '\n';
}
md += `## Bugs et points à trancher (calculateurs non modifiés)

1. **Frais d'achat, droit fixe ANCFCC** : \`landRegistryFixed: 200\` dans \`src/config/mre.ts\` ; le tarif ANCFCC lu indique 100 DH par propriété (minimum de perception 500 DH, non codé). Surestimation de 100 DH.
2. **Frais d'achat, notaire à 1 %** : sous-estime le barème progressif cité en commentaire (projet de décret 2.17.481, non confirmé).
3. **Douane, résidence = 10 ans** : le texte exige « plus de dix » ans ; \`checkEligibility90\` accepte 10 pile (avertissement seulement) et accorde le 90 %.
4. **Douane, valeur > 300 000 DH** : le site applique 90 % sur 300 000 et le droit commun sur l'excédent ; la lecture ADII (« dans la limite de ») est à confirmer, une autre lecture est « pas d'abattement du tout ».
5. **Crédit** : champ vide, 0 ou négatif traité comme 0 sans message ; durée 0 forcée à 1 mois ; un taux 0 % est indistinguable d'un champ vide.
6. **Plus-value** : concordance attendue (même formule) ; ne prouve pas les coefficients de réévaluation, qui restent une saisie utilisateur.
7. **Retraite** : la saisie négative est refusée (cohérent) ; pas de référence officielle possible.
`;
writeFileSync(new URL('../docs/VALIDATION-CALCULATEURS.md', import.meta.url), md);
for (const [s, l] of Object.entries(rows)) console.log(s, l.length, 'cas,', l.filter((r) => !(Number.isNaN(r.site) && Number.isNaN(r.expect)) && !(Math.abs(r.gap) <= 3)).length, 'écarts');
