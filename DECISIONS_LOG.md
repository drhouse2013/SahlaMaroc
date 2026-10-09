# Journal des décisions autonomes

Décisions prises sans demande de validation, conformément à la directive de complétion de `CLAUDE.md`. Les plus récentes en bas.

## 2026-10-02
- **Fuseau horaire** : le Maroc est à GMT toute l'année depuis le 20 septembre 2026 (décret n° 2.26.530, BO n° 7521). Guides corrigés, chiffre clé de l'accueil mis à jour dans les 5 langues, guide dédié ajouté.
- **Mention « vérifié sur le terrain »** : retirée de tous les articles rédigés par l'assistant (vérification web uniquement). Remplacée par `updatedDate` quand des faits ont été corrigés.
- **Traductions es/de/ar** : écrites par l'assistant, donc `machineTranslated: true` (noindex) jusqu'à relecture humaine ; ces langues restent hors de `INDEXABLE_LOCALES`.
- **Sources officielles inaccessibles** (tax.gov.ma, douane.gov.ma, adm.co.ma… bloqués depuis l'environnement d'exécution) : vérification par recherche web uniquement. Chaque guide sensible renvoie vers l'administration compétente et signale quand les sources divergent.
- **Chiffres du brief écartés ou corrigés** : plafond « 15 000 DH » de cadeaux (non retrouvé ; ~25 000 DH/an pour les MRE actifs à l'étranger d'après les circulaires relayées), péage Tanger Est – Kénitra Nord (78 DH et non 76), plafond du retour définitif (40 000 DH en 2026), hôtels cités (non vérifiés, non repris).
- **Salles de prière sur les aires ADM** : formulation « dans la plupart des cas » (aucune source ne garantit « toutes »).
- **Calculateur de plus-value (TPI)** non créé : les coefficients de réévaluation officiels sont inaccessibles ; pas de chiffres inventés.
- **Fusion de la PR #1 dans `main`** : non effectuée par l'assistant (publication en production laissée au propriétaire).
- **Configuration de permissions / lancement en arrière-plan** (`.claude/settings*.json`, `ORDRE_STRICT.sh`) : non créés ; ce sont des réglages de la machine du propriétaire.
- **Prix SIM et forfaits** : repris des relevés fournis par le propriétaire (Wise, Saily, inwi), présentés comme indicatifs.
- **Guides Immobilier** : 5 guides FR/EN (impôts, construction, location courte durée, succession, procuration) rédigés avec formulations prudentes (durée d'occupation de la résidence principale 5-6 ans selon la version de la loi, forme de la procuration à valider par le notaire).

## 2026-10-02 — Traductions, pages et honnêteté éditoriale
- **Traductions complètes** : les 68 articles existent en fr, en, es, de, ar (es/de/ar : `machineTranslated: true`, donc noindex, tant qu'ils ne sont pas relus). Liens internes réécrits par `tools/relink-translations.mjs`.
- **Calculateurs localisés** (5 langues) et mise en page des articles (`essentials`) traduite.
- **Page « À propos » corrigée (fr/en)** : l'ancienne promesse « vérifié sur le terrain / en personne » n'était pas démontrable pour l'ensemble du contenu. Remplacée par « Sourcé et daté » ; le badge « Vérifié sur le terrain » reste réservé aux vérifications réellement faites sur place.
- **Page confidentialité (en)** : commentaire de développement (« À faire relire ») supprimé.
- **Guides Immobilier** : liens croisés ajoutés entre achat, crédit, impôts, procuration, succession, construction et location courte durée.

## 2026-10-03 — Chiffres 2026
- **Marhaba** : 2025 « 4 M+ » → **2026 : 4 137 594 MRE accueillis** (saison 2026, +1,8 % vs 2025). Source : Fondation Mohammed V pour la Solidarité, relayée par Le Matin (17/09/2026). Accueil + guide Marhaba (5 langues).
- **Transferts MRE** : 122 Mds DH (année 2025) conservé comme dernier chiffre annuel complet ; ajout de **89,2 Mds DH à fin août 2026 (+9 %)**, Office des changes via Hespress (02/10/2026). Accueil + guide « Envoyer de l'argent » (5 langues). Le total 2026 ne sera connu qu'en février 2027.
- **Guide fiscal MRE** : lien 2025 → édition 2026 (mre.gov.ma, juillet 2026).
- **CAN 2025** : formulée au passé (Maroc, déc. 2025 – janv. 2026) dans les guides location courte durée.
- Mentions datées conservées (événements réels de 2025) : lancement 5G (7 nov. 2025), retour d'Uber (nov. 2025), débits fibre Maroc Telecom (2025).

## 2026-10-08 — Refonte V2 (design, recherche, villes, confiance)
- **Positionnement** : « Sahla Maroc — le guide pratique du Maroc pour les MRE et les voyageurs ». Nouvel accueil : promesse, recherche visible, deux parcours (Je rentre / Je visite), calculateurs, « Pourquoi Sahla ? », guides populaires, thèmes, villes, checklists, chiffres datés, newsletter, derniers guides.
- **Retiré de l'accueil** (absents du nouveau brief et non traduits en es/de/ar) : bandeau darija, FAQ, excursions, bannière 2030. Le contenu reste dans les guides.
- **Recherche globale** : index JSON statique par langue (`/<lang>/search-index.json`), module client sans dépendance, fenêtre `<dialog>` (touche `/`) et page de recherche (noindex).
- **Nouvelles pages** : hubs `guides`, `villes` + 8 pages ville, `checklists` (extraites des guides), `mre`, `visiter-le-maroc`, pages piliers par thème, contact, conditions, méthodologie, politique éditoriale, corrections ; à propos / confidentialité / affiliation réécrites (5 langues).
- **Données villes** : uniquement des faits déjà publiés dans les guides ; budgets issus de `src/config/costs.ts` (estimations de départ datées, présentées comme telles).
- **Slugs** : l'identifiant de contenu Astro = slug, donc unique toutes langues confondues (contrôlé par `check:content`). FR : `contactez-nous`, `corrections-et-mises-a-jour`.
- **Formulaires sans backend** : `PUBLIC_FORM_ENDPOINT` / `PUBLIC_NEWSLETTER_ENDPOINT` si définis, sinon e-mail pré-rempli ; champ piège anti-spam. Analytics : uniquement via Umami si configuré (`window.sahlaTrack`).
- **Domaine** : `SITE_URL` (env) pilote canonical, sitemap, OG, RSS, robots ; redirections www / sahlamorocco.com préparées dans `vercel.json` (à activer une fois le DNS prêt).
- **Non fait volontairement** : aucune statistique, avis ou source inventés ; textes juridiques génériques (aucune clause de droit applicable) à faire relire par un juriste.

## 2026-10-09 — Lot contenu MRE (guides, calculateurs, villes du nord, PDF, « Vérifié le »)
- **Guides** : 17 nouveaux × 5 langues (85 fichiers) — où loger à Nador, Al Hoceïma, Tétouan/M'diq, Oujda, Ouarzazate, Meknès, Merzouga, Taghazout ; importer une voiture (retour définitif) ; retraite au Maroc ; assurance rapatriement du corps ; retour avec enfants (école, équivalence, CNSS) ; vols Europe → Maroc ; série Coupe du monde 2030 (stades, transports, logement, préparer son séjour). Total : 85 guides × 5 langues. es/de/ar : `machineTranslated: true` (noindex) jusqu'à relecture humaine.
- **Calculateurs** : frais de dédouanement d'une voiture (`src/utils/customs.mjs`, paramètres datés et classés officiel/secondaire dans `src/config/customs.ts`) et budget de retraite (`src/utils/retirement.mjs`). Tests : `node --test tools/test-customs.mjs tools/test-retirement.mjs`. Les taux de droit d'importation et la taxe parafiscale n'étant pas confirmés par un texte officiel lisible, ils sont indicatifs et modifiables.
- **Villes** : pages Nador et Tétouan (modèle existant, sans budget chiffré ni badge 2030).
- **« Vérifié le… »** : nouveau champ `verifiedDate` (vérification factuelle réelle, distincte de `updatedDate` et de `checkedDate` « terrain »). Affiché sur chaque guide ; si absent, mention « date de vérification des sources non renseignée ». Jamais remplacé par la date du jour. Renseigné seulement sur les guides dont les faits clés ont été vérifiés dans les sources (vols, Coupe du monde, retraite). Les 68 guides existants et plusieurs nouveaux n'ont pas encore de date : à renseigner au fil des revérifications.
- **PDF check-list « Retour d'été »** : 5 langues, générés par `node tools/build-pdf.mjs` (Chromium requis, donc hors build Vercel), à placer dans `public/downloads/`. Les composants (`PdfDownload`, `Newsletter`) n'affichent le lien que si le PDF existe au build : pas de lien mort. Livraison e-mail automatique non implémentée (voir `docs/NEWSLETTER-PDF.md`).
- **Correction** : guide retour définitif, « résidence à l'étranger » : « plus de 10 ans » (circulaire ADII 5945/311).
- **Mobile** : `.card` et `CalcInfo` — retour à la ligne forcé et colonne `grid-cols-1` (débordement à 320 px en allemand).
- **À corriger (constaté, non traité)** : guide Marhaba (« du 5 juin ») vs dates 2026 de la presse (10 juin) ; guide Coupe du monde 2030 existant présente « six villes hôtes » comme acquises alors que la liste FIFA n'est pas finalisée.
