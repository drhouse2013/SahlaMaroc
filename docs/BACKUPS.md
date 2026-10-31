# Sauvegardes GitHub

Le workflow `.github/workflows/backup-main.yml` crée un tag annoté pointant vers le commit exact de `main` :

- à chaque mise à jour de `main` ;
- chaque lundi à 03:17 UTC ;
- à la demande depuis l’onglet **Actions → Sauvegarde GitHub de main → Run workflow**.

Les tags suivent la forme `backup/main-<UTC>-<sha>-<run>`. Git réutilise les objets déjà présents dans l’historique : chaque tag marque un instantané sans recopier les fichiers du site. Chaque exécution reçoit son propre groupe de concurrence afin qu’une mise à jour rapide ne remplace pas une sauvegarde en attente.

## Restaurer un état

1. Choisir le tag voulu dans **Code → Tags** (ou via `git tag --list 'backup/main-*' --sort=-creatordate`).
2. Dans une copie propre du dépôt, partir de `main`, puis remplacer l’arbre suivi par Git par celui du tag :

   ```sh
   git fetch origin --tags
   git switch -c restore/site origin/main
   git read-tree --reset -u backup/main-<UTC>-<sha>-<run>
   git commit -m "Restore site from backup"
   git push -u origin restore/site
   ```

3. Ouvrir une pull request de `restore/site` vers `main`. Elle contiendra un nouveau commit qui remet les fichiers à l’état du tag ; vérifier son aperçu et ses contrôles avant de fusionner.

Pour éviter une suppression accidentelle des instantanés, ajouter dans les réglages GitHub une règle de tags pour le motif `backup/main-*` qui interdit leur mise à jour et leur suppression.

Ces sauvegardes restent dans le même dépôt GitHub. Elles permettent de revenir sur une modification ou une suppression de branche ; elles ne protègent pas contre la suppression du dépôt ou du compte. Pour ce risque, garder aussi un miroir du dépôt dans un autre compte ou fournisseur.
