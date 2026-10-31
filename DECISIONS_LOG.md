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

## 2026-10-10 — Revérification des guides existants + corrections
- 62 des 68 guides d'origine revérifiés sur sources (officielles d'abord) : `verifiedDate: 2026-10-10` posé dans les 5 langues quand les faits clés sont confirmés. Non datés (sources officielles inaccessibles ou contradictoires) : autoroute Tanger Med (grille ADM 2024 seule lisible), coût de la vie, héritage, location courte durée, carte SIM, aéroports (Rabat-Salé). Nouveaux guides non datés : 8 « où loger » (sources surtout secondaires), rapatriement, enfants, import voiture.
- Corrections notables : Marhaba 2026 du 10 juin au 15 septembre ; Coupe du monde 2030 = « villes proposées », liste FIFA non publiée (encadré de statut), capacités Rabat 68 700 / Tanger ≈ 75 600 / Agadir ≈ 45 000 ; péages ADM grille 2024 ; lignes ferry 2026 ; apostille (adhésion 27/11/2015, autorités compétentes) ; crédit MRE jusqu'à 80 % ; exonération résidence principale « au moins 5 ans » ; résidence fiscale « 183 jours sur 365 » ; train aéroport Casablanca 50 DH ; bus 19 Marrakech 30 MAD ; jours fériés 2027 (ajout du 31 octobre) ; réseau scolaire français 45 établissements.
- Restent à confirmer : TVA sur honoraires de notaire (mre.ts), timbre carte de séjour, validité passeport mineurs, prix SIM, cautions de location, barème des amendes.

## 2026-10-10 (suite) — Sources, données admin, newsletter, horaires de prière
- **Sources renforcées** : 8 guides « où loger » (sources primaires : ONDA, ONMT, UNESCO, Marsa Maroc, SMIT, Eaux et Forêts) et autoroute (grille ADM en ligne : 14/29/41/68/78/89 DH, sans date d'entrée en vigueur), carte SIM (prix lus sur iam.ma, orange.ma, inwi.ma), coût de la vie (budgets = estimations, repère HCP IPC août 2026) : datés 10/10/2026.
- **Restent sans `verifiedDate` (raisons précises)** :
  - héritage : droits d'enregistrement en ligne directe non trouvés dans le guide MRE 2025/2026 ni dans les fiches DGI ; CGI (750 p.) non exploitable par les outils → lire CGI art. 129/133 sur tax.gov.ma.
  - location courte durée : décret 2-23-441, autorisation 5 ans et amende 50 000-100 000 DH confirmés ; délai de 30 jours, TVA 10 %, taxe de séjour non confirmés (sgg.gov.ma / adala bloqués) → lire BO 7407 bis et 7462 (2025).
  - aéroports : seuls les taxis Rabat-Salé confirmés (ONDA) ; pages ONDA Fès/Tanger en 404, Agadir en image.
  - rapatriement : pas de liste officielle des pièces (consulats non lisibles) ; mre.gov.ma confirme seulement l'action « rapatriement des dépouilles ».
  - retour avec enfants : AREF/men.gov.ma inaccessibles ; âges ayants droit CNSS (21/26 ans, loi 54-23 → 30 ans) via extraits cnss.ma et presse.
  - import voiture : fiche ADII « Dédouanement d'un véhicule » lue (abattement 90 %, vieillissement 3 ans = 25 %, âges limites), mais taux du droit d'importation SH 8703 introuvable (ADiL rejette toute lecture automatique) → reste indicatif (17,5 % / 2,5 %) dans le calculateur.
- **Données admin** : TVA notaire 20 % depuis 2023 (note circulaire DGI 733) ; minimum 4 000 DH = barème du projet de décret 2.17.481 (presse, publication BO non confirmée ; taux de 1 % du calculateur inférieur au barème cité 1,25-1,5 %, laissé modifiable) ; timbre carte de séjour « 100 DH par année » = sources secondaires seulement ; passeport mineurs : 5 ans (> 3 ans), 3 ans (< 3 ans), consulat.ma.
- **Traductions** : liste de relecture fichier par fichier dans `docs/RELECTURE-TRADUCTIONS.md` (es/de/ar : 103 fichiers chacune, 87 articles noindex). Rien n'est indexé avant validation.
- **Newsletter** : fournisseurs Brevo / MailerLite / Buttondown préparés (`PUBLIC_NEWSLETTER_PROVIDER` + `PUBLIC_NEWSLETTER_FORM_ID`), recommandation Brevo (UE, double opt-in, e-mail final avec le lien PDF). Aucun envoi réel testé ; voir `docs/NEWSLETTER-PDF.md`.
- **Horaires de prière** (`/fr/horaires-priere-maroc`, 5 langues) : calcul astronomique côté client (`src/utils/prayer.mjs`), aucune API ni dépendance ni requête réseau. Paramètres : Fajr 19°, Icha 17°, Asr ombre ×1 (malékite), Chourouq −3 min, Dhohr +5, Maghrib +5, correction d'altitude au lever. Paramètres relevés chez un tiers (bladi.net), validés contre le calendrier officiel habous.gov.ma : 7 villes × 3 dates × 6 horaires = 126 comparaisons, écart max 1 min (`tools/test-prayer.mjs`). Heure légale UTC+0 depuis le 20/09/2026 (constante `GMT_ALL_YEAR_FROM`). Géolocalisation uniquement sur clic (vie privée), repli Casablanca, choix mémorisé localement. 35 villes, coordonnées approximatives.
- **Outils** : crédits Firecrawl presque épuisés (≈ 15 requêtes/min) ; éviter les scrapes de gros PDF.

## 2026-10-15 — Finalisation du lot (calculateurs, Ramadan, guides, villes, docs)
- **Ajouts** : calculateur plus-value immobilière (`capitalgain.mjs`, source guide fiscal MRE juillet 2025 ; coefficient saisi par l'utilisateur) ; convertisseur EUR/MAD (`fx.mjs`, taux 11,0 daté du 30/09/2026 dans `src/config/site.ts`, modifiable) ; page Ramadan 2027 (imsak = Fajr 19°, dates prévisionnelles 8/9 février, UTC+0) ; 5 guides MRE × 5 langues (sans `verifiedDate` : sources officielles illisibles) ; 5 villes (15 au total) ; `docs/MISE-EN-LIGNE.md`, `docs/PHOTOS.md`.
- **Correction** : `tools/check-content.mjs` ne contrôlait aucun fichier sous Windows (`URL.pathname`) ; corrigé avec `fileURLToPath`. 555 fichiers, 0 erreur. Build : 707 pages.
- **Langues es/de/ar maintenues en noindex** : aucune relecture humaine consignée dans le dépôt ; `INDEXABLE_LOCALES` inchangé (règle CLAUDE.md : `machineTranslated` tant que non relu).
- **À faire** : `verifiedDate` des 5 nouveaux guides et du guide import voiture ; photos libres de droits avec attribution ; liens retour depuis les 68 guides existants.

## 2026-10-15 — Sécurité : en-têtes Vercel et npm audit
- **vercel.json** : ajout HSTS (1 an, includeSubDomains, sans preload) et `Content-Security-Policy-Report-Only` (Umami, AdSense, MailerLite, Brevo/sibforms, Buttondown ; frame-ancestors 'self'). Les autres en-têtes (nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy) existaient déjà. CSP en report-only : à durcir en mode bloquant après observation des rapports.
- **npm audit** : `npm audit fix` (sans --force) appliqué. Reste : sharp (librsvg) et gray-matter/sprintf-js, qui exigent une mise à jour majeure : non appliquée. Override vite conservé.

## 2026-10-16 — Calculateurs « Budget de retour définitif » et « Coût de la vie par ville »
- Ajouts : `returnbudget.mjs` (+ `costofliving.mjs`), `src/config/return-budget.ts`, composants `ReturnBudget`/`CityCosts`, 10 pages (es/de/ar machineTranslated), tests `tools/test-returnbudget.mjs`.
- Décision : déménagement, mois de caution, installation et scolarité n'ont aucune source dans le dépôt : départ à 0, à saisir (aucun chiffre inventé). Dépenses courantes = costs.ts ; droits voiture = customs.mjs (taux d'import `secondary`).

## 2026-10-16 — Guide certificat de vie (idée 2)
- 5 langues (es/de/ar machineTranslated), sources : Service-Public, Assurance retraite, CLEISS, SFP Belgique. Délais divergents (1 mois / 2 mois / 30 jours) : écrits sans règle unique, "selon votre caisse". verifiedDate = 2026-10-16 (lecture des pages officielles). Caisses CNSS/CMR/CIMR, espagnole, allemande non lues : non détaillées.

## 2026-10-16 — Tests de parcours Playwright
- Ajout : `@playwright/test` (devDependency, override vite intact), `playwright.config.mjs` (astro preview sur dist/, port 4331), `tests-e2e/parcours.spec.mjs`, script `npm run test:e2e` (builder avant). Chromium du cache ms-playwright utilise, aucun telechargement.
- Couverture : 15 calculateurs (defaut, negatif, vide, virgule), 404 fr/ar (rtl), recherche, newsletter (champ piege), mobile 360 px, console. Resultat : tout vert, aucun bug reel trouve, aucun code du site modifie.

## 2026-10-16 — Écarts calculateurs : frais ANCFCC et résidence douane
- Frais d'achat : tarif ANCFCC relu (décret 2.16.375, chap. II A.1, cession) = 1,5 % + droit fixe 100 DH par propriété, minimum de perception 500 DH. `landRegistryFixed` 200 -> 100, ajout `landRegistryMin: 500` (appliqué dans PropertyFees.astro), tools.ts mis à jour, MRE_LAST_CHECKED = 2026-10-16.
- Douane 90 % : résidence strictement > 10 ans (circ. ADII 5945/311) ; 10 pile = inéligible ; test ajouté dans tools/test-customs.mjs.

## 2026-10-16 — Calculateur vignette (TSAV) et guide assurances voyage
- **Vignette** : barème lu sur la fiche officielle DGI (PDF section arabe, tax.gov.ma ; version française en 503 ; CGI 2026 de 765 p. non exploitable par les outils, réseau local bloqué). Essence 350/650/3000/8000 DH, gasoil 700/1500/6000/20000 DH (<8, 8-10, 11-14, >=15 CV). Le PDF n'est pas daté : date de lecture 2026-10-16 retenue. Outil : `vignette.mjs`, `VignetteCalc.astro`, `src/config/vignette.ts`, `tools/test-vignette.mjs`, 5 pages (es/de/ar machineTranslated), entrée TOOLS `calc-vignette`. Exonérations non traitées (notées dans l'outil).
- **Guide passeport/CNIE depuis l'étranger** : déjà publié dans les 5 langues (translationKey `passport-cnie`, verifiedDate 2026-10-10) ; rien recréé.
- **Guide assurances voyage/rapatriement** : critères uniquement, aucun prix ni assureur ; pas de `verifiedDate` (aucune source officielle lue). Carte européenne d'assurance maladie = UE, non applicable au Maroc (connaissance générale, à sourcer).

## 2026-10-16 — Loyers MRE et heure légale
- Guide `impots-vente-location-bien-maroc-mre` (fr/en/es/de/ar, es/de/ar machineTranslated) : option 20 % limitée aux loyers soumis à retenue à la source ; retenue 10 % (< 120 000 DH) / 15 % (>= 120 000 DH) selon guide fiscal MRE 2026 (mre.gov.ma, juillet 2026). Le « 5 % dès le 1er juillet 2026 » est retiré (aucune source officielle).
- Heure légale : décret 2.26.530 (25/06/2026) lu dans le BO n° 7521 du 29/06/2026 (sgg.gov.ma), abroge le décret 2.18.855 ; GMT+0 depuis le 20/09/2026 confirmé, aucune mention d’incertitude ajoutée.

