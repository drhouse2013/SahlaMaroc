# Check-list PDF « Retour d'été au Maroc » et lettre d'information

État au 10 octobre 2026. Ce document dit ce qui existe, ce qui reste à configurer et ce qui a réellement été testé.

## Ce que c'est

Une check-list imprimable (A4, 5 pages, noir et blanc, cases à cocher) en 5 langues : `public/downloads/sahla-checklist-retour-ete-<lang>.pdf` (fr, en, es, de, ar). Elle sert de « cadeau d'inscription » à la lettre d'information et de base au futur « kit d'installation au Maroc ».

Contenu : repris des guides déjà publiés (retour d'été, Marhaba, ferry, voiture/180 jours, assurance auto, douane, passeport/CNIE, enfants/animaux, santé). Chaque point est marqué **Règle** (exigence à confirmer auprès de l'autorité) ou **Conseil** (non obligatoire). Aucun tarif chiffré, aucune date d'obsolescence ; mention « édition octobre 2026 » et « vérifiez avant de partir ». Les versions es, de et ar portent la mention « traduction automatique en attente de relecture », comme les articles correspondants (`machineTranslated`).

## Modèle choisi : aucun verrou factice

1. Le PDF est **toujours téléchargeable directement**, sans inscription (lien « Ou téléchargez-la directement » dans le bloc newsletter, carte `PdfDownload` sur la page `/checklists` et dans l'article check-list).
2. Dans le bloc newsletter, après un envoi réussi (endpoint configuré) ou l'ouverture de l'e-mail pré-rempli (mode `mailto`), un lien « Votre check-list est prête » apparaît en plus. Ce n'est qu'un lien vers le même fichier public : l'inscription n'est pas vérifiée et ne conditionne rien. Le texte du bloc le dit (`newsletter.pdfNoGate`).
3. **L'envoi automatique du PDF par e-mail dépend d'un fournisseur à brancher** (section « Envoyer le PDF par e-mail »). Tant qu'aucun n'est configuré, rien n'est envoyé. Le site est statique, sans backend : l'e-mail est envoyé par le fournisseur, jamais par le site.

## Envoyer le PDF par e-mail (double opt-in)

Principe : le visiteur saisit son e-mail, le site envoie un POST de formulaire **public** au fournisseur (aucun secret côté navigateur), le fournisseur envoie l'e-mail de confirmation (double opt-in), puis un e-mail contenant le lien du PDF. Le site ne peut pas lire la réponse (requête `no-cors`) : il affiche donc « demande envoyée, confirmez par e-mail », jamais « vous êtes inscrit ». Une erreur réseau affiche le message d'erreur. Le PDF reste téléchargeable directement sans inscription.

### Comparatif (offres consultées sur les sites officiels le 10 octobre 2026 ; à revérifier avant de s'engager)

| | Brevo | MailerLite | Buttondown |
|---|---|---|---|
| Offre gratuite | « Free forever, no credit card » ; la page tarifs consultée n'affiche pas clairement le plafond d'envoi du plan gratuit : **à confirmer sur brevo.com/pricing** | Free : 250 abonnés max, 2 500 e-mails/mois, 3 formulaires, 3 automations. Au-delà de 250 abonnés, les envois sont bloqués | 100 premiers abonnés gratuits |
| Formulaire public en POST | Oui : code « HTML » ou « Simple HTML » du formulaire (champs `EMAIL`, `email_address_check`, `locale`) | Oui : code HTML du formulaire intégré (`fields[email]`, `ml-submit`, `anticsrf`) | Oui : endpoint `embed-subscribe` (champs `email`, `embed`), sans clé d'API |
| Double opt-in | Oui (option « Double confirmation », recommandée par Brevo) + e-mail « final » après confirmation | Activé par défaut sur chaque formulaire | Par défaut (statut `unactivated` jusqu'à confirmation) |
| E-mail avec le lien du PDF | E-mail de confirmation finale du formulaire (modèle modifiable) | Dans l'e-mail de double opt-in (« freebie ») ou via une automation « Completes a form » (3 automations en gratuit) | « Welcome email » (envoyé après confirmation), réglage Settings > Subscribing > Welcome |
| Hébergement | Serveurs dans l'UE (GCP Belgique, OVH France, selon Brevo) | Stockage dans l'UE (selon MailerLite) | Société américaine, se déclare conforme RGPD ; sous-traitants listés sur buttondown.com/legal/subprocessors |
| Point d'attention | Désactiver le CAPTCHA du formulaire (sinon le POST direct est refusé) | Idem : ne pas activer reCAPTCHA | Limite de 100 créations/jour par l'endpoint API ; pas d'automatisations en gratuit |

Sources : brevo.com/pricing, help.brevo.com (Create a sign-up form in Brevo ; Data storage location), mailerlite.com/pricing, mailerlite.com/help (double opt-in), docs.buttondown.com (building-your-subscriber-base, transactional-emails-welcome, api-subscribers-create), buttondown.com/pricing et /legal/gdpr-eu-compliance.

**Recommandation : Brevo** (hébergement UE, double opt-in natif, e-mail de confirmation finale personnalisable, formulaires gratuits) ; **MailerLite** si l'on préfère une interface plus simple et un e-mail par langue via des formulaires séparés (limite : 250 abonnés en gratuit) ; **Buttondown** pour le plus simple (un seul identifiant, pas de CAPTCHA) mais avec données aux États-Unis et un seul e-mail de bienvenue.

### Variables à définir (Vercel > Settings > Environment Variables, puis redéployer)

| Variable | Valeur |
|---|---|
| `PUBLIC_NEWSLETTER_PROVIDER` | `brevo`, `mailerlite` ou `buttondown` |
| `PUBLIC_NEWSLETTER_FORM_ID` | Brevo : URL complète du formulaire `https://xxxx.sibforms.com/serve/...` ; MailerLite : `<idCompte>/<idFormulaire>` (les deux nombres de l'URL `assets.mailerlite.com/jsonp/<idCompte>/forms/<idFormulaire>/subscribe` du code HTML) ; Buttondown : nom d'utilisateur de la newsletter |
| `PUBLIC_NEWSLETTER_FORM_ID_FR` / `_EN` / `_ES` / `_DE` / `_AR` | Facultatif : formulaire distinct par langue (e-mail de bienvenue dans la bonne langue). Sinon `PUBLIC_NEWSLETTER_FORM_ID` est utilisé pour toutes les langues |

Aucune de ces valeurs n'est secrète (ce sont des identifiants publics de formulaire). Ne jamais mettre de clé d'API dans une variable `PUBLIC_`. Si la valeur est absente ou invalide, un avertissement est affiché au build et le site retombe sur le comportement précédent (`PUBLIC_NEWSLETTER_ENDPOINT` en JSON s'il est défini, sinon e-mail pré-rempli). Priorité : fournisseur valide > endpoint JSON > mailto. Le code est dans `src/config/site.ts` (`newsletterProviderTarget`) et `src/components/Newsletter.astro`.

Lien à mettre dans l'e-mail (une ligne par langue, ou la bonne langue si un formulaire par langue) : `https://<domaine>/downloads/sahla-checklist-retour-ete-<lang>.pdf` avec `<lang>` = fr, en, es, de, ar. Les e-mails sont à rédiger par le propriétaire ; mentionner l'expéditeur, le motif de l'envoi et le lien de désinscription (ajouté par le fournisseur).

### Brevo

1. Créer un compte Brevo (gratuit), vérifier l'expéditeur (adresse ou domaine ; idéalement `@sahlamaroc.com` avec SPF/DKIM quand le domaine est actif).
2. Marketing > Forms > Create sign-up form > « Full page/embedded » ; nom interne ; activer « Enable GDPR fields » ; ajouter un seul champ Email (et le bloc GDPR avec lien vers la politique de confidentialité). **Ne pas ajouter de CAPTCHA** (le POST direct ne le franchit pas).
3. Choisir ou créer la liste d'accueil.
4. Étape Settings : « Double confirmation email » ; modèle « Default Template Double opt-in confirmation » (ou personnalisé, avec le texte de consentement). Activer **« Final Confirmation Email »** : c'est cet e-mail, envoyé après le clic de confirmation, qui contient le lien du PDF (Marketing > Templates > Email > « Default template - Final Confirmation » > le modifier).
5. Share > Embed > copier l'**URL du formulaire** (`https://xxxx.sibforms.com/serve/...`, visible dans le code HTML, attribut `action`) : c'est `PUBLIC_NEWSLETTER_FORM_ID`.
6. Pour un e-mail par langue : un formulaire (et un modèle d'e-mail final) par langue, avec `PUBLIC_NEWSLETTER_FORM_ID_<LANG>`. Sinon, un seul modèle listant les cinq liens.

### MailerLite

1. Créer un compte (gratuit, jusqu'à 250 abonnés ; l'ouverture du compte peut être soumise à validation).
2. Subscribers > Groups : créer un groupe « Check-list PDF » (un par langue si besoin).
3. Forms > Embedded forms > Create form > type « Embedded » ; sélectionner le groupe ; un champ Email ; activer « Privacy policy » (lien vers la politique) ; **ne pas activer reCAPTCHA**.
4. Page Overview du formulaire : le double opt-in est activé par défaut ; onglet « Double opt-in » > modifier l'e-mail de confirmation pour y inclure le lien du PDF (méthode « freebie » documentée par MailerLite) ; ou, à la place, Automations > trigger « Completes a form » (ou « Joins a group ») > e-mail de bienvenue avec le lien (3 automations en gratuit).
5. Overview > « Embed form to your website » > onglet HTML : repérer `https://assets.mailerlite.com/jsonp/<idCompte>/forms/<idFormulaire>/subscribe`. `PUBLIC_NEWSLETTER_FORM_ID` = `<idCompte>/<idFormulaire>`.

### Buttondown

1. Créer un compte ; le nom d'utilisateur de la newsletter est l'identifiant (`buttondown.com/<nom>`).
2. Settings > Subscribing > Welcome : rédiger l'e-mail de bienvenue (envoyé après confirmation) avec les liens des PDF. Un seul e-mail par newsletter : y mettre les cinq liens. Vérifier aussi l'e-mail de confirmation (Settings > Subscribing > Confirmation).
3. Aucun CAPTCHA ni clé : `PUBLIC_NEWSLETTER_FORM_ID` = nom d'utilisateur.
4. Le site envoie uniquement `email` et `embed=1` (pas de tag ni de métadonnées, qui peuvent exiger une offre payante).

### Après configuration : à vérifier soi-même

S'inscrire avec une vraie adresse sur chaque langue utilisée ; contrôler la réception de l'e-mail de confirmation, puis de l'e-mail avec le lien, et que le lien télécharge le bon PDF. Contrôler aussi que le fournisseur accepte bien un POST sans CAPTCHA depuis le domaine de production. Compléter la politique de confidentialité (fournisseur, finalité, durée de conservation, désinscription).

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
- Pour envoyer le PDF par e-mail : choisir un fournisseur et suivre la section ci-dessous (code prêt, compte et formulaire à créer par le propriétaire) ; non fait.
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

## Tests du mode fournisseur (10 octobre 2026)

Avec Playwright (Chromium) sur `astro dev` (un serveur par configuration), pages `/fr` et `/ar`, requêtes vers les hôtes des fournisseurs **interceptées et simulées localement** (`page.route` : aucune requête réelle n'a atteint Brevo, MailerLite ou Buttondown) :

- `brevo` (URL de formulaire fictive en `*.sibforms.com/serve/...`) : POST `application/x-www-form-urlencoded` avec `EMAIL`, `email_address_check` (vide), `locale` (fr/ar), `html_type=simple` ; message « demande envoyée, confirmez par e-mail » ; lien cadeau affiché.
- `mailerlite` (`343337/81298438376916092`, et `111/222` pour `PUBLIC_NEWSLETTER_FORM_ID_AR`) : POST vers `https://assets.mailerlite.com/jsonp/<compte>/forms/<form>/subscribe` avec `fields[email]`, `ml-submit=1`, `anticsrf=true` ; la surcharge par langue est bien utilisée en arabe.
- `buttondown` (`sahla-test`) : POST vers `https://buttondown.com/api/emails/embed-subscribe/sahla-test` avec `email`, `embed=1`.
- Pour les trois : e-mail invalide = message d'erreur et aucune requête ; requête avortée (erreur réseau) = message d'erreur, pas de lien cadeau.
- Identifiant invalide (MailerLite `pas-valide`) : avertissement au build et retour au mode JSON (`PUBLIC_NEWSLETTER_ENDPOINT`) ; sans aucune variable : mode `mailto` inchangé ; mode JSON inchangé (succès, erreur).
- `npx astro check` : 0 erreur.

**Non testé** : tout fournisseur réel (création de compte, acceptation du POST par le serveur, absence de blocage CORS/CAPTCHA, réception des e-mails de confirmation et de bienvenue, rendu des e-mails). Les noms de champs viennent du code d'intégration public de chaque service (Brevo : exemple de code de formulaire publié sur community.brevo.com ; MailerLite : code d'un formulaire intégré publié sur un forum ; Buttondown : docs.buttondown.com) et peuvent changer : comparer avec le code HTML généré dans votre compte si une inscription n'arrive pas.
