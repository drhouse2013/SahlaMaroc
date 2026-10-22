# Validation des calculateurs

Généré par `node tools/validation-cases.mjs` (2026-10-16). 20 cas par calculateur dont 5 limites (marqués L).

**Méthode.** Aucun simulateur officiel n'a pu être lu : le simulateur ADII (MCV, douane.gov.ma/mcv) est une application web dont le contenu reste vide au scraping ; les simulateurs DGI et Daam Sakane ne sont pas accessibles ; il n'existe pas de simulateur public pour crédit/retraite. Les références sont donc des **recalculs manuels indépendants depuis le texte officiel** (formule indiquée par section). Seul le tarif ANCFCC (tarifs-fr.pdf, ancfcc.gov.ma) a été lu directement : inscription d'une vente = droit ad valorem 1,5 % + droit fixe 100 DH par propriété, minimum de perception 500 DH. Daam Sakane (100 000 DH jusqu'à 300 000 ; 70 000 DH de 300 001 à 700 000) vient de la presse et d'AvocatLib, pas du site officiel.

## Douane

Référence : Calcul manuel formule ADII (DI et TPI sur base ; TVA sur base+DI+TPI) et conditions de la circulaire 5945/311 (60 ans, plus de 10 ans, plafond 300 000)

| # | Cas | Résultat site | Référence | Écart | Explication |
|---|---|---|---|---|---|
| 1 | standard valeur 50000, DI 17.5 % | 20650 | 20650 | 0 | concordant |
| 2 | standard valeur 100000, DI 17.5 % | 41300 | 41300 | 0 | concordant |
| 3 | standard valeur 150000, DI 2.5 % | 34950 | 34950 | 0 | concordant |
| 4 | standard valeur 200000, DI 17.5 % | 82600 | 82600 | 0 | concordant |
| 5 | standard valeur 250000, DI 10 % | 80750 | 80750 | 0 | concordant |
| 6 | standard valeur 300000, DI 17.5 % | 123900 | 123900 | 0 | concordant |
| 7 | standard valeur 80000, DI 0 % | 16240 | 16240 | 0 | concordant |
| 8 | standard valeur 120000, DI 40 % | 81960 | 81960 | 0 | concordant |
| 9 | 90 % valeur 100000 (éligible) | 4130 | 4130 | 0 | concordant |
| 10 | 90 % valeur 200000 (éligible) | 8260 | 8260 | 0 | concordant |
| 11 | 90 % valeur 280000 (éligible) | 11564 | 11564 | 0 | concordant |
| 12 | 90 %, véhicule 8 ans (5-10 ans) | 8260 | 8260 | 0 | concordant |
| 13 | 90 %, DI 2,5 % hybride | 5826 | 5825 | 1 | concordant |
| 14 | 90 %, déjà utilisé -> droit commun | 82600 | 82600 | 0 | concordant |
| 15 L | LIMITE valeur = plafond 300 000 | 12390 | 12390 | 0 | concordant |
| 16 L | LIMITE valeur 300 001 (part au-delà sans abattement) | 12390 | 12390.41 | -0.41 | Interprétation du site (abattement sur 300 000 seulement) ; à confirmer ADII, voir point 4 |
| 17 L | LIMITE valeur 500 000 (plafond dépassé) | 94990 | 94990 | 0 | idem, point 4 |
| 18 L | LIMITE âge 59 ans -> droit commun | 82600 | 82600 | 0 | concordant |
| 19 L | LIMITE résidence exactement 10 ans (texte : plus de 10) | 8260 | 82600 | -74340 | Le site accorde le 90 % à 10 ans pile (avertissement seulement) ; le texte exige plus de 10 ans : bug potentiel, point 3 |
| 20 L | LIMITE véhicule 11 ans (non dédouanable, total 0) | 0 | 0 | 0 | concordant |

## Plus-value

Référence : Recalcul manuel CGI (art. 61 à 65 et 73-II-F : 20 %, minimum 3 %, frais forfaitaires 15 %, exonérations art. 63) ; coefficients de réévaluation non lus : saisie utilisateur

