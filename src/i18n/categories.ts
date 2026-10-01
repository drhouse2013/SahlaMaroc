/**
 * Catégories éditoriales, avec slug d'URL et libellé traduits.
 * L'ID (clé) est stable et utilisé dans le frontmatter des articles (`category: visa`).
 */
import type { Locale } from './config';

export const CATEGORY_IDS = [
  'retour', // MRE : retour au bled, Marhaba, ferries, voiture
  'immobilier', // MRE : acheter, construire, aides, crédit — forte valeur
  'money', // transferts d'argent, change, budget
  'demarches', // papiers, visa, administration
  'arrival', // visiteurs : arrivée, SIM, transports
  'tours', // visiteurs : excursions
  'stay', // visiteurs : où loger
  'living', // vivre au Maroc : culture, darija, villes, coût de la vie
] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

interface CategoryInfo {
  icon: string;
  /** Public principal : sert à grouper les rubriques dans le menu */
  audience: 'mre' | 'visitors' | 'all';
  slug: Record<Locale, string>;
  label: Record<Locale, string>;
}

export const CATEGORIES: Record<CategoryId, CategoryInfo> = {
  retour: {
    icon: '⛴️', audience: 'mre',
    slug: { en: 'summer-return', fr: 'retour-au-bled', es: 'vuelta-en-verano', de: 'heimreise', ar: 'al-awda' },
    label: { en: 'Summer return', fr: 'Retour au bled', es: 'Vuelta en verano', de: 'Heimreise', ar: 'العودة إلى البلاد' },
  },
  immobilier: {
    icon: '🏠', audience: 'mre',
    slug: { en: 'property', fr: 'immobilier', es: 'vivienda', de: 'immobilien', ar: 'aqar' },
    label: { en: 'Property & investing', fr: 'Immobilier & investir', es: 'Vivienda e inversión', de: 'Immobilien & Investieren', ar: 'العقار والاستثمار' },
  },
  money: {
    icon: '💸', audience: 'all',
    slug: { en: 'money', fr: 'argent', es: 'dinero', de: 'geld', ar: 'mal' },
    label: { en: 'Money & transfers', fr: 'Argent & transferts', es: 'Dinero y envíos', de: 'Geld & Überweisungen', ar: 'المال والتحويلات' },
  },
  demarches: {
    icon: '🛂', audience: 'all',
    slug: { en: 'paperwork', fr: 'demarches', es: 'tramites', de: 'behoerden', ar: 'wathaiq' },
    label: { en: 'Paperwork & visas', fr: 'Papiers & démarches', es: 'Trámites y visados', de: 'Papiere & Visum', ar: 'الوثائق والإجراءات' },
  },
  arrival: {
    icon: '📶', audience: 'visitors',
    slug: { en: 'arrival', fr: 'arrivee', es: 'llegada', de: 'ankunft', ar: 'wusul' },
    label: { en: 'Arrival & transport', fr: 'Arrivée & transports', es: 'Llegada y transporte', de: 'Ankunft & Verkehr', ar: 'الوصول والتنقل' },
  },
  tours: {
    icon: '🐪', audience: 'visitors',
    slug: { en: 'tours', fr: 'excursions', es: 'excursiones', de: 'ausfluege', ar: 'rihlat' },
    label: { en: 'Tours & trips', fr: 'Excursions', es: 'Excursiones', de: 'Ausflüge', ar: 'الرحلات' },
  },
  stay: {
    icon: '🏡', audience: 'visitors',
    slug: { en: 'where-to-stay', fr: 'ou-loger', es: 'donde-alojarse', de: 'unterkunft', ar: 'iqama' },
    label: { en: 'Where to stay', fr: 'Où loger', es: 'Dónde alojarse', de: 'Unterkunft', ar: 'أين تقيم' },
  },
  living: {
    icon: '🕌', audience: 'all',
    slug: { en: 'living', fr: 'vivre', es: 'vivir', de: 'leben', ar: 'hayat' },
    label: { en: 'Living in Morocco', fr: 'Vivre au Maroc', es: 'Vivir en Marruecos', de: 'Leben in Marokko', ar: 'العيش في المغرب' },
  },
};
