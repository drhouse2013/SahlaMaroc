import { jsPDF } from 'jspdf';
import type { Locale } from '../i18n';

import { PDF_WORDS } from './notebookPdfLabels';

type SavedPage = { path: string; title: string };

/** Text and links only: favourites never leave the device. No HTML interpreter. */
export function createNotebookPdf(entries: SavedPage[], locale: Locale, origin: string, font: string, created = new Date()): ArrayBuffer {
  const pdf = new jsPDF({ format: 'a4', unit: 'mm', compress: true, putOnlyUsedFonts: true });
  const labels = PDF_WORDS[locale], rtl = locale === 'ar', margin = 20, right = 190, width = 170;
  const clean = (text: string) => text.replace(/[\u0000-\u001f\u007f]/g, ' ').trim();
  const pages = entries.filter(e => /^\/(en|fr|es|de|ar)\//.test(e.path) && !/[\\?#\u0000-\u001f]/.test(e.path)).slice(0, 100);
  if (!pages.length) throw new Error('Empty notebook');
  pdf.addFileToVFS('Amiri-Regular.ttf', font);
  pdf.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
  pdf.setLanguage(locale);
  pdf.setProperties({ title: labels[4] + ' - Sahla Maroc', author: 'Sahla Maroc', subject: labels[5] });
  const text = (value: string | string[], y: number, size: number, color = '#173f38', arabic = rtl) => {
    pdf.setFont('Amiri', 'normal'); pdf.setFontSize(size); pdf.setTextColor(color); pdf.setR2L(false);
    pdf.text(value, arabic ? right : margin, y, { align: arabic ? 'right' : 'left', lineHeightFactor: 1.4, isInputVisual: false, isInputRtl: arabic, isOutputVisual: true, isOutputRtl: false });
  };
  const heading = (first: boolean) => {
    pdf.setR2L(false); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(11); pdf.setTextColor('#173f38');
    pdf.text('SAHLA MAROC', margin, 18);
    pdf.setDrawColor('#b36c4b'); pdf.setLineWidth(0.5); pdf.line(margin, 23, right, 23);
    if (first) {
      text(labels[4], 40, 27);
      const date = created.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
      text(labels[6] + ' ' + date, 51, 11, '#59685e');
      pdf.setFont('Amiri'); pdf.setFontSize(12);
      text(pdf.splitTextToSize(labels[5], width), 63, 12, '#59685e');
      return 84;
    }
    text(labels[4], 36, 17);
    return 49;
  };
  let y = heading(true);
  for (const entry of pages) {
    const title = clean(entry.title).slice(0, 200) || new URL(entry.path, origin).pathname;
    const url = new URL(entry.path, origin).href;
    pdf.setFont('Amiri'); pdf.setFontSize(15);
    const lines: string[] = pdf.splitTextToSize(title, width);
    pdf.setFont('helvetica'); pdf.setFontSize(8);
    const links: string[] = pdf.splitTextToSize(url, width);
    const height = lines.length * 7.4 + links.length * 4 + 9;
    if (y + height > 272) { pdf.addPage(); y = heading(false); }
    text(lines, y, 15);
    y += lines.length * 7.4;
    pdf.setR2L(false); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8); pdf.setTextColor('#59685e');
    pdf.text(links, margin, y, { lineHeightFactor: 1.4 });
    pdf.link(margin, y - lines.length * 7.4 - 5, width, lines.length * 7.4 + links.length * 4 + 5, { url });
    y += links.length * 4 + 5;
    pdf.setDrawColor('#d7ddd7'); pdf.setLineWidth(0.2); pdf.line(margin, y, right, y); y += 7;
  }
  const total = pdf.getNumberOfPages();
  for (let page = 1; page <= total; page++) {
    pdf.setPage(page); pdf.setR2L(false); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(9); pdf.setTextColor('#59685e');
    pdf.text(`${page} / ${total}`, right, 284, { align: 'right' });
  }
  return pdf.output('arraybuffer');
}
