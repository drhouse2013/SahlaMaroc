# Check-list PDF « Retour d'été au Maroc » et lettre d'information

État au 9 octobre 2026. Ce document dit ce qui existe, ce qui reste à configurer et ce qui a réellement été testé.

## Ce que c'est

Une check-list imprimable (A4, 5 pages, noir et blanc, cases à cocher) en 5 langues : `public/downloads/sahla-checklist-retour-ete-<lang>.pdf` (fr, en, es, de, ar). Elle sert de « cadeau d'inscription » à la lettre d'information et de base au futur « kit d'installation au Maroc ».

Contenu : repris des guides déjà publiés (retour d'été, Marhaba, ferry, voiture/180 jours, assurance auto, douane, passeport/CNIE, enfants/animaux, santé). Chaque point est marqué **Règle** (exigence à confirmer auprès de l'autorité) ou **Conseil** (non obligatoire). Aucun tarif chiffré, aucune date d'obsolescence ; mention « édition octobre 2026 » et « vérifiez avant de partir ». Les versions es, de et ar portent la mention « traduction automatique en attente de relecture », comme les articles correspondants (`machineTranslated`).

## Modèle choisi : aucun verrou factice

1. Le PDF est **toujours téléchargeable directement**, sans inscription (lien « Ou téléchargez-la directement » dans le bloc newsletter, carte `PdfDownload` sur la page `/checklists` et dans l'article check-list).
2. Dans le bloc newsletter, après un envoi réussi (endpoint configuré) ou l'ouverture de l'e-mail pré-rempli (mode `mailto`), un lien « Votre check-list est prête » apparaît en plus. Ce n'est qu'un lien vers le même fichier public : l'inscription n'est pas vérifiée et ne conditionne rien. Le texte du bloc le dit (`newsletter.pdfNoGate`).
3. **Aucun e-mail automatique de livraison n'est implémenté.** Le site est statique, sans backend ni fournisseur imposé.

## Fichiers

- `tools/build-pdf.mjs` : outil de développement, lancé à la main : `node tools/build-pdf.mjs [fr en es de ar]`. Rend le HTML avec Chromium via `playwright-core` (aucune dépendance ajoutée à `package.json` ; variables `PLAYWRIGHT_CORE`, `CHROMIUM_PATH`, `SITE_URL`).
- `tools/pdf/template.mjs` : gabarit HTML/CSS commun (A4, marges d'impression, pied de page avec marque, URL, date d'édition, pagination).
- `tools/pdf/content.<lang>.mjs` : textes par langue (modifier ici, jamais dans le PDF).
- `tools/pdf/fonts/` : Readex Pro, instances statiques 400/700 (latin + arabe), extraites des fichiers `@fontsource-variable/readex-pro` (licence OFL). Elles évitent une police variable lourde dans le PDF et rendent l'arabe correctement.
- `public/downloads/*.pdf` : PDF **commités** (le build Vercel n'en génère pas). Après toute modification de texte, relancer l'outil et commiter les PDF.
- `src/components/PdfDownload.astro` (carte de téléchargement, utilisable dans le MDX sans import), `src/components/Newsletter.astro` (cadeau d'inscription), `src/config/site.ts` (`checklistPdfPath`), clés `newsletter.pdf*` dans `src/i18n/ui/*.json`.
- Le pied de page affiche l'hôte de `SITE_URL` (voir `site.config.mjs`). Tant que le domaine définitif n'est pas branché, c'est `sahla-maroc.vercel.app`. Quand `sahlamaroc.com` est actif : `SITE_URL=https://sahlamaroc.com node tools/build-pdf.mjs`, puis commiter les PDF. Les liens vers les guides sont lus dans les frontmatters (`translationKey` vers `slug`) ; si un slug change, régénérer.

## Ce qui reste à configurer

- `PUBLIC_NEWSLETTER_ENDPOINT` (Vercel) : URL d'un service d'inscription acceptant un `POST` JSON `{ "email", "lang" }` et autorisant le CORS depuis le site. Sans cette variable, le formulaire ouvre un e-mail pré-rempli vers `CONTACT_EMAIL` (qui n'existe qu'une fois la boîte `@sahlamaroc.com` créée).
- Pour envoyer le PDF par e-mail : à configurer dans le fournisseur choisi (e-mail de bienvenue contenant le lien `https://<domaine>/downloads/sahla-checklist-retour-ete-<lang>.pdf`) ; non fait.
- Politique de confidentialité : à compléter quand un fournisseur est choisi (il traitera les adresses).
- Analytics : les événements `checklist_pdf_download` (libellé `newsletter-direct|newsletter-gift|card|hub|article:<lang>`) et `newsletter_signup` passent par `window.sahlaTrack` (Umami, uniquement si `PUBLIC_UMAMI_WEBSITE_ID` est défini).
- Relecture humaine des PDF es, de, ar, et vérification des règles avant toute réédition (ADII, Fondation Mohammed V, consulats).

## Ce qui a réellement été testé (9 octobre 2026)

Avec Playwright (Chromium) sur `astro dev`, `PUBLIC_NEWSLETTER_ENDPOINT` pointant vers un petit serveur HTTP local jouant le rôle de fournisseur (`POST /ok` renvoie 200, `POST /fail` renvoie 500), pages `/fr` et `/ar` :

- E-mail invalide : message d'erreur, lien cadeau non affiché.
- Endpoint local OK : requête reçue par le serveur local (`{"email":...,"lang":...}`, `Content-Type: application/json`), message de succès, lien cadeau affiché, téléchargement du bon PDF (`sahla-checklist-retour-ete-fr.pdf` / `-ar.pdf`).
- Endpoint en erreur (500) : message d'erreur, lien cadeau non affiché.
- Mode `mailto` (endpoint vide) : message « votre messagerie s'ouvre », lien cadeau affiché. L'ouverture réelle d'un client de messagerie n'a pas été testée (navigation `mailto:` interceptée dans le test).
- Lien direct du bloc newsletter, carte sur `/fr/checklists`, carte dans les articles fr/en/ar : présents, bon `href`, téléchargement déclenché.
- Événements `newsletter_signup` et `checklist_pdf_download` observés via un `window.umami` factice.

**Non testé** : un vrai fournisseur (Brevo, Buttondown, etc.), la réception d'une inscription réelle, la livraison d'un e-mail, le comportement CORS d'un service tiers, le rendu sur l'environnement Vercel.
