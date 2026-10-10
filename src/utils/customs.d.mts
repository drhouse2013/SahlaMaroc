export interface CustomsParams {
  vatPct: number; tpiPct: number; diEvHybridPct: number; diThermalPct: number;
  abatementPct: number; capMad: number; minAge: number; minResidenceYears: number;
  ageGeneral: number; ageExtended: number; luxuryThreshold: number;
}
export interface CustomsInput {
  value: number; regime: 'standard' | 'abatement90'; otherAbatementPct?: number;
  diPct: number; tpiPct: number; vatPct: number; vehicleAge?: number;
  beneficiaryAge?: number; residenceYears?: number; passengerCar?: boolean; alreadyUsed?: boolean; settled?: boolean;
}
export interface CustomsLine { id: 'value' | 'abatement' | 'base' | 'di' | 'tpi' | 'vat'; base: number | null; ratePct: number | null; amount: number }
export type CustomsResult =
  | { ok: false; errors: { field: string; code: string }[] }
  | {
      ok: true; eligible90: boolean | null; cleared: boolean; applied: 'abatement90' | 'standard' | 'none';
      blockers: string[]; warnings: string[]; lines: CustomsLine[]; total: number;
      taxableBase?: number; di?: number; tpi?: number; vat?: number; totalPctOfValue?: number;
    };
export function parseNum(v: unknown): number;
export function round(x: number): number;
export function checkEligibility90(
  i: { beneficiaryAge: number; residenceYears: number; passengerCar: boolean; alreadyUsed: boolean; settled: boolean; vehicleAge: number },
  p: CustomsParams,
): { eligible: boolean; blockers: string[]; warnings: string[] };
export function computeCustoms(input: CustomsInput, params: CustomsParams): CustomsResult;
