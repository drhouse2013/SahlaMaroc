# Système de design Sahla Maroc (maquette du 15/11/2026)

Direction : magazine de voyage haut de gamme (grande photo panoramique, serif, ivoire chaud) + portail pratique (listes nettes, cartes claires, motifs zellige discrets). Source : `src/styles/global.css` (jetons et composants historiques), `src/styles/template.css` (couche de la maquette : accueil, en-tête, pied de page), `src/styles/interior.css` (pages intérieures).

## Couleurs (rôles `--*`, alias Tailwind conservés)
| Rôle | Clair | Sombre | Note |
|---|---|---|---|
| `--surface-2` fond | #FCF6EE ivoire | #0A2520 | `body` |
| `--surface` | #FFFDF9 | #12332B | cartes, champs |
| `--text` | #11171C | #F6EFE3 | |
| `--muted` | #52615A | #C2CBBD | |
| `--brand` / `--link` | #0B3D2E vert forêt | #F6EFE3 / #E7A784 | boutons, liens, titres |
| `--accent` | #B53A1A terre cuite | #E7A784 | texte/CTA chaud |
| `--accent-deco` | #C25230 | #E7A784 | décor seulement |
Or `#D9A441` : filets, écussons, points de carte. Alias `navy-*` = vert forêt, `majorelle-*`, `terracotta-*`, `gold-*`, `sand-*` repointés vers ces valeurs.

## Typographie
Titres latins : **Playfair Display Variable** (700-800, -0,03 em) ; texte : **Inter Variable** ; arabe : Readex Pro (`:lang(ar)`) ; logotype : Marhey (hérité, non utilisé dans l'en-tête qui affiche le logo de la maquette). Polices auto-hébergées (`@fontsource-variable/*`) et préchargées : Inter + Playfair en latin, Readex en arabe. Échelle `--step--1` à `--step-6` conservée pour les pages intérieures.

## En-tête
51 px (60 px sur mobile), ivoire presque opaque, filet bas, motif zellige terre cuite en dégradé à gauche. Logo horizontal 46 px (SVG clair / sombre), séparateur vertical, navigation 12,6 px semi-gras avec sous-menus `<details>`, recherche, langue, bouton thème compact (système → clair → sombre) et bouton « Mon espace » (vert forêt dégradé) qui ouvre le carnet de voyage.

## Accueil
1. **Héros** 337 px (395 px mobile) : panorama de Tanger, titre Playfair 53 px « Le Maroc, *simplement.* » avec soulignement doré, chapô, barre de recherche pill et quatre bénéfices séparés par des filets.
2. **Trois bandeaux parcours** (rentrer / investir / visiter) qui chevauchent le héros de 75 px : photo, voile vert ou terre cuite, icône, titre serif, texte, flèche ronde. Bandeaux reconstruits en HTML (les images du ZIP contiennent le texte incrusté).
3. **Outils pratiques** : cinq raccourcis cliquables (58 px minimum) vers les calculateurs réels.
4. **Guides essentiels** : colonne d'introduction (275 px) + trois cartes photo (image 79 px, pastille de thème, titre, trois repères, flèche ronde).
5. **Découvrir le Maroc** : cinq cartes destination (125 px) avec dégradé bas, épingle dorée et flèche.
6. **Bandeau checklists** : panneau vert forêt, photo littorale masquée à gauche, motif doré, icône et lien vers le hub.
7. Note de l'éditeur, lettre d'information, emplacement publicitaire.

## Grille, espacements, formes
Accueil : conteneur 1292 px pour les parcours, 1279 px pour les sections, gouttière latérale `calc(100% - 172px)`. Pages intérieures : 1180 px (`1180 - padding 30`), listes en 3 colonnes de cartes 15 px. Rayons : 17 px parcours, 15 px cartes, 12 px guides, 10 px destinations, 999 px boutons. Ombres chaudes (teinte brun `#3D261B`), bordure 1 px `#E7DACC` privilégiée.

## Composants
`.tpl-*` (en-tête, héros, bandeaux, outils, guides, destinations, checklists, pied de page) ; classes intérieures de la maquette disponibles : `.interior-main`, `.breadcrumb`, `.interior-intro`, `.listing-grid`, `.listing-card`, `.article-hero`, `.reading-layout`, `.article-sidebar`, `.calculator-panel`, `.calculator-result`, `.checklist-workspace`, `.interior-search`, `.search-results`, `.empty-state`. Les classes historiques (`.card`, `.btn-*`, `.chip`, `.badge-*`, `.alert-*`, `.input`, `.section-title`, `.article-title`, `.toc-sidebar`, `.calc`, `.checklist`) sont restylées dans `interior.css` pour que les hubs, articles, calculateurs et checklists suivent la maquette.

## Mouvement et impression
150-250 ms, fondu + 8 px, translation de 2 à 3 px au survol des cartes, uniquement sous `prefers-reduced-motion: no-preference`. Impression : chrome masqué, fond blanc, carnet et checklists imprimables.
