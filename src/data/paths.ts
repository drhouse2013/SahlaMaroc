/**
 * Les trois parcours de l'accueil et leurs pages dédiées :
 * A « Je rentre au Maroc » (hub mre), B « Je souhaite investir » (hub invest), C « Je visite le Maroc » (hub visit).
 * Les rubriques ne référencent que des contenus existants (translationKey de guides et calculateurs, id de villes
 * et de régions, hubs) ; une rubrique vide dans une langue n'est pas affichée. Aucun chiffre ici.
 */
import type { ImageMetadata } from 'astro';
import type { HubId, Locale } from '../i18n/config';
import type { CategoryId } from '../i18n/categories';
import type { IconName } from './icons';
import { placePhoto } from '../utils/photos';
import portPhoto from '../assets/photos/marhaba-port.jpg';
import cfcPhoto from '../assets/photos/banque-casablanca-cfc.jpg';

type T = Record<Locale, string>;
export type PathId = 'return' | 'invest' | 'visit';
export type PathHub = Extract<HubId, 'mre' | 'invest' | 'visit'>;

export interface Rubric {
  id: string;
  title: T;
  text: T;
  guides?: string[];
  tools?: string[];
  /** Grille photo des villes (pleine largeur) */
  cityGrid?: string[];
  cities?: string[];
  regions?: string[] | 'all';
  hubs?: HubId[];
  categories?: CategoryId[];
  /** Première question de la FAQ de ces guides, avec lien vers le guide */
  faq?: string[];
  /** Liste détaillée des calculateurs (ToolGrid) */
  toolGrid?: string[];
}

export interface PathDef { id: PathId; hub: PathHub; icon: IconName; title: T; text: T; cta: T; rubrics: Rubric[] }

export const PATH_ORDER: PathId[] = ['return', 'invest', 'visit'];
export const pathOfHub = (hub: PathHub): PathId => (hub === 'mre' ? 'return' : hub);

/** Textes de la page B (les pages A et C gardent leurs clés UI hub.mre.* et hub.visit.*). */
export const INVEST_HUB: Record<Locale, { title: string; description: string; intro: string; nav: string; menu: string }> = {
  fr: { title: 'Investir au Maroc : immobilier, entreprise et fiscalité', description: "Acheter ou construire, créer une entreprise, comprendre la fiscalité et financer son projet au Maroc : guides pratiques et calculateurs gratuits.", intro: "Avant d'investir au Maroc, depuis l'étranger ou sur place : les étapes, les frais officiels, les impôts et les démarches, sans promesse de rendement.", nav: 'Investir au Maroc', menu: 'Immobilier, entreprise, fiscalité et financement.' },
  en: { title: 'Investing in Morocco: property, business and tax', description: 'Buying or building, starting a business, understanding tax and financing your project in Morocco: practical guides and free calculators.', intro: 'Before investing in Morocco, from abroad or on the ground: the steps, official fees, taxes and paperwork, with no promise of returns.', nav: 'Invest in Morocco', menu: 'Property, business, tax and financing.' },
  es: { title: 'Invertir en Marruecos: inmuebles, empresa y fiscalidad', description: 'Comprar o construir, crear una empresa, entender la fiscalidad y financiar tu proyecto en Marruecos: guías prácticas y calculadoras gratuitas.', intro: 'Antes de invertir en Marruecos, desde el extranjero o allí: los pasos, los gastos oficiales, los impuestos y los trámites, sin promesas de rentabilidad.', nav: 'Invertir en Marruecos', menu: 'Inmuebles, empresa, fiscalidad y financiación.' },
  de: { title: 'In Marokko investieren: Immobilien, Firma, Steuern', description: 'Kaufen oder bauen, ein Unternehmen gründen, Steuern verstehen und Ihr Projekt in Marokko finanzieren: praktische Ratgeber und kostenlose Rechner.', intro: 'Bevor Sie in Marokko investieren, aus dem Ausland oder vor Ort: Schritte, amtliche Gebühren, Steuern und Formalitäten, ohne Renditeversprechen.', nav: 'In Marokko investieren', menu: 'Immobilien, Unternehmen, Steuern und Finanzierung.' },
  ar: { title: 'الاستثمار في المغرب: العقار والمقاولة والضرائب', description: 'شراء عقار أو بناؤه، إنشاء مقاولة، فهم الضرائب وتمويل مشروعك في المغرب: أدلة عملية وحاسبات مجانية.', intro: 'قبل الاستثمار في المغرب، من الخارج أو من داخله: المراحل والرسوم الرسمية والضرائب والإجراءات، دون أي وعد بالأرباح.', nav: 'الاستثمار في المغرب', menu: 'العقار والمقاولة والضرائب والتمويل.' },
};

