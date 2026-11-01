import test from 'node:test';
import assert from 'node:assert/strict';
import { savedNotebookCities } from '../src/utils/notebookCities.ts';
const cities = [
  { id: 'fes', name: 'Fès', href: '/fr/villes/fes', paths: ['/fr/villes/fes', '/ar/mudun/fas'], x: 10, y: 20 },
  { id: 'marrakech', name: 'Marrakech', href: '/fr/villes/marrakech', paths: ['/fr/villes/marrakech'], x: 30, y: 40 },
];
test('a city saved in multiple languages appears once', () => {
  assert.deepEqual(savedNotebookCities([{ path: '/fr/villes/fes' }, { path: '/ar/mudun/fas' }], cities).map(city => city.id), ['fes']);
});
test('a general guide does not become a guessed map location', () => {
  assert.deepEqual(savedNotebookCities([{ path: '/fr/hammam-marocain-guide-prix' }, { path: '/fr/villes/fes-other' }], cities), []);
});
test('removing a city updates the selection and keeps catalog coordinates', () => {
  const remaining = savedNotebookCities([{ path: '/fr/villes/marrakech' }], cities);
  assert.deepEqual(remaining, [cities[1]]);
  assert.deepEqual(savedNotebookCities([], cities), []);
});
