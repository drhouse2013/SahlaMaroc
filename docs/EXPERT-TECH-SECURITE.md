# Audit tech / securite / monetisation (15/10/2026)

Lecture seule, aucun code modifie. Severite / effort.

1. **CMP / consentement AdSense (CRITIQUE / M)** : aucun mecanisme de consentement trouve. AdSense EEE/UK/CH exige une CMP certifiee IAB TCF (ou Google Funding Choices) avant chargement du script. Sans elle : pas de revenus pub. UE = cible principale (MRE).
2. **Pages legales RGPD (HAUTE / S)** : pas de page confidentialite / cookies / mentions legales detectee. Obligatoires pour AdSense, Brevo, affiliation (declaration des liens sponsorises).
3. **Newsletter (HAUTE / S)** : `Newsletter.astro` poste en `no-cors` (succes non verifiable), pas de double opt-in ni case de consentement explicite verifiee, pas de honeypot/anti-bot. Activer le double opt-in Brevo, lien de desinscription, mention du traitement.
4. **En-tetes de securite (MOYENNE / S)** : presents : nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy, COOP. Manquent : **HSTS** (Vercel l'ajoute sur le domaine, a verifier) et **Content-Security-Policy** (a ecrire en mode Report-Only d'abord, compatible AdSense/Brevo/Umami).
5. **Dependances (MOYENNE / S)** : `npm audit` = 10 vulnerabilites (1 critique, 1 haute, 6 moderees), principalement chaine gray-matter/js-yaml/argparse (outillage build). Faible exposition runtime (site statique) ; traiter via `npm audit fix` hors `--force`, garder l'override vite.
6. **Tests absents (MOYENNE / M)** : aucun dossier de tests. Ajouter : smoke test post-build (liens internes, hreflang, sitemap, noindex es/de/ar), test du formulaire, check Lighthouse/CLS des emplacements pub.
7. **Affiliation (MOYENNE / S)** : verifier que tous les liens passent par `<AffiliateLink>` (rel=sponsored), mention visible d'affiliation, et conformite des programmes (certains interdisent le cloaking/emails).
8. **Hebergement / exploitation (MOYENNE / S)** : Vercel Hobby interdit l'usage commercial : passer Pro avant AdSense. Presence de `netlify.toml` en parallele : supprimer pour eviter la confusion. Ajouter surveillance (uptime) et sauvegarde des variables d'env.

## Manque avant publication
- Domaine achete + DNS + `SITE_URL` en Production, redirections www/sahlamorocco testees.
- Vercel Pro.
- CMP + pages legales + politique cookies (FR/EN minimum).
- Compte Brevo, double opt-in, `PUBLIC_NEWSLETTER_ENDPOINT` configure.
- Search Console + sitemap soumis ; Umami (ID) si utilise.
- Demande AdSense (apres contenu et pages legales) ; `ads.txt` a publier.
- `npm run build` + `npm run check:content` propres, `npm audit fix` applique.
- Relecture humaine es/de/ar avant retrait du noindex ; fiabilite des chiffres fiscaux/douaniers datee.
