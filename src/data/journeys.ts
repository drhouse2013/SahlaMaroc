/**
 * Parcours guidés : suite ordonnée de guides (translationKey). Sert au bloc « Commencer ici » du hub Guides
 * et à la navigation précédent/suivant des articles. Une clé absente dans une langue est ignorée.
 * Textes : clés UI `journey.<id>.title` / `journey.<id>.desc`.
 */
export const JOURNEYS = [
  { id: 'returning', icon: 'plane', steps: ['permanent-return', 'import-car-permanent-return', 'amo-health-return-mre', 'return-morocco-with-children', 'transfer-savings-mre', 'customs'] },
  { id: 'summer', icon: 'sun', steps: ['summer-checklist', 'cheap-flights-europe-morocco', 'ferry-guide', 'marhaba-guide', 'car-180-days', 'motorway'] },
  { id: 'buy', icon: 'home', steps: ['buy-property-abroad', 'power-of-attorney', 'mre-mortgage', 'property-taxes', 'build-house'] },
  { id: 'visit', icon: 'compass', steps: ['e-visa', 'sim-esim-morocco', 'airports', 'trains', 'riad-or-hotel', 'scams-safety'] },
] as const;
export type JourneyId = (typeof JOURNEYS)[number]['id'];

/** Parcours contenant ce guide, avec sa position (premier parcours trouvé). */
export function journeyOf(translationKey: string) {
  for (const j of JOURNEYS) {
    const i = (j.steps as readonly string[]).indexOf(translationKey);
    if (i >= 0) return { journey: j, index: i };
  }
  return undefined;
}