/** Libellés partagés des pages parcours. */
export const PATH_UI: Record<'paths' | 'onPage' | 'others' | 'calculator' | 'readGuide' | 'allTools', T> = {
  paths: { fr: 'Qu’est-ce qui vous amène au Maroc ?', en: 'What brings you to Morocco?', es: '¿Qué te trae a Marruecos?', de: 'Was führt Sie nach Marokko?', ar: 'ما الذي يأتي بك إلى المغرب؟' },
  onPage: { fr: 'Sur cette page', en: 'On this page', es: 'En esta página', de: 'Auf dieser Seite', ar: 'في هذه الصفحة' },
  others: { fr: 'Un autre projet ?', en: 'A different plan?', es: '¿Otro proyecto?', de: 'Ein anderes Vorhaben?', ar: 'مشروع آخر؟' },
  calculator: { fr: 'Calculateur', en: 'Calculator', es: 'Calculadora', de: 'Rechner', ar: 'حاسبة' },
  readGuide: { fr: 'Lire le guide', en: 'Read the guide', es: 'Leer la guía', de: 'Ratgeber lesen', ar: 'اقرأ الدليل' },
  allTools: { fr: 'Tous les calculateurs', en: 'All calculators', es: 'Todas las calculadoras', de: 'Alle Rechner', ar: 'كل الحاسبات' },
};

