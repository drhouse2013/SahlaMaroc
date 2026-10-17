# Plan guides Sahla Maroc (audit lecture seule, 17/10/2026)

Methode : script Node sur `src/content/articles/fr/*.mdx` (frontmatter + corps), croisement par `translationKey` avec en/es/de/ar. Lecture ciblee de `ArticleLayout.astro`, `GuidesHub.astro`, `AudienceHub.astro`, `content.config.ts`, `categories.ts`, `DECISIONS_LOG.md`. Aucun contenu modifie. Captures navigateur non faites (diagnostic UX base sur le code). Limites des mesures : mots = corps sans balises ; "source officielle" = lien externe du corps vers un domaine .gov/.ma/DGI/ADII/ONDA/ONCF/ADM/ANCFCC/CNDP/BAM ; le bloc "Sources officielles" de l'article (`officialSourcesFor`, data/sources.ts) s'ajoute automatiquement et n'est pas compte ici.

## 1. Chiffres cles

- 95 guides FR, 0 brouillon ; chacun existe en en/es/de/ar (475 versions). en = relu, es/de/ar = 100 % `machineTranslated` (noindex tant que non relus).
- Mots : moyenne 550, mediane 470. **69/95 guides < 600 mots**.
- **70/95 sans photo** (25 avec heroImage, dont 15 sur "stay") ; les autres retombent sur l'illustration SVG.
- **72/95 sans lien vers une source officielle dans le corps** ; 68/95 sans aucun lien externe.
- **13/95 sans `verifiedDate`** ; `checkedDate` (terrain) = 0, normal et honnete.
- 9 guides orphelins (0 lien entrant depuis un autre guide) ; 1 guide sans lien sortant ; moyenne 4,8 liens sortants.
- Structure : 1 seul guide avec < 3 H2 ; 10 guides avec checklist, 1 avec FAQ, 3 sans Callout. 0 description < 90 car.
- Tags : tous les guides ont >= 3 tags ; le manque est dans le corps (pas de FAQ ni de questions longue traine).

### Statistiques par categorie

| Cat. | Guides | Mots moy. | < 600 | verifiedDate | Photo | Src off. corps | Orphelins | Liens sort. moy. | Entr. moy. | Checklist | FAQ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| demarches | 21 | 730 | 13 | 12 | 0 | 10 | 2 | 4,3 | 3,7 | 4 | 1 |
| stay | 17 | 491 | 11 | 17 | 15 | 7 | 3 | 6,4 | 3,1 | 0 | 0 |
| living | 13 | 493 | 10 | 13 | 1 | 0 | 2 | 5,7 | 3,6 | 1 | 0 |
| arrival | 12 | 487 | 10 | 11 | 4 | 0 | 0 | 4,8 | 8,5 | 0 | 0 |
| retour | 9 | 666 | 4 | 8 | 3 | 3 | 1 | 5,7 | 6,8 | 2 | 0 |
| immobilier | 8 | 500 | 7 | 6 | 0 | 1 | 0 | 2,8 | 5,3 | 2 | 0 |
| tours | 8 | 388 | 8 | 8 | 2 | 0 | 0 | 3,4 | 3,6 | 0 | 0 |
| money | 7 | 456 | 6 | 7 | 0 | 2 | 1 | 3,6 | 6,0 | 1 | 0 |

Plus forts maillages entrants : train-maroc-al-boraq 16, aeroports-maroc-rejoindre-centre-ville 14, carte-sim-esim-maroc 14, argent-distributeurs-maroc 12, ferry-maroc-guide 12.

## 2. Diagnostic qualite (par script)

- **Courts, les plus critiques** : daam-sakane-aide-logement-mre 275, envoyer-argent-maroc 234, voiture-mre-maroc-regle-180-jours 266, douane-maroc-voyageurs-quoi-apporter 282, excursion-essaouira-depuis-marrakech 244, ou-loger-a-essaouira 263, phrases-darija-voyageurs 274, pourboire-maroc 275, train-maroc-al-boraq 294 (le plus lie du site), applis-taxi-maroc 326, credit-immobilier-mre-maroc 360, visa-maroc-regle-90-jours 368, acheter-bien-maroc-depuis-etranger 374 (pilier immobilier, `featured`). Liste des 69 dans l'annexe (colonne Mots).
- **Sans source officielle et sujet YMYL** (priorite factuelle) : apostille-legalisation, carte-de-sejour, visa-90-jours, e-visa, voiture-180-jours, douane, daam-sakane, credit-immobilier, construire-maison, procuration, heritage-succession, transferer-epargne, ouvrir-compte-bancaire, retour-definitif, retour-maroc-enfants-ecole, conduire-permis, sante-voyageurs, mariage-etat-civil, marhaba-2027, operation-marhaba. Aucun guide arrival/tours/living n'a de lien officiel dans le corps (acceptable pour tours/living, a corriger pour arrival : ONDA, ONCF, ADM, douane).
- **Sans `verifiedDate` (13)** : acheter-voiture-maroc-occasion-neuve-mre, aeroports-maroc-rejoindre-centre-ville, assurance-maladie-amo-retour-maroc-mre, assurance-rapatriement-corps-mre, colis-demenagement-europe-maroc-mre, comparatif-assurance-voyage-rapatriement-mre, creer-entreprise-auto-entrepreneur-maroc-mre, heritage-succession-immobiliere-maroc-mre, importer-voiture-retour-definitif-maroc, location-courte-duree-maroc-regles, louer-logement-annee-maroc-mre, marhaba-2027-dates-ports-reservations (donnee datee, risque eleve), retour-maroc-enfants-ecole-equivalence-cnss. Le bandeau affiche alors "verification manquante" : a traiter par verification reelle, jamais par date de convenance.
- **Sans photo : 70** ; demarches, immobilier, money = 0 photo (sujets peu photographiables : prevoir visuels maison plutot que photo stock).
- **Orphelins (0 lien entrant)** : certificat-de-vie-retraite-maroc-pension-etrangere-mre, comparatif-assurance-voyage-rapatriement-mre, culture-savoir-vivre-maroc, hammam-marocain-guide-prix, ou-dormir-a-taghazout, ou-loger-a-meknes, ou-loger-a-ouarzazate, transferer-epargne-maroc-mre, vols-pas-chers-europe-maroc-guide. Les listings les exposent quand meme ; le manque est le maillage editorial.
- **Cannibalisation / proximite de titres** : ou-loger-a-fes vs ou-loger-a-meknes (0,71), circuit-fes-merzouga-desert-3-jours vs excursion-desert-merzouga (0,50), importer-voiture-retour-definitif vs retour-definitif-maroc-mre-guide (0,50), heritage-succession vs procuration-bien-immobilier (0,40). Le groupe `ou-loger-a-*` (10 guides, 263 a 517 mots) est un gabarit repetitif : risque de contenu mince/duplique, a differencier par intention.
- **Mots-cles** : tags OK ; absents des corps : FAQ (1/95), tableaux couts/delais, longue traine (prix, delai, documents, pas a pas). Aucun titre generique detecte.
- **H2** : structure correcte, mais peu de H3 et les guides courts n'ont que 3 a 4 H2.

