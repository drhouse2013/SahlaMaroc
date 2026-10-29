import type { CategoryId } from '../i18n/categories';
import { CATEGORY_ICON } from '../i18n/categories';
import type { IconName } from '../data/icons';
import type { Scene } from '../data/home';

/** Visual identity follows the article's subject, independently of its translated URL. */
const subjects: [RegExp, IconName, IconName][] = [
  [/car-180-days/, 'car', 'calendar'],
  [/car-insurance|travel-insurance|repatriation-insurance/, 'shield', 'luggage'],
  [/car|driving-licence|motorway/, 'car', 'file'],
  [/marhaba|ferry/, 'ship', 'luggage'],
  [/checklist/, 'listChecks', 'luggage'],
  [/flight|airport/, 'plane', 'mapPin'],
  [/visa|passport|residence-permit/, 'passport', 'stamp'],
  [/birth-certificate|civil-status|apostille|life-certificate/, 'file', 'stamp'],
  [/military-service/, 'file', 'shield'],
  [/tax|customs/, 'receipt', 'scale'],
  [/mortgage|cost-of-living/, 'calculator', 'coins'],
  [/send-money|transfer-savings/, 'send', 'banknote'],
  [/bank-account|cash-atms/, 'wallet', 'banknote'],
  [/property|house|sakane|rental|rent-long-term/, 'home', 'key'],
  [/attorney/, 'pencil', 'file'],
  [/time-zone/, 'clock', 'globe'],
  [/sim|internet/, 'wifi', 'globe'],
  [/train|tram|transport|ctm/, 'train', 'ticket'],
  [/food/, 'utensils', 'palmtree'],
  [/health|amo/, 'heart', 'shield'],
  [/children|school/, 'book', 'users'],
  [/world-cup/, 'ticket', 'flag'],
  [/return|moving/, 'luggage', 'home'],
  [/retire/, 'palmtree', 'wallet'],
  [/darija|etiquette/, 'users', 'book'],
  [/hammam/, 'waves', 'sparkles'],
  [/safety/, 'shield', 'alert'],
];

const destinations: Record<string, Scene> = {
  'toubkal': 'atlas', 'chefchaouen-trip': 'chefchaouen', 'fes-merzouga': 'merzouga',
  'merzouga-tour': 'merzouga', 'essaouira-day-trip': 'essaouira',
  'marrakech-day-trips': 'marrakech', 'taghazout-surf': 'taghazout', 'dakhla': 'dakhla',
  'where-to-stay-tetouan-mdiq': 'tetouan',
};

export function guideVisual(key: string, category: CategoryId, title: string) {
  const subject = subjects.find(([pattern]) => pattern.test(key));
  const destination = destinations[key] ?? (key.startsWith('where-to-stay-') ? key.slice(14) as Scene : undefined);
  return {
    icon: subject?.[1] ?? CATEGORY_ICON[category],
    companion: subject?.[2] ?? 'book' as IconName,
    destination,
    // Keep the actual subject from the translated title; no invented numbers or claims in covers.
    title: title.split(/[:：]/)[0].replace(/\s*\(20\d{2}[^)]*\)/g, '').trim(),
  };
}
