# Cache des images pendant les contrôles

Le workflow Qualité du site restaure uniquement les images déjà transformées dans `node_modules/.astro/assets`, après `npm ci`. Les tests unitaires, le contrôle du contenu, le build, le contrôle des pages produites et l’audit des dépendances restent exécutés à chaque passage.

La clé comprend le système du runner, les dépendances, la configuration Astro et les fichiers de `src/assets` et `public`. En cas de changement d’image, un cache précédent compatible avec les mêmes dépendances/configuration peut être restauré : Astro reconnaît les variantes par leur nom haché et régénère les fichiers manquants. Les données de contenu et les autres fichiers de `node_modules/.astro` ne sont pas mis en cache.

Action officielle : https://github.com/actions/cache, version majeure5 figée au commit `caa296126883cff596d87d8935842f9db880ef25` (runtime Node24).

## Vérifier le gain

Le premier passage peut être à froid. Après sa réussite et la sauvegarde du cache, un second passage compatible doit annoncer la restauration et des lignes `reused cache entry` dans le build. Comparer les durées des jobs avant de conclure à un gain. Aucun test n’est sauté en fonction du cache.
