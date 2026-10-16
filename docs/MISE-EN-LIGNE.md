# Mise en ligne de Sahla Maroc : procédure pas à pas

Règles externes vérifiées par recherche web en octobre 2026. Les conditions des plateformes changent : relire les pages officielles citées avant de s'engager.

Ordre recommandé : 1. domaine, 2. Vercel (Pro), 3. Search Console, 4. Brevo, 5. AdSense, 6. Affiliation.

## 1. Domaine sahlamaroc.com

1. Acheter `sahlamaroc.com` chez un registrar (et `sahlamorocco.com` si souhaité).
2. Ne pas encore modifier le DNS : on ajoute d'abord le domaine dans Vercel (étape 2), qui indique les enregistrements exacts à créer.
3. Les redirections `www.sahlamaroc.com`, `sahlamorocco.com` et `www.sahlamorocco.com` vers `https://sahlamaroc.com` sont déjà dans `vercel.json`. Ces hôtes doivent être ajoutés comme domaines du projet Vercel pour qu'elles s'appliquent.

## 2. Vercel

### 2.1 Offre : passer en Pro avant toute monétisation

L'offre **Hobby est limitée à un usage personnel non commercial** (documentation Vercel, « Fair Use Guidelines » et page « Hobby plan »). Un site avec AdSense ou des liens d'affiliation est un usage commercial : **passer en Pro avant d'activer AdSense ou l'affiliation.**

### 2.2 Domaine et variable SITE_URL

1. Vercel > projet > Settings > Domains : ajouter `sahlamaroc.com`, `www.sahlamaroc.com`, `sahlamorocco.com`, `www.sahlamorocco.com`. Créer chez le registrar les enregistrements DNS demandés.
2. Settings > Environment Variables : créer `SITE_URL` = `https://sahlamaroc.com` (sans slash final), environnement **Production**.
3. Redéployer (Deployments > Redeploy). `site.config.mjs` lit `SITE_URL` : canonical, sitemap, robots.txt et Open Graph basculent sans modifier le code. Tant que `SITE_URL` n'est pas défini, le site pointe sur `https://sahla-maroc.vercel.app`.
4. Vérifier : le sitemap et `/robots.txt` doivent citer `sahlamaroc.com`, et `www.` doit rediriger en 301.

## 3. Google Search Console

