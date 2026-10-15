export function parseNum(v: unknown): number;
export const round2: (x: number) => number;
export type FxResult =
  | { ok: false; errors: { field: string; code: string }[] }
  | { ok: true; result: number; inverseRate: number };
export function convert(i: { amount: number; rate: number; direction: 'eur-mad' | 'mad-eur' }): FxResult;
