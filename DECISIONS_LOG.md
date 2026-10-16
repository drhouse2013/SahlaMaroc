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
