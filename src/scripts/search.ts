/**
 * Recherche instantanée côté client (aucun service externe).
 * - L'index JSON de la langue (/<lang>/search-index.json, généré au build) n'est chargé
 *   qu'à la première ouverture : 0 octet sur les pages où l'on ne cherche pas.
 * - Normalisation : casse, accents, formes de l'alif / ta marbouta / alif maqsura en arabe.
 * - Synonymes multilingues (voiture ↔ car ↔ coche ↔ سيارة…) et correspondance par préfixe.
 * - Clavier : ↑ ↓ pour naviguer, Entrée pour ouvrir, Échap pour fermer, « / » pour ouvrir.
 */
export interface SearchItem { t: string; d: string; u: string; k: string; c?: string; x?: string }

const strip = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[ً-ْـ]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[’'`´]/g, ' ')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();

/** Groupes de synonymes (forme normalisée, toutes langues confondues). */
const GROUPS = [
  'voiture car coche auto sayara سياره vehicule fahrzeug wagen',
  'ferry ferri bateau traversee fahre fahre barco عباره baboor',
  'aeroport airport aeropuerto flughafen مطار',
  'argent money dinero geld مال transfert transfer envoi envoyer send senden enviar تحويل',
  'immobilier property vivienda immobilie immobilien عقار logement appartement piso wohnung achat buy kaufen comprar شراء',
  'visa evisa e visa visado visum تاشيره',
  'impot impots tax taxes impuesto steuer steuern ضريبه ضرائب fiscalite',
  'train tren zug قطار boraq oncf tgv',
  'bus autocar autobus ctm supratours حافله',
  'sim esim carte telephone phone handy شريحه internet',
  'hotel riad logement hebergement alojamiento unterkunft فندق رياض stay loger dormir',
  'desert sahara merzouga desierto wuste wueste صحراء',
  'douane customs aduana zoll جمارك',
  'passeport passport pasaporte pass reisepass جواز cnie',
  'marhaba retour summer verano sommer heimreise عوده bled',
  'calculateur calculator calculadora rechner حاسبه simulateur',
  'checklist liste lista checkliste قائمه',
  'marrakech marrakesch مراكش',
  'casablanca casa الدار البيضاء',
  'tanger tangier tanja طنجه',
  'fes fez fas فاس',
  'rabat الرباط',
  'essaouira esauira الصويره',
  'chefchaouen chaouen شفشاون',
  'taghazout agadir تغازوت اكادير',
].map((g) => g.split(' ').map(strip));

function expand(token: string): string[] {
  const out = new Set([token]);
  for (const g of GROUPS) if (g.some((w) => w.startsWith(token) || token.startsWith(w))) g.forEach((w) => out.add(w));
  return [...out];
}

interface Prepared extends SearchItem { _t: string; _d: string; _x: string }
const prepare = (items: SearchItem[]): Prepared[] =>
  items.map((i) => ({ ...i, _t: ' ' + strip(i.t), _d: ' ' + strip(i.d), _x: ' ' + strip(`${i.x ?? ''} ${i.c ?? ''}`) }));

export function search(items: Prepared[], query: string, limit = 24): Prepared[] {
  const tokens = strip(query).split(' ').filter((w) => w.length > 1 || /\p{Script=Arabic}/u.test(w));
  if (!tokens.length) return [];
  const scored: { item: Prepared; score: number }[] = [];
  for (const item of items) {
    let score = 0;
    let all = true;
    for (const token of tokens) {
      let best = 0;
      for (const w of expand(token)) {
        const exact = w === token ? 1 : 0.7;
        if (item._t.includes(' ' + w)) best = Math.max(best, 6 * exact);
        else if (item._x.includes(' ' + w)) best = Math.max(best, 3 * exact);
        else if (item._d.includes(' ' + w)) best = Math.max(best, 1.5 * exact);
        else if (w.length > 3 && (item._t.includes(w) || item._x.includes(w))) best = Math.max(best, 1 * exact);
      }
      if (!best) { all = false; break; }
      score += best;
    }
    if (all) scored.push({ item, score: score + (item.k === 'tool' || item.k === 'city' ? 0.5 : 0) });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.item);
}

const cache = new Map<string, Promise<Prepared[]>>();
function loadIndex(url: string) {
  if (!cache.has(url)) cache.set(url, fetch(url).then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); }).then(prepare));
  const p = cache.get(url)!;
  p.catch(() => cache.delete(url));
  return p;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

