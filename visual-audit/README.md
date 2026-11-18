# Audit visuel — accueil Sahla Maroc

Comparaison automatique de l'accueil `/fr` avec la maquette de référence (`reference.png`,
`capture-originale.png` du ZIP), viewport **1448 × 1024**, animations neutralisées,
polices chargées avant capture.

| Fichier | Contenu |
|---|---|
| `reference.png` | maquette de référence (source de vérité graphique) |
| `current.jpg` | rendu du site après intégration |
| `diff.jpg` | différence pixel à pixel (seuil 24 par canal, amplifiée) |
| `report.json` | métriques et boîtes des éléments mesurés (Playwright) |

## Reproduire

```bash
npm run build
npx astro preview --port 4331          # se lie à [::1] sur cette machine
node tools/visual-audit.mjs            # capture + diff + rapport
```

Outils associés : `tools/measure.mjs` (gouttières et colonnes), `tools/scan.mjs` (transitions
verticales d'une colonne), `tools/grid.mjs` (grille de mesure), `tools/extract-reference.mjs`
(tuiles 1:1 des cartes).

## Résultat mesuré

| Mesure | Avant l'intégration | 1re intégration | Après passe « pixel perfect » |
|---|---|---|---|
| Écart moyen par canal | 50,04 | 44,10 | **27,5** |
| Pixels modifiés (> 24) | 65,6 % | 60,7 % | **42,3 %** |

Positions mesurées identiques à la maquette (y) : bandeaux parcours **314** (h 158),
cartes outils **537** (h 55), cartes guides **621** (h 141), cartes destination **854** (h 125),
bandeau checklists **1002** (h 80), héros **51–388**, en-tête **0–51**.

## Écarts restants (documentés)

1. **Texte et contenu** : les libellés du site sont les vrais contenus éditoriaux
   (« Convertir euro-dirham » au lieu de « Calculateur de change », titres de guides réels),
   donc les blocs de texte occupent des largeurs différentes de la maquette.
2. **Rendu typographique** : le rendu des polices Playfair Display / Inter par Chromium
   (graisse, crénage, antialiasing) ne produit pas des pixels identiques à la capture de référence.
3. **Images rééchantillonnées** : les tuiles « exactes » sont posées à des positions
   fractionnaires (largeur de carte 245,6 px), ce qui provoque un rééchantillonnage
   bilinéaire visible sur les photos détaillées (villa, médina).
4. **Éléments propres au site** : bouton flottant « Mon carnet », placeholders AdSense et
   sections ajoutées (note de l'éditeur, newsletter, pied de page) n'existent pas dans la maquette.
5. **Images du ZIP inutilisables telles quelles** : les crops `exact/*.png` du ZIP contiennent
   des fragments des cartes voisines et du titre de section ; les tuiles ont donc été
   réextraites de la référence à l'échelle 1:1 (`tools/extract-reference.mjs`).

## Corrections apportées depuis la première mesure

- En-tête : bloc de marque 384 px, logo 49 px de haut, navigation en `flex-start` avec 34 px
  d'écart (« Accueil » à 496 px contre 494 px sur la maquette, « Visiter le Maroc » 844–936
  contre 868–974 — l'écart restant vient de la largeur du texte rendu par Inter).
- Tuiles exactes dessinées à leur taille native (425 × 158, 246 × 125, 1312 × 80) : plus de
  mise à l'échelle, donc plus de rééchantillonnage ; le débordement fractionnaire est rogné
  par le `overflow: hidden` des cartes.
- Icônes d'outils alignées sur la maquette (pièces, voiture, maison, portefeuille, liste) et
  étiquettes de guides raccourcies (MRE, Immobilier, Voyage).

## Contrôle du 18 novembre 2026

Capture Edge du build actuel à 1448 × 1086 : arche continue jusqu’en haut, titre du passeport HD désormais visible. Build : 936 pages ; check:dist : zéro erreur, dont 155 pages ville. Les photographies et la typographie des cartes parcours restent différentes de la référence ; la signature visuelle n’est pas déclarée terminée.

Le calcul des bandes utilisait une indexation de colonne au lieu des lignes ; il est corrigé, ainsi que le seuil moyen de 24 par canal et la dernière bande partielle. Le rapport est désormais écrit avec sa date et son URL. Les anciens pourcentages ne sont donc pas directement comparables. Mesure actuelle : écart moyen 36,60 ; 39,03 % des pixels dépassent le seuil moyen. Ces métriques ne prouvent pas seules la qualité du design.
