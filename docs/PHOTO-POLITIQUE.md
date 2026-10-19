# Politique photo des guides (validée par le propriétaire, 19/10/2026)

Modèles validés : `acheter-bien-maroc-depuis-etranger` (immo-acheter-casa-2025.jpg) et `voiture-mre-maroc-regle-180-jours` (voiture-traversee-mre.jpg).

Pour chaque guide FR de ta liste (et ses 4 traductions, même translationKey) :
1. Évalue la photo actuelle (si présente) : on la garde seulement si elle est récente (2019+), réelle, nette, et montre clairement le SUJET de l'article.
2. Sinon, cherche sur Wikimedia Commons via l'API (`generator=search`, `prop=imageinfo`, `iiprop=url|size|extmetadata`, User-Agent « SahlaMaroc/1.0 », pause 1,5 s entre requêtes ; en cas de 429 pause 10 s) puis Openverse si besoin : paysage, largeur ≥ 2000 px, date ≥ 2019, licence CC0 / CC BY / CC BY-SA / domaine public. Requêtes concrètes liées au sujet (lieu, objet, scène : port, guichet, aéroport, chantier, gare…).
3. Choisis visuellement sur une planche-contact (sharp, vignettes 500 px) : sujet évident, pas de personne identifiable en gros plan, pas de document officiel réel, pas de filigrane, pas de thème juif.
4. Si aucune photo convenable : dessine une illustration 2D vectorielle propre (SVG, 1600×1000, palette du site : navy #1e2a4a, terracotta #c2562b, or #d4a017, sable #f4ead8, vert #006233 ; formes simples et lisibles, aucun texte), fichier `src/assets/illustrations/guides/<translationKey>.svg`.
5. Export photo : `src/assets/photos/<nom-court>.jpg`, 1600 px, JPEG mozjpeg ≤ 250 Ko (baisser la qualité par pas de 6).
6. Mets à jour `heroImage` + `heroAlt` (alt descriptif et daté, traduit) dans les 5 langues.
7. Crédit : une ligne dans `src/assets/photos/CREDITS.md` et une ligne dans `src/content/pages/fr/methodology.md` (avant `## Cartographie`) et `en/methodology.md` (avant `## Mapping`) : sujet (année), guide, auteur, [licence](url), [source](url). Rien pour les illustrations dessinées.
8. Ne réutilise pas la même photo pour deux guides. N'écris aucun autre contenu.
Contrôle final : `npm run check:content` (0 erreur). Pas de build. Rapport : 3 lignes (changées / gardées / dessinées).
