# Plan de refonte « premium éditoriale » (29/10/2026)

Aucun fichier hors docs/ modifié. Base : main @ 37e1dc0 (PR #6 incluse).

## 1. Audit
**Stack** : Astro ~7.4 (CLAUDE.md dit 5 : à corriger), Tailwind 4 CSS-first (`src/styles/global.css`, 1047 l.), MDX, `@tailwindcss/typography`, sharp, Playwright (`tests-e2e/` : guides-hub, lieux, nouveautes, parcours). Polices : Readex Pro Variable (latin + arabe) + Marhey (logotype), préchargées dans `BaseLayout`. Build = 927 pages, 5 langues, ar RTL.

**Ce que les 39 derniers commits ont changé (design)** : (1) thème « ivoire/forêt/terracotta » puis « blanc éditorial » (`body bg-white`) avec 3 modes Système/Clair/Sombre (`ThemeToggle`, `tools/test-theme.mjs`) ; (2) accueil recomposé : `home/{Hero,Journeys,CityGrid,FactsBand,EditorNote}` + hero « new-home-hero » (3 photos de villes + recherche) ; (3) PR #6 : zellige photo (`public/images/moroccan-zellige.webp`), `GuideVisual` + `utils/guidePhotos.ts|guideVisual.ts` (8 photos WebP Unsplash/Commons dans `assets/photos/guides/`), `ArticleCard` basé sur `GuideVisual`, `GuidesHub` refait, `ContentLink`, `Newsletter`, nouveau `docs/GUIDE_PHOTOS.md`. Avant : vagues « immersives » (stagger-reveal, hero-aura, shimmer, GSAP) dont les restes encombrent global.css.

**Routes** : `/[lang]/` (accueil), `[section]/[item]` (hubs guides/villes/régions/outils/mre/visit/nouveautés/glossaire/calendrier/checklists/recherche, villes `CityPage`, régions `RegionPage`), `[slug]` (guides MDX via `ArticleLayout`, pages `PageLayout`), 404, rss, search-index.

**Tokens actuels** : couleurs sand-50 #faf7f0 / 100 #f1eadb, ink #1b1a1f, « navy » en réalité vert #214e40 (noms trompeurs), gold #b98946, terracotta 600 #a8432f, majorelle (vert) #2c7459, emerald, night-900/800 (sombre). Rôles : `--surface/-2/-3 --text --muted --line --accent --brand --link --shadow-sm/md/lg --glass`. Rayons 0.75/1/1.5 rem, `.btn` pilule, `.card` 1.5rem, ombres teintées vert. Polices : une seule famille (Readex, titres 650).

**Problèmes / risques** : (a) global.css cumule 3 générations (commentaire d'en-tête obsolète « bleu nuit »), doublons (`.btn-primary:hover` x2, `[hidden]` x2, `.section-title` x2), caractères corrompus dans les bandeaux `═══`, `hero-photo::after` en bleu #0b1f36 hors palette ; (b) fond `bg-white` codé en dur dans BaseLayout alors que `--surface-2` existe ; (c) couleurs en dur (`text-navy-700`, `dark:`) dispersées : tout changement de palette doit passer par les noms de classes existants (garder les alias navy/terracotta/sand pointant vers les nouvelles valeurs) ; (d) texte du hero en dur dans `Hero.astro` (5 langues inline), idem hubs : ne pas toucher les chaînes ; (e) bandeau crédit sur chaque photo (`CityImage`) : à conserver (obligation de licence) ; (f) tests e2e dépendent de `data-*` (`data-guides-hub`, `data-search-form`, `data-news-filters`, `data-faq`, `data-brief`) : ne pas renommer ; (g) impression (`@media print`) et `prefers-reduced-motion` globaux à garder ; (h) guides pratiques : PR #6 affiche des photos « d'illustration » (Unsplash : clés, calculatrice) via `GuideVisual`, alors que les illustrations dessinées sont validées par le propriétaire : vérifier avant tout lot B laquelle prime (`utils/illustrations`) ; (i) 927 pages : chaque ajout de police augmente le préchargement, limiter à 2 variables latin + 1 arabe.

## 2. Direction artistique
**Principe** : magazine de voyage (grandes photos, serif, blancs généreux) + portail pratique (cartes nettes, tableaux lisibles). L'identité existante (vert forêt + terracotta + or) est déjà proche de la demande : on la **resserre** au lieu de la remplacer.

| Rôle | Valeur | Contraste (calculé) |
|---|---|---|
| Fond | ivoire sable #F4EFE6 | — |
| Surface | blanc #FFFFFF | — |
| Texte | #1B1A17 | 15,2:1 sur ivoire |
| Vert profond (marque, boutons, liens) | #173F38 | 10,2:1 sur ivoire ; blanc dessus 11,6:1 |
| Terre cuite décorative | #B96F47 | 3,4:1 ivoire : **interdit pour texte < 24 px** |
| Terre cuite texte/CTA | #9A5632 (assombrie) | 4,9:1 ivoire ; blanc dessus 5,6:1 : AA |
| Texte secondaire | #5A554B | 6,5:1 ivoire |
| Sombre | fond #0F2A26, texte #F4EFE6 | 13,3:1 ; terracotta clair #E9B58F sur #173F38 6,4:1 |
Or #b98946 réduit à filets/ornements. Les 3 modes restent (les rôles `--surface*` basculent).

**Typographie** : titres Fraunces Variable (`@fontsource-variable/fraunces`, axes opsz/wght, latin seulement), texte Manrope Variable (`@fontsource-variable/manrope`) ; non installés aujourd'hui (npm i requis, lot A). Arabe : garder Readex Pro arabe pour titres et texte (déjà préchargé) ou Noto Naskh Arabic pour le corps long, test visuel imposé. `--font-display` n'est appliqué qu'à `:lang(fr|en|es|de)`. Échelle (ratio 1,25, fluide clamp) : 14 / 16 / 18 (corps article 1,125rem, 1,7) / 22 / 28 / 36 / 48 / 64. Titres 500-600, interlettrage -0,02em, `text-wrap: balance` ; eyebrows en capitales 12 px espacées (non arabe).

**Grille / espacements** : conteneur 72 rem (inchangé), colonne article 68ch, gouttières 16/24/32, rythme de sections 64 px mobile / 112 px desktop sur échelle 4-8-12-16-24-32-48-64-96. **Rayons** : 8 px (champs), 12 (cartes), 20 (images hero), pilule seulement pour boutons/puces. **Ombres** : 2 niveaux (repos très léger, survol), teinte #173F38 à 8-14 % ; bordures 1 px `--line` privilégiées. **Boutons** : primaire = vert profond plein (une par section), secondaire = contour, CTA chaud = terre cuite #9A5632 réservé à l'action conversion ; hauteur ≥ 44 px, focus 2 px visible. **Cartes** : photo 4:3 ou 3:2 pleine largeur, eyebrow catégorie, titre serif 20-22 px, 2 lignes de chapeau, pas de dégradé ni shimmer. **Navigation** : en-tête ivoire translucide, liens 14-15 px, menu Guides conservé ; barre mobile basse existante (`pb-[3.5rem]` du body) conservée. **Photo** : ratio fixe, `object-cover`, léger voile bas uniquement pour légende, crédit discret conservé, cadrage haut pour les minarets ; zellige en filet/bande de 8 px (pas en fond plein). **Animations** : 150-250 ms, fondu + translateY 8 px à l'apparition, survol image scale 1,02 ; suppression shimmer, hero-aura, étoiles ; tout dans `prefers-reduced-motion: no-preference`.

## 3. Inventaire photo
- **Hero accueil** : `Hero.astro` affiche 3 photos de villes (marrakech, chefchaouen, essaouira) via `CityImage` ; `home-hero.jpg` (cavalier-chameau dans une dune, Commons, Merzougaloisirs CC BY-SA 4.0) existe mais n'est pas dans le hero actuel. Correspondance : les 3 photos concordent avec leur ville d'après les noms Commons (Koutoubia, Chefchaouen au coucher du soleil, remparts d'Essaouira). Proposition : photo principale pleine largeur (Koutoubia ou dunes) + 2 secondaires.
- **Villes** : 31 villes (`cities.ts`), 22 entrées dans `cities/manifest.json` (+ `home-hero`), toutes avec auteur + licence CC dans CREDITS.md et manifest. Concordance nom de fichier/ville OK sur les 21 : à noter nador = Lagune de Marchica (lagune de Nador : correct, mais pas « la ville »), merzouga/tafraout/dakhla (kitesurf)/laayoune (aérien) cohérents. **Manquent (10)** : guelmim, tiznit, sidi-ifni, taroudant, zagora, errachidia, ifrane, asilah, larache, kenitra (repli sur illustration SVG). Kenitra a pourtant 5 photos de lieux (kasbah Mahdiyya, Mehdia, Merja Zerga, Sidi Boughaba, Thamusida) : une peut servir de photo de ville.
- **Lieux à visiter** : 148 entrées dans `spots/manifest.json`, toutes avec crédit ; CREDITS.md couvre les groupes 1 à 3 (≈ 60 lignes) mais pas tous les 148 fichiers (agadir-bert-flint, kenitra-*, rabat-*, marrakech-* hors groupe 1, etc.) : à reconsolider depuis le manifeste. Villes sans aucun lieu photographié : les 10 ci-dessus sauf kenitra.
- **Régions** : 12 régions (`regions.ts`), aucune photo ni champ image : à dériver d'une ville phare (ex. Souss-Massa ← agadir) sans nouveau fichier.
- **Guides « où loger » / ville** : pas de photo dédiée ; ils héritent de la ville (`CityPage`) ; à confirmer dans le lot C.
- **Guides pratiques** : 8 WebP génériques + `editorial-photos.json` (37 entrées, toutes avec licence : Unsplash x7, Commons) et ~100 JPG sujets dans `assets/photos/` (crédits dans CREDITS.md ~23 lignes seulement : les autres JPG sujets, ex. banque-*, gare-*, immo-*, dépendent de `editorial-photos.json`). Ne pas remplacer les illustrations dessinées validées.
- **Manques** : licence Unsplash non Commons (acceptable, lien `unsplash.com/license`) ; 10 villes sans photo ; 12 régions sans visuel ; IMAGE_CREDITS.md absent (3 sources : CREDITS.md, manifests, editorial-photos.json) ; vérification licence/géographie des ~100 JPG sujets non refaite ici (échantillon seulement par nom).

## 4. Plan en 3 lots (fichiers disjoints)
**Lot A : système + chrome + accueil**
- Fichiers : `package.json` (+ fraunces, manrope), `src/styles/global.css`, `src/layouts/BaseLayout.astro` (polices, `bg-[var(--surface-2)]`, preload), `Header.astro`, `Footer.astro`, `MobileNav.astro`, `Logo.astro` (inchangé sauf teinte), `ThemeToggle.astro`, `src/components/home/*`, `src/data/home.ts` (visuels seulement), `src/pages/[lang]/index.astro`.
- Change : tokens (alias `navy-*`, `terracotta-*`, `sand-*` repointés vers la nouvelle palette), polices, boutons/cartes/champs/encadrés, nettoyage des 3 générations CSS, accueil magazine (hero plein cadre, rubriques, bande de faits), navigation.
- Reste identique : routes, `data-*`, clés i18n, textes inline 5 langues, RTL (`inset-inline`, `rtl:-scale-x-100`), 3 thèmes, print, reduced-motion, skip link, JSON-LD.

**Lot B : hubs + cartes + page guide** (après A)
- Fichiers : `ArticleCard.astro`, `GuideVisual.astro`, `ContentLink.astro`, `Newsletter.astro`, `PageHero.astro`, `Breadcrumbs.astro`, `Callout.astro`, `Checklist.astro`, `Roadmap*.astro`, `ToolGrid.astro`, `hubs/{GuidesHub,PillarPage,AudienceHub,NewsHub,GlossaryHub,CalendarHub,ChecklistsHub,SearchPage}.astro`, `layouts/ArticleLayout.astro`, `PageLayout.astro`, bloc `.prose` de global.css (en fin de fichier, section réservée à B).
- Change : colonne 68ch, corps 18 px, intertitres serif, tableaux (en-tête sticky, lignes alternées, défilement horizontal), encadrés (info/alerte/astuce), sommaire latéral, cartes photo 3:2, filtres.
- Identique : slugs, filtres/recherche JS, FAQ/brief/sources, avertissements « non relu », `proReviewedDate`, bandeau machineTranslated, liens affiliés (`<AffiliateLink>`), illustrations dessinées des guides pratiques.

**Lot C : villes / régions / lieux / photos**
- Fichiers : `hubs/{CitiesHub,CitiesMap,CityPage,RegionsHub,RegionPage}.astro`, `home/CityGrid.astro` (si non repris en A, à convenir), `CityImage.astro`, `SpotsGallery.astro`, `utils/photos.ts`, `assets/photos/cities/manifest.json`, `spots/manifest.json`, nouvelles photos Commons des 10 villes (licence vérifiée via API, entrée manifeste + crédit), `IMAGE_CREDITS.md` consolidé (racine, généré par script à partir de CREDITS.md + 2 manifestes + editorial-photos.json), `docs/GUIDE_PHOTOS.md`.
- Change : fiche ville éditoriale (grande photo, fiche pratique, lieux en grille), régions avec visuel dérivé, photos manquantes, crédits.
- Identique : slugs villes, données `cities.ts`/`spots.ts`/`regions.ts` (textes, coordonnées), repli sur illustration SVG, bandeau de crédit, `tests-e2e/lieux.spec.mjs`.

**Validation de chaque lot** : `npm run build`, `check:content`, `check:dist`, `test:unit`, e2e ; vérifier ar (RTL) et sombre ; DECISIONS_LOG.md.