| # | Cas | Résultat site | Référence | Écart | Explication |
|---|---|---|---|---|---|
| 1 | 1 000 000 / 600 000 | 62000 | 62000 | 0 | concordant |
| 2 | 2 000 000 / 1 000 000 coef 1,1 | 150000 | 150000 | 0 | concordant |
| 3 | 800 000 / 700 000 frais réels 150 000 | 24000 | 24000 | 0 | concordant |
| 4 | 1 500 000 / 900 000 travaux 200 000 | 53000 | 53000 | 0 | concordant |
| 5 | 3 000 000 / 1 200 000 coef 1,25 frais 100 000 | 264000 | 264000 | 0 | concordant |
| 6 | 500 000 / 300 000 | 31000 | 31000 | 0 | concordant |
| 7 | 5 000 000 / 2 000 000 | 540000 | 540000 | 0 | concordant |
| 8 | Habitation principale 3 000 000, 6 ans, exonérée | 0 | 0 | 0 | concordant |
| 9 | Habitation principale 5 000 000 (3 % sur l'excédent) | 30000 | 30000 | 0 | concordant |
| 10 | Habitation principale 4 ans -> imposable | 170000 | 170000 | 0 | concordant |
| 11 | Logement social 250 000, 60 m², 4 ans, 1re cession | 0 | 0 | 0 | concordant |
| 12 | Logement social 250 001 -> imposable | 15500 | 15500.2 | -0.2 | concordant |
| 13 | Petite cession 140 001 -> imposable | 16500 | 16500.2 | -0.2 | concordant |
| 14 L | LIMITE perte (vente < achat) -> minimum 3 % | 24000 | 24000 | 0 | concordant |
| 15 L | LIMITE profit nul exact (frais 15 %) | 34500 | 34500 | 0 | concordant |
| 16 L | LIMITE 20 % du profit < 3 % du prix | 34800 | 34800 | 0 | concordant |
| 17 L | LIMITE frais réels = forfait (150 000) | 170000 | 170000 | 0 | concordant |
| 18 L | LIMITE petite cession 140 000 exonérée | 0 | 0 | 0 | concordant |
| 19 L | LIMITE habitation principale 4 000 000 exact | 0 | 0 | 0 | concordant |
| 20 L | LIMITE habitation principale 5 ans pile + vacance 12 mois | 0 | 0 | 0 | concordant |

## Frais d'achat

Référence : ANCFCC tarifs-fr.pdf (lu) : 1,5 % + 100 DH par propriété, minimum 500 DH ; enregistrement 4 % / 5 % (taux usuels) ; notaire = 1 % (modèle du site, barème décret non confirmé) ; Daam Sakane 100 000 / 70 000 DH (presse/AvocatLib, site officiel non lu)

| # | Cas | Résultat site | Référence | Écart | Explication |
|---|---|---|---|---|---|
| 1 | prix 500000 | 35200 | 35100 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 2 | prix 800000 | 55300 | 55200 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 3 | prix 1200000 | 82100 | 82000 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 4 | prix 2000000 | 135700 | 135600 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 5 | prix 3000000 | 202700 | 202600 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 6 | prix 6000000 | 403700 | 403600 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 7 | prix 400000 terrain | 32500 | 32400 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 8 | prix 1500000 terrain | 117200 | 117100 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 9 | prix 450000 + Daam Sakane | -38150 | -38250 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 10 | prix 250000 + Daam Sakane | -79750 | -79850 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 11 | prix 900000 + Daam Sakane | 62000 | 61900 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 12 L | prix 300000 + Daam Sakane | -77000 | -77100 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 13 L | prix 300001 + Daam Sakane | -47000 | -47100 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 14 L | prix 700000 + Daam Sakane | -21400 | -21500 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 15 L | prix 700001 + Daam Sakane | 48600 | 48500 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 16 L | prix 100000 | 12000 | 11900 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 17 L | prix 10000000 | 671700 | 671600 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 18 L | prix 1000000 | 68700 | 68600 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 19 L | prix 33333 | 8333 | 8233 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |
| 20 L | prix 10000001 | 671700 | 671600 | 100 | Droit fixe ANCFCC 200 DH (site) vs 100 DH (tarif lu) : surestimation de 100 DH ; minimum 500 DH non codé (sans effet au-dessus de 33 334 DH) |

## Crédit

Référence : Tableau d'amortissement itératif (bisection) ; aucun simulateur officiel (taux = offre de banque, hors assurance et frais)

| # | Cas | Résultat site | Référence | Écart | Explication |
|---|---|---|---|---|---|
| 1 | emprunt 500000, 5 %, 20 ans | 3299.78 | 3299.78 | 0 | concordant |
| 2 | emprunt 800000, 4.5 %, 25 ans | 4446.66 | 4446.66 | 0 | concordant |
| 3 | emprunt 1000000, 5.5 %, 15 ans | 8170.83 | 8170.83 | 0 | concordant |
| 4 | emprunt 300000, 6 %, 10 ans | 3330.62 | 3330.62 | 0 | concordant |
| 5 | emprunt 1500000, 4 %, 30 ans | 7161.23 | 7161.23 | 0 | concordant |
| 6 | emprunt 200000, 7 %, 5 ans | 3960.24 | 3960.24 | 0 | concordant |
| 7 | emprunt 900000, 5 %, 25 ans | 5261.31 | 5261.31 | 0 | concordant |
| 8 | emprunt 600000, 3.5 %, 20 ans | 3479.76 | 3479.76 | 0 | concordant |
| 9 | emprunt 1200000, 5 %, 20 ans | 7919.47 | 7919.47 | 0 | concordant |
| 10 | emprunt 400000, 4.75 %, 12 ans | 3649.6 | 3649.6 | 0 | concordant |
| 11 | emprunt 100000, 5 %, 7 ans | 1413.39 | 1413.39 | 0 | concordant |
| 12 | emprunt 750000, 6.5 %, 18 ans | 5899.21 | 5899.21 | 0 | concordant |
| 13 | emprunt 2000000, 5 %, 25 ans | 11691.8 | 11691.8 | 0 | concordant |
| 14 L | emprunt 500000, 0 %, 20 ans | 2083.33 | 2083.33 | 0 | concordant |
| 15 L | emprunt 500000, 0.01 %, 20 ans | 2085.43 | 2085.43 | 0 | concordant |
| 16 L | emprunt 500000, 5 %, 0 ans | 502083.33 | 502083.33 | 0 | durée 0 : le site force 1 mois (n=1), mensualité = capital |
| 17 L | emprunt 500000, 5 %, 0.5 ans | 84552.82 | 84552.82 | 0 | concordant |
| 18 L | emprunt 500000, 5 %, 40 ans | 2410.98 | 2410.98 | 0 | concordant |
| 19 L | emprunt 1, 5 %, 1 ans | 0.09 | 0.09 | 0 | concordant |
| 20 L | emprunt 10000000, 12 %, 30 ans | 102861.26 | 102861.26 | 0 | concordant |

## Retraite

Référence : Recalcul manuel (somme des postes x (1+marge) ; pension - budget). Aucun impôt calculé, donc aucune référence officielle applicable

| # | Cas | Résultat site | Référence | Écart | Explication |
|---|---|---|---|---|---|
| 1 | budget 7600 MAD, pension 8000 | -360 | -360 | 0 | concordant |
| 2 | budget 9900 MAD, pension 9000 | -1890 | -1890 | 0 | concordant |
| 3 | budget 6400 MAD, pension 5000 | -2040 | -2040 | 0 | concordant |
| 4 | budget 12700 MAD, pension 12000 | -1970 | -1970 | 0 | concordant |
| 5 | budget 8500 MAD, pension 6000 | -3350 | -3350 | 0 | concordant |
| 6 | budget 14600 MAD, pension 15000 | -1060 | -1060 | 0 | concordant |
| 7 | budget 5100 MAD, pension 4000 | -1610 | -1610 | 0 | concordant |
| 8 | budget 11000 MAD, pension 7000 | -5100 | -5100 | 0 | concordant |
| 9 | EUR | 75 | 75 | 0 | concordant |
| 10 | marge 20 % | 1400 | 1400 | 0 | concordant |
| 11 | virgule décimale | 1349.7 | 1349.7 | 0 | concordant |
| 12 | pension seule 10 000 | 10000 | 10000 | 0 | concordant |
| 13 | postes élevés 20 000 | -7000 | -7000 | 0 | concordant |
| 14 | marge 100 % | 0 | 0 | 0 | concordant |
| 15 | pension vide | -1100 | -1100 | 0 | concordant |
| 16 L | LIMITE tout vide, pension 0 | 0 | 0 | 0 | concordant |
| 17 L | LIMITE marge 0 % | 500 | 500 | 0 | concordant |
| 18 L | LIMITE pension = budget exact | 0 | 0 | 0 | concordant |
| 19 L | LIMITE saisie négative (invalide -> NaN attendu) | NaN | refus | 0 | concordant |
| 20 L | LIMITE annuel (pension 90 000/an) | 2000 | 2000 | 0 | concordant |

## Bugs et points à trancher

**Corrigés le 2026-10-16** : points 1 (droit fixe ANCFCC 100 DH + minimum de perception 500 DH, décret 2.16.375 chap. II A.1, tarif lu sur ancfcc.gov.ma/media/1234/tarifs-fr.pdf) et 3 (douane : `> 10` ans, 10 pile refusé, test ajouté).

1. **Frais d'achat, droit fixe ANCFCC** : `landRegistryFixed: 200` (ancien) dans `src/config/mre.ts` ; le tarif ANCFCC lu indique 100 DH par propriété (minimum de perception 500 DH, non codé). Surestimation de 100 DH.
2. **Frais d'achat, notaire à 1 %** : sous-estime le barème progressif cité en commentaire (projet de décret 2.17.481, non confirmé).
3. **Douane, résidence = 10 ans** : le texte exige « plus de dix » ans ; `checkEligibility90` accepte 10 pile (avertissement seulement) et accorde le 90 %.
4. **[TRANCHÉ 2026-10-21]** Guide ADII 2025 (docs/archives/guide-douane-mre-2025.txt, l. 493-496) : abattement « à hauteur maximale de 300.000 Dhs », la tranche supérieure est soumise au droit commun = lecture du site confirmée, écart de 0,41 du cas 16 = arrondi. Ancien énoncé : valeur > 300 000 DH : le site applique 90 % sur 300 000 et le droit commun sur l'excédent ; la lecture ADII (« dans la limite de ») est à confirmer, une autre lecture est « pas d'abattement du tout ».
5. **Crédit** [CORRIGÉ 2026-10-21 : avertissement affiché si prix <= 0, apport >= prix ou durée hors 1-30] : champ vide, 0 ou négatif traité comme 0 sans message ; durée 0 forcée à 1 mois ; un taux 0 % est indistinguable d'un champ vide.
6. **Plus-value** : concordance attendue (même formule) ; ne prouve pas les coefficients de réévaluation, qui restent une saisie utilisateur.
7. **Retraite** : la saisie négative est refusée (cohérent) ; pas de référence officielle possible.
