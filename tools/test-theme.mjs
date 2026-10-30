import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const script = source.match(/<script is:inline data-theme-init>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script, 'Le script initial du thème doit être présent.');
const KEY = 'sahla-theme-preference';
function page({ dark = false, saved, legacy, blocked = false } = {}) {
  const values = new Map();
  if (saved !== undefined) values.set(KEY, saved);
  if (legacy !== undefined) values.set('theme', legacy);
  const document = new EventTarget(), media = new EventTarget(), window = new EventTarget();
  const classes = new Set(), selects = [{ value: 'system' }, { value: 'system' }];
  let color;
  document.documentElement = { dataset: {}, classList: { toggle(name, on) { on ? classes.add(name) : classes.delete(name); } } };
  document.querySelector = () => ({ setAttribute(name, value) { color = value; } });
  document.querySelectorAll = () => selects;
  media.matches = dark;
  window.matchMedia = () => media;
  const localStorage = {
    getItem(key) { if (blocked) throw Error('stockage indisponible'); return values.get(key) ?? null; },
    setItem(key, value) { if (blocked) throw Error('stockage indisponible'); values.set(key, value); },
  };
  vm.runInNewContext(script, { document, window, localStorage, Event });
  return {
    dark: () => classes.has('dark'), preference: () => document.documentElement.dataset.themePreference,
    color: () => color, selects, values,
    system(on) { media.matches = on; media.dispatchEvent(new Event('change')); },
    choose(value) { document.dispatchEvent(new CustomEvent('sahla:theme-change', { detail: value })); },
    stored(value, key = KEY) { value === null ? values.delete(KEY) : values.set(KEY, value); const event = new Event('storage'); event.key = key; window.dispatchEvent(event); },
  };
}
test('sans préférence, suit le système au chargement et pendant la visite', () => {
  const p = page({ dark: true }); assert.equal(p.dark(), true); assert.equal(p.preference(), 'system'); assert.equal(p.color(), '#0f1626');
  p.system(false); assert.equal(p.dark(), false); assert.equal(p.color(), '#fbf8f3');
  p.system(true); assert.equal(p.dark(), true); assert.deepEqual(p.selects.map(s => s.value), ['system', 'system']);
});
test('un choix manuel reste stable puis Système réactive le suivi', () => {
  const p = page({ dark: true }); p.choose('light'); assert.equal(p.dark(), false); assert.equal(p.values.get(KEY), 'light');
  p.system(false); p.system(true); assert.equal(p.dark(), false);
  p.choose('system'); assert.equal(p.dark(), true); p.system(false); assert.equal(p.dark(), false);
  p.choose('dark'); assert.equal(p.dark(), true); assert.deepEqual(p.selects.map(s => s.value), ['dark', 'dark']);
});
test('les préférences manuelles sont restaurées au chargement', () => {
  assert.equal(page({ dark: true, saved: 'light' }).dark(), false);
  assert.equal(page({ dark: false, saved: 'dark' }).dark(), true);
});
test('les anciennes préférences et valeurs invalides ne bloquent pas le système', () => {
  const p = page({ dark: false, legacy: 'dark', saved: 'invalid' }); assert.equal(p.dark(), false); assert.equal(p.preference(), 'system');
  p.choose('invalid'); assert.equal(p.preference(), 'system'); p.system(true); assert.equal(p.dark(), true);
});
test('fonctionne sans stockage disponible', () => {
  const p = page({ dark: true, blocked: true }); assert.equal(p.dark(), true); p.choose('light'); assert.equal(p.dark(), false); p.choose('system'); assert.equal(p.dark(), true);
});
test('synchronise les onglets et revient au système après effacement', () => {
  const p = page({ dark: true }); p.stored('light'); assert.equal(p.dark(), false); assert.equal(p.preference(), 'light');
  p.stored('dark', 'autre-cle'); assert.equal(p.preference(), 'light');
  p.stored(null, null); assert.equal(p.preference(), 'system'); assert.equal(p.dark(), true);
});
