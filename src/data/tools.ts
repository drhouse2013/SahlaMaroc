/** Catalogue des calculateurs (accueil, page hub, maillage interne). */
import type { Locale } from '../i18n/config';

export interface Tool {
  key: string; // translationKey de la page du calculateur
  icon: string;
  audience: 'mre' | 'visitors';
  title: { en: string; fr: string } & Partial<Record<Locale, string>>;
  text: { en: string; fr: string } & Partial<Record<Locale, string>>;
}

export const TOOLS: Tool[] = [
  { key: 'calc-property-fees', icon: '🏠', audience: 'mre', title: { en: 'Property buying costs', fr: 'Frais d’achat immobilier', ar: 'مصاريف شراء العقار' }, text: { en: 'Registration, land registry, notary and Daam Sakane aid.', fr: 'Enregistrement, conservation foncière, notaire et aide Daam Sakane.' } },
  { key: 'calc-mortgage', icon: '🏦', audience: 'mre', title: { en: 'Mortgage simulator', fr: 'Simulateur de crédit immobilier', ar: 'محاكي القرض العقاري' }, text: { en: 'Monthly payment, interest and share of your income.', fr: 'Mensualité, coût des intérêts et part de vos revenus.' } },
  { key: 'calc-transfer', icon: '💸', audience: 'mre', title: { en: 'Real cost of a money transfer', fr: 'Coût réel d’un transfert d’argent', ar: 'التكلفة الحقيقية للتحويل' }, text: { en: 'Fees + hidden exchange-rate margin, in one number.', fr: 'Frais + marge cachée sur le taux, en un seul chiffre.' } },
  { key: 'calc-summer', icon: '⛴️', audience: 'mre', title: { en: 'Summer-in-Morocco budget', fr: 'Budget été au bled', ar: 'ميزانية الصيف في البلاد' }, text: { en: 'Ferry or plane, days, spending and gifts for the family.', fr: 'Ferry ou avion, durée, dépenses et cadeaux pour la famille.' } },
  { key: 'calc-car-days', icon: '🚗', audience: 'mre', title: { en: '180-day car counter', fr: 'Compteur des 180 jours (voiture)', ar: 'عداد 180 يوماً للسيارة' }, text: { en: 'How many days your foreign-plated car has left this year.', fr: 'Combien de jours il reste à votre voiture immatriculée à l’étranger.' } },
  { key: 'budget-calculator', icon: '🧳', audience: 'visitors', title: { en: 'Trip & monthly budget', fr: 'Budget voyage ou mensuel', ar: 'ميزانية الرحلة' }, text: { en: 'Cost of a trip or a month in 7 Moroccan cities.', fr: 'Coût d’un voyage ou d’un mois dans 7 villes marocaines.' } },
];
