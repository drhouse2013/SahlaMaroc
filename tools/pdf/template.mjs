// Gabarit HTML/CSS commun (A4, noir et blanc lisible). Les textes viennent de content.<lang>.mjs.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

export function renderHtml({ c, lang, brand, siteUrl, guideLinks, fontCss }) {
  const host = siteUrl.replace(/^https?:\/\//, '');
  const foot = (s) => `"${s.replace(/"/g, '\\"')}"`;
  const left = `${brand} · ${host} · ${c.edition}`;
  const rtl = c.dir === 'rtl';
  const sections = c.sections.map((s, i) => `
    <section class="sec">
      <h2><span class="num">${i + 1}</span>${esc(s.title)}</h2>
      <ul>${s.items.map(([k, t]) => `<li class="it"><span class="box" aria-hidden="true"></span><span class="tag ${k === 'r' ? 'rule' : 'tip'}">${esc(k === 'r' ? c.legendRule : c.legendTip)}</span><span class="tx">${md(t)}</span></li>`).join('')}</ul>
    </section>`).join('');
  const guides = guideLinks.map(([url, label]) => `<li><a href="${esc(url)}">${esc(label)}</a><span class="u" dir="ltr">${esc(url.replace(/^https?:\/\//, ''))}</span></li>`).join('');
  return `<!doctype html>
<html lang="${lang}" dir="${c.dir}"><head><meta charset="utf-8"><title>${esc(c.docTitle)} — ${esc(brand)}</title>
<style>
${fontCss}
@page { size: A4; margin: 15mm 15mm 20mm;
  @bottom-${rtl ? 'right' : 'left'} { content: ${foot(left)}; font: 8pt/1 Readex, sans-serif; color: #000; }
  @bottom-${rtl ? 'left' : 'right'} { content: ${foot(c.page)} " \\202A" counter(page) " / " counter(pages) "\\202C"; font: 8pt/1 Readex, sans-serif; color: #000; }
}
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font: 9.3pt/1.4 Readex, sans-serif; color: #000; background: #fff; }
a { color: #000; text-decoration: underline; }
header.top { border-bottom: 2.2pt solid #000; padding-bottom: 5mm; margin-bottom: 4mm; }
.brand { font-size: 9pt; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
h1 { font-size: 21pt; line-height: 1.15; margin: 2mm 0 2mm; font-weight: 700; }
.sub { margin: 0 0 2mm; font-size: 10.5pt; }
.meta { font-weight: 600; font-size: 9pt; }
.legend { border: 1pt solid #000; padding: 3mm 4mm; margin: 0 0 4mm; font-size: 8.8pt; break-inside: avoid; }
.legend h3 { margin: 0 0 1.5mm; font-size: 9.6pt; }
.legend p { margin: 1mm 0; }
.dates { border: 1pt solid #000; padding: 3mm 4mm; margin: 0 0 4mm; break-inside: avoid; }
.dates h3 { margin: 0 0 1.5mm; font-size: 9.6pt; }
.dates .g { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5mm 8mm; }
.dates .f { border-bottom: .8pt solid #000; min-height: 7mm; font-size: 8.4pt; padding-top: 0; }
.sec { margin: 0 0 4mm; }
h2 { font-size: 12pt; margin: 0 0 1.5mm; padding-bottom: 1mm; border-bottom: 1.2pt solid #000; break-after: avoid; display: flex; align-items: center; gap: 2.5mm; }
.num { display: inline-flex; width: 6.4mm; height: 6.4mm; border-radius: 50%; background: #000; color: #fff; font-size: 9.5pt; align-items: center; justify-content: center; flex: none; }
ul { list-style: none; margin: 0; padding: 0; }
.it { display: flex; gap: 2.4mm; align-items: flex-start; padding: 1mm 0; break-inside: avoid; border-bottom: .4pt dotted #555; }
.box { flex: none; width: 4.2mm; height: 4.2mm; border: 1pt solid #000; border-radius: .6mm; margin-top: .5mm; }
.tag { flex: none; min-width: 14mm; text-align: center; font-size: 6.8pt; font-weight: 700; text-transform: uppercase; letter-spacing: .03em; padding: .5mm 1.2mm; margin-top: .7mm; border: 1pt solid #000; border-radius: .8mm; }
.legend .tag { margin-inline-end: 1.5mm; display: inline-block; }
.tag.rule { background: #000; color: #fff; }
.tag.tip { background: #fff; color: #000; }
.tx { flex: 1; }
.guides { break-inside: avoid; margin-top: 2mm; }
.guides li { display: flex; justify-content: space-between; gap: 4mm; padding: .8mm 0; border-bottom: .4pt dotted #555; font-size: 8.6pt; }
.guides .u { font-size: 7.6pt; }
.official { margin: 3mm 0 0; padding-inline-start: 5mm; list-style: disc; font-size: 8.8pt; }
.disc { border: 1.4pt solid #000; padding: 3mm 4mm; margin-top: 4mm; font-size: 8.6pt; break-inside: avoid; }
.disc h3 { margin: 0 0 1mm; font-size: 9.6pt; }
.disc p { margin: 0; }
.notes { break-before: page; }
.notes h3 { font-size: 9.6pt; margin: 0 0 1mm; }
.notes div { border-bottom: .8pt solid #000; height: 9mm; }
.pb { break-before: page; }
h3.gt { font-size: 12pt; margin: 4mm 0 1mm; border-bottom: 1.2pt solid #000; padding-bottom: 1mm; break-after: avoid; }
</style></head>
<body>
<header class="top">
  <div class="brand">${esc(brand)}</div>
  <h1>${esc(c.docTitle)}</h1>
  <p class="sub">${esc(c.subtitle)}</p>
  <p class="meta">${esc(c.edition)} · ${esc(c.verify)}</p>
</header>
<div class="legend">
  <h3>${esc(c.legendTitle)}</h3>
  <p><span class="tag rule">${esc(c.legendRule)}</span> ${esc(c.legendRuleText)}</p>
  <p><span class="tag tip">${esc(c.legendTip)}</span> ${esc(c.legendTipText)} <span class="box" style="display:inline-block;vertical-align:middle;margin:0 2mm"></span>${esc(c.legendBox)}</p>
</div>
<div class="dates"><h3>${esc(c.keyDatesTitle)}</h3><div class="g">${c.keyDates.map((k) => `<div class="f">${esc(k)} :</div>`).join('')}</div></div>
${sections}
<h3 class="gt">${esc(c.guidesTitle)}</h3>
<ul class="guides">${guides}</ul>
<h3 class="gt">${esc(c.officialTitle)}</h3>
<ul class="official">${c.official.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
<div class="disc"><h3>${esc(c.disclaimerTitle)}</h3><p>${esc(c.disclaimer)}</p></div>
<div class="notes"><h3>${esc(c.notes)}</h3>${"<div></div>".repeat(25)}</div>
</body></html>`;
}
