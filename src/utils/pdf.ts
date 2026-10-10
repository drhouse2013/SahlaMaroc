import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Vrai si le PDF de la check-list existe dans public/downloads au moment du build.
 * Évite un lien mort tant que les PDF (générés à la main : `node tools/build-pdf.mjs`) ne sont pas commités.
 */
export const checklistPdfExists = (lang: string) =>
  existsSync(join(process.cwd(), 'public', 'downloads', `sahla-checklist-retour-ete-${lang}.pdf`));
