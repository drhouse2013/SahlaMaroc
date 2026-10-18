# Idées expert (16/10/2026)

Limites : recherche web rapide (3 requêtes), aucun forum MRE lu directement. La « demande » est donc déduite de guides concurrents et de l'actualité, pas de volumes de recherche mesurés. À valider dans Search Console avant de produire. Barèmes : toujours relire le décret / la DGI avant publication.

## 1. Guide + calculateur vignette (TSAV) pour véhicules MRE
- Demande : guide dédié chez un concurrent MRE https://www.lesmre.com/fr/guides/vignette-auto-maroc-paiement-en-ligne ; rappel DGI https://fnh.ma/article/actualites-marocaines/taxe-speciale-annuelle-vehicules-dgi
- Source officielle : DGI / vignette.ma (https://www.vignette.ma), barème par décret.
- Effort : moyen (page + petit barème par CV et carburant). Risque : moyen.
- Pourquoi : pic chaque janvier, sujet déjà cité dans 2 guides mais sans page propre (proposition 2 de l'audit).
- Réserve : les sources se contredisent (échéance 31 janvier vs 31 mars ; délai pour véhicule neuf 30 vs 60 jours ; exonération de la 1re année non confirmée). Écrire avec prudence, ne publier que les chiffres lus sur vignette.ma ou au décret. Pas « parfaite » tant que le barème n'est pas vérifié.

## 2. Certificat de vie pour retraités au Maroc (fiche dédiée)
- Demande : https://www.bladi.net/belgique-certificat-vie-bloquer-pension-maroc,122508.html ; https://www.demarchesmaroc.com/certificat-vie-pension-reversion-francaise-maroc/
- Source officielle : caisses (Assurance retraite, CMR, Info Retraite) ; l'appli « Mon certificat de vie » (2024) reste à confirmer côté caisse.
- Effort : faible (déjà un passage dans le guide retraite). Risque : moyen, procédures différentes par pays/caisse (autorité certificatrice, délai 1 vs 3 mois).
- Pourquoi : requête précise, peur de suspension de pension, peu de concurrence sérieuse. Écrire « selon votre caisse », jamais une règle unique.

## 3. Historique des cours officiels BAM dans le convertisseur
- Demande : le convertisseur EUR/MAD existe déjà avec un taux manuel ; les MRE comparent aux cours bancaires.
- Source : Bank Al-Maghrib https://www.bkam.ma (cours de référence publiés à 16h15 ; ils ne servent pas aux opérations réelles).
- Effort : moyen. Risque : élevé si automatisé (je n'ai pas confirmé d'API/CSV officiel ; les API tierces ont des incohérences).
- Pourquoi : crédibilité, mais mise à jour manuelle datée suffit. Mention obligatoire « indicatif, pas le taux de votre banque ».

## 4. Page « Documents d'état civil : acte de naissance, copie intégrale, pré-déclaration en ligne »
- RÉALISÉE le 2026-10-16 : guide `acte-de-naissance-maroc-copie-integrale-extrait-watiqa-mre` (5 langues).
- Demande : https://www.demarchesmaroc.com/obtenir-acte-de-naissance/
- Source officielle : portail état civil du ministère de l'Intérieur (nom exact du portail à vérifier avant d'écrire).
- Effort : moyen. Risque : moyen (apostille déjà couverte, éviter le doublon : faire un lien vers le guide apostille).
- Pourquoi : demande très courante, mais angle déjà partiellement traité ; valeur surtout en maillage interne.

## 5. Outil compteur de séjour fiscal 183 jours
- Demande : proposition 4 de l'audit ; sujet cité dans 3 guides.
- Source officielle : Code général des impôts, DGI https://www.tax.gov.ma ; règle de résidence aussi dépendante des conventions fiscales.
- Effort : faible (réutiliser CarDaysCounter). Risque : élevé : la résidence fiscale ne se réduit pas à 183 jours (foyer, centre d'intérêts, convention). Outil d'information seulement avec avertissement fort.
- Pourquoi : utile mais risque de conseil fiscal erroné. Moyennement « parfaite ».

## 6. Simulateur de frais de transfert (Wise, banque, mandat) daté
- Demande : article transferer-epargne/envoyer-argent existent ; la comparaison chiffrée manque (proposition 1 audit).
- Source officielle : tarifs publiés par chaque prestataire (pages tarifs) ; pas de source étatique.
- Effort : élevé (données qui vieillissent vite). Risque : élevé (tarifs changeants, conflit avec affiliation Wise : mention obligatoire).
- Pourquoi : forte valeur de monétisation, mais fragile. À faire seulement avec date et lien vers chaque grille.

## 7. Guide Marhaba : attentes par port et saison
- Demande : pic juin-septembre chaque année (article Marhaba 2027 déjà présent).
- Source : Fondation Mohammed V / site officiel Marhaba ; temps d'attente non publiés de façon fiable à ma connaissance.
- Effort : moyen. Risque : élevé (chiffres d'attente anecdotiques). Faire une page mise à jour chaque mai, sans chiffres inventés.
- Pourquoi : redondant avec l'existant ; ajouter seulement si des données officielles existent.

## 8. FAQ structurée (FAQPage) sur les 10 guides les plus lus
- Demande : questions récurrentes dans les guides concurrents ; gain de rich results incertain (Google limite l'affichage FAQ).
- Source : le contenu déjà vérifié du site.
- Effort : faible. Risque : faible. Pourquoi : amélioration UX/SEO sans nouveau fait, mais gain SEO non garanti.

## 9. Page « Mettre à jour / dater » visible (bloc « Dernière vérification » + sources par guide)
- Demande : confiance, sujet à fortes variations réglementaires.
- Source : les `verifiedDate` existants (5 manquants à régulariser).
- Effort : faible. Risque : faible. Honnête : n'affiche que la vérification réellement faite.

## 10. Checklist imprimable « avant départ » par profil (PDF)
- Demande : déjà dans IDEES-ARTICLES ; checklist-retour-ete-mre existe.
- Source : contenu interne.
- Effort : faible. Risque : faible. Intérêt : rétention et partage, pas de gain d'index direct.

## Top 3
1. Vignette TSAV (idée 1), si barème vérifié sur vignette.ma.
2. Certificat de vie (idée 2), faible effort, intention claire.
3. FAQ structurée + dates de vérification visibles (idées 8-9), sans risque factuel.

## 11. Extrait de casier judiciaire (bulletin n°3) pour MRE — REJETÉE le 2026-10-16
- Demande : https://www.demarchesmaroc.com/extrait-de-casier-judiciaire/ ; https://www.expat.com/fr/forum/afrique/maroc/930785-demande-dextrait-de-casier-judiciaire-marocain-en-ligne.html
- Raison du rejet : aucune source officielle lue (portail du ministère de la Justice non consulté ; recherche Firecrawl hors crédits). Les sources secondaires divergent (tribunal de naissance vs de domicile ; retrait physique vs consulat ; 10 DH et validité 3 mois non confirmés). À reprendre quand le portail officiel sera lisible.

## 12. Drones en voyage au Maroc — DÉJÀ COUVERT (2026-10-16)
- Le guide `douane-maroc-voyageurs-quoi-apporter` traite déjà les drones. Recherche : arrêté 386-15 (2015, licence préalable à l'importation), rappelé par la douane lors de la CAN 2025 (sources : presse, bladi.net, le360). Aucun texte officiel relu ce jour : rien ajouté.

## 13. FAQ structurée sur les articles — REPORTÉE (2026-10-16)
- `faqJsonLd` n'est utilisé que par CityPage. L'étendre aux guides demande un champ `faq` dans le schéma de contenu, des questions visibles sur chaque page et une relecture par langue ; gain Google non garanti (rich results FAQ limités). À faire en lot dédié, sans nouveau fait.

## 14. Médicaments en voyage (franchise sur justificatifs, psychotropes) — DÉJÀ COUVERT (2026-10-16)
- Sujets déjà traités dans `douane-maroc-voyageurs-quoi-apporter`, `sante-voyageurs-maroc-assurance-urgences` et `checklist-retour-ete-mre`. Recherche : sources = presse (bladi.net) et guide ADII 2012 (ccme.org.ma) ; aucun texte officiel actuel relu, aucun seuil de quantité publié. Rien ajouté. À reprendre si la page douane.gov.ma devient lisible.

## 15. Taxe d'habitation / taxe de services communaux pour MRE propriétaires — REJETÉE (2026-10-16)
- Demande : bladi.net (articles taxe d'habitation MRE 2025), le360, wafir.ma, upsilon-consulting.com.
- Raison : aucune source officielle (DGI, loi 47-06) lue ; les sources divergent sur l'abattement de 75 % (résidence principale seulement ou non), sur la TSC et sur les barèmes. Non confirmé, non chiffré. À reprendre uniquement après lecture de la loi 47-06 sur le site de la DGI.

## 16. Mise à jour du 2026-10-18 (cycle automatique)
- Idée 1 (vignette TSAV) : DÉJÀ RÉALISÉE (calculateur `VignetteCalc`, page `calcul-vignette-tsav-maroc`, barème lu à la DGI, FACTS.csv).
- Échange de permis étranger : DÉJÀ COUVERT (`conduire-maroc-permis-etranger-echange`). Recherche : accord Maroc-Portugal de reconnaissance réciproque des permis annoncé en juin 2026 (telquel.ma, presse) ; texte officiel NARSA non lu, donc non ajouté. À reprendre si la NARSA publie le texte.
- Aucune nouvelle idée avec source officielle exploitable ce jour (Firecrawl hors crédits, recherche limitée à la presse). Rien implémenté.