## 3. Diagnostic design / UX (lecture du code)

Page article (`ArticleLayout.astro`), deja solide. Present : fil d'Ariane + JSON-LD Article/Breadcrumb, badge categorie, auteur, date maj/publication, temps de lecture, badge "verifie le ..." (ou "verification manquante"), alerte YMYL automatique, divulgation affiliation, sommaire (mobile en haut, desktop sticky lateral, des 3 H2), lien vers la checklist, bloc "Sources officielles" + liens cites + "Signaler une erreur", AuthorBox, outils/villes/actus liees, guides lies, encart affilie en sidebar, AdSlot.

Manques :
1. **Pas de partage** (copier le lien, WhatsApp) : canal principal des MRE, cout faible.
2. **Pas d'impression/PDF par guide** (`PdfDownload` existe mais non branche aux guides).
3. **Pas de FAQ structuree** : FAQPage JSON-LD existe dans `seo.ts`, utilise par quasi aucun guide.
4. **Pas de bloc standard "Pour qui / Delai / Cout / Documents"** ; 3 guides sans Callout.
5. **Pas de notion de parcours** : les guides lies viennent d'un pool de categorie (`[slug].astro` l.70-77), sans sequence precedent/suivant.
6. **Illustration SVG "arche" repetee** sur 70 guides : effet monotone dans les listes.
7. **Alerte YMYL identique partout** ; pas d'alerte propre au guide (regle datee, sources divergentes).
8. **Hub Guides** (`GuidesHub.astro`, 40 lignes) : 95 ArticleCard groupees par categorie, sans recherche/filtre, sans "commencer ici", sans tri MRE/visiteur, sans temps de lecture ni badge "verifie" sur les cartes. `AudienceHub` (mre/visit) a un "commencer ici" et des outils : modele a reutiliser.
9. **Pages categorie** (`PillarPage.astro` + `data/pillars.ts`) : structure pilier + outils + villes, bonne ; ordre des guides non hierarchise (essentiels vs avances).
10. A verifier au navigateur (non fait) : densite mobile du header avec arche, CLS de l'image hero, accessibilite du sommaire mobile.

## 4. Nouvelles rubriques

Preuve de demande : inferee de la structure du site (cibles MRE et visiteurs) et de `docs/IDEES-ARTICLES.md` / `IDEES-EXPERT.md` ; aucun volume de recherche verifie dans cette etape (a confirmer via Search Console). Faisabilite = effort de code + risque factuel.

| # | Rubrique | Raison | Faisabilite | Priorite |
|---|---|---|---|---|
| 1 | **Parcours guides** : "Je rentre au Maroc", "Mon premier ete", "J'achete un bien", "Mes papiers" | 95 guides sans sequence, maillage faible | Elevee : composant `Journey` + `src/data/journeys.ts`, aucun nouveau fait | 1 |
| 2 | **Checklists imprimables par profil** | `Checklist.astro` et `ChecklistsHub` existent, 10 guides en ont une | Elevee : CSS print | 2 |
| 3 | **FAQ par guide + FAQPage JSON-LD** | 1 FAQ/95, JSON-LD deja code | Elevee ; faits a sourcer | 3 |
| 4 | **Glossaire administratif** (apostille, watiqa, melkia, titre foncier, CNIE, TSAV...) | termes non definis, levier de maillage | Elevee, risque factuel faible | 4 |
| 5 | **Calendrier des demarches** (Marhaba, vignette, impots, 180 jours, renouvellements) | donnees datees deja presentes | Moyenne, verification a chaque echeance | 5 |
| 6 | **Comparatifs** (ferries existe ; banques MRE, assurances, eSIM, transports) | comparateur ferries + 40 guides affilies | Moyenne, neutralite | 6 |
| 7 | **Fiches pratiques PDF 1 page** | `PdfDownload` existe, usage hors ligne | Moyenne (generation au build) | 7 |
| 8 | **Cartes** (aeroport vers centre, itineraires) | `CitiesMap` existe | Faible/moyenne | 8 |
| 9 | **Videos** | aucune infra, faits non verifiables | Faible | 9 |

