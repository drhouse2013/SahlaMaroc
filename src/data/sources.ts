/**
 * Organismes officiels de référence, affichés dans le bloc « Sources » des guides.
 * Ce sont les administrations compétentes à consulter pour vérifier une règle ou un tarif :
 * le bloc les présente comme telles (et non comme des documents cités mot pour mot).
 */
import type { Locale } from '../i18n/config';

export interface OfficialSource {
  url: string;
  name: { en: string; fr: string; ar: string } & Partial<Record<Locale, string>>;
}

export const SOURCES: Record<string, OfficialSource> = {
  fm5: { url: 'https://www.fm5.ma', name: { fr: 'Fondation Mohammed V pour la Solidarité (opération Marhaba)', en: 'Mohammed V Foundation for Solidarity (Operation Marhaba)', es: 'Fundación Mohammed V para la Solidaridad (Operación Marhaba)', de: 'Stiftung Mohammed V. für Solidarität (Operation Marhaba)', ar: 'مؤسسة محمد الخامس للتضامن (عملية مرحبا)' } },
  douane: { url: 'https://www.douane.gov.ma', name: { fr: 'Administration des Douanes et Impôts Indirects (ADII)', en: 'Moroccan Customs (ADII)', es: 'Aduanas de Marruecos (ADII)', de: 'Marokkanischer Zoll (ADII)', ar: 'إدارة الجمارك والضرائب غير المباشرة' } },
  adm: { url: 'https://www.adm.co.ma', name: { fr: 'Autoroutes du Maroc (ADM)', en: 'Autoroutes du Maroc (ADM, motorways)', es: 'Autoroutes du Maroc (ADM, autopistas)', de: 'Autoroutes du Maroc (ADM, Autobahnen)', ar: 'الشركة الوطنية للطرق السيارة بالمغرب' } },
  ancfcc: { url: 'https://www.ancfcc.gov.ma', name: { fr: 'Agence nationale de la conservation foncière (ANCFCC)', en: 'National Land Registry Agency (ANCFCC)', es: 'Agencia Nacional del Registro de la Propiedad (ANCFCC)', de: 'Nationale Grundbuchbehörde (ANCFCC)', ar: 'الوكالة الوطنية للمحافظة العقارية والمسح العقاري والخرائطية' } },
  dgi: { url: 'https://www.tax.gov.ma', name: { fr: 'Direction générale des impôts (DGI)', en: 'Moroccan Tax Authority (DGI)', es: 'Dirección General de Impuestos (DGI)', de: 'Marokkanische Steuerverwaltung (DGI)', ar: 'المديرية العامة للضرائب' } },
  daamsakane: { url: 'https://www.daamsakane.ma', name: { fr: 'Programme d’aide au logement Daam Sakane', en: 'Daam Sakane housing aid programme', es: 'Programa de ayuda a la vivienda Daam Sakane', de: 'Wohnbauförderung Daam Sakane', ar: 'برنامج الدعم المباشر للسكن' } },
  oc: { url: 'https://www.oc.gov.ma', name: { fr: 'Office des Changes', en: 'Office des Changes (foreign exchange office)', es: 'Office des Changes (oficina de cambios)', de: 'Office des Changes (Devisenamt)', ar: 'مكتب الصرف' } },
  mremin: { url: 'https://www.mre.gov.ma', name: { fr: 'Ministère chargé des Marocains résidant à l’étranger', en: 'Ministry for Moroccans Living Abroad', es: 'Ministerio de los Marroquíes Residentes en el Extranjero', de: 'Ministerium für Auslandsmarokkaner', ar: 'الوزارة المكلفة بالمغاربة المقيمين بالخارج' } },
  bkam: { url: 'https://www.bkam.ma', name: { fr: 'Bank Al-Maghrib (cours de change)', en: 'Bank Al-Maghrib (exchange rates)', es: 'Bank Al-Maghrib (tipos de cambio)', de: 'Bank Al-Maghrib (Wechselkurse)', ar: 'بنك المغرب (أسعار الصرف)' } },
  acces: { url: 'https://www.acces-maroc.ma', name: { fr: 'Portail officiel e-Visa (Accès Maroc)', en: 'Official e-Visa portal (Acces Maroc)', es: 'Portal oficial del e-Visa (Acces Maroc)', de: 'Offizielles E-Visum-Portal (Acces Maroc)', ar: 'البوابة الرسمية للتأشيرة الإلكترونية' } },
  diplomatie: { url: 'https://www.diplomatie.ma', name: { fr: 'Ministère des Affaires étrangères et réseau consulaire', en: 'Ministry of Foreign Affairs and consulates', es: 'Ministerio de Asuntos Exteriores y consulados', de: 'Außenministerium und Konsulate', ar: 'وزارة الشؤون الخارجية والشبكة القنصلية' } },
  dgsn: { url: 'https://www.dgsn.gov.ma', name: { fr: 'Direction générale de la Sûreté nationale (CNIE, passeport, séjour)', en: 'National Security Directorate (ID card, passport, residence)', es: 'Dirección General de la Seguridad Nacional (CNIE, pasaporte, residencia)', de: 'Generaldirektion für nationale Sicherheit (Ausweis, Pass, Aufenthalt)', ar: 'المديرية العامة للأمن الوطني' } },
  narsa: { url: 'https://www.narsa.ma', name: { fr: 'Agence nationale de la sécurité routière (NARSA)', en: 'National Road Safety Agency (NARSA)', es: 'Agencia Nacional de Seguridad Vial (NARSA)', de: 'Nationale Agentur für Verkehrssicherheit (NARSA)', ar: 'الوكالة الوطنية للسلامة الطرقية' } },
  onda: { url: 'https://www.onda.ma', name: { fr: 'Office national des aéroports (ONDA)', en: 'National Airports Office (ONDA)', es: 'Oficina Nacional de Aeropuertos (ONDA)', de: 'Nationales Flughafenamt (ONDA)', ar: 'المكتب الوطني للمطارات' } },
  oncf: { url: 'https://www.oncf.ma', name: { fr: 'ONCF (trains et Al Boraq)', en: 'ONCF (trains and Al Boraq)', es: 'ONCF (trenes y Al Boraq)', de: 'ONCF (Züge und Al Boraq)', ar: 'المكتب الوطني للسكك الحديدية' } },
  anrt: { url: 'https://www.anrt.ma', name: { fr: 'Agence nationale de réglementation des télécommunications (ANRT)', en: 'Telecoms regulator (ANRT)', es: 'Regulador de telecomunicaciones (ANRT)', de: 'Telekom-Regulierungsbehörde (ANRT)', ar: 'الوكالة الوطنية لتقنين المواصلات' } },
  onmt: { url: 'https://www.visitmorocco.com', name: { fr: 'Office national marocain du tourisme (Visit Morocco)', en: 'Moroccan National Tourist Office (Visit Morocco)', es: 'Oficina Nacional Marroquí de Turismo (Visit Morocco)', de: 'Marokkanisches Fremdenverkehrsamt (Visit Morocco)', ar: 'المكتب الوطني المغربي للسياحة' } },
};

