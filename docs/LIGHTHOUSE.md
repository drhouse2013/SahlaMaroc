# Lighthouse - mesures reelles

Date : 2026-10-29. Lighthouse 12 (npx), Chrome headless, throttling simule (defaut), `astro preview` local (127.0.0.1:4490) sur le dist existant. Scores locaux : indicatifs, pas des donnees terrain.

## Scores mesures
| Page | Mode | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| /fr | mobile | 96 | 100 | 100 | 100 | 2.4 s | 0.000 | 0 ms |
| /fr | desktop | 100 | 100 | 0 | 100 | 0.6 s | 0.001 | 0 ms |
| /fr/guides | mobile | 91 | 100 | 100 | 100 | 2.2 s | 0.149 | 0 ms |
| /fr/guides | desktop | 100 | 100 | 100 | 100 | 0.5 s | 0.001 | 0 ms |
| /fr/retour-maroc-enfants-ecole-equivalence-cnss (guide long) | mobile | 88 | 97 | 100 | 100 | 2.3 s | 0.027 | 392 ms |
| /fr/retour-maroc-enfants-ecole-equivalence-cnss (guide long) | desktop | 100 | 97 | 100 | 100 | 0.6 s | 0.030 | 0 ms |
| /fr/villes | mobile | 92 | 100 | 100 | 100 | 3.0 s | 0.000 | 0 ms |
| /fr/villes | desktop | NaN | 0 | 0 | 0 | NaN s | NaN | NaN ms |
| /fr/villes/marrakech | mobile | NaN | 0 | 0 | 0 | NaN s | NaN | NaN ms |
| /fr/villes/marrakech | desktop | 100 | 100 | 96 | 100 | 0.7 s | 0.000 | 0 ms |
| /fr/calcul-vignette-tsav-maroc (calculateur) | mobile | 98 | 100 | 100 | 100 | 2.1 s | 0.000 | 0 ms |
| /fr/calcul-vignette-tsav-maroc (calculateur) | desktop | 100 | 100 | 100 | 100 | 0.5 s | 0.001 | 0 ms |


## Mesures non exploitables (non inventees)
- `/fr` desktop : Bonnes pratiques = 0 ; `/fr/villes` desktop et `/fr/villes/marrakech` mobile : run en erreur (NaN / 0 partout). Cause probable : dist reconstruit par un autre agent pendant la mesure. A relancer a dist stable.

## Causes principales relevees (audits < 0,9 en mobile)
- CLS 0,149 sur `/fr/guides` mobile (audits layout-shifts / cls-culprits) : reserver les dimensions des elements qui se decalent (images/cartes).
- Guide long : TBT 392 ms, dom-size, offscreen-images (images hors ecran non lazy), aria-progressbar-name (barre de progression sans nom accessible, A11y 97).
- Toutes pages : render-blocking-resources (CSS), uses-responsive-images / image-delivery-insight, label-content-name-mismatch.
- LCP : `/fr` = image hero (webp avec srcset ; verifier fetchpriority=high) ; autres pages = texte (h1/p), donc polices/CSS bloquant ; `/fr/villes` LCP 3,0 s.
- Aucune correction appliquee dans ce passage (budget ; accueil et global.css hors perimetre).
