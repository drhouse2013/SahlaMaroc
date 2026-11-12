# Revue des photos des guides — 12 novembre 2026

Les 38 associations du manifeste éditorial utilisent 34 fichiers distincts. Avec les huit photographies génériques du système de guides, 42 photos distinctes ont été préparées en quatre planches puis examinées visuellement. Le script `tools/prepare-guide-thumbnail-review.mjs` reproduit cette préparation ; le dossier de sortie se passe en premier argument.

Les planches présentent un recadrage central 4:3. Elles ne reproduisent ni tous les ratios du site, ni les textes superposés. Elles ne prouvent pas les dates, lieux exacts et licences.

## Points relevés

- `marhaba-port.jpg` : ferry et installations lisibles, rendu terne ; ancienneté et renouvellement à vérifier.
- `grand-taxi-inezgane.jpg` : véhicule identifiable mais contre-jour prononcé ; renouvellement à étudier.
- `daam-sakane-logements.jpg` : route et poteaux dominants, logements éloignés ; améliorer la représentation du sujet sans suggérer que ces immeubles sont éligibles à une aide.
- `voiture-achat-garage-casablanca.jpg` : garage sombre ; ne représente pas une sélection ou une recommandation vérifiée de ce vendeur.
- `fuseau-horloge.jpg` : horloge petite et peu contrastée dans un grand mur ; rechercher un cadrage plus lisible.
- `taghazout-surf-2026.jpg` : vague et surfeurs identifiables mais image sombre ; vérifier le résultat derrière le traitement du guide.
- Les autres aperçus présentent des sujets identifiables à cette taille. Cela ne vaut pas validation intégrale de leur provenance ou de leur fraîcheur.

## Contrôle dans une page

Guide français du train, aperçu PR #70 après ae9734f : titre et introduction lisibles sur ordinateur ; photo thématique et titre lisibles à 390 × 844. La photo est plus sombre dans la page à cause du traitement destiné à rendre le texte lisible. Le nom de photographe est consultable via le bouton de crédit.

La mention d'affiliation est trop petite et son lien apparaît collé à la phrase qui précède. Correction du composant partagé `Disclosure.astro` : texte de 14 px, interligne accru, espace explicite avant le lien et icône SVG cohérente avec le site. Vérification du rendu après compilation encore à effectuer.

Le détecteur Impeccable exécuté une fois sur PlaceHero, PlaceImage et SpotsGallery n'a signalé aucun résultat. Ce résultat mécanique ne valide pas à lui seul la qualité visuelle, les dates ou les droits des photos.

Les jalons globaux de signature visuelle restent ouverts.