/** Organismes à afficher pour un guide précis (prioritaires sur ceux du thème) */
export const ARTICLE_SOURCES: Record<string, string[]> = {
  'e-visa': ['acces', 'diplomatie'],
  'visa-90-days': ['acces', 'dgsn'],
  'residence-permit': ['dgsn'],
  'passport-cnie': ['dgsn', 'diplomatie'],
  customs: ['douane'],
  'permanent-return': ['douane', 'dgi', 'mremin'],
  'retire-in-morocco': ['dgi', 'mremin', 'dgsn'],
  'car-180-days': ['douane'],
  'import-car-permanent-return': ['douane', 'mremin', 'narsa'],
  'car-insurance': ['douane'],
  'driving-licence': ['narsa'],
  'daam-sakane': ['daamsakane'],
  'buy-property-abroad': ['ancfcc', 'oc', 'dgi'],
  'mre-mortgage': ['bkam', 'oc'],
  'property-taxes': ['dgi', 'mremin'],
  'mre-taxes': ['dgi', 'mremin'],
  'property-inheritance': ['ancfcc', 'diplomatie'],
  'power-of-attorney': ['diplomatie', 'ancfcc'],
  'build-house': ['ancfcc'],
  'send-money': ['oc', 'bkam'],
  'cash-atms': ['bkam'],
  'bank-account': ['bkam', 'oc'],
  'marhaba-guide': ['fm5', 'douane'],
  'summer-checklist': ['fm5', 'douane'],
  motorway: ['adm'],
  trains: ['oncf'],
  'sim-esim-morocco': ['anrt'],
  'internet-coworking': ['anrt'],
  'casablanca-airport': ['onda', 'oncf'],
  'marrakech-airport': ['onda'],
  airports: ['onda'],
  'civil-status': ['diplomatie'],
  apostille: ['diplomatie'],
  'kids-pets': ['douane', 'diplomatie'],
};
