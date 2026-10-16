/**
 * Pages villes (/fr/villes/marrakech…).
 * Règle éditoriale : chaque information ci-dessous reprend un fait déjà publié et sourcé dans
 * nos guides (où loger, aéroports, trains, bus, surf…). Aucune donnée inventée : les budgets
 * viennent du calculateur (src/config/costs.ts) et sont affichés comme des estimations datées.
 */
import type { Locale } from '../i18n/config';
import type { Scene } from './home';
import type { City as CostCity } from '../config/costs';

export interface CityText {
  intro: string;
  why: string[];
  when: string;
  access: string;
  areas: { name: string; text: string }[];
  faq: { q: string; a: string }[];
}

export interface CityPage {
  id: Scene;
  slug: Record<Locale, string>;
  /** Ville du calculateur de budget (absente = pas de budget affiché) */
  costCity?: CostCity;
  /** Coordonnées WGS84 du centre-ville (carte) */
  lat?: number;
  lon?: number;
  host2030?: boolean;
  /** Guides (translationKey) : accès, hébergement, excursions, autres */
  accessKeys: string[];
  stayKey: string;
  tripKeys: string[];
  moreKeys: string[];
  /** Requête Booking.com pour le lien hébergement */
  bookingQuery: string;
  text: Record<Locale, CityText>;
}

