# Système de design Sahla Maroc (lot A, 29/10/2026)

Direction : magazine de voyage haut de gamme (grandes photos, serif, blancs généreux) + portail pratique (listes nettes). Ni verre, ni dégradé décoratif, ni 3D, ni grille de petites cartes identiques. Source : `src/styles/global.css` (sections 1 à 8).

## Couleurs (rôles `--*`, alias Tailwind conservés)
| Rôle | Clair | Sombre | Note |
|---|---|---|---|
| `--surface-2` fond | #F4EFE6 ivoire | #0F2A26 | `body` |
| `--surface` | #FFFFFF | #15332E | cartes, champs |
| `--text` | #1B1A17 (15,2:1) | #F4EFE6 (13,3:1) | |
| `--muted` | #5A554B (6,5:1) | #C9C1B1 | |
| `--brand` / `--link` | #173F38 (10,2:1) | #F4EFE6 / #E9B58F | boutons, liens |
| `--accent` | #9A5632 (4,9:1, AA) | #E9B58F | texte/CTA chaud |
| `--accent-deco` | #B96F47 | — | décor seulement, jamais texte < 24 px |
Or #B98946 : filets uniquement. Alias `navy-*` = vert profond, `terracotta-*`, `sand-*`, `majorelle-*`, `night-*` repointés vers ces valeurs.

## Typographie
Titres latins : Fraunces Variable (500-560, -0,02em, `text-wrap: balance`) ; texte : Manrope Variable ; arabe : Readex Pro (titres et texte, `:lang(ar)`) ; logotype : Marhey. Préchargement : Manrope latin ou Readex arabe selon la langue. Échelle `--step--1` à `--step-6` (14 → 64 px, ratio 1,25, fluide). Eyebrows : capitales 12 px espacées (pas en arabe).

## Grille, espacements, formes
Conteneur 72 rem, gouttières 16/24/32 px ; rythme `--section-gap` 64 px mobile / 112 px desktop. Rayons : 8 px champs, 12 px cartes et photos, pilule pour boutons/puces. Ombres : `--shadow-sm` (repos) et `--shadow-md` (survol), teinte vert 8-14 % ; bordure 1 px `--line` privilégiée.

## Composants
`.btn-primary` (vert plein, une par section), `.btn-secondary`/`.btn-ghost` (contour), `.btn-warm` (terre cuite, conversion), `.btn-tertiary`, `.text-link` ; hauteur ≥ 44 px ; focus 2 px `--focus`. `.card` (12 px, 1 px), `.chip`, `.badge-*`, `.alert-*`, `.input`. Filet zellige `.zellige-band` (8 px, photo réelle). En-tête ivoire opaque ; pied de page vert profond structuré (rôles redéfinis localement dans `.site-footer`).

## Accueil
Premier écran : titre « Le Maroc, *simplement.* », chapô court, trois parcours en cartes photo + fiche (accent par parcours : terre cuite, or, vert ; voir src/data/paths.ts), recherche ; une + liste de guides ; mosaïque asymétrique de 4 vraies photos de villes ; bande vert profond des calculateurs en liste ; checklists, note de l'éditeur, lettre.

## Mouvement et impression
150-250 ms, fondu + 8 px, survol photo scale 1,02, uniquement sous `prefers-reduced-motion: no-preference`. Impression : chrome masqué, fond blanc.
