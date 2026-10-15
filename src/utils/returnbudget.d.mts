import type { CustomsParams, CustomsResult } from './customs.mjs';
export const MONTHLY: string[];
export const ONE_OFF: string[];
export interface ReturnBudgetInput {
  monthly: Record<string, unknown>; oneOff: Record<string, unknown>; depositMonths: unknown; contingencyPct: unknown;
  car?: { value: unknown; regime: 'standard' | 'abatement90'; diPct: unknown; beneficiaryAge?: unknown; residenceYears?: unknown; vehicleAge?: unknown; otherAbatementPct?: unknown };
  customsParams: CustomsParams;
}
export type ReturnBudgetResult =
  | { ok: false; invalid: string[] }
  | {
      ok: true; oneOff: Record<'moving' | 'car' | 'deposit' | 'installation' | 'school', number>;
      oneOffTotal: number; monthlySubtotal: number; contingencyMonthly: number; monthlyTotal: number;
      first12Running: number; grandTotal: number;
      car: { total: number; applied: string; warnings: string[]; blockers: string[]; result: CustomsResult | null };
    };
export function computeReturnBudget(input: ReturnBudgetInput): ReturnBudgetResult;