export const CITY_PAGES: CityPage[] = [
  {
    id: 'marrakech',
    slug: { en: 'marrakech', fr: 'marrakech', es: 'marrakech', de: 'marrakesch', ar: 'murrakush' },
    lat: 31.6295,
    lon: -7.9811,
    costCity: 'marrakech',
    host2030: true,
    accessKeys: ['marrakech-airport', 'trains', 'ctm-supratours'],
    stayKey: 'where-to-stay-marrakech',
    tripKeys: ['marrakech-day-trips', 'merzouga-tour', 'essaouira-day-trip', 'toubkal'],
    moreKeys: ['riad-or-hotel', 'hammam', 'scams-safety', 'nomad-cities'],
    bookingQuery: 'Marrakech',
    text: {
      fr: {
        intro: "Marrakech, ce sont deux villes en une : la médina fortifiée, ses riads et ses souks, et la ville nouvelle (Guéliz, Hivernage) avec ses avenues, cafés et appartements. C'est aussi le principal point de départ des excursions vers l'Atlas et le désert.",
        why: ['Dormir dans un riad au cœur de la médina, à quelques minutes des souks', "Le plus grand choix d'excursions : Atlas, Ourika, Agafay, Essaouira, désert", 'Guéliz pour les longs séjours : cafés, coworkings, supermarchés et fibre'],
        when: "Le printemps et l'automne sont les périodes les plus agréables ; de juin à septembre, la chaleur est très forte.",
        access: "L'aéroport Marrakech-Menara est proche de la ville : le bus 19 (environ 20 DH) dessert Jemaa el-Fna et Guéliz, sinon prenez un taxi à la station officielle. Le train relie Marrakech à Casablanca et Rabat, et les autocars CTM/Supratours desservent Essaouira et Agadir.",
        areas: [
          { name: 'Médina', text: "L'expérience riad : Mouassine, Bab Doukkala, Riad Zitoun ou la Kasbah. Ruelles inaccessibles aux taxis." },
          { name: 'Guéliz', text: 'Centre moderne, pratique pour les longs séjours, à environ 10 minutes de la médina en petit taxi.' },
          { name: 'Hivernage et Palmeraie', text: 'Grands hôtels, resorts avec piscine, ambiance plus calme et moins locale.' },
        ],
        faq: [
          { q: 'Où loger à Marrakech pour un premier séjour ?', a: "Un riad dans la médina, près d'une porte accessible en voiture, pour 3 à 5 nuits. Pour un long séjour ou du télétravail, un appartement à Guéliz est plus pratique." },
          { q: "Comment aller de l'aéroport à la médina ?", a: "Le bus 19 coûte environ 20 DH et passe environ toutes les 30 minutes de 7 h à 21 h 30. Le taxi est plus simple de nuit : prenez-le à la station officielle, devant le terminal." },
        ],
      },
      en: {
        intro: 'Marrakech is two cities in one: the walled medina with its riads and souks, and the new town (Gueliz, Hivernage) with avenues, cafés and flats. It is also the main starting point for trips to the Atlas and the desert.',
        why: ['Sleep in a riad in the medina, minutes from the souks', 'The widest choice of day trips: Atlas, Ourika, Agafay, Essaouira, the desert', 'Gueliz for long stays: cafés, coworking spaces, supermarkets and fibre'],
        when: 'Spring and autumn are the most pleasant seasons; from June to September the heat is intense.',
        access: 'Marrakech-Menara airport is close to town: bus 19 (about 20 MAD) serves Jemaa el-Fna and Gueliz, otherwise take a cab from the official taxi rank. Trains link Marrakech with Casablanca and Rabat, and CTM/Supratours coaches go to Essaouira and Agadir.',
        areas: [
          { name: 'Medina', text: 'The riad experience: Mouassine, Bab Doukkala, Riad Zitoun or the Kasbah. Lanes are closed to taxis.' },
          { name: 'Gueliz', text: 'The modern centre, practical for long stays, about 10 minutes from the medina by petit taxi.' },
          { name: 'Hivernage & Palmeraie', text: 'Big hotels and resorts with pools; calmer and less local.' },
        ],
        faq: [
          { q: 'Where should I stay in Marrakech on a first visit?', a: 'A riad in the medina, near a gate reachable by car, for 3 to 5 nights. For a long stay or remote work, a flat in Gueliz is more practical.' },
          { q: 'How do I get from the airport to the medina?', a: 'Bus 19 costs about 20 MAD and runs roughly every 30 minutes from 7 am to 9.30 pm. A taxi is easier at night: take one from the official rank outside the terminal.' },
        ],
      },
      es: {
        intro: 'Marrakech son dos ciudades en una: la medina amurallada, con sus riads y zocos, y la ciudad nueva (Gueliz, Hivernage), con avenidas, cafés y pisos. También es el principal punto de partida de las excursiones al Atlas y al desierto.',
        why: ['Dormir en un riad en la medina, a pocos minutos de los zocos', 'La mayor oferta de excursiones: Atlas, Ourika, Agafay, Esauira, desierto', 'Gueliz para estancias largas: cafés, coworkings, supermercados y fibra'],
        when: 'La primavera y el otoño son las épocas más agradables; de junio a septiembre el calor es muy fuerte.',
        access: 'El aeropuerto Marrakech-Menara está cerca de la ciudad: el autobús 19 (unos 20 MAD) llega a Jemaa el-Fna y Gueliz; si no, toma un taxi en la parada oficial. El tren une Marrakech con Casablanca y Rabat, y los autocares CTM/Supratours van a Esauira y Agadir.',
        areas: [
          { name: 'Medina', text: 'La experiencia riad: Mouassine, Bab Doukkala, Riad Zitoun o la Kasbah. Callejuelas sin acceso para taxis.' },
          { name: 'Gueliz', text: 'Centro moderno, práctico para estancias largas, a unos 10 minutos de la medina en petit taxi.' },
          { name: 'Hivernage y Palmeral', text: 'Grandes hoteles y resorts con piscina; ambiente más tranquilo y menos local.' },
        ],
        faq: [
          { q: '¿Dónde alojarse en Marrakech en una primera visita?', a: 'En un riad de la medina, cerca de una puerta accesible en coche, durante 3 a 5 noches. Para una estancia larga o teletrabajo, un piso en Gueliz es más práctico.' },
          { q: '¿Cómo ir del aeropuerto a la medina?', a: 'El autobús 19 cuesta unos 20 MAD y pasa aproximadamente cada 30 minutos de 7:00 a 21:30. De noche es más sencillo el taxi: tómalo en la parada oficial, delante de la terminal.' },
        ],
      },
      de: {
        intro: 'Marrakesch sind zwei Städte in einer: die ummauerte Medina mit Riads und Souks und die Neustadt (Gueliz, Hivernage) mit Boulevards, Cafés und Wohnungen. Außerdem ist die Stadt der wichtigste Ausgangspunkt für Ausflüge in den Atlas und die Wüste.',
        why: ['Im Riad mitten in der Medina wohnen, wenige Minuten von den Souks', 'Die größte Auswahl an Ausflügen: Atlas, Ourika, Agafay, Essaouira, Wüste', 'Gueliz für lange Aufenthalte: Cafés, Coworkings, Supermärkte und Glasfaser'],
        when: 'Frühling und Herbst sind am angenehmsten; von Juni bis September ist es sehr heiß.',
        access: 'Der Flughafen Marrakesch-Menara liegt nah an der Stadt: Bus 19 (etwa 20 MAD) fährt nach Jemaa el-Fna und Gueliz, sonst ein Taxi am offiziellen Taxistand. Züge verbinden Marrakesch mit Casablanca und Rabat, CTM-/Supratours-Busse fahren nach Essaouira und Agadir.',
        areas: [
          { name: 'Medina', text: 'Das Riad-Erlebnis: Mouassine, Bab Doukkala, Riad Zitoun oder die Kasbah. Die Gassen sind für Taxis gesperrt.' },
          { name: 'Gueliz', text: 'Modernes Zentrum, praktisch für lange Aufenthalte, etwa 10 Minuten mit dem Petit Taxi von der Medina.' },
          { name: 'Hivernage & Palmeraie', text: 'Große Hotels und Resorts mit Pool; ruhiger und weniger lokal.' },
        ],
        faq: [
          { q: 'Wo wohnt man in Marrakesch beim ersten Besuch?', a: 'In einem Riad in der Medina, nahe einem mit dem Auto erreichbaren Tor, für 3 bis 5 Nächte. Für lange Aufenthalte oder Remote-Arbeit ist eine Wohnung in Gueliz praktischer.' },
          { q: 'Wie kommt man vom Flughafen in die Medina?', a: 'Bus 19 kostet etwa 20 MAD und fährt ungefähr alle 30 Minuten von 7 bis 21:30 Uhr. Nachts ist ein Taxi einfacher: am offiziellen Stand vor dem Terminal nehmen.' },
        ],
      },
      ar: {
        intro: 'مراكش مدينتان في مدينة واحدة: المدينة العتيقة المسوّرة برياضاتها وأسواقها، والمدينة الجديدة (جليز، الحي الشتوي) بشوارعها ومقاهيها وشققها. وهي أيضاً أهم نقطة انطلاق للرحلات نحو الأطلس والصحراء.',
        why: ['الإقامة في رياض وسط المدينة العتيقة على بعد دقائق من الأسواق', 'أكبر عرض للرحلات: الأطلس، أوريكا، أكفاي، الصويرة، الصحراء', 'جليز للإقامات الطويلة: مقاهٍ، فضاءات عمل، متاجر وألياف بصرية'],
        when: 'الربيع والخريف أنسب الفترات؛ من يونيو إلى شتنبر تكون الحرارة شديدة جداً.',
        access: 'مطار مراكش المنارة قريب من المدينة: الحافلة 19 (حوالي 20 درهماً) تصل إلى ساحة جامع الفنا وجليز، وإلا فخذ سيارة أجرة من المحطة الرسمية. القطار يربط مراكش بالدار البيضاء والرباط، وحافلات CTM وسوبراتور تصل إلى الصويرة وأكادير.',
        areas: [
          { name: 'المدينة العتيقة', text: 'تجربة الرياض: المواسين، باب دكالة، رياض الزيتون أو القصبة. الأزقة لا تدخلها سيارات الأجرة.' },
          { name: 'جليز', text: 'المركز الحديث، عملي للإقامات الطويلة، على بعد حوالي 10 دقائق من المدينة العتيقة بسيارة أجرة صغيرة.' },
          { name: 'الحي الشتوي والنخيل', text: 'فنادق كبرى ومنتجعات بمسابح؛ أجواء أهدأ وأقل محلية.' },
        ],
        faq: [
          { q: 'أين أقيم في مراكش في الزيارة الأولى؟', a: 'في رياض بالمدينة العتيقة قرب باب تصله السيارات، لمدة 3 إلى 5 ليالٍ. للإقامة الطويلة أو العمل عن بعد، شقة في جليز أكثر عملية.' },
          { q: 'كيف أصل من المطار إلى المدينة العتيقة؟', a: 'الحافلة 19 تكلف حوالي 20 درهماً وتمر تقريباً كل 30 دقيقة من 7 صباحاً إلى 9:30 مساءً. ليلاً سيارة الأجرة أسهل: خذها من المحطة الرسمية أمام المبنى.' },
        ],
      },
    },
  },
  {
    id: 'casablanca',
    slug: { en: 'casablanca', fr: 'casablanca', es: 'casablanca', de: 'casablanca', ar: 'ad-dar-al-bayda' },
    lat: 33.5731,
    lon: -7.5898,
    costCity: 'casablanca',
    host2030: true,
    accessKeys: ['casablanca-airport', 'tram-brt', 'trains'],
    stayKey: 'where-to-stay-casablanca',
    tripKeys: ['trains', 'where-to-stay-rabat'],
    moreKeys: ['internet-coworking', 'transport-apps', 'world-cup-2030', 'bank-account'],
    bookingQuery: 'Casablanca',
    text: {
      fr: {
        intro: "La capitale économique du Maroc est immense, animée et plus pratique que « carte postale ». Elle concentre le principal aéroport international, les bureaux, la meilleure couverture fibre et une vraie vie urbaine, de la corniche aux quartiers Art déco.",
        why: ['La mosquée Hassan II, la corniche et le centre Art déco', 'Une base pratique : aéroport international, gares, tramway', "Quartiers vivants pour travailler ou s'installer : Maârif, Gauthier, Racine"],
        when: 'Le climat océanique reste doux toute l\'année, ce qui en fait une destination possible en toute saison.',
        access: "L'aéroport Mohammed V est à environ 30 km : le train rejoint Casa-Voyageurs en 35 à 45 minutes (environ 43 DH en 2ᵉ classe), l'Aérobus va à Casa-Port pour 50 DH. En ville, le tramway et le BRT aident à éviter les embouteillages.",
        areas: [
          { name: 'Maârif et centre-ville', text: 'Commerçant et pratique, pour les affaires et les courts séjours.' },
          { name: 'Gauthier et Racine', text: 'Branché ou résidentiel, bonnes tables, appartements pour courts séjours.' },
          { name: 'Ain Diab et Anfa', text: 'Corniche, clubs de plage, hôtels en bord de mer et résidentiel haut de gamme.' },
        ],
        faq: [
          { q: "Quel est le moyen le moins cher de rejoindre le centre depuis l'aéroport ?", a: 'Le train ONCF jusqu\'à Casa-Voyageurs (environ 43 DH en 2ᵉ classe) ou l\'Aérobus jusqu\'à Casa-Port (50 DH, 24 h/24).' },
          { q: 'Quel quartier choisir à Casablanca ?', a: 'Dormez près de là où vous passerez votre temps, car la circulation est dense : Maârif ou le centre pour la praticité, Gauthier pour les restaurants, Ain Diab pour la plage.' },
        ],
      },
      en: {
        intro: "Morocco's business capital is huge, lively and more practical than picture-postcard. It has the main international airport, offices, the best fibre coverage and real city life, from the ocean corniche to the Art Deco centre.",
        why: ['The Hassan II Mosque, the corniche and the Art Deco centre', 'A practical base: international airport, train stations, tram', 'Lively areas to work or settle: Maarif, Gauthier, Racine'],
        when: 'The ocean climate stays mild all year, so it works in any season.',
        access: 'Mohammed V airport is about 30 km away: the train reaches Casa-Voyageurs in 35 to 45 minutes (about 43 MAD in 2nd class), and the Aerobus goes to Casa-Port for 50 MAD. In town, the tram and BRT help you avoid traffic jams.',
        areas: [
          { name: 'Maarif & city centre', text: 'Busy and practical, for business and short stays.' },
          { name: 'Gauthier & Racine', text: 'Trendy or residential, good restaurants, flats for short stays.' },
          { name: 'Ain Diab & Anfa', text: 'Corniche, beach clubs, seafront hotels and upmarket residential streets.' },
        ],
        faq: [
          { q: 'What is the cheapest way from the airport to the centre?', a: 'The ONCF train to Casa-Voyageurs (about 43 MAD in 2nd class) or the Aerobus to Casa-Port (50 MAD, 24/7).' },
          { q: 'Which area should I stay in?', a: 'Stay close to where you will spend your time, because traffic is heavy: Maarif or the centre for convenience, Gauthier for restaurants, Ain Diab for the beach.' },
        ],
      },
      es: {
        intro: 'La capital económica de Marruecos es enorme, animada y más práctica que de postal. Concentra el principal aeropuerto internacional, las oficinas, la mejor cobertura de fibra y una auténtica vida urbana, de la corniche al centro art déco.',
        why: ['La mezquita Hassan II, la corniche y el centro art déco', 'Una base práctica: aeropuerto internacional, estaciones, tranvía', 'Barrios vivos para trabajar o instalarse: Maarif, Gauthier, Racine'],
        when: 'El clima oceánico es suave todo el año, así que se puede visitar en cualquier estación.',
        access: 'El aeropuerto Mohammed V está a unos 30 km: el tren llega a Casa-Voyageurs en 35 a 45 minutos (unos 43 MAD en segunda clase) y el Aerobus va a Casa-Port por 50 MAD. En la ciudad, el tranvía y el BRT ayudan a evitar los atascos.',
        areas: [
          { name: 'Maarif y centro', text: 'Comercial y práctico, para negocios y estancias cortas.' },
          { name: 'Gauthier y Racine', text: 'De moda o residencial, buenos restaurantes, pisos para estancias cortas.' },
          { name: 'Ain Diab y Anfa', text: 'Corniche, clubes de playa, hoteles frente al mar y zona residencial de alto nivel.' },
        ],
        faq: [
          { q: '¿Cuál es la forma más barata de ir del aeropuerto al centro?', a: 'El tren ONCF hasta Casa-Voyageurs (unos 43 MAD en segunda clase) o el Aerobus hasta Casa-Port (50 MAD, 24 horas).' },
          { q: '¿En qué barrio alojarse?', a: 'Cerca de donde vayas a pasar el tiempo, porque el tráfico es denso: Maarif o el centro por comodidad, Gauthier por los restaurantes, Ain Diab por la playa.' },
        ],
      },
      de: {
        intro: 'Marokkos Wirtschaftshauptstadt ist riesig, lebendig und eher praktisch als postkartenschön. Hier liegen der wichtigste internationale Flughafen, Büros, die beste Glasfaserabdeckung und echtes Großstadtleben, von der Corniche bis zum Art-déco-Zentrum.',
        why: ['Die Hassan-II.-Moschee, die Corniche und das Art-déco-Zentrum', 'Praktische Basis: internationaler Flughafen, Bahnhöfe, Straßenbahn', 'Lebendige Viertel zum Arbeiten oder Wohnen: Maarif, Gauthier, Racine'],
        when: 'Das Meeresklima ist das ganze Jahr mild – die Stadt passt zu jeder Jahreszeit.',
        access: 'Der Flughafen Mohammed V liegt etwa 30 km entfernt: Der Zug erreicht Casa-Voyageurs in 35 bis 45 Minuten (etwa 43 MAD in der 2. Klasse), der Aerobus fährt für 50 MAD nach Casa-Port. In der Stadt helfen Straßenbahn und BRT gegen Staus.',
        areas: [
          { name: 'Maarif & Zentrum', text: 'Geschäftig und praktisch, für Geschäftsreisen und kurze Aufenthalte.' },
          { name: 'Gauthier & Racine', text: 'Angesagt oder ruhig, gute Restaurants, Wohnungen für kurze Aufenthalte.' },
          { name: 'Ain Diab & Anfa', text: 'Corniche, Beach-Clubs, Hotels am Meer und gehobene Wohnviertel.' },
        ],
        faq: [
          { q: 'Wie kommt man am günstigsten vom Flughafen ins Zentrum?', a: 'Mit dem ONCF-Zug nach Casa-Voyageurs (etwa 43 MAD, 2. Klasse) oder dem Aerobus nach Casa-Port (50 MAD, rund um die Uhr).' },
          { q: 'In welchem Viertel sollte man wohnen?', a: 'Nah an dem Ort, an dem man die meiste Zeit verbringt, denn der Verkehr ist dicht: Maarif oder Zentrum für Komfort, Gauthier für Restaurants, Ain Diab für den Strand.' },
        ],
      },
      ar: {
        intro: 'العاصمة الاقتصادية للمغرب مدينة ضخمة وحيوية، عملية أكثر منها سياحية. فيها أهم مطار دولي والمكاتب وأفضل تغطية بالألياف البصرية وحياة حضرية حقيقية، من الكورنيش إلى وسط المدينة ذي الطراز الآرت ديكو.',
        why: ['مسجد الحسن الثاني والكورنيش ووسط المدينة بطراز الآرت ديكو', 'قاعدة عملية: مطار دولي، محطات قطار، ترامواي', 'أحياء حيوية للعمل أو الاستقرار: المعاريف، غوتييه، راسين'],
        when: 'المناخ المحيطي معتدل طوال السنة، فيمكن زيارتها في أي فصل.',
        access: 'مطار محمد الخامس على بعد حوالي 30 كلم: القطار يصل إلى محطة الدار البيضاء المسافرين في 35 إلى 45 دقيقة (حوالي 43 درهماً في الدرجة الثانية)، والحافلة «إيروبيس» تصل إلى محطة الميناء بـ50 درهماً. داخل المدينة يساعد الترامواي والباص السريع على تفادي الازدحام.',
        areas: [
          { name: 'المعاريف ووسط المدينة', text: 'تجاري وعملي، للأعمال والإقامات القصيرة.' },
          { name: 'غوتييه وراسين', text: 'عصري أو سكني، مطاعم جيدة، شقق للإقامات القصيرة.' },
          { name: 'عين الذئاب وأنفا', text: 'الكورنيش ونوادي الشاطئ وفنادق على البحر وأحياء سكنية راقية.' },
        ],
        faq: [
          { q: 'ما أرخص طريقة للوصول من المطار إلى وسط المدينة؟', a: 'قطار المكتب الوطني للسكك الحديدية إلى محطة الدار البيضاء المسافرين (حوالي 43 درهماً في الدرجة الثانية) أو حافلة إيروبيس إلى محطة الميناء (50 درهماً، طوال اليوم).' },
          { q: 'أي حي أختار في الدار البيضاء؟', a: 'أقم قرب المكان الذي ستقضي فيه وقتك لأن حركة السير كثيفة: المعاريف أو الوسط للعملية، غوتييه للمطاعم، عين الذئاب للشاطئ.' },
        ],
      },
    },
  },
  {
    id: 'rabat',
    slug: { en: 'rabat', fr: 'rabat', es: 'rabat', de: 'rabat', ar: 'ar-ribat' },
    lat: 34.0209,
    lon: -6.8416,
    costCity: 'rabat',
    host2030: true,
    accessKeys: ['airports', 'trains', 'tram-brt'],
    stayKey: 'where-to-stay-rabat',
    tripKeys: ['where-to-stay-casablanca', 'trains'],
    moreKeys: ['residence-permit', 'world-cup-2030', 'nomad-cities'],
    bookingQuery: 'Rabat',
    text: {
      fr: {
        intro: 'La capitale est verte, propre et agréable à pied : tramway, plage, médina tranquille et grands monuments. Plus calme que Marrakech ou Casablanca, c\'est une très bonne base pour les couples, les familles et les longs séjours.',
        why: ['La Kasbah des Oudayas, la Tour Hassan et le mausolée Mohammed V', 'Une ville à taille humaine, avec tramway entre Rabat et Salé', 'À environ 1 h 20 de Tanger en TGV Al Boraq'],
        when: 'Le climat océanique est doux toute l\'année ; le printemps et l\'automne sont particulièrement agréables pour marcher.',
        access: "La gare Rabat-Ville est sur la ligne du TGV Al Boraq (environ 1 h 20 depuis Tanger) et des trains vers Casablanca. L'aéroport Rabat-Salé est proche du centre, et le tramway relie Rabat, Salé, la gare et la médina.",
        areas: [
          { name: 'Médina et Oudayas', text: 'Ruelles bleues et blanches, riads et maisons d\'hôtes.' },
          { name: 'Hassan', text: 'Le quartier historique, grands hôtels proches des monuments.' },
          { name: 'Agdal et Souissi', text: 'Moderne et commerçant, ou résidentiel et très calme.' },
        ],
        faq: [
          { q: 'Rabat ou Casablanca : où loger ?', a: 'Rabat est plus calme et plus verte ; Casablanca est plus grande et plus dynamique. Beaucoup de voyageurs logent dans l\'une et visitent l\'autre en train.' },
          { q: 'Comment se déplacer à Rabat ?', a: 'À pied dans le centre et la médina, et en tramway entre Rabat, Salé, la gare et la médina.' },
        ],
      },
      en: {
        intro: 'The capital is green, clean and walkable: a tram, a beach, a quiet medina and major monuments. Calmer than Marrakech or Casablanca, it is a great base for couples, families and long stays.',
        why: ['The Kasbah of the Udayas, Hassan Tower and the Mohammed V Mausoleum', 'A human-scale city with a tram between Rabat and Salé', 'About 1 h 20 from Tangier on the Al Boraq high-speed train'],
        when: 'The ocean climate is mild all year; spring and autumn are especially pleasant for walking.',
        access: 'Rabat-Ville station is on the Al Boraq high-speed line (about 1 h 20 from Tangier) and has trains to Casablanca. Rabat-Salé airport is close to the centre, and the tram links Rabat, Salé, the station and the medina.',
        areas: [
          { name: 'Medina & Udayas', text: 'Blue-and-white lanes, riads and guesthouses.' },
          { name: 'Hassan', text: 'The historic district, big hotels close to the monuments.' },
          { name: 'Agdal & Souissi', text: 'Modern and busy, or residential and very quiet.' },
        ],
        faq: [
          { q: 'Rabat or Casablanca: where should I stay?', a: 'Rabat is calmer and greener; Casablanca is bigger and busier. Many travellers stay in one and visit the other by train.' },
          { q: 'How do I get around Rabat?', a: 'On foot in the centre and the medina, and by tram between Rabat, Salé, the station and the medina.' },
        ],
      },
      es: {
        intro: 'La capital es verde, limpia y agradable para pasear: tranvía, playa, una medina tranquila y grandes monumentos. Más tranquila que Marrakech o Casablanca, es una muy buena base para parejas, familias y estancias largas.',
        why: ['La Kasbah de los Udayas, la Torre Hassan y el mausoleo Mohammed V', 'Una ciudad a escala humana, con tranvía entre Rabat y Salé', 'A unos 1 h 20 de Tánger en el tren de alta velocidad Al Boraq'],
        when: 'El clima oceánico es suave todo el año; la primavera y el otoño son especialmente agradables para caminar.',
        access: 'La estación Rabat-Ville está en la línea de alta velocidad Al Boraq (unos 1 h 20 desde Tánger) y tiene trenes a Casablanca. El aeropuerto Rabat-Salé está cerca del centro, y el tranvía une Rabat, Salé, la estación y la medina.',
        areas: [
          { name: 'Medina y Udayas', text: 'Callejuelas azules y blancas, riads y casas de huéspedes.' },
          { name: 'Hassan', text: 'El barrio histórico, grandes hoteles cerca de los monumentos.' },
          { name: 'Agdal y Souissi', text: 'Moderno y comercial, o residencial y muy tranquilo.' },
        ],
        faq: [
          { q: 'Rabat o Casablanca: ¿dónde alojarse?', a: 'Rabat es más tranquila y verde; Casablanca, más grande y dinámica. Muchos viajeros se alojan en una y visitan la otra en tren.' },
          { q: '¿Cómo moverse por Rabat?', a: 'A pie por el centro y la medina, y en tranvía entre Rabat, Salé, la estación y la medina.' },
        ],
      },
      de: {
        intro: 'Die Hauptstadt ist grün, sauber und gut zu Fuß zu erkunden: Straßenbahn, Strand, eine ruhige Medina und große Monumente. Ruhiger als Marrakesch oder Casablanca – eine sehr gute Basis für Paare, Familien und lange Aufenthalte.',
        why: ['Die Kasbah der Udayas, der Hassan-Turm und das Mausoleum Mohammed V.', 'Eine Stadt im menschlichen Maßstab, mit Straßenbahn zwischen Rabat und Salé', 'Etwa 1 Std. 20 Min. von Tanger mit dem Schnellzug Al Boraq'],
        when: 'Das Meeresklima ist ganzjährig mild; Frühling und Herbst sind zum Spazieren besonders angenehm.',
        access: 'Der Bahnhof Rabat-Ville liegt an der Schnellfahrstrecke Al Boraq (etwa 1 Std. 20 Min. ab Tanger) und hat Züge nach Casablanca. Der Flughafen Rabat-Salé liegt nah am Zentrum, die Straßenbahn verbindet Rabat, Salé, Bahnhof und Medina.',
        areas: [
          { name: 'Medina & Udayas', text: 'Blau-weiße Gassen, Riads und Gästehäuser.' },
          { name: 'Hassan', text: 'Das historische Viertel, große Hotels nahe den Monumenten.' },
          { name: 'Agdal & Souissi', text: 'Modern und belebt oder ruhiges Wohnviertel.' },
        ],
        faq: [
          { q: 'Rabat oder Casablanca: wo übernachten?', a: 'Rabat ist ruhiger und grüner, Casablanca größer und lebhafter. Viele Reisende wohnen in der einen Stadt und besuchen die andere mit dem Zug.' },
          { q: 'Wie bewegt man sich in Rabat?', a: 'Zu Fuß im Zentrum und in der Medina, mit der Straßenbahn zwischen Rabat, Salé, Bahnhof und Medina.' },
        ],
      },
      ar: {
        intro: 'العاصمة خضراء ونظيفة ويسهل التجول فيها مشياً: ترامواي، شاطئ، مدينة عتيقة هادئة ومعالم كبرى. أهدأ من مراكش والدار البيضاء، وهي قاعدة ممتازة للأزواج والعائلات والإقامات الطويلة.',
        why: ['قصبة الأوداية وصومعة حسان وضريح محمد الخامس', 'مدينة على مقاس الإنسان، مع ترامواي بين الرباط وسلا', 'على بعد حوالي ساعة و20 دقيقة من طنجة بقطار البراق'],
        when: 'المناخ المحيطي معتدل طوال السنة، والربيع والخريف ممتعان بشكل خاص للتجول.',
        access: 'محطة الرباط المدينة على خط البراق (حوالي ساعة و20 دقيقة من طنجة) وفيها قطارات نحو الدار البيضاء. مطار الرباط سلا قريب من الوسط، والترامواي يربط الرباط وسلا والمحطة والمدينة العتيقة.',
        areas: [
          { name: 'المدينة العتيقة والأوداية', text: 'أزقة زرقاء وبيضاء، رياضات ودور ضيافة.' },
          { name: 'حسان', text: 'الحي التاريخي، فنادق كبرى قرب المعالم.' },
          { name: 'أكدال والسويسي', text: 'حديث وتجاري، أو سكني وهادئ جداً.' },
        ],
        faq: [
          { q: 'الرباط أم الدار البيضاء: أين أقيم؟', a: 'الرباط أهدأ وأكثر خضرة، والدار البيضاء أكبر وأكثر حيوية. كثير من المسافرين يقيمون في إحداهما ويزورون الأخرى بالقطار.' },
          { q: 'كيف أتنقل في الرباط؟', a: 'مشياً في الوسط والمدينة العتيقة، وبالترامواي بين الرباط وسلا والمحطة والمدينة العتيقة.' },
        ],
      },
    },
  },
  {
    id: 'tangier',
    slug: { en: 'tangier', fr: 'tanger', es: 'tanger', de: 'tanger', ar: 'tanja' },
    lat: 35.7595,
    lon: -5.834,
    costCity: 'tangier',
    host2030: true,
    accessKeys: ['ferry-guide', 'trains', 'airports'],
    stayKey: 'where-to-stay-tangier',
    tripKeys: ['chefchaouen-trip'],
    moreKeys: ['marhaba-guide', 'motorway', 'car-180-days'],
    bookingQuery: 'Tangier',
    text: {
      fr: {
        intro: "Face à l'Espagne, Tanger est la porte d'entrée du Maroc : port, plages sur la Méditerranée et l'Atlantique, médina escarpée et TGV vers Rabat et Casablanca. C'est aussi l'étape naturelle des MRE qui arrivent en ferry.",
        why: ['La médina et la Kasbah, avec vue sur le détroit', 'Le TGV Al Boraq : environ 2 h 10 jusqu\'à Casablanca', 'Une base idéale avant ou après le ferry, et pour visiter Chefchaouen'],
        when: "Agréable du printemps à l'automne ; en été, le port et la route de Tanger Med sont très chargés pendant l'opération Marhaba.",
        access: 'Le TGV Al Boraq relie Tanger-Ville à Rabat (environ 1 h 20) et Casablanca (environ 2 h 10). Les ferries arrivent au port de Tanger Med ou de Tanger Ville, et l\'aéroport Ibn Battouta dessert la ville.',
        areas: [
          { name: 'Médina et Kasbah', text: 'Le cœur du charme : riads, maisons d\'hôtes, vues sur le détroit.' },
          { name: 'Marshan', text: 'Calme et résidentiel, juste à l\'ouest de la Kasbah.' },
          { name: 'Malabata, Corniche et ville nouvelle', text: 'Hôtels modernes, plage, restaurants et vie nocturne.' },
        ],
        faq: [
          { q: 'Faut-il dormir à Tanger avant ou après le ferry ?', a: 'Si vous arrivez de nuit ou repartez tôt, une nuit à Tanger est souvent plus confortable qu\'une attente au port.' },
          { q: 'Comment aller de Tanger à Chefchaouen ?', a: 'En autocar, comptez environ 2 h 15 à 2 h 30.' },
        ],
      },
      en: {
        intro: "Facing Spain, Tangier is Morocco's gateway: a port, beaches on the Mediterranean and the Atlantic, a hilly medina and high-speed trains to Rabat and Casablanca. It is also the natural first stop for MREs arriving by ferry.",
        why: ['The medina and the Kasbah, with views over the Strait', 'Al Boraq high-speed train: about 2 h 10 to Casablanca', 'An ideal base before or after the ferry, and for visiting Chefchaouen'],
        when: 'Pleasant from spring to autumn; in summer the port and the Tanger Med road are very busy during Operation Marhaba.',
        access: 'The Al Boraq high-speed train links Tanger-Ville with Rabat (about 1 h 20) and Casablanca (about 2 h 10). Ferries arrive at Tanger Med or Tanger Ville port, and Ibn Battouta airport serves the city.',
        areas: [
          { name: 'Medina & Kasbah', text: 'The heart of its charm: riads, guesthouses, views over the Strait.' },
          { name: 'Marshan', text: 'Quiet and residential, just west of the Kasbah.' },
          { name: 'Malabata, Corniche & new town', text: 'Modern hotels, the beach, restaurants and nightlife.' },
        ],
        faq: [
          { q: 'Should I sleep in Tangier before or after the ferry?', a: 'If you arrive at night or leave early, a night in Tangier is often more comfortable than waiting at the port.' },
          { q: 'How do I get from Tangier to Chefchaouen?', a: 'By coach, allow about 2 h 15 to 2 h 30.' },
        ],
      },
      es: {
        intro: 'Frente a España, Tánger es la puerta de entrada a Marruecos: puerto, playas en el Mediterráneo y el Atlántico, una medina empinada y tren de alta velocidad a Rabat y Casablanca. También es la primera parada natural de quienes llegan en ferri.',
        why: ['La medina y la Kasbah, con vistas al Estrecho', 'Tren de alta velocidad Al Boraq: unas 2 h 10 hasta Casablanca', 'Una base ideal antes o después del ferri, y para visitar Chefchaouen'],
        when: 'Agradable de primavera a otoño; en verano, el puerto y la carretera de Tanger Med están muy congestionados durante la Operación Marhaba.',
        access: 'El tren Al Boraq une Tanger-Ville con Rabat (unos 1 h 20) y Casablanca (unas 2 h 10). Los ferris llegan al puerto de Tanger Med o de Tanger Ville, y el aeropuerto Ibn Battouta da servicio a la ciudad.',
        areas: [
          { name: 'Medina y Kasbah', text: 'El corazón de su encanto: riads, casas de huéspedes, vistas al Estrecho.' },
          { name: 'Marshan', text: 'Tranquilo y residencial, justo al oeste de la Kasbah.' },
          { name: 'Malabata, Corniche y ciudad nueva', text: 'Hoteles modernos, playa, restaurantes y vida nocturna.' },
        ],
        faq: [
          { q: '¿Conviene dormir en Tánger antes o después del ferri?', a: 'Si llegas de noche o sales temprano, una noche en Tánger suele ser más cómoda que esperar en el puerto.' },
          { q: '¿Cómo ir de Tánger a Chefchaouen?', a: 'En autocar, cuenta unas 2 h 15 a 2 h 30.' },
        ],
      },
      de: {
        intro: 'Gegenüber von Spanien ist Tanger Marokkos Tor: Hafen, Strände an Mittelmeer und Atlantik, eine hügelige Medina und Schnellzüge nach Rabat und Casablanca. Für Auslandsmarokkaner, die mit der Fähre ankommen, ist es der natürliche erste Halt.',
        why: ['Medina und Kasbah mit Blick auf die Meerenge', 'Schnellzug Al Boraq: etwa 2 Std. 10 Min. bis Casablanca', 'Ideale Basis vor oder nach der Fähre und für einen Ausflug nach Chefchaouen'],
        when: 'Angenehm von Frühling bis Herbst; im Sommer sind Hafen und die Straße nach Tanger Med während der Operation Marhaba sehr voll.',
        access: 'Der Al Boraq verbindet Tanger-Ville mit Rabat (etwa 1 Std. 20 Min.) und Casablanca (etwa 2 Std. 10 Min.). Fähren kommen in Tanger Med oder Tanger Ville an, der Flughafen Ibn Battouta bedient die Stadt.',
        areas: [
          { name: 'Medina & Kasbah', text: 'Das Herz der Stadt: Riads, Gästehäuser, Blick auf die Meerenge.' },
          { name: 'Marshan', text: 'Ruhiges Wohnviertel direkt westlich der Kasbah.' },
          { name: 'Malabata, Corniche & Neustadt', text: 'Moderne Hotels, Strand, Restaurants und Nachtleben.' },
        ],
        faq: [
          { q: 'Sollte man vor oder nach der Fähre in Tanger übernachten?', a: 'Wer nachts ankommt oder früh weiterfährt, schläft in Tanger meist bequemer als im Hafen zu warten.' },
          { q: 'Wie kommt man von Tanger nach Chefchaouen?', a: 'Mit dem Bus in etwa 2 Std. 15 Min. bis 2 Std. 30 Min.' },
        ],
      },
      ar: {
        intro: 'طنجة، المطلة على إسبانيا، هي بوابة المغرب: ميناء، شواطئ على المتوسط والأطلسي، مدينة عتيقة منحدرة وقطار البراق نحو الرباط والدار البيضاء. وهي أيضاً المحطة الطبيعية الأولى لمغاربة العالم القادمين بالعبّارة.',
        why: ['المدينة العتيقة والقصبة بإطلالة على المضيق', 'قطار البراق: حوالي ساعتين و10 دقائق إلى الدار البيضاء', 'قاعدة مثالية قبل العبّارة أو بعدها، ولزيارة شفشاون'],
        when: 'ممتعة من الربيع إلى الخريف؛ في الصيف يكون الميناء وطريق طنجة المتوسط مزدحمين جداً خلال عملية مرحبا.',
        access: 'قطار البراق يربط محطة طنجة المدينة بالرباط (حوالي ساعة و20 دقيقة) والدار البيضاء (حوالي ساعتين و10 دقائق). العبّارات تصل إلى ميناء طنجة المتوسط أو طنجة المدينة، ومطار ابن بطوطة يخدم المدينة.',
        areas: [
          { name: 'المدينة العتيقة والقصبة', text: 'قلب سحر المدينة: رياضات ودور ضيافة وإطلالات على المضيق.' },
          { name: 'مرشان', text: 'هادئ وسكني، غرب القصبة مباشرة.' },
          { name: 'ملابطا والكورنيش والمدينة الجديدة', text: 'فنادق حديثة، شاطئ، مطاعم وسهر.' },
        ],
        faq: [
          { q: 'هل أبيت في طنجة قبل العبّارة أو بعدها؟', a: 'إذا وصلت ليلاً أو تغادر باكراً، فليلة في طنجة غالباً أريح من الانتظار في الميناء.' },
          { q: 'كيف أذهب من طنجة إلى شفشاون؟', a: 'بالحافلة، احسب حوالي ساعتين و15 دقيقة إلى ساعتين و30 دقيقة.' },
        ],
      },
    },
  },
  {
    id: 'fes',
    slug: { en: 'fes', fr: 'fes', es: 'fez', de: 'fes', ar: 'fas' },
    lat: 34.0331,
    lon: -5.0003,
    costCity: 'fes',
    host2030: true,
    accessKeys: ['trains', 'airports', 'ctm-supratours'],
    stayKey: 'where-to-stay-fes',
    tripKeys: ['fes-merzouga', 'chefchaouen-trip'],
    moreKeys: ['riad-or-hotel', 'moroccan-food', 'scams-safety'],
    bookingQuery: 'Fes',
    text: {
      fr: {
        intro: "Fès se partage entre Fès el-Bali, immense médina médiévale et plus grande zone urbaine piétonne du monde, et la Ville Nouvelle, plus calme. Histoire, artisanat et prix plutôt bas : idéale pour un séjour culturel.",
        why: ['Les ruelles, médersas, tanneries et ateliers de Fès el-Bali', 'Une ville riche en histoire et généralement moins chère que Marrakech', 'Point de départ vers le désert de Merzouga et Chefchaouen'],
        when: "Le printemps et l'automne sont les plus agréables ; l'été est chaud et l'hiver plus frais que sur la côte.",
        access: 'Fès est desservie par le train (environ 3 h 50 depuis Casablanca) et par l\'aéroport Fès-Saïss. Dans la médina, on circule à pied : demandez à votre riad de venir vous chercher.',
        areas: [
          { name: 'Bab Boujloud', text: 'L\'entrée la plus pratique de la médina, où les taxis déposent.' },
          { name: 'Kairouyine et quartier andalou', text: 'Cœur des souks et des monuments, ou secteur plus calme et meilleur rapport qualité-prix.' },
          { name: 'Ville Nouvelle', text: 'Avenues, cafés, supermarchés et gare : pratique pour les familles et les longs séjours.' },
        ],
        faq: [
          { q: 'Médina ou Ville Nouvelle à Fès ?', a: 'Un riad à Fès el-Bali pour une première visite de 2 à 3 nuits ; la Ville Nouvelle pour les familles avec poussette, les longs séjours et le télétravail.' },
          { q: 'Comment transporter ses bagages dans la médina ?', a: 'Des porteurs ou des charrettes s\'en chargent : fixez le prix avant.' },
        ],
      },
      en: {
        intro: "Fes is split between Fes el-Bali, a vast medieval medina and the world's largest car-free urban area, and the calmer Ville Nouvelle. History, crafts and fairly low prices: ideal for a cultural stay.",
        why: ['The lanes, madrasas, tanneries and workshops of Fes el-Bali', 'A city steeped in history, generally cheaper than Marrakech', 'A starting point for the Merzouga desert and Chefchaouen'],
        when: 'Spring and autumn are the most pleasant; summers are hot and winters cooler than on the coast.',
        access: 'Fes is served by train (about 3 h 50 from Casablanca) and by Fes-Saiss airport. In the medina you get around on foot: ask your riad to meet you.',
        areas: [
          { name: 'Bab Boujloud', text: 'The most practical gate into the medina, where taxis drop you off.' },
          { name: 'Karaouine & Andalusian quarter', text: 'The heart of the souks and monuments, or a quieter area with better value.' },
          { name: 'Ville Nouvelle', text: 'Avenues, cafés, supermarkets and the station: practical for families and long stays.' },
        ],
        faq: [
          { q: 'Medina or Ville Nouvelle in Fes?', a: 'A riad in Fes el-Bali for a first visit of 2 to 3 nights; the Ville Nouvelle for families with buggies, long stays and remote work.' },
          { q: 'How do I move luggage in the medina?', a: 'Porters or handcarts do it: agree the price first.' },
        ],
      },
      es: {
        intro: 'Fez se reparte entre Fez el-Bali, una inmensa medina medieval y la mayor zona urbana peatonal del mundo, y la Ciudad Nueva, más tranquila. Historia, artesanía y precios bastante bajos: ideal para una estancia cultural.',
        why: ['Las callejuelas, medersas, curtidurías y talleres de Fez el-Bali', 'Una ciudad llena de historia, en general más barata que Marrakech', 'Punto de partida hacia el desierto de Merzouga y Chefchaouen'],
        when: 'La primavera y el otoño son lo más agradable; el verano es caluroso y el invierno más fresco que en la costa.',
        access: 'A Fez se llega en tren (unas 3 h 50 desde Casablanca) y por el aeropuerto Fez-Saiss. En la medina se va a pie: pide a tu riad que vaya a buscarte.',
        areas: [
          { name: 'Bab Boujloud', text: 'La puerta más práctica de la medina, donde paran los taxis.' },
          { name: 'Qarawiyyin y barrio andalusí', text: 'Corazón de los zocos y monumentos, o zona más tranquila y con mejor relación calidad-precio.' },
          { name: 'Ciudad Nueva', text: 'Avenidas, cafés, supermercados y estación: práctica para familias y estancias largas.' },
        ],
        faq: [
          { q: '¿Medina o Ciudad Nueva en Fez?', a: 'Un riad en Fez el-Bali para una primera visita de 2 a 3 noches; la Ciudad Nueva para familias con carrito, estancias largas y teletrabajo.' },
          { q: '¿Cómo llevar el equipaje por la medina?', a: 'Lo hacen porteadores o carretillas: acuerda el precio antes.' },
        ],
      },
      de: {
        intro: 'Fès teilt sich in Fès el-Bali, eine riesige mittelalterliche Medina und das größte autofreie Stadtgebiet der Welt, und die ruhigere Neustadt. Geschichte, Handwerk und eher niedrige Preise: ideal für eine Kulturreise.',
        why: ['Gassen, Medersen, Gerbereien und Werkstätten von Fès el-Bali', 'Geschichtsträchtig und meist günstiger als Marrakesch', 'Ausgangspunkt für die Wüste bei Merzouga und für Chefchaouen'],
        when: 'Frühling und Herbst sind am angenehmsten; die Sommer sind heiß, die Winter kühler als an der Küste.',
        access: 'Fès ist per Zug (etwa 3 Std. 50 Min. ab Casablanca) und über den Flughafen Fès-Saïss erreichbar. In der Medina geht man zu Fuß: am besten vom Riad abholen lassen.',
        areas: [
          { name: 'Bab Boujloud', text: 'Das praktischste Tor zur Medina, hier halten die Taxis.' },
          { name: 'Kairaouine & Andalusisches Viertel', text: 'Herz der Souks und Monumente oder ruhigeres Viertel mit besserem Preis-Leistungs-Verhältnis.' },
          { name: 'Neustadt', text: 'Boulevards, Cafés, Supermärkte und Bahnhof: praktisch für Familien und lange Aufenthalte.' },
        ],
        faq: [
          { q: 'Medina oder Neustadt in Fès?', a: 'Ein Riad in Fès el-Bali für einen ersten Besuch von 2 bis 3 Nächten; die Neustadt für Familien mit Kinderwagen, lange Aufenthalte und Remote-Arbeit.' },
          { q: 'Wie transportiert man Gepäck in der Medina?', a: 'Träger oder Handkarren übernehmen das: Preis vorher vereinbaren.' },
        ],
      },
      ar: {
        intro: 'تنقسم فاس بين فاس البالي، المدينة العتيقة الوسيطية الشاسعة وأكبر منطقة حضرية خالية من السيارات في العالم، والمدينة الجديدة الأهدأ. تاريخ وصناعة تقليدية وأسعار منخفضة نسبياً: مثالية لإقامة ثقافية.',
        why: ['أزقة فاس البالي ومدارسها ودباغاتها وورشاتها', 'مدينة غنية بالتاريخ وعادة أرخص من مراكش', 'نقطة انطلاق نحو صحراء مرزوكة وشفشاون'],
        when: 'الربيع والخريف أنسب الفترات؛ الصيف حار والشتاء أبرد من الساحل.',
        access: 'فاس مخدومة بالقطار (حوالي 3 ساعات و50 دقيقة من الدار البيضاء) وبمطار فاس سايس. داخل المدينة العتيقة يكون التنقل مشياً: اطلب من الرياض استقبالك.',
        areas: [
          { name: 'باب بوجلود', text: 'أكثر أبواب المدينة العتيقة عملية، وفيه تتوقف سيارات الأجرة.' },
          { name: 'القرويين وعدوة الأندلس', text: 'قلب الأسواق والمعالم، أو حي أهدأ بقيمة أفضل مقابل السعر.' },
          { name: 'المدينة الجديدة', text: 'شوارع ومقاهٍ ومتاجر والمحطة: عملية للعائلات والإقامات الطويلة.' },
        ],
        faq: [
          { q: 'المدينة العتيقة أم المدينة الجديدة في فاس؟', a: 'رياض في فاس البالي للزيارة الأولى من ليلتين إلى ثلاث؛ والمدينة الجديدة للعائلات مع عربات الأطفال والإقامات الطويلة والعمل عن بعد.' },
          { q: 'كيف أنقل الأمتعة داخل المدينة العتيقة؟', a: 'يتكفل بها الحمّالون أو العربات اليدوية: اتفق على الثمن مسبقاً.' },
        ],
      },
    },
  },
  {
    id: 'essaouira',
    slug: { en: 'essaouira', fr: 'essaouira', es: 'esauira', de: 'essaouira', ar: 'as-sawira' },
    lat: 31.5085,
    lon: -9.7595,
    costCity: 'essaouira',
    accessKeys: ['ctm-supratours', 'essaouira-day-trip'],
    stayKey: 'where-to-stay-essaouira',
    tripKeys: ['essaouira-day-trip', 'dakhla'],
    moreKeys: ['nomad-cities', 'riad-or-hotel'],
    bookingQuery: 'Essaouira',
    text: {
      fr: {
        intro: "Petite ville côtière à taille humaine, inscrite à l'UNESCO, Essaouira est ventée, artistique et lente. Port, remparts, ruelles blanches et bleues : la ville est à son meilleur le soir et tôt le matin.",
        why: ['La médina, le port et les remparts, à parcourir à pied', 'Le vent : kitesurf et windsurf', 'Un rythme lent, idéal pour se concentrer, avec un coût de la vie plus bas qu\'à Marrakech'],
        when: 'Le vent souffle une grande partie de l\'année (la « cité des alizés ») : prévoyez un coupe-vent, même en été.',
        access: 'Essaouira se rejoint en autocar depuis Marrakech (environ 3 h avec pause) ou Agadir. Dans la médina, tout se fait à pied.',
        areas: [
          { name: 'Médina', text: 'Riads, ambiance, port et remparts à pied.' },
          { name: 'Quartier des Dunes et route côtière', text: 'Hôtels avec piscine, plage et parking ; plus exposé au vent.' },
        ],
        faq: [
          { q: 'Essaouira en excursion d\'une journée ou en nuit sur place ?', a: 'Une nuit sur place vaut mieux : la ville est à son meilleur le soir et tôt le matin, quand les excursionnistes sont repartis.' },
          { q: 'Combien coûte une nuit à Essaouira ?', a: 'Ordres de grandeur relevés en 2026 : environ 250 à 800 DH pour un riad en médina, 400 à 1 600 DH pour un hôtel en bord de mer, selon la saison.' },
        ],
      },
      en: {
        intro: 'A small, human-scale UNESCO-listed coastal town, Essaouira is windy, artsy and slow. Port, ramparts, white-and-blue lanes: the town is at its best in the evening and early morning.',
        why: ['The medina, the port and the ramparts, all on foot', 'The wind: kitesurfing and windsurfing', 'A slow pace that is good for focus, with lower living costs than Marrakech'],
        when: 'It is windy for much of the year (the "city of trade winds"): pack a windbreaker, even in summer.',
        access: 'Reach Essaouira by coach from Marrakech (about 3 h with a stop) or Agadir. In the medina, everything is on foot.',
        areas: [
          { name: 'Medina', text: 'Riads, atmosphere, the port and ramparts on foot.' },
          { name: 'Dunes district & coast road', text: 'Hotels with pools, the beach and parking; more exposed to the wind.' },
        ],
        faq: [
          { q: 'Day trip or overnight in Essaouira?', a: 'Stay the night: the town is at its best in the evening and early morning, after the day-trippers have left.' },
          { q: 'How much is a night in Essaouira?', a: 'Rough 2026 figures: about 250 to 800 MAD for a medina riad and 400 to 1,600 MAD for a seafront hotel, depending on the season.' },
        ],
      },
      es: {
        intro: 'Pequeña ciudad costera a escala humana, declarada Patrimonio de la UNESCO, Esauira es ventosa, artística y tranquila. Puerto, murallas, callejuelas blancas y azules: la ciudad está en su mejor momento por la tarde y a primera hora.',
        why: ['La medina, el puerto y las murallas, a pie', 'El viento: kitesurf y windsurf', 'Un ritmo lento, ideal para concentrarse, con un coste de vida más bajo que en Marrakech'],
        when: 'El viento sopla gran parte del año (la «ciudad de los alisios»): lleva un cortavientos, incluso en verano.',
        access: 'A Esauira se llega en autocar desde Marrakech (unas 3 h con parada) o Agadir. En la medina todo se hace a pie.',
        areas: [
          { name: 'Medina', text: 'Riads, ambiente, puerto y murallas a pie.' },
          { name: 'Barrio de las Dunas y carretera costera', text: 'Hoteles con piscina, playa y aparcamiento; más expuesto al viento.' },
        ],
        faq: [
          { q: '¿Excursión de un día o noche en Esauira?', a: 'Mejor dormir allí: la ciudad está en su mejor momento por la tarde y a primera hora, cuando se han ido los excursionistas.' },
          { q: '¿Cuánto cuesta una noche en Esauira?', a: 'Órdenes de magnitud de 2026: unos 250 a 800 MAD en un riad de la medina y 400 a 1.600 MAD en un hotel frente al mar, según la temporada.' },
        ],
      },
      de: {
        intro: 'Die kleine, überschaubare Küstenstadt (UNESCO-Welterbe) ist windig, künstlerisch und entschleunigt. Hafen, Stadtmauern, weiß-blaue Gassen: Am schönsten ist Essaouira abends und frühmorgens.',
        why: ['Medina, Hafen und Stadtmauern – alles zu Fuß', 'Der Wind: Kite- und Windsurfen', 'Ruhiges Tempo zum Konzentrieren, geringere Lebenshaltungskosten als in Marrakesch'],
        when: 'Der Wind weht einen Großteil des Jahres („Stadt der Passatwinde“): eine Windjacke einpacken, auch im Sommer.',
        access: 'Essaouira erreicht man mit dem Bus ab Marrakesch (etwa 3 Std. mit Pause) oder Agadir. In der Medina ist alles zu Fuß erreichbar.',
        areas: [
          { name: 'Medina', text: 'Riads, Atmosphäre, Hafen und Stadtmauern zu Fuß.' },
          { name: 'Dünenviertel & Küstenstraße', text: 'Hotels mit Pool, Strand und Parkplatz; windiger.' },
        ],
        faq: [
          { q: 'Tagesausflug oder Übernachtung in Essaouira?', a: 'Besser übernachten: Am schönsten ist die Stadt abends und frühmorgens, wenn die Tagesgäste weg sind.' },
          { q: 'Was kostet eine Nacht in Essaouira?', a: 'Richtwerte 2026: etwa 250 bis 800 MAD im Riad in der Medina, 400 bis 1.600 MAD im Hotel am Meer, je nach Saison.' },
        ],
      },
      ar: {
        intro: 'مدينة ساحلية صغيرة على مقاس الإنسان ومصنفة تراثاً عالمياً لدى اليونسكو، الصويرة مدينة الرياح والفن والإيقاع الهادئ. ميناء وأسوار وأزقة بيضاء وزرقاء: تكون في أجمل حالاتها مساءً وفي الصباح الباكر.',
        why: ['المدينة العتيقة والميناء والأسوار، كلها مشياً', 'الرياح: ركوب الأمواج الشراعي (الكايتسيرف) والويندسيرف', 'إيقاع هادئ مناسب للتركيز، وتكلفة معيشة أقل من مراكش'],
        when: 'تهب الرياح معظم السنة («مدينة الرياح التجارية»): احمل سترة واقية من الريح حتى في الصيف.',
        access: 'يمكن الوصول إلى الصويرة بالحافلة من مراكش (حوالي 3 ساعات مع توقف) أو من أكادير. داخل المدينة العتيقة كل شيء مشياً.',
        areas: [
          { name: 'المدينة العتيقة', text: 'رياضات وأجواء، والميناء والأسوار مشياً.' },
          { name: 'حي الكثبان والطريق الساحلية', text: 'فنادق بمسابح وشاطئ وموقف سيارات؛ أكثر تعرضاً للرياح.' },
        ],
        faq: [
          { q: 'رحلة يوم واحد أم مبيت في الصويرة؟', a: 'المبيت أفضل: المدينة في أجمل حالاتها مساءً وصباحاً بعد مغادرة زوار اليوم الواحد.' },
          { q: 'كم تكلف ليلة في الصويرة؟', a: 'أرقام تقريبية لسنة 2026: حوالي 250 إلى 800 درهم في رياض بالمدينة العتيقة، و400 إلى 1600 درهم في فندق على البحر، حسب الموسم.' },
        ],
      },
    },
  },
  {
    id: 'chefchaouen',
    slug: { en: 'chefchaouen', fr: 'chefchaouen', es: 'chefchaouen', de: 'chefchaouen', ar: 'shafshawan' },
    lat: 35.1688,
    lon: -5.2636,
    accessKeys: ['ctm-supratours', 'chefchaouen-trip'],
    stayKey: 'where-to-stay-chefchaouen',
    tripKeys: ['chefchaouen-trip'],
    moreKeys: ['where-to-stay-tangier', 'where-to-stay-fes'],
    bookingQuery: 'Chefchaouen',
    text: {
      fr: {
        intro: "La ville bleue du Rif est belle et paisible. Le meilleur choix est presque toujours de dormir dans la médina : tout est à quelques minutes à pied, et le calme du soir et du matin est le vrai privilège du séjour.",
        why: ['La médina bleue et la place Outa el-Hammam', 'Les vues depuis Ras el-Maa', 'Une étape naturelle entre Tanger et Fès'],
        when: 'Le printemps et l\'automne sont agréables pour marcher ; la ville est en montagne, prévoyez des vêtements chauds le soir.',
        access: "L'autocar depuis Tanger (environ 2 h 15 à 2 h 30) ou Fès est la solution la plus simple. En voiture, garez-vous dans un parking gardé aux portes de la médina, qui est piétonne.",
        areas: [
          { name: 'Outa el-Hammam', text: 'Le cœur animé autour de la place ; plus de bruit le soir.' },
          { name: 'Ras el-Maa', text: 'Sur les hauteurs, vues sur la médina et la source.' },
          { name: 'Bab Souk', text: 'Au nord, plus calme et bon rapport qualité-prix.' },
        ],
        faq: [
          { q: 'Combien de nuits passer à Chefchaouen ?', a: 'Deux nuits si possible : le calme du soir et du matin fait tout le charme de la ville.' },
          { q: 'Où se garer à Chefchaouen ?', a: 'Dans un parking gardé aux portes de la ville, de l\'ordre de 20 à 30 DH par nuit : les rues de la médina sont piétonnes.' },
        ],
      },
      en: {
        intro: 'The blue town of the Rif is beautiful and peaceful. Staying in the medina is almost always the best choice: everything is a few minutes away on foot, and the calm of the evening and morning is the real privilege of a stay.',
        why: ['The blue medina and Outa el-Hammam square', 'The views from Ras el-Maa', 'A natural stop between Tangier and Fes'],
        when: 'Spring and autumn are pleasant for walking; it is a mountain town, so bring something warm for the evenings.',
        access: 'The coach from Tangier (about 2 h 15 to 2 h 30) or Fes is the easiest option. By car, use a guarded car park at the gates: the medina is pedestrian.',
        areas: [
          { name: 'Outa el-Hammam', text: 'The lively heart around the square; noisier at night.' },
          { name: 'Ras el-Maa', text: 'Up the hill, with views over the medina and the spring.' },
          { name: 'Bab Souk', text: 'To the north, quieter and good value.' },
        ],
        faq: [
          { q: 'How many nights should I spend in Chefchaouen?', a: 'Two nights if you can: the quiet evenings and mornings are the whole charm of the town.' },
          { q: 'Where can I park in Chefchaouen?', a: 'In a guarded car park at the town gates, around 20 to 30 MAD a night: the medina streets are pedestrian.' },
        ],
      },
      es: {
        intro: 'El pueblo azul del Rif es bonito y tranquilo. Casi siempre lo mejor es dormir en la medina: todo está a pocos minutos a pie, y la calma de la tarde y la mañana es el verdadero privilegio de la estancia.',
        why: ['La medina azul y la plaza Outa el-Hammam', 'Las vistas desde Ras el-Maa', 'Una parada natural entre Tánger y Fez'],
        when: 'La primavera y el otoño son agradables para caminar; es una ciudad de montaña, lleva ropa de abrigo para la noche.',
        access: 'El autocar desde Tánger (unas 2 h 15 a 2 h 30) o Fez es lo más sencillo. En coche, aparca en un aparcamiento vigilado a las puertas: la medina es peatonal.',
        areas: [
          { name: 'Outa el-Hammam', text: 'El corazón animado alrededor de la plaza; más ruido por la noche.' },
          { name: 'Ras el-Maa', text: 'En lo alto, con vistas a la medina y al manantial.' },
          { name: 'Bab Souk', text: 'Al norte, más tranquilo y con buena relación calidad-precio.' },
        ],
        faq: [
          { q: '¿Cuántas noches pasar en Chefchaouen?', a: 'Dos noches si es posible: la calma de la tarde y la mañana es todo el encanto del pueblo.' },
          { q: '¿Dónde aparcar en Chefchaouen?', a: 'En un aparcamiento vigilado a las puertas del pueblo, unos 20 a 30 MAD por noche: las calles de la medina son peatonales.' },
        ],
      },
      de: {
        intro: 'Die blaue Stadt im Rif ist schön und friedlich. Am besten übernachtet man fast immer in der Medina: Alles liegt wenige Gehminuten entfernt, und die Ruhe am Abend und Morgen ist das eigentliche Privileg.',
        why: ['Die blaue Medina und der Platz Outa el-Hammam', 'Die Aussicht von Ras el-Maa', 'Ein natürlicher Halt zwischen Tanger und Fès'],
        when: 'Frühling und Herbst sind gut zum Wandern; es ist eine Bergstadt – für abends etwas Warmes mitnehmen.',
        access: 'Der Bus ab Tanger (etwa 2 Std. 15 Min. bis 2 Std. 30 Min.) oder Fès ist am einfachsten. Mit dem Auto auf einem bewachten Parkplatz an den Toren parken: Die Medina ist Fußgängerzone.',
        areas: [
          { name: 'Outa el-Hammam', text: 'Das lebhafte Zentrum am Platz; abends lauter.' },
          { name: 'Ras el-Maa', text: 'Oben am Hang, mit Blick auf Medina und Quelle.' },
          { name: 'Bab Souk', text: 'Im Norden, ruhiger und preiswert.' },
        ],
        faq: [
          { q: 'Wie viele Nächte in Chefchaouen?', a: 'Wenn möglich zwei: Die ruhigen Abende und Morgen machen den ganzen Reiz aus.' },
          { q: 'Wo parkt man in Chefchaouen?', a: 'Auf einem bewachten Parkplatz an den Stadttoren, etwa 20 bis 30 MAD pro Nacht: Die Gassen der Medina sind autofrei.' },
        ],
      },
      ar: {
        intro: 'المدينة الزرقاء في جبال الريف جميلة وهادئة. الأفضل غالباً هو المبيت في المدينة العتيقة: كل شيء على بعد دقائق مشياً، وهدوء المساء والصباح هو الامتياز الحقيقي للإقامة.',
        why: ['المدينة العتيقة الزرقاء وساحة وطاء الحمام', 'الإطلالات من رأس الماء', 'محطة طبيعية بين طنجة وفاس'],
        when: 'الربيع والخريف مناسبان للمشي؛ المدينة جبلية، فاحمل ملابس دافئة للمساء.',
        access: 'الحافلة من طنجة (حوالي ساعتين و15 دقيقة إلى ساعتين و30 دقيقة) أو من فاس هي الأسهل. بالسيارة، اركن في موقف محروس عند أبواب المدينة لأن المدينة العتيقة مخصصة للراجلين.',
        areas: [
          { name: 'وطاء الحمام', text: 'القلب النابض حول الساحة؛ ضجيج أكثر في المساء.' },
          { name: 'رأس الماء', text: 'في الأعلى، بإطلالة على المدينة العتيقة والعين.' },
          { name: 'باب السوق', text: 'في الشمال، أهدأ وبقيمة جيدة مقابل السعر.' },
        ],
        faq: [
          { q: 'كم ليلة أقضي في شفشاون؟', a: 'ليلتان إن أمكن: هدوء المساء والصباح هو سر سحر المدينة.' },
          { q: 'أين أركن السيارة في شفشاون؟', a: 'في موقف محروس عند أبواب المدينة، بحوالي 20 إلى 30 درهماً لليلة: أزقة المدينة العتيقة للراجلين.' },
        ],
      },
    },
  },
  {
    id: 'taghazout',
    slug: { en: 'taghazout', fr: 'taghazout', es: 'taghazout', de: 'taghazout', ar: 'taghazut' },
    lat: 30.5445,
    lon: -9.7098,
    costCity: 'agadir',
    accessKeys: ['airports', 'ctm-supratours'],
    stayKey: 'where-to-stay-agadir',
    tripKeys: ['taghazout-surf', 'where-to-stay-essaouira'],
    moreKeys: ['nomad-cities', 'internet-coworking'],
    bookingQuery: 'Taghazout',
    text: {
      fr: {
        intro: "Ancien village de pêcheurs à environ 20 km au nord d'Agadir, Taghazout est devenu la capitale marocaine du surf et un haut lieu du coliving : hivers ensoleillés, écoles de surf à tous les prix, yoga et ambiance décontractée.",
        why: ['Des spots pour tous les niveaux autour du village', 'Colivings et surf houses pour les séjours longs', 'Agadir et ses plages à proximité'],
        when: 'Pour débuter le surf, les meilleures périodes sont mars à mai et octobre-novembre ; l\'hiver reste doux.',
        access: "L'aéroport Agadir Al Massira est à environ 23 km d'Agadir ; pour Taghazout, prévoyez un taxi ou un transfert. Depuis Marrakech, l'autocar rejoint Agadir en environ 3 h à 3 h 30.",
        areas: [
          { name: 'Taghazout et Taghazout Bay', text: 'Village de surf et nouvelle station, environ 30 minutes au nord d\'Agadir.' },
          { name: 'Tamraght', text: 'Petit village à flanc de colline, calme, proche des spots.' },
          { name: 'Agadir', text: 'Front de mer, Founty et marina pour les familles et la plage.' },
        ],
        faq: [
          { q: 'Quelle est la meilleure saison pour apprendre le surf à Taghazout ?', a: 'Mars à mai et octobre-novembre : vagues gérables, vents plus doux, moins de monde et camps moins chers.' },
          { q: 'Peut-on télétravailler à Taghazout ?', a: 'Oui, de nombreux colivings accueillent des télétravailleurs ; choisissez-en un avec une connexion de secours pour les visios.' },
        ],
      },
      en: {
        intro: "A former fishing village about 20 km north of Agadir, Taghazout has become Morocco's surf capital and a coliving hotspot: sunny winters, surf schools at every price, yoga and a laid-back vibe.",
        why: ['Spots for every level around the village', 'Colivings and surf houses for long stays', 'Agadir and its beaches nearby'],
        when: 'For beginners, the best months are March to May and October–November; winters stay mild.',
        access: 'Agadir Al Massira airport is about 23 km from Agadir; for Taghazout, plan a taxi or a transfer. From Marrakech, the coach reaches Agadir in about 3 h to 3 h 30.',
        areas: [
          { name: 'Taghazout & Taghazout Bay', text: 'The surf village and the new resort, about 30 minutes north of Agadir.' },
          { name: 'Tamraght', text: 'A small hillside village, quiet and close to the breaks.' },
          { name: 'Agadir', text: 'Seafront, Founty and the marina for families and the beach.' },
        ],
        faq: [
          { q: 'When is the best time to learn to surf in Taghazout?', a: 'March to May and October–November: manageable waves, gentler winds, fewer people and cheaper camps.' },
          { q: 'Can I work remotely from Taghazout?', a: 'Yes, many colivings host remote workers; choose one with a backup connection for video calls.' },
        ],
      },
      es: {
        intro: 'Antiguo pueblo de pescadores a unos 20 km al norte de Agadir, Taghazout se ha convertido en la capital marroquí del surf y en un referente del coliving: inviernos soleados, escuelas de surf para todos los bolsillos, yoga y ambiente relajado.',
        why: ['Spots para todos los niveles alrededor del pueblo', 'Colivings y surf houses para estancias largas', 'Agadir y sus playas, muy cerca'],
        when: 'Para empezar a surfear, los mejores meses son de marzo a mayo y octubre-noviembre; el invierno es suave.',
        access: 'El aeropuerto Agadir Al Massira está a unos 23 km de Agadir; para Taghazout, prevé un taxi o un traslado. Desde Marrakech, el autocar llega a Agadir en unas 3 h a 3 h 30.',
        areas: [
          { name: 'Taghazout y Taghazout Bay', text: 'El pueblo surfero y la nueva estación, a unos 30 minutos al norte de Agadir.' },
          { name: 'Tamraght', text: 'Pequeño pueblo en la ladera, tranquilo y cerca de los spots.' },
          { name: 'Agadir', text: 'Paseo marítimo, Founty y la marina para familias y playa.' },
        ],
        faq: [
          { q: '¿Cuál es la mejor época para aprender surf en Taghazout?', a: 'De marzo a mayo y octubre-noviembre: olas manejables, vientos más suaves, menos gente y campamentos más baratos.' },
          { q: '¿Se puede teletrabajar en Taghazout?', a: 'Sí, muchos colivings acogen a teletrabajadores; elige uno con conexión de respaldo para las videollamadas.' },
        ],
      },
      de: {
        intro: 'Das ehemalige Fischerdorf etwa 20 km nördlich von Agadir ist zur Surf-Hauptstadt Marokkos und zum Coliving-Hotspot geworden: sonnige Winter, Surfschulen für jedes Budget, Yoga und entspannte Stimmung.',
        why: ['Spots für jedes Niveau rund um das Dorf', 'Colivings und Surfhäuser für lange Aufenthalte', 'Agadir und seine Strände in der Nähe'],
        when: 'Für Anfänger sind März bis Mai und Oktober–November am besten; die Winter bleiben mild.',
        access: 'Der Flughafen Agadir Al Massira liegt etwa 23 km von Agadir entfernt; nach Taghazout ein Taxi oder einen Transfer einplanen. Ab Marrakesch braucht der Bus nach Agadir etwa 3 bis 3,5 Stunden.',
        areas: [
          { name: 'Taghazout & Taghazout Bay', text: 'Das Surfdorf und das neue Resort, etwa 30 Minuten nördlich von Agadir.' },
          { name: 'Tamraght', text: 'Kleines Dorf am Hang, ruhig und nah an den Spots.' },
          { name: 'Agadir', text: 'Strandpromenade, Founty und Marina für Familien und Badeurlaub.' },
        ],
        faq: [
          { q: 'Wann lernt man am besten Surfen in Taghazout?', a: 'März bis Mai und Oktober–November: gut zu surfende Wellen, sanftere Winde, weniger Andrang und günstigere Camps.' },
          { q: 'Kann man in Taghazout remote arbeiten?', a: 'Ja, viele Colivings nehmen Remote-Worker auf; eines mit Backup-Verbindung für Videocalls wählen.' },
        ],
      },
      ar: {
        intro: 'تغازوت، قرية الصيادين السابقة على بعد حوالي 20 كلم شمال أكادير، أصبحت عاصمة ركوب الأمواج في المغرب ووجهة للسكن المشترك: شتاء مشمس، مدارس لركوب الأمواج بكل الأسعار، يوغا وأجواء مريحة.',
        why: ['مواقع لركوب الأمواج لكل المستويات حول القرية', 'سكن مشترك وبيوت لركوب الأمواج للإقامات الطويلة', 'أكادير وشواطئها على مقربة'],
        when: 'للمبتدئين، أفضل الفترات من مارس إلى ماي ومن أكتوبر إلى نونبر؛ والشتاء يبقى معتدلاً.',
        access: 'مطار أكادير المسيرة على بعد حوالي 23 كلم من أكادير؛ للوصول إلى تغازوت خطط لسيارة أجرة أو نقل خاص. من مراكش تصل الحافلة إلى أكادير في حوالي 3 ساعات إلى 3 ساعات ونصف.',
        areas: [
          { name: 'تغازوت وخليج تغازوت', text: 'قرية ركوب الأمواج والمحطة الجديدة، حوالي 30 دقيقة شمال أكادير.' },
          { name: 'تامراغت', text: 'قرية صغيرة على سفح التل، هادئة وقريبة من المواقع.' },
          { name: 'أكادير', text: 'الواجهة البحرية وفونتي والمارينا للعائلات والشاطئ.' },
        ],
        faq: [
          { q: 'ما أفضل فترة لتعلم ركوب الأمواج في تغازوت؟', a: 'من مارس إلى ماي ومن أكتوبر إلى نونبر: أمواج مناسبة، رياح أهدأ، ازدحام أقل ومخيمات أرخص.' },
          { q: 'هل يمكن العمل عن بعد من تغازوت؟', a: 'نعم، كثير من فضاءات السكن المشترك تستقبل العاملين عن بعد؛ اختر واحداً باتصال احتياطي لمكالمات الفيديو.' },
        ],
      },
    },
  },
  {
    id: 'nador',
    slug: { en: 'nador', fr: 'nador', es: 'nador', de: 'nador', ar: 'nador' },
    lat: 35.1681,
    lon: -2.9335,
    accessKeys: ['ferry-guide', 'airports', 'motorway'],
    stayKey: 'where-to-stay-nador',
    tripKeys: [],
    moreKeys: ['marhaba-guide', 'short-term-rental', 'where-to-stay-tetouan-mdiq', 'where-to-stay-al-hoceima'],
    bookingQuery: 'Nador',
    text: {
      fr: {
        intro: "Grande ville du nord-est du Rif, très liée à la diaspora : beaucoup de familles y passent l'été et le port de Beni Enzar est une porte d'entrée vers le Maroc depuis l'Espagne et la France. Le bon logement dépend surtout de votre manière d'arriver et de la durée du séjour.",
        why: ["Le port de Beni Enzar, porte d'entrée depuis l'Espagne et la France", 'Un centre pratique : hôtels, commerces, services et taxis regroupés', 'La lagune de Marchica, un secteur en cours d\'aménagement'],
        when: "Juillet-août est la période de forte affluence des MRE : réservez tôt. Les tarifs varient fortement entre l'été et le reste de l'année ; ils sont à vérifier à la réservation.",
        access: "En ferry par le port de Nador (Beni Enzar), relié selon Ferryhopper à Almería, Motril, Sète et Barcelone ; les rotations changent, confirmez auprès de la compagnie. En avion par Nador-Al Aroui (NDR), à environ 24 km au sud de la ville, avec des liaisons saisonnières à confirmer. En train, une ligne ONCF relie Nador à Taourirt : vérifiez les horaires sur oncf.ma. Nador West Med n'est pas présenté comme un port de passagers.",
        areas: [
          { name: 'Centre de Nador', text: 'Le choix le plus simple pour quelques nuits ou des démarches ; plus animé et plus bruyant en été. La gare de Nador Ville s\'y trouve.' },
          { name: 'Beni Enzar et le port', text: 'À environ 13 km au nord de Nador, selon Ferryhopper ; utile pour une nuit d\'étape avant ou après le ferry.' },
          { name: 'Lagune de Marchica', text: 'Le grand plan d\'eau qui borde la ville ; l\'aménagement avance à son rythme, vérifiez ce qui est réellement ouvert avant de réserver.' },
        ],
        faq: [
          { q: 'Où dormir si mon ferry part tôt ou arrive tard ?', a: 'À Beni Enzar, près du port, ou dans le centre de Nador : une nuit d\'étape évite de courir ou de rouler fatigué après la traversée.' },
          { q: 'Peut-on réserver à Marchica sur la foi des visuels de projet ?', a: 'Non. Le calendrier annoncé du programme Marchica Med (2009-2025) est passé : vérifiez la localisation exacte, l\'accès et l\'avancement réel avant de réserver.' },
          { q: 'Nador West Med est-il un port pour les voyageurs ?', a: 'Il est présenté comme un pôle portuaire, industriel et logistique dont l\'ouverture est prévue fin 2026, pas comme un port de passagers : ne planifiez pas votre voyage dessus.' },
        ],
      },
      en: {
        intro: "A major city of the north-east Rif, closely tied to the diaspora: many families spend the summer here, and the port at Beni Enzar is a gateway into Morocco from Spain and France. The right place to stay depends mostly on how you arrive and for how long.",
        why: ['The Beni Enzar port, a gateway from Spain and France', 'A practical centre: hotels, shops, services and taxis close together', 'The Marchica lagoon, an area still being developed'],
        when: 'July-August is peak season for Moroccans living abroad: book early. Rates vary strongly between summer and the rest of the year; check them at booking.',
        access: 'By ferry via the port of Nador (Beni Enzar), linked according to Ferryhopper to Almería, Motril, Sète and Barcelona; rotations change, so confirm with the operator. By air via Nador-Al Aroui (NDR), about 24 km south of the city, with seasonal routes to be confirmed. By train, an ONCF line links Nador to Taourirt: check timetables on oncf.ma. Nador West Med is not presented as a passenger port.',
        areas: [
          { name: 'Nador centre', text: 'The simplest choice for a few nights or errands; livelier and noisier in summer. The Nador Ville railway station is here.' },
          { name: 'Beni Enzar and the port', text: 'About 13 km north of Nador, according to Ferryhopper; handy for a stopover night before or after the ferry.' },
          { name: 'Marchica lagoon', text: 'The large body of water beside the city; development is ongoing, so check what is actually open before you book.' },
        ],
        faq: [
          { q: 'Where should I stay if my ferry leaves early or arrives late?', a: 'In Beni Enzar by the port, or in the centre of Nador: a stopover night avoids a rush or driving tired after the crossing.' },
          { q: 'Can I book at Marchica based on project visuals?', a: 'No. The announced timeline of the Marchica Med programme (2009-2025) has passed: check the exact location, access and real progress before booking.' },
          { q: 'Is Nador West Med a port for travellers?', a: 'It is described as a port, industrial and logistics hub due to open at the end of 2026, not as a passenger port: do not plan your trip around it.' },
        ],
      },
      es: {
        intro: 'Gran ciudad del nordeste del Rif, muy ligada a la diáspora: muchas familias pasan aquí el verano y el puerto de Beni Enzar es una puerta de entrada a Marruecos desde España y Francia. El alojamiento adecuado depende sobre todo de cómo llegues y de cuánto tiempo te quedes.',
        why: ['El puerto de Beni Enzar, puerta de entrada desde España y Francia', 'Un centro práctico: hoteles, comercios, servicios y taxis cerca unos de otros', 'La laguna de Marchica, una zona todavía en desarrollo'],
        when: 'Julio y agosto son la época de mayor afluencia de los marroquíes residentes en el extranjero: reserva con antelación. Las tarifas varían mucho entre el verano y el resto del año; compruébalas al reservar.',
        access: 'En ferri por el puerto de Nador (Beni Enzar), conectado según Ferryhopper con Almería, Motril, Sète y Barcelona; las rotaciones cambian, confirma con la naviera. En avión por Nador-Al Aroui (NDR), a unos 24 km al sur de la ciudad, con vuelos de temporada por confirmar. En tren, una línea de ONCF une Nador con Taourirt: consulta los horarios en oncf.ma. Nador West Med no se presenta como puerto de pasajeros.',
        areas: [
          { name: 'Centro de Nador', text: 'La opción más sencilla para unas noches o para gestiones; más animado y ruidoso en verano. Aquí está la estación de Nador Ville.' },
          { name: 'Beni Enzar y el puerto', text: 'A unos 13 km al norte de Nador, según Ferryhopper; útil para una noche de etapa antes o después del ferri.' },
          { name: 'Laguna de Marchica', text: 'El gran espejo de agua junto a la ciudad; la urbanización sigue en marcha, así que comprueba qué está realmente abierto antes de reservar.' },
        ],
        faq: [
          { q: '¿Dónde dormir si mi ferri sale temprano o llega tarde?', a: 'En Beni Enzar, junto al puerto, o en el centro de Nador: una noche de etapa evita las prisas o conducir cansado tras la travesía.' },
          { q: '¿Se puede reservar en Marchica fiándose de las imágenes del proyecto?', a: 'No. El calendario anunciado del programa Marchica Med (2009-2025) ya pasó: comprueba la ubicación exacta, el acceso y el avance real antes de reservar.' },
          { q: '¿Es Nador West Med un puerto para viajeros?', a: 'Se presenta como un polo portuario, industrial y logístico cuya apertura está prevista para finales de 2026, no como puerto de pasajeros: no planifiques tu viaje contando con él.' },
        ],
      },
      de: {
        intro: 'Große Stadt im Nordosten des Rif, eng mit der Diaspora verbunden: Viele Familien verbringen hier den Sommer, und der Hafen Beni Enzar ist ein Tor nach Marokko aus Spanien und Frankreich. Die passende Unterkunft hängt vor allem davon ab, wie Sie anreisen und wie lange Sie bleiben.',
        why: ['Der Hafen Beni Enzar, Tor nach Marokko aus Spanien und Frankreich', 'Ein praktisches Zentrum: Hotels, Geschäfte, Dienste und Taxis dicht beieinander', 'Die Marchica-Lagune, ein Gebiet, das noch erschlossen wird'],
        when: 'Juli und August sind die Hauptzeit der Auslandsmarokkaner: früh buchen. Die Preise schwanken zwischen Sommer und übrigem Jahr stark; bei der Buchung prüfen.',
        access: 'Per Fähre über den Hafen Nador (Beni Enzar), laut Ferryhopper mit Almería, Motril, Sète und Barcelona verbunden; die Fahrpläne ändern sich, bitte bei der Reederei bestätigen. Per Flugzeug über Nador-Al Aroui (NDR), etwa 24 km südlich der Stadt, mit saisonalen Verbindungen (zu bestätigen). Per Bahn verbindet eine ONCF-Linie Nador mit Taourirt: Fahrpläne auf oncf.ma prüfen. Nador West Med wird nicht als Passagierhafen beschrieben.',
        areas: [
          { name: 'Zentrum von Nador', text: 'Die einfachste Wahl für ein paar Nächte oder Behördengänge; im Sommer lebhafter und lauter. Hier liegt der Bahnhof Nador Ville.' },
          { name: 'Beni Enzar und der Hafen', text: 'Laut Ferryhopper etwa 13 km nördlich von Nador; praktisch für eine Zwischenübernachtung vor oder nach der Fähre.' },
          { name: 'Marchica-Lagune', text: 'Das große Gewässer neben der Stadt; die Erschließung läuft noch, prüfen Sie vor der Buchung, was tatsächlich geöffnet ist.' },
        ],
        faq: [
          { q: 'Wo übernachten, wenn meine Fähre früh abfährt oder spät ankommt?', a: 'In Beni Enzar am Hafen oder im Zentrum von Nador: Eine Zwischenübernachtung erspart Hektik und müde Fahrten nach der Überfahrt.' },
          { q: 'Kann man in Marchica nach Projektbildern buchen?', a: 'Nein. Der angekündigte Zeitplan des Programms Marchica Med (2009–2025) ist verstrichen: Genauen Standort, Zugang und tatsächlichen Stand vor der Buchung prüfen.' },
          { q: 'Ist Nador West Med ein Hafen für Reisende?', a: 'Er wird als Hafen-, Industrie- und Logistikzentrum mit geplanter Eröffnung Ende 2026 beschrieben, nicht als Passagierhafen: Die Reise nicht darauf planen.' },
        ],
      },
      ar: {
        intro: 'الناظور مدينة كبرى في شمال شرق الريف، وترتبط ارتباطاً وثيقاً بالجالية: تقضي فيها عائلات كثيرة الصيف، وميناء بني انصار بوابة إلى المغرب قادمين من إسبانيا وفرنسا. اختيار الإقامة المناسبة يتوقف أساساً على طريقة وصولك ومدة بقائك.',
        why: ['ميناء بني انصار، بوابة قادمة من إسبانيا وفرنسا', 'وسط مدينة عملي: فنادق ومتاجر وخدمات وسيارات أجرة متقاربة', 'بحيرة مارتشيكا، منطقة ما زالت قيد التهيئة'],
        when: 'يوليوز وغشت هما ذروة توافد مغاربة العالم: احجز مبكراً. تتفاوت الأسعار كثيراً بين الصيف وباقي السنة؛ تحقق منها عند الحجز.',
        access: 'بالعبّارة عبر ميناء الناظور (بني انصار)، المرتبط حسب Ferryhopper بألميريا وموتريل وسيت وبرشلونة؛ الرحلات تتغير فتأكد من الشركة. بالطائرة عبر مطار الناظور العروي (NDR) على بعد نحو 24 كلم جنوب المدينة، بخطوط موسمية يجب التأكد منها. بالقطار يربط خط للمكتب الوطني للسكك الحديدية الناظور بتاوريرت: تحقق من المواعيد على oncf.ma. لا يُقدَّم ميناء الناظور غرب المتوسط كميناء للمسافرين.',
        areas: [
          { name: 'وسط الناظور', text: 'الخيار الأبسط لبضع ليال أو لقضاء الأغراض الإدارية؛ أكثر حركة وضجيجاً في الصيف. وفيه محطة القطار الناظور المدينة.' },
          { name: 'بني انصار والميناء', text: 'على بعد نحو 13 كلم شمال الناظور حسب Ferryhopper؛ مفيدة لليلة توقف قبل العبّارة أو بعدها.' },
          { name: 'بحيرة مارتشيكا', text: 'المسطح المائي الكبير المجاور للمدينة؛ التهيئة متواصلة، فتحقق مما هو مفتوح فعلاً قبل الحجز.' },
        ],
        faq: [
          { q: 'أين أبيت إذا كانت عبّارتي تغادر مبكراً أو تصل متأخرة؟', a: 'في بني انصار قرب الميناء أو في وسط الناظور: ليلة توقف تجنبك الاستعجال أو القيادة وأنت متعب بعد العبور.' },
          { q: 'هل يمكن الحجز في مارتشيكا اعتماداً على صور المشروع؟', a: 'لا. الجدول الزمني المعلن لبرنامج مارتشيكا ميد (2009-2025) انقضى: تحقق من الموقع الدقيق والوصول والتقدم الفعلي قبل الحجز.' },
          { q: 'هل ميناء الناظور غرب المتوسط للمسافرين؟', a: 'يُقدَّم كقطب مينائي وصناعي ولوجستي يُنتظر افتتاحه نهاية 2026، لا كميناء للمسافرين: لا تبنِ رحلتك عليه.' },
        ],
      },
    },
  },
  {
    id: 'tetouan',
    slug: { en: 'tetouan', fr: 'tetouan', es: 'tetuan', de: 'tetouan', ar: 'tetwan' },
    lat: 35.5785,
    lon: -5.3684,
    accessKeys: ['motorway', 'ferry-guide', 'airports', 'ctm-supratours'],
    stayKey: 'where-to-stay-tetouan-mdiq',
    tripKeys: ['chefchaouen-trip'],
    moreKeys: ['marhaba-guide', 'riad-or-hotel', 'short-term-rental', 'where-to-stay-nador'],
    bookingQuery: 'Tetouan',
    text: {
      fr: {
        intro: "Tétouan et la côte de M'diq se complètent : la première pour la culture et l'histoire, avec une médina inscrite à l'UNESCO, la seconde pour la mer. Pour un séjour d'été ou un passage depuis Tanger Med, la vraie question est « ville ou plage ? ».",
        why: ["La médina de Tétouan, inscrite au patrimoine mondial de l'UNESCO", "L'Ensanche espagnol, pratique pour les restaurants et les taxis", 'Martil, Cabo Negro et M\'diq pour la plage en famille'],
        when: "En juillet-août, la côte est très fréquentée : circulation, stationnement et prix augmentent. Réservez à l'avance et vérifiez les tarifs à la réservation.",
        access: "Depuis Tanger Med, Tétouan est à environ 46 km selon Wikipédia : voir le guide de l'autoroute. L'aéroport de Tétouan (TTU, Sania R'mel) a une desserte limitée : vérifiez les lignes en cours, les grands aéroports voisins étant souvent utilisés à la place. Des liaisons en autocar existent (CTM, Supratours) ; vérifiez horaires et lignes auprès des opérateurs.",
        areas: [
          { name: 'Médina de Tétouan', text: 'Idéale pour l\'histoire ; accès à pied, demandez les indications de votre hôte.' },
          { name: 'Ensanche', text: 'La ville espagnole à l\'ouest de la médina, avec des immeubles d\'environ cinq étages et des commerces au rez-de-chaussée.' },
          { name: 'Martil et Cabo Negro', text: 'Martil, balnéaire de proximité au nord-est de Tétouan ; Cabo Negro, au nord, connu pour son golf.' },
          { name: 'M\'diq', text: 'Entre Tétouan et Fnideq, avec un port de plaisance et de pêche ; attire aussi des visiteurs de Ceuta le week-end.' },
        ],
        faq: [
          { q: 'Tétouan ou la côte : où loger ?', a: 'Médina ou Ensanche pour la culture et une courte visite ; Martil, Cabo Negro ou M\'diq pour la plage en famille, avec un appartement meublé pour 1 à 3 semaines.' },
          { q: 'Peut-on rejoindre Tétouan en avion ?', a: 'Tétouan a un aéroport (TTU) à desserte limitée ; vérifiez les lignes en cours auprès des compagnies avant de réserver.' },
          { q: 'Que prévoir en voiture en été ?', a: 'Circulation, stationnement et prix augmentent sur la côte : choisissez un logement avec stationnement.' },
        ],
      },
      en: {
        intro: "Tetouan and the M'diq coast complement each other: the first for culture and history, with a UNESCO-listed medina, the second for the sea. For a summer stay or a transit from Tanger Med, the real question is \"city or beach?\".",
        why: ["Tetouan's medina, a UNESCO World Heritage site", 'The Spanish Ensanche, practical for restaurants and taxis', "Martil, Cabo Negro and M'diq for a family beach stay"],
        when: 'In July-August the coast is very busy: traffic, parking pressure and prices rise. Book ahead and check rates at booking.',
        access: "From Tanger Med, Tetouan is about 46 km away according to Wikipedia: see the motorway guide. Tetouan airport (TTU, Sania R'mel) has limited service: check current routes, as larger nearby airports are often used instead. Coach services exist (CTM, Supratours); check timetables and lines with the operators.",
        areas: [
          { name: 'Tetouan medina', text: 'Ideal for history; access is on foot, so ask your host for directions.' },
          { name: 'Ensanche', text: 'The Spanish-era town west of the medina, with buildings of about five storeys and shops at street level.' },
          { name: 'Martil and Cabo Negro', text: 'Martil, a nearby seaside area north-east of Tetouan; Cabo Negro, to the north, known for its golf resort.' },
          { name: "M'diq", text: 'Between Tetouan and Fnideq, with a marina and fishing harbour; also draws weekend visitors from Ceuta.' },
        ],
        faq: [
          { q: 'Tetouan or the coast: where should I stay?', a: "Medina or Ensanche for culture and a short visit; Martil, Cabo Negro or M'diq for a family beach stay, with a furnished apartment for 1 to 3 weeks." },
          { q: 'Can I fly to Tetouan?', a: 'Tetouan has an airport (TTU) with limited service; check current routes with the airlines before booking.' },
          { q: 'What should I plan for by car in summer?', a: 'Traffic, parking pressure and prices rise on the coast: choose accommodation with parking.' },
        ],
      },
      es: {
        intro: 'Tetuán y la costa de M\'diq se complementan: la primera para la cultura y la historia, con una medina inscrita por la UNESCO, la segunda para el mar. Para una estancia de verano o un paso desde Tanger Med, la verdadera pregunta es «¿ciudad o playa?».',
        why: ['La medina de Tetuán, Patrimonio Mundial de la UNESCO', 'El Ensanche español, práctico para restaurantes y taxis', 'Martil, Cabo Negro y M\'diq para la playa en familia'],
        when: 'En julio y agosto la costa está muy concurrida: aumentan el tráfico, la presión de aparcamiento y los precios. Reserva con antelación y comprueba las tarifas al reservar.',
        access: 'Desde Tanger Med, Tetuán está a unos 46 km según Wikipedia: consulta la guía de la autopista. El aeropuerto de Tetuán (TTU, Sania R\'mel) tiene un servicio limitado: comprueba las rutas actuales, ya que a menudo se usan los grandes aeropuertos vecinos. Hay servicios de autocar (CTM, Supratours); consulta horarios y líneas con los operadores.',
        areas: [
          { name: 'Medina de Tetuán', text: 'Ideal para la historia; el acceso es a pie, pide indicaciones a tu anfitrión.' },
          { name: 'Ensanche', text: 'La ciudad de época española al oeste de la medina, con edificios de unas cinco plantas y comercios en la planta baja.' },
          { name: 'Martil y Cabo Negro', text: 'Martil, zona de playa cercana al nordeste de Tetuán; Cabo Negro, al norte, conocido por su golf.' },
          { name: 'M\'diq', text: 'Entre Tetuán y Fnideq, con puerto deportivo y pesquero; también atrae a visitantes de Ceuta los fines de semana.' },
        ],
        faq: [
          { q: 'Tetuán o la costa: ¿dónde alojarse?', a: 'Medina o Ensanche para la cultura y una visita corta; Martil, Cabo Negro o M\'diq para la playa en familia, con un apartamento amueblado de 1 a 3 semanas.' },
          { q: '¿Se puede llegar a Tetuán en avión?', a: 'Tetuán tiene un aeropuerto (TTU) con servicio limitado; comprueba las rutas actuales con las aerolíneas antes de reservar.' },
          { q: '¿Qué prever en coche en verano?', a: 'En la costa aumentan el tráfico, la presión de aparcamiento y los precios: elige un alojamiento con aparcamiento.' },
        ],
      },
      de: {
        intro: 'Tétouan und die Küste von M\'diq ergänzen sich: die Stadt für Kultur und Geschichte mit einer UNESCO-Medina, die Küste für das Meer. Für einen Sommeraufenthalt oder eine Durchreise ab Tanger Med lautet die eigentliche Frage: „Stadt oder Strand?“.',
        why: ['Die Medina von Tétouan, UNESCO-Welterbe', 'Das spanische Ensanche, praktisch für Restaurants und Taxis', 'Martil, Cabo Negro und M\'diq für den Familienurlaub am Strand'],
        when: 'Im Juli und August ist die Küste sehr voll: Verkehr, Parkdruck und Preise steigen. Früh buchen und die Preise bei der Buchung prüfen.',
        access: 'Ab Tanger Med liegt Tétouan laut Wikipedia etwa 46 km entfernt: siehe Autobahn-Ratgeber. Der Flughafen Tétouan (TTU, Sania R\'mel) wird nur eingeschränkt bedient: aktuelle Verbindungen prüfen, oft werden stattdessen größere Flughäfen in der Nähe genutzt. Es gibt Busverbindungen (CTM, Supratours); Fahrpläne und Linien bei den Betreibern prüfen.',
        areas: [
          { name: 'Medina von Tétouan', text: 'Ideal für Geschichte; Zugang nur zu Fuß, Wegbeschreibung beim Gastgeber erfragen.' },
          { name: 'Ensanche', text: 'Die Stadt aus spanischer Zeit westlich der Medina, mit Gebäuden von etwa fünf Stockwerken und Läden im Erdgeschoss.' },
          { name: 'Martil und Cabo Negro', text: 'Martil, nahes Badeviertel nordöstlich von Tétouan; Cabo Negro im Norden, bekannt für sein Golfresort.' },
          { name: 'M\'diq', text: 'Zwischen Tétouan und Fnideq, mit Jacht- und Fischereihafen; zieht am Wochenende auch Besucher aus Ceuta an.' },
        ],
        faq: [
          { q: 'Tétouan oder Küste: wo übernachten?', a: 'Medina oder Ensanche für Kultur und einen Kurzbesuch; Martil, Cabo Negro oder M\'diq für den Familienurlaub am Strand, mit einer möblierten Wohnung für 1 bis 3 Wochen.' },
          { q: 'Kann man nach Tétouan fliegen?', a: 'Tétouan hat einen Flughafen (TTU) mit eingeschränktem Angebot; aktuelle Verbindungen vor der Buchung bei den Airlines prüfen.' },
          { q: 'Was ist im Sommer mit dem Auto zu beachten?', a: 'An der Küste steigen Verkehr, Parkdruck und Preise: eine Unterkunft mit Parkplatz wählen.' },
        ],
      },
      ar: {
        intro: 'تكمل تطوان وساحل المضيق إحداهما الأخرى: الأولى للثقافة والتاريخ بمدينتها العتيقة المصنفة لدى اليونسكو، والثانية للبحر. وسواء كانت إقامتك صيفية أو عبوراً من طنجة المتوسط، فالسؤال الحقيقي: «مدينة أم شاطئ؟».',
        why: ['المدينة العتيقة لتطوان، مدرجة في التراث العالمي لليونسكو', 'الإنسانش الإسباني، عملي للمطاعم وسيارات الأجرة', 'مرتيل وكابو نيغرو والمضيق لقضاء العطلة الشاطئية مع العائلة'],
        when: 'في يوليوز وغشت يكون الساحل مزدحماً جداً: يزداد السير وضغط مواقف السيارات والأسعار. احجز مسبقاً وتحقق من الأسعار عند الحجز.',
        access: 'من طنجة المتوسط تبعد تطوان نحو 46 كلم حسب ويكيبيديا: راجع دليل الطريق السيار. مطار تطوان (TTU، سانية الرمل) محدود الخدمة: تحقق من الخطوط الحالية، إذ تُستعمل غالباً المطارات الكبرى المجاورة بدلاً منه. توجد خطوط حافلات (CTM وسوبراتور)؛ تحقق من المواعيد والخطوط لدى المشغلين.',
        areas: [
          { name: 'المدينة العتيقة لتطوان', text: 'مثالية لمحبي التاريخ؛ الوصول إليها مشياً، فاطلب الوصف من مضيفك.' },
          { name: 'الإنسانش', text: 'المدينة ذات الطابع الإسباني غرب المدينة العتيقة، بعمارات من نحو خمسة طوابق ومتاجر في الطابق الأرضي.' },
          { name: 'مرتيل وكابو نيغرو', text: 'مرتيل منطقة شاطئية قريبة شمال شرق تطوان؛ وكابو نيغرو شمالها، معروفة بمنتجعها للغولف.' },
          { name: 'المضيق', text: 'بين تطوان والفنيدق، بها ميناء للترفيه والصيد، وتستقطب أيضاً زوار نهاية الأسبوع من سبتة.' },
        ],
        faq: [
          { q: 'تطوان أم الساحل: أين أقيم؟', a: 'المدينة العتيقة أو الإنسانش للثقافة وزيارة قصيرة؛ ومرتيل أو كابو نيغرو أو المضيق للشاطئ مع العائلة، بشقة مفروشة لمدة أسبوع إلى ثلاثة.' },
          { q: 'هل يمكن الوصول إلى تطوان بالطائرة؟', a: 'لتطوان مطار (TTU) محدود الخدمة؛ تحقق من الخطوط الحالية لدى شركات الطيران قبل الحجز.' },
          { q: 'ماذا أتوقع إذا جئت بالسيارة في الصيف؟', a: 'يزداد السير وضغط مواقف السيارات والأسعار على الساحل: اختر إقامة بها موقف.' },
        ],
      },
    },
  },
  {
    id: 'meknes',
    slug: { en: 'meknes', fr: 'meknes', es: 'meknes', de: 'meknes', ar: 'meknas' },
    lat: 33.8935,
    lon: -5.5473,
    accessKeys: ['trains', 'ctm-supratours'],
    stayKey: 'where-to-stay-meknes',
    tripKeys: ['where-to-stay-fes'],
    moreKeys: ['riad-or-hotel', 'transport-apps', 'scams-safety'],
    bookingQuery: 'Meknes',
    text: {
      fr: {
        intro: "Ancienne capitale impériale de Moulay Ismaïl, Meknès est plus petite et plus calme que Fès, et souvent visitée en un ou deux jours. La ville se compose de deux centres distincts, la médina et la Ville Nouvelle (Hamria), séparés par l'oued Boufekrane.",
        why: ["Une ville historique inscrite à l'UNESCO depuis 1996, avec Bab Mansour et la place el-Hedim", 'Plus calme que Fès, facile à visiter en un ou deux jours', 'Une base pour Fès et pour les ruines romaines de Volubilis'],
        when: "Meknès a un climat méditerranéen à influence continentale : été chaud, hiver frais. Le printemps et l'automne sont généralement plus agréables.",
        access: "Meknès est sur la ligne de train Fès – Rabat, avec deux gares : Meknès-Ville, côté Hamria, et Meknès-Amir Abdelkader ; vérifiez laquelle dessert votre train. La gare routière CTM est proche de Meknès-Ville. Volubilis est à moins de 40 minutes en voiture selon le Rough Guides.",
        areas: [
          { name: 'Médina', text: "Monuments, souks et cafés à pied, riads et maisons d'hôtes près d'el-Hedim et de Bab Mansour. Ruelles étroites, accès en voiture limité." },
          { name: 'Ville Nouvelle (Hamria)', text: "Plus pratique : restaurants, hôtels avec parking, taxis faciles et gares proches. Pas de monument, la médina se rejoint en taxi." },
          { name: 'Volubilis', text: "Les ruines romaines, le plus grand site archéologique romain du Maroc selon l'ONMT, se visitent souvent avec Moulay Idriss. Vérifiez le transport avant de partir." },
        ],
        faq: [
          { q: 'Où loger à Meknès pour une première visite ?', a: "Un riad ou une maison d'hôtes dans la médina, près d'el-Hedim, pour 1 à 2 nuits. Pour une étape en train ou en voiture, la Ville Nouvelle est plus simple." },
          { q: 'Peut-on combiner Meknès et Fès ?', a: "Oui : certains voyageurs dorment à Fès et reviennent, d'autres font l'inverse. Choisissez selon les horaires de train et votre envie de calme." },
        ],
      },
      en: {
        intro: 'The former imperial capital of Moulay Ismail, Meknes is smaller and calmer than Fes and often visited in a day or two. The city has two separate centres, the medina and the Ville Nouvelle (Hamria), divided by the Boufekrane wadi.',
        why: ['A historic city on the UNESCO list since 1996, with Bab Mansour and Place el-Hedim', 'Calmer than Fes and easy to see in a day or two', 'A base for Fes and for the Roman ruins of Volubilis'],
        when: 'Meknes has a Mediterranean climate with continental influence: hot summers and cool winters. Spring and autumn are generally more pleasant.',
        access: 'Meknes is on the Fes-Rabat train line and has two stations: Meknes-Ville, on the Hamria side, and Meknes-Amir Abdelkader; check which one your train uses. The CTM bus station is close to Meknes-Ville. Volubilis is under 40 minutes by car according to Rough Guides.',
        areas: [
          { name: 'Medina', text: 'Monuments, souks and cafés on foot, with riads and guesthouses near el-Hedim and Bab Mansour. Narrow lanes and limited car access.' },
          { name: 'Ville Nouvelle (Hamria)', text: 'More practical: restaurants, hotels with parking, easy taxis and the stations nearby. No monuments; the medina is a short taxi ride away.' },
          { name: 'Volubilis', text: 'The Roman ruins, the largest Roman archaeological site in Morocco according to ONMT, are often visited together with Moulay Idriss. Check transport before you go.' },
        ],
        faq: [
          { q: 'Where should I stay in Meknes on a first visit?', a: 'A riad or guesthouse in the medina near el-Hedim for 1 to 2 nights. For a stopover by train or car, the Ville Nouvelle is simpler.' },
          { q: 'Can I combine Meknes and Fes?', a: 'Yes: some travellers sleep in Fes and come back, others do the opposite. Choose according to train times and how much calm you want.' },
        ],
      },
      es: {
        intro: 'Antigua capital imperial de Moulay Ismail, Mequinez es más pequeña y tranquila que Fez y suele visitarse en uno o dos días. La ciudad tiene dos centros distintos, la medina y la Ville Nouvelle (Hamria), separados por el uadi Boufekrane.',
        why: ['Una ciudad histórica en la lista de la UNESCO desde 1996, con Bab Mansour y la plaza el-Hedim', 'Más tranquila que Fez y fácil de ver en uno o dos días', 'Una base para Fez y para las ruinas romanas de Volubilis'],
        when: 'Mequinez tiene un clima mediterráneo con influencia continental: verano caluroso e invierno fresco. La primavera y el otoño suelen ser más agradables.',
        access: 'Mequinez está en la línea de tren Fez-Rabat y tiene dos estaciones: Meknès-Ville, en el lado de Hamria, y Meknès-Amir Abdelkader; comprueba cuál usa tu tren. La estación de autobuses CTM está cerca de Meknès-Ville. Volubilis queda a menos de 40 minutos en coche según Rough Guides.',
        areas: [
          { name: 'Medina', text: 'Monumentos, zocos y cafés a pie, con riads y casas de huéspedes cerca de el-Hedim y Bab Mansour. Callejuelas estrechas y acceso limitado en coche.' },
          { name: 'Ville Nouvelle (Hamria)', text: 'Más práctica: restaurantes, hoteles con aparcamiento, taxis fáciles y estaciones cerca. Sin monumentos; la medina queda a un corto trayecto en taxi.' },
          { name: 'Volubilis', text: 'Las ruinas romanas, el mayor yacimiento arqueológico romano de Marruecos según el ONMT, suelen visitarse junto con Moulay Idriss. Comprueba el transporte antes de salir.' },
        ],
        faq: [
          { q: '¿Dónde alojarse en Mequinez en una primera visita?', a: 'Un riad o casa de huéspedes en la medina, cerca de el-Hedim, de 1 a 2 noches. Para una parada en tren o en coche, la Ville Nouvelle es más sencilla.' },
          { q: '¿Se pueden combinar Mequinez y Fez?', a: 'Sí: algunos viajeros duermen en Fez y vuelven, otros hacen lo contrario. Elige según los horarios de tren y las ganas de tranquilidad.' },
        ],
      },
      de: {
        intro: 'Die frühere Kaiserstadt von Moulay Ismail ist kleiner und ruhiger als Fès und wird oft in ein bis zwei Tagen besucht. Die Stadt besteht aus zwei getrennten Zentren, der Medina und der Ville Nouvelle (Hamria), geteilt durch das Wadi Boufekrane.',
        why: ['Eine historische Stadt auf der UNESCO-Liste seit 1996, mit Bab Mansour und dem Platz el-Hedim', 'Ruhiger als Fès und in ein bis zwei Tagen gut zu sehen', 'Ein Stützpunkt für Fès und für die römischen Ruinen von Volubilis'],
        when: 'Meknès hat ein mediterranes Klima mit kontinentalem Einfluss: heiße Sommer, kühle Winter. Frühling und Herbst sind meist angenehmer.',
        access: 'Meknès liegt an der Bahnlinie Fès–Rabat und hat zwei Bahnhöfe: Meknès-Ville auf der Hamria-Seite und Meknès-Amir Abdelkader; prüfen Sie, welchen Ihr Zug anfährt. Der CTM-Busbahnhof liegt nahe Meknès-Ville. Volubilis ist laut Rough Guides in weniger als 40 Minuten mit dem Auto erreichbar.',
        areas: [
          { name: 'Medina', text: 'Monumente, Souks und Cafés zu Fuß, Riads und Gästehäuser nahe el-Hedim und Bab Mansour. Enge Gassen, eingeschränkter Autozugang.' },
          { name: 'Ville Nouvelle (Hamria)', text: 'Praktischer: Restaurants, Hotels mit Parkplatz, leicht Taxis und Bahnhöfe in der Nähe. Keine Monumente; die Medina erreicht man per Taxi.' },
          { name: 'Volubilis', text: 'Die römischen Ruinen, laut ONMT die größte römische Ausgrabungsstätte Marokkos, werden oft zusammen mit Moulay Idriss besucht. Transport vorab klären.' },
        ],
        faq: [
          { q: 'Wo übernachtet man in Meknès beim ersten Besuch?', a: 'In einem Riad oder Gästehaus in der Medina nahe el-Hedim, für 1 bis 2 Nächte. Für einen Zwischenstopp mit Zug oder Auto ist die Ville Nouvelle einfacher.' },
          { q: 'Kann man Meknès und Fès kombinieren?', a: 'Ja: Manche übernachten in Fès und kommen zurück, andere umgekehrt. Entscheiden Sie nach Zugzeiten und Ihrem Wunsch nach Ruhe.' },
        ],
      },
      ar: {
        intro: 'مكناس العاصمة الإمبراطورية القديمة للمولى إسماعيل، أصغر وأهدأ من فاس، وتُزار غالباً في يوم أو يومين. تتكون المدينة من مركزين منفصلين هما المدينة العتيقة والمدينة الجديدة (الحمرية)، يفصل بينهما واد بوفكران.',
        why: ['مدينة تاريخية مدرجة لدى اليونسكو منذ 1996، بباب المنصور وساحة الهديم', 'أهدأ من فاس ويسهل زيارتها في يوم أو يومين', 'قاعدة لزيارة فاس والآثار الرومانية لوليلي'],
        when: 'لمكناس مناخ متوسطي بتأثير قاري: صيف حار وشتاء بارد. والربيع والخريف عموماً أنسب.',
        access: 'تقع مكناس على خط القطار فاس–الرباط ولها محطتان: مكناس المدينة من جهة الحمرية، ومكناس الأمير عبد القادر؛ تحقق من المحطة التي يمر بها قطارك. محطة حافلات CTM قريبة من محطة مكناس المدينة. وليلي على بعد أقل من 40 دقيقة بالسيارة حسب Rough Guides.',
        areas: [
          { name: 'المدينة العتيقة', text: 'معالم وأسواق ومقاهٍ مشياً على الأقدام، مع رياضات ودور ضيافة قرب الهديم وباب المنصور. أزقة ضيقة وولوج محدود للسيارات.' },
          { name: 'المدينة الجديدة (الحمرية)', text: 'أكثر عملية: مطاعم وفنادق بمواقف وسيارات أجرة سهلة ومحطات قريبة. لا معالم بها، والمدينة العتيقة على بعد رحلة قصيرة بسيارة أجرة.' },
          { name: 'وليلي', text: 'الآثار الرومانية، وهي أكبر موقع أثري روماني في المغرب حسب المكتب الوطني المغربي للسياحة، تُزار غالباً مع مولاي إدريس. تحقق من وسيلة النقل قبل الانطلاق.' },
        ],
        faq: [
          { q: 'أين أقيم في مكناس في الزيارة الأولى؟', a: 'في رياض أو دار ضيافة بالمدينة العتيقة قرب الهديم لمدة ليلة إلى ليلتين. أما للتوقف بالقطار أو السيارة فالمدينة الجديدة أبسط.' },
          { q: 'هل يمكن الجمع بين مكناس وفاس؟', a: 'نعم: بعض المسافرين ينامون في فاس ويعودون، وآخرون يفعلون العكس. اختر حسب مواعيد القطار ورغبتك في الهدوء.' },
        ],
      },
    },
  },
  {
    id: 'ouarzazate',
    slug: { en: 'ouarzazate', fr: 'ouarzazate', es: 'ouarzazate', de: 'ouarzazate', ar: 'warzazat' },
    lat: 30.9189,
    lon: -6.8934,
    accessKeys: ['airports', 'ctm-supratours', 'car-rental'],
    stayKey: 'where-to-stay-ouarzazate',
    tripKeys: ['fes-merzouga', 'where-to-stay-merzouga'],
    moreKeys: ['riad-or-hotel', 'scams-safety'],
    bookingQuery: 'Ouarzazate',
    text: {
      fr: {
        intro: "Ouarzazate est la grande étape entre le Haut Atlas et le Sud : on y dort pour visiter les kasbahs et les ksour, ou simplement pour couper la route vers le désert. La vraie question est de choisir où se placer : en ville, près d'une kasbah, ou dans la campagne autour.",
        why: ["La kasbah de Taourirt et les studios de cinéma (Atlas Studios, créés en 1983)", "Le ksar d'Aït Ben Haddou, inscrit à l'UNESCO depuis 1987", 'Une étape pratique sur la route du désert, avec un aéroport international'],
        when: "Le printemps et l'automne sont généralement les plus confortables. L'été est chaud (maximales avoisinant 37 °C en plein été) et, en hiver, les nuits peuvent descendre sous 0 °C : vérifiez le chauffage.",
        access: "Ouarzazate possède un aéroport international (OZZ) ; les liaisons changent selon les saisons, consultez l'ONDA ou la compagnie. Depuis Marrakech, la route passe par le col du Tizi n'Tichka (2 260 m) : l'ONMT indique 194 km et 3 h 45 de route ; la neige peut compliquer le passage en hiver.",
        areas: [
          { name: 'En ville', text: "Le plus simple pour une nuit d'étape : hôtels, restaurants et taxis concentrés, départs matinaux faciles. Le centre est fonctionnel, pas une médina ancienne." },
          { name: 'Kasbah de Taourirt', text: "Dormir près de la kasbah permet de la visiter à pied. Vérifiez l'adresse exacte et le stationnement avant de réserver." },
          { name: "Périphérie et Aït Ben Haddou", text: "Maisons d'hôtes et hôtels de style kasbah, plus calmes mais éloignés : sans voiture, prévoyez un transfert ou un taxi pour dîner et pour les excursions." },
        ],
        faq: [
          { q: "Où dormir à Ouarzazate pour une nuit d'étape ?", a: "En ville, près de la kasbah de Taourirt : restaurants et taxis sont à portée, et les départs matinaux (avion, bus, circuit) sont faciles." },
          { q: "Faut-il loger près d'Aït Ben Haddou ?", a: "C'est plus dépaysant, avec un accès tranquille en fin de journée, mais l'offre est limitée et il faut s'organiser pour les repas et le retour. Vérifiez la distance et le transport avant de réserver." },
        ],
      },
      en: {
        intro: 'Ouarzazate is the big stopover between the High Atlas and the South: people sleep here to visit the kasbahs and ksour, or simply to break the road to the desert. The real question is where to base yourself: in town, near a kasbah, or in the countryside around.',
        why: ['The Taourirt kasbah and the film studios (Atlas Studios, created in 1983)', 'The ksar of Ait Ben Haddou, on the UNESCO list since 1987', 'A practical stopover on the road to the desert, with an international airport'],
        when: 'Spring and autumn are generally the most comfortable. Summer is hot (midsummer highs around 37 °C) and winter nights can fall below 0 °C: check the heating.',
        access: 'Ouarzazate has an international airport (OZZ); routes change with the seasons, so check ONDA or the airline. From Marrakech the road crosses the Tizi n\'Tichka pass (2,260 m): ONMT gives 194 km and 3 h 45 of driving; snow can complicate the crossing in winter.',
        areas: [
          { name: 'In town', text: 'The simplest choice for a stopover: hotels, restaurants and taxis close together, easy early departures. The centre is functional, not an old medina.' },
          { name: 'Taourirt kasbah', text: 'Sleeping near the kasbah lets you visit it on foot. Check the exact address and parking before booking.' },
          { name: 'Outskirts and Ait Ben Haddou', text: 'Guesthouses and kasbah-style hotels, calmer but remote: without a car, plan a transfer or a taxi for dinner and excursions.' },
        ],
        faq: [
          { q: 'Where should I sleep in Ouarzazate for a stopover night?', a: 'In town, near the Taourirt kasbah: restaurants and taxis are within reach and early departures (flight, bus, tour) are easy.' },
          { q: 'Should I stay near Ait Ben Haddou?', a: 'It feels more remote, with quiet access late in the day, but the choice is limited and you need to organise meals and the return. Check the distance and transport before booking.' },
        ],
      },
      es: {
        intro: 'Uarzazate es la gran etapa entre el Alto Atlas y el Sur: se duerme aquí para visitar las kasbahs y los ksour, o simplemente para cortar el camino hacia el desierto. La verdadera cuestión es dónde instalarse: en la ciudad, cerca de una kasbah o en el campo de alrededor.',
        why: ['La kasbah de Taourirt y los estudios de cine (Atlas Studios, creados en 1983)', 'El ksar de Ait Ben Haddou, en la lista de la UNESCO desde 1987', 'Una parada práctica en la ruta al desierto, con aeropuerto internacional'],
        when: 'La primavera y el otoño suelen ser los más cómodos. El verano es caluroso (máximas en torno a 37 °C en pleno verano) y en invierno las noches pueden bajar de 0 °C: comprueba la calefacción.',
        access: 'Uarzazate tiene aeropuerto internacional (OZZ); las conexiones cambian según la temporada, consulta la ONDA o la aerolínea. Desde Marrakech la carretera cruza el puerto del Tizi n\'Tichka (2260 m): el ONMT indica 194 km y 3 h 45 de ruta; la nieve puede complicar el paso en invierno.',
        areas: [
          { name: 'En la ciudad', text: 'Lo más sencillo para una noche de etapa: hoteles, restaurantes y taxis juntos, salidas tempranas fáciles. El centro es funcional, no una medina antigua.' },
          { name: 'Kasbah de Taourirt', text: 'Dormir cerca de la kasbah permite visitarla a pie. Comprueba la dirección exacta y el aparcamiento antes de reservar.' },
          { name: 'Afueras y Ait Ben Haddou', text: 'Casas de huéspedes y hoteles de estilo kasbah, más tranquilos pero alejados: sin coche, prevé un traslado o un taxi para cenar y para las excursiones.' },
        ],
        faq: [
          { q: '¿Dónde dormir en Uarzazate para una noche de etapa?', a: 'En la ciudad, cerca de la kasbah de Taourirt: restaurantes y taxis a mano y salidas tempranas (avión, autobús, circuito) fáciles.' },
          { q: '¿Conviene alojarse cerca de Ait Ben Haddou?', a: 'Es más apartado, con acceso tranquilo a última hora del día, pero la oferta es limitada y hay que organizar comidas y regreso. Comprueba la distancia y el transporte antes de reservar.' },
        ],
      },
      de: {
        intro: 'Ouarzazate ist die große Etappe zwischen Hohem Atlas und Süden: Man übernachtet hier, um Kasbahs und Ksour zu besuchen oder die Fahrt in die Wüste zu unterbrechen. Die eigentliche Frage ist, wo man sich niederlässt: in der Stadt, nahe einer Kasbah oder auf dem Land ringsum.',
        why: ['Die Kasbah Taourirt und die Filmstudios (Atlas Studios, gegründet 1983)', 'Das Ksar Aït Ben Haddou, seit 1987 UNESCO-Welterbe', 'Ein praktischer Zwischenstopp auf dem Weg in die Wüste, mit internationalem Flughafen'],
        when: 'Frühling und Herbst sind meist am angenehmsten. Der Sommer ist heiß (Höchstwerte um 37 °C im Hochsommer), im Winter können die Nächte unter 0 °C fallen: Heizung prüfen.',
        access: 'Ouarzazate hat einen internationalen Flughafen (OZZ); die Verbindungen wechseln mit der Saison, prüfen Sie ONDA oder die Airline. Ab Marrakesch führt die Straße über den Tizi n\'Tichka (2.260 m): ONMT nennt 194 km und 3 h 45 Fahrt; Schnee kann die Überquerung im Winter erschweren.',
        areas: [
          { name: 'In der Stadt', text: 'Am einfachsten für eine Zwischenübernachtung: Hotels, Restaurants und Taxis dicht beieinander, frühe Abreisen sind leicht. Das Zentrum ist funktional, keine alte Medina.' },
          { name: 'Kasbah Taourirt', text: 'Wer in der Nähe der Kasbah schläft, besucht sie zu Fuß. Genaue Adresse und Parkplatz vor der Buchung prüfen.' },
          { name: 'Umland und Aït Ben Haddou', text: 'Gästehäuser und Hotels im Kasbah-Stil, ruhiger, aber abgelegen: ohne Auto Transfer oder Taxi fürs Abendessen und für Ausflüge einplanen.' },
        ],
        faq: [
          { q: 'Wo übernachtet man in Ouarzazate für eine Zwischennacht?', a: 'In der Stadt, nahe der Kasbah Taourirt: Restaurants und Taxis sind in Reichweite, frühe Abreisen (Flug, Bus, Tour) sind leicht.' },
          { q: 'Lohnt es sich, nahe Aït Ben Haddou zu wohnen?', a: 'Es ist abgelegener, mit ruhigem Zugang am Spätnachmittag, aber das Angebot ist begrenzt und Mahlzeiten und Rückweg müssen organisiert werden. Entfernung und Transport vor der Buchung prüfen.' },
        ],
      },
      ar: {
        intro: 'ورزازات محطة كبرى بين الأطلس الكبير والجنوب: ينام فيها الزوار لزيارة القصبات والقصور، أو لقطع الطريق نحو الصحراء. والسؤال الحقيقي هو أين تقيم: في المدينة، أم قرب قصبة، أم في الريف المحيط.',
        why: ['قصبة تاوريرت واستوديوهات السينما (أطلس ستوديوز، أُنشئت سنة 1983)', 'قصر آيت بن حدو، مدرج لدى اليونسكو منذ 1987', 'محطة عملية في طريق الصحراء، بمطار دولي'],
        when: 'الربيع والخريف عموماً أكثر راحة. الصيف حار (تبلغ القصوى نحو 37 درجة في أوج الصيف) وقد تنزل الليالي شتاءً إلى ما دون الصفر: تحقق من التدفئة.',
        access: 'لورزازات مطار دولي (OZZ)؛ تتغير الخطوط حسب المواسم، فراجع المكتب الوطني للمطارات أو شركة الطيران. من مراكش يمر الطريق عبر ممر تيزي نتيشكا (2260 م): يذكر المكتب الوطني المغربي للسياحة 194 كلم و3 ساعات و45 دقيقة؛ وقد يعقّد الثلج العبور شتاءً.',
        areas: [
          { name: 'في المدينة', text: 'الأبسط لليلة عبور: فنادق ومطاعم وسيارات أجرة متقاربة، ومغادرة مبكرة سهلة. المركز عملي وليس مدينة عتيقة.' },
          { name: 'قصبة تاوريرت', text: 'النوم قرب القصبة يتيح زيارتها مشياً. تحقق من العنوان الدقيق والمواقف قبل الحجز.' },
          { name: 'الضواحي وآيت بن حدو', text: 'دور ضيافة وفنادق على طراز القصبات، أهدأ لكنها بعيدة: دون سيارة رتّب نقلاً أو سيارة أجرة للعشاء وللرحلات.' },
        ],
        faq: [
          { q: 'أين أنام في ورزازات لليلة عبور؟', a: 'في المدينة قرب قصبة تاوريرت: المطاعم وسيارات الأجرة في المتناول، والمغادرة المبكرة (طائرة، حافلة، جولة) سهلة.' },
          { q: 'هل أقيم قرب آيت بن حدو؟', a: 'الإقامة هناك أبعد وأهدأ مع وصول هادئ في آخر النهار، لكن العرض محدود ويلزم تدبير الوجبات والعودة. تحقق من المسافة والنقل قبل الحجز.' },
        ],
      },
    },
  },
  {
    id: 'oujda',
    slug: { en: 'oujda', fr: 'oujda', es: 'oujda', de: 'oujda', ar: 'wajda' },
    lat: 34.6867,
    lon: -1.9114,
    accessKeys: ['airports', 'trains', 'car-rental'],
    stayKey: 'where-to-stay-oujda',
    tripKeys: [],
    moreKeys: ['short-term-rental', 'where-to-stay-nador', 'where-to-stay-al-hoceima', 'where-to-stay-tetouan-mdiq'],
    bookingQuery: 'Oujda',
    text: {
      fr: {
        intro: "Oujda est la grande ville de l'Oriental, porte nord-est du Maroc. On y fait souvent étape en famille ou on la prend comme base pour rejoindre Saïdia et sa plage.",
        why: ["Une étape pratique : aéroport Angads, gare ONCF et commerces", "Une médina traditionnelle d'environ 25 hectares, entourée de remparts du XIXe siècle", 'Saïdia, la grande plage de l\'est marocain, à environ 50 à 60 km'],
        when: "Juillet-août est la période de forte affluence des familles, surtout à Saïdia : réservez tôt. Les prix saisonniers sont à vérifier à la réservation.",
        access: "L'aéroport Angads (OUD) est à une dizaine de kilomètres au nord de la ville. La gare d'Oujda relie l'ouest du pays (Fès, Rabat, Casablanca) ; pour l'été 2026, l'ONCF a annoncé des trains de nuit supplémentaires Tanger-Oujda du 22 juin au 13 septembre. La frontière terrestre avec l'Algérie est fermée : ne prévoyez pas de passage.",
        areas: [
          { name: 'Centre moderne', text: "Le plus pratique pour un passage ou une étape avant l'avion : commerces, cafés et taxis. Regardez la distance réelle à la gare ONCF." },
          { name: 'Médina', text: "Traditionnelle et intéressante en journée, avec quatre portes principales ; l'offre d'hébergement y est plus limitée." },
          { name: 'Sidi Yahya et Saïdia', text: "Sidi Yahya, oasis à environ 6 km, est une excursion plutôt qu'un secteur d'hébergement. Saïdia, station balnéaire avec marina et golf, est la destination plage." },
        ],
        faq: [
          { q: 'Où dormir à Oujda pour une nuit avant un vol ou un train ?', a: "Dans un hôtel du centre d'Oujda, hors médina : commerces et taxis sont à proximité. Vérifiez la distance à la gare ou à l'endroit où vous avez affaire." },
          { q: "Faut-il loger à Oujda ou à Saïdia l'été ?", a: "Pour la plage sur une à trois semaines, un appartement meublé ou une résidence à Saïdia. Oujda convient pour une étape, la culture ou une base ; les distances divergent selon les sources (52 à 60 km)." },
        ],
      },
      en: {
        intro: "Oujda is the main city of the Oriental region, the north-east gateway to Morocco. People often stop here with family or use it as a base to reach Saidia and its beach.",
        why: ['A practical stopover: Angads airport, ONCF station and shops', 'A traditional medina of about 25 hectares, ringed by 19th-century ramparts', 'Saidia, the main beach of eastern Morocco, about 50 to 60 km away'],
        when: 'July-August is peak season for families, especially in Saidia: book early. Seasonal prices should be checked at booking.',
        access: "Angads airport (OUD) is about ten kilometres north of the city. Oujda station links the west of the country (Fes, Rabat, Casablanca); for summer 2026 ONCF announced extra night trains on Tangier-Oujda from 22 June to 13 September. The land border with Algeria is closed: do not plan to cross.",
        areas: [
          { name: 'Modern centre', text: 'The most practical for a passing night or a stop before a flight: shops, cafés and taxis. Look at the real distance to the ONCF station.' },
          { name: 'Medina', text: 'Traditional and interesting by day, with four main gates; accommodation is more limited here.' },
          { name: 'Sidi Yahya and Saidia', text: 'Sidi Yahya, an oasis about 6 km away, is an excursion rather than a place to stay. Saidia, a seaside resort with a marina and golf course, is the beach destination.' },
        ],
        faq: [
          { q: 'Where should I sleep in Oujda before a flight or a train?', a: 'In a hotel in the centre of Oujda, outside the medina: shops and taxis are close by. Check the distance to the station or to where you need to be.' },
          { q: 'Should I stay in Oujda or Saidia in summer?', a: 'For the beach over one to three weeks, a furnished flat or residence in Saidia. Oujda suits a stopover, culture or a base; distances differ between sources (52 to 60 km).' },
        ],
      },
      es: {
        intro: 'Uchda es la gran ciudad de la región Oriental, la puerta noreste de Marruecos. A menudo se hace escala en familia o se usa como base para llegar a Saidia y su playa.',
        why: ['Una escala práctica: aeropuerto Angads, estación de la ONCF y comercios', 'Una medina tradicional de unas 25 hectáreas, rodeada de murallas del siglo XIX', 'Saidia, la gran playa del este marroquí, a unos 50 a 60 km'],
        when: 'Julio y agosto son la época de mayor afluencia de familias, sobre todo en Saidia: reserva pronto. Los precios de temporada deben comprobarse al reservar.',
        access: 'El aeropuerto Angads (OUD) está a una decena de kilómetros al norte de la ciudad. La estación de Uchda conecta con el oeste del país (Fez, Rabat, Casablanca); para el verano de 2026 la ONCF anunció trenes nocturnos adicionales Tánger-Uchda del 22 de junio al 13 de septiembre. La frontera terrestre con Argelia está cerrada: no prevean cruzarla.',
        areas: [
          { name: 'Centro moderno', text: 'Lo más práctico para una noche de paso o una escala antes del avión: comercios, cafés y taxis. Mira la distancia real a la estación de la ONCF.' },
          { name: 'Medina', text: 'Tradicional e interesante de día, con cuatro puertas principales; la oferta de alojamiento es más limitada.' },
          { name: 'Sidi Yahya y Saidia', text: 'Sidi Yahya, un oasis a unos 6 km, es una excursión más que una zona donde alojarse. Saidia, estación balnearia con puerto deportivo y golf, es el destino de playa.' },
        ],
        faq: [
          { q: '¿Dónde dormir en Uchda antes de un vuelo o un tren?', a: 'En un hotel del centro de Uchda, fuera de la medina: comercios y taxis cerca. Comprueba la distancia a la estación o al lugar de tus gestiones.' },
          { q: '¿Alojarse en Uchda o en Saidia en verano?', a: 'Para la playa de una a tres semanas, un apartamento amueblado o una residencia en Saidia. Uchda sirve para una escala, la cultura o como base; las distancias difieren según las fuentes (52 a 60 km).' },
        ],
      },
      de: {
        intro: 'Oujda ist die große Stadt der Region Oriental, das Nordosttor Marokkos. Man legt hier oft mit der Familie einen Zwischenstopp ein oder nutzt sie als Basis für Saïdia und seinen Strand.',
        why: ['Ein praktischer Zwischenstopp: Flughafen Angads, ONCF-Bahnhof und Geschäfte', 'Eine traditionelle Medina von rund 25 Hektar, umgeben von Stadtmauern aus dem 19. Jahrhundert', 'Saïdia, der große Strand Ostmarokkos, etwa 50 bis 60 km entfernt'],
        when: 'Juli und August sind die Hauptreisezeit für Familien, vor allem in Saïdia: früh buchen. Saisonpreise bei der Buchung prüfen.',
        access: 'Der Flughafen Angads (OUD) liegt rund zehn Kilometer nördlich der Stadt. Der Bahnhof Oujda verbindet mit dem Westen des Landes (Fès, Rabat, Casablanca); für den Sommer 2026 kündigte die ONCF zusätzliche Nachtzüge Tanger–Oujda vom 22. Juni bis 13. September an. Die Landgrenze zu Algerien ist geschlossen: Einen Übergang nicht einplanen.',
        areas: [
          { name: 'Modernes Zentrum', text: 'Am praktischsten für eine Durchreise oder einen Stopp vor dem Flug: Geschäfte, Cafés und Taxis. Die tatsächliche Entfernung zum ONCF-Bahnhof prüfen.' },
          { name: 'Medina', text: 'Traditionell und tagsüber interessant, mit vier Haupttoren; das Übernachtungsangebot ist begrenzter.' },
          { name: 'Sidi Yahya und Saïdia', text: 'Sidi Yahya, eine Oase in etwa 6 km Entfernung, ist eher ein Ausflug als ein Übernachtungsviertel. Saïdia, ein Badeort mit Marina und Golfplatz, ist das Strandziel.' },
        ],
        faq: [
          { q: 'Wo übernachtet man in Oujda vor einem Flug oder Zug?', a: 'In einem Hotel im Zentrum von Oujda, außerhalb der Medina: Geschäfte und Taxis sind nah. Die Entfernung zum Bahnhof oder zum Ziel prüfen.' },
          { q: 'Im Sommer in Oujda oder in Saïdia wohnen?', a: 'Für den Strand über ein bis drei Wochen eine möblierte Wohnung oder Residenz in Saïdia. Oujda eignet sich für einen Zwischenstopp, Kultur oder als Basis; die Entfernungen unterscheiden sich je nach Quelle (52 bis 60 km).' },
        ],
      },
      ar: {
        intro: 'وجدة هي المدينة الكبرى في جهة الشرق وبوابة المغرب الشمالية الشرقية. يتوقف فيها الزوار غالباً مع العائلة أو يتخذونها قاعدة للوصول إلى السعيدية وشاطئها.',
        why: ['محطة عملية: مطار أنكاد ومحطة المكتب الوطني للسكك الحديدية ومتاجر', 'مدينة عتيقة تقليدية مساحتها نحو 25 هكتاراً، تحيط بها أسوار من القرن 19', 'السعيدية، أكبر شاطئ في شرق المغرب، على بعد نحو 50 إلى 60 كلم'],
        when: 'يوليوز وغشت فترة ذروة توافد العائلات، خاصة في السعيدية: احجز مبكراً. وتُراجع الأسعار الموسمية عند الحجز.',
        access: 'مطار أنكاد (OUD) على بعد عشرة كيلومترات تقريباً شمال المدينة. تربط محطة وجدة غرب البلاد (فاس، الرباط، الدار البيضاء)؛ وأعلن المكتب الوطني للسكك الحديدية لصيف 2026 قطارات ليلية إضافية طنجة–وجدة من 22 يونيو إلى 13 شتنبر. الحدود البرية مع الجزائر مغلقة: لا تخطط لعبورها.',
        areas: [
          { name: 'المركز الحديث', text: 'الأنسب لليلة عبور أو توقف قبل الطائرة: متاجر ومقاهٍ وسيارات أجرة. انظر إلى المسافة الفعلية إلى محطة القطار.' },
          { name: 'المدينة العتيقة', text: 'تقليدية ومثيرة للاهتمام نهاراً، بأربعة أبواب رئيسية؛ وعرض الإيواء فيها أكثر محدودية.' },
          { name: 'سيدي يحيى والسعيدية', text: 'سيدي يحيى واحة على بعد نحو 6 كلم، وهي رحلة أكثر منها حيّاً للإقامة. والسعيدية منتجع ساحلي بمرسى وملعب غولف، وهي وجهة الشاطئ.' },
        ],
        faq: [
          { q: 'أين أنام في وجدة قبل رحلة جوية أو قطار؟', a: 'في فندق بوسط وجدة خارج المدينة العتيقة: المتاجر وسيارات الأجرة قريبة. تحقق من المسافة إلى المحطة أو إلى وجهتك.' },
          { q: 'هل أقيم في وجدة أم السعيدية صيفاً؟', a: 'للشاطئ لمدة أسبوع إلى ثلاثة، شقة مفروشة أو إقامة في السعيدية. وجدة تناسب التوقف أو الثقافة أو كقاعدة؛ وتختلف المسافات حسب المصادر (52 إلى 60 كلم).' },
        ],
      },
    },
  },
  {
    id: 'al-hoceima',
    slug: { en: 'al-hoceima', fr: 'al-hoceima', es: 'alhucemas', de: 'al-hoceima', ar: 'al-hoceima' },
    lat: 35.2517,
    lon: -3.9372,
    accessKeys: ['ferry-guide', 'airports', 'motorway'],
    stayKey: 'where-to-stay-al-hoceima',
    tripKeys: [],
    moreKeys: ['marhaba-guide', 'short-term-rental', 'where-to-stay-nador', 'where-to-stay-oujda'],
    bookingQuery: 'Al Hoceima',
    text: {
      fr: {
        intro: "Al Hoceïma est une station balnéaire du Rif méditerranéen, très prisée l'été par les familles venues de l'étranger. Bien choisir son secteur évite les trajets inutiles entre plage, commerces et port.",
        why: ["Les plages de Quemado et Sfiha, proches du centre", "Le parc national d'Al Hoceïma : falaises calcaires, dauphins, balbuzards pêcheurs", 'Un accès par avion, par ferry depuis Motril et par la route nationale 16'],
        when: "Juillet-août concentre la demande des MRE : réservez tôt. Les prix montent en haute saison et sont à vérifier à la réservation, jamais garantis.",
        access: "L'aéroport Charif Al Idrissi (AHU) est à 17 km de la ville ; des vols saisonniers et une ligne Royal Air Maroc Express vers Casablanca existent, à confirmer auprès des compagnies. Le port est relié à Motril (Baleària annonce 4 départs par semaine, environ 5 heures ; les sources divergent sur la saison). Par la route : Nador à 126 km selon Wikipédia, Tanger à environ 290 km (5 h 10 selon l'ONMT).",
        areas: [
          { name: 'Centre-ville', text: "Le plus simple pour un court séjour sans voiture : hôtels, restaurants, magasins et taxis. Animé en soirée en été." },
          { name: 'Quemado, Sfiha et Cala Bonita', text: "Plages et secteurs balnéaires avec des complexes hôteliers. Comparez la distance réelle au centre et l'accès en voiture." },
          { name: "Parc national d'Al Hoceïma", text: "Créé en octobre 2004, 48 460 ha dont 19 000 en mer. Cala Iris et Badés : cadre nature loin des commerces, pour qui est motorisé et organisé." },
        ],
        faq: [
          { q: 'Où loger à Al Hoceïma sans voiture ?', a: "Dans un hôtel du centre-ville, proche des commerces et de la mer. Pour un séjour de plusieurs semaines en famille, un appartement meublé avec cuisine." },
          { q: 'Peut-on arriver en ferry ?', a: "Oui, le port est relié à Motril (Espagne), mais les sources divergent sur la saison et la fréquence : vérifiez auprès de la compagnie avant de réserver." },
        ],
      },
      en: {
        intro: 'Al Hoceima is a seaside resort on the Mediterranean Rif coast, very popular in summer with families from abroad. Choosing the right area avoids pointless trips between the beach, the shops and the port.',
        why: ['The Quemado and Sfiha beaches, close to the centre', 'Al Hoceima National Park: limestone cliffs, dolphins and ospreys', 'Access by air, by ferry from Motril and by the N16 road'],
        when: 'July-August concentrates demand from Moroccans living abroad: book early. Prices rise in high season and should be checked at booking, never assumed.',
        access: "Charif Al Idrissi airport (AHU) is 17 km from town; seasonal flights and a Royal Air Maroc Express route to Casablanca exist, to be confirmed with the airlines. The port is linked to Motril (Balearia announces 4 departures a week, about 5 hours; sources differ on the season). By road: Nador is 126 km away according to Wikipedia, Tangier about 290 km (5 h 10 according to ONMT).",
        areas: [
          { name: 'Town centre', text: 'The simplest choice for a short stay without a car: hotels, restaurants, shops and taxis. Lively in the evening in summer.' },
          { name: 'Quemado, Sfiha and Cala Bonita', text: 'Beaches and seaside areas with hotel complexes. Compare the real distance to the centre and car access.' },
          { name: 'Al Hoceima National Park', text: 'Created in October 2004, 48,460 ha including 19,000 at sea. Cala Iris and Bades: a natural setting away from the shops, for those with a car and good planning.' },
        ],
        faq: [
          { q: 'Where should I stay in Al Hoceima without a car?', a: 'In a hotel in the town centre, close to the shops and the sea. For several weeks with family, a furnished flat with a kitchen.' },
          { q: 'Can I arrive by ferry?', a: 'Yes, the port is linked to Motril (Spain), but sources differ on the season and frequency: check with the operator before booking.' },
        ],
      },
      es: {
        intro: 'Alhucemas es una estación balnearia del Rif mediterráneo, muy popular en verano entre las familias llegadas del extranjero. Elegir bien la zona evita trayectos inútiles entre la playa, los comercios y el puerto.',
        why: ['Las playas de Quemado y Sfiha, cerca del centro', 'El Parque Nacional de Alhucemas: acantilados calizos, delfines y águilas pescadoras', 'Acceso en avión, en ferri desde Motril y por la carretera N16'],
        when: 'Julio y agosto concentran la demanda de los marroquíes residentes en el extranjero: reserva pronto. Los precios suben en temporada alta y deben comprobarse al reservar, nunca darse por hechos.',
        access: 'El aeropuerto Charif Al Idrissi (AHU) está a 17 km de la ciudad; hay vuelos estacionales y una ruta de Royal Air Maroc Express a Casablanca, a confirmar con las aerolíneas. El puerto está unido con Motril (Baleària anuncia 4 salidas por semana, unas 5 horas; las fuentes difieren sobre la temporada). Por carretera: Nador está a 126 km según Wikipedia y Tánger a unos 290 km (5 h 10 según el ONMT).',
        areas: [
          { name: 'Centro urbano', text: 'Lo más sencillo para una estancia corta sin coche: hoteles, restaurantes, tiendas y taxis. Animado por la noche en verano.' },
          { name: 'Quemado, Sfiha y Cala Bonita', text: 'Playas y zonas balnearias con complejos hoteleros. Compara la distancia real al centro y el acceso en coche.' },
          { name: 'Parque Nacional de Alhucemas', text: 'Creado en octubre de 2004, 48.460 ha, de ellas 19.000 en el mar. Cala Iris y Badés: entorno natural lejos de los comercios, para quien tiene coche y se organiza.' },
        ],
        faq: [
          { q: '¿Dónde alojarse en Alhucemas sin coche?', a: 'En un hotel del centro, cerca de los comercios y del mar. Para varias semanas en familia, un apartamento amueblado con cocina.' },
          { q: '¿Se puede llegar en ferri?', a: 'Sí, el puerto está unido con Motril (España), pero las fuentes difieren sobre la temporada y la frecuencia: comprueba con la naviera antes de reservar.' },
        ],
      },
      de: {
        intro: 'Al Hoceïma ist ein Badeort an der mediterranen Rif-Küste, im Sommer bei Familien aus dem Ausland sehr beliebt. Die richtige Wahl des Viertels erspart unnötige Wege zwischen Strand, Geschäften und Hafen.',
        why: ['Die Strände Quemado und Sfiha nahe dem Zentrum', 'Der Nationalpark Al Hoceïma: Kalksteinklippen, Delfine und Fischadler', 'Anreise per Flugzeug, per Fähre ab Motril und über die Nationalstraße N16'],
        when: 'Juli und August bündeln die Nachfrage der Auslandsmarokkaner: früh buchen. Die Preise steigen in der Hochsaison und sind bei der Buchung zu prüfen, nie als gegeben anzunehmen.',
        access: 'Der Flughafen Charif Al Idrissi (AHU) liegt 17 km von der Stadt entfernt; es gibt saisonale Flüge und eine Royal-Air-Maroc-Express-Verbindung nach Casablanca, bei den Airlines zu bestätigen. Der Hafen ist mit Motril verbunden (Baleària nennt 4 Abfahrten pro Woche, etwa 5 Stunden; die Quellen weichen bei der Saison ab). Auf der Straße: Nador liegt laut Wikipedia 126 km entfernt, Tanger etwa 290 km (5 h 10 laut ONMT).',
        areas: [
          { name: 'Stadtzentrum', text: 'Am einfachsten für einen kurzen Aufenthalt ohne Auto: Hotels, Restaurants, Geschäfte und Taxis. Im Sommer abends belebt.' },
          { name: 'Quemado, Sfiha und Cala Bonita', text: 'Strände und Badeviertel mit Hotelanlagen. Die tatsächliche Entfernung zum Zentrum und die Autoanfahrt vergleichen.' },
          { name: 'Nationalpark Al Hoceïma', text: 'Im Oktober 2004 gegründet, 48.460 ha, davon 19.000 auf dem Meer. Cala Iris und Badés: Naturkulisse fern der Geschäfte, für Autofahrer mit guter Planung.' },
        ],
        faq: [
          { q: 'Wo wohnt man in Al Hoceïma ohne Auto?', a: 'In einem Hotel im Stadtzentrum, nahe Geschäften und Meer. Für mehrere Wochen mit der Familie eine möblierte Wohnung mit Küche.' },
          { q: 'Kann man mit der Fähre anreisen?', a: 'Ja, der Hafen ist mit Motril (Spanien) verbunden, doch die Quellen weichen bei Saison und Frequenz ab: vor der Buchung bei der Reederei prüfen.' },
        ],
      },
      ar: {
        intro: 'الحسيمة منتجع ساحلي في الريف المتوسطي، يقصده في الصيف كثير من العائلات القادمة من الخارج. واختيار الحي المناسب يجنّب التنقلات غير الضرورية بين الشاطئ والمتاجر والميناء.',
        why: ['شاطئا كيمادو وصفيحة قرب وسط المدينة', 'المنتزه الوطني للحسيمة: جروف كلسية ودلافين وعقاب البحر', 'الوصول بالطائرة أو بالعبّارة من موتريل أو عبر الطريق الوطنية 16'],
        when: 'يتركز طلب أفراد الجالية في يوليوز وغشت: احجز مبكراً. ترتفع الأسعار في الذروة وتُراجع عند الحجز ولا تُعتبر مضمونة.',
        access: 'مطار الشريف الإدريسي (AHU) على بعد 17 كلم من المدينة؛ توجد رحلات موسمية وخط للخطوط الملكية المغربية إكسبريس نحو الدار البيضاء، يلزم تأكيدها لدى الشركات. الميناء مرتبط بموتريل (تعلن بالياريا عن 4 رحلات أسبوعياً، نحو 5 ساعات؛ وتختلف المصادر حول الموسم). برّاً: الناظور على بعد 126 كلم حسب ويكيبيديا، وطنجة نحو 290 كلم (5 ساعات و10 دقائق حسب المكتب الوطني المغربي للسياحة).',
        areas: [
          { name: 'وسط المدينة', text: 'الأبسط لإقامة قصيرة دون سيارة: فنادق ومطاعم ومتاجر وسيارات أجرة. نابض بالحياة مساءً في الصيف.' },
          { name: 'كيمادو وصفيحة وكالا بونيطا', text: 'شواطئ ومناطق ساحلية بها مركبات فندقية. قارن المسافة الفعلية إلى الوسط وسهولة الوصول بالسيارة.' },
          { name: 'المنتزه الوطني للحسيمة', text: 'أُحدث في أكتوبر 2004 على 48460 هكتاراً منها 19000 في البحر. كالا إيريس وباديس: إطار طبيعي بعيد عن المتاجر لمن يملك سيارة ويحسن التنظيم.' },
        ],
        faq: [
          { q: 'أين أقيم في الحسيمة دون سيارة؟', a: 'في فندق بوسط المدينة قرب المتاجر والبحر. ولإقامة عائلية من عدة أسابيع، شقة مفروشة بمطبخ.' },
          { q: 'هل يمكن الوصول بالعبّارة؟', a: 'نعم، الميناء مرتبط بموتريل (إسبانيا)، لكن المصادر تختلف حول الموسم والوتيرة: تحقق لدى الشركة قبل الحجز.' },
        ],
      },
    },
  },
  {
    id: 'merzouga',
    slug: { en: 'merzouga', fr: 'merzouga', es: 'merzouga', de: 'merzouga', ar: 'merzouga' },
    lat: 31.0997,
    lon: -4.0128,
    accessKeys: ['merzouga-tour', 'fes-merzouga', 'car-rental'],
    stayKey: 'where-to-stay-merzouga',
    tripKeys: [],
    moreKeys: ['scams-safety', 'cash-atms', 'tipping', 'health-travellers'],
    bookingQuery: 'Merzouga',
    text: {
      fr: {
        intro: "Merzouga est le village d'accès à l'Erg Chebbi, dans le sud-est du Maroc. Y dormir, c'est choisir entre une nuit dans les dunes (bivouac ou camp), une auberge au pied de l'erg, ou un mélange des deux.",
        why: ["Les dunes de l'Erg Chebbi, l'une des portes du Sahara selon l'ONMT", 'Le trajet à dromadaire, le dîner et la nuit en bivouac', "Des auberges au pied des dunes, pour un vrai lit sans renoncer au coucher de soleil"],
        when: "Le printemps (mars à mai) et l'automne (septembre à novembre) sont les meilleures périodes. L'été est extrêmement chaud ; l'hiver, haute saison, a des nuits très froides : consultez la météo avant le départ.",
        access: "Merzouga est à environ 50 km d'Erfoud et 562 km de Marrakech selon Wikipédia (à confirmer sur votre itinéraire). Les circuits depuis Marrakech et Fès sont détaillés dans nos guides ; l'aéroport d'Errachidia fait partie du réseau de l'ONDA. Évitez de rouler de nuit.",
        areas: [
          { name: 'Camp dans les dunes', text: "Forfait classique : trajet à dromadaire, dîner, petit-déjeuner et animation. Les camps dits « luxe » ont des tentes avec lit : le terme n'est pas normé, demandez détails et photos récentes." },
          { name: 'Auberge ou kasbah-hôtel', text: "Vrai lit, vraie douche, chauffage ou climatisation, avec le dromadaire au coucher du soleil sans dormir sous tente." },
          { name: 'Formule mixte', text: "Chambres et camp à quelques kilomètres : utile pour une nuit sous tente puis une nuit confortable." },
        ],
        faq: [
          { q: 'Quel hébergement choisir pour une première fois ?', a: "Un camp dans les dunes avec trajet à dromadaire, dîner et petit-déjeuner pour une nuit. Si vous craignez le froid ou la tente, une auberge puis une excursion à la journée." },
          { q: 'Que vérifier avant de réserver un camp ?', a: "Ce qui est inclus (repas, eau, douche, transfert), les couvertures, l'annulation et l'acompte par écrit, et l'heure d'arrivée avant le départ des dromadaires. Réservez directement avec l'établissement, pas avec un rabatteur à Rissani, Erfoud ou Merzouga." },
        ],
      },
      en: {
        intro: 'Merzouga is the gateway village to the Erg Chebbi in south-east Morocco. Staying here means choosing between a night in the dunes (bivouac or camp), a guesthouse at the foot of the erg, or a mix of both.',
        why: ['The Erg Chebbi dunes, one of the gateways to the Sahara according to ONMT', 'The camel ride, dinner and a night in a bivouac', 'Guesthouses at the foot of the dunes, for a proper bed without missing the sunset'],
        when: 'Spring (March to May) and autumn (September to November) are the best periods. Summer is extremely hot; winter, the high season, has very cold nights: check the weather before you leave.',
        access: 'Merzouga is about 50 km from Erfoud and 562 km from Marrakech according to Wikipedia (confirm on your own route). Tours from Marrakech and Fes are detailed in our guides; Errachidia airport is part of the ONDA network. Avoid driving at night.',
        areas: [
          { name: 'Camp in the dunes', text: 'The classic package: camel ride, dinner, breakfast and entertainment. So-called "luxury" camps have tents with beds: the term is not standardised, so ask for details and recent photos.' },
          { name: 'Guesthouse or kasbah hotel', text: 'A real bed, a real shower, heating or air conditioning, with the camel ride at sunset without sleeping in a tent.' },
          { name: 'Mixed option', text: 'Rooms plus a camp a few kilometres away: useful for one night under canvas and one in comfort.' },
        ],
        faq: [
          { q: 'Which accommodation should I choose the first time?', a: 'A camp in the dunes with a camel ride, dinner and breakfast for one night. If you dislike cold or tents, a guesthouse and a day excursion.' },
          { q: 'What should I check before booking a camp?', a: 'What is included (meals, water, shower, transfer), blankets, cancellation and deposit in writing, and arrival time before the camels leave. Book directly with the establishment, not with a tout in Rissani, Erfoud or Merzouga.' },
        ],
      },
      es: {
        intro: 'Merzouga es el pueblo de acceso al Erg Chebbi, en el sureste de Marruecos. Dormir aquí es elegir entre una noche en las dunas (vivac o campamento), un albergue al pie del erg o una mezcla de ambos.',
        why: ['Las dunas del Erg Chebbi, una de las puertas del Sáhara según el ONMT', 'El paseo en dromedario, la cena y la noche en vivac', 'Albergues al pie de las dunas, para una cama de verdad sin renunciar al atardecer'],
        when: 'La primavera (marzo a mayo) y el otoño (septiembre a noviembre) son las mejores épocas. El verano es extremadamente caluroso; el invierno, temporada alta, tiene noches muy frías: consulta el tiempo antes de salir.',
        access: 'Merzouga está a unos 50 km de Erfoud y 562 km de Marrakech según Wikipedia (a confirmar en tu itinerario). Los circuitos desde Marrakech y Fez se detallan en nuestras guías; el aeropuerto de Errachidia forma parte de la red de la ONDA. Evita conducir de noche.',
        areas: [
          { name: 'Campamento en las dunas', text: 'El paquete clásico: paseo en dromedario, cena, desayuno y animación. Los campamentos llamados «de lujo» tienen tiendas con cama: el término no está normalizado, pide detalles y fotos recientes.' },
          { name: 'Albergue u hotel-kasbah', text: 'Cama de verdad, ducha de verdad, calefacción o aire acondicionado, con el paseo en dromedario al atardecer sin dormir en tienda.' },
          { name: 'Fórmula mixta', text: 'Habitaciones y campamento a pocos kilómetros: útil para una noche en tienda y otra con comodidad.' },
        ],
        faq: [
          { q: '¿Qué alojamiento elegir la primera vez?', a: 'Un campamento en las dunas con paseo en dromedario, cena y desayuno para una noche. Si te asusta el frío o la tienda, un albergue y una excursión de un día.' },
          { q: '¿Qué comprobar antes de reservar un campamento?', a: 'Qué incluye (comidas, agua, ducha, traslado), las mantas, la cancelación y el depósito por escrito, y la hora de llegada antes de la salida de los dromedarios. Reserva directamente con el establecimiento, no con un captador en Rissani, Erfoud o Merzouga.' },
        ],
      },
      de: {
        intro: 'Merzouga ist das Zugangsdorf zum Erg Chebbi im Südosten Marokkos. Hier zu übernachten heißt, zwischen einer Nacht in den Dünen (Biwak oder Camp), einer Herberge am Fuß des Ergs oder einer Mischung aus beidem zu wählen.',
        why: ['Die Dünen des Erg Chebbi, laut ONMT eines der Tore zur Sahara', 'Der Kamelritt, das Abendessen und die Nacht im Biwak', 'Herbergen am Fuß der Dünen, für ein richtiges Bett ohne auf den Sonnenuntergang zu verzichten'],
        when: 'Frühling (März bis Mai) und Herbst (September bis November) sind die besten Zeiten. Der Sommer ist extrem heiß; der Winter, Hauptsaison, hat sehr kalte Nächte: Wetter vor der Abreise prüfen.',
        access: 'Merzouga liegt laut Wikipedia etwa 50 km von Erfoud und 562 km von Marrakesch entfernt (auf Ihrer Route zu prüfen). Die Touren ab Marrakesch und Fès sind in unseren Ratgebern beschrieben; der Flughafen Errachidia gehört zum ONDA-Netz. Nachts nicht fahren.',
        areas: [
          { name: 'Camp in den Dünen', text: 'Das klassische Paket: Kamelritt, Abendessen, Frühstück und Unterhaltung. Sogenannte „Luxus“-Camps haben Zelte mit Betten: Der Begriff ist nicht genormt, fragen Sie nach Details und aktuellen Fotos.' },
          { name: 'Herberge oder Kasbah-Hotel', text: 'Ein richtiges Bett, eine richtige Dusche, Heizung oder Klimaanlage, mit Kamelritt zum Sonnenuntergang ohne Zeltnacht.' },
          { name: 'Gemischte Variante', text: 'Zimmer plus ein Camp einige Kilometer entfernt: praktisch für eine Nacht im Zelt und eine im Komfort.' },
        ],
        faq: [
          { q: 'Welche Unterkunft beim ersten Mal?', a: 'Ein Camp in den Dünen mit Kamelritt, Abendessen und Frühstück für eine Nacht. Wer Kälte oder Zelt scheut, wählt eine Herberge und einen Tagesausflug.' },
          { q: 'Was vor der Buchung eines Camps prüfen?', a: 'Was enthalten ist (Mahlzeiten, Wasser, Dusche, Transfer), Decken, Stornierung und Anzahlung schriftlich sowie die Ankunftszeit vor dem Abmarsch der Kamele. Direkt beim Betrieb buchen, nicht bei einem Anwerber in Rissani, Erfoud oder Merzouga.' },
        ],
      },
      ar: {
        intro: 'مرزوكة قرية الولوج إلى عرق الشبي في جنوب شرق المغرب. والإقامة فيها اختيار بين ليلة في الكثبان (مخيم أو بيفواك)، أو نزل عند سفح العرق، أو مزيج بينهما.',
        why: ['كثبان عرق الشبي، إحدى بوابات الصحراء حسب المكتب الوطني المغربي للسياحة', 'ركوب الجمال والعشاء والمبيت في المخيم', 'نُزل عند سفح الكثبان، لسرير حقيقي دون التخلي عن غروب الشمس'],
        when: 'الربيع (من مارس إلى ماي) والخريف (من شتنبر إلى نونبر) أفضل الفترات. الصيف شديد الحرارة؛ والشتاء، وهو الذروة، لياليه شديدة البرودة: تحقق من الطقس قبل المغادرة.',
        access: 'تبعد مرزوكة نحو 50 كلم عن أرفود و562 كلم عن مراكش حسب ويكيبيديا (يلزم التأكد حسب مسارك). جولات مراكش وفاس مفصلة في أدلتنا؛ ومطار الراشيدية ضمن شبكة المكتب الوطني للمطارات. تجنب القيادة ليلاً.',
        areas: [
          { name: 'مخيم في الكثبان', text: 'الصيغة الكلاسيكية: ركوب الجمال والعشاء والفطور والترفيه. المخيمات المسماة «فاخرة» بها خيام بأسرّة: المصطلح غير موحد، فاطلب التفاصيل وصوراً حديثة.' },
          { name: 'نزل أو فندق على طراز القصبة', text: 'سرير حقيقي ودوش حقيقي وتدفئة أو تكييف، مع ركوب الجمال عند الغروب دون النوم في خيمة.' },
          { name: 'صيغة مختلطة', text: 'غرف ومخيم على بعد بضعة كيلومترات: مفيد لليلة في خيمة وأخرى في راحة.' },
        ],
        faq: [
          { q: 'أي إقامة أختار أول مرة؟', a: 'مخيم في الكثبان مع ركوب الجمال وعشاء وفطور لليلة واحدة. وإن كنت تخشى البرد أو الخيمة فنزل مع رحلة نهارية.' },
          { q: 'ماذا أتحقق منه قبل حجز مخيم؟', a: 'ما يشمله السعر (الوجبات، الماء، الدوش، النقل)، والأغطية، والإلغاء والعربون كتابةً، ووقت الوصول قبل انطلاق الجمال. احجز مباشرة مع المؤسسة لا مع سمسار في الريصاني أو أرفود أو مرزوكة.' },
        ],
      },
    },
  },
  {
    id: 'tafraout',
    slug: {"en":"tafraout","fr":"tafraout","es":"tafraout","de":"tafraout","ar":"tafraut"},
    lat: 29.7219,
    lon: -8.9764,
    accessKeys: ["airports","ctm-supratours","car-rental"],
    stayKey: "where-to-stay-agadir",
    tripKeys: ["taghazout-surf"],
    moreKeys: ["summer-checklist","short-term-rental","scams-safety"],
    bookingQuery: "Tafraout",
    text: {
      fr: {
        intro: "Tafraout est une petite ville de l'Anti-Atlas, dans la région Souss-Massa (province de Tiznit), entourée de chaos granitiques rosés et de vallées d'amandiers. C'est une étape tranquille, loin des grands circuits, appréciée pour la marche, les paysages et l'artisanat berbère.",
        why: ["Les amandiers en fleurs, généralement en février : à confirmer selon l'année et l'altitude","La Pierre Bleue : rochers peints en bleu en 1984 par l'artiste belge Jean Verame près de la ville","Les gorges et villages d'Aït Mansour, la vallée des Ammeln et les paysages de l'Anti-Atlas"],
        when: "Le printemps et l'automne conviennent à la marche ; février est la période habituelle de floraison des amandiers, mais elle varie selon la météo. L'été peut être très chaud en journée, les nuits d'hiver fraîches en altitude : vérifiez la météo avant de partir.",
        access: "Il n'y a pas d'aéroport à Tafraout : le plus proche des aéroports commerciaux du réseau ONDA que nous recensons est Agadir-Al Massira (AGA) ; vérifiez la distance et la durée sur votre itinéraire. Depuis Agadir, la route passe par Tiznit ou par Aït Baha ; depuis Marrakech, comptez une longue journée de route, avec des étapes possibles à Agadir. Des autocars et taxis collectifs desservent la ville : confirmez les horaires sur place ou auprès des compagnies (CTM, Supratours).",
        areas: [{"name":"Centre-ville","text":"Cafés, souk, banques et commerces ; le plus pratique pour une étape."},{"name":"Maisons d'hôtes et auberges autour","text":"Hébergement calme en bordure de palmeraie et de vallée ; idéal pour la marche. Vérifiez l'accès routier avant de réserver."},{"name":"Aït Mansour et la vallée des Ammeln","text":"Excursions à la journée : gorges, oasis et villages de l'Anti-Atlas."}],
        faq: [{"q":"Quand voir les amandiers en fleurs à Tafraout ?","a":"Généralement en février, mais la date varie d'une année à l'autre : renseignez-vous auprès de votre hébergeur avant de vous déplacer."},{"q":"Comment aller à Tafraout ?","a":"Pas d'aéroport sur place : en avion jusqu'à Agadir-Al Massira, puis en voiture, taxi ou autocar. Vérifiez horaires et distances avant de partir."},{"q":"Où loger à Tafraout ?","a":"En centre-ville pour la commodité, ou dans une maison d'hôtes de la vallée pour le calme. Nous n'avons pas encore de guide dédié ; lisez les avis récents."}],
      },
      en: {
        intro: "Tafraout is a small Anti-Atlas town in the Souss-Massa region (Tiznit province), surrounded by pink granite boulders and almond valleys. It is a quiet stop away from the main circuits, valued for walking, scenery and Amazigh crafts.",
        why: ["Almond blossom, usually in February: confirm for the year and altitude","The Blue Rocks: boulders painted blue in 1984 by Belgian artist Jean Verame near the town","The Ait Mansour gorges and villages, the Ammeln valley and Anti-Atlas scenery"],
        when: "Spring and autumn suit walking; February is the usual blossom period, but it varies with the weather. Summer days can be very hot and winter nights cool at altitude: check the weather before leaving.",
        access: "There is no airport at Tafraout: the closest commercial ONDA-network airport we list is Agadir-Al Massira (AGA); check the distance and time on your route. From Agadir the road goes via Tiznit or Ait Baha; from Marrakech allow a long day on the road, with possible stops in Agadir. Coaches and shared taxis serve the town: confirm schedules locally or with the companies (CTM, Supratours).",
        areas: [{"name":"Town centre","text":"Cafés, souk, banks and shops; the most practical for a stop."},{"name":"Guesthouses around town","text":"Quiet lodging on the edge of the palm grove and valley; ideal for walking. Check road access before booking."},{"name":"Ait Mansour & Ammeln valley","text":"Day trips: gorges, oases and Anti-Atlas villages."}],
        faq: [{"q":"When can I see the almond blossom at Tafraout?","a":"Usually in February, but the date varies each year: ask your host before travelling."},{"q":"How do I get to Tafraout?","a":"No airport on site: fly to Agadir-Al Massira, then drive, take a taxi or a coach. Check schedules and distances before leaving."},{"q":"Where should I stay in Tafraout?","a":"In town for convenience, or in a valley guesthouse for quiet. We have no dedicated guide yet; read recent reviews."}],
      },
      es: {
        intro: "Tafraout es una pequeña ciudad del Antiatlas, en la región Souss-Massa (provincia de Tiznit), rodeada de rocas de granito rosado y valles de almendros. Es una parada tranquila, lejos de los circuitos habituales, apreciada por el senderismo, los paisajes y la artesanía amazigh.",
        why: ["Los almendros en flor, normalmente en febrero: confirma según el año y la altitud","La Piedra Azul: rocas pintadas de azul en 1984 por el artista belga Jean Verame cerca de la ciudad","Las gargantas y aldeas de Ait Mansour, el valle de Ammeln y los paisajes del Antiatlas"],
        when: "Primavera y otoño son buenos para caminar; febrero es la época habitual de floración, pero varía con el tiempo. Los días de verano pueden ser muy calurosos y las noches de invierno frías en altura: consulta el tiempo antes de salir.",
        access: "En Tafraout no hay aeropuerto: el aeropuerto comercial de la red ONDA más cercano que recogemos es Agadir-Al Massira (AGA); comprueba la distancia y la duración en tu ruta. Desde Agadir la carretera pasa por Tiznit o por Ait Baha; desde Marrakech cuenta con un día largo de carretera, con posibles paradas en Agadir. Autocares y taxis colectivos sirven la ciudad: confirma los horarios en destino o con las compañías (CTM, Supratours).",
        areas: [{"name":"Centro","text":"Cafés, zoco, bancos y comercios; lo más práctico para una parada."},{"name":"Casas de huéspedes alrededor","text":"Alojamiento tranquilo junto al palmeral y el valle; ideal para caminar. Comprueba el acceso por carretera antes de reservar."},{"name":"Ait Mansour y valle de Ammeln","text":"Excursiones de un día: gargantas, oasis y aldeas del Antiatlas."}],
        faq: [{"q":"¿Cuándo ver los almendros en flor en Tafraout?","a":"Normalmente en febrero, pero la fecha varía cada año: pregunta a tu alojamiento antes de viajar."},{"q":"¿Cómo llegar a Tafraout?","a":"No hay aeropuerto: vuela a Agadir-Al Massira y sigue en coche, taxi o autocar. Comprueba horarios y distancias antes de salir."},{"q":"¿Dónde alojarse en Tafraout?","a":"En el centro por comodidad o en una casa de huéspedes del valle por la calma. Aún no tenemos guía propia; lee opiniones recientes."}],
      },
      de: {
        intro: "Tafraout ist eine kleine Stadt im Anti-Atlas in der Region Souss-Massa (Provinz Tiznit), umgeben von rosa Granitfelsen und Mandeltälern. Ein ruhiger Halt abseits der großen Routen, geschätzt für Wanderungen, Landschaft und Handwerk der Amazigh.",
        why: ["Mandelblüte, meist im Februar: je nach Jahr und Höhe bestätigen","Der Blaue Fels: 1984 vom belgischen Künstler Jean Verame blau bemalte Felsen nahe der Stadt","Die Schluchten und Dörfer von Aït Mansour, das Ammeln-Tal und die Landschaft des Anti-Atlas"],
        when: "Frühling und Herbst eignen sich zum Wandern; Februar ist die übliche Blütezeit, sie schwankt aber mit dem Wetter. Sommertage können sehr heiß, Winternächte in der Höhe kühl sein: Wetter vor der Abreise prüfen.",
        access: "In Tafraout gibt es keinen Flughafen: der nächste kommerzielle Flughafen des ONDA-Netzes, den wir führen, ist Agadir-Al Massira (AGA); Entfernung und Dauer auf der Route prüfen. Ab Agadir führt die Straße über Tiznit oder Aït Baha; ab Marrakesch einen langen Fahrtag einplanen, ggf. mit Halt in Agadir. Busse und Sammeltaxis bedienen den Ort: Fahrpläne vor Ort oder bei den Gesellschaften (CTM, Supratours) bestätigen.",
        areas: [{"name":"Stadtzentrum","text":"Cafés, Souk, Banken und Geschäfte; am praktischsten für einen Halt."},{"name":"Gästehäuser rund um den Ort","text":"Ruhige Unterkunft am Rand von Palmenhain und Tal; ideal zum Wandern. Straßenzugang vor der Buchung prüfen."},{"name":"Aït Mansour & Ammeln-Tal","text":"Tagesausflüge: Schluchten, Oasen und Dörfer des Anti-Atlas."}],
        faq: [{"q":"Wann sieht man die Mandelblüte bei Tafraout?","a":"Meist im Februar, das Datum schwankt jedoch: vor der Reise den Gastgeber fragen."},{"q":"Wie kommt man nach Tafraout?","a":"Kein Flughafen vor Ort: Flug nach Agadir-Al Massira, dann Auto, Taxi oder Bus. Fahrpläne und Entfernungen vorab prüfen."},{"q":"Wo wohnt man in Tafraout?","a":"Im Ort für die Bequemlichkeit oder in einem Gästehaus im Tal für die Ruhe. Einen eigenen Ratgeber haben wir noch nicht; aktuelle Bewertungen lesen."}],
      },
      ar: {
        intro: "تافراوت بلدة صغيرة في الأطلس الصغير بجهة سوس ماسة (إقليم تيزنيت)، تحيط بها صخور الغرانيت الوردية ووديان اللوز. محطة هادئة بعيداً عن المسارات الكبرى، تُقدَّر للمشي والمناظر والصناعة التقليدية الأمازيغية.",
        why: ["إزهار اللوز، عادةً في فبراير: تأكد حسب السنة والارتفاع","الصخرة الزرقاء: صخور طلاها الفنان البلجيكي جان فيرام بالأزرق سنة 1984 قرب البلدة","مضايق وقرى آيت منصور ووادي أمالن ومناظر الأطلس الصغير"],
        when: "الربيع والخريف مناسبان للمشي؛ وفبراير هو موسم الإزهار المعتاد لكنه يتغير مع الطقس. قد تكون أيام الصيف شديدة الحرارة وليالي الشتاء باردة في المرتفعات: تحقق من الطقس قبل المغادرة.",
        access: "لا يوجد مطار في تافراوت: أقرب مطار تجاري ضمن شبكة المكتب الوطني للمطارات مما ندرجه هو أكادير المسيرة (AGA)؛ تحقق من المسافة والمدة على مسارك. من أكادير يمر الطريق عبر تيزنيت أو آيت باها؛ ومن مراكش احسب يوماً طويلاً على الطريق مع إمكانية التوقف في أكادير. تخدم البلدة حافلات وسيارات أجرة كبيرة: أكد المواعيد محلياً أو لدى الشركات (CTM وسوبراتور).",
        areas: [{"name":"وسط البلدة","text":"مقاهٍ وسوق وأبناك ومحلات؛ الأنسب لوقفة."},{"name":"دور الضيافة المحيطة","text":"إقامة هادئة على حافة الواحة والوادي؛ مثالية للمشي. تحقق من الولوج الطرقي قبل الحجز."},{"name":"آيت منصور ووادي أمالن","text":"رحلات يومية: مضايق وواحات وقرى الأطلس الصغير."}],
        faq: [{"q":"متى أرى إزهار اللوز في تافراوت؟","a":"عادةً في فبراير لكن التاريخ يتغير كل سنة: اسأل مضيفك قبل السفر."},{"q":"كيف أصل إلى تافراوت؟","a":"لا مطار بالمكان: الطائرة إلى أكادير المسيرة ثم سيارة أو تاكسي أو حافلة. تحقق من المواعيد والمسافات قبل المغادرة."},{"q":"أين أقيم في تافراوت؟","a":"في البلدة للراحة أو في دار ضيافة بالوادي للهدوء. لا يوجد دليل مخصص بعد؛ اقرأ التقييمات الحديثة."}],
      },
    },
  },
  {
    id: 'agadir',
    slug: {"en":"agadir","fr":"agadir","es":"agadir","de":"agadir","ar":"akadir"},
    costCity: 'agadir',
    lat: 30.4278,
    lon: -9.5981,
    accessKeys: ["airports","ctm-supratours","car-rental"],
    stayKey: "where-to-stay-agadir",
    tripKeys: ["taghazout-surf","essaouira-day-trip"],
    moreKeys: ["where-to-stay-taghazout","summer-checklist"],
    bookingQuery: "Agadir",
    text: {
      fr: {
        intro: "Agadir est la grande station balnéaire du Maroc : une longue plage, du soleil presque toute l'année et une offre d'hébergement très variée. Au nord, la côte de Taghazout attire les surfeurs.",
        why: ["Une longue plage et des hôtels face à la mer","Resorts et all-inclusive adaptés aux familles (Founty)","Base pour le surf à Taghazout et Tamraght"],
        when: "L'hiver reste doux ; l'été, la brume peut rafraîchir les matinées. Vérifiez la météo avant de réserver.",
        access: "L'aéroport Agadir-Al Massira (AGA) fait partie du réseau ONDA ; il se trouve à environ 25 km de la ville selon nos guides. Marrakech-Agadir prend environ 3 h à 3 h 30 en bus (CTM, Supratours).",
        areas: [{"name":"Front de mer","text":"Hôtels avec accès direct à la plage, le plus central."},{"name":"Founty","text":"Plus calme, resorts et all-inclusive pour familles."},{"name":"Marina et baie","text":"Boutique-hôtels, restaurants et promenade."}],
        faq: [{"q":"Où loger à Agadir ?","a":"Front de mer pour la plage, Founty pour les familles, Taghazout ou Tamraght pour le surf. Voir notre guide où loger à Agadir."},{"q":"Comment aller de l'aéroport à la ville ?","a":"Al Massira est à environ 25 km (23 à 28 km selon les sources) : taxi ou transfert ; confirmez les tarifs avant de monter."}],
      },
      en: {
        intro: "Agadir is Morocco’s big beach resort: a long beach, sun almost all year and a wide range of accommodation. To the north, the Taghazout coast draws surfers.",
        why: ["A long beach and seafront hotels","Resorts and all-inclusive options for families (Founty)","A base for surfing at Taghazout and Tamraght"],
        when: "Winters stay mild; in summer, sea mist can cool the mornings. Check the weather before booking.",
        access: "Agadir-Al Massira airport (AGA) is part of the ONDA network; it lies about 25 km from town according to our guides. Marrakech to Agadir takes roughly 3 to 3.5 hours by coach (CTM, Supratours).",
        areas: [{"name":"Seafront","text":"Hotels with direct beach access, the most central."},{"name":"Founty","text":"Calmer, resorts and all-inclusive for families."},{"name":"Marina & bay","text":"Boutique hotels, restaurants and a promenade."}],
        faq: [{"q":"Where should I stay in Agadir?","a":"Seafront for the beach, Founty for families, Taghazout or Tamraght for surf. See our where-to-stay guide for Agadir."},{"q":"How do I get from the airport to town?","a":"Al Massira is about 25 km away (23 to 28 km depending on the source): taxi or transfer; confirm the fare before getting in."}],
      },
      es: {
        intro: "Agadir es la gran ciudad de playa de Marruecos: una playa larga, sol casi todo el año y una oferta de alojamiento muy variada. Al norte, la costa de Taghazout atrae a los surfistas.",
        why: ["Una playa larga y hoteles frente al mar","Resorts y todo incluido para familias (Founty)","Base para surfear en Taghazout y Tamraght"],
        when: "El invierno es suave; en verano la bruma puede refrescar las mañanas. Consulta el tiempo antes de reservar.",
        access: "El aeropuerto Agadir-Al Massira (AGA) forma parte de la red de la ONDA; está a unos 25 km de la ciudad según nuestras guías. Marrakech-Agadir tarda unas 3 a 3,5 horas en autocar (CTM, Supratours).",
        areas: [{"name":"Paseo marítimo","text":"Hoteles con acceso directo a la playa, lo más céntrico."},{"name":"Founty","text":"Más tranquilo, resorts y todo incluido para familias."},{"name":"Marina y bahía","text":"Hoteles boutique, restaurantes y paseo."}],
        faq: [{"q":"¿Dónde alojarse en Agadir?","a":"Paseo marítimo para la playa, Founty para familias, Taghazout o Tamraght para surf. Consulta nuestra guía de dónde alojarse en Agadir."},{"q":"¿Cómo ir del aeropuerto a la ciudad?","a":"Al Massira está a unos 25 km (23 a 28 km según la fuente): taxi o traslado; confirma la tarifa antes de subir."}],
      },
      de: {
        intro: "Agadir ist Marokkos große Badestadt: ein langer Strand, fast ganzjährig Sonne und ein vielfältiges Unterkunftsangebot. Im Norden zieht die Küste von Taghazout Surfer an.",
        why: ["Ein langer Strand und Hotels direkt am Meer","Resorts und All-inclusive für Familien (Founty)","Basis zum Surfen in Taghazout und Tamraght"],
        when: "Der Winter bleibt mild; im Sommer kann Küstennebel die Morgen kühlen. Wetter vor der Buchung prüfen.",
        access: "Der Flughafen Agadir-Al Massira (AGA) gehört zum ONDA-Netz; laut unseren Ratgebern liegt er etwa 25 km von der Stadt entfernt. Marrakesch–Agadir dauert im Bus (CTM, Supratours) etwa 3 bis 3,5 Stunden.",
        areas: [{"name":"Strandpromenade","text":"Hotels mit direktem Strandzugang, am zentralsten."},{"name":"Founty","text":"Ruhiger, Resorts und All-inclusive für Familien."},{"name":"Marina & Bucht","text":"Boutique-Hotels, Restaurants und Promenade."}],
        faq: [{"q":"Wo wohnt man in Agadir?","a":"Promenade für den Strand, Founty für Familien, Taghazout oder Tamraght zum Surfen. Siehe unseren Ratgeber Wo wohnen in Agadir."},{"q":"Wie kommt man vom Flughafen in die Stadt?","a":"Al Massira liegt etwa 25 km entfernt (23 bis 28 km je nach Quelle): Taxi oder Transfer; Preis vor dem Einsteigen klären."}],
      },
      ar: {
        intro: "أكادير هي المحطة الشاطئية الكبرى بالمغرب: شاطئ طويل وشمس شبه دائمة وعرض إيواء متنوع جداً. وإلى الشمال يجذب ساحل تغازوت محبي ركوب الأمواج.",
        why: ["شاطئ طويل وفنادق مطلة على البحر","منتجعات ونظام «كل شيء مشمول» للعائلات (فونتي)","قاعدة لركوب الأمواج في تغازوت وتمراغت"],
        when: "الشتاء معتدل؛ وفي الصيف قد يخفف الضباب من حرارة الصباح. تحقق من الطقس قبل الحجز.",
        access: "مطار أكادير المسيرة (AGA) ضمن شبكة المكتب الوطني للمطارات، ويبعد نحو 25 كلم عن المدينة حسب أدلتنا. الطريق من مراكش إلى أكادير نحو 3 إلى 3.5 ساعات بالحافلة (CTM وسوبراتور).",
        areas: [{"name":"الكورنيش","text":"فنادق بولوج مباشر إلى الشاطئ، الأكثر مركزية."},{"name":"فونتي","text":"أهدأ، منتجعات ونظام شامل للعائلات."},{"name":"المارينا والخليج","text":"فنادق بوتيك ومطاعم وممشى."}],
        faq: [{"q":"أين أقيم في أكادير؟","a":"الكورنيش للشاطئ، فونتي للعائلات، تغازوت أو تمراغت لركوب الأمواج. راجع دليلنا للإقامة في أكادير."},{"q":"كيف أصل من المطار إلى المدينة؟","a":"المسيرة تبعد نحو 25 كلم (23 إلى 28 كلم حسب المصدر): سيارة أجرة أو نقل؛ اتفق على الثمن قبل الركوب."}],
      },
    },
  },
  {
    id: 'dakhla',
    slug: {"en":"dakhla","fr":"dakhla","es":"dajla","de":"dakhla","ar":"ad-dakhla"},
    lat: 23.6848,
    lon: -15.958,
    accessKeys: ["airports"],
    stayKey: "",
    tripKeys: ["dakhla"],
    moreKeys: ["sim-esim-morocco","cash-atms","time-zone"],
    bookingQuery: "Dakhla",
    text: {
      fr: {
        intro: "Dakhla s'étire sur une presqu'île entre désert et océan. Sa lagune est l'un des meilleurs plans d'eau du monde pour le kitesurf, et la ville sert aussi de départ pour les excursions dans le désert.",
        why: ["Kitesurf : plus de 300 jours de vent par an selon notre guide","Lagune à eau plate, pour débuter comme pour progresser","Excursions vers les dunes et le désert blanc"],
        when: "La saison idéale du kitesurf va d'avril à octobre, avec le vent le plus fort de juin à août ; novembre à mars est plus calme et plus frais.",
        access: "L'aéroport de Dakhla fait partie du réseau ONDA. Le plus simple est un vol, souvent avec correspondance à Casablanca ; des vols directs depuis Paris existent certains jours selon la saison. Vérifiez les horaires des compagnies.",
        areas: [{"name":"Ville de Dakhla","text":"Commerces, restaurants et services ; base pratique pour une arrivée."},{"name":"Lagune et camps de kite","text":"Hébergement en kite camp près des spots, avec cours et matériel."},{"name":"Désert et dunes","text":"Excursions à la journée plutôt qu'un secteur d'hébergement."}],
        faq: [{"q":"Quand aller à Dakhla pour le kitesurf ?","a":"D'avril à octobre ; débutants au printemps et début d'automne, confirmés en plein été."},{"q":"Comment y aller ?","a":"En avion jusqu'à Dakhla, souvent via Casablanca. Voir notre guide kitesurf à Dakhla."}],
      },
      en: {
        intro: "Dakhla stretches along a peninsula between desert and ocean. Its lagoon is one of the best kitesurfing spots in the world, and the town is also a starting point for desert trips.",
        why: ["Kitesurfing: over 300 windy days a year according to our guide","Flat-water lagoon, for beginners and progressing riders","Trips to the dunes and the white desert"],
        when: "The ideal kitesurf season runs from April to October, with the strongest wind from June to August; November to March is calmer and cooler.",
        access: "Dakhla airport is part of the ONDA network. The simplest way is a flight, often via Casablanca; direct flights from Paris run on certain days depending on the season. Check airline schedules.",
        areas: [{"name":"Dakhla town","text":"Shops, restaurants and services; a practical place to arrive."},{"name":"Lagoon & kite camps","text":"Kite-camp lodging near the spots, with lessons and gear."},{"name":"Desert & dunes","text":"Day trips rather than a place to stay."}],
        faq: [{"q":"When should I go to Dakhla for kitesurfing?","a":"April to October; beginners in spring and early autumn, experienced riders in midsummer."},{"q":"How do I get there?","a":"By air to Dakhla, often via Casablanca. See our Dakhla kitesurf guide."}],
      },
      es: {
        intro: "Dajla se extiende por una península entre el desierto y el océano. Su laguna es uno de los mejores lugares del mundo para el kitesurf, y la ciudad es también punto de partida de excursiones por el desierto.",
        why: ["Kitesurf: más de 300 días de viento al año según nuestra guía","Laguna de aguas planas, para empezar y para progresar","Excursiones a las dunas y al desierto blanco"],
        when: "La temporada ideal de kitesurf va de abril a octubre, con el viento más fuerte de junio a agosto; de noviembre a marzo es más tranquilo y fresco.",
        access: "El aeropuerto de Dajla forma parte de la red de la ONDA. Lo más sencillo es volar, a menudo con escala en Casablanca; hay vuelos directos desde París algunos días según la temporada. Consulta los horarios de las aerolíneas.",
        areas: [{"name":"Ciudad de Dajla","text":"Tiendas, restaurantes y servicios; práctica para llegar."},{"name":"Laguna y kite camps","text":"Alojamiento en kite camp junto a los spots, con clases y material."},{"name":"Desierto y dunas","text":"Excursiones de un día más que zona donde alojarse."}],
        faq: [{"q":"¿Cuándo ir a Dajla para el kitesurf?","a":"De abril a octubre; principiantes en primavera y principios de otoño, expertos en pleno verano."},{"q":"¿Cómo llegar?","a":"En avión hasta Dajla, a menudo vía Casablanca. Consulta nuestra guía de kitesurf en Dajla."}],
      },
      de: {
        intro: "Dakhla liegt auf einer Halbinsel zwischen Wüste und Ozean. Die Lagune zählt zu den besten Kitesurf-Revieren der Welt; die Stadt ist zugleich Ausgangspunkt für Wüstenausflüge.",
        why: ["Kitesurfen: laut unserem Ratgeber über 300 Windtage im Jahr","Flachwasser-Lagune für Einsteiger und Fortgeschrittene","Ausflüge zu den Dünen und in die weiße Wüste"],
        when: "Die ideale Kitesurf-Saison reicht von April bis Oktober, am windigsten von Juni bis August; November bis März ist ruhiger und kühler.",
        access: "Der Flughafen Dakhla gehört zum ONDA-Netz. Am einfachsten ist der Flug, oft mit Umstieg in Casablanca; je nach Saison gibt es an einzelnen Tagen Direktflüge ab Paris. Flugpläne der Airlines prüfen.",
        areas: [{"name":"Stadt Dakhla","text":"Geschäfte, Restaurants und Dienste; praktisch zum Ankommen."},{"name":"Lagune & Kite-Camps","text":"Unterkunft im Kite-Camp nahe den Spots, mit Kursen und Ausrüstung."},{"name":"Wüste & Dünen","text":"Tagesausflüge statt Übernachtungsgebiet."}],
        faq: [{"q":"Wann nach Dakhla zum Kitesurfen?","a":"April bis Oktober; Anfänger im Frühling und Frühherbst, Erfahrene im Hochsommer."},{"q":"Wie kommt man hin?","a":"Per Flug nach Dakhla, oft über Casablanca. Siehe unseren Kitesurf-Ratgeber Dakhla."}],
      },
      ar: {
        intro: "تمتد الداخلة على شبه جزيرة بين الصحراء والمحيط. وتُعد لاغونها من أفضل مواقع ركوب الأمواج بالطائرة الشراعية في العالم، وهي أيضاً نقطة انطلاق لرحلات الصحراء.",
        why: ["ركوب الأمواج بالطائرة الشراعية: أكثر من 300 يوم رياح في السنة حسب دليلنا","لاغون مياهها مسطحة للمبتدئين والمتقدمين","رحلات نحو الكثبان والصحراء البيضاء"],
        when: "الموسم المثالي من أبريل إلى أكتوبر وأقوى رياح من يونيو إلى غشت؛ ونونبر إلى مارس أهدأ وأبرد.",
        access: "مطار الداخلة ضمن شبكة المكتب الوطني للمطارات. الأسهل هو الطائرة، غالباً بمحطة عبور في الدار البيضاء؛ وتوجد رحلات مباشرة من باريس في بعض الأيام حسب الموسم. تحقق من جداول الشركات.",
        areas: [{"name":"مدينة الداخلة","text":"محلات ومطاعم وخدمات؛ مناسبة للوصول."},{"name":"اللاغون ومخيمات الكايت","text":"إقامة في مخيم كايت قرب المواقع مع دروس ومعدات."},{"name":"الصحراء والكثبان","text":"رحلات يومية أكثر منها منطقة إقامة."}],
        faq: [{"q":"متى أزور الداخلة لركوب الأمواج بالطائرة الشراعية؟","a":"من أبريل إلى أكتوبر؛ المبتدئون في الربيع وبداية الخريف والمحترفون في عز الصيف."},{"q":"كيف أصل إليها؟","a":"بالطائرة إلى الداخلة، غالباً عبر الدار البيضاء. راجع دليلنا للكايتسيرف في الداخلة."}],
      },
    },
  },
  {
    id: 'laayoune',
    slug: {"en":"laayoune","fr":"laayoune","es":"aaiun","de":"laayoune","ar":"al-ayoun"},
    lat: 27.1253,
    lon: -13.1625,
    accessKeys: ["airports"],
    stayKey: "",
    tripKeys: [],
    moreKeys: ["cash-atms","sim-esim-morocco","time-zone"],
    bookingQuery: "Laayoune",
    text: {
      fr: {
        intro: "Laâyoune est la plus grande ville du Sud du Maroc, dans la région Laâyoune-Sakia El Hamra. On y fait étape en voyage vers Dakhla, ou pour des raisons familiales et professionnelles.",
        why: ["Un aéroport du réseau ONDA, Laâyoune-Hassan 1er","Une étape sur la route du Sud vers Dakhla","Une grande ville avec commerces, banques et services"],
        when: "Le climat est désertique et océanique : l'été est chaud, l'hiver et le printemps sont plus doux. Vérifiez la météo avant le départ.",
        access: "L'aéroport Laâyoune-Hassan 1er (EUN) fait partie du réseau ONDA. Les liaisons varient selon la saison : consultez les compagnies aériennes. Pour la route, vérifiez l'itinéraire et les distances avant de partir ; les trajets sont longs.",
        areas: [{"name":"Centre-ville","text":"Commerces, cafés et services ; le plus pratique pour une étape."},{"name":"Plage de Foum El Oued","text":"Zone balnéaire à quelques kilomètres, à vérifier selon la saison."}],
        faq: [{"q":"Comment aller à Laâyoune ?","a":"En avion (aéroport Laâyoune-Hassan 1er) ou par la route ; les distances sont longues, prévoyez des étapes."},{"q":"Où loger à Laâyoune ?","a":"Nous n'avons pas encore de guide dédié : privilégiez le centre-ville et lisez les avis récents."}],
      },
      en: {
        intro: "Laayoune is the largest city of southern Morocco, in the Laayoune-Sakia El Hamra region. People stop here on the way to Dakhla, or for family and business reasons.",
        why: ["An ONDA-network airport, Laayoune-Hassan 1er","A stopover on the southern road to Dakhla","A large city with shops, banks and services"],
        when: "The climate is desert and oceanic: summer is hot, winter and spring are milder. Check the weather before leaving.",
        access: "Laayoune-Hassan 1er airport (EUN) is part of the ONDA network. Routes vary by season: check the airlines. By road, check the route and distances first; journeys are long.",
        areas: [{"name":"City centre","text":"Shops, cafés and services; the most practical for a stopover."},{"name":"Foum El Oued beach","text":"A seaside area a few kilometres away; check conditions by season."}],
        faq: [{"q":"How do I get to Laayoune?","a":"By air (Laayoune-Hassan 1er airport) or by road; distances are long, so plan stops."},{"q":"Where should I stay in Laayoune?","a":"We have no dedicated guide yet: favour the city centre and read recent reviews."}],
      },
      es: {
        intro: "El Aaiún es la mayor ciudad del sur de Marruecos, en la región El Aaiún-Saguía el Hamra. Se hace escala aquí camino de Dajla, o por motivos familiares y profesionales.",
        why: ["Un aeropuerto de la red de la ONDA, El Aaiún-Hassan 1er","Una etapa en la carretera del sur hacia Dajla","Una gran ciudad con comercios, bancos y servicios"],
        when: "El clima es desértico y oceánico: el verano es caluroso; el invierno y la primavera son más suaves. Consulta el tiempo antes de salir.",
        access: "El aeropuerto El Aaiún-Hassan 1er (EUN) forma parte de la red de la ONDA. Las conexiones varían según la temporada: consulta las aerolíneas. Por carretera, comprueba antes el itinerario y las distancias; los trayectos son largos.",
        areas: [{"name":"Centro","text":"Comercios, cafés y servicios; lo más práctico para una escala."},{"name":"Playa de Foum El Oued","text":"Zona costera a pocos kilómetros; comprueba las condiciones según la temporada."}],
        faq: [{"q":"¿Cómo llegar a El Aaiún?","a":"En avión (aeropuerto El Aaiún-Hassan 1er) o por carretera; las distancias son largas, planifica paradas."},{"q":"¿Dónde alojarse en El Aaiún?","a":"Aún no tenemos guía propia: elige el centro y lee opiniones recientes."}],
      },
      de: {
        intro: "Laâyoune ist die größte Stadt im Süden Marokkos, in der Region Laâyoune-Sakia El Hamra. Man macht hier Station auf dem Weg nach Dakhla oder aus familiären und beruflichen Gründen.",
        why: ["Ein Flughafen im ONDA-Netz, Laâyoune-Hassan 1er","Zwischenstopp auf der Südroute nach Dakhla","Große Stadt mit Geschäften, Banken und Diensten"],
        when: "Das Klima ist wüstenhaft und ozeanisch: Der Sommer ist heiß, Winter und Frühling sind milder. Wetter vor der Abreise prüfen.",
        access: "Der Flughafen Laâyoune-Hassan 1er (EUN) gehört zum ONDA-Netz. Verbindungen variieren je nach Saison: Airlines prüfen. Auf der Straße vorher Route und Entfernungen prüfen; die Strecken sind lang.",
        areas: [{"name":"Stadtzentrum","text":"Geschäfte, Cafés und Dienste; am praktischsten für einen Zwischenstopp."},{"name":"Strand Foum El Oued","text":"Küstenbereich einige Kilometer entfernt; Bedingungen je nach Saison prüfen."}],
        faq: [{"q":"Wie kommt man nach Laâyoune?","a":"Per Flug (Flughafen Laâyoune-Hassan 1er) oder auf der Straße; die Distanzen sind lang, Etappen einplanen."},{"q":"Wo wohnt man in Laâyoune?","a":"Einen eigenen Ratgeber haben wir noch nicht: das Zentrum bevorzugen und aktuelle Bewertungen lesen."}],
      },
      ar: {
        intro: "العيون أكبر مدينة في جنوب المغرب، بجهة العيون الساقية الحمراء. يتوقف بها المسافرون في طريقهم إلى الداخلة، أو لأسباب عائلية ومهنية.",
        why: ["مطار ضمن شبكة المكتب الوطني للمطارات: العيون الحسن الأول","محطة على طريق الجنوب نحو الداخلة","مدينة كبيرة بمحلاتها وأبناكها وخدماتها"],
        when: "المناخ صحراوي ومحيطي: الصيف حار والشتاء والربيع أكثر اعتدالاً. تحقق من الطقس قبل المغادرة.",
        access: "مطار العيون الحسن الأول (EUN) ضمن شبكة المكتب الوطني للمطارات. تختلف الرحلات حسب الموسم: تحقق من الشركات. وبالطريق تحقق من المسار والمسافات أولاً؛ فالرحلات طويلة.",
        areas: [{"name":"وسط المدينة","text":"محلات ومقاهٍ وخدمات؛ الأنسب لوقفة عبور."},{"name":"شاطئ فم الواد","text":"منطقة ساحلية على بعد بضعة كيلومترات؛ تحقق من الظروف حسب الموسم."}],
        faq: [{"q":"كيف أصل إلى العيون؟","a":"بالطائرة (مطار العيون الحسن الأول) أو بالطريق؛ المسافات طويلة فخطط لمحطات توقف."},{"q":"أين أقيم في العيون؟","a":"لا يوجد لدينا دليل مخصص بعد: فضّل وسط المدينة واقرأ التقييمات الحديثة."}],
      },
    },
  },
  {
    id: 'el-jadida',
    slug: {"en":"el-jadida","fr":"el-jadida","es":"el-yadida","de":"el-jadida","ar":"al-jadida"},
    lat: 33.2316,
    lon: -8.5007,
    accessKeys: ["motorway","ctm-supratours","car-rental"],
    stayKey: "",
    tripKeys: [],
    moreKeys: ["summer-checklist","short-term-rental"],
    bookingQuery: "El Jadida",
    text: {
      fr: {
        intro: "El Jadida est une ville côtière de la région Casablanca-Settat, à une centaine de kilomètres au sud-ouest de Casablanca. Sa cité portugaise, classée à l'UNESCO, et sa plage en font une destination de week-end et d'été.",
        why: ["La cité portugaise de Mazagan, site classé UNESCO","Une plage en ville, très fréquentée l'été","Accessible depuis Casablanca par la route"],
        when: "Juillet-août attire beaucoup de monde, notamment les familles du pays : réservez tôt. Printemps et automne sont plus calmes.",
        access: "Depuis Casablanca, la route est la solution la plus simple (autoroute ou route nationale, vérifiez l'itinéraire et les péages sur le site d'ADM) ; des autocars desservent aussi la ville. Les aéroports les plus proches sont ceux de Casablanca : voir notre guide des aéroports.",
        areas: [{"name":"Cité portugaise","text":"Remparts et citerne classés, à visiter à pied ; hébergement en maisons d'hôtes."},{"name":"Centre et plage","text":"Cafés, restaurants et promenade en bord de mer."}],
        faq: [{"q":"Comment aller à El Jadida depuis Casablanca ?","a":"Par la route ou en autocar ; vérifiez l'itinéraire, les péages et les horaires avant de partir."},{"q":"Faut-il passer la nuit à El Jadida ?","a":"Une journée suffit pour la cité portugaise ; dormir sur place est utile en été pour profiter de la plage."}],
      },
      en: {
        intro: "El Jadida is a coastal city in the Casablanca-Settat region, roughly a hundred kilometres south-west of Casablanca. Its Portuguese city, a UNESCO site, and its beach make it a weekend and summer destination.",
        why: ["The Portuguese city of Mazagan, a UNESCO site","A city beach, busy in summer","Reachable from Casablanca by road"],
        when: "July and August draw crowds, especially domestic families: book early. Spring and autumn are quieter.",
        access: "From Casablanca the road is the simplest option (motorway or national road; check the route and tolls on the ADM site); coaches also serve the city. The nearest airports are in Casablanca: see our airports guide.",
        areas: [{"name":"Portuguese city","text":"Ramparts and cistern, best visited on foot; guesthouses for lodging."},{"name":"Centre & beach","text":"Cafés, restaurants and a seafront promenade."}],
        faq: [{"q":"How do I get to El Jadida from Casablanca?","a":"By road or coach; check the route, tolls and schedules before leaving."},{"q":"Should I stay overnight in El Jadida?","a":"One day is enough for the Portuguese city; staying over helps in summer for the beach."}],
      },
      es: {
        intro: "El Yadida es una ciudad costera de la región Casablanca-Settat, a un centenar de kilómetros al suroeste de Casablanca. Su ciudad portuguesa, declarada por la UNESCO, y su playa la convierten en destino de fin de semana y de verano.",
        why: ["La ciudad portuguesa de Mazagán, sitio UNESCO","Una playa en la ciudad, muy concurrida en verano","Accesible desde Casablanca por carretera"],
        when: "Julio y agosto atraen a mucha gente, sobre todo familias del país: reserva con antelación. Primavera y otoño son más tranquilos.",
        access: "Desde Casablanca la carretera es lo más sencillo (autopista o carretera nacional; comprueba el itinerario y los peajes en la web de ADM); también hay autocares. Los aeropuertos más cercanos son los de Casablanca: consulta nuestra guía de aeropuertos.",
        areas: [{"name":"Ciudad portuguesa","text":"Murallas y aljibe, para recorrer a pie; alojamiento en casas de huéspedes."},{"name":"Centro y playa","text":"Cafés, restaurantes y paseo marítimo."}],
        faq: [{"q":"¿Cómo ir a El Yadida desde Casablanca?","a":"Por carretera o en autocar; comprueba itinerario, peajes y horarios antes de salir."},{"q":"¿Conviene pasar la noche en El Yadida?","a":"Un día basta para la ciudad portuguesa; dormir ayuda en verano para disfrutar de la playa."}],
      },
      de: {
        intro: "El Jadida ist eine Küstenstadt in der Region Casablanca-Settat, rund hundert Kilometer südwestlich von Casablanca. Die portugiesische Altstadt (UNESCO) und der Strand machen sie zum Wochenend- und Sommerziel.",
        why: ["Die portugiesische Stadt Mazagan, UNESCO-Stätte","Ein Stadtstrand, im Sommer gut besucht","Von Casablanca aus auf der Straße erreichbar"],
        when: "Juli und August ziehen viele Menschen an, vor allem einheimische Familien: früh buchen. Frühling und Herbst sind ruhiger.",
        access: "Ab Casablanca ist die Straße am einfachsten (Autobahn oder Nationalstraße; Route und Maut auf der ADM-Seite prüfen); auch Busse bedienen die Stadt. Die nächsten Flughäfen liegen in Casablanca: siehe unseren Flughafen-Ratgeber.",
        areas: [{"name":"Portugiesische Stadt","text":"Mauern und Zisterne, zu Fuß zu besichtigen; Unterkunft in Gästehäusern."},{"name":"Zentrum & Strand","text":"Cafés, Restaurants und Strandpromenade."}],
        faq: [{"q":"Wie kommt man von Casablanca nach El Jadida?","a":"Auf der Straße oder per Bus; Route, Maut und Fahrpläne vorher prüfen."},{"q":"Sollte man in El Jadida übernachten?","a":"Für die portugiesische Stadt genügt ein Tag; im Sommer lohnt eine Übernachtung für den Strand."}],
      },
      ar: {
        intro: "الجديدة مدينة ساحلية بجهة الدار البيضاء سطات، على بعد نحو مئة كيلومتر جنوب غرب الدار البيضاء. مدينتها البرتغالية المصنفة لدى اليونسكو وشاطئها يجعلانها وجهة للعطلة الأسبوعية والصيف.",
        why: ["المدينة البرتغالية مازاغان، موقع مصنف لدى اليونسكو","شاطئ داخل المدينة، مزدحم صيفاً","يسهل بلوغها من الدار البيضاء بالطريق"],
        when: "يوليوز وغشت يستقطبان كثيراً من الناس، خاصة العائلات المغربية: احجز مبكراً. الربيع والخريف أهدأ.",
        access: "من الدار البيضاء الطريق هو الأبسط (الطريق السيار أو الوطنية؛ تحقق من المسار والرسوم في موقع «أ د م»)، كما تصلها الحافلات. أقرب المطارات في الدار البيضاء: راجع دليل المطارات.",
        areas: [{"name":"المدينة البرتغالية","text":"أسوار وصهريج، تُزار مشياً؛ إقامة في دور الضيافة."},{"name":"الوسط والشاطئ","text":"مقاهٍ ومطاعم وممشى على البحر."}],
        faq: [{"q":"كيف أصل إلى الجديدة من الدار البيضاء؟","a":"بالطريق أو بالحافلة؛ تحقق من المسار والرسوم والمواعيد قبل المغادرة."},{"q":"هل أبيت في الجديدة؟","a":"يوم واحد يكفي للمدينة البرتغالية؛ والمبيت مفيد صيفاً للاستمتاع بالشاطئ."}],
      },
    },
  },
  {
    id: 'saidia',
    slug: {"en":"saidia","fr":"saidia","es":"saidia","de":"saidia","ar":"as-saidia"},
    lat: 35.0881,
    lon: -2.2333,
    accessKeys: ["airports","trains","car-rental"],
    stayKey: "where-to-stay-oujda",
    tripKeys: [],
    moreKeys: ["summer-checklist","short-term-rental","ferry-guide"],
    bookingQuery: "Saidia",
    text: {
      fr: {
        intro: "Saïdia est une station balnéaire de la province de Berkane, dans l'Oriental, près de la frontière algérienne. Elle est décrite comme une destination de vacances pour des milliers d'habitants de l'est marocain, avec l'une des plus longues plages du pays.",
        why: ["Une très longue plage sur la Méditerranée","Méditerrania Saïdia, station du plan Azur avec marina, hôtels et golf","Très prisée des familles et des MRE l'été"],
        when: "Juillet-août est la haute saison : réservez tôt. Hors saison, la station est beaucoup plus calme.",
        access: "L'aéroport le plus proche est celui d'Oujda-Angads ; Saïdia se trouve à environ 50 à 60 km d'Oujda selon les sources. La gare ONCF d'Oujda relie l'ouest du pays. Depuis Tanger, la Rocade méditerranéenne (RN16) longe la côte.",
        areas: [{"name":"Station Méditerrania","text":"Marina, hôtels, golf et résidences ; ambiance station balnéaire."},{"name":"Centre et plage","text":"Cafés, commerces et grande plage de sable."}],
        faq: [{"q":"Comment aller à Saïdia ?","a":"Depuis l'aéroport ou la gare d'Oujda par la route (environ 50 à 60 km) ; voir notre guide où loger à Oujda."},{"q":"Quel hébergement choisir en été ?","a":"Appartement meublé ou résidence pour une famille sur 1 à 3 semaines ; réservez tôt."}],
      },
      en: {
        intro: "Saidia is a seaside resort in Berkane province, in the Oriental region near the Algerian border. It is described as a holiday destination for thousands of people from eastern Morocco, with one of the longest beaches in the country.",
        why: ["A very long Mediterranean beach","Mediterrania Saidia, a Plan Azur resort with marina, hotels and golf","Very popular with families and Moroccans abroad in summer"],
        when: "July and August are high season: book early. Out of season the resort is much quieter.",
        access: "The nearest airport is Oujda-Angads; Saidia is about 50 to 60 km from Oujda depending on the source. Oujda’s ONCF station links the west of the country. From Tangier the Mediterranean coastal road (RN16) runs along the coast.",
        areas: [{"name":"Mediterrania resort","text":"Marina, hotels, golf and residences; a resort feel."},{"name":"Centre & beach","text":"Cafés, shops and the long sandy beach."}],
        faq: [{"q":"How do I get to Saidia?","a":"By road from Oujda airport or station (about 50 to 60 km); see our where-to-stay guide for Oujda."},{"q":"What accommodation in summer?","a":"A furnished flat or residence for a family over 1 to 3 weeks; book early."}],
      },
      es: {
        intro: "Saidia es una estación balnearia de la provincia de Berkane, en la región Oriental, cerca de la frontera argelina. Se la describe como destino de vacaciones de miles de habitantes del este marroquí, con una de las playas más largas del país.",
        why: ["Una playa larguísima en el Mediterráneo","Mediterrania Saidia, estación del plan Azur con marina, hoteles y golf","Muy querida por familias y marroquíes del exterior en verano"],
        when: "Julio y agosto son temporada alta: reserva con antelación. Fuera de temporada la estación es mucho más tranquila.",
        access: "El aeropuerto más cercano es Uchda-Angads; Saidia está a unos 50 a 60 km de Uchda según la fuente. La estación de la ONCF de Uchda conecta con el oeste del país. Desde Tánger, la carretera costera mediterránea (RN16) recorre la costa.",
        areas: [{"name":"Estación Mediterrania","text":"Marina, hoteles, golf y residencias; ambiente de resort."},{"name":"Centro y playa","text":"Cafés, comercios y la larga playa de arena."}],
        faq: [{"q":"¿Cómo llegar a Saidia?","a":"Por carretera desde el aeropuerto o la estación de Uchda (unos 50 a 60 km); consulta nuestra guía de dónde alojarse en Uchda."},{"q":"¿Qué alojamiento elegir en verano?","a":"Piso amueblado o residencia para una familia durante 1 a 3 semanas; reserva con antelación."}],
      },
      de: {
        intro: "Saïdia ist ein Badeort in der Provinz Berkane in der Region Oriental nahe der algerischen Grenze. Er gilt als Urlaubsziel für Tausende Menschen aus dem Osten Marokkos und hat einen der längsten Strände des Landes.",
        why: ["Ein sehr langer Mittelmeerstrand","Mediterrania Saïdia, Plan-Azur-Resort mit Marina, Hotels und Golf","Im Sommer bei Familien und Auslandsmarokkanern sehr beliebt"],
        when: "Juli und August sind Hochsaison: früh buchen. Außerhalb der Saison ist der Ort viel ruhiger.",
        access: "Der nächste Flughafen ist Oujda-Angads; Saïdia liegt je nach Quelle etwa 50 bis 60 km von Oujda entfernt. Der ONCF-Bahnhof Oujda verbindet mit dem Westen des Landes. Ab Tanger führt die Mittelmeer-Küstenstraße (RN16) an der Küste entlang.",
        areas: [{"name":"Resort Mediterrania","text":"Marina, Hotels, Golf und Residenzen; Resort-Atmosphäre."},{"name":"Zentrum & Strand","text":"Cafés, Geschäfte und der lange Sandstrand."}],
        faq: [{"q":"Wie kommt man nach Saïdia?","a":"Auf der Straße ab Flughafen oder Bahnhof Oujda (etwa 50 bis 60 km); siehe unseren Ratgeber Wo wohnen in Oujda."},{"q":"Welche Unterkunft im Sommer?","a":"Möblierte Wohnung oder Residenz für Familien über 1 bis 3 Wochen; früh buchen."}],
      },
      ar: {
        intro: "السعيدية محطة شاطئية بإقليم بركان بجهة الشرق قرب الحدود الجزائرية. توصف بأنها وجهة عطلة لآلاف من ساكنة شرق المغرب، ولها من أطول شواطئ البلاد.",
        why: ["شاطئ طويل جداً على المتوسط","مديترانيا السعيدية، محطة المخطط الأزرق بمارينا وفنادق وملعب غولف","محبوبة جداً لدى العائلات والمغاربة المقيمين بالخارج صيفاً"],
        when: "يوليوز وغشت ذروة الموسم: احجز مبكراً. خارج الموسم تكون المحطة أهدأ بكثير.",
        access: "أقرب مطار هو وجدة أنجاد؛ والسعيدية تبعد نحو 50 إلى 60 كلم عن وجدة حسب المصدر. محطة القطار بوجدة تربط غرب البلاد. ومن طنجة يمتد الطريق الساحلي المتوسطي (RN16) على طول الساحل.",
        areas: [{"name":"محطة مديترانيا","text":"مارينا وفنادق وغولف وإقامات؛ أجواء منتجع."},{"name":"الوسط والشاطئ","text":"مقاهٍ ومحلات والشاطئ الرملي الطويل."}],
        faq: [{"q":"كيف أصل إلى السعيدية؟","a":"بالطريق من مطار أو محطة وجدة (نحو 50 إلى 60 كلم)؛ راجع دليلنا للإقامة في وجدة."},{"q":"أي إقامة أختار صيفاً؟","a":"شقة مفروشة أو إقامة للعائلة لمدة 1 إلى 3 أسابيع؛ احجز مبكراً."}],
      },
    },
  },
];

export const cityById = (id: string) => CITY_PAGES.find((c) => c.id === id);

import { CITIES, cityName } from './home';
/** Nom localisé d'une ville (Tanger, Tánger, طنجة…) */
export function cityLabel(id: string, lang: Locale): string {
  const c = CITIES.find((x) => x.id === id);
  return c ? cityName(c, lang) : id;
}

/** « Marrakech, Casablanca … et Tétouan » : liste localisée, toujours alignée sur CITY_PAGES. */
export const cityListText = (lang: Locale) =>
  new Intl.ListFormat(lang, { style: 'long', type: 'conjunction' }).format(CITY_PAGES.map((c) => cityLabel(c.id, lang)));
