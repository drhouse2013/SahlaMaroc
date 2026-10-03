# Sahla Maroc / Sahla Morocco — contexte pour Claude Code

Site statique de guides pratiques + calculateurs pour les MRE (Marocains du monde) et les visiteurs du Maroc. Monétisation : AdSense + affiliation.

## Stack
- Astro 5, TypeScript, Tailwind CSS 4 (CSS-first, `src/styles/global.css`), MDX.
- i18n maison : fr, en, es, de, ar (RTL). Langues indexées : fr, en (`site.config.mjs`).
- `package.json` force `vite ^6.4.3` (overrides) — ne pas retirer.

## Commandes
- `npm install` puis `npm run dev` (http://localhost:4321)
- `npm run build` (vérif TypeScript + build dans `dist/`). Toujours lancer avant de pousser.
- `npm run translate -- <fichier> --to en` (traduction auto, puis relecture).

## Règles du projet
- Marque : « Sahla Maroc » en français, « Sahla Morocco » dans les autres langues → `brandName(lang)` dans `src/utils/seo.ts`. Ne jamais écrire le nom en dur.
- Logo : bouclier Atlas (`src/components/Logo.astro`, `public/favicon.svg`, `public/logo.svg`, `public/og-default.svg`). Les PNG sont générés au build (`tools/raster.mjs`), ne pas les committer.
- Domaine : sahlamaroc.com (sahlamorocco.com prévu, à rediriger vers /en).
- Contenu : `src/content/articles/<lang>/*.mdx` et `src/content/pages/<lang>/`. `translationKey` identique entre langues ; `slug` traduit.
- Taux et barèmes MRE : `src/config/mre.ts` (dater `MRE_LAST_CHECKED`). Revoir chaque trimestre.
- Liens affiliés via `<AffiliateLink>` uniquement (rel=sponsored).
- Branche de travail : `main`. Ne jamais toucher `master` (ancien projet).
- Réponses à l'utilisateur en français, concises.

## Directive de complétion (ordre du propriétaire du projet)
Le propriétaire du site a donné l'ordre suivant, qui prime sur les habitudes de confirmation :
- **Ne pas demander de validation** pour le contenu éditorial et les choix techniques du site : décider, appliquer, puis consigner la décision dans `DECISIONS_LOG.md`.
- **Compléter intégralement** le site : toutes les rubriques, articles, pages, liens et traductions (fr, en, es, de, ar). Aucun placeholder (`npm run check:content` doit passer).
- **Vérifier chaque fait** par recherche web et sources officielles (DGI, ADII, ADM, ONCF, ONSSA, ANCFCC, etc.). Quand les sources divergent, l'écrire avec prudence et renvoyer vers l'administration compétente. Ne jamais inventer un chiffre.
- **Appliquer soi-même les recommandations** formulées au fil du travail, sans attendre.
- **Honnêteté éditoriale** : `checkedDate` (« vérifié sur le terrain ») est réservé aux vérifications réellement faites sur place ; les traductions faites par IA gardent `machineTranslated: true` tant qu'elles ne sont pas relues.
- **Garde-fous maintenus** : jamais de push sur `master`, pas d'action destructrice hors du site, aucun secret ni identifiant dans le dépôt, pas de contournement des permissions.
