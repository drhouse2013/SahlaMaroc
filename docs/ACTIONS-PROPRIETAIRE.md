# Actions du propriétaire avant publication

Champs que l'assistant ne peut pas connaître et n'a pas inventés. Ils apparaissent lisiblement sur le site sous la forme « [À RENSEIGNER PAR L'ÉDITEUR AVANT PUBLICATION] » (marqueur accepté par `npm run check:content`, qui interdit seulement TODO, FIXME, TBD, « à compléter », XXXX, [...]).

## Mentions légales (`src/content/pages/<lang>/legal-notice.*`, 5 langues)

- [ ] Nom ou raison sociale de l'éditeur
- [ ] Statut (personne physique, auto-entrepreneur, société)
- [ ] Adresse
- [ ] ICE / registre du commerce, si applicable
- [ ] Directeur de la publication
- [ ] Registrar du nom de domaine sahlamaroc.com

Reporter les mêmes valeurs dans les 5 langues (fr, en, es, de, ar) en remplaçant le marqueur dans chaque fichier. Le contenu n'a pas été validé par un juriste ; la liste exacte des mentions obligatoires pour un éditeur marocain n'a pas été trouvée dans un texte officiel : à confirmer avec un conseil.

## Politique de confidentialité (`privacy.*`)

- [ ] Formalités CNDP : déclarer ou faire autoriser les traitements (formulaire de contact, lettre d'information, cookies, hébergement/transfert hors Maroc) sur cndp.ma > « Procédures de notification », puis reporter le numéro de récépissé ou d'autorisation à la place du marqueur.
- [ ] Arrêter les durées de conservation chiffrées (contact, newsletter) et les ajouter si souhaité.
- [ ] Vérifier que Brevo, Umami et le service de formulaire sont bien ceux utilisés en production ; retirer de la liste les services non activés.
- [ ] Confirmer avec la banque et un comptable le traitement des revenus AdSense (voir `docs/MISE-EN-LIGNE.md`, section 7).
