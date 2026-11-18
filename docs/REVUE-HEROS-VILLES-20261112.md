# Revue des héros de villes — 12 novembre 2026

Périmètre : aperçu de la PR #70 après le commit 8e46400, pages françaises. Les 31 liens ont été relevés dans la page `/fr/villes`, puis ouverts dans le navigateur.

## Vérifications effectuées

- 31 vues de héros examinées visuellement sur ordinateur, au format de fenêtre par défaut.
- 31 pages contrôlées dans un viewport de 390 × 844 : titre et référence d'image présents, aucun débordement horizontal mesuré.
- Examen visuel mobile supplémentaire de Meknès, Oujda, Taroudant et Kénitra.
- Tafraout a affiché brièvement son fond avant chargement ; une seconde observation confirme le chargement de l'image AVIF, 1280 × 853. Ce n'est pas une image manquante.
- Les titres restent lisibles sur leur panneau opaque ; les accents de couleur varient suivant les destinations.

Pages couvertes : Marrakech, Casablanca, Rabat, Tanger, Fès, Essaouira, Chefchaouen, Taghazout, Nador, Tétouan, Meknès, Ouarzazate, Oujda, Al Hoceïma, Merzouga, Tafraout, Agadir, Dakhla, Laâyoune, El Jadida, Saïdia, Guelmim, Tiznit, Sidi Ifni, Taroudant, Zagora, Errachidia, Ifrane, Asilah, Larache et Kénitra.

## Corrections et réserves

| Destination | Observation | Suite |
|---|---|---|
| Meknès | Le haut de Bab Mansour est coupé dans le héros ordinateur ; la place occupe le bas. L'original contient le haut du monument. | Point focal haut `[50, 0]`, à confirmer après déploiement. |
| Oujda | Le ciel domine ; la porte se trouve derrière le panneau de titre sur ordinateur. | Point focal bas `[50, 100]`, à confirmer après déploiement. |
| Taroudant | Plan de remparts très serré ; certaines crénelures sont déjà hors cadre dans la source. | Chercher une vue plus ample ; un réglage de point focal ne restitue pas le contenu absent. |
| Zagora | Le sommet du minaret reste très proche du bord supérieur dans le héros ordinateur. | Comparer un réglage distinct pour le héros et la miniature avant de modifier le point focal partagé. |
| Agadir | Contre-jour sur les dromadaires et les visiteurs. | Renouvellement de la photo de ville encore ouvert. |
| Errachidia | Brume et contraste faible sur la palmeraie. | Renouvellement encore ouvert. |
| Guelmim | Échafaudage visible dans la photo de la porte. | Vérifier l'ancienneté et trouver une vue actuelle sans chantier. |
| Dakhla | Sujet identifiable, mais ciel et sable occupent une grande part du héros. | Comparer une composition plus équilibrée à la source avant de conclure à une amélioration possible. |

Cette passe porte sur les héros, pas sur toutes les images des pages. Elle ne valide pas à elle seule les dates, droits, traductions, galeries, animations ou l'intégralité des thèmes. Les deux jalons globaux de signature visuelle restent ouverts.
