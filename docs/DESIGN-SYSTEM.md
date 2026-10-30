# Système de design — retour à l’habillage historique (30/10/2026)

Base visuelle : commit e15fe67, antérieur aux refontes éditoriales. Le nom « Aurora » n’apparaît pas dans l’historique : cette restauration reprend l’ancien habillage du dépôt, sans revendiquer l’installation d’un thème tiers identifié.

- Typographies auto-hébergées : Readex Pro pour les textes et titres, Marhey pour le logo. Préchargement latin/arabe selon la langue.
- Clair : fond #FBF8F3, surfaces blanches, texte #1B1A1F, marque bleu nuit #163A63, liens #1E3ABF, accent terre cuite #A8432F ; or réservé au décor.
- Sombre : fond #0F1626, surfaces #18223A, texte #F3ECE0, liens #B5C1FF.
- Accueil : halos or et indigo discrets repris de l’ancienne direction, filet de zellige photographié, trois parcours récents et vraies photos conservés.
- Cartes arrondies et ombres douces ; titres sans empattements, poids 650.
- Thème Système/Clair/Sombre, focus visible, réduction des animations, RTL et impression conservés.
- Sources : src/styles/global.css et src/layouts/BaseLayout.astro.

Les données, URL, calculateurs et contenus récents ne sont pas restaurés à leur état ancien.
