# Références design étudiées (29/10/2026)

Méthode : Playwright, captures pleine page 1440 et 390 px + relevé des styles calculés (h1/h2/corps). Aucune marque, aucun texte ni composition propriétaire repris : seuls des principes.

## 1. Vast Luxury (framer.elliotli.dev/template/vast-luxury)
**Inaccessible, re-testé le 29/10/2026** : HTTP 404 en fetch live (maxAge 0) ; le site propose seulement « able-luxury » (autre gabarit) et une recherche web de la démo n'a renvoyé que la page auteur (elliotli.dev) et des listes, aucune démo de Vast Luxury. Non étudiée, rien d'inventé.

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
- Re-testé en défilant pas à pas (molette 450 px, 30 pas, 1440 px) : page d'un seul écran (hauteur 940 px, un seul titre) ; hero plein cadre en vidéo de cascade, titre Melodrama (serif display fin) 72 px blanc aligné à gauche, boutons verre dépoli (logo, menu, heure), carte flottante « destination » en bas à droite avec vignette et flèche, bouton son discret.
- Principe observé : hero média + titre display superposé + une seule carte d'action.
**Pour Sahla** : rien de neuf (hero photo déjà en place) ; leçon : un hero à une seule carte d'action reste lisible ; ne pas conditionner l'affichage au JS d'animation.

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
