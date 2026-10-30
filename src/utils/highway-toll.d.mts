export const TOLL_RATES: Record<string, Record<string, { 1: number; 2: number; 3: number }>>;
export const CITIES: Record<string, Record<string, string>>;
export const VEHICLE_CLASSES: Record<number, Record<string, string>>;
export function calculateToll(fromCity: string, toCity: string, vehicleClass: number): { ok: boolean; toll: number; errors: string[] };
export function getAvailableDepartureCities(): string[];
export function getAvailableDestinationCities(fromCity: string): string[];