## 5. Plan d'execution en lots

Regles par lot : enrichir d'abord le FR (800-1000 mots, sections Etapes / Documents / Couts / Delais / Pieges / FAQ, >= 2 sources officielles lues, `verifiedDate` posee seulement si verification reelle), puis mettre a jour en ; es/de/ar restent `machineTranslated`. Fait non verifiable : formulation prudente + renvoi a l'administration, jamais d'invention. Decisions consignees dans `DECISIONS_LOG.md`.

Unite de credit relative : 1 U = enrichir 1 guide FR source ; en = +0,4 U ; es+de+ar (MT) = +0,6 U ; soit ~2 U par guide complet.
Priorite = trafic potentiel (sujets MRE saisonniers, aeroports/train/SIM) x risque factuel (YMYL).

| Lot | Perimetre | Guides | Risque | FR / complet |
|---|---|---|---|---|
| 0 | Transverse : partage, composant FAQ, bloc "Pour qui/delai/cout", hub Guides "commencer ici", parcours | (code) | Faible | ~6 U |
| 1 | retour : marhaba-2027, operation-marhaba, voiture-180-jours, ferry, retour-definitif | 5 | Eleve (dates, regles) | 5 / 10 U |
| 2 | demarches A : visa-90-jours, e-visa, carte-de-sejour, apostille, passeport-CNIE, permis, douane | 7 | Tres eleve | 7 / 14 U |
| 3 | immobilier : daam-sakane, credit, acheter-bien, construire, procuration, heritage, louer-logement | 7 | Eleve | 7 / 14 U |
| 4 | money : envoyer-argent, transferer-epargne, ouvrir-compte, distributeurs, assurance-comparatif | 5-6 | Eleve (Office des changes) | 6 / 12 U |
| 5 | arrival : train, bus, aeroports x3, applis-taxi, tramway, fuseau-horaire | 8 | Moyen | 8 / 16 U |
| 6 | demarches B : mariage/etat civil, acte de naissance, certificat de vie, AMO, enfants-ecole, creer-entreprise, importer-voiture | 8-9 | Eleve | 9 / 18 U |
| 7 | tours (8 guides) | 8 | Faible | 8 / 16 U |
| 8 | stay A, differencier le gabarit `ou-loger-a-*` : Marrakech, Casablanca, Fes, Tanger, Agadir, Rabat | 6 | Faible/moyen | 6 / 12 U |
| 9 | stay B + living court : Essaouira, Chefchaouen, Meknes, Oujda, Tetouan, Taghazout, Ouarzazate, riad-ou-hotel, hammam, darija, pourboire, cuisine | ~12 | Faible | 12 / 24 U |
| 10 | living reste : cout de la vie, culture, ecoles, fibre, digital-nomad, sante | ~7 | Moyen | 7 / 14 U |
| 11 | Rubriques nouvelles : glossaire, contenus de parcours, calendrier, fiches PDF | - | Moyen | ~12 U |

Total estime : ~85 U (FR) a ~170 U (avec en + es/de/ar MT), plus ~6 U de code. La relecture humaine es/de/ar (hors credit) reste le goulot pour lever le noindex.
Sequencement : traiter dans leur lot les 13 guides sans `verifiedDate` ; resorber les 9 orphelins par maillage entrant au passage (cout ~0) ; ne pas retraduire avant validation FR du lot.

## Annexe : inventaire des 95 guides FR (genere par script)

Colonnes : sources off./ext. = liens externes vers domaines officiels / tous liens externes dans le corps ; liens int. = sortants/entrants (vers autres guides FR) ; CFC = checklist, FAQ, nb de Callout ; langues = en/es/de/ar (ok = relu, MT = machineTranslated, - = absent). Aucune ligne n'a de `checkedDate`.

