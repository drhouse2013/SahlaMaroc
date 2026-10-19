# Kit d'illustrations des guides (style validé : passport-cnie.svg, customs.svg, visa-90-days.svg)

Références à ouvrir : `src/assets/illustrations/guides/passport-cnie.svg`, `customs.svg`, `visa-90-days.svg`.

## Règles
- Un SVG autonome par guide : `src/assets/illustrations/guides/<translationKey>.svg` (la clé = 1re colonne de ta liste, sans guillemets). `viewBox="0 0 1600 1000"`, poids ≤ 30 Ko, aucune image externe, aucune police chargée.
- Style : illustration vectorielle plate « éditoriale », formes arrondies, ombres douces (filtre feDropShadow), 1 scène centrée sur LE sujet exact du guide (objet principal gros et reconnaissable, 2-3 éléments secondaires, 1 détail d'accent), fond dégradé doux.
- Palette : navy #1e2a4a / #2f4577, terracotta #c2562b, or #d4a017, sable #f4ead8 / #e8d9bb / #d9c9a6, vert #006233, rouge #c1272d / #a8222b, bleu clair #7fd7ff (écrans), blanc #fff, gris #9a9aa5 / #3a3a44.
- Aucun texte sauf un chiffre court essentiel (ex. « 90 ») ; pas de drapeau détourné ; personnes = silhouettes simples sans visage ; pas de symbole religieux ; aucun thème juif.
- Chaque scène doit permettre de deviner le guide sans lire le titre. Varie les compositions d'un guide à l'autre (pas de gabarit répété : objets, angles, couleurs dominantes différents).
- Villes/lieux : monument ou skyline reconnaissable de la ville (arches, minaret, médina bleue…), jamais une copie de photo ; transports : le véhicule/gare/port ; argent : billets, carte, guichet ; documents : livret, carte, tampon ; santé : croix, stéthoscope ; etc.

## Éléments réutilisables (copier-coller)
Ombre : `<filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#1e2a4a" flood-opacity=".28"/></filter>`
Avion (translate/scale/rotate) : `<path d="M0 0 L160 0 L200 -24 L226 -24 L200 0 L250 0 L276 -52 L298 -52 L282 0 L330 18 L282 36 L298 88 L276 88 L250 36 L200 36 L226 60 L200 60 L160 36 L0 36 Z"/>`
Badge validé : `<g transform="translate(X Y)"><circle r="64" fill="#006233"/><path d="M-30 4 L-8 26 L32 -20" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></g>`
Pentagramme : `<path d="M0 -112 L66 90 L-107 -35 L107 -35 L-66 90 Z" fill="none" stroke="#006233" stroke-width="12" stroke-linejoin="miter"/>`
Calendrier : voir `visa-90-days.svg` ; valise, tunnel de scanner, passeport, carte, tampon : voir les trois références.

## Branchement (par toi, dans les 5 langues)
Pour chaque guide, dans le frontmatter des 5 fichiers (même translationKey, dossiers fr/en/es/de/ar de `src/content/articles`) : `heroImage: "../../../assets/illustrations/guides/<clé>.svg"` et `heroAlt:` descriptif de la scène, traduit dans la langue du fichier (Edit/replace ciblé ; si `heroImage`/`heroAlt` existent, les remplacer). Ne touche pas aux crédits photos (les anciennes photos restent dans le dépôt, inutilisées).

## Contrôle
Rends chaque SVG en PNG avec sharp (`require('sharp')('x.svg').resize(500,312).png()`), assemble des planches-contact de 6, REGARDE-les et corrige les défauts (éléments coupés, chevauchements, sujet illisible, texte, couleurs ternes). Puis `npm run check:content` (0 erreur). Pas de build. Rapport : 2 lignes.