## 2026-10-16 — Guide acte de naissance / copie intégrale / Watiqa
- Guide `acte-de-naissance-maroc-copie-integrale-extrait-watiqa-mre` (translationKey `birth-certificate-civil-registry`, fr/en/es/de/ar ; es/de/ar machineTranslated, verifiedDate fr/en seulement). Faits limités à watiqa.ma, consulat.ma et alhalalmadania.ma (lu par extrait) ; aucun tarif ni délai chiffré ; quelle administration exige extrait ou copie intégrale : non sourcé, renvoi à l'organisme destinataire. Liens internes vers apostille, mariage/état civil, passeport/CNIE ; une phrase de renvoi ajoutée dans les guides mariage et apostille (fr, en).

## 2026-10-16 — Cycle expert (idées)
- Idée casier judiciaire MRE examinée puis rejetée (sources non officielles, contradictoires) : consignée dans docs/IDEES-EXPERT.md. Aucun code modifié. Firecrawl : crédits épuisés (402), recherche faite via WebSearch. Amélioration design : bloc « vérifié » déjà présent dans ArticleLayout, rien à ajouter.

## 2026-10-16 — Cycle expert (idées, 2e passage)
- Aucune nouvelle idée « excellente » : drones (déjà dans le guide douane), création d'entreprise, succession, vignette, certificat de vie, état civil déjà publiés. Idées 12-13 consignées dans docs/IDEES-EXPERT.md. Aucun code ni contenu modifié, donc pas de build ni de publication (publier-auto.bat non lancé : seul changement = docs).

## 2026-10-16 — Cycle expert (idées, 3e passage)
- Catalogue de 100+ guides déjà très complet. Idée examinée : médicaments/psychotropes en voyage, déjà couverte, sans source officielle actuelle : consignée (idée 14). Aucun code ni contenu modifié, donc pas de build ni de publication.

## 2026-10-16 — Cycle expert (idées, 4e passage)
- Idée taxe d'habitation / services communaux MRE examinée puis rejetée (sources non officielles, contradictoires) : idée 15 dans docs/IDEES-EXPERT.md. Aucun code ni contenu modifié, donc pas de build ni de publication.

## 2026-10-16 — Actualité « 22 attestations supprimées » (loi 55.19)
- Constat : la mesure n'est pas nouvelle (circulaire Intérieur avril 2021 + Idarati ; chiffre 22 annoncé par M. Laftit, relayé en 2022). Aucune source 2026 ni texte officiel (BO/SGG/circulaire) listant les 22 documents n'a été trouvé ; texte de la loi 55.19 lu (art. 4, 16, silence vaut accord). Détails dans docs/FACTS.csv (page « nouveautes-admin »).
- Guides : encadré « Ce qui change » ajouté (fr/en/es/de/ar, es/de/ar machineTranslated déjà posé) dans mariage/état civil, apostille, certificat de vie (distinction retraite étrangère vs certificat administratif marocain), voyage enfants (autorisation légalisée), achat voiture. Formulation prudente « selon l'administration ». Pas de changement de `verifiedDate`.
- Fiche réutilisable : docs/NOUVEAUTES-ADMIN-DRAFT.md. Non traités : héritage, retour définitif, passeport/CNIE (aucune liste de pièces concernée trouvée).

