/**
 * Villes marocaines pour les horaires de prière (coordonnées WGS84 approchées du centre-ville, en degrés ;
 * longitude négative = ouest). Le calcul (src/utils/prayer.mjs) utilise lat/lng et l'altitude approximative.
 */
import type { Locale } from '../i18n/config';

export interface PrayerCity {
  id: string;
  lat: number;
  lng: number;
  /** Altitude approximative en mètres (abaisse l'horizon au lever/coucher du soleil) */
  elevation: number;
  name: Record<Locale, string>;
}

const c = (id: string, lat: number, lng: number, elevation: number, fr: string, en: string, es: string, de: string, ar: string): PrayerCity => ({ id, lat, lng, elevation, name: { fr, en, es, de, ar } });

export const DEFAULT_PRAYER_CITY = 'casablanca';

export const PRAYER_CITIES: PrayerCity[] = [
  c('casablanca', 33.5731, -7.5898, 50, "Casablanca", "Casablanca", "Casablanca", "Casablanca", "الدار البيضاء"),
  c('rabat', 34.0209, -6.8416, 75, "Rabat", "Rabat", "Rabat", "Rabat", "الرباط"),
  c('marrakech', 31.6295, -7.9811, 466, "Marrakech", "Marrakech", "Marrakech", "Marrakesch", "مراكش"),
  c('fes', 34.0331, -5.0003, 410, "Fès", "Fez", "Fez", "Fès", "فاس"),
  c('tangier', 35.7595, -5.834, 80, "Tanger", "Tangier", "Tánger", "Tanger", "طنجة"),
  c('agadir', 30.4278, -9.5981, 25, "Agadir", "Agadir", "Agadir", "Agadir", "أكادير"),
  c('meknes', 33.8935, -5.5473, 550, "Meknès", "Meknes", "Mequinez", "Meknès", "مكناس"),
  c('oujda', 34.6867, -1.9114, 470, "Oujda", "Oujda", "Uchda", "Oujda", "وجدة"),
  c('kenitra', 34.261, -6.5802, 15, "Kénitra", "Kenitra", "Kenitra", "Kenitra", "القنيطرة"),
  c('sale', 34.0531, -6.7985, 40, "Salé", "Salé", "Salé", "Salé", "سلا"),
  c('tetouan', 35.5785, -5.3684, 80, "Tétouan", "Tetouan", "Tetuán", "Tétouan", "تطوان"),
  c('nador', 35.1681, -2.9335, 5, "Nador", "Nador", "Nador", "Nador", "الناظور"),
  c('al-hoceima', 35.2517, -3.9372, 30, "Al Hoceïma", "Al Hoceima", "Alhucemas", "Al Hoceïma", "الحسيمة"),
  c('safi', 32.2994, -9.2372, 20, "Safi", "Safi", "Safi", "Safi", "آسفي"),
  c('el-jadida', 33.2316, -8.5007, 30, "El Jadida", "El Jadida", "El Yadida", "El Jadida", "الجديدة"),
  c('essaouira', 31.5085, -9.7595, 10, "Essaouira", "Essaouira", "Esauira", "Essaouira", "الصويرة"),
  c('ouarzazate', 30.9189, -6.8934, 1140, "Ouarzazate", "Ouarzazate", "Uarzazat", "Ouarzazate", "ورزازات"),
  c('errachidia', 31.9314, -4.4245, 1060, "Errachidia", "Errachidia", "Errachidia", "Errachidia", "الرشيدية"),
  c('laayoune', 27.1253, -13.1625, 60, "Laâyoune", "Laayoune", "El Aaiún", "Laâyoune", "العيون"),
  c('dakhla', 23.6848, -15.958, 10, "Dakhla", "Dakhla", "Dajla", "Dakhla", "الداخلة"),
  c('beni-mellal', 32.3373, -6.3498, 630, "Béni Mellal", "Beni Mellal", "Beni Mellal", "Béni Mellal", "بني ملال"),
  c('khouribga', 32.8811, -6.9063, 790, "Khouribga", "Khouribga", "Joribga", "Khouribga", "خريبكة"),
  c('settat', 33.001, -7.6166, 400, "Settat", "Settat", "Settat", "Settat", "سطات"),
  c('mohammedia', 33.6866, -7.383, 15, "Mohammédia", "Mohammedia", "Mohammedia", "Mohammedia", "المحمدية"),
  c('taza', 34.2133, -4.0103, 510, "Taza", "Taza", "Taza", "Taza", "تازة"),
  c('guelmim', 28.987, -10.0574, 280, "Guelmim", "Guelmim", "Guelmim", "Guelmim", "كلميم"),
  c('chefchaouen', 35.1688, -5.2636, 600, "Chefchaouen", "Chefchaouen", "Chauen", "Chefchaouen", "شفشاون"),
  c('larache', 35.1932, -6.1557, 20, "Larache", "Larache", "Larache", "Larache", "العرائش"),
  c('ifrane', 33.5228, -5.1106, 1650, "Ifrane", "Ifrane", "Ifrane", "Ifrane", "إفران"),
  c('taroudant', 30.4703, -8.877, 250, "Taroudant", "Taroudant", "Taroudant", "Taroudant", "تارودانت"),
  c('tiznit', 29.6974, -9.7316, 260, "Tiznit", "Tiznit", "Tiznit", "Tiznit", "تزنيت"),
  c('berkane', 34.92, -2.32, 150, "Berkane", "Berkane", "Berkane", "Berkane", "بركان"),
  c('khemisset', 33.8244, -6.0661, 400, "Khémisset", "Khemisset", "Khemisset", "Khémisset", "الخميسات"),
  c('tan-tan', 28.438, -11.103, 200, "Tan-Tan", "Tan-Tan", "Tan-Tan", "Tan-Tan", "طانطان"),
  c('sidi-ifni', 29.3797, -10.173, 50, "Sidi Ifni", "Sidi Ifni", "Sidi Ifni", "Sidi Ifni", "سيدي إفني"),
];

export const prayerCityById = (id: string) => PRAYER_CITIES.find((x) => x.id === id);
