import test from 'node:test';
import assert from 'node:assert/strict';
import { createJiti } from 'jiti';
const { prepare, search } = await createJiti(import.meta.url).import('../src/scripts/search.ts');
const data = prepare([
  { t: 'Essaouira', d: 'Médina et océan', u: '/fr/villes/essaouira', k: 'city' },
  { t: 'Visa électronique', d: 'Conditions de demande eVisa', u: '/fr/evisa', k: 'article' },
  { t: 'Fès', d: 'Médina et architecture', u: '/fr/villes/fes', k: 'city' },
]);
test('une destination ne fait pas remonter le visa via la seule lettre e', () => {
  assert.deepEqual(search(data, 'Essaouira').map(x => x.u), ['/fr/villes/essaouira']);
  assert.deepEqual(search(data, 'eau').map(x => x.u), []);
});
test('e-visa et les synonymes de ville restent recherchables', () => {
  assert.equal(search(data, 'e-visa')[0]?.u, '/fr/evisa');
  assert.equal(search(data, 'Fez')[0]?.u, '/fr/villes/fes');
  assert.equal(search(data, 'فاس')[0]?.u, '/fr/villes/fes');
});
