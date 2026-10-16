/**
 * Pluriels via Intl.PluralRules (fr, en, es, de, ar).
 * Une chaîne de traduction peut porter plusieurs formes séparées par « | »,
 * dans l'ordre CLDR de la langue :
 *   fr/en/es/de : one|other
 *   ar          : zero|one|two|few|many|other (singulier, duel, 3-10, 11+)
 * Une chaîne sans « | » est renvoyée telle quelle.
 */
const ORDER: Record<string, Intl.LDMLPluralRule[]> = {
  ar: ['zero', 'one', 'two', 'few', 'many', 'other'],
};
const DEFAULT_ORDER: Intl.LDMLPluralRule[] = ['one', 'other'];

export function pluralize(lang: string, n: number, template: string): string {
  if (!template.includes('|')) return template.replaceAll('{n}', String(n));
  const forms = template.split('|');
  const order = ORDER[lang] ?? DEFAULT_ORDER;
  let cat = new Intl.PluralRules(lang).select(n);
  // Catégorie absente de la langue du dictionnaire (ex. « many » en espagnol) : repli sur « other ».
  if (!order.includes(cat)) cat = 'other';
  const form = forms[order.indexOf(cat)] ?? forms[forms.length - 1];
  return form.replaceAll('{n}', String(n));
}
