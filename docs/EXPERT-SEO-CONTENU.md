# Audit SEO / contenu — 15/10/2026 (lecture partielle)

1. Maillage : les 5 nouveaux guides (AMO, entreprise, location, colis, voiture) ont presque aucun lien entrant. Ajouter 2-3 liens depuis retour définitif, check-list d'été, import voiture, impôts MRE, retraite, compte bancaire, coût de la vie (FR et EN).
2. Bloc « Guides liés » automatique par catégorie dans `src/pages/[lang]/[slug].astro`.
3. Données structurées : Article, BreadcrumbList ; FAQPage seulement si FAQ visible (`SEO.astro`, `seo.ts`).
4. Fraîcheur : contrôle d'ancienneté des `verifiedDate` (> 6 mois) dans `tools/check-content.mjs`.
5. Cannibalisation à arbitrer : Coupe du monde 2030 (4 guides) ; assurance auto / 180 jours / achat voiture ; deux guides aéroport ; impôts MRE / impôts vente-location.
6. hreflang et sitemap : vérifier qu'aucune alternate ne pointe vers une langue non indexée.
7. Sujets à vérifier avant rédaction : scolarité, transfert d'épargne, démarches consulaires, assurance voyage MRE.
8. Pages outils : titres/descriptions uniques, liens depuis les guides fiscaux et de change.

Limites : aucun contrôle des doublons de titres ni des liens cassés.
