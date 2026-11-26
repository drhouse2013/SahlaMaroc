/**
 * Configuration de marque modulaire et paramétrable.
 * Prépare la transition en douceur vers MorokGo tout en conservant Sahla Maroc
 * tant que la validation officielle et le basculement de domaine ne sont pas actés.
 */
import type { Locale } from '../i18n';

export const BRAND_CONFIG = {
  /** Nom actuel affiché */
  name: 'Sahla Maroc',
  shortName: 'Sahla',
  suffix: 'Maroc',

  /** Nom cible futur (MorokGo) */
  targetBrand: 'MorokGo',
  targetDomain: 'morokgo.com',

  /** Domaine actuel */
  currentDomain: 'sahla-maroc.vercel.app',

  /** Slogans actuels */
  tagline: {
    fr: 'Le Maroc, simplement.',
    en: 'Morocco, simplified.',
    es: 'Marruecos, sencillamente.',
    de: 'Marokko, einfach gemacht.',
    ar: 'المغرب، ببساطة.',
  } as Record<Locale, string>,

  /** Slogans futurs envisagés pour MorokGo */
  futureTagline: {
    fr: 'Voyagez plus. Dépensez moins.',
    en: 'Travel more. Spend less.',
    es: 'Viaja más. Gasta menos.',
    de: 'Mehr reisen. Weniger ausgeben.',
    ar: 'سافر أكثر. أنفق أقل.',
  } as Record<Locale, string>,

  /** Palette officielle de la direction artistique */
  theme: {
    forest: '#0d2b24', // Vert forêt navigation & premium
    forestDeep: '#06261d',
    terracotta: '#c05621', // Terracotta accents & CTA
    terracottaDeep: '#9a4116',
    gold: '#d9a441', // Doré détails élégants
    sand: '#fbf5ec', // Crème chaud arrière-plans
    ivory: '#fffdf9', // Blanc surfaces et cartes
    textMuted: '#5d5448', // Gris chaud textes secondaires
  },
} as const;

export function getBrandName(lang?: Locale): string {
  return BRAND_CONFIG.name;
}

export function getTagline(lang: Locale): string {
  return BRAND_CONFIG.tagline[lang] ?? BRAND_CONFIG.tagline.fr;
}
