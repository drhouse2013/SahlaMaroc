# Images de lieux : architecture et règles

Périmètre : villes, régions, lieux à visiter, hero d'accueil. Les photos des guides (`src/utils/guidePhotos.ts`) suivent leurs propres règles (`docs/GUIDE_PHOTOS.md`). Inventaire chiffré : `docs/IMAGES-INVENTAIRE.md`. Crédits détaillés : `IMAGE_CREDITS.md`.

## Une seule porte d'accès : `src/utils/photos.ts`

```ts
placePhoto('city' | 'hero' | 'region' | 'spot', id, lang)
// id : id de ville (ou « home-hero »), id de région, « ville/lieu » pour un lieu
// => { image: ImageMetadata | null, alt, credit, source, status: 'verified' | 'placeholder' }
```

Aucun composant n'importe `src/assets/photos/` ni ne construit d'URL d'image de lieu. Il renvoie toujours un objet, jamais `null`.

- **verified** : fichier présent + auteur et licence reconnue dans `credit` (CC BY, CC BY-SA, CC0, domaine public, Unsplash/Pexels License) + `source` en https + pas de `"verified": false`. Règle : `src/utils/photoStatus.ts`, partagée avec les scripts.
- **placeholder** : `image: null`. Le composant affiche `PhotoPlaceholder`. Une entrée incomplète est donc traitée comme une absence : une photo dont la licence n'est pas tracée n'est jamais affichée.
- Région sans photo propre : photo (vérifiée) de sa ville chef-lieu, sinon placeholder.

## Composants

| Composant | Rôle |
|---|---|
| `PlaceImage.astro` | `<picture>` avif + webp (`widths`, `sizes`, largeur/hauteur explicites, `lazy` sauf `eager`) ou placeholder. Le parent fournit `position: relative` et le ratio : aucun décalage de mise en page. |
| `PhotoPlaceholder.astro` | Fond ivoire/vert, motif losange discret, icône du type de lieu, mention visible « Photo à venir » (clés i18n `photo.soon`, `photo.soonFor`, 5 langues), `role="img"` + `aria-label`, attribut `data-placeholder`. Jamais une fausse photo. |
| `SpotsGallery`, `CityImage`, `PlaceHero`, `RegionsHub` (cartes) | passent par `placePhoto` + `PlaceImage`. `CityImage` garde l'illustration SVG pour les scènes thématiques (sahara, atlas, souk, riad) qui ne sont pas des lieux. |

## Ajouter une photo

1. Déposer le fichier dans `src/assets/photos/{cities,regions,spots}/` (JPEG, 1400 à 1600 px de large, recadré, sans texte ni filigrane).
2. Ajouter l'entrée au `manifest.json` du dossier : `file`, `alt` (fr, en, es, de, ar), `credit` (« Auteur, CC BY-SA 4.0 »), `source` (page de la photo, https). Clé : id de ville, id de région, ou `ville/lieu`.
3. Vérifier visuellement que la photo montre le lieu exact. Doute : ne pas ajouter ; le placeholder reste.
4. `npm run images:inventory`, mettre à jour `IMAGE_CREDITS.md`, puis `npm run build`.

## Formats et poids

Sortie avif + webp (repli `<img>` webp). L'avif est lent à encoder (environ 1 s par variante), mais le cache d'Astro (`node_modules/.astro`) évite de le refaire. Hero : `widths` 640/1024/1600 ; cartes : 480/720.

## Candidats via API (facultatif) : `tools/fetch-place-photos.mjs`

`npm run images:candidates` (`--limit`, `--per`, `--only ville/lieu`). Variables dans `.env.local` (jamais préfixées `PUBLIC_`, jamais commitées) :

```
UNSPLASH_ACCESS_KEY=   # https://unsplash.com/developers
PEXELS_API_KEY=        # https://www.pexels.com/api/
```

Sans clé, le script s'arrête avec un message. Avec clé, il cherche pour chaque lieu sans photo vérifiée et écrit `docs/IMAGES-CANDIDATS.md`. Il ne télécharge rien et n'intègre rien : chaque candidat est validé à la main (lieu exact, auteur, licence).

### Pourquoi on ne télécharge que ce que la licence permet

- **Unsplash.** Les directives de l'API (https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines) imposent, pour tout usage d'une photo obtenue par l'API : le hotlinking des URL renvoyées (`photo.urls`), l'appel au point d'accès `download_location` quand l'utilisateur choisit une photo, et l'attribution d'Unsplash et du photographe avec un lien vers son profil (paramètres `utm_source`, `utm_medium=referral`). Notre site est statique : les images sont téléchargées, redimensionnées en avif/webp et servies par notre domaine, ce qui est incompatible avec le hotlinking exigé pour l'affichage via l'API. Nous n'utilisons donc l'API que pour trouver des candidats, jamais pour afficher. Une photo n'est adoptée que depuis sa page publique, sous la licence Unsplash affichée sur cette page, avec photographe et lien dans le manifeste. En cas de doute sur ce point, ne pas adopter la photo.
- **Pexels.** L'API demande un lien visible vers Pexels et le crédit du photographe avec un lien vers la page de la photo (https://www.pexels.com/api/documentation/). Même procédure : candidats seulement, adoption manuelle depuis la page de la photo, crédit conservé dans le manifeste. Licence : https://www.pexels.com/license/.
- **Photos de banque d'images non spécifiques.** Une photo « Maroc » générique ne remplace pas la photo du lieu : elle serait trompeuse. Sans photo du lieu exact, c'est le placeholder qui s'affiche.
- Débit : respecter les limites du fournisseur (Pexels : 200 requêtes/heure et 20 000/mois par défaut). Le script attend 1 s entre deux requêtes et s'arrête sur 401, 403 ou 429.

## Commandes

```
npm run images:inventory    # régénère docs/IMAGES-INVENTAIRE.md
npm run images:candidates   # candidats Unsplash/Pexels (si clés)
npm run check:content && npm run build
```
