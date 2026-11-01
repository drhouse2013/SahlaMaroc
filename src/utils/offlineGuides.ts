type SavedPage = { path: string; title: string };
const escapeHtml = (text: string) => text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!));
const allowed = new Set('article section div header h1 h2 h3 h4 h5 h6 p ul ol li table thead tbody tfoot tr th td dl dt dd blockquote strong em b i br a details summary time pre code small span figcaption'.split(' '));

/** Rebuild text markup without scripts, event handlers, styles or remote resources. */
export function serialize(node: Node, base: URL, prefix: string): string {
  if (node.nodeType === 3) return escapeHtml(node.textContent ?? '');
  if (node.nodeType !== 1) return '';
  const el = node as Element, tag = el.tagName.toLowerCase();
  if (['script', 'style', 'iframe', 'object', 'embed', 'svg', 'canvas', 'form', 'button', 'nav', 'aside', 'footer', 'noscript', 'template'].includes(tag)) return '';
  const children = Array.from(el.childNodes).map(child => serialize(child, base, prefix)).join('');
  if (!allowed.has(tag)) return children;
  const attributes: string[] = [];
  if (el.id) attributes.push(`id="${escapeHtml(prefix + el.id)}"`);
  if (tag === 'a') {
    const href = el.getAttribute('href');
    if (href?.startsWith('#')) attributes.push(`href="#${escapeHtml(prefix + href.slice(1))}"`);
    else if (href) {
      try { const url = new URL(href, base); if (['https:', 'http:'].includes(url.protocol)) attributes.push(`href="${escapeHtml(url.href)}" rel="noreferrer"`); } catch { /* Keep the link's text. */ }
    }
  }
  if (tag === 'details') attributes.push('open');
  if (tag === 'time' && el.hasAttribute('datetime')) attributes.push(`datetime="${escapeHtml(el.getAttribute('datetime')!)}"`);
  if (['th', 'td'].includes(tag)) {
    for (const name of ['colspan', 'rowspan']) { const value = el.getAttribute(name); if (value && /^\d{1,2}$/.test(value)) attributes.push(`${name}="${value}"`); }
  }
  const start = `<${tag}${attributes.length ? ' ' + attributes.join(' ') : ''}>`;
  return tag === 'br' ? start : `${start}${children}</${tag}>`;
}

export async function buildOfflineGuides(entries: readonly SavedPage[], locale: string, labels: string[], onProgress: (done: number, total: number) => void) {
  if (entries.length > 25) throw new Error(labels[5]);
  const pages: string[] = [], index: string[] = [], skipped: string[] = [];
  const origin = location.origin;
  for (const [i, entry] of entries.entries()) {
    onProgress(i + 1, entries.length);
    const url = new URL(entry.path, origin);
    if (url.origin !== origin) throw new Error(labels[4]);
    try {
      const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error('HTTP');
      const raw = await response.text();
      if (raw.length > 2_000_000) throw new Error('Size');
      const doc = new DOMParser().parseFromString(raw, 'text/html');
      const content = doc.querySelector('article[data-article], .city-page');
      if (!content) throw new Error('Not a guide');
      const title = doc.querySelector('h1')?.textContent?.trim() || entry.title;
      content.querySelectorAll('[data-article-actions], [data-print-hide], [data-notebook], .no-print, h1').forEach(el => el.remove());
      const id = `guide-${i}`, lang = doc.documentElement.lang || locale, dir = doc.documentElement.dir === 'rtl' ? 'rtl' : 'ltr';
      index.push(`<li><a href="#${id}">${escapeHtml(title)}</a></li>`);
      pages.push(`<article id="${id}" lang="${escapeHtml(lang)}" dir="${dir}"><h2>${escapeHtml(title)}</h2><p class="source"><a href="${escapeHtml(url.href)}">${escapeHtml(labels[7])}</a> · ${escapeHtml(url.href)}</p>${serialize(content, url, `${id}-`)}</article>`);
    } catch {
      skipped.push(`<li><a href="${escapeHtml(url.href)}">${escapeHtml(entry.title)}</a></li>`);
    }
  }
  if (!pages.length) throw new Error(labels[4]);
  const stamp = new Date().toISOString();
  const html = `<!doctype html><html lang="${escapeHtml(locale)}" dir="${locale === 'ar' ? 'rtl' : 'ltr'}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'"><title>Sahla Maroc — ${escapeHtml(labels[0])}</title><style>body{margin:0;background:#f4efe6;color:#173f38;font:17px/1.75 system-ui,sans-serif}main{max-width:850px;margin:auto;padding:48px 24px}h1,h2,h3{font-family:Georgia,serif;line-height:1.2;text-wrap:balance}h1{font-size:2.6rem}h2{font-size:2rem}h3{font-size:1.4rem}a{color:inherit;text-underline-offset:3px;overflow-wrap:anywhere}article{border-top:1px solid #c5c6ba;margin-top:3rem;padding-top:2rem}article article{border:0;margin:0;padding:0}p,li,dd{max-width:75ch}table{display:block;overflow:auto;border-collapse:collapse;max-width:100%}th,td{padding:.6rem;border:1px solid #bfc5b8;text-align:start}summary{font-weight:600;margin-top:1rem}.source,small{font-size:.8rem;overflow-wrap:anywhere}pre{white-space:pre-wrap}@media print{body{background:white}main{padding:0}h2,h3{break-after:avoid}tr{break-inside:avoid}}</style><main><p>Sahla Maroc</p><h1>${escapeHtml(labels[0])}</h1><p>${escapeHtml(labels[1])}</p><p class="source">${escapeHtml(labels[8])} ${stamp}</p><nav><ol>${index.join('')}</ol></nav>${pages.join('')}${skipped.length ? `<section><h2>${escapeHtml(labels[6])}</h2><ul>${skipped.join('')}</ul></section>` : ''}</main></html>`;
  return { html, count: pages.length, skipped: skipped.length };
}