## 2026-10-16 — Section « Nouveautés et procédures administratives »
- Collection `news` (src/content/news/<lang>/*.md, schéma dans content.config.ts), hub `HUB_SLUGS.news` (/fr/nouveautes-administratives, /en/admin-news…), composant `NewsHub.astro` (fil daté, filtres par thème, sources, limites, guides liés), liens Header/Footer, index de recherche, sitemap (auto, fr/en), encadré « Nouveautés liées » dans ArticleLayout via le champ `related` (translationKey) : aucun Edit de guide nécessaire. Ajouter une entrée = ajouter un fichier .md par langue.
- 3 entrées (fr/en relues, es/de/ar machineTranslated) : loi 55.19 présentée comme rappel (liste des 22 documents non confirmée), heure légale GMT (décret 2.26.530, BO 7521), admission temporaire 180 j + prorogation (guide ADII 2025). Faits issus de docs/FACTS.csv uniquement. Test : tests-e2e/nouveautes.spec.mjs.

## 2026-10-16 — Marque, pluriels, registre
- Marque : règle conservée = « Sahla Maroc » en fr, « Sahla Morocco » dans toutes les autres langues (CLAUDE.md + `brandName`). Les chaînes UI utilisent désormais `{brand}` (résolu dans `t()` via `brandName(lang)`), plus aucun nom en dur dans les JSON.
- Compteurs : `src/utils/plural.ts` (Intl.PluralRules, arabe 6 formes zero|one|two|few|many|other). Formes séparées par « | » dans les JSON, résolues par `t(key, { n })` et côté client dans la recherche.
- Nombre de villes : `{n}` = `CITY_PAGES.length` ; liste des villes de `city.hub.description` générée (`cityListText`, Intl.ListFormat).
- Registre : es = tú, de = Sie (articles et pages en Sie : 1438 vs 97 formes ; UI de passée du « du » au « Sie »). Reste listé dans docs/RELECTURE-TRADUCTIONS.md.

## 2026-10-16 — Confidentialité (loi 09-08) et mentions légales
- Sources lues : texte de la loi 09-08 (BO 5714, cndp.ma : art. 3, 5, 7, 8, 9, 12, 43, 44), lignes directrices CNDP sites web (notification, transfert, cookies, conservation), page CNDP « Procédures de notification » (délibérations D-939-2025 cookies et D-940-2025 newsletters, intitulés seulement ; leur contenu n'a pas été lu).
- Politique de confidentialité réécrite dans les 5 langues (es/de/ar machineTranslated) : finalités, base, destinataires (Brevo, Google AdSense, Umami, Vercel), transfert hors Maroc, durée (sans chiffre inventé), droits art. 7-9, formalités CNDP « à déclarer ou autoriser selon le cas », consentement AdSense (message Google EEE/RU/Suisse).
- Nouvelle page Mentions légales (translationKey `legal-notice`, 5 langues, lien dans le pied de page via `footer.legalNotice`). Identité de l'éditeur, statut, adresse, ICE/RC, directeur de publication, registrar et n° de récépissé CNDP : marqueur « [À RENSEIGNER PAR L'ÉDITEUR AVANT PUBLICATION] » (non interdit par check:content), listés dans docs/ACTIONS-PROPRIETAIRE.md. Liste légale des mentions obligatoires au Maroc non trouvée : structure = bonne pratique.
- docs/MISE-EN-LIGNE.md section 7 : Wise a priori inutilisable pour un résident marocain (source Wise de 2023) ; AdSense vers banque marocaine, règles de l'Office des changes à confirmer avec banque et comptable.

## 2026-10-16 — Carte des villes : tracé national complet
- Ancien contour schématique (arrêté au sud d'Agadir) remplacé par le Maroc dans ses frontières nationales (provinces du Sud jusqu'à Lagouira, ≈ 20,7° N) : polygones « Morocco » + « W. Sahara » de Natural Earth 1:50m map units (domaine public, naturalearthdata.com), simplifiés par Douglas-Peucker (~300 points), projection équirectangulaire avec correction cos(28,5°), identique à celle des points de villes. Frontières telles que représentées par le Royaume du Maroc. Aucune requête réseau à l'exécution (path inline dans CitiesMap.astro).

## 2026-10-16 - Pages villes : lot 1 (Tafraout, Agadir, Dakhla, Laâyoune, El Jadida, Saïdia)
- Ajout de `lat`/`lon` (optionnels) à `CityPage` ; scènes de repli via `ILLUSTRATION_ALIAS`. Carte non modifiée.
- Faits limités à nos guides et sources ONDA citées ; ONDA/ONCF/ADM illisibles par outil, d'où mentions « à vérifier » (voir docs/FACTS.csv, docs/VILLES-PLAN.md). Pas de budget hors Agadir (costCity).

## 2026-10-16 - Lieux a visiter : paliers par taille de ville
- Paliers (poids touristique) : A 16-20 lieux (Casablanca, Marrakech, Fes, Tanger, Rabat, Agadir) ; B 10-12 (Meknes, Oujda, Kenitra, Tetouan, Nador, Laayoune) ; C 7-9 (El Jadida, Dakhla, Al Hoceima, Ouarzazate...) ; D 5-8 (petites villes ; Essaouira et Chefchaouen jusqu'a 10).
- Regle : seuls les lieux confirmes par une source lue (Wikivoyage, Wikipedia) sont gardes ; les villes sous leur palier faute de sources le restent (pas d'invention).
- Casablanca : retrait de Sidi Abderrahman et du Musee du judaisme (photos, manifeste, credits, faits). Aucun lieu a theme juif dans les lieux (Tetouan : mention retiree de la medina). Fiche Hassan II sans superlatif.

## 2026-10-17 - Lieux a visiter : 2e passage (completion des paliers)
- +109 lieux (Wikivoyage FR/EN, Wikipedia FR/EN lus) ; 9 villes creees (Errachidia, Guelmim, Taroudant, Larache, Asilah, Ifrane, Zagora, Sidi Ifni, Tiznit). Rattachements verifies ville par ville : aucune erreur.
- Exclus : tout lieu a theme juif (ex. Fondation Lorin a Tanger, synagogues d'Ouarzazate/Agadir/El Jadida), lieux « fermes/en renovation » (musee Sijilmassa, parc oiseaux de Laayoune), prix/horaires/distances.
- Villes encore sous palier faute de source lue : Laayoune 4, Merzouga 4, Kenitra 8, Nador 9, Al Hoceima 9 (B/C), Errachidia 5, Taroudant 6, Tiznit 5, Asilah 5, Tafraout 5, Zagora 6, Guelmim 6 (sources Wikivoyage/Wikipedia minces). Photos : lignes ajoutees en fin de docs/SPOTS-PHOTOS.md.

## 2026-10-17 - Lot 2 demarches A (visa-90-jours, e-visa, carte de sejour, apostille, passeport-CNIE, permis, douane), fr + en
- Sources lues : loi 02-03 (dahir 1-03-196, texte BO via adala.justice.gov.ma, extrait en local) ; tableau de statut et fiche d'autorites de la Conference de La Haye (Maroc) ; guide douane MRE ADII 2025 (archive locale). consulat.ma, passeport.ma, acces-maroc.ma, transport.gov.ma/equipement.gov.ma, apostille.ma : rejets/404/certificat/gabarit vide pour nos outils, donc recoupement par extraits de recherche et guides tiers (signale dans les articles).
- verifiedDate pose (2026-10-17) : visa-90-jours, carte-de-sejour, apostille, douane. RETIRE (verification non prouvee) : e-visa, passeport-CNIE, permis (anciennes dates 2026-10-10 non etayees).
- Corrections : douane (drone = licence d'importation, pas interdiction sans autorisation ; ajout engagement medicaments, 2 000 DH en dirhams, franchise 25 000 DH, detaxe) ; visa 90 j (sanctions art. 42 ajoutees ; plus de promesse « amende » vague) ; carte de sejour (cadre legal art. 5-17, 43-44 ; conjoint d'un Marocain art. 17) ; apostille (autorites reelles Justice / Interieur ; mention d'objection du tableau HCCH ; notaires France) ; permis (MRE : 1 an a compter de la residence).
- Incertitudes laissees : liste des nationalites sans visa, decompte des 90 j, frais e-Visa, timbres passeport/CNIE, liste actuelle des pays d'echange de permis, pieces et delais carte de sejour.
- Photo : permis (route R203, Wikimedia, CC BY-SA 4.0, credits CREDITS.md + methodology fr/en). Aucune photo sobre pertinente pour les 6 autres (documents/passeports exclus).
- es/de/ar NON modifies et divergents pour ces 7 guides (a retraduire).

## 2026-10-17 - Lot immobilier (7 guides fr/en) : personnalisation, sources, photos
- Guides : daam-sakane, credit-immobilier, acheter-bien, construire, procuration, heritage, louer-logement (es/de/ar non modifies, restent machineTranslated). Ajout : etapes (Roadmap), FAQ structuree, checklist, sources officielles, erreurs frequentes.
- Sources lues : FAQ daamsakane.ma (extraite du code de la plateforme), IGOC 2026 art. 201 (80 % du prix, compte en dirhams, rapatriement), guide fiscal MRE 2026 (enregistrement 4/5/3 %, partage 1,5 %, 30 jours, +2 % paiement non tracable, plus-value 20 %/min 3 %, contribution sur livraisons a soi-meme, revenus fonciers), ancfcc.gov.ma (services en ligne).
- Corrections : Daam Sakane = aucun dossier papier (reponse 7 j, notaire 30 j, versement 15 j), « remboursement integral » remplace par engagement 5 ans + hypotheque Etat ; revenus et devises retires (non confirmes) ; delais de permis (30-60 j / 2-6 mois) retires faute de source ; credit : 80 % du prix (pas valeur expertisee), pas d'attestation de non-propriete pour MRE.
- Non confirme et signale comme tel : loi 41.25 (BO 7526, 16/07/2026, presse seule), role du consulat pour la procuration (sources contradictoires), loi 67-12 (texte non relu : ecrit, plafond du depot, enregistrement du bail), droits de succession, taux bancaires.
- verifiedDate 2026-10-17 : daam-sakane, credit, acheter, construire (faits officiels lus). Retire (procuration) ou non pose (heritage, louer-logement).
- Photos Wikimedia Commons (7, sans personnes identifiables) : src/assets/photos/immo-*.jpg ; credits dans CREDITS.md et methodology fr/en.

## 2026-10-17 - Lots money (7 guides) et arrival (12 guides) : fr + en
- Guides money : transferer-epargne, impots-mre, ouvrir-compte, argent-distributeurs, envoyer-argent, cout-de-la-vie, pourboire. Faits tires de l'IGOC 2026 et du Guide fiscal MRE 2026 (copies dans docs/archives). verifiedDate pose sur transferer-epargne, impots-mre, ouvrir-compte, distributeurs, envoyer-argent ; conserve sur cout-de-la-vie ; absent sur pourboire (usages, pas de source officielle).
- Guides arrival : train, bus, applis-taxi, tramway, SIM, location-voiture, arnaques, transports Mondial, aeroports x3, fuseau-horaire. ONCF, ONDA, CTM illisibles par outil : formulations prudentes, durees/tarifs renvoyes aux sites officiels. verifiedDate RETIRE sur train, bus, taxi, tramway, location-voiture, arnaques (faits cles non confirmes) ; conserve sur fuseau-horaire (decret lu), aeroports Casablanca/Marrakech et Mondial (verifications anterieures).
- Corrections : suppression du chiffre 89,2 Mds DH (8 mois 2026) et du cours 1 EUR = 11 MAD (non verifies) ; tram Rabat 7 DH (hausse datee de juillet 2025 par la plupart des medias) ; Casablanca 8 DH marque comme grille 2024 ; Wise : precision voyageur vs resident ; numeros d'urgence laisses « a confirmer » (15 ou 150).
- Perimetre : seuls les guides de categorie money (7) et arrival (12) ; les guides d'assurance (demarches) et visa/e-visa/douane (autres lots) ne sont pas traites ici.
- Photos (Wikimedia Commons, licences verifiees par API) : 11 nouvelles dans src/assets/photos (CREDITS.md + pages methodologie fr/en) ; reutilisees : rabat-oudayas, fes-medina, marrakech-jemaa, permis-route-r203. es/de/ar non modifies : a retraduire (les 19 guides).

## 2026-10-17 - Lot 6 demarches B (mariage/etat civil, acte de naissance, certificat de vie, AMO, enfants-ecole, creer-entreprise, importer-voiture), fr + en
- Perimetre : les 7 guides listes au plan (lot 6). Non traites : retire-in-morocco (retraite), short-term-rental et property-inheritance (lot 3 immobilier). es/de/ar NON modifies et divergents (a retraduire).
- Sources lues : guide douane MRE ADII 2025 (archive locale) ; CLEISS (regime marocain 2024, certificats de vie, campagne CNSS 2015) ; cnss.ma (rubriques par profil, 3939) ; fnh.ma (CNSS et loi 55.19). Illisibles ou non relus : texte du Code de la famille, loi 36-21, loi 114-13/CGI, ae.gov.ma, ompic.ma, pages AMO de la CNSS, circulaires scolaires MRE ; recoupement par presse et guides tiers, signale dans chaque article.
- Corrections : importer-voiture (vieillissement de 3 ans : le guide ADII 2025 parle de 3 ans d'abattement sur la valeur taxable, un vehicule, une fois, certificat de changement de residence <= 6 mois ; la condition « activite + 2 ans de fiches de paie » et « moins de 3 ans » de l'ancien guide ne sont plus presentees comme certaines ; 25 % attribue a la fiche du catalogue ADII ; retour definitif : 6 mois apres le certificat de changement de residence ; regle des 5 ans de non-cession non reprise dans le guide 2025). AMO : stage 54 jours / 3 mois, ages 21/26 ans, 500 MAD (CLEISS). Mariage : MRE art. 14-15 (deux temoins musulmans, 3 mois) presentes comme rapportes par la presse.
- Loi 55.19 (dahir 1-20-06 du 6 mars 2020) integree avec prudence dans mariage, certificat de vie et AMO : declaration sur l'honneur possible, application inegale, liste des 22 documents non publique.
- verifiedDate : conserve 2026-10-16 pour acte de naissance et certificat de vie (lectures reelles de Watiqa/consulat.ma/CLEISS/Service-Public) ; RETIRE pour mariage-etat-civil (2026-10-10 non etayee). Aucun verifiedDate pose pour AMO, enfants-ecole, creer-entreprise, importer-voiture (points cles encore non confirmes a la source).
- Incertitudes laissees : delai actuel de declaration de naissance (loi 36-21), cotisations AMO TNS/Achamil, plafonds et taux auto-entrepreneur 2026, conditions de residence pour l'inscription auto-entrepreneur, capital minimum SARL, taux du droit d'importation vehicule, delais d'equivalence scolaire.
- Photo : importer-voiture (voiture-autoroute.jpg, deja creditee, CC BY 3.0, deja dans CREDITS.md et methodologie fr/en). Aucune photo sobre pertinente pour les 6 autres (documents, administration).
- Frontmatter forWho/delay/cost/faq ajoute aux 7 guides fr + en ; titres <= 70, descriptions <= 160 (check:content OK).

## Lot tours (17/10/2026)
- 8 guides tours reecrits en fr + en (Essaouira, Toubkal, excursions Marrakech, Merzouga depuis Marrakech, Fes-Merzouga, Dakhla, Taghazout, Chefchaouen) : itineraires, saison, niveau, equipement, erreurs, choix de prestataire sans nom, FAQ/forWho/delay/cost, checklist, liens villes. es/de/ar non modifies : a retraduire.
- Prix et durees non confirmes retires (budget Toubkal, tarifs bus Chefchaouen, cours Dakhla/Taghazout, 560 km Marrakech-Merzouga) ; remplaces par « a confirmer ». Regle du guide obligatoire au Toubkal : source officielle non trouvee, formulee avec prudence.
- Sources lues : ONMT visitmorocco (Chefchaouen distances Tetouan/Tanger/Fes ; Dakhla PK25, Foum El Bouir, Pointe du Dragon, 1 168 km depuis Agadir) ; Wikipedia pour Toubkal 4 167 m, Ouzoud ~110 m/150 km, Erg Chebbi. UNESCO (403 a la lecture) : liens cites, annee d'inscription non affirmee. eauxetforets.gov.ma inaccessible : lien retire.
- verifiedDate pose seulement sur Chefchaouen et Dakhla (faits cles lus sur ONMT) ; retire sur les 6 autres (affirmations non toutes confirmees). Dakhla : mention du statut conteste du Sahara occidental et conseil de consulter les avis aux voyageurs.
- Photos : reutilisation de photos deja creditees (CREDITS.md et methodologie fr/en), aucune nouvelle.

## 2026-10-17 - Lots stay (13 'ou loger') et living (9) : fr + en
- Stay : Marrakech, Casablanca, Fes, Meknes (angle etape/base d'excursion, tres different de Fes = choix de la porte de medina), Tanger, Agadir, Rabat, Essaouira, Chefchaouen reecrits ; Oujda, Tetouan, Taghazout, Ouarzazate completes (profils, FAQ, liens fiches villes). Aucun nom d'etablissement, aucun prix ; mention du mellah retiree. Photo Taghazout reprise de cities/.
- Living : sante, fibre/coworking, ecoles, nomades, hammam (prix retires, non sources), darija, culture (cadre legal a confirmer), cuisine, riad-ou-hotel. Photos existantes reutilisees (aucun nouveau credit). verifiedDate retire/non pose (faits non confirmes sur sites officiels). Heure legale GMT corrigee (fibre).
- tools/check-content.mjs : liens /villes|cities/... acceptes. es/de/ar non modifies, divergents. cout-de-la-vie et pourboire deja traites (lot money).

## 2026-10-17 - Guides restants (demarches, retour, immobilier) fr + en, glossaire et calendrier
- Perimetre : 9 guides fr + en (marhaba-guide, car-180-days, ferry-guide, motorway, car-insurance, buy-car-morocco-mre, parcels-moving, travel-insurance-compare, short-term-rental) : forWho/delay/cost/faq, etapes (Roadmap), erreurs, checklist. Les guides living (dont Coupe du monde 2030, hammam, cuisine, etc.) et stay ont ete laisses a l'autre agent. retire-in-morocco et property-inheritance etaient deja enrichis.
- Sources lues : cat.co.ma (durees et postes frontieres de l'assurance frontiere) ; recherche presse sur loi 80-14 / decret 2.23.441 (montants des sanctions non publics) ; presse sur la NARSA (delais/frais non confirmes). verifiedDate pose uniquement sur car-insurance (2026-10-17) ; non pose sur short-term-rental, buy-car, parcels, travel-insurance.
- Nouvelles rubriques (5 langues, es/de/ar machineTranslated par construction : bandeau + noindex via locales non indexables) : /glossaire (49 termes, source officielle = page d'accueil de l'organisme, guide lie) et /calendrier-des-demarches (statut confirme / previsionnel / a confirmer par ligne). Integres a la recherche, au pied de page, au menu mobile et au hub Guides. Sitemap automatique (fr, en).
- A traiter : descriptions de ecoles-internationales (164) et hammam (161) > 160 caracteres, categorie living (autre agent).

## 2026-10-17 - Guides Coupe du monde 2030 (fr + en)
- 5 guides enrichis (>= 900 mots, FAQ, etapes, checklist, liens villes). Source officielle lue : article FIFA du 11/12/2024 (pays hotes, matchs du centenaire ; aucune ville marocaine). Reste presse : statut « proposees » maintenu. verifiedDate retire. Aucune date de match ni prix. Pas de photo ajoutee (aucun cliche de stade libre verifie). es/de/ar non modifies.

## 2026-10-18 - Cycle expert automatique
- Aucune idée nouvelle exploitable (vignette TSAV et permis déjà couverts ; Firecrawl hors crédits). Seul docs/IDEES-EXPERT.md modifié.
- check:content échoue (26 erreurs préexistantes, titres/descriptions trop longs dans des articles non touchés par ce cycle, notamment ar). Publication NON lancée, sans contournement. À corriger par le lot de traduction concerné.

## 2026-10-18 - Statut de relecture professionnelle (E-E-A-T) + controles
- Nouveau champ optionnel `proReviewedDate` (src/content.config.ts). ArticleLayout affiche, sur les guides des categories immobilier et money et ceux tagues douane/fiscalite/vignette/change, soit « Relue par un professionnel le <date> » soit « Non relue par un professionnel » (5 langues, cles article.proReviewed / article.proNotReviewed). Aucune date posee : aucune relecture professionnelle reelle n'a eu lieu ; a renseigner seulement apres relecture par un fiscaliste/notaire.
- check:content etait en echec (25 erreurs longueurs titre/description et un placeholder en es/de/ar) : corrige par agent, relance des controles.

## 2026-10-19 - Cycle expert automatique : guide service militaire et MRE
- Nouveau guide `service-militaire-maroc-mre-recensement-exemption` (fr, en ; es/de/ar machineTranslated), categorie demarches. Faits tires uniquement du decret 2-19-46 (BO 6762 du 21/03/2019) lu sur Adala ; verifiedDate 2026-10-19 (texte officiel relu, pas de verification terrain). Ages, duree et sanctions non chiffres (loi 44-18 non relue). 7 lignes FACTS.csv.
- Amelioration informations : maillage depuis le guide passeport/CNIE (fr, en) vers le nouveau guide (immatriculation consulaire exigee par l'art. 12).
- Numeros d'urgence : toujours sans source officielle, laisses « a confirmer » (IDEES-EXPERT n° 18).

## 2026-10-21 - Cycle expert automatique
- Aucune idee nouvelle avec source officielle exploitable (loi 44-18 : presse seulement ; devises deja couvertes). Seul docs/IDEES-EXPERT.md modifie (n° 19) ; aucun changement de site, donc build et publier-auto.bat non relances.
- Controles : check:content 0 erreur (5 avertissements verifiedDate preexistants).

## 2026-10-21 - Validation calculateurs : douane (plafond 300 000) et crédit
- Douane : point 4 tranché par le texte officiel (guide ADII 2025, archive locale, l. 493-496 : abattement 90 % « à hauteur maximale de 300.000 Dhs », tranche supérieure au droit commun). Le calcul du site était correct ; source mise à jour dans src/config/customs.ts, ligne ajoutée à FACTS.csv.
- Crédit (MortgageCalc, 5 langues) : avertissement visible si prix <= 0, apport >= prix ou durée hors 1-30 (point 5 de VALIDATION-CALCULATEURS.md). Pas de changement de formule.
- Reste ouvert : notaire 1 % vs barème progressif (point 2, texte final non confirmé), coefficients de réévaluation plus-value.

## 2026-10-22 - Cycle expert automatique
- Aucune idée nouvelle avec source officielle lue (piste guide ADII « Marocains du Monde 2026 » notée, n° 20). Seul docs/IDEES-EXPERT.md modifié ; les changements du 2026-10-21 (douane, crédit) restaient à publier.
- Contrôles : check:content 0 erreur, node --test 67/67, build 922 pages, check:dist 0 erreur.

## 2026-10-27 - Cycle expert automatique : réparation des contrôles
- Aucune idée nouvelle exploitable (Firecrawl hors crédits, n° 21 de IDEES-EXPERT.md).
- Réparé : tools/check-content.mjs (regex cassée du contrôle FACTS.csv, variable ROOT) ; apostrophes non échappées dans src/data/tools.ts (build en échec, remplacées par ’) ; calculateur de péages : liens internes cassés en en/es/de/ar vers les vrais slugs (guide autoroute Tanger Med, guide ferry), slug ar en caractères latins (`hasibat-rusum-tariq-sayyar-maghrib`), titre es raccourci (≤ 70). FACTS.csv : champs protégés par guillemets, statuts normalisés.
- Contrôles : check:content 0 erreur, node --test 67/67, build 927 pages, check:dist 0 erreur.

## 2026-10-28 — Refonte éditoriale et orientation des visiteurs

- Demande : refonte professionnelle, identité visuelle plus affirmée et navigation plus claire. À la demande explicite de l’utilisateur, abandon du bleu au profit de l’ivoire, du vert profond et du terracotta. Les noms des anciens tokens sont conservés pour compatibilité ; leurs valeurs changent globalement.
- Accueil : grande photographie existante créditée, titres éditoriaux, recherche visible, raccourcis et trois parcours vers des guides existants, dans les cinq langues. Six calculateurs et huit villes en sélection ; les catalogues complets restent accessibles.
- Identité harmonisée dans les logos, favicon et visuel de partage. En-tête ajusté pour afficher la marque entière. Cartes des guides enrichies par leur catégorie et leur description.
- Référencement : titres et descriptions spécifiques à l’accueil dans les cinq langues, maillage interne renforcé. Préservation des URL, canonical, hreflang, sitemap et restrictions d’indexation des traductions.
- Accessibilité : contenu visible même sans JavaScript ; les animations deviennent un enrichissement facultatif. Mise en page arabe en RTL et couleurs clair/sombre conservées.
- Les règles administratives et les barèmes existants ne sont pas présentés comme revérifiés par cette refonte. Les dates de vérification éditoriale ne changent pas. Le contrôle de contenu signale des guides dont la vérification factuelle reste à compléter.

## 2026-10-28 — Sécurité, contrôles continus et ton éditorial

- Audit npm de la pile initiale : 6 dépendances signalées, dont Astro classé critique et Sharp classé élevé. Migration vers Astro 7.4.2, MDX 8.1.1 et Sharp 0.35.5, avec Node.js 24 minimum. L’ancien override Vite 6 est supprimé car incompatible avec Vite 8 requis par Astro 7 ; la chaîne Markdown unified est conservée explicitement pour limiter les changements de rendu.
- Après migration : audit npm des dépendances de production à zéro vulnérabilité connue ; les 67 tests de calcul passent. Suppression de GSAP, aucune utilisation détectée dans src/.
- Suivi du verrou package-lock.json pour des installations reproductibles. Contrôles GitHub Actions à permissions de lecture : tests, contenu, compilation, sitemap et audit npm. Actions officielles épinglées par SHA. Dependabot prépare des propositions de mise à jour sans fusion automatique.
- CSP de base appliquée pour les objets, les URL de base et l’encadrement, tout en conservant la politique détaillée en mode rapport pour les services externes.
- À la demande de l’utilisateur : textes d’accueil plus naturels autour de la famille, des voyages et des projets ; présence éditoriale de Yassine fondée sur la page À propos existante. Aucun témoignage ni portrait inventé.
- Références : https://docs.astro.build/en/guides/upgrade-to/v7/ ; https://github.com/withastro/astro/security/advisories/GHSA-26w7-cxv4-gfx2.
- Audit complet après correction ciblée du parseur PostCSS 6.1.5 : zéro vulnérabilité connue, y compris dans les outils de développement.

## 2026-10-28 — Nouvelle direction demandée : blanc et refonte complète de l’accueil

- L’utilisateur juge la première refonte trop proche de l’original et demande explicitement un fond blanc. Le fond clair est blanc. Après précision de l’utilisateur, le choix clair/sombre et ses commandes sont conservés : blanc par défaut, choix explicite mémorisé. Les nouvelles sections disposent de couleurs adaptées aux deux modes.
- Accueil recomposé : nouvelle accroche, trois photographies de destinations (Marrakech, Chefchaouen, Essaouira), vrai formulaire de recherche, parcours de projets, sélection d’outils, grande mise en avant éditoriale et liste de guides, quatre autres destinations, checklists et présentation de l’auteur. Suppression des longues séries répétitives et du bandeau de chiffres de l’accueil.
- Titres sans empattement, en-tête blanc simplifié, cartes plus sobres. Photos réelles créditées pour les cartes de guides sans couverture spécifique. Les images de couverture explicitement fournies restent conservées.
- Fond blanc également appliqué à la newsletter de l’accueil et à la présentation de l’auteur. Le site reste statique et multilingue ; les URL, les outils et les contrôles de sécurité sont conservés.

## 2026-10-28 — Thème automatique du système

- À la demande de l’utilisateur : le mode initial suit désormais `prefers-color-scheme` et réagit aux changements du système sans rechargement.
- Le sélecteur propose Système, Clair et Sombre dans les cinq langues. Un choix manuel reste possible et l’option Système permet de réactiver l’automatisme.
- Nouvelle clé locale `sahla-theme-preference` : les anciennes sélections binaires ne bloquent pas le nouveau comportement automatique. La préférence se synchronise entre onglets ; un stockage indisponible ne bloque pas l’affichage.
- Le thème est appliqué avant le premier rendu ; la couleur de l’interface du navigateur est adaptée. Tests de comportement ajoutés aux contrôles automatiques.

## 2026-10-28 — Guides : lecture instinctive, photographies et contrôle factuel ciblé

- À partir du message transmis du propriétaire, puis des précisions de l’utilisateur : miniatures lisibles et liées au titre, pages adaptées à leur sujet. Recherche placée dès l’entrée, compteur de résultats visible, parcours dépliables et masqués pendant une recherche, validation au clavier vers les résultats.
- Couvertures éditoriales communes aux cartes et aux pages : titres explicites, photos réelles du sujet, crédits et liens de licence visibles. 37 guides disposent d’une photo spécifique issue du fonds existant ; 33 licences uniques ont été relues dans l’API Wikimedia Commons sans divergence. Huit photographies réelles supplémentaires sont livrées en WebP. Les destinations conservent leurs photographies créditées. Aucune image générée par IA n’est utilisée, conformément à la précision de l’utilisateur.
- Pages de guides : fond clair blanc, couverture en paysage, raccourcis liés aux véritables intertitres sur ordinateur ; sommaire complet existant conservé sur mobile. Modes Système / Clair / Sombre conservés.
- e-Visa, cinq langues : note et guide officiels relus pour les profils B et C, validité du passeport, délais moyens en jours ouvrables et montants 770 / 1 100 DH. Ajout d’un périmètre de contrôle daté ; pas de fausse date de vérification de l’ensemble du guide.
- Calculateurs : 11 MAD/EUR requalifié en hypothèse de calcul, suppression de sa date non justifiée et des badges de vérification qu’elle alimentait. Honoraires de notaire à 1 % / minimum 4 000 DH explicitement présentés comme hypothèses ; pas de date globale de validation pour cet ensemble de paramètres.
- Correction de classement : un local commercial construit relève du choix « local construit » à 4 %, pas du terrain nu à 5 %. Référence : CGI art. 133 F-1 / G-1, rappel publié par le Conseil national de l’Ordre des notaires. Conservation foncière 1,5 % + 100 DH / minimum 500 DH retrouvée dans le document ANCFCC ; référence de fichier corrigée.
- Informations confirmées sans modification : retour à GMT par décret 2.26.530 ; règle générale des 180 jours ADII ; montants de base Daam Sakane ; financement immobilier MRE jusqu’à 80 % selon l’IGOC 2026. Les contrôles ne constituent pas une revue juridique complète des 96 guides français. Aucun avis, témoignage ni chiffre d’usage inventé n’a été ajouté.
- Contrôle exhaustif des liens et ressources locaux du build : 28 cibles de villes incorrectement traduites découvertes dans les guides ES/DE/AR. Les liens de villes connus des contenus MDX passent désormais par le routage multilingue commun (composant ContentLink), y compris les slugs des villes. Le contrôle CI check:dist a été étendu à toutes les pages générées et aux ressources ; résultat local final : 927 pages, 104 362 références, zéro cible manquante.

## 2026-10-29 — Identité marocaine et audit

- Zellige réel de Fès (Orlysi, CC BY-SA 4.0), optimisé et crédité ; fond clair, surfaces de lecture sobres, adaptation sombre et RTL. Aucune image IA.
- Remplacement des mentions de popularité sans données par une sélection éditoriale ; checklists de départ, achat et famille.
- Accès explicite à tous les guides dans les menus ; téléchargement PDF direct si aucun service de newsletter n’est configuré.
- Bordures harmonisées sur le jeton existant ; priorité réseau réservée à l’image principale, distincte de la taille des cartes.

- Contrôle à 325 px enfin disponible : pas de débordement FR/AR. Sur mobile, le titre et les actions précèdent désormais les photos pour rendre le point de départ visible plus tôt.
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

## 2026-10-10 — Revérification des guides existants + corrections
- 62 des 68 guides d'origine revérifiés sur sources (officielles d'abord) : `verifiedDate: 2026-10-10` posé dans les 5 langues quand les faits clés sont confirmés. Non datés (sources officielles inaccessibles ou contradictoires) : autoroute Tanger Med (grille ADM 2024 seule lisible), coût de la vie, héritage, location courte durée, carte SIM, aéroports (Rabat-Salé). Nouveaux guides non datés : 8 « où loger » (sources surtout secondaires), rapatriement, enfants, import voiture.
- Corrections notables : Marhaba 2026 du 10 juin au 15 septembre ; Coupe du monde 2030 = « villes proposées », liste FIFA non publiée (encadré de statut), capacités Rabat 68 700 / Tanger ≈ 75 600 / Agadir ≈ 45 000 ; péages ADM grille 2024 ; lignes ferry 2026 ; apostille (adhésion 27/11/2015, autorités compétentes) ; crédit MRE jusqu'à 80 % ; exonération résidence principale « au moins 5 ans » ; résidence fiscale « 183 jours sur 365 » ; train aéroport Casablanca 50 DH ; bus 19 Marrakech 30 MAD ; jours fériés 2027 (ajout du 31 octobre) ; réseau scolaire français 45 établissements.
- Restent à confirmer : TVA sur honoraires de notaire (mre.ts), timbre carte de séjour, validité passeport mineurs, prix SIM, cautions de location, barème des amendes.

## 2026-10-10 (suite) — Sources, données admin, newsletter, horaires de prière
- **Sources renforcées** : 8 guides « où loger » (sources primaires : ONDA, ONMT, UNESCO, Marsa Maroc, SMIT, Eaux et Forêts) et autoroute (grille ADM en ligne : 14/29/41/68/78/89 DH, sans date d'entrée en vigueur), carte SIM (prix lus sur iam.ma, orange.ma, inwi.ma), coût de la vie (budgets = estimations, repère HCP IPC août 2026) : datés 10/10/2026.
- **Restent sans `verifiedDate` (raisons précises)** :
  - héritage : droits d'enregistrement en ligne directe non trouvés dans le guide MRE 2025/2026 ni dans les fiches DGI ; CGI (750 p.) non exploitable par les outils → lire CGI art. 129/133 sur tax.gov.ma.
  - location courte durée : décret 2-23-441, autorisation 5 ans et amende 50 000-100 000 DH confirmés ; délai de 30 jours, TVA 10 %, taxe de séjour non confirmés (sgg.gov.ma / adala bloqués) → lire BO 7407 bis et 7462 (2025).
  - aéroports : seuls les taxis Rabat-Salé confirmés (ONDA) ; pages ONDA Fès/Tanger en 404, Agadir en image.
  - rapatriement : pas de liste officielle des pièces (consulats non lisibles) ; mre.gov.ma confirme seulement l'action « rapatriement des dépouilles ».
  - retour avec enfants : AREF/men.gov.ma inaccessibles ; âges ayants droit CNSS (21/26 ans, loi 54-23 → 30 ans) via extraits cnss.ma et presse.
  - import voiture : fiche ADII « Dédouanement d'un véhicule » lue (abattement 90 %, vieillissement 3 ans = 25 %, âges limites), mais taux du droit d'importation SH 8703 introuvable (ADiL rejette toute lecture automatique) → reste indicatif (17,5 % / 2,5 %) dans le calculateur.
- **Données admin** : TVA notaire 20 % depuis 2023 (note circulaire DGI 733) ; minimum 4 000 DH = barème du projet de décret 2.17.481 (presse, publication BO non confirmée ; taux de 1 % du calculateur inférieur au barème cité 1,25-1,5 %, laissé modifiable) ; timbre carte de séjour « 100 DH par année » = sources secondaires seulement ; passeport mineurs : 5 ans (> 3 ans), 3 ans (< 3 ans), consulat.ma.
- **Traductions** : liste de relecture fichier par fichier dans `docs/RELECTURE-TRADUCTIONS.md` (es/de/ar : 103 fichiers chacune, 87 articles noindex). Rien n'est indexé avant validation.
- **Newsletter** : fournisseurs Brevo / MailerLite / Buttondown préparés (`PUBLIC_NEWSLETTER_PROVIDER` + `PUBLIC_NEWSLETTER_FORM_ID`), recommandation Brevo (UE, double opt-in, e-mail final avec le lien PDF). Aucun envoi réel testé ; voir `docs/NEWSLETTER-PDF.md`.
- **Horaires de prière** (`/fr/horaires-priere-maroc`, 5 langues) : calcul astronomique côté client (`src/utils/prayer.mjs`), aucune API ni dépendance ni requête réseau. Paramètres : Fajr 19°, Icha 17°, Asr ombre ×1 (malékite), Chourouq −3 min, Dhohr +5, Maghrib +5, correction d'altitude au lever. Paramètres relevés chez un tiers (bladi.net), validés contre le calendrier officiel habous.gov.ma : 7 villes × 3 dates × 6 horaires = 126 comparaisons, écart max 1 min (`tools/test-prayer.mjs`). Heure légale UTC+0 depuis le 20/09/2026 (constante `GMT_ALL_YEAR_FROM`). Géolocalisation uniquement sur clic (vie privée), repli Casablanca, choix mémorisé localement. 35 villes, coordonnées approximatives.
- **Outils** : crédits Firecrawl presque épuisés (≈ 15 requêtes/min) ; éviter les scrapes de gros PDF.

## 2026-10-15 — Finalisation du lot (calculateurs, Ramadan, guides, villes, docs)
- **Ajouts** : calculateur plus-value immobilière (`capitalgain.mjs`, source guide fiscal MRE juillet 2025 ; coefficient saisi par l'utilisateur) ; convertisseur EUR/MAD (`fx.mjs`, taux 11,0 daté du 30/09/2026 dans `src/config/site.ts`, modifiable) ; page Ramadan 2027 (imsak = Fajr 19°, dates prévisionnelles 8/9 février, UTC+0) ; 5 guides MRE × 5 langues (sans `verifiedDate` : sources officielles illisibles) ; 5 villes (15 au total) ; `docs/MISE-EN-LIGNE.md`, `docs/PHOTOS.md`.
- **Correction** : `tools/check-content.mjs` ne contrôlait aucun fichier sous Windows (`URL.pathname`) ; corrigé avec `fileURLToPath`. 555 fichiers, 0 erreur. Build : 707 pages.
- **Langues es/de/ar maintenues en noindex** : aucune relecture humaine consignée dans le dépôt ; `INDEXABLE_LOCALES` inchangé (règle CLAUDE.md : `machineTranslated` tant que non relu).
- **À faire** : `verifiedDate` des 5 nouveaux guides et du guide import voiture ; photos libres de droits avec attribution ; liens retour depuis les 68 guides existants.

## 2026-10-15 — Sécurité : en-têtes Vercel et npm audit
- **vercel.json** : ajout HSTS (1 an, includeSubDomains, sans preload) et `Content-Security-Policy-Report-Only` (Umami, AdSense, MailerLite, Brevo/sibforms, Buttondown ; frame-ancestors 'self'). Les autres en-têtes (nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy) existaient déjà. CSP en report-only : à durcir en mode bloquant après observation des rapports.
- **npm audit** : `npm audit fix` (sans --force) appliqué. Reste : sharp (librsvg) et gray-matter/sprintf-js, qui exigent une mise à jour majeure : non appliquée. Override vite conservé.

## 2026-10-16 — Calculateurs « Budget de retour définitif » et « Coût de la vie par ville »
- Ajouts : `returnbudget.mjs` (+ `costofliving.mjs`), `src/config/return-budget.ts`, composants `ReturnBudget`/`CityCosts`, 10 pages (es/de/ar machineTranslated), tests `tools/test-returnbudget.mjs`.
- Décision : déménagement, mois de caution, installation et scolarité n'ont aucune source dans le dépôt : départ à 0, à saisir (aucun chiffre inventé). Dépenses courantes = costs.ts ; droits voiture = customs.mjs (taux d'import `secondary`).

## 2026-10-16 — Guide certificat de vie (idée 2)
- 5 langues (es/de/ar machineTranslated), sources : Service-Public, Assurance retraite, CLEISS, SFP Belgique. Délais divergents (1 mois / 2 mois / 30 jours) : écrits sans règle unique, "selon votre caisse". verifiedDate = 2026-10-16 (lecture des pages officielles). Caisses CNSS/CMR/CIMR, espagnole, allemande non lues : non détaillées.

## 2026-10-16 — Tests de parcours Playwright
- Ajout : `@playwright/test` (devDependency, override vite intact), `playwright.config.mjs` (astro preview sur dist/, port 4331), `tests-e2e/parcours.spec.mjs`, script `npm run test:e2e` (builder avant). Chromium du cache ms-playwright utilise, aucun telechargement.
- Couverture : 15 calculateurs (defaut, negatif, vide, virgule), 404 fr/ar (rtl), recherche, newsletter (champ piege), mobile 360 px, console. Resultat : tout vert, aucun bug reel trouve, aucun code du site modifie.

## 2026-10-16 — Écarts calculateurs : frais ANCFCC et résidence douane
- Frais d'achat : tarif ANCFCC relu (décret 2.16.375, chap. II A.1, cession) = 1,5 % + droit fixe 100 DH par propriété, minimum de perception 500 DH. `landRegistryFixed` 200 -> 100, ajout `landRegistryMin: 500` (appliqué dans PropertyFees.astro), tools.ts mis à jour, MRE_LAST_CHECKED = 2026-10-16.
- Douane 90 % : résidence strictement > 10 ans (circ. ADII 5945/311) ; 10 pile = inéligible ; test ajouté dans tools/test-customs.mjs.

## 2026-10-16 — Calculateur vignette (TSAV) et guide assurances voyage
- **Vignette** : barème lu sur la fiche officielle DGI (PDF section arabe, tax.gov.ma ; version française en 503 ; CGI 2026 de 765 p. non exploitable par les outils, réseau local bloqué). Essence 350/650/3000/8000 DH, gasoil 700/1500/6000/20000 DH (<8, 8-10, 11-14, >=15 CV). Le PDF n'est pas daté : date de lecture 2026-10-16 retenue. Outil : `vignette.mjs`, `VignetteCalc.astro`, `src/config/vignette.ts`, `tools/test-vignette.mjs`, 5 pages (es/de/ar machineTranslated), entrée TOOLS `calc-vignette`. Exonérations non traitées (notées dans l'outil).
- **Guide passeport/CNIE depuis l'étranger** : déjà publié dans les 5 langues (translationKey `passport-cnie`, verifiedDate 2026-10-10) ; rien recréé.
- **Guide assurances voyage/rapatriement** : critères uniquement, aucun prix ni assureur ; pas de `verifiedDate` (aucune source officielle lue). Carte européenne d'assurance maladie = UE, non applicable au Maroc (connaissance générale, à sourcer).

## 2026-10-16 — Loyers MRE et heure légale
- Guide `impots-vente-location-bien-maroc-mre` (fr/en/es/de/ar, es/de/ar machineTranslated) : option 20 % limitée aux loyers soumis à retenue à la source ; retenue 10 % (< 120 000 DH) / 15 % (>= 120 000 DH) selon guide fiscal MRE 2026 (mre.gov.ma, juillet 2026). Le « 5 % dès le 1er juillet 2026 » est retiré (aucune source officielle).
- Heure légale : décret 2.26.530 (25/06/2026) lu dans le BO n° 7521 du 29/06/2026 (sgg.gov.ma), abroge le décret 2.18.855 ; GMT+0 depuis le 20/09/2026 confirmé, aucune mention d’incertitude ajoutée.

## 2026-10-16 — Guide acte de naissance / copie intégrale / Watiqa
- Guide `acte-de-naissance-maroc-copie-integrale-extrait-watiqa-mre` (translationKey `birth-certificate-civil-registry`, fr/en/es/de/ar ; es/de/ar machineTranslated, verifiedDate fr/en seulement). Faits limités à watiqa.ma, consulat.ma et alhalalmadania.ma (lu par extrait) ; aucun tarif ni délai chiffré ; quelle administration exige extrait ou copie intégrale : non sourcé, renvoi à l'organisme destinataire. Liens internes vers apostille, mariage/état civil, passeport/CNIE ; une phrase de renvoi ajoutée dans les guides mariage et apostille (fr, en).

## 2026-10-16 — Cycle expert (idées)
- Idée casier judiciaire MRE examinée puis rejetée (sources non officielles, contradictoires) : consignée dans docs/IDEES-EXPERT.md. Aucun code modifié. Firecrawl : crédits épuisés (402), recherche faite via WebSearch. Amélioration design : bloc « vérifié » déjà présent dans ArticleLayout, rien à ajouter.

## 2026-10-16 — Cycle expert (idées, 2e passage)
- Aucune nouvelle idée « excellente » : drones (déjà dans le guide douane), création d'entreprise, succession, vignette, certificat de vie, état civil déjà publiés. Idées 12-13 consignées dans docs/IDEES-EXPERT.md. Aucun code ni contenu modifié, donc pas de build ni de publication (publier-auto.bat non lancé : seul changement = docs).

## 2026-10-16 — Cycle expert (idées, 3e passage)
- Catalogue de 100+ guides déjà très complet. Idée examinée : médicaments/psychotropes en voyage, déjà couverte, sans source officielle actuelle : consignée (idée 14). Aucun code ni contenu modifié, donc pas de build ni de publication.

## 2026-10-16 — Cycle expert (idées, 4e passage)
- Idée taxe d'habitation / services communaux MRE examinée puis rejetée (sources non officielles, contradictoires) : idée 15 dans docs/IDEES-EXPERT.md. Aucun code ni contenu modifié, donc pas de build ni de publication.

## 2026-10-16 — Actualité « 22 attestations supprimées » (loi 55.19)
- Constat : la mesure n'est pas nouvelle (circulaire Intérieur avril 2021 + Idarati ; chiffre 22 annoncé par M. Laftit, relayé en 2022). Aucune source 2026 ni texte officiel (BO/SGG/circulaire) listant les 22 documents n'a été trouvé ; texte de la loi 55.19 lu (art. 4, 16, silence vaut accord). Détails dans docs/FACTS.csv (page « nouveautes-admin »).
- Guides : encadré « Ce qui change » ajouté (fr/en/es/de/ar, es/de/ar machineTranslated déjà posé) dans mariage/état civil, apostille, certificat de vie (distinction retraite étrangère vs certificat administratif marocain), voyage enfants (autorisation légalisée), achat voiture. Formulation prudente « selon l'administration ». Pas de changement de `verifiedDate`.
- Fiche réutilisable : docs/NOUVEAUTES-ADMIN-DRAFT.md. Non traités : héritage, retour définitif, passeport/CNIE (aucune liste de pièces concernée trouvée).

## 2026-10-16 — Section « Nouveautés et procédures administratives »
- Collection `news` (src/content/news/<lang>/*.md, schéma dans content.config.ts), hub `HUB_SLUGS.news` (/fr/nouveautes-administratives, /en/admin-news…), composant `NewsHub.astro` (fil daté, filtres par thème, sources, limites, guides liés), liens Header/Footer, index de recherche, sitemap (auto, fr/en), encadré « Nouveautés liées » dans ArticleLayout via le champ `related` (translationKey) : aucun Edit de guide nécessaire. Ajouter une entrée = ajouter un fichier .md par langue.
- 3 entrées (fr/en relues, es/de/ar machineTranslated) : loi 55.19 présentée comme rappel (liste des 22 documents non confirmée), heure légale GMT (décret 2.26.530, BO 7521), admission temporaire 180 j + prorogation (guide ADII 2025). Faits issus de docs/FACTS.csv uniquement. Test : tests-e2e/nouveautes.spec.mjs.

## 2026-10-16 — Marque, pluriels, registre
- Marque : règle conservée = « Sahla Maroc » en fr, « Sahla Morocco » dans toutes les autres langues (CLAUDE.md + `brandName`). Les chaînes UI utilisent désormais `{brand}` (résolu dans `t()` via `brandName(lang)`), plus aucun nom en dur dans les JSON.
- Compteurs : `src/utils/plural.ts` (Intl.PluralRules, arabe 6 formes zero|one|two|few|many|other). Formes séparées par « | » dans les JSON, résolues par `t(key, { n })` et côté client dans la recherche.
- Nombre de villes : `{n}` = `CITY_PAGES.length` ; liste des villes de `city.hub.description` générée (`cityListText`, Intl.ListFormat).
- Registre : es = tú, de = Sie (articles et pages en Sie : 1438 vs 97 formes ; UI de passée du « du » au « Sie »). Reste listé dans docs/RELECTURE-TRADUCTIONS.md.

## 2026-10-16 — Confidentialité (loi 09-08) et mentions légales
- Sources lues : texte de la loi 09-08 (BO 5714, cndp.ma : art. 3, 5, 7, 8, 9, 12, 43, 44), lignes directrices CNDP sites web (notification, transfert, cookies, conservation), page CNDP « Procédures de notification » (délibérations D-939-2025 cookies et D-940-2025 newsletters, intitulés seulement ; leur contenu n'a pas été lu).
- Politique de confidentialité réécrite dans les 5 langues (es/de/ar machineTranslated) : finalités, base, destinataires (Brevo, Google AdSense, Umami, Vercel), transfert hors Maroc, durée (sans chiffre inventé), droits art. 7-9, formalités CNDP « à déclarer ou autoriser selon le cas », consentement AdSense (message Google EEE/RU/Suisse).
- Nouvelle page Mentions légales (translationKey `legal-notice`, 5 langues, lien dans le pied de page via `footer.legalNotice`). Identité de l'éditeur, statut, adresse, ICE/RC, directeur de publication, registrar et n° de récépissé CNDP : marqueur « [À RENSEIGNER PAR L'ÉDITEUR AVANT PUBLICATION] » (non interdit par check:content), listés dans docs/ACTIONS-PROPRIETAIRE.md. Liste légale des mentions obligatoires au Maroc non trouvée : structure = bonne pratique.
- docs/MISE-EN-LIGNE.md section 7 : Wise a priori inutilisable pour un résident marocain (source Wise de 2023) ; AdSense vers banque marocaine, règles de l'Office des changes à confirmer avec banque et comptable.

## 2026-10-16 — Carte des villes : tracé national complet
- Ancien contour schématique (arrêté au sud d'Agadir) remplacé par le Maroc dans ses frontières nationales (provinces du Sud jusqu'à Lagouira, ≈ 20,7° N) : polygones « Morocco » + « W. Sahara » de Natural Earth 1:50m map units (domaine public, naturalearthdata.com), simplifiés par Douglas-Peucker (~300 points), projection équirectangulaire avec correction cos(28,5°), identique à celle des points de villes. Frontières telles que représentées par le Royaume du Maroc. Aucune requête réseau à l'exécution (path inline dans CitiesMap.astro).

## 2026-10-16 - Pages villes : lot 1 (Tafraout, Agadir, Dakhla, Laâyoune, El Jadida, Saïdia)
- Ajout de `lat`/`lon` (optionnels) à `CityPage` ; scènes de repli via `ILLUSTRATION_ALIAS`. Carte non modifiée.
- Faits limités à nos guides et sources ONDA citées ; ONDA/ONCF/ADM illisibles par outil, d'où mentions « à vérifier » (voir docs/FACTS.csv, docs/VILLES-PLAN.md). Pas de budget hors Agadir (costCity).

## 2026-10-16 - Lieux a visiter : paliers par taille de ville
- Paliers (poids touristique) : A 16-20 lieux (Casablanca, Marrakech, Fes, Tanger, Rabat, Agadir) ; B 10-12 (Meknes, Oujda, Kenitra, Tetouan, Nador, Laayoune) ; C 7-9 (El Jadida, Dakhla, Al Hoceima, Ouarzazate...) ; D 5-8 (petites villes ; Essaouira et Chefchaouen jusqu'a 10).
- Regle : seuls les lieux confirmes par une source lue (Wikivoyage, Wikipedia) sont gardes ; les villes sous leur palier faute de sources le restent (pas d'invention).
- Casablanca : retrait de Sidi Abderrahman et du Musee du judaisme (photos, manifeste, credits, faits). Aucun lieu a theme juif dans les lieux (Tetouan : mention retiree de la medina). Fiche Hassan II sans superlatif.

## 2026-10-17 - Lieux a visiter : 2e passage (completion des paliers)
- +109 lieux (Wikivoyage FR/EN, Wikipedia FR/EN lus) ; 9 villes creees (Errachidia, Guelmim, Taroudant, Larache, Asilah, Ifrane, Zagora, Sidi Ifni, Tiznit). Rattachements verifies ville par ville : aucune erreur.
- Exclus : tout lieu a theme juif (ex. Fondation Lorin a Tanger, synagogues d'Ouarzazate/Agadir/El Jadida), lieux « fermes/en renovation » (musee Sijilmassa, parc oiseaux de Laayoune), prix/horaires/distances.
- Villes encore sous palier faute de source lue : Laayoune 4, Merzouga 4, Kenitra 8, Nador 9, Al Hoceima 9 (B/C), Errachidia 5, Taroudant 6, Tiznit 5, Asilah 5, Tafraout 5, Zagora 6, Guelmim 6 (sources Wikivoyage/Wikipedia minces). Photos : lignes ajoutees en fin de docs/SPOTS-PHOTOS.md.

## 2026-10-17 - Lot 2 demarches A (visa-90-jours, e-visa, carte de sejour, apostille, passeport-CNIE, permis, douane), fr + en
- Sources lues : loi 02-03 (dahir 1-03-196, texte BO via adala.justice.gov.ma, extrait en local) ; tableau de statut et fiche d'autorites de la Conference de La Haye (Maroc) ; guide douane MRE ADII 2025 (archive locale). consulat.ma, passeport.ma, acces-maroc.ma, transport.gov.ma/equipement.gov.ma, apostille.ma : rejets/404/certificat/gabarit vide pour nos outils, donc recoupement par extraits de recherche et guides tiers (signale dans les articles).
- verifiedDate pose (2026-10-17) : visa-90-jours, carte-de-sejour, apostille, douane. RETIRE (verification non prouvee) : e-visa, passeport-CNIE, permis (anciennes dates 2026-10-10 non etayees).
- Corrections : douane (drone = licence d'importation, pas interdiction sans autorisation ; ajout engagement medicaments, 2 000 DH en dirhams, franchise 25 000 DH, detaxe) ; visa 90 j (sanctions art. 42 ajoutees ; plus de promesse « amende » vague) ; carte de sejour (cadre legal art. 5-17, 43-44 ; conjoint d'un Marocain art. 17) ; apostille (autorites reelles Justice / Interieur ; mention d'objection du tableau HCCH ; notaires France) ; permis (MRE : 1 an a compter de la residence).
- Incertitudes laissees : liste des nationalites sans visa, decompte des 90 j, frais e-Visa, timbres passeport/CNIE, liste actuelle des pays d'echange de permis, pieces et delais carte de sejour.
- Photo : permis (route R203, Wikimedia, CC BY-SA 4.0, credits CREDITS.md + methodology fr/en). Aucune photo sobre pertinente pour les 6 autres (documents/passeports exclus).
- es/de/ar NON modifies et divergents pour ces 7 guides (a retraduire).

## 2026-10-17 - Lot immobilier (7 guides fr/en) : personnalisation, sources, photos
- Guides : daam-sakane, credit-immobilier, acheter-bien, construire, procuration, heritage, louer-logement (es/de/ar non modifies, restent machineTranslated). Ajout : etapes (Roadmap), FAQ structuree, checklist, sources officielles, erreurs frequentes.
- Sources lues : FAQ daamsakane.ma (extraite du code de la plateforme), IGOC 2026 art. 201 (80 % du prix, compte en dirhams, rapatriement), guide fiscal MRE 2026 (enregistrement 4/5/3 %, partage 1,5 %, 30 jours, +2 % paiement non tracable, plus-value 20 %/min 3 %, contribution sur livraisons a soi-meme, revenus fonciers), ancfcc.gov.ma (services en ligne).
- Corrections : Daam Sakane = aucun dossier papier (reponse 7 j, notaire 30 j, versement 15 j), « remboursement integral » remplace par engagement 5 ans + hypotheque Etat ; revenus et devises retires (non confirmes) ; delais de permis (30-60 j / 2-6 mois) retires faute de source ; credit : 80 % du prix (pas valeur expertisee), pas d'attestation de non-propriete pour MRE.
- Non confirme et signale comme tel : loi 41.25 (BO 7526, 16/07/2026, presse seule), role du consulat pour la procuration (sources contradictoires), loi 67-12 (texte non relu : ecrit, plafond du depot, enregistrement du bail), droits de succession, taux bancaires.
- verifiedDate 2026-10-17 : daam-sakane, credit, acheter, construire (faits officiels lus). Retire (procuration) ou non pose (heritage, louer-logement).
- Photos Wikimedia Commons (7, sans personnes identifiables) : src/assets/photos/immo-*.jpg ; credits dans CREDITS.md et methodology fr/en.

## 2026-10-17 - Lots money (7 guides) et arrival (12 guides) : fr + en
- Guides money : transferer-epargne, impots-mre, ouvrir-compte, argent-distributeurs, envoyer-argent, cout-de-la-vie, pourboire. Faits tires de l'IGOC 2026 et du Guide fiscal MRE 2026 (copies dans docs/archives). verifiedDate pose sur transferer-epargne, impots-mre, ouvrir-compte, distributeurs, envoyer-argent ; conserve sur cout-de-la-vie ; absent sur pourboire (usages, pas de source officielle).
- Guides arrival : train, bus, applis-taxi, tramway, SIM, location-voiture, arnaques, transports Mondial, aeroports x3, fuseau-horaire. ONCF, ONDA, CTM illisibles par outil : formulations prudentes, durees/tarifs renvoyes aux sites officiels. verifiedDate RETIRE sur train, bus, taxi, tramway, location-voiture, arnaques (faits cles non confirmes) ; conserve sur fuseau-horaire (decret lu), aeroports Casablanca/Marrakech et Mondial (verifications anterieures).
- Corrections : suppression du chiffre 89,2 Mds DH (8 mois 2026) et du cours 1 EUR = 11 MAD (non verifies) ; tram Rabat 7 DH (hausse datee de juillet 2025 par la plupart des medias) ; Casablanca 8 DH marque comme grille 2024 ; Wise : precision voyageur vs resident ; numeros d'urgence laisses « a confirmer » (15 ou 150).
- Perimetre : seuls les guides de categorie money (7) et arrival (12) ; les guides d'assurance (demarches) et visa/e-visa/douane (autres lots) ne sont pas traites ici.
- Photos (Wikimedia Commons, licences verifiees par API) : 11 nouvelles dans src/assets/photos (CREDITS.md + pages methodologie fr/en) ; reutilisees : rabat-oudayas, fes-medina, marrakech-jemaa, permis-route-r203. es/de/ar non modifies : a retraduire (les 19 guides).

## 2026-10-17 - Lot 6 demarches B (mariage/etat civil, acte de naissance, certificat de vie, AMO, enfants-ecole, creer-entreprise, importer-voiture), fr + en
- Perimetre : les 7 guides listes au plan (lot 6). Non traites : retire-in-morocco (retraite), short-term-rental et property-inheritance (lot 3 immobilier). es/de/ar NON modifies et divergents (a retraduire).
- Sources lues : guide douane MRE ADII 2025 (archive locale) ; CLEISS (regime marocain 2024, certificats de vie, campagne CNSS 2015) ; cnss.ma (rubriques par profil, 3939) ; fnh.ma (CNSS et loi 55.19). Illisibles ou non relus : texte du Code de la famille, loi 36-21, loi 114-13/CGI, ae.gov.ma, ompic.ma, pages AMO de la CNSS, circulaires scolaires MRE ; recoupement par presse et guides tiers, signale dans chaque article.
- Corrections : importer-voiture (vieillissement de 3 ans : le guide ADII 2025 parle de 3 ans d'abattement sur la valeur taxable, un vehicule, une fois, certificat de changement de residence <= 6 mois ; la condition « activite + 2 ans de fiches de paie » et « moins de 3 ans » de l'ancien guide ne sont plus presentees comme certaines ; 25 % attribue a la fiche du catalogue ADII ; retour definitif : 6 mois apres le certificat de changement de residence ; regle des 5 ans de non-cession non reprise dans le guide 2025). AMO : stage 54 jours / 3 mois, ages 21/26 ans, 500 MAD (CLEISS). Mariage : MRE art. 14-15 (deux temoins musulmans, 3 mois) presentes comme rapportes par la presse.
- Loi 55.19 (dahir 1-20-06 du 6 mars 2020) integree avec prudence dans mariage, certificat de vie et AMO : declaration sur l'honneur possible, application inegale, liste des 22 documents non publique.
- verifiedDate : conserve 2026-10-16 pour acte de naissance et certificat de vie (lectures reelles de Watiqa/consulat.ma/CLEISS/Service-Public) ; RETIRE pour mariage-etat-civil (2026-10-10 non etayee). Aucun verifiedDate pose pour AMO, enfants-ecole, creer-entreprise, importer-voiture (points cles encore non confirmes a la source).
- Incertitudes laissees : delai actuel de declaration de naissance (loi 36-21), cotisations AMO TNS/Achamil, plafonds et taux auto-entrepreneur 2026, conditions de residence pour l'inscription auto-entrepreneur, capital minimum SARL, taux du droit d'importation vehicule, delais d'equivalence scolaire.
- Photo : importer-voiture (voiture-autoroute.jpg, deja creditee, CC BY 3.0, deja dans CREDITS.md et methodologie fr/en). Aucune photo sobre pertinente pour les 6 autres (documents, administration).
- Frontmatter forWho/delay/cost/faq ajoute aux 7 guides fr + en ; titres <= 70, descriptions <= 160 (check:content OK).

## Lot tours (17/10/2026)
- 8 guides tours reecrits en fr + en (Essaouira, Toubkal, excursions Marrakech, Merzouga depuis Marrakech, Fes-Merzouga, Dakhla, Taghazout, Chefchaouen) : itineraires, saison, niveau, equipement, erreurs, choix de prestataire sans nom, FAQ/forWho/delay/cost, checklist, liens villes. es/de/ar non modifies : a retraduire.
- Prix et durees non confirmes retires (budget Toubkal, tarifs bus Chefchaouen, cours Dakhla/Taghazout, 560 km Marrakech-Merzouga) ; remplaces par « a confirmer ». Regle du guide obligatoire au Toubkal : source officielle non trouvee, formulee avec prudence.
- Sources lues : ONMT visitmorocco (Chefchaouen distances Tetouan/Tanger/Fes ; Dakhla PK25, Foum El Bouir, Pointe du Dragon, 1 168 km depuis Agadir) ; Wikipedia pour Toubkal 4 167 m, Ouzoud ~110 m/150 km, Erg Chebbi. UNESCO (403 a la lecture) : liens cites, annee d'inscription non affirmee. eauxetforets.gov.ma inaccessible : lien retire.
- verifiedDate pose seulement sur Chefchaouen et Dakhla (faits cles lus sur ONMT) ; retire sur les 6 autres (affirmations non toutes confirmees). Dakhla : mention du statut conteste du Sahara occidental et conseil de consulter les avis aux voyageurs.
- Photos : reutilisation de photos deja creditees (CREDITS.md et methodologie fr/en), aucune nouvelle.

## 2026-10-17 - Lots stay (13 'ou loger') et living (9) : fr + en
- Stay : Marrakech, Casablanca, Fes, Meknes (angle etape/base d'excursion, tres different de Fes = choix de la porte de medina), Tanger, Agadir, Rabat, Essaouira, Chefchaouen reecrits ; Oujda, Tetouan, Taghazout, Ouarzazate completes (profils, FAQ, liens fiches villes). Aucun nom d'etablissement, aucun prix ; mention du mellah retiree. Photo Taghazout reprise de cities/.
- Living : sante, fibre/coworking, ecoles, nomades, hammam (prix retires, non sources), darija, culture (cadre legal a confirmer), cuisine, riad-ou-hotel. Photos existantes reutilisees (aucun nouveau credit). verifiedDate retire/non pose (faits non confirmes sur sites officiels). Heure legale GMT corrigee (fibre).
- tools/check-content.mjs : liens /villes|cities/... acceptes. es/de/ar non modifies, divergents. cout-de-la-vie et pourboire deja traites (lot money).

## 2026-10-17 - Guides restants (demarches, retour, immobilier) fr + en, glossaire et calendrier
- Perimetre : 9 guides fr + en (marhaba-guide, car-180-days, ferry-guide, motorway, car-insurance, buy-car-morocco-mre, parcels-moving, travel-insurance-compare, short-term-rental) : forWho/delay/cost/faq, etapes (Roadmap), erreurs, checklist. Les guides living (dont Coupe du monde 2030, hammam, cuisine, etc.) et stay ont ete laisses a l'autre agent. retire-in-morocco et property-inheritance etaient deja enrichis.
- Sources lues : cat.co.ma (durees et postes frontieres de l'assurance frontiere) ; recherche presse sur loi 80-14 / decret 2.23.441 (montants des sanctions non publics) ; presse sur la NARSA (delais/frais non confirmes). verifiedDate pose uniquement sur car-insurance (2026-10-17) ; non pose sur short-term-rental, buy-car, parcels, travel-insurance.
- Nouvelles rubriques (5 langues, es/de/ar machineTranslated par construction : bandeau + noindex via locales non indexables) : /glossaire (49 termes, source officielle = page d'accueil de l'organisme, guide lie) et /calendrier-des-demarches (statut confirme / previsionnel / a confirmer par ligne). Integres a la recherche, au pied de page, au menu mobile et au hub Guides. Sitemap automatique (fr, en).
- A traiter : descriptions de ecoles-internationales (164) et hammam (161) > 160 caracteres, categorie living (autre agent).

## 2026-10-17 - Guides Coupe du monde 2030 (fr + en)
- 5 guides enrichis (>= 900 mots, FAQ, etapes, checklist, liens villes). Source officielle lue : article FIFA du 11/12/2024 (pays hotes, matchs du centenaire ; aucune ville marocaine). Reste presse : statut « proposees » maintenu. verifiedDate retire. Aucune date de match ni prix. Pas de photo ajoutee (aucun cliche de stade libre verifie). es/de/ar non modifies.

## 2026-10-18 - Cycle expert automatique
- Aucune idée nouvelle exploitable (vignette TSAV et permis déjà couverts ; Firecrawl hors crédits). Seul docs/IDEES-EXPERT.md modifié.
- check:content échoue (26 erreurs préexistantes, titres/descriptions trop longs dans des articles non touchés par ce cycle, notamment ar). Publication NON lancée, sans contournement. À corriger par le lot de traduction concerné.

## 2026-10-18 - Statut de relecture professionnelle (E-E-A-T) + controles
- Nouveau champ optionnel `proReviewedDate` (src/content.config.ts). ArticleLayout affiche, sur les guides des categories immobilier et money et ceux tagues douane/fiscalite/vignette/change, soit « Relue par un professionnel le <date> » soit « Non relue par un professionnel » (5 langues, cles article.proReviewed / article.proNotReviewed). Aucune date posee : aucune relecture professionnelle reelle n'a eu lieu ; a renseigner seulement apres relecture par un fiscaliste/notaire.
- check:content etait en echec (25 erreurs longueurs titre/description et un placeholder en es/de/ar) : corrige par agent, relance des controles.

## 2026-10-19 - Cycle expert automatique : guide service militaire et MRE
- Nouveau guide `service-militaire-maroc-mre-recensement-exemption` (fr, en ; es/de/ar machineTranslated), categorie demarches. Faits tires uniquement du decret 2-19-46 (BO 6762 du 21/03/2019) lu sur Adala ; verifiedDate 2026-10-19 (texte officiel relu, pas de verification terrain). Ages, duree et sanctions non chiffres (loi 44-18 non relue). 7 lignes FACTS.csv.
- Amelioration informations : maillage depuis le guide passeport/CNIE (fr, en) vers le nouveau guide (immatriculation consulaire exigee par l'art. 12).
- Numeros d'urgence : toujours sans source officielle, laisses « a confirmer » (IDEES-EXPERT n° 18).

## 2026-10-21 - Cycle expert automatique
- Aucune idee nouvelle avec source officielle exploitable (loi 44-18 : presse seulement ; devises deja couvertes). Seul docs/IDEES-EXPERT.md modifie (n° 19) ; aucun changement de site, donc build et publier-auto.bat non relances.
- Controles : check:content 0 erreur (5 avertissements verifiedDate preexistants).

## 2026-10-21 - Validation calculateurs : douane (plafond 300 000) et crédit
- Douane : point 4 tranché par le texte officiel (guide ADII 2025, archive locale, l. 493-496 : abattement 90 % « à hauteur maximale de 300.000 Dhs », tranche supérieure au droit commun). Le calcul du site était correct ; source mise à jour dans src/config/customs.ts, ligne ajoutée à FACTS.csv.
- Crédit (MortgageCalc, 5 langues) : avertissement visible si prix <= 0, apport >= prix ou durée hors 1-30 (point 5 de VALIDATION-CALCULATEURS.md). Pas de changement de formule.
- Reste ouvert : notaire 1 % vs barème progressif (point 2, texte final non confirmé), coefficients de réévaluation plus-value.

## 2026-10-22 - Cycle expert automatique
- Aucune idée nouvelle avec source officielle lue (piste guide ADII « Marocains du Monde 2026 » notée, n° 20). Seul docs/IDEES-EXPERT.md modifié ; les changements du 2026-10-21 (douane, crédit) restaient à publier.
- Contrôles : check:content 0 erreur, node --test 67/67, build 922 pages, check:dist 0 erreur.

## 2026-10-27 - Cycle expert automatique : réparation des contrôles
- Aucune idée nouvelle exploitable (Firecrawl hors crédits, n° 21 de IDEES-EXPERT.md).
- Réparé : tools/check-content.mjs (regex cassée du contrôle FACTS.csv, variable ROOT) ; apostrophes non échappées dans src/data/tools.ts (build en échec, remplacées par ’) ; calculateur de péages : liens internes cassés en en/es/de/ar vers les vrais slugs (guide autoroute Tanger Med, guide ferry), slug ar en caractères latins (`hasibat-rusum-tariq-sayyar-maghrib`), titre es raccourci (≤ 70). FACTS.csv : champs protégés par guillemets, statuts normalisés.
- Contrôles : check:content 0 erreur, node --test 67/67, build 927 pages, check:dist 0 erreur.

## 2026-10-29 - Cycle expert automatique
- Aucune idée nouvelle avec source officielle lue (douane.gov.ma inaccessible, n° 22 de IDEES-EXPERT.md). Seuls docs/IDEES-EXPERT.md et ce journal modifiés ; aucun changement de site, build et publier-auto.bat non relancés. Amélioration design/images non appliquée ce cycle (aucune retenue sans vérification).

## 29/10/2026 — Refonte lot A : système de design, chrome, accueil
- Palette resserrée (ivoire #F4EFE6, vert profond #173F38, terre cuite #9A5632 texte / #B96F47 décor, sombre #0F2A26), contrastes AA ; anciens noms de couleurs gardés en alias.
- Polices : Fraunces (titres) + Manrope (texte) via @fontsource-variable, Readex Pro pour l'arabe.
- global.css réécrit (1047 → ~400 lignes) : suppression des doublons, bandeaux corrompus, voile bleu, verre, dégradés, étoiles, shimmer, fond zellige plein.
- Accueil éditorial : hero photo plein cadre, besoins, guides, destinations photo, bande outils ; en-tête opaque, pied de page vert structuré. Détails : docs/DESIGN-SYSTEM.md.
- `tools/test-theme.mjs` : couleurs theme-color mises à jour (#f4efe6 / #0f2a26).

## 29/10/2026 — Refonte lot B (hubs, page guide, calculateurs)
- Hubs guides/catégories : une à la une (collante) + liste à filets (ArticleCard size=row), parcours sans cartes. Page guide : titre serif, chapô, métadonnées en ligne, visuel 22 rem max, corps 18 px / 68ch, tableaux (en-tête collant, zébrage, défilement), encadrés à filet, FAQ en liste à filets, guides liés une + liste. ToolGrid en liste ; Glossaire/Calendrier/Actualités en listes à filets ; CalcShell rayons 12/8 px et focus du système. Classes ajoutées dans la section 6 de global.css. Illustrations des guides inchangées.

## 30/10/2026 — Accueil à trois parcours + pages parcours
- Accueil : le premier écran montre trois parcours (A « Je rentre au Maroc », B « Je souhaite investir », C « Je visite le Maroc ») en cartes photo + fiche (`src/components/paths/PathCard.astro`), qui remplacent le bloc « besoins » ; chapô raccourci, recherche placée sous les parcours en mobile. Photos existantes avec crédit : port de Tanger Med (HrAd, CC BY-SA 3.0), Casablanca Finance City (AyourAchtouk, CC BY-SA 4.0), dunes de Merzouga (`placePhoto('hero', 'home-hero')`).
- Pages parcours : URL conservées pour A (`/fr/mre`…) et C (`/fr/visiter-le-maroc`…) ; nouvelle page B via `HUB_SLUGS.invest` (`/fr/investir-au-maroc`, `/en/invest-in-morocco`, `/es/invertir-en-marruecos`, `/de/in-marokko-investieren`, `/ar/al-istithmar-fi-al-maghrib`), ajoutée à la recherche, au menu et au pied de page (sitemap automatique).
- Composants partagés (`PathPhoto`, `PathCard`, `PathNav`, `PathRubric`) et données `src/data/paths.ts` : rubriques reliées par translationKey, ville, région ou hub existants ; rubrique vide omise ; FAQ = première question réelle des guides ; aucune promesse de rendement ni chiffre ajouté. Accent par parcours (terre cuite, or, vert majorelle). Supprimés car orphelins : `home/Journeys.astro`, `PERSONAS`, `AUDIENCE_HUBS`.

## 2026-10-30 — Finition de la version actuelle du propriétaire

Base conservée : main 20beff2, trois parcours, nouvelles photos, typographie Fraunces/Manrope et palette ivoire. Ancienne proposition de décor retirée après la refonte du propriétaire.

- Question de choix du parcours rendue visible avec ses traductions existantes.
- Cartes d’accueil ajustées sur petit écran : plus de place au texte et aux appels à l’action ; recadrage photo un peu plus large sur ordinateur.
- Filet de zellige réel à l’entrée, limité à l’accueil ; aucun nouvel asset.
- Crédits des parcours lisibles au survol de la carte et au focus clavier, tout en gardant leur discrétion au repos souhaitée par le propriétaire.

## 2026-10-30 — Clarté de l’accueil et du premier clic

- Promesse de l’accueil centrée sur le retour, l’investissement et le voyage, dans les cinq langues.
- Appels à l’action plus courts et cohérents : préparer son retour, son projet ou son voyage.
- Sur les pages parcours, le bouton annonce la rubrique exacte qu’il ouvre ; titre investissement raccourci à l’écran, titre SEO détaillé conservé.
- Titres et introduction plus compacts sur téléphone ; césure automatique retirée des titres de parcours. Photos, palette, contenus et thème système conservés.

## 2026-10-31 — Atmosphères locales et crédits photo

- Pages ville : cinq accents sobres selon le caractère du lieu (littoral, désert, montagne, médina, urbain), déclinés en clair/sombre. Ils colorent les repères de navigation et les filtres sans recolorer tout le site.
- Crédits : l’interface ne montre plus le nom d’auteur sur chaque image au repos ; un bouton d’information ouvre un panneau natif au-dessus des images recadrées ; il expose l’auteur, la licence et la source au toucher et au clavier. Les attributions obligatoires restent accessibles.
- Destination photo : le lien vers la ville est porté par son titre afin que le contrôle du crédit reste indépendant et accessible.
- Médersa Al Attarine, photo datée du 27/12/2024 : remplacement par une image horizontale 1600 px de Jorge Franganillo, CC BY 2.0 ; source et attribution mises à jour dans le manifeste et CREDITS.md.
