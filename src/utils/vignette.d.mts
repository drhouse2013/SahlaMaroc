export function parseNum(v: unknown): number;
export function bracket(cv: number): 0 | 1 | 2 | 3;
export interface VignetteParams { petrol: number[]; diesel: number[] }
export interface VignetteInput { cv: number; fuel: 'petrol' | 'diesel' | 'hybrid' | 'pickup'; months?: number }
export type VignetteResult =
  | { ok: false; errors: { field: string; code: string }[] }
  | { ok: true; scale: 'petrol' | 'diesel'; bracket: 0 | 1 | 2 | 3; annual: number; months: number; amount: number };
export function computeVignette(i: VignetteInput, p: VignetteParams): VignetteResult;
