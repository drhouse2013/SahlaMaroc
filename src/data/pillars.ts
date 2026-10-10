/**
 * Pages piliers : chaque thème (catégorie) devient une page centrale qui explique le sujet,
 * propose un point de départ, les outils liés, les villes pertinentes et tous les guides.
 * Les pages « hub » MRE et Visiter le Maroc regroupent les thèmes par public.
 */
import type { Locale } from '../i18n/config';
import type { CategoryId } from '../i18n/categories';

export interface Pillar {
  intro: Record<Locale, string>;
  /** Guides à lire en premier (translationKey) */
  start: string[];
  /** Calculateurs liés (translationKey des pages calculateurs) */
  tools: string[];
  /** Villes liées (id de src/data/cities.ts) */
  cities: string[];
  /** Organismes officiels de référence (id de src/data/sources.ts) */
  sources: string[];
  /** Sujet réglementaire, fiscal ou financier : affiche l'avertissement « règles qui évoluent » */
  ymyl?: boolean;
}

export const PILLARS: Record<CategoryId, Pillar> = {
  retour: {
    intro: {
      fr: "Tout pour préparer le retour d'été au Maroc : l'opération Marhaba, le choix du ferry, la voiture immatriculée à l'étranger et la règle des 180 jours, l'assurance, l'autoroute depuis Tanger Med et les papiers des enfants et des animaux.",
      en: 'Everything to plan the summer return to Morocco: Operation Marhaba, choosing a ferry, your foreign-plated car and the 180-day rule, insurance, the motorway from Tanger Med, and paperwork for children and pets.',
      es: 'Todo para preparar la vuelta de verano a Marruecos: la Operación Marhaba, elegir el ferri, el coche con matrícula extranjera y la regla de los 180 días, el seguro, la autopista desde Tanger Med y los papeles de niños y mascotas.',
      de: 'Alles für die Heimreise im Sommer: Operation Marhaba, die Wahl der Fähre, das Auto mit ausländischem Kennzeichen und die 180-Tage-Regel, Versicherung, die Autobahn ab Tanger Med sowie Papiere für Kinder und Haustiere.',
      ar: 'كل ما تحتاجه للتحضير للعودة الصيفية إلى المغرب: عملية مرحبا، اختيار العبّارة، السيارة ذات الترقيم الأجنبي وقاعدة 180 يوماً، التأمين، الطريق السيار من طنجة المتوسط، ووثائق الأطفال والحيوانات.',
    },
    start: ['summer-checklist', 'marhaba-guide', 'ferry-guide'],
    tools: ['calc-summer', 'calc-car-days'],
    cities: ['tangier'],
    sources: ['fm5', 'douane', 'adm'],
    ymyl: true,
  },
  immobilier: {
    intro: {
      fr: "Acheter, construire, financer, louer ou hériter d'un bien au Maroc quand on vit à l'étranger : les étapes, les frais réels, l'aide Daam Sakane, le crédit MRE, la fiscalité et la procuration.",
      en: 'Buying, building, financing, renting out or inheriting property in Morocco while living abroad: the steps, the real costs, Daam Sakane aid, MRE mortgages, tax and power of attorney.',
      es: 'Comprar, construir, financiar, alquilar o heredar un inmueble en Marruecos viviendo en el extranjero: los pasos, los gastos reales, la ayuda Daam Sakane, el crédito para MRE, la fiscalidad y el poder notarial.',
      de: 'Eine Immobilie in Marokko kaufen, bauen, finanzieren, vermieten oder erben, während man im Ausland lebt: die Schritte, die echten Kosten, die Förderung Daam Sakane, Kredite für MRE, Steuern und Vollmacht.',
      ar: 'شراء عقار في المغرب أو بناؤه أو تمويله أو كراؤه أو إرثه وأنت مقيم بالخارج: المراحل، التكاليف الحقيقية، دعم السكن، القرض العقاري لمغاربة العالم، الضرائب والوكالة.',
    },
    start: ['buy-property-abroad', 'daam-sakane', 'mre-mortgage'],
    tools: ['calc-property-fees', 'calc-mortgage'],
    cities: ['casablanca', 'rabat', 'marrakech'],
    sources: ['ancfcc', 'dgi', 'daamsakane', 'oc', 'mremin'],
    ymyl: true,
  },
  money: {
    intro: {
      fr: "Envoyer de l'argent au Maroc sans payer trop cher, retirer et payer sur place, ouvrir un compte, comprendre ses impôts de MRE et estimer le coût de la vie : les repères pour bien gérer son argent entre deux pays.",
      en: 'Sending money to Morocco without overpaying, withdrawing and paying locally, opening an account, understanding MRE taxes and estimating living costs: the essentials for managing money between two countries.',
      es: 'Enviar dinero a Marruecos sin pagar de más, sacar dinero y pagar allí, abrir una cuenta, entender los impuestos de los MRE y estimar el coste de la vida: lo esencial para gestionar el dinero entre dos países.',
      de: 'Geld nach Marokko schicken, ohne zu viel zu zahlen, vor Ort abheben und bezahlen, ein Konto eröffnen, Steuern als MRE verstehen und Lebenshaltungskosten schätzen: das Wichtigste für Geld zwischen zwei Ländern.',
      ar: 'إرسال المال إلى المغرب دون دفع الكثير، السحب والأداء هناك، فتح حساب، فهم ضرائب مغاربة العالم وتقدير تكلفة المعيشة: الأساسيات لتدبير المال بين بلدين.',
    },
    start: ['send-money', 'cash-atms', 'mre-taxes'],
    tools: ['calc-transfer', 'budget-calculator'],
    cities: ['casablanca'],
    sources: ['oc', 'bkam', 'dgi'],
    ymyl: true,
  },
  demarches: {
    intro: {
      fr: "Visa et e-Visa, règle des 90 jours, carte de séjour, permis de conduire, passeport et CNIE, état civil, apostille, douane et retour définitif : les démarches expliquées simplement, avec les administrations à contacter.",
      en: 'Visas and e-Visa, the 90-day rule, residence permits, driving licences, passport and ID card, civil status, apostille, customs and moving back for good: paperwork explained simply, with the offices to contact.',
      es: 'Visado y e-Visa, regla de los 90 días, permiso de residencia, permiso de conducir, pasaporte y CNIE, estado civil, apostilla, aduana y retorno definitivo: los trámites explicados con sencillez y con las administraciones a las que acudir.',
      de: 'Visum und E-Visum, 90-Tage-Regel, Aufenthaltskarte, Führerschein, Pass und Personalausweis, Personenstand, Apostille, Zoll und endgültige Rückkehr: Behördengänge einfach erklärt, mit den zuständigen Stellen.',
      ar: 'التأشيرة والتأشيرة الإلكترونية، قاعدة 90 يوماً، بطاقة الإقامة، رخصة السياقة، جواز السفر والبطاقة الوطنية، الحالة المدنية، الأبوستيل، الجمارك والعودة النهائية: الإجراءات بشرح مبسط مع الإدارات المختصة.',
    },
    start: ['visa-90-days', 'passport-cnie', 'customs'],
    tools: ['calc-car-days', 'calc-customs', 'calc-retirement-budget'],
    cities: ['rabat'],
    sources: ['acces', 'diplomatie', 'dgsn', 'douane', 'narsa'],
    ymyl: true,
  },
  arrival: {
    intro: {
      fr: "Bien arriver au Maroc : rejoindre le centre depuis les aéroports, choisir sa carte SIM ou eSIM, prendre le train, le bus, le tram ou un taxi, louer une voiture et éviter les arnaques courantes.",
      en: 'Arriving well in Morocco: getting from the airports to the centre, choosing a SIM or eSIM, taking the train, coach, tram or a taxi, renting a car and avoiding common scams.',
      es: 'Llegar bien a Marruecos: ir del aeropuerto al centro, elegir SIM o eSIM, coger el tren, el autocar, el tranvía o un taxi, alquilar un coche y evitar los timos habituales.',
      de: 'Gut in Marokko ankommen: vom Flughafen ins Zentrum, SIM oder eSIM wählen, Zug, Bus, Straßenbahn oder Taxi nehmen, ein Auto mieten und typische Maschen vermeiden.',
      ar: 'وصول مريح إلى المغرب: من المطار إلى وسط المدينة، اختيار الشريحة أو eSIM، ركوب القطار أو الحافلة أو الترامواي أو سيارة الأجرة، كراء سيارة وتجنب أساليب الاحتيال الشائعة.',
    },
    start: ['casablanca-airport', 'sim-esim-morocco', 'trains'],
    tools: ['budget-calculator'],
    cities: ['casablanca', 'marrakech', 'tangier'],
    sources: ['onda', 'oncf', 'anrt'],
  },
  tours: {
    intro: {
      fr: "Les excursions qui valent le coup : le désert de Merzouga, l'Atlas et le Toubkal, Essaouira, Chefchaouen, le surf à Taghazout ou le kitesurf à Dakhla, avec les durées, les budgets et les pièges à éviter.",
      en: 'The trips worth taking: the Merzouga desert, the Atlas and Toubkal, Essaouira, Chefchaouen, surfing in Taghazout or kitesurfing in Dakhla, with durations, budgets and traps to avoid.',
      es: 'Las excursiones que merecen la pena: el desierto de Merzouga, el Atlas y el Toubkal, Esauira, Chefchaouen, el surf en Taghazout o el kitesurf en Dajla, con duraciones, presupuestos y trampas a evitar.',
      de: 'Die Ausflüge, die sich lohnen: die Wüste bei Merzouga, Atlas und Toubkal, Essaouira, Chefchaouen, Surfen in Taghazout oder Kitesurfen in Dakhla – mit Dauer, Budget und Fallen, die man meiden sollte.',
      ar: 'الرحلات التي تستحق: صحراء مرزوكة، الأطلس وتوبقال، الصويرة، شفشاون، ركوب الأمواج في تغازوت أو الكايتسيرف في الداخلة، مع المدد والميزانيات والفخاخ التي يجب تجنبها.',
    },
    start: ['merzouga-tour', 'marrakech-day-trips', 'chefchaouen-trip'],
    tools: ['budget-calculator'],
    cities: ['marrakech', 'fes', 'essaouira', 'chefchaouen', 'taghazout'],
    sources: ['onmt'],
  },
  stay: {
    intro: {
      fr: 'Riad ou hôtel, médina ou ville nouvelle : les quartiers où loger dans chaque grande ville, selon votre séjour, votre budget et votre façon de voyager.',
      en: 'Riad or hotel, medina or new town: the best areas to stay in each major city, depending on your trip, budget and travel style.',
      es: 'Riad u hotel, medina o ciudad nueva: los barrios donde alojarse en cada gran ciudad según tu viaje, tu presupuesto y tu forma de viajar.',
      de: 'Riad oder Hotel, Medina oder Neustadt: die besten Viertel zum Übernachten in jeder großen Stadt, je nach Reise, Budget und Reisestil.',
      ar: 'رياض أم فندق، مدينة عتيقة أم مدينة جديدة: أفضل الأحياء للإقامة في كل مدينة كبرى حسب رحلتك وميزانيتك وطريقة سفرك.',
    },
    start: ['riad-or-hotel', 'where-to-stay-marrakech', 'where-to-stay-fes'],
    tools: ['budget-calculator'],
    cities: ['marrakech', 'casablanca', 'rabat', 'tangier', 'fes', 'essaouira', 'chefchaouen', 'taghazout'],
    sources: ['onmt'],
  },
  living: {
    intro: {
      fr: "Vivre au Maroc, même quelques mois : culture et savoir-vivre, darija, cuisine, santé, internet et coworking, écoles, jours fériés, villes pour digital nomads et Coupe du monde 2030.",
      en: 'Living in Morocco, even for a few months: culture and etiquette, Darija, food, health, internet and coworking, schools, public holidays, cities for digital nomads and the 2030 World Cup.',
      es: 'Vivir en Marruecos, aunque sea unos meses: cultura y costumbres, darija, gastronomía, salud, internet y coworking, colegios, festivos, ciudades para nómadas digitales y el Mundial de 2030.',
      de: 'In Marokko leben, auch nur ein paar Monate: Kultur und Umgangsformen, Darija, Küche, Gesundheit, Internet und Coworking, Schulen, Feiertage, Städte für digitale Nomaden und die WM 2030.',
      ar: 'العيش في المغرب ولو لبضعة أشهر: الثقافة وآداب التعامل، الدارجة، المطبخ، الصحة، الإنترنت والعمل المشترك، المدارس، العطل، مدن الرحّالة الرقميين وكأس العالم 2030.',
    },
    start: ['etiquette', 'nomad-cities', 'health-travellers'],
    tools: ['budget-calculator'],
    cities: ['rabat', 'casablanca', 'taghazout'],
    sources: ['onmt', 'anrt'],
  },
};

/** Pages hub par public : thèmes, outils et guides de départ */
export const AUDIENCE_HUBS = {
  mre: {
    categories: ['retour', 'immobilier', 'money', 'demarches'] as CategoryId[],
    tools: ['calc-summer', 'calc-car-days', 'calc-customs', 'calc-transfer', 'calc-property-fees', 'calc-mortgage', 'calc-retirement-budget'],
    start: ['summer-checklist', 'marhaba-guide', 'car-180-days', 'send-money', 'buy-property-abroad', 'passport-cnie'],
    cities: ['tangier', 'casablanca', 'rabat'],
  },
  visit: {
    categories: ['arrival', 'tours', 'stay', 'living'] as CategoryId[],
    tools: ['budget-calculator'],
    start: ['e-visa', 'sim-esim-morocco', 'marrakech-airport', 'scams-safety', 'riad-or-hotel', 'merzouga-tour'],
    cities: ['marrakech', 'fes', 'chefchaouen', 'essaouira', 'casablanca', 'taghazout'],
  },
} as const;
