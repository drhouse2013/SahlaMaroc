# SahlaMaroc — le Maroc, simple et pratique

Guides clairs et calculateurs gratuits pour les **Marocains du monde (MRE)** et les **visiteurs** :
retour au bled (Marhaba, ferries, voiture), argent et transferts, immobilier (frais, crédit, Daam Sakane),
voyage, et cap sur la Coupe du monde 2030.

Stack : Astro 5 · TypeScript · Tailwind CSS 4 · MDX · i18n (fr, en, es, de, ar + RTL) · 100 % statique.

## Démarrer
```bash
npm install
npm run dev        # http://localhost:4321  (génère aussi og-default.png et logo.png)
npm run build      # vérification TypeScript + build statique dans dist/
```

## Déployer gratuitement (Vercel)
1. vercel.com → *Add New Project* → importer `drhouse2013/SahlaMaroc` → framework **Astro** détecté.
2. Variables d'environnement : copier celles de `.env.example` (IDs AdSense / affiliation quand vous les aurez).
3. *Domains* → ajouter `sahlamaroc.com`, puis suivre les DNS indiqués chez le registrar.
4. Google Search Console → ajouter le domaine → soumettre `https://sahlamaroc.com/sitemap-index.xml`.

## Calculateurs (src/components/calc/)
| Calculateur | Page FR | Paramètres |
|---|---|---|
| Frais d'achat immobilier + Daam Sakane | /fr/calcul-frais-achat-immobilier-maroc | `src/config/mre.ts` |
| Crédit immobilier | /fr/simulateur-credit-immobilier-maroc | saisie utilisateur |
| Coût réel d'un transfert d'argent | /fr/cout-transfert-argent-maroc | `EUR_TO_MAD` dans `src/config/site.ts` |
| Budget été au bled | /fr/budget-ete-maroc-mre | valeurs d'exemple |
| Compteur 180 jours voiture | /fr/compteur-180-jours-voiture-maroc | `src/config/mre.ts` |
| Budget voyage / mensuel (visiteurs) | /fr/calculateur-budget-maroc | `src/config/costs.ts` |

⚠️ Revoir `src/config/mre.ts` et `src/config/costs.ts` chaque trimestre (taux, barèmes, date `MRE_LAST_CHECKED`).

## Écrire un guide
- Fichier `src/content/articles/<lang>/<slug>.mdx` (copier un guide existant).
- Composants utilisables sans import : `<AffiliateLink>`, `<AdSlot>`, `<Callout>`, `<ToolGrid>`, et les calculateurs
  (`<PropertyFees />`, `<MortgageCalc />`, `<TransferCalc />`, `<SummerBudget />`, `<CarDaysCounter />`, `<BudgetCalculator />`).
- Rubriques : `retour`, `immobilier`, `money`, `demarches`, `arrival`, `tours`, `stay`, `living`.
- Traduction : `npm run translate -- src/content/articles/fr/... --to en` (relire puis `machineTranslated: false`).

## Structure
```
site.config.mjs          # domaine + langues indexées (fr, en)
src/config/              # affiliates.ts, mre.ts (taux), costs.ts, site.ts
src/components/calc/     # calculateurs MRE
src/components/home/     # sections de l'accueil
src/content/articles/    # guides (fr, en…)
src/content/pages/       # pages calculateurs, à propos, légal
src/data/                # textes de l'accueil, catalogue des outils
src/i18n/                # langues, rubriques, UI JSON, script de traduction
tools/                   # illustrations.py (scènes SVG), raster.mjs (PNG au build)
docs/PLAN.md             # stratégie et feuille de route
```