export const PATHS: Record<PathId, PathDef> = {
  return: {
    id: 'return', hub: 'mre', icon: 'ship',
    title: { fr: 'Je rentre au Maroc', en: 'I’m going home to Morocco', es: 'Vuelvo a Marruecos', de: 'Ich kehre nach Marokko zurück', ar: 'أعود إلى المغرب' },
    text: { fr: 'Pour l’été ou pour de bon : papiers, douane, voiture, argent et logement.', en: 'For the summer or for good: papers, customs, car, money and housing.', es: 'Para el verano o para siempre: papeles, aduana, coche, dinero y vivienda.', de: 'Für den Sommer oder für immer: Papiere, Zoll, Auto, Geld und Wohnen.', ar: 'للصيف أو بشكل نهائي: الوثائق والجمارك والسيارة والمال والسكن.' },
    cta: { fr: 'Préparer mon retour', en: 'Plan my return', es: 'Preparar mi regreso', de: 'Rückkehr vorbereiten', ar: 'أحضّر عودتي' },
    rubrics: [
      { id: 'prepare', guides: ['summer-checklist', 'permanent-return', 'retire-in-morocco'], tools: ['calc-return-budget', 'calc-summer', 'calc-retirement-budget'], hubs: ['checklists'],
        title: { fr: 'Préparer son retour', en: 'Plan your return', es: 'Preparar el regreso', de: 'Die Rückkehr vorbereiten', ar: 'التحضير للعودة' },
        text: { fr: 'Retour d’été ou définitif : le rétroplanning, le budget et les listes à cocher.', en: 'Summer trip or moving back for good: timeline, budget and checklists.', es: 'Vuelta de verano o definitiva: calendario, presupuesto y listas.', de: 'Sommerbesuch oder endgültige Rückkehr: Zeitplan, Budget und Checklisten.', ar: 'عودة صيفية أو نهائية: الجدول الزمني والميزانية وقوائم التحقق.' } },
      { id: 'papers', guides: ['passport-cnie', 'birth-certificate-civil-registry', 'civil-status', 'apostille', 'driving-licence', 'military-service-mre'],
        title: { fr: 'Documents et formalités', en: 'Documents and formalities', es: 'Documentos y trámites', de: 'Dokumente und Formalitäten', ar: 'الوثائق والإجراءات' },
        text: { fr: 'Passeport, CNIE, état civil, apostille et permis : ce qu’il faut renouveler ou faire reconnaître.', en: 'Passport, ID card, civil status, apostille and licence: what to renew or get recognised.', es: 'Pasaporte, CNIE, estado civil, apostilla y permiso: qué renovar o hacer reconocer.', de: 'Pass, Personalausweis, Personenstand, Apostille und Führerschein: was zu erneuern oder anerkennen zu lassen ist.', ar: 'جواز السفر والبطاقة الوطنية والحالة المدنية والأبوستيل ورخصة السياقة: ما يجب تجديده أو الاعتراف به.' } },
      { id: 'customs', guides: ['customs', 'car-180-days', 'import-car-permanent-return', 'parcels-moving-europe-morocco', 'buy-car-morocco-mre', 'car-insurance'], tools: ['calc-customs', 'calc-car-days', 'calc-vignette'],
        title: { fr: 'Douane et véhicule', en: 'Customs and your car', es: 'Aduana y vehículo', de: 'Zoll und Fahrzeug', ar: 'الجمارك والسيارة' },
        text: { fr: 'Ce que vous pouvez apporter, la règle des 180 jours et le dédouanement d’une voiture.', en: 'What you can bring, the 180-day rule and clearing a car through customs.', es: 'Lo que puedes traer, la regla de los 180 días y el despacho de un coche.', de: 'Was Sie mitbringen dürfen, die 180-Tage-Regel und die Verzollung eines Autos.', ar: 'ما يمكنك إدخاله، وقاعدة 180 يوماً، وتعشير السيارة.' } },
      { id: 'transport', guides: ['ferry-guide', 'marhaba-guide', 'marhaba-2027', 'cheap-flights-europe-morocco', 'motorway', 'kids-pets'], tools: ['calc-ferry-compare', 'calc-highway-toll'],
        title: { fr: 'Transport', en: 'Getting there', es: 'Transporte', de: 'Anreise', ar: 'النقل' },
        text: { fr: 'Ferry, avion et autoroute : choisir son trajet et arriver sans mauvaise surprise.', en: 'Ferry, plane and motorway: choosing your route and arriving without surprises.', es: 'Ferri, avión y autopista: elegir el trayecto y llegar sin sorpresas.', de: 'Fähre, Flugzeug und Autobahn: die Route wählen und ohne Überraschungen ankommen.', ar: 'العبّارة والطائرة والطريق السيار: اختيار المسار والوصول دون مفاجآت.' } },
      { id: 'settle', guides: ['amo-health-return-mre', 'return-morocco-with-children', 'international-schools', 'rent-long-term-mre', 'repatriation-insurance-mre', 'life-certificate-pension'], tools: ['calc-city-costs'],
        title: { fr: 'S’installer', en: 'Settling in', es: 'Instalarse', de: 'Sich einrichten', ar: 'الاستقرار' },
        text: { fr: 'Santé, école des enfants, logement à louer et assurances après le retour.', en: 'Health cover, schooling, renting a home and insurance after the move.', es: 'Sanidad, colegio, alquiler de vivienda y seguros tras el regreso.', de: 'Krankenversicherung, Schule, Mietwohnung und Versicherungen nach der Rückkehr.', ar: 'الصحة ودراسة الأطفال وكراء السكن والتأمينات بعد العودة.' } },
      { id: 'money', guides: ['send-money', 'transfer-savings-mre', 'bank-account', 'mre-taxes', 'cash-atms'], tools: ['calc-transfer', 'calc-fx'],
        title: { fr: 'Banque et transfert d’argent', en: 'Banking and money transfers', es: 'Banco y envío de dinero', de: 'Bank und Geldtransfer', ar: 'الأبناك وتحويل الأموال' },
        text: { fr: 'Envoyer de l’argent, transférer son épargne, ouvrir un compte et déclarer ses revenus.', en: 'Sending money, moving savings, opening an account and declaring income.', es: 'Enviar dinero, trasladar ahorros, abrir una cuenta y declarar ingresos.', de: 'Geld senden, Ersparnisse übertragen, ein Konto eröffnen und Einkünfte erklären.', ar: 'إرسال المال وتحويل المدخرات وفتح حساب والتصريح بالمداخيل.' } },
      { id: 'housing', guides: ['buy-property-abroad', 'daam-sakane', 'build-house', 'mre-mortgage', 'power-of-attorney', 'property-inheritance'], tools: ['calc-property-fees', 'calc-mortgage'],
        title: { fr: 'Immobilier et logement', en: 'Property and housing', es: 'Inmuebles y vivienda', de: 'Immobilien und Wohnen', ar: 'العقار والسكن' },
        text: { fr: 'Acheter, construire, financer ou hériter d’un bien, même à distance.', en: 'Buying, building, financing or inheriting a property, even from abroad.', es: 'Comprar, construir, financiar o heredar un inmueble, incluso a distancia.', de: 'Eine Immobilie kaufen, bauen, finanzieren oder erben, auch aus der Ferne.', ar: 'شراء عقار أو بناؤه أو تمويله أو إرثه، ولو عن بعد.' } },
      { id: 'procedures', hubs: ['calendar', 'news', 'glossary'], categories: ['demarches'],
        title: { fr: 'Démarches : les repères', en: 'Paperwork: the essentials', es: 'Trámites: lo esencial', de: 'Behördengänge: das Wichtigste', ar: 'الإجراءات: مراجع أساسية' },
        text: { fr: 'Le calendrier des échéances, les nouveautés administratives et le lexique.', en: 'Deadlines calendar, administrative updates and glossary.', es: 'Calendario de plazos, novedades administrativas y glosario.', de: 'Fristenkalender, Neuigkeiten aus der Verwaltung und Glossar.', ar: 'تقويم الآجال والمستجدات الإدارية والمعجم.' } },
      { id: 'faq', faq: ['car-180-days', 'import-car-permanent-return', 'customs', 'amo-health-return-mre', 'passport-cnie'],
        title: { fr: 'Questions fréquentes', en: 'Frequently asked questions', es: 'Preguntas frecuentes', de: 'Häufige Fragen', ar: 'أسئلة شائعة' },
        text: { fr: 'Les réponses courtes de nos guides ; chacune renvoie au guide complet.', en: 'Short answers from our guides; each one links to the full guide.', es: 'Respuestas breves de nuestras guías; cada una enlaza a la guía completa.', de: 'Kurze Antworten aus unseren Ratgebern, jeweils mit Link zum vollständigen Ratgeber.', ar: 'إجابات قصيرة من أدلتنا، وكل إجابة تحيل إلى الدليل الكامل.' } },
    ],
  },
  invest: {
    id: 'invest', hub: 'invest', icon: 'landmark',
    title: { fr: 'Je souhaite investir', en: 'I want to invest', es: 'Quiero invertir', de: 'Ich möchte investieren', ar: 'أرغب في الاستثمار' },
    text: { fr: 'Immobilier, entreprise, fiscalité et financement : les règles avant de vous lancer.', en: 'Property, business, tax and financing: the rules before you commit.', es: 'Inmuebles, empresa, fiscalidad y financiación: las reglas antes de lanzarte.', de: 'Immobilien, Unternehmen, Steuern und Finanzierung: die Regeln, bevor Sie loslegen.', ar: 'العقار والمقاولة والضرائب والتمويل: القواعد قبل أن تبدأ.' },
    cta: { fr: 'Explorer les opportunités', en: 'Explore the opportunities', es: 'Explorar las oportunidades', de: 'Möglichkeiten entdecken', ar: 'أستكشف الفرص' },
    rubrics: [
      { id: 'property', guides: ['buy-property-abroad', 'build-house', 'daam-sakane'], tools: ['calc-property-fees'],
        title: { fr: 'Investissement immobilier', en: 'Property investment', es: 'Inversión inmobiliaria', de: 'Immobilieninvestition', ar: 'الاستثمار العقاري' },
        text: { fr: 'Acheter ou construire : les étapes, les vérifications et les frais officiels.', en: 'Buying or building: the steps, the checks and the official fees.', es: 'Comprar o construir: los pasos, las comprobaciones y los gastos oficiales.', de: 'Kaufen oder bauen: die Schritte, die Prüfungen und die amtlichen Gebühren.', ar: 'الشراء أو البناء: المراحل والتحققات والرسوم الرسمية.' } },
      { id: 'business', guides: ['business-auto-entrepreneur-mre', 'bank-account', 'residence-permit'],
        title: { fr: 'Création d’entreprise', en: 'Starting a business', es: 'Crear una empresa', de: 'Unternehmensgründung', ar: 'إنشاء مقاولة' },
        text: { fr: 'Société ou auto-entrepreneur, compte bancaire et titre de séjour pour les étrangers.', en: 'Company or self-employed status, a bank account and residence permits for foreigners.', es: 'Sociedad o autónomo, cuenta bancaria y permiso de residencia para extranjeros.', de: 'Gesellschaft oder Kleinunternehmer, Bankkonto und Aufenthaltskarte für Ausländer.', ar: 'شركة أو مقاول ذاتي، حساب بنكي، وبطاقة الإقامة للأجانب.' } },
      { id: 'tax', guides: ['property-taxes', 'short-term-rental', 'mre-taxes', 'property-inheritance'], tools: ['calc-capital-gains'],
        title: { fr: 'Fiscalité et réglementation', en: 'Tax and regulation', es: 'Fiscalidad y normativa', de: 'Steuern und Vorschriften', ar: 'الضرائب والتنظيم' },
        text: { fr: 'Impôts sur la vente et la location, règles de la location courte, déclarations des MRE.', en: 'Tax on selling and letting, short-let rules, MRE declarations.', es: 'Impuestos sobre la venta y el alquiler, normas del alquiler de corta duración, declaraciones de los MRE.', de: 'Steuern auf Verkauf und Vermietung, Regeln der Kurzzeitvermietung, Erklärungen für MRE.', ar: 'الضرائب على البيع والكراء، وقواعد الكراء القصير، وتصريحات مغاربة العالم.' } },
      { id: 'outlook', guides: ['world-cup-2030', 'world-cup-2030-stadiums', 'cost-of-living', 'internet-coworking'], tools: ['calc-city-costs'],
        title: { fr: 'Opportunités : les repères', en: 'Opportunities: the facts', es: 'Oportunidades: los datos', de: 'Chancen: die Fakten', ar: 'الفرص: معطيات واقعية' },
        text: { fr: 'Mondial 2030, coût de la vie par ville, télétravail : des repères sourcés, aucune promesse de rendement.', en: 'World Cup 2030, living costs by city, remote work: sourced facts, no promise of returns.', es: 'Mundial 2030, coste de vida por ciudad, teletrabajo: datos con fuentes, sin promesas de rentabilidad.', de: 'WM 2030, Lebenshaltungskosten nach Stadt, Remote-Arbeit: belegte Fakten, keine Renditeversprechen.', ar: 'مونديال 2030، تكلفة المعيشة حسب المدينة، العمل عن بعد: معطيات موثقة دون وعود بالأرباح.' } },
      { id: 'places', cities: ['casablanca', 'rabat', 'tangier', 'marrakech', 'agadir', 'fes'], regions: ['casablanca-settat', 'rabat-sale-kenitra', 'tanger-tetouan-al-hoceima', 'marrakech-safi', 'souss-massa', 'fes-meknes'], hubs: ['cities', 'regions'],
        title: { fr: 'Régions et villes', en: 'Regions and cities', es: 'Regiones y ciudades', de: 'Regionen und Städte', ar: 'الجهات والمدن' },
        text: { fr: 'Les grandes villes et leurs régions, avec accès et repères pratiques.', en: 'The main cities and their regions, with access and practical pointers.', es: 'Las grandes ciudades y sus regiones, con accesos y referencias prácticas.', de: 'Die großen Städte und ihre Regionen, mit Anreise und praktischen Hinweisen.', ar: 'المدن الكبرى وجهاتها، مع طرق الوصول ومعطيات عملية.' } },
      { id: 'finance', guides: ['mre-mortgage', 'transfer-savings-mre', 'send-money'], tools: ['calc-mortgage', 'calc-transfer', 'calc-fx'],
        title: { fr: 'Financement et banques', en: 'Financing and banks', es: 'Financiación y bancos', de: 'Finanzierung und Banken', ar: 'التمويل والأبناك' },
        text: { fr: 'Crédit immobilier MRE, transfert de l’épargne et frais d’envoi d’argent.', en: 'MRE mortgages, moving your savings and money transfer fees.', es: 'Crédito hipotecario para MRE, traslado del ahorro y gastos de envío.', de: 'Immobilienkredit für MRE, Übertragung von Ersparnissen und Überweisungskosten.', ar: 'القرض العقاري لمغاربة العالم، وتحويل المدخرات، ورسوم إرسال الأموال.' } },
      { id: 'support', guides: ['power-of-attorney', 'apostille'], hubs: ['calendar', 'news', 'glossary'],
        title: { fr: 'Accompagnement et démarches', en: 'Support and paperwork', es: 'Acompañamiento y trámites', de: 'Begleitung und Formalitäten', ar: 'المواكبة والإجراءات' },
        text: { fr: 'Procuration, apostille, calendrier des démarches et nouveautés administratives.', en: 'Power of attorney, apostille, procedures calendar and administrative updates.', es: 'Poder notarial, apostilla, calendario de trámites y novedades administrativas.', de: 'Vollmacht, Apostille, Fristenkalender und Verwaltungsneuigkeiten.', ar: 'الوكالة والأبوستيل وتقويم الإجراءات والمستجدات الإدارية.' } },
      { id: 'tools', toolGrid: ['calc-property-fees', 'calc-mortgage', 'calc-capital-gains', 'calc-transfer', 'calc-fx', 'calc-city-costs'],
        title: { fr: 'Calculateurs', en: 'Calculators', es: 'Calculadoras', de: 'Rechner', ar: 'الحاسبات' },
        text: { fr: 'Chiffrer avant de décider : frais d’achat, crédit, plus-value, transfert, change.', en: 'Run the numbers before deciding: purchase fees, loan, capital gains, transfer, exchange.', es: 'Calcula antes de decidir: gastos de compra, crédito, plusvalía, envío, cambio.', de: 'Vor der Entscheidung rechnen: Kaufnebenkosten, Kredit, Wertzuwachs, Überweisung, Wechselkurs.', ar: 'احسب قبل أن تقرر: مصاريف الشراء، القرض، الربح العقاري، التحويل، الصرف.' } },
    ],
  },
  visit: {
    id: 'visit', hub: 'visit', icon: 'compass',
    title: { fr: 'Je visite le Maroc', en: 'I’m visiting Morocco', es: 'Visito Marruecos', de: 'Ich besuche Marokko', ar: 'أزور المغرب' },
    text: { fr: 'Villes, régions, hébergements, circuits et conseils pour voyager sereinement.', en: 'Cities, regions, places to stay, itineraries and tips for a smooth trip.', es: 'Ciudades, regiones, alojamiento, rutas y consejos para viajar tranquilo.', de: 'Städte, Regionen, Unterkünfte, Rundreisen und Tipps für eine entspannte Reise.', ar: 'المدن والجهات والإقامة والمسارات ونصائح لرحلة مريحة.' },
    cta: { fr: 'Découvrir le Maroc', en: 'Discover Morocco', es: 'Descubrir Marruecos', de: 'Marokko entdecken', ar: 'أكتشف المغرب' },
    rubrics: [
      { id: 'destinations', cityGrid: ['marrakech', 'fes', 'chefchaouen', 'essaouira', 'casablanca', 'tangier', 'merzouga', 'agadir'], hubs: ['cities'],
        title: { fr: 'Destinations et villes', en: 'Destinations and cities', es: 'Destinos y ciudades', de: 'Reiseziele und Städte', ar: 'الوجهات والمدن' },
        text: { fr: 'Médinas, côte atlantique, montagnes et désert : une fiche par ville.', en: 'Medinas, the Atlantic coast, mountains and desert: one page per city.', es: 'Medinas, costa atlántica, montañas y desierto: una ficha por ciudad.', de: 'Medinas, Atlantikküste, Berge und Wüste: eine Seite pro Stadt.', ar: 'المدن العتيقة والساحل الأطلسي والجبال والصحراء: صفحة لكل مدينة.' } },
      { id: 'regions', regions: 'all', hubs: ['regions'],
        title: { fr: 'Régions', en: 'Regions', es: 'Regiones', de: 'Regionen', ar: 'الجهات' },
        text: { fr: 'Les douze régions officielles, du Rif au Sahara, avec la meilleure saison et l’accès.', en: 'The twelve official regions, from the Rif to the Sahara, with the best season and access.', es: 'Las doce regiones oficiales, del Rif al Sáhara, con la mejor época y los accesos.', de: 'Die zwölf offiziellen Regionen, vom Rif bis zur Sahara, mit bester Reisezeit und Anreise.', ar: 'الجهات الاثنتا عشرة الرسمية، من الريف إلى الصحراء، مع أفضل موسم وطرق الوصول.' } },
      { id: 'stay', guides: ['riad-or-hotel', 'where-to-stay-marrakech', 'where-to-stay-fes', 'where-to-stay-chefchaouen', 'where-to-stay-essaouira', 'where-to-stay-merzouga', 'where-to-stay-casablanca', 'where-to-stay-tangier'], categories: ['stay'],
        title: { fr: 'Hébergements', en: 'Where to stay', es: 'Alojamiento', de: 'Unterkünfte', ar: 'الإقامة' },
        text: { fr: 'Riad ou hôtel, et le bon quartier ville par ville.', en: 'Riad or hotel, and the right neighbourhood city by city.', es: 'Riad u hotel, y el barrio adecuado ciudad por ciudad.', de: 'Riad oder Hotel und das richtige Viertel, Stadt für Stadt.', ar: 'رياض أم فندق، والحي المناسب في كل مدينة.' } },
      { id: 'transport', guides: ['airports', 'marrakech-airport', 'casablanca-airport', 'trains', 'ctm-supratours', 'transport-apps', 'tram-brt', 'car-rental'], tools: ['calc-highway-toll'],
        title: { fr: 'Transport', en: 'Getting around', es: 'Transporte', de: 'Unterwegs', ar: 'التنقل' },
        text: { fr: 'De l’aéroport au centre, train, bus, taxi, tram et voiture de location.', en: 'From the airport to town, trains, buses, taxis, trams and car hire.', es: 'Del aeropuerto al centro, tren, autobús, taxi, tranvía y coche de alquiler.', de: 'Vom Flughafen in die Stadt, Zug, Bus, Taxi, Tram und Mietwagen.', ar: 'من المطار إلى المدينة، القطار والحافلة وسيارة الأجرة والترامواي وكراء السيارات.' } },
      { id: 'experiences', guides: ['marrakech-day-trips', 'toubkal', 'taghazout-surf', 'dakhla', 'hammam'],
        title: { fr: 'Activités et expériences', en: 'Activities and experiences', es: 'Actividades y experiencias', de: 'Aktivitäten und Erlebnisse', ar: 'الأنشطة والتجارب' },
        text: { fr: 'Randonnée, surf, kitesurf, hammam et excursions à la journée.', en: 'Hiking, surfing, kitesurfing, hammams and day trips.', es: 'Senderismo, surf, kitesurf, hammam y excursiones de un día.', de: 'Wandern, Surfen, Kitesurfen, Hammam und Tagesausflüge.', ar: 'المشي الجبلي وركوب الأمواج والكايت سيرف والحمّام والرحلات اليومية.' } },
      { id: 'culture', guides: ['etiquette', 'darija-phrases', 'holidays-2027'], tools: ['ramadan-2027-times', 'prayer-times'],
        title: { fr: 'Culture et patrimoine', en: 'Culture and heritage', es: 'Cultura y patrimonio', de: 'Kultur und Kulturerbe', ar: 'الثقافة والتراث' },
        text: { fr: 'Usages, quelques mots de darija, fêtes et horaires du Ramadan.', en: 'Customs, a few words of Darija, holidays and Ramadan times.', es: 'Costumbres, algo de darija, fiestas y horarios de Ramadán.', de: 'Gepflogenheiten, etwas Darija, Feiertage und Ramadan-Zeiten.', ar: 'العادات وبعض كلمات الدارجة والأعياد وأوقات رمضان.' } },
      { id: 'food', guides: ['moroccan-food', 'tipping'],
        title: { fr: 'Gastronomie', en: 'Food and drink', es: 'Gastronomía', de: 'Essen und Trinken', ar: 'فن الطبخ' },
        text: { fr: 'Les plats à goûter, et combien laisser en pourboire.', en: 'Dishes to try, and how much to tip.', es: 'Platos que probar y cuánta propina dejar.', de: 'Gerichte zum Probieren und wie viel Trinkgeld.', ar: 'أطباق تستحق التذوق، وكم تترك من بقشيش.' } },
      { id: 'tips', guides: ['e-visa', 'sim-esim-morocco', 'cash-atms', 'health-travellers', 'scams-safety', 'time-zone'], tools: ['budget-calculator', 'calc-fx'],
        title: { fr: 'Conseils pratiques', en: 'Practical tips', es: 'Consejos prácticos', de: 'Praktische Tipps', ar: 'نصائح عملية' },
        text: { fr: 'Visa, carte SIM, argent, santé, sécurité et budget avant de partir.', en: 'Visa, SIM card, money, health, safety and budget before you go.', es: 'Visado, tarjeta SIM, dinero, salud, seguridad y presupuesto antes de salir.', de: 'Visum, SIM-Karte, Geld, Gesundheit, Sicherheit und Budget vor der Reise.', ar: 'التأشيرة والشريحة والمال والصحة والأمان والميزانية قبل السفر.' } },
      { id: 'routes', guides: ['merzouga-tour', 'fes-merzouga', 'chefchaouen-trip', 'essaouira-day-trip'],
        title: { fr: 'Itinéraires et circuits', en: 'Itineraries and tours', es: 'Itinerarios y circuitos', de: 'Routen und Rundreisen', ar: 'المسارات والجولات' },
        text: { fr: 'Trois jours dans le désert, la ville bleue, la côte atlantique : les trajets et les étapes.', en: 'Three days in the desert, the blue town, the Atlantic coast: routes and stops.', es: 'Tres días en el desierto, la ciudad azul, la costa atlántica: trayectos y etapas.', de: 'Drei Tage Wüste, die blaue Stadt, die Atlantikküste: Strecken und Etappen.', ar: 'ثلاثة أيام في الصحراء، المدينة الزرقاء، الساحل الأطلسي: المسارات والمحطات.' } },
    ],
  },
};

