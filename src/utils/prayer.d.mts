export type PrayerKey = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
export type PrayerTimesResult = Record<PrayerKey, number | null>;
export interface PrayerParams { fajrAngle: number; ishaAngle: number; asrFactor: number; sunriseMin: number; dhuhrMin: number; maghribMin: number }
export const HABOUS: Readonly<PrayerParams>;
export const GMT_ALL_YEAR_FROM: { year: number; month: number; day: number };
export const PRAYER_ORDER: PrayerKey[];
export function moroccoOffsetMinutes(d: { year: number; month: number; day: number }): number;
export function prayerTimes(o: { year: number; month: number; day: number; lat: number; lng: number; elevation?: number; offsetMinutes?: number; params?: PrayerParams }): PrayerTimesResult;
export function formatHM(min: number | null): string;
export function nextPrayer(today: PrayerTimesResult, tomorrow: PrayerTimesResult, nowMin: number, nowSec?: number): { key: PrayerKey; minutes: number; in: number };
export function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number;
export function nearestCity<T extends { lat: number; lng: number }>(cities: T[], lat: number, lng: number): { city: T; km: number } | null;
