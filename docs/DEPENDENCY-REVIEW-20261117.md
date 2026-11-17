# Mise à jour des dépendances — 17 novembre 2026

Mise à jour compatible du verrou : Astro 7.4.4 vers 7.4.12, intégrations Markdown/MDX et dépendances transitives dans les plages déclarées. Aucun changement majeur forcé.

Validation locale : 81 tests unitaires réussis ; Astro check sur 217 fichiers, 0 erreur et 0 avertissement. Construction complète à vérifier avant fusion.

L’audit reste en échec sur GHSA-fc5q-39xc-vjpf (picomatch <=4.0.7). Le registre propose toujours 4.0.7 et l’avis officiel indique aucune version corrigée : https://github.com/advisories/GHSA-fc5q-39xc-vjpf . Les alertes des parents sont propagées depuis cette dépendance. Ne pas rétrograder Astro vers 5.x automatiquement et ne pas supprimer le contrôle pour obtenir un résultat vert.

Les corrections Astro documentées dans GHSA-mh32-jxcr-mh9f et GHSA-r3h5-4585-7x3w sont incluses dans la version 7.4.12. La portée de picomatch et une éventuelle mitigation doivent être étudiées séparément ; ce document ne déclare pas le risque résolu.

## Portée observée dans ce dépôt

`astro.config.mjs` définit `output: static` et aucun adaptateur de serveur. Le code applicatif ne référence ni picomatch, ni tinyglobby, ni micromatch ; les motifs glob de contenu sont des constantes dans `src/content.config.ts`. Cela réduit l’exposition directe aux motifs fournis par les visiteurs, mais ne supprime pas la dépendance vulnérable dans la chaîne de construction. Le contrôle reste en échec et aucune exception n’est ajoutée.
