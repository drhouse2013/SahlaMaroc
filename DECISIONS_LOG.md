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
