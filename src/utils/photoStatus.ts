/** Règle de vérification d'une entrée de manifeste photo : partagée par le site (photos.ts) et les scripts tools/. */
export interface PhotoEntry { file: string; alt?: Partial<Record<string, string>>; credit?: string; source?: string; verified?: boolean; focalPoint?: [number, number] }

const LICENSE_RE = /(CC BY(?:-SA)? \d\.\d|CC0(?: 1\.0)?|Public domain|Unsplash License|Pexels License)/i;

export const licenseOf = (credit?: string): string | null => credit?.match(LICENSE_RE)?.[1] ?? null;

/** Vérifiée = auteur + licence reconnue dans le crédit, lien source https, et pas marquée `"verified": false`. */
export const isVerified = (e?: PhotoEntry): boolean =>
  !!e && e.verified !== false && !!licenseOf(e.credit) && /^https:\/\//.test(e.source ?? '');
