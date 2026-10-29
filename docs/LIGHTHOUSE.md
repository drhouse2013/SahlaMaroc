# Lighthouse - mesures reelles

Date : 2026-10-29. Lighthouse 12 (npx), Chrome headless, throttling simule (defaut), `astro preview` local (localhost:4495) sur le dist existant. Scores locaux : indicatifs, pas des donnees terrain.

## Scores mesures (re-mesure a dist stable, apres build)
| Page | Mode | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| /fr/guides | mobile | 96 | 100 | 100 | 100 | 1.8 s | 0.000 | 33 ms |
| /fr/retour-maroc-enfants-ecole-equivalence-cnss (guide long) | mobile | 98 | 100 | 100 | 100 | 1.4 s | 0.000 | 51 ms |
| /fr | desktop | 100 | 100 | 100 | 100 | 0.6 s | 0.001 | 57 ms |
| /fr/villes | desktop | 100 | 100 | 100 | 100 | 0.4 s | 0.000 | 2 ms |
| /fr/villes/marrakech | mobile | 93 | 100 | 100 | 100 | 2.8 s | 0.017 | 178 ms |

Mesures precedentes non refaites (inchangees, voir historique git) : /fr mobile 96, /fr/villes mobile 92, calculateur 98 mobile / 100 desktop, guides et guide long desktop 100.

## Conclusions
- CLS 0,149 de /fr/guides et TBT 392 ms du guide long : NON reproduits a dist stable (CLS 0,000 ; TBT 51 ms, 3 mesures). Les valeurs initiales venaient du dist reconstruit pendant la mesure. Aucune correction CLS/TBT necessaire.
- Les 3 runs rates (/fr desktop, /fr/villes desktop, /fr/villes/marrakech mobile) sont refaits ci-dessus et exploitables.
- Seule correction : `aria-label` sur la barre de progression de `Checklist.astro` (A11y du guide long 97 -> 100).
- Restent : render-blocking CSS, images responsives, LCP /fr/villes/marrakech 2,8 s (hero photo).