| translationKey | Titre | Cat. | Tags | Mots | Photo | verifiedDate | Src off./ext. | H2 | Liens int. s/e | CFC | en/es/de/ar |
|---|---|---|---|---|---|---|---|---|---|---|---|
| world-cup-2030-transport | Transports pour le Mondial 2030 au Maroc : aéroports, trains, routes | arrival | coupe du monde 2030, transports, LGV, aéroports | 744 | - | 2026-10-09 | 0/0 | 6 | 10/3 | --2 | ok/MT/MT/MT |
| sim-esim-morocco | Carte SIM ou eSIM au Maroc (2026) : prix, 5G et conseils | arrival | carte sim, esim, internet, 5g | 710 | - | 2026-10-10 | 0/0 | 5 | 0/14 | --2 | ok/MT/MT/MT |
| car-rental | Louer une voiture au Maroc : caution, assurance, code de la route | arrival | location de voiture, assurance, caution, code de la route | 559 | - | 2026-10-10 | 0/0 | 5 | 3/8 | --2 | ok/MT/MT/MT |
| airports | Aéroports de Rabat, Fès, Tanger, Agadir : rejoindre le centre | arrival | aéroport, taxi, bus, rabat | 537 | o | - | 0/0 | 6 | 10/14 | --2 | ok/MT/MT/MT |
| time-zone | Fuseau horaire du Maroc : retour à GMT toute l'année (sept. 2026) | arrival | fuseau horaire, gmt, ramadan, voyage | 506 | - | 2026-10-10 | 0/0 | 4 | 5/10 | --2 | ok/MT/MT/MT |
| marrakech-airport | Aéroport de Marrakech → médina : taxi, bus 19 et transferts | arrival | marrakech, aéroport, taxi | 497 | o | 2026-10-10 | 0/0 | 5 | 2/6 | --2 | ok/MT/MT/MT |
| scams-safety | Arnaques et sécurité au Maroc : pièges courants et parades | arrival | arnaques, sécurité, voyage, médina | 482 | - | 2026-10-10 | 0/0 | 4 | 6/5 | --2 | ok/MT/MT/MT |
| casablanca-airport | Aéroport de Casablanca vers le centre : train, taxi et prix (2026) | arrival | casablanca, aéroport, train, taxi | 465 | o | 2026-10-10 | 0/0 | 6 | 6/4 | --1 | ok/MT/MT/MT |
| tram-brt | Tramway et BRT à Casablanca et Rabat-Salé : lignes, tarifs, astuces | arrival | tramway, brt, casablanca, rabat | 379 | - | 2026-10-10 | 0/0 | 4 | 5/3 | --2 | ok/MT/MT/MT |
| ctm-supratours | Bus CTM et Supratours au Maroc : réserver, tarifs et conseils | arrival | bus, ctm, supratours, transport | 345 | - | 2026-10-10 | 0/0 | 4 | 5/9 | --2 | ok/MT/MT/MT |
| transport-apps | Taxis et applis VTC au Maroc : petit taxi, Careem, inDrive, Uber | arrival | taxi, applis, transport | 326 | - | 2026-10-10 | 0/0 | 4 | 2/10 | --0 | ok/MT/MT/MT |
| trains | Le train au Maroc : guide du TGV Al Boraq et de l'ONCF | arrival | train, al boraq, oncf, transport | 294 | o | 2026-10-10 | 0/0 | 5 | 3/16 | --1 | ok/MT/MT/MT |
| import-car-permanent-return | Dédouaner sa voiture au Maroc : retour définitif et MRE | demarches | voiture, dédouanement, retour définitif, douane | 1864 | - | - | 3/3 | 9 | 5/4 | --3 | ok/MT/MT/MT |
| retire-in-morocco | Prendre sa retraite au Maroc : pension, fiscalité et démarches | demarches | retraite, pension, fiscalité, retraité étranger | 1824 | - | 2026-10-09 | 4/10 | 10 | 12/3 | --3 | ok/MT/MT/MT |
| return-morocco-with-children | Retour au Maroc avec des enfants : école, équivalences et CNSS | demarches | retour au maroc, enfants, inscription scolaire, équivalence | 1331 | - | - | 0/0 | 7 | 5/2 | -o2 | ok/MT/MT/MT |
| repatriation-insurance-mre | Assurance rapatriement du corps pour les MRE : comment choisir | demarches | rapatriement du corps, assurance obsèques, mre, décès | 1279 | - | - | 2/2 | 8 | 4/1 | --2 | ok/MT/MT/MT |
| permanent-return | Retour définitif au Maroc : le guide MRE (douane, voiture, impôts) | demarches | retour définitif, déménagement, douane, retraite | 978 | - | 2026-10-10 | 0/0 | 5 | 7/11 | o-2 | ok/MT/MT/MT |
| life-certificate-pension | Certificat de vie au Maroc : retraités, pension étrangère et MRE | demarches | certificat de vie, retraite, pension, mre | 663 | - | 2026-10-16 | 1/4 | 7 | 4/0 | --3 | ok/MT/MT/MT |
| birth-certificate-civil-registry | Acte de naissance marocain : copie intégrale, Watiqa, consulat | demarches | acte de naissance, copie intégrale, watiqa, état civil | 650 | - | 2026-10-16 | 4/4 | 7 | 3/2 | --2 | ok/MT/MT/MT |
| civil-status | Mariage et état civil au Maroc : livret de famille, mariage mixte | demarches | mariage, état civil, livret de famille, mariage mixte | 645 | - | 2026-10-10 | 0/0 | 5 | 2/3 | o-3 | ok/MT/MT/MT |
| apostille | Apostille et légalisation de documents pour le Maroc : le guide | demarches | apostille, légalisation, documents, état civil | 598 | - | 2026-10-10 | 0/0 | 5 | 4/7 | --3 | ok/MT/MT/MT |
| buy-car-morocco-mre | Acheter une voiture au Maroc : neuve, occasion, carte grise | demarches | voiture, achat, carte grise, vignette | 564 | - | - | 3/4 | 6 | 4/5 | --3 | ok/MT/MT/MT |
| residence-permit | Carte de séjour au Maroc : démarches, documents et délais (2026) | demarches | carte de séjour, titre de séjour, résidence, expatrié | 541 | - | 2026-10-10 | 0/0 | 4 | 3/3 | --2 | ok/MT/MT/MT |
| amo-health-return-mre | Assurance maladie AMO après le retour au Maroc (MRE) | demarches | amo, cnss, assurance maladie, retour définitif | 527 | - | - | 1/4 | 5 | 6/4 | --2 | ok/MT/MT/MT |
| passport-cnie | Renouveler son passeport et sa CNIE marocains depuis l'étranger | demarches | passeport, cnie, consulat, mre | 491 | - | 2026-10-10 | 1/1 | 4 | 1/3 | o-2 | ok/MT/MT/MT |
| business-auto-entrepreneur-mre | Créer une entreprise ou devenir auto-entrepreneur au Maroc | demarches | auto-entrepreneur, entreprise, cnss, impôts | 488 | - | - | 2/3 | 6 | 5/3 | --2 | ok/MT/MT/MT |
| parcels-moving-europe-morocco | Colis et déménagement Europe ↔ Maroc : douane et démarches | demarches | déménagement, colis, douane, retour définitif | 479 | - | - | 0/4 | 6 | 5/3 | --2 | ok/MT/MT/MT |
| rent-long-term-mre | Louer un logement à l'année au Maroc : guide pour MRE | demarches | location, bail, logement, loi 67-12 | 466 | - | - | 2/3 | 7 | 6/4 | --2 | ok/MT/MT/MT |
| e-visa | e-Visa Maroc : qui peut le demander, comment et à quel prix | demarches | e-visa, visa, acces-maroc, entrée au maroc | 451 | - | 2026-10-10 | 0/0 | 4 | 3/2 | --2 | ok/MT/MT/MT |
| travel-insurance-compare-mre | Assurance voyage et rapatriement au Maroc : critères à comparer | demarches | assurance voyage, rapatriement, mre, santé | 432 | - | - | 0/0 | 4 | 2/0 | --1 | ok/MT/MT/MT |
| driving-licence | Conduire au Maroc avec un permis étranger : durée et échange | demarches | permis de conduire, permis international, échange de permis, location voiture | 414 | - | 2026-10-10 | 0/0 | 4 | 4/1 | o-2 | ok/MT/MT/MT |
| visa-90-days | Visa Maroc et règle des 90 jours : ce que les nomades doivent savoir | demarches | visa, 90 jours, carte de séjour | 368 | - | 2026-10-10 | 0/0 | 4 | 2/10 | --1 | ok/MT/MT/MT |
| customs | Douane au Maroc : ce que vous pouvez apporter (drone, médicaments) | demarches | douane, drone, médicaments, adii | 282 | - | 2026-10-10 | 0/0 | 5 | 3/7 | --2 | ok/MT/MT/MT |
| property-taxes | Impôts sur la vente et la location d'un bien au Maroc (MRE) | immobilier | fiscalité, plus-value, location, tpi | 874 | - | 2026-10-10 | 1/1 | 4 | 3/6 | o-2 | ok/MT/MT/MT |
| build-house | Construire sa maison au Maroc depuis l'étranger : permis et pièges | immobilier | construction, permis de construire, rokhas, architecte | 599 | - | 2026-10-10 | 0/0 | 4 | 3/1 | --2 | ok/MT/MT/MT |
| short-term-rental | Location courte durée au Maroc : règles, autorisation et fiscalité | immobilier | location courte durée, airbnb, loi 80-14, meublé touristique | 525 | - | - | 0/0 | 5 | 2/8 | o-2 | ok/MT/MT/MT |
| property-inheritance | Héritage d'un bien immobilier au Maroc : les étapes pour les MRE | immobilier | héritage, succession, acte d'hérédité, adoul | 517 | - | - | 0/0 | 4 | 3/4 | --2 | ok/MT/MT/MT |
| power-of-attorney | Procuration pour un bien immobilier au Maroc : guide MRE | immobilier | procuration, notaire, mandataire, mre | 477 | - | 2026-10-10 | 0/0 | 5 | 3/4 | --2 | ok/MT/MT/MT |
| buy-property-abroad | Acheter un bien au Maroc depuis l'étranger : le guide MRE | immobilier | immobilier, mre, notaire, titre foncier | 374 | - | 2026-10-10 | 0/0 | 7 | 4/11 | --2 | ok/MT/MT/MT |
| mre-mortgage | Crédit immobilier MRE au Maroc : taux, apport et documents | immobilier | crédit immobilier, mre, banque, immobilier | 360 | - | 2026-10-10 | 0/0 | 4 | 3/4 | --2 | ok/MT/MT/MT |
| daam-sakane | Daam Sakane : l'aide au logement de 70 000 à 100 000 DH pour les MRE | immobilier | daam sakane, aide logement, mre | 275 | - | 2026-10-10 | 0/0 | 3 | 1/4 | --3 | ok/MT/MT/MT |
| world-cup-2030-stadiums | Stades du Mondial 2030 au Maroc : statut officiel au 9 octobre 2026 | living | coupe du monde 2030, stades, Benslimane, Grand Stade Hassan II | 812 | - | 2026-10-09 | 0/1 | 5 | 4/4 | --2 | ok/MT/MT/MT |
| world-cup-2030-trip-planning | Préparer son séjour au Mondial 2030 au Maroc : guide pratique | living | coupe du monde 2030, billetterie, calendrier, voyage | 712 | - | 2026-10-09 | 0/1 | 7 | 13/3 | --2 | ok/MT/MT/MT |
| world-cup-2030-where-to-stay | Se loger pendant la Coupe du monde 2030 au Maroc : villes et quartiers | living | coupe du monde 2030, hébergement, où loger, hôtels | 691 | - | 2026-10-09 | 0/0 | 6 | 11/3 | --2 | ok/MT/MT/MT |
| health-travellers | Santé au Maroc pour les voyageurs : assurance, pharmacies, urgences | living | santé, assurance voyage, pharmacie, urgences | 491 | - | 2026-10-10 | 0/0 | 5 | 5/8 | --2 | ok/MT/MT/MT |
| nomad-cities | Les meilleures villes du Maroc pour les digital nomads (2026) | living | digital nomad, télétravail, villes | 451 | - | 2026-10-10 | 0/0 | 9 | 3/10 | --1 | ok/MT/MT/MT |
| world-cup-2030 | Coupe du monde 2030 au Maroc : villes hôtes, stades et conseils voyage | living | coupe du monde 2030, football, villes hôtes, stades | 448 | - | 2026-10-10 | 0/0 | 5 | 10/6 | --3 | ok/MT/MT/MT |
| holidays-2027 | Jours fériés et Ramadan 2027 au Maroc (prévisionnel) | living | jours fériés, ramadan, aïd, calendrier | 447 | - | 2026-10-10 | 0/0 | 4 | 2/5 | --2 | ok/MT/MT/MT |
| moroccan-food | Cuisine marocaine : les plats à goûter, de la harira au tajine | living | cuisine, tajine, couscous, street food | 439 | o | 2026-10-10 | 0/0 | 5 | 5/2 | --2 | ok/MT/MT/MT |
| hammam | Hammam marocain : déroulé, prix et étiquette (public ou spa) | living | hammam, spa, bien-être, savon noir | 417 | - | 2026-10-10 | 0/0 | 5 | 5/0 | --2 | ok/MT/MT/MT |
| international-schools | Écoles internationales au Maroc : françaises, US, britanniques | living | école, scolarité, aefe, expatriés | 414 | - | 2026-10-10 | 0/0 | 4 | 3/1 | --2 | ok/MT/MT/MT |
| internet-coworking | Internet et coworking au Maroc : fibre, 5G, prix, télétravail | living | fibre, internet, coworking, télétravail | 414 | - | 2026-10-10 | 0/0 | 5 | 5/1 | o-2 | ok/MT/MT/MT |
| etiquette | Culture et savoir-vivre au Maroc : usages, tenue, hospitalité | living | culture, savoir-vivre, étiquette, hospitalité | 403 | - | 2026-10-10 | 0/0 | 7 | 6/0 | --2 | ok/MT/MT/MT |
| darija-phrases | Darija pour voyageurs : 30 phrases d'arabe marocain utiles | living | darija, langue, culture | 274 | - | 2026-10-10 | 0/0 | 5 | 2/4 | --2 | ok/MT/MT/MT |
| transfer-savings-mre | Transférer son épargne vers le Maroc : guide MRE (2026) | money | epargne, transfert, mre, office des changes | 696 | - | 2026-10-16 | 0/0 | 6 | 4/0 | --1 | ok/MT/MT/MT |
| mre-taxes | Impôts des MRE : ce qu'il faut déclarer au Maroc et à l'étranger | money | fiscalité, mre, convention fiscale, non-résident | 573 | - | 2026-10-10 | 1/1 | 5 | 4/4 | o-2 | ok/MT/MT/MT |
| bank-account | Ouvrir un compte bancaire au Maroc : MRE, étrangers, nomades | money | compte bancaire, dirhams convertibles, mre, banque | 533 | - | 2026-10-10 | 0/0 | 4 | 7/5 | --2 | ok/MT/MT/MT |
| cash-atms | Argent au Maroc : liquide, distributeurs, carte et Wise (2026) | money | argent, distributeur, wise, dirham | 462 | - | 2026-10-10 | 0/0 | 5 | 1/12 | --2 | ok/MT/MT/MT |
| cost-of-living | Coût de la vie au Maroc en 2026 : budget mensuel pour nomades | money | coût de la vie, budget, loyer | 419 | - | 2026-10-10 | 1/1 | 6 | 6/5 | --0 | ok/MT/MT/MT |
| tipping | Pourboire au Maroc : combien, à qui et quand (2026) | money | pourboire, argent, savoir-vivre | 275 | - | 2026-10-10 | 0/0 | 3 | 2/10 | --1 | ok/MT/MT/MT |
| send-money | Envoyer de l'argent au Maroc : comparer et payer moins (2026) | money | transfert, mre, wise, change | 234 | - | 2026-10-10 | 0/0 | 3 | 1/6 | --1 | ok/MT/MT/MT |
| cheap-flights-europe-morocco | Vols pas chers Europe-Maroc : compagnies, aéroports, astuces | retour | vols, avion, mre, low cost | 1653 | - | 2026-10-09 | 2/2 | 8 | 10/0 | --2 | ok/MT/MT/MT |
| kids-pets | Voyager au Maroc avec enfants et animaux : papiers et démarches | retour | enfants, animaux, autorisation de sortie, chien | 873 | - | 2026-10-10 | 0/0 | 3 | 2/3 | o-4 | ok/MT/MT/MT |
| summer-checklist | Check-list du retour d'été au Maroc : le rétroplanning MRE | retour | checklist, retour au bled, marhaba, mre | 819 | - | 2026-10-10 | 1/1 | 4 | 12/8 | o-2 | ok/MT/MT/MT |
| car-insurance | Assurance auto pour le Maroc : carte verte MA ou assurance frontière | retour | assurance auto, carte verte, assurance frontière, mre | 623 | - | 2026-10-10 | 1/1 | 5 | 3/8 | --2 | ok/MT/MT/MT |
| motorway | Autoroute depuis Tanger Med : itinéraire, péages et aires de repos | retour | autoroute, péage, tanger med, adm | 606 | - | 2026-10-10 | 0/0 | 4 | 5/9 | --3 | ok/MT/MT/MT |
| marhaba-2027 | Marhaba 2027 : dates, ports, réservations et conseils | retour | marhaba, mre, été, 2027 | 413 | o | - | 0/0 | 5 | 5/1 | --3 | ok/MT/MT/MT |
| marhaba-guide | Opération Marhaba : le guide pratique du retour au bled | retour | marhaba, mre, été | 400 | o | 2026-10-10 | 0/0 | 4 | 7/9 | --2 | ok/MT/MT/MT |
| ferry-guide | Ferry pour le Maroc : lignes, durées, prix et conseils (2026) | retour | ferry, mre, tanger med | 344 | o | 2026-10-10 | 0/0 | 3 | 3/12 | --0 | ok/MT/MT/MT |
| car-180-days | Voiture MRE au Maroc : la règle des 180 jours et les papiers | retour | voiture, douane, mre | 266 | - | 2026-10-10 | 0/0 | 3 | 4/11 | --1 | ok/MT/MT/MT |
| where-to-stay-merzouga | Où dormir à Merzouga : bivouac, camp de luxe ou auberge ? | stay | merzouga, bivouac, erg chebbi, désert | 982 | o | 2026-10-10 | 2/5 | 7 | 6/1 | --2 | ok/MT/MT/MT |
| where-to-stay-nador | Où loger à Nador : centre, Beni Enzar ou lagune de Marchica ? | stay | nador, hébergement, mre, beni enzar | 801 | o | 2026-10-10 | 4/7 | 5 | 9/3 | --2 | ok/MT/MT/MT |
| where-to-stay-ouarzazate | Où loger à Ouarzazate : ville, kasbah ou Aït Ben Haddou ? | stay | ouarzazate, hébergement, kasbah, aït ben haddou | 724 | o | 2026-10-10 | 3/6 | 6 | 8/0 | --2 | ok/MT/MT/MT |
| where-to-stay-taghazout | Où dormir à Taghazout : village, Tamraght, Imsouane ou Agadir ? | stay | taghazout, tamraght, imsouane, surf camp | 700 | - | 2026-10-10 | 2/5 | 9 | 7/0 | --2 | ok/MT/MT/MT |
| where-to-stay-meknes | Où loger à Meknès : médina, riad ou Ville Nouvelle (Hamria) ? | stay | meknès, riad, hébergement, médina | 666 | o | 2026-10-10 | 0/5 | 8 | 6/0 | --2 | ok/MT/MT/MT |
| where-to-stay-al-hoceima | Où loger à Al Hoceïma : centre, plages et parc national | stay | al hoceïma, hébergement, mre, plage | 635 | o | 2026-10-10 | 2/7 | 5 | 10/3 | --2 | ok/MT/MT/MT |
| where-to-stay-tetouan-mdiq | Où loger à Tétouan et M'diq : médina, Martil ou bord de mer ? | stay | tétouan, m'diq, martil, cabo negro | 517 | o | 2026-10-10 | 1/7 | 6 | 11/3 | --2 | ok/MT/MT/MT |
| where-to-stay-oujda | Où loger à Oujda : médina, centre ou Saïdia pour la plage ? | stay | oujda, saïdia, hébergement, mre | 495 | o | 2026-10-10 | 3/6 | 6 | 8/3 | --2 | ok/MT/MT/MT |
| where-to-stay-marrakech | Où loger à Marrakech : les meilleurs quartiers selon votre séjour | stay | marrakech, riad, logement | 358 | o | 2026-10-10 | 0/0 | 5 | 1/8 | --1 | ok/MT/MT/MT |
| where-to-stay-casablanca | Où loger à Casablanca : Maârif, Gauthier, Anfa, Ain Diab, centre | stay | casablanca, quartiers, hébergement, hôtel | 354 | o | 2026-10-10 | 0/0 | 3 | 5/4 | --2 | ok/MT/MT/MT |
| where-to-stay-fes | Où loger à Fès : riad dans la médina ou Ville Nouvelle ? | stay | fès, riad, hébergement, médina | 341 | o | 2026-10-10 | 0/0 | 4 | 4/9 | --1 | ok/MT/MT/MT |
| riad-or-hotel | Riad ou hôtel au Maroc : lequel choisir selon votre voyage ? | stay | riad, hôtel, maison d'hôtes, appartement | 336 | - | 2026-10-10 | 0/0 | 4 | 8/4 | --2 | ok/MT/MT/MT |
| where-to-stay-chefchaouen | Où dormir à Chefchaouen : médina, Ras el-Maa, parking et conseils | stay | chefchaouen, riad, médina, hébergement | 299 | o | 2026-10-10 | 0/0 | 3 | 4/2 | --2 | ok/MT/MT/MT |
| where-to-stay-tangier | Où loger à Tanger : médina, Kasbah, ville nouvelle, Malabata, Corniche | stay | tanger, quartiers, hébergement, riad | 298 | o | 2026-10-10 | 0/0 | 3 | 7/3 | --2 | ok/MT/MT/MT |
| where-to-stay-agadir | Où loger à Agadir : front de mer, Founty, marina, Taghazout, Tamraght | stay | agadir, taghazout, plage, resort | 289 | o | 2026-10-10 | 0/0 | 3 | 5/3 | --2 | ok/MT/MT/MT |
| where-to-stay-rabat | Où loger à Rabat : Agdal, Hassan, médina et Oudayas, Souissi | stay | rabat, quartiers, hébergement, riad | 288 | o | 2026-10-10 | 0/0 | 3 | 5/4 | --2 | ok/MT/MT/MT |
| where-to-stay-essaouira | Où loger à Essaouira : médina, plage, route de Diabat et conseils | stay | essaouira, riad, médina, plage | 263 | o | 2026-10-10 | 0/0 | 2 | 4/3 | --2 | ok/MT/MT/MT |
| marrakech-day-trips | Excursions depuis Marrakech : Ouzoud, Ourika, Agafay, Imlil comparés | tours | excursion, marrakech, ouzoud, ourika | 470 | o | 2026-10-10 | 0/0 | 6 | 6/1 | --2 | ok/MT/MT/MT |
| toubkal | Ascension du Toubkal en 2 jours depuis Imlil : guide complet | tours | toubkal, randonnée, imlil, haut atlas | 450 | o | 2026-10-10 | 0/0 | 5 | 4/2 | --2 | ok/MT/MT/MT |
| merzouga-tour | Désert de Merzouga depuis Marrakech : 3 jours, itinéraire et conseils | tours | sahara, merzouga, excursion, désert | 422 | - | 2026-10-10 | 0/0 | 5 | 1/6 | --2 | ok/MT/MT/MT |
| dakhla | Dakhla et le kitesurf : saison, spots, accès et budget | tours | dakhla, kitesurf, lagune, sahara | 403 | - | 2026-10-10 | 0/0 | 5 | 5/2 | --2 | ok/MT/MT/MT |
| fes-merzouga | Fès → Merzouga : circuit désert de 3 jours, étapes et conseils | tours | désert, merzouga, fès, erg chebbi | 400 | - | 2026-10-10 | 0/0 | 4 | 4/3 | --2 | ok/MT/MT/MT |
| taghazout-surf | Surf à Taghazout et Agadir : spots, saison, cours et budget | tours | surf, taghazout, agadir, camp de surf | 399 | - | 2026-10-10 | 0/0 | 4 | 3/4 | --2 | ok/MT/MT/MT |
| chefchaouen-trip | Chefchaouen depuis Fès ou Tanger : excursion, bus et où dormir | tours | chefchaouen, excursion, bus, rif | 317 | - | 2026-10-10 | 0/0 | 4 | 3/6 | --1 | ok/MT/MT/MT |
| essaouira-day-trip | Essaouira depuis Marrakech : bus, excursion ou nuit sur place ? | tours | essaouira, excursion, bus | 244 | - | 2026-10-10 | 0/0 | 3 | 1/5 | --1 | ok/MT/MT/MT |

