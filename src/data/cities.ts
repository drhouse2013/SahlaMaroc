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
];

export const cityById = (id: string) => CITY_PAGES.find((c) => c.id === id);

import { CITIES, cityName } from './home';
/** Nom localisé d'une ville (Tanger, Tánger, طنجة…) */
export function cityLabel(id: string, lang: Locale): string {
  const c = CITIES.find((x) => x.id === id);
  return c ? cityName(c, lang) : id;
}