1. Ajouter une propriété de type « Domaine » (`sahlamaroc.com`) : validation par un enregistrement TXT DNS, valable pour toutes les variantes.
2. Une fois validée : menu Sitemaps > saisir l'URL du sitemap > Envoyer. L'URL exacte est déclarée dans `/robots.txt`.
3. Seules les langues de `INDEXABLE_LOCALES` (fr, en) sont dans le sitemap ; es, de, ar restent en noindex tant qu'elles ne sont pas relues.
4. Demander l'indexation de la page d'accueil fr et en (Inspection d'URL).

## 4. Brevo (newsletter)

Flux du PDF : voir `docs/NEWSLETTER-PDF.md`.

1. Créer un compte Brevo, puis un formulaire d'inscription (Contacts > Formulaires), avec double opt-in.
2. Récupérer l'URL du formulaire, de la forme `https://xxxx.sibforms.com/serve/...`.
3. Dans Vercel (Production), définir :
   - `PUBLIC_NEWSLETTER_PROVIDER` = `brevo`
   - `PUBLIC_NEWSLETTER_FORM_ID` = l'URL du formulaire
   - facultatif : `PUBLIC_NEWSLETTER_FORM_ID_FR`, `_EN`, `_ES`... pour un formulaire par langue.
4. Redéployer, puis tester une inscription réelle (confirmation, puis e-mail final avec le lien PDF).
5. Ces variables sont `PUBLIC_` : visibles dans le navigateur. Ne jamais y mettre de clé API.

## 5. Google AdSense

Prérequis : site sur le vrai domaine, plan Vercel Pro, pages légales (mentions, confidentialité, divulgation d'affiliation), contenu suffisant.

1. Créer le compte AdSense, ajouter `sahlamaroc.com`, attendre la validation.
2. Définir dans Vercel : `PUBLIC_ADSENSE_CLIENT` (`ca-pub-...`) et `PUBLIC_ADSENSE_SLOT_BANNER`, `PUBLIC_ADSENSE_SLOT_IN_ARTICLE`, `PUBLIC_ADSENSE_SLOT_SIDEBAR`. Redéployer.

### Consentement (EEE, Royaume-Uni, Suisse)

**Le site n'a pas de bandeau de consentement (CMP) propre.** Depuis le 16 janvier 2024, Google exige une CMP certifiée par Google et intégrée au TCF de l'IAB pour diffuser des annonces personnalisées aux utilisateurs de l'EEE et du Royaume-Uni (Suisse ajoutée en 2024) (aide AdSense « Google consent management requirements »). Sans cela, la diffusion est restreinte dans ces régions, cible principale du site (MRE d'Europe).

Solution sans développement : le message de consentement de Google (« Google LLC CMP », présente dans la liste des CMP certifiées) :

1. AdSense > Confidentialité et messagerie (Privacy & messaging).
2. Créer un message **Réglementations européennes** (EEE/Royaume-Uni), le lier au site `sahlamaroc.com`, choisir les options, puis **Publier**.
3. Le message est servi par le script AdSense déjà chargé par `BaseLayout.astro` (après interaction ou 3,5 s). Aucune modification de code.
4. Vérifier en navigation privée depuis l'EEE : le message s'affiche et le choix est mémorisé.
5. Autre option : une CMP tierce certifiée (liste Google), à intégrer dans le code, ce qui n'est pas fait aujourd'hui.

## 6. Affiliation

Tous les liens passent par `<AffiliateLink>` (rel=sponsored) et restent des liens normaux sans commission tant que la variable `PUBLIC_*` correspondante est vide (voir `.env.example`). Une page de divulgation d'affiliation doit rester accessible.

### Wise (transferts d'argent)

- `PUBLIC_WISE_URL` est décrit dans `.env.example` comme « lien de parrainage / partenaire ». **Ne pas y mettre un lien de parrainage grand public.** Le centre d'aide Wise indique que toute personne qui promeut Wise sur un réseau social, un forum ou une plateforme commerciale est orientée vers ses programmes de partenariat (« How does the partnership invite program work? »). Un site monétisé est une plateforme commerciale.
- Faire la demande au **programme d'affiliation Wise** (page « Become a Wise affiliate ») et utiliser le lien de suivi fourni.
- Le contrat d'affiliation Wise comporte des restrictions (par exemple sur les annonces payantes) : le lire avant de signer.
- Tant que l'agrément n'est pas obtenu, laisser `PUBLIC_WISE_URL` vide.

### Autres programmes

Booking (`PUBLIC_BOOKING_AID`), Airalo (`PUBLIC_AIRALO_URL`), GetYourGuide, Viator, SafetyWing, DiscoverCars : obtenir l'agrément, renseigner la variable, redéployer, vérifier `rel="sponsored"` dans le HTML.

## 7. Recevoir les revenus AdSense depuis le Maroc (Wise, Office des changes)

- **Wise** : le blog de Wise Maroc (daté du 15/06/2023, signalé comme non mis à jour depuis plus d'un an) indique que l'ouverture d'un compte « n'est plus possible depuis le Maroc si vous n'avez pas d'adresse postale à l'étranger » et que le compte n'est disponible que pour les résidents de l'UE et de certains autres pays. **Ne pas compter sur Wise pour recevoir AdSense** tant qu'une page d'aide Wise actuelle (pays éligibles) n'a pas confirmé le contraire.
- **Piste à prévoir** : virement AdSense vers un compte dans une banque marocaine. Les règles de change applicables à un résident (rapatriement, compte en devises, délais) n'ont pas été confirmées pour les revenus de publicité en ligne : la page de l'Office des changes lue (rapatriement du produit des exportations de services, section personnes morales) cite un délai de 60 jours (art. 398) et un crédit en devises jusqu'à 70 % (art. 399) mais ne vise pas expressément les particuliers ni les services en ligne ; la presse (Bladi, Infomédiaire, Le360) évoque 90 jours pour les services en ligne, non vérifié sur texte officiel. **À confirmer avec la banque et un comptable avant le premier paiement.**
- Sources : https://wise.com/fr-ma/blog/wise-maroc · https://www.oc.gov.ma/fr/personnes-morales/rapatriement-du-produit-des-exportations-de-services · IGOC : https://www.oc.gov.ma/sites/default/files/reglementation/pdf/2024-01/IGOC%202024.pdf (non lue en entier).

## Liste de contrôle finale

- [ ] Vercel Pro actif
- [ ] `SITE_URL` défini, redéploiement fait, sitemap et robots corrects
- [ ] Redirections www et sahlamorocco.com testées
- [ ] Sitemap soumis dans Search Console
- [ ] Brevo : inscription de test et PDF reçus
- [ ] Message de consentement Google publié avant d'afficher des annonces
- [ ] Revenus AdSense : mode de réception confirmé avec banque et comptable (section 7)
- [ ] Mentions légales et récépissé CNDP renseignés (docs/ACTIONS-PROPRIETAIRE.md)
- [ ] Wise : agrément d'affiliation obtenu avant de renseigner `PUBLIC_WISE_URL`
- [ ] `npm run build` et `npm run check:content` OK avant le dernier déploiement

## Sources

- Vercel : https://vercel.com/docs/plans/hobby et https://vercel.com/docs/limits/fair-use-guidelines
- AdSense, CMP certifiées : https://support.google.com/adsense/answer/13554116
- Wise, partenariat : https://wise.com/help/articles/7vTYerlMrgU24Wzn1fUoXP/how-does-the-partnership-invite-program-work
