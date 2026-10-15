export const LINES: string[];
export interface CityCost { city: string; housing: number; food: number; transport: number; leisure: number; mobile: number; total: number }
export function costsByCity(
  base: { rentMonth: Record<string, number>; foodDay: Record<string, number>; transportDay: Record<string, number>; funDay: Record<string, number>; simMonth: number },
  factors: Record<string, number>, style: string, persons: number,
): CityCost[] | null;
