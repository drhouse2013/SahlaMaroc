export function parseNum(v: unknown): number;
export function round(x: number): number;
export interface CapitalGainParams {
  ratePct: number; minPct: number; acquisitionCostFlatPct: number; smallSalesCapMad: number; mainResidenceYears: number;
  mainResidencePriceCapMad: number; vacancyMaxMonths: number; socialYears: number; socialAreaMin: number; socialAreaMax: number; socialPriceCapMad: number;
}
export interface CapitalGainInput {
  price: number; acquisitionPrice: number; coefficient: number; acquisitionCosts?: number; works?: number;
  exemption?: 'none' | 'main' | 'social' | 'small';
  occupancyYears?: number; rented?: boolean; usedRecently?: boolean; vacancyMonths?: number;
  areaM2?: number; firstSale?: boolean; yearSalesTotal?: number;
}
export function checkExemption(i: CapitalGainInput, p: CapitalGainParams): { eligible: boolean; blockers: string[]; warnings: string[] };
export type CapitalGainResult =
  | { ok: false; errors: { field: string; code: string }[] }
  | {
      ok: true; exemption: string; applied: string; eligible: boolean | null; blockers: string[]; warnings: string[];
      revalued: number; costsUsed: number; costsKind: 'actual' | 'flat'; works: number; acquisitionBase: number; profit: number;
      loss: boolean; minTax: number; standardTax: number; tax: number; netProceeds: number;
    };
export function computeCapitalGain(i: CapitalGainInput, p: CapitalGainParams): CapitalGainResult;