function track(name: string, data: Record<string, unknown>) {
  const w = window as unknown as { sahlaTrack?: (n: string, d: Record<string, unknown>) => void };
  w.sahlaTrack?.(name, data);
}

export function initSearch(root: HTMLElement) {
  const input = root.querySelector<HTMLInputElement>('input[type="search"]')!;
  const list = root.querySelector<HTMLElement>('[data-search-results]')!;
  const status = root.querySelector<HTMLElement>('[data-search-status]')!;
  const examples = root.querySelector<HTMLElement>('[data-search-examples]');
  const i18n = JSON.parse(root.dataset.i18n || '{}') as Record<string, string>;
  const indexUrl = root.dataset.index!;
  let items: Prepared[] | null = null;
  let timer = 0;
  let lastTracked = '';

  const setStatus = (text: string) => { status.textContent = text; };

  async function ensure() {
    if (items) return items;
    setStatus(i18n.loading);
    try { items = await loadIndex(indexUrl); setStatus(''); }
    catch { setStatus(i18n.error); }
    return items;
  }

  async function run() {
    const q = input.value.trim();
    if (examples) examples.hidden = q.length > 0;
    if (q.length < 2 && !/\p{Script=Arabic}/u.test(q)) { list.innerHTML = ''; setStatus(q ? i18n.hint : ''); return; }
    const data = await ensure();
    if (!data) return;
    const res = search(data, q);
    if (!res.length) {
      list.innerHTML = '';
      setStatus(i18n.empty.replace('{q}', q) + ' ' + i18n.emptyHint);
    } else {
      setStatus(res.length === 1 ? i18n.one : i18n.many.replace('{n}', String(res.length)));
      list.innerHTML = res
        .map((r) => `<li><a href="${esc(r.u)}" class="search-hit"><span class="search-kind">${esc(i18n['k_' + r.k] || r.k)}${r.c ? ' · ' + esc(r.c) : ''}</span><span class="search-title">${esc(r.t)}</span><span class="search-desc">${esc(r.d)}</span></a></li>`)
        .join('');
    }
    if (q !== lastTracked) {
      lastTracked = q;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => track('search', { q: q.slice(0, 60), results: res.length }), 1200);
    }
  }

  input.addEventListener('input', run);
  input.addEventListener('focus', ensure, { once: true });
  root.querySelectorAll<HTMLButtonElement>('[data-search-example]').forEach((b) =>
    b.addEventListener('click', () => { input.value = b.dataset.searchExample || b.textContent || ''; input.focus(); run(); }),
  );
  // Navigation clavier dans les résultats
  root.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const links = Array.from(list.querySelectorAll<HTMLAnchorElement>('a'));
    if (!links.length) return;
    e.preventDefault();
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    const next = e.key === 'ArrowDown' ? (i < 0 ? 0 : Math.min(i + 1, links.length - 1)) : i <= 0 ? -1 : i - 1;
    if (next < 0) input.focus();
    else links[next].focus();
  });
  root.addEventListener('submit', (e) => {
    e.preventDefault();
    const first = list.querySelector<HTMLAnchorElement>('a');
    if (root.dataset.mode === 'dialog') { if (first) first.click(); return; }
    // Page de recherche : l'URL garde la requête (partage, retour arrière)
    const url = new URL(location.href);
    url.searchParams.set('q', input.value.trim());
    history.replaceState(null, '', url);
    run();
  });
  return { run, input };
}