/** Photos authentiques déjà présentes (crédits : src/assets/photos/CREDITS.md et manifeste des villes). */
const STATIC_PHOTOS: Record<Exclude<PathId, 'visit'>, { src: ImageMetadata; credit: string; alt: T }> = {
  return: {
    src: portPhoto, credit: 'HrAd, CC BY-SA 3.0',
    alt: { fr: 'Ferries à quai au port de Tanger Med', en: 'Ferries moored at the port of Tanger Med', es: 'Ferris atracados en el puerto de Tanger Med', de: 'Fähren am Kai im Hafen Tanger Med', ar: 'عبّارات راسية في ميناء طنجة المتوسط' },
  },
  invest: {
    src: cfcPhoto, credit: 'AyourAchtouk, CC BY-SA 4.0',
    alt: { fr: 'Tours de bureaux de Casablanca Finance City', en: 'Office towers in Casablanca Finance City', es: 'Torres de oficinas de Casablanca Finance City', de: 'Bürotürme in Casablanca Finance City', ar: 'أبراج مكاتب في القطب المالي للدار البيضاء' },
  },
};

export function pathPhoto(id: PathId, lang: Locale): { src: ImageMetadata; alt: string; credit: string } | null {
  if (id === 'visit') {
    const p = placePhoto('hero', 'home-hero', lang);
    return p.image && p.credit ? { src: p.image, alt: p.alt, credit: p.credit } : null;
  }
  const s = STATIC_PHOTOS[id];
  return { src: s.src, alt: s.alt[lang], credit: s.credit };
}
