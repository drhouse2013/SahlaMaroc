# Références design étudiées (29/10/2026)

Méthode : Playwright, captures pleine page 1440 et 390 px + relevé des styles calculés (h1/h2/corps). Aucune marque, aucun texte ni composition propriétaire repris : seuls des principes.

## 1. Vast Luxury (framer.elliotli.dev/template/vast-luxury)
**Inaccessible** : HTTP 404 (« page not found »), aucune démo trouvée. Non étudiée.

## 2. Far Enough (démo farenough.framer.website)
- Hero typographique : serif léger très grand (≈148 px, interlettrage −3 %), seconde ligne en italique : contraste romain/italique comme signature.
- Photo encadrée sous le titre, légende en petites capitales « lieu — région » aux coins.
- Listes éditoriales numérotées (index discret, titre serif, méta à droite, flèche) au lieu de cartes.
- Cartes « photo + fiche » avec filets fins et paires libellé/valeur (durée, pour qui).
- Rythme lent : grands blancs, bandeau défilant de noms de lieux.
**Pour Sahla** : garder « Le Maroc, *simplement.* » en italique, agrandir le titre (`--step-7`, 80 px max) ; index italiques dans les besoins ; méta en capitales sur les photos (« 01 / 04 »). Pas de bandeau défilant (bruit, a11y).

## 3. Magazin (démo magazin.framer.wiki)
- Titres de rubrique suivis d'un filet pleine largeur : la grille se lit comme une maquette imprimée.
- Grille à 3 colonnes : rubrique en capitales colorées, titre serif, chapeau, date / temps de lecture alignés en pied.
- Une « à la une » dominante + flux régulier ; navigation par rubriques centrée sous le logo.
- Serif condensé unique pour toute la hiérarchie, corps petit.
**Pour Sahla** : filet sous chaque `.section-head` ; la structure « une + liste » existe déjà. Pas de serif unique (lisibilité des guides pratiques).

## 4. Explor (démo explor.framer.website)
- Démo accessible mais rendue par animation au défilement : capture pleine page quasi vide (contenu non stabilisé), seul le hero est lisible : titre serif 72 px sur photo de mer.
- Principe observé : hero photo + titre display superposé.
**Pour Sahla** : rien de neuf (hero photo déjà en place) ; leçon négative : ne pas conditionner l'affichage au JS d'animation.

## 5. TailThemes (tailthemes.com/templates)
- Catalogue sombre, grille 3 colonnes de cartes à vignette, méta en monospace (nombre de composants, pages), prix aligné.
- Fil d'Ariane et en-tête de catalogue compact, chapeau court, CTA unique.
- Fiche démo (« Docket ») : visite des sections et primitives, tokens documentés.
**Pour Sahla** : méta tabulaire (`tabular-nums`) pour index et compteurs ; tokens nommés et documentés (déjà `docs/DESIGN-SYSTEM.md`).

## 6. Westerner (démo westerner.framer.website)
- Affiche : capitales condensées géantes, photo détourée qui chevauche le titre ; carnet de route en sépia.
- Sections séparées par des filets pleine largeur, eyebrows monospace (« issue », « mile »), boutons pilule sombres.
- Galerie en bandes verticales étroites (6 colonnes) avec libellé numéroté dessous ; « cartes postales » inclinées.
- Bloc almanach (chiffres tabulaires + libellés), lettre d'information sur fond sombre, note de l'éditeur signée.
**Pour Sahla** : filets de section, numérotation des destinations, signature de l'éditeur (déjà là), bande sombre des outils (déjà là). Pas de photos détourées ni de sépia (couleurs du Maroc).

## Appliqué à l'accueil (lot A)
`--step-7` (titre hero), filet sous `.section-head`, index italiques tabulaires (besoins), index « 01 / 04 » et titre plus grand sur la mosaïque de destinations, zoom photo 1,03 et flèches qui glissent de 4 px (uniquement `prefers-reduced-motion: no-preference`, sens inversé en RTL).
