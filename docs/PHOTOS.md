# Photos : liste prioritaire, règles et ajout au projet

Objectif : remplacer les illustrations maison par de vraies photos de terrain sur 22 guides très visibles (la différence du site est la présence sur place, voir `docs/PLAN.md`).

## 1. Les 22 photos prioritaires

`translationKey` = valeur réelle du frontmatter (identique dans toutes les langues). Le nom de fichier suit le sujet.

| # | Fichier | Sujet | Guide (translationKey) | Cadrage |
|---|---|---|---|---|
| 1 | marhaba-port.jpg | File de voitures et ferries au port de Tanger Med | marhaba-guide | Paysage 16:9, vue large, lumière du matin |
| 2 | ferry-quai.jpg | Embarquement sur un ferry (quai, panneaux) | ferry-guide | Paysage, hauteur des yeux, panneaux lisibles |
| 3 | train-al-boraq.jpg | Rame Al Boraq en gare | trains | Paysage, rame entière, sans voyageurs identifiables |
| 4 | aeroport-casablanca.jpg | Hall des arrivées de l'aéroport Mohammed V | casablanca-airport | Paysage, signalétique train/taxi visible |
| 5 | aeroport-marrakech.jpg | Sortie de l'aéroport Marrakech-Menara, taxis | marrakech-airport | Paysage, zone taxis et navettes |
| 6 | riad-marrakech.jpg | Patio de riad avec fontaine | where-to-stay-marrakech | Paysage, patio centré, lumière douce |
| 7 | fes-medina.jpg | Vue sur la médina de Fès | where-to-stay-fes | Paysage, point de vue en hauteur |
| 8 | chefchaouen-ruelle.jpg | Ruelle bleue de Chefchaouen | where-to-stay-chefchaouen | Paysage, sans passants de face |
| 9 | essaouira-remparts.jpg | Remparts et port d'Essaouira | where-to-stay-essaouira | Paysage, heure dorée |
| 10 | tanger-baie.jpg | Baie et médina de Tanger | where-to-stay-tangier | Paysage, depuis la kasbah |
| 11 | casablanca-hassan2.jpg | Mosquée Hassan II depuis la corniche | where-to-stay-casablanca | Paysage, ciel dégagé |
| 12 | rabat-oudayas.jpg | Kasbah des Oudayas | where-to-stay-rabat | Paysage |
| 13 | agadir-plage.jpg | Front de mer d'Agadir | where-to-stay-agadir | Paysage large |
| 14 | merzouga-dunes.jpg | Dunes de l'Erg Chebbi au lever du soleil | where-to-stay-merzouga | Paysage 16:9, dunes en ligne de fuite |
| 15 | desert-camp.jpg | Camp de tentes dans le désert | merzouga-tour | Paysage, camp et dunes, de jour |
| 16 | route-fes-merzouga.jpg | Route dans l'Atlas ou la vallée du Ziz | fes-merzouga | Paysage, route en perspective |
| 17 | taghazout-vagues.jpg | Spot de surf et village de Taghazout | where-to-stay-taghazout | Paysage, surfeurs de loin |
| 18 | distributeur-atm.jpg | Distributeur de billets en ville | cash-atms | Plan large de l'extérieur, aucune donnée à l'écran |
| 19 | souk-marche.jpg | Étal de souk avec prix affichés | tipping | Paysage, sans visages identifiables |
| 20 | hammam-interieur.jpg | Hammam traditionnel, lieu vide | hammam | Paysage, aucune personne |
| 21 | cuisine-tajine.jpg | Tajine servi sur une table | moroccan-food | Cadrage zénithal, lumière naturelle |
| 22 | chantier-maison.jpg | Maison en construction, vue extérieure | build-house | Paysage, sans plaque ni voisin identifiable |

Ordre conseillé : 1 à 5 (trafic estival MRE), puis 6 à 14.

## 2. Règles

### Droit à l'image et droits d'auteur

- Photos prises par vous, ou libres de droits avec licence compatible (conserver la preuve). Ne pas copier de photos trouvées en ligne.
- Personnes : pas de visage reconnaissable sans accord écrit. Privilégier plans larges, personnes de dos ou absentes. Pas d'enfants identifiables.
- Pas de plaques d'immatriculation lisibles, de numéros de maison ni de données bancaires visibles.
- Lieux privés (riad, hôtel, chantier) : accord du propriétaire. Respecter les interdictions de photographier (sites officiels, installations portuaires ou militaires).
- Retirer les métadonnées EXIF de géolocalisation pour les lieux privés.

### Poids et format

- Source en JPG (ou PNG), 2400 px de large maximum, idéalement moins de 1,5 Mo. Astro génère les versions optimisées au build.
- Ratio paysage 16:9 ou 3:2 (la couverture est recadrée en `object-cover`).
- Nom de fichier en minuscules, sans accent ni espace.

### Texte alternatif (alt)

- Une phrase concrète décrivant ce qu'on voit (lieu, élément principal), 80 à 125 caractères, sans « photo de ».
- Exemple : `File de voitures en attente d'embarquement au port de Tanger Med`.
- Renseigner `heroAlt` dans chaque langue (fr, en, es, de, ar).

## 3. Ajouter une photo dans le projet

Mécanisme réel (`src/content.config.ts`, `src/layouts/ArticleLayout.astro`) :

- `heroImage` est de type `image()` : chemin **relatif vers un fichier dans `src/`**, pas dans `public/`. Astro l'optimise au build.
- `heroAlt` est le texte alternatif. `illustration` reste le repli : `cover = heroImage ?? illustration`. Rien à supprimer.
- `public/` est réservé aux fichiers statiques non optimisés (favicon, logo, og-default). `tools/raster.mjs` ne génère que `og-default.png` et `logo.png` depuis les SVG : **il ne traite pas les photos**.

Étapes :

1. Déposer la photo dans `src/assets/photos/` (dossier à créer au premier ajout), par exemple `src/assets/photos/marhaba-port.jpg`.
2. Dans le frontmatter de chaque article concerné (un par langue, même image), ajouter :

```yaml
heroImage: "../../../assets/photos/marhaba-port.jpg"
heroAlt: "File de voitures en attente d'embarquement au port de Tanger Med"
```

   Le chemin part du fichier `.mdx` : depuis `src/content/articles/<lang>/`, remonter de 3 niveaux jusqu'à `src/`.
3. Retrouver tous les fichiers d'un guide en cherchant `translationKey: "marhaba-guide"` dans `src/content/articles/`.
4. Lancer `npm run build` : un chemin faux provoque une erreur Astro explicite.
5. Une photo alimente aussi l'image Open Graph et le JSON-LD de l'article.

Les visuels de la page d'accueil et des pages ville utilisent encore `illustration(...)` (`src/components/home/CityGrid.astro`, `src/components/hubs/CityPage.astro`) : les remplacer par des photos demanderait une modification de code, hors de ce document.