## Lot 1 (retour) : traite le 2026-10-17 en fr + en
Guides : marhaba-2027, operation-marhaba, voiture-180-jours, ferry, retour-definitif. es/de/ar retraduits depuis le FR corrige le 2026-10-17 (machineTranslated: true conserve, releves contre le FR : memes chiffres, liens, composants). Photos : voiture-180-jours (voiture-autoroute.jpg, CC BY 3.0) et retour-definitif (retour-rabat-bouregreg.jpg, CC BY-SA 4.0) ajoutees en 5 langues, credits dans CREDITS.md et methodologie fr/en.

## Lot 2 (demarches A) : traite le 2026-10-17 en fr + en
Guides : visa-90-days, e-visa, residence-permit, apostille, passport-cnie, driving-licence, customs. es/de/ar NON modifies et divergents (a retraduire), notamment : customs (drone = licence, engagement medicaments, 2 000 DH, 25 000 DH), visa-90-days (art. 42), residence-permit (art. 17), apostille (autorites, objection), driving-licence (1 an MRE, arrêté 02-11). Photo ajoutee : driving-licence seulement. verifiedDate : visa-90-days, residence-permit, apostille, customs ; retire : e-visa, passport-cnie, driving-licence.

## Lot 6 (demarches B) : traite le 2026-10-17 en fr + en
Guides : civil-status, birth-certificate-civil-registry, life-certificate-pension, amo-health-return-mre, return-morocco-with-children, business-auto-entrepreneur-mre, import-car-permanent-return. es/de/ar NON modifies et divergents (a retraduire), notamment : import-car-permanent-return (vieillissement 3 ans, retour definitif 6 mois, procuration refusee), amo-health-return-mre (stage 54 jours / 3 mois), civil-status (loi 55.19, art. 14-15, mariage mixte), business-auto-entrepreneur-mre (plafonds a verifier), return-morocco-with-children (rétroplanning), life-certificate-pension (scenarios, erreurs). Non traites car hors liste du plan : retire-in-morocco, short-term-rental, property-inheritance. Photo : import-car seulement (voiture-autoroute.jpg, deja creditee).

## Lot Coupe du monde 2030 : traite le 2026-10-17 en fr + en
Guides : world-cup-2030 (villes hotes), world-cup-2030-stadiums, world-cup-2030-transport, world-cup-2030-trip-planning, world-cup-2030-where-to-stay. Ajouts : forWho/delay/cost/FAQ, etapes (Roadmap), erreurs, checklist, liens fiches villes ; tableau des capacites aligne sur le guide stades (statut confirme/annonce/provisoire). Villes « proposees » (article FIFA du 11/12/2024 ne cite aucune ville). verifiedDate retire (faits de presse). Pas de nouvelle photo. es/de/ar NON modifies et divergents (a retraduire) : les 5 guides (villes hotes : table des capacites ; stades : statuts ; autres : ajouts FAQ/etapes/checklist).
