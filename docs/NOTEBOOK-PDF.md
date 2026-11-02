# Carnet PDF

Le carnet propose une liste PDF A4 des favoris, avec leurs titres et liens absolus cliquables. Le document indique sa date de préparation et rappelle que les guides complets se consultent en ligne. Il complète l’impression native, l’export JSON et les fichiers HTML hors connexion existants.

La génération reste sur l’appareil. jsPDF et la police Amiri ne sont chargés que lors du clic PDF ; aucun favori n’est envoyé à un service de conversion. Une connexion est nécessaire pour ce premier chargement. Le lien de téléchargement reste visible après préparation pour les navigateurs qui ne lancent pas automatiquement le téléchargement.

La police libre embarquée couvre les caractères latins et arabes. Le texte logique est converti en ordre visuel pour le PDF arabe ; les URL restent écrites de gauche à droite. Les entrées sont limitées à 100 favoris et 200 caractères par titre, comme le carnet existant. Seuls les chemins internes des cinq langues sont admis. Les textes ne sont pas interprétés comme du HTML.

## Validation du 2 novembre 2026

- Téléchargements réellement récupérés depuis le navigateur en français et en arabe. PDF rendus avec Poppler et contrôlés visuellement : caractères accentués, lettres arabes liées, alignement RTL, titres mixtes, URL et pagination.
- Les annotations des PDF téléchargés pointent vers les pages favorites exactes. Les URL locales utilisées pour la recette seront celles du domaine public sur le site publié.
- Carnet vide : bouton désactivé. Favoris de contrôle ajoutés puis retirés, retour à zéro.
- Épreuve de 105 entrées longues : 100 liens inclus sur 20 pages ; dernière page inspectée. Chemin externe rejeté.
- Astro check : 185 fichiers, zéro erreur, zéro avertissement, 63 indications préexistantes.

Les guides complets, les photos et la carte ne sont pas incorporés dans ce PDF de favoris. L’archive HTML de textes reste disponible séparément.
