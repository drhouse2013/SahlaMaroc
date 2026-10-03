/**
 * Contenus de la page d'accueil.
 * - Libellés courts : 5 langues.
 * - Textes longs (villes, profils, FAQ) : EN + FR ; ES/DE/AR retombent sur l'anglais
 *   jusqu'à leur traduction (ces langues sont en noindex d'ici là).
 */
import type { Locale } from '../i18n/config';

type Full<T> = Record<Locale, T>;
type Partial2<T> = { en: T; fr: T } & Partial<Record<Locale, T>>;

export const pick = <T,>(m: Partial<Record<Locale, T>> & { en: T }, lang: Locale): T => m[lang] ?? m.en;

export type Scene =
  | 'marrakech' | 'casablanca' | 'chefchaouen' | 'sahara' | 'essaouira' | 'fes'
  | 'rabat' | 'tangier' | 'taghazout' | 'atlas' | 'souk' | 'riad';

/* ---------------------------------------------------------------- libellés */
export const L: Record<string, Full<string>> = {
  heroEyebrow: { en: 'For MREs and visitors · written from Casablanca', fr: 'Pour les MRE et les visiteurs · écrit depuis Casablanca', es: 'Para la diáspora y los visitantes', de: 'Für die Diaspora und Besucher', ar: 'لمغاربة العالم والزوار · من الدار البيضاء' },
  toolsTitle: { en: 'Free calculators', fr: 'Calculateurs gratuits', es: 'Calculadoras gratuitas', de: 'Kostenlose Rechner', ar: 'حاسبات مجانية' },
  toolsSub: { en: 'Real numbers before you decide: buying, borrowing, sending money, travelling.', fr: 'Des vrais chiffres avant de décider : acheter, emprunter, envoyer de l’argent, voyager.', es: 'Cifras reales antes de decidir.', de: 'Echte Zahlen, bevor du entscheidest.', ar: 'أرقام حقيقية قبل أن تقرر.' },
  y2030Title: { en: 'Morocco 2030: the countdown has started', fr: 'Maroc 2030 : le compte à rebours a commencé', es: 'Marruecos 2030: empieza la cuenta atrás', de: 'Marokko 2030: Der Countdown läuft', ar: 'المغرب 2030: بدأ العد التنازلي' },
  y2030Text: { en: 'Morocco co-hosts the 2030 football World Cup with Spain and Portugal. Host cities, transport, where to stay, renting out your flat: our guides grow until kick-off.', fr: 'Le Maroc co-organise la Coupe du monde de football 2030 avec l’Espagne et le Portugal. Villes hôtes, transports, logement, louer son appartement : nos guides s’enrichissent jusqu’au coup d’envoi.', es: 'Marruecos coorganiza el Mundial de fútbol 2030 con España y Portugal.', de: 'Marokko ist 2030 mit Spanien und Portugal Gastgeber der Fußball-WM.', ar: 'ينظم المغرب كأس العالم لكرة القدم 2030 مع إسبانيا والبرتغال.' },
  hostCity: { en: '2030 host city', fr: 'Ville hôte 2030', es: 'Sede 2030', de: 'Spielort 2030', ar: 'مدينة مضيفة 2030' },
  statGuides: { en: 'guides', fr: 'guides', es: 'guías', de: 'Guides', ar: 'دليل' },
  statLangs: { en: 'languages', fr: 'langues', es: 'idiomas', de: 'Sprachen', ar: 'لغات' },
  statUpdated: { en: 'Updated', fr: 'Mis à jour', es: 'Actualizado', de: 'Aktualisiert', ar: 'آخر تحديث' },
  personasTitle: { en: 'What brings you to Morocco?', fr: 'Qu’est-ce qui vous amène au Maroc ?', es: '¿Qué te trae a Marruecos?', de: 'Was führt dich nach Marokko?', ar: 'ما الذي يأتي بك إلى المغرب؟' },
  citiesTitle: { en: 'Morocco, city by city', fr: 'Le Maroc, ville par ville', es: 'Marruecos, ciudad a ciudad', de: 'Marokko, Stadt für Stadt', ar: 'المغرب، مدينة بمدينة' },
  citiesSub: { en: 'Eight cities, eight very different lives. Here is the short version.', fr: 'Huit villes, huit vies très différentes. Voici la version courte.', es: 'Ocho ciudades, ocho vidas muy distintas.', de: 'Acht Städte, acht sehr unterschiedliche Leben.', ar: 'ثماني مدن، ثماني حيوات مختلفة.' },
  factsTitle: { en: 'Morocco in 8 numbers', fr: 'Le Maroc en 8 chiffres', es: 'Marruecos en 8 cifras', de: 'Marokko in 8 Zahlen', ar: 'المغرب في 8 أرقام' },
  toursTitle: { en: 'Trips worth taking', fr: 'Les excursions qui valent le coup', es: 'Excursiones que merecen la pena', de: 'Ausflüge, die sich lohnen', ar: 'رحلات تستحق' },
  toursSub: { en: 'Book with free cancellation on most tours. Read our guide first to avoid the classic traps.', fr: 'Annulation gratuite sur la plupart des excursions. Lisez notre guide avant pour éviter les pièges classiques.', es: 'Cancelación gratuita en la mayoría de excursiones.', de: 'Bei den meisten Touren kostenlos stornierbar.', ar: 'إلغاء مجاني في أغلب الرحلات.' },
  seeTours: { en: 'See prices', fr: 'Voir les prix', es: 'Ver precios', de: 'Preise ansehen', ar: 'شاهد الأسعار' },
  readGuide: { en: 'Read the guide', fr: 'Lire le guide', es: 'Leer la guía', de: 'Guide lesen', ar: 'اقرأ الدليل' },
  darijaTitle: { en: 'Darija you will use every day', fr: 'La darija que vous utiliserez tous les jours', es: 'Darija para el día a día', de: 'Darija für jeden Tag', ar: 'الدارجة التي ستستعملها يومياً' },
  faqTitle: { en: 'Quick answers', fr: 'Réponses rapides', es: 'Respuestas rápidas', de: 'Kurze Antworten', ar: 'إجابات سريعة' },
  allGuides: { en: 'All guides', fr: 'Tous les guides', es: 'Todas las guías', de: 'Alle Guides', ar: 'كل الأدلة' },
  menu: { en: 'Menu', fr: 'Menu', es: 'Menú', de: 'Menü', ar: 'القائمة' },
  guides: { en: 'Guides', fr: 'Guides', es: 'Guías', de: 'Guides', ar: 'الأدلة' },
  cities: { en: 'Cities', fr: 'Villes', es: 'Ciudades', de: 'Städte', ar: 'المدن' },
  onThisPage: { en: 'On this page', fr: 'Sur cette page', es: 'En esta página', de: 'Auf dieser Seite', ar: 'في هذه الصفحة' },
  essentials: { en: 'Before you go', fr: 'Avant de partir', es: 'Antes de ir', de: 'Vor der Reise', ar: 'قبل السفر' },
  aboutAuthor: { en: 'Lives near Casablanca. Writes the guides he wishes his foreign friends had on day one.', fr: 'Vit près de Casablanca. Écrit les guides qu’il aurait aimé donner à ses amis étrangers dès le premier jour.', es: 'Vive cerca de Casablanca.', de: 'Lebt bei Casablanca.', ar: 'يعيش قرب الدار البيضاء.' },
};

/* ---------------------------------------------------------------- profils */
export const PERSONAS: Partial2<{ icon: string; title: string; text: string; keys: string[] }[]> = {
  en: [
    { icon: '⛴️', title: 'I’m going home this summer', text: 'Marhaba, ferries, your car and the family budget, without stress.', keys: ['marhaba-guide', 'ferry-guide', 'car-180-days'] },
    { icon: '🏠', title: 'I want to invest in Morocco', text: 'Buy safely from abroad, get housing aid and send money for less.', keys: ['buy-property-abroad', 'daam-sakane', 'send-money'] },
    { icon: '🧳', title: 'I’m visiting Morocco', text: 'Arrival, money, the trips worth taking and where to stay.', keys: ['marrakech-airport', 'merzouga-tour', 'where-to-stay-marrakech'] },
  ],
  fr: [
    { icon: '⛴️', title: 'Je rentre au bled cet été', text: 'Marhaba, ferries, voiture et budget familial, sans stress.', keys: ['marhaba-guide', 'ferry-guide', 'car-180-days'] },
    { icon: '🏠', title: 'Je veux investir au Maroc', text: 'Acheter sans risque à distance, l’aide au logement, envoyer de l’argent moins cher.', keys: ['buy-property-abroad', 'daam-sakane', 'send-money'] },
    { icon: '🧳', title: 'Je visite le Maroc', text: 'Arrivée, argent, excursions qui valent le coup et où loger.', keys: ['marrakech-airport', 'merzouga-tour', 'where-to-stay-marrakech'] },
  ],
};

/* ---------------------------------------------------------------- villes */
export interface City { id: Scene; name: string; vibe: Partial2<string>; tags: Partial2<string[]>; budget: 1 | 2 | 3; host2030?: boolean }
export const CITIES: City[] = [
  { id: 'marrakech', host2030: true, name: 'Marrakech', budget: 2, vibe: { en: 'Riads, souks and the Atlas on the horizon. Intense, social, unforgettable.', fr: 'Riads, souks et l’Atlas à l’horizon. Intense, sociable, inoubliable.' }, tags: { en: ['Nightlife', 'Day trips', 'Coworkings'], fr: ['Vie nocturne', 'Excursions', 'Coworkings'] } },
  { id: 'casablanca', host2030: true, name: 'Casablanca', budget: 3, vibe: { en: 'The business capital: fibre, malls, ocean corniche and real city life.', fr: 'La capitale économique : fibre, centres commerciaux, corniche et vraie vie urbaine.' }, tags: { en: ['Business', 'Fast internet', 'Ocean'], fr: ['Business', 'Internet rapide', 'Océan'] } },
  { id: 'taghazout', name: 'Taghazout', budget: 2, vibe: { en: 'Surf village north of Agadir. Coliving, sunsets and 300 days of sun.', fr: 'Village de surf au nord d’Agadir. Coliving, couchers de soleil et 300 jours de soleil.' }, tags: { en: ['Surf', 'Coliving', 'Community'], fr: ['Surf', 'Coliving', 'Communauté'] } },
  { id: 'rabat', host2030: true, name: 'Rabat', budget: 2, vibe: { en: 'Calm, green and walkable capital with a tram and a beach in town.', fr: 'Capitale calme, verte et à taille humaine, avec tram et plage en ville.' }, tags: { en: ['Calm', 'Tram', 'Families'], fr: ['Calme', 'Tram', 'Familles'] } },
  { id: 'essaouira', name: 'Essaouira', budget: 1, vibe: { en: 'Windy, artsy port town. Slow days, fresh fish and kitesurf.', fr: 'Port venté et artistique. Journées lentes, poisson frais et kitesurf.' }, tags: { en: ['Slow life', 'Kitesurf', 'Seafood'], fr: ['Vie lente', 'Kitesurf', 'Poisson'] } },
  { id: 'tangier', host2030: true, name: 'Tangier', budget: 2, vibe: { en: 'Gateway to Europe, 2 h 10 to Casablanca on the high-speed train.', fr: 'Porte de l’Europe, à 2 h 10 de Casablanca en TGV Al Boraq.' }, tags: { en: ['Ferry to Spain', 'High-speed train', 'Beaches'], fr: ['Ferry Espagne', 'TGV', 'Plages'] } },
  { id: 'fes', host2030: true, name: 'Fès', budget: 1, vibe: { en: 'The world’s largest car-free medina. History, crafts and low prices.', fr: 'La plus grande médina piétonne du monde. Histoire, artisanat et petits prix.' }, tags: { en: ['History', 'Crafts', 'Budget'], fr: ['Histoire', 'Artisanat', 'Petit budget'] } },
  { id: 'chefchaouen', name: 'Chefchaouen', budget: 1, vibe: { en: 'The blue town of the Rif mountains. Hiking, quiet and photo spots.', fr: 'La ville bleue du Rif. Randonnée, calme et spots photo.' }, tags: { en: ['Hiking', 'Quiet', 'Photos'], fr: ['Randonnée', 'Calme', 'Photos'] } },
];

/* ---------------------------------------------------------------- chiffres clés */
export const FACTS: Partial2<{ value: string; label: string }[]> = {
  en: [
    { value: '1 € ≈ 11 MAD', label: 'Moroccan dirham (Oct 2026)' },
    { value: '89.2 bn MAD', label: 'Sent home by MREs, Jan–Aug 2026 (+9 %)' },
    { value: '4.1 M+', label: 'MREs welcomed by Operation Marhaba 2026' },
    { value: '180 days', label: 'Per year for a foreign-plated car' },
    { value: '100,000 MAD', label: 'Max Daam Sakane housing aid' },
    { value: '90 days', label: 'Visa-free stay for EU, UK, US, Canada…' },
    { value: 'GMT', label: 'Morocco’s time zone all year since 20 Sept 2026' },
    { value: '2030', label: 'World Cup co-hosted with Spain & Portugal' },
  ],
  fr: [
    { value: '1 € ≈ 11 MAD', label: 'Dirham marocain (oct. 2026)' },
    { value: '89,2 Mds DH', label: 'Transférés par les MRE, janv.–août 2026 (+9 %)' },
    { value: '4,1 M+', label: 'MRE accueillis par Marhaba 2026' },
    { value: '180 jours', label: 'Par an pour une voiture immatriculée à l’étranger' },
    { value: '100 000 DH', label: 'Aide Daam Sakane maximale' },
    { value: '90 jours', label: 'Sans visa pour UE, Royaume-Uni, USA, Canada…' },
    { value: 'GMT', label: 'Fuseau horaire du Maroc toute l’année depuis le 20 sept. 2026' },
    { value: '2030', label: 'Coupe du monde co-organisée avec l’Espagne et le Portugal' },
  ],
};

/* ---------------------------------------------------------------- excursions */
export const TOURS: { scene: Scene; query: string; guideKey?: string; title: Partial2<string>; meta: Partial2<string> }[] = [
  { scene: 'sahara', query: 'Merzouga desert tour from Marrakech', guideKey: 'merzouga-tour', title: { en: 'Sahara: 3 days to Merzouga', fr: 'Sahara : 3 jours à Merzouga' }, meta: { en: 'From Marrakech · 3 days', fr: 'Depuis Marrakech · 3 jours' } },
  { scene: 'atlas', query: 'Imlil Atlas mountains day trip', title: { en: 'Atlas mountains & Imlil', fr: 'Atlas et Imlil' }, meta: { en: 'From Marrakech · 1 day', fr: 'Depuis Marrakech · 1 jour' } },
  { scene: 'essaouira', query: 'Essaouira day trip from Marrakech', guideKey: 'essaouira-day-trip', title: { en: 'Essaouira by the ocean', fr: 'Essaouira, l’océan' }, meta: { en: 'From Marrakech · 1 day', fr: 'Depuis Marrakech · 1 jour' } },
  { scene: 'chefchaouen', query: 'Chefchaouen day trip from Fes', title: { en: 'Chefchaouen, the blue town', fr: 'Chefchaouen, la ville bleue' }, meta: { en: 'From Fès or Tangier · 1 day', fr: 'Depuis Fès ou Tanger · 1 jour' } },
];

/* ---------------------------------------------------------------- darija */
export const DARIJA: { ar: string; latin: string; meaning: Partial2<string> }[] = [
  { ar: 'السلام عليكم', latin: 'Salam alikoum', meaning: { en: 'Hello (to anyone)', fr: 'Bonjour (à tout le monde)' } },
  { ar: 'شكرا', latin: 'Choukran', meaning: { en: 'Thank you', fr: 'Merci' } },
  { ar: 'بشحال؟', latin: 'Bchhal ?', meaning: { en: 'How much is it?', fr: 'C’est combien ?' } },
  { ar: 'غالي بزاف', latin: 'Ghali bzaf', meaning: { en: 'That’s too expensive', fr: 'C’est trop cher' } },
  { ar: 'لا، شكرا', latin: 'La, choukran', meaning: { en: 'No, thanks (your best friend in the souk)', fr: 'Non merci (votre meilleur ami au souk)' } },
  { ar: 'واخا', latin: 'Wakha', meaning: { en: 'OK / alright', fr: 'D’accord' } },
];

/* ---------------------------------------------------------------- FAQ */
export const FAQ: Partial2<{ q: string; a: string }[]> = {
  en: [
    { q: 'How long can my European-plated car stay in Morocco?', a: '180 days in total per calendar year, in one or several stays, with no extension except year-end provisions. Track your days with our free 180-day counter.' },
    { q: 'How much does it cost to buy a flat in Morocco?', a: 'On top of the price, budget roughly 6–8 % for registration duty, land registry and notary fees. Our calculator gives you the detail in seconds.' },
    { q: 'Can MREs get the Daam Sakane housing aid?', a: 'Yes. Moroccans living abroad are eligible: 100,000 MAD for a new home up to 300,000 MAD, 70,000 MAD up to 700,000 MAD, under conditions (first home, 5-year occupancy).' },
    { q: 'What is the cheapest way to send money to Morocco?', a: 'Compare the amount your family actually receives in dirhams, not the displayed fee: the exchange-rate margin is often the biggest cost.' },
  ],
  fr: [
    { q: 'Combien de temps ma voiture immatriculée en Europe peut-elle rester au Maroc ?', a: '180 jours au total par année civile, en une ou plusieurs fois, sans prolongation sauf dispositions de fin d’année. Suivez vos jours avec notre compteur gratuit.' },
    { q: 'Combien coûte l’achat d’un appartement au Maroc ?', a: 'En plus du prix, prévoyez environ 6 à 8 % pour les droits d’enregistrement, la conservation foncière et le notaire. Notre calculateur vous donne le détail en quelques secondes.' },
    { q: 'Les MRE ont-ils droit à l’aide Daam Sakane ?', a: 'Oui. Les Marocains du monde sont éligibles : 100 000 DH pour un logement neuf jusqu’à 300 000 DH, 70 000 DH jusqu’à 700 000 DH, sous conditions (première acquisition, occupation 5 ans).' },
    { q: 'Quel est le moyen le moins cher d’envoyer de l’argent au Maroc ?', a: 'Comparez le montant réellement reçu en dirhams, pas les frais affichés : la marge sur le taux de change est souvent le coût le plus élevé.' },
  ],
};

/* ---------------------------------------------------------------- traductions ES / DE / AR
 * Textes courts de la page d'accueil (les guides eux-mêmes arrivent via `npm run translate`).
 */
Object.assign(FACTS, {
  es: [
    { value: '1 € ≈ 11 MAD', label: 'Dírham marroquí (oct. 2026)' },
    { value: '89.200 M MAD', label: 'Enviados por la diáspora, ene.–ago. 2026 (+9 %)' },
    { value: '4,1 M+', label: 'Recibidos por la Operación Marhaba 2026' },
    { value: '180 días', label: 'Al año para un coche con matrícula extranjera' },
    { value: '100.000 MAD', label: 'Ayuda Daam Sakane máxima' },
    { value: '90 días', label: 'Sin visado para UE, Reino Unido, EE. UU.…' },
    { value: 'GMT', label: 'Hora de Marruecos todo el año desde el 20 sept. 2026' },
    { value: '2030', label: 'Mundial coorganizado con España y Portugal' },
  ],
  de: [
    { value: '1 € ≈ 11 MAD', label: 'Marokkanischer Dirham (Okt. 2026)' },
    { value: '89,2 Mrd. MAD', label: 'Von der Diaspora überwiesen, Jan.–Aug. 2026 (+9 %)' },
    { value: '4,1 Mio.+', label: 'Empfangen von Operation Marhaba 2026' },
    { value: '180 Tage', label: 'Pro Jahr für ein Auto mit ausländischem Kennzeichen' },
    { value: '100.000 MAD', label: 'Maximale Daam-Sakane-Hilfe' },
    { value: '90 Tage', label: 'Visumfrei für EU, UK, USA…' },
    { value: 'GMT', label: 'Marokkos Zeitzone ganzjährig seit 20. Sept. 2026' },
    { value: '2030', label: 'WM mit Spanien und Portugal' },
  ],
  ar: [
    { value: '1 € ≈ 11 MAD', label: 'الدرهم المغربي (أكتوبر 2026)' },
    { value: '89,2', label: 'مليار درهم حوّلها مغاربة العالم من يناير إلى غشت 2026 (+9 %)' },
    { value: '4,1M+', label: 'مغاربة العالم الذين استقبلتهم عملية مرحبا 2026' },
    { value: '180', label: 'يوماً في السنة للسيارة ذات الترقيم الأجنبي' },
    { value: '100 000 MAD', label: 'أقصى دعم مباشر للسكن' },
    { value: '90', label: 'يوماً بدون تأشيرة لمواطني الاتحاد الأوروبي وغيرهم' },
    { value: 'GMT', label: 'توقيت المغرب طوال السنة منذ 20 سبتمبر 2026' },
    { value: '2030', label: 'كأس العالم مع إسبانيا والبرتغال' },
  ],
});

const CITY_I18N: Record<string, Record<'es' | 'de' | 'ar', [string, string[]]>> = {
  marrakech: { es: ['Riads, zocos y el Atlas en el horizonte. Intensa y sociable.', ['Vida nocturna', 'Excursiones', 'Coworkings']], de: ['Riads, Souks und der Atlas am Horizont. Intensiv und gesellig.', ['Nachtleben', 'Ausflüge', 'Coworkings']], ar: ['رياضات وأسواق والأطلس في الأفق. مدينة نابضة واجتماعية.', ['سهر', 'رحلات', 'فضاءات عمل']] },
  casablanca: { es: ['La capital económica: fibra, centros comerciales y la corniche.', ['Negocios', 'Internet rápido', 'Océano']], de: ['Wirtschaftshauptstadt: Glasfaser, Malls und Corniche.', ['Business', 'Schnelles Internet', 'Ozean']], ar: ['العاصمة الاقتصادية: ألياف بصرية، مراكز تجارية وكورنيش.', ['أعمال', 'إنترنت سريع', 'محيط']] },
  taghazout: { es: ['Pueblo surfero al norte de Agadir. Coliving y atardeceres.', ['Surf', 'Coliving', 'Comunidad']], de: ['Surfdorf nördlich von Agadir. Coliving und Sonnenuntergänge.', ['Surfen', 'Coliving', 'Community']], ar: ['قرية ركوب الأمواج شمال أكادير. سكن مشترك وغروب ساحر.', ['ركوب الأمواج', 'سكن مشترك', 'مجتمع']] },
  rabat: { es: ['Capital tranquila y verde, con tranvía y playa.', ['Tranquila', 'Tranvía', 'Familias']], de: ['Ruhige, grüne Hauptstadt mit Tram und Strand.', ['Ruhig', 'Tram', 'Familien']], ar: ['عاصمة هادئة وخضراء مع الترامواي والشاطئ.', ['هدوء', 'ترامواي', 'عائلات']] },
  essaouira: { es: ['Puerto ventoso y artístico. Vida lenta y kitesurf.', ['Vida lenta', 'Kitesurf', 'Pescado']], de: ['Windige Künstlerstadt am Meer. Slow Life und Kitesurfen.', ['Slow Life', 'Kitesurf', 'Fisch']], ar: ['ميناء فني تهب عليه الرياح. حياة هادئة وكايتسيرف.', ['حياة هادئة', 'كايتسيرف', 'سمك']] },
  tangier: { es: ['Puerta de Europa, a 2 h 10 de Casablanca en tren rápido.', ['Ferry a España', 'Tren rápido', 'Playas']], de: ['Tor nach Europa, 2 h 10 nach Casablanca per Schnellzug.', ['Fähre Spanien', 'Schnellzug', 'Strände']], ar: ['بوابة أوروبا، على بعد ساعتين وعشر دقائق من الدار البيضاء بالبراق.', ['عبّارة إسبانيا', 'قطار فائق السرعة', 'شواطئ']] },
  fes: { es: ['La mayor medina peatonal del mundo. Historia y precios bajos.', ['Historia', 'Artesanía', 'Barata']], de: ['Größte autofreie Medina der Welt. Geschichte, niedrige Preise.', ['Geschichte', 'Handwerk', 'Günstig']], ar: ['أكبر مدينة عتيقة بدون سيارات في العالم. تاريخ وأسعار منخفضة.', ['تاريخ', 'صناعة تقليدية', 'اقتصادية']] },
  chefchaouen: { es: ['El pueblo azul del Rif. Senderismo y calma.', ['Senderismo', 'Calma', 'Fotos']], de: ['Die blaue Stadt im Rif. Wandern und Ruhe.', ['Wandern', 'Ruhe', 'Fotos']], ar: ['المدينة الزرقاء في جبال الريف. مشي وهدوء.', ['مشي', 'هدوء', 'صور']] },
};
/** Noms de villes localisés (sinon le nom par défaut) */
export const CITY_NAMES: Record<string, Partial<Record<Locale, string>>> = {
  marrakech: { de: 'Marrakesch', ar: 'مراكش' },
  casablanca: { ar: 'الدار البيضاء' },
  taghazout: { ar: 'تغازوت' },
  rabat: { ar: 'الرباط' },
  essaouira: { es: 'Esauira', ar: 'الصويرة' },
  tangier: { fr: 'Tanger', es: 'Tánger', de: 'Tanger', ar: 'طنجة' },
  fes: { es: 'Fez', ar: 'فاس' },
  chefchaouen: { ar: 'شفشاون' },
};
export const cityName = (c: City, lang: Locale) => CITY_NAMES[c.id]?.[lang] ?? c.name;

for (const c of CITIES) {
  for (const l of ['es', 'de', 'ar'] as const) {
    const [vibe, tags] = CITY_I18N[c.id][l];
    c.vibe[l] = vibe;
    c.tags[l] = tags;
  }
}

const TOUR_I18N: [Record<'es' | 'de' | 'ar', string>, Record<'es' | 'de' | 'ar', string>][] = [
  [{ es: 'Sáhara: 3 días a Merzouga', de: 'Sahara: 3 Tage nach Merzouga', ar: 'الصحراء: 3 أيام إلى مرزوكة' }, { es: 'Desde Marrakech · 3 días', de: 'Ab Marrakesch · 3 Tage', ar: 'من مراكش · 3 أيام' }],
  [{ es: 'Atlas e Imlil', de: 'Atlas & Imlil', ar: 'الأطلس وإمليل' }, { es: 'Desde Marrakech · 1 día', de: 'Ab Marrakesch · 1 Tag', ar: 'من مراكش · يوم واحد' }],
  [{ es: 'Esauira junto al océano', de: 'Essaouira am Ozean', ar: 'الصويرة على المحيط' }, { es: 'Desde Marrakech · 1 día', de: 'Ab Marrakesch · 1 Tag', ar: 'من مراكش · يوم واحد' }],
  [{ es: 'Chefchaouen, el pueblo azul', de: 'Chefchaouen, die blaue Stadt', ar: 'شفشاون، المدينة الزرقاء' }, { es: 'Desde Fez o Tánger · 1 día', de: 'Ab Fès oder Tanger · 1 Tag', ar: 'من فاس أو طنجة · يوم واحد' }],
];
TOURS.forEach((tour, i) => {
  Object.assign(tour.title, TOUR_I18N[i][0]);
  Object.assign(tour.meta, TOUR_I18N[i][1]);
});

const DARIJA_I18N: Record<'es' | 'de' | 'ar', string>[] = [
  { es: 'Hola (a todo el mundo)', de: 'Hallo (zu allen)', ar: 'تحية للجميع' },
  { es: 'Gracias', de: 'Danke', ar: 'شكراً' },
  { es: '¿Cuánto cuesta?', de: 'Wie viel kostet das?', ar: 'كم الثمن؟' },
  { es: 'Es demasiado caro', de: 'Das ist zu teuer', ar: 'هذا غالٍ جداً' },
  { es: 'No, gracias (tu mejor amigo en el zoco)', de: 'Nein, danke (dein bester Freund im Souk)', ar: 'لا، شكراً (أفضل صديق لك في السوق)' },
  { es: 'Vale / de acuerdo', de: 'Okay / einverstanden', ar: 'موافق' },
];
DARIJA.forEach((d, i) => Object.assign(d.meaning, DARIJA_I18N[i]));


/* ---------------------------------------------------------------- profils & FAQ : ES / DE / AR */
Object.assign(PERSONAS, {
  es: [
    { icon: '⛴️', title: 'Vuelvo a casa este verano', text: 'Marhaba, ferris, tu coche y el presupuesto familiar, sin estrés.', keys: ['marhaba-guide', 'ferry-guide', 'car-180-days'] },
    { icon: '🏠', title: 'Quiero invertir en Marruecos', text: 'Compra segura a distancia, ayuda a la vivienda y envíos de dinero más baratos.', keys: ['buy-property-abroad', 'daam-sakane', 'send-money'] },
    { icon: '🧳', title: 'Visito Marruecos', text: 'Llegada, dinero, excursiones que merecen la pena y dónde alojarse.', keys: ['marrakech-airport', 'merzouga-tour', 'where-to-stay-marrakech'] },
  ],
  de: [
    { icon: '⛴️', title: 'Ich fahre diesen Sommer nach Hause', text: 'Marhaba, Fähren, dein Auto und das Familienbudget, ohne Stress.', keys: ['marhaba-guide', 'ferry-guide', 'car-180-days'] },
    { icon: '🏠', title: 'Ich möchte in Marokko investieren', text: 'Sicher aus der Ferne kaufen, Wohnbauhilfe nutzen und günstiger Geld senden.', keys: ['buy-property-abroad', 'daam-sakane', 'send-money'] },
    { icon: '🧳', title: 'Ich besuche Marokko', text: 'Ankunft, Geld, lohnende Ausflüge und wo man übernachtet.', keys: ['marrakech-airport', 'merzouga-tour', 'where-to-stay-marrakech'] },
  ],
  ar: [
    { icon: '⛴️', title: 'أعود إلى البلاد هذا الصيف', text: 'مرحبا، العبّارات، سيارتك وميزانية العائلة، بدون توتر.', keys: ['marhaba-guide', 'ferry-guide', 'car-180-days'] },
    { icon: '🏠', title: 'أريد الاستثمار في المغرب', text: 'اشترِ بأمان عن بُعد، استفد من دعم السكن وحوّل الأموال بتكلفة أقل.', keys: ['buy-property-abroad', 'daam-sakane', 'send-money'] },
    { icon: '🧳', title: 'أزور المغرب', text: 'الوصول، المال، الرحلات التي تستحق، وأين تقيم.', keys: ['marrakech-airport', 'merzouga-tour', 'where-to-stay-marrakech'] },
  ],
});

FAQ.en.push({ q: 'What time is it in Morocco?', a: 'Morocco has been on GMT all year since 20 September 2026: 1 hour behind France and Spain in winter, 2 hours behind in summer.' });
FAQ.fr.push({ q: 'Quelle heure est-il au Maroc ?', a: 'Le Maroc est à l’heure GMT toute l’année depuis le 20 septembre 2026 : 1 h de moins qu’en France et en Espagne en hiver, 2 h en été.' });
Object.assign(FAQ, {
  es: [
    { q: '¿Cuánto tiempo puede estar mi coche con matrícula europea en Marruecos?', a: '180 días en total por año natural, en una o varias estancias, sin prórroga salvo disposiciones de fin de año. Controla tus días con nuestro contador gratuito.' },
    { q: '¿Cuánto cuesta comprar un piso en Marruecos?', a: 'Además del precio, calcula entre un 6 y un 8 % para el impuesto de registro, el registro de la propiedad y el notario. Nuestra calculadora te da el detalle en segundos.' },
    { q: '¿Pueden los MRE obtener la ayuda Daam Sakane?', a: 'Sí. Los marroquíes residentes en el extranjero son elegibles: 100.000 MAD para una vivienda nueva de hasta 300.000 MAD y 70.000 MAD hasta 700.000 MAD, con condiciones (primera vivienda, ocupación durante 5 años).' },
    { q: '¿Cuál es la forma más barata de enviar dinero a Marruecos?', a: 'Compara el importe que tu familia recibe realmente en dirhams, no la comisión mostrada: el margen del tipo de cambio suele ser el mayor coste.' },
    { q: '¿Qué hora es en Marruecos?', a: 'Marruecos usa la hora GMT todo el año desde el 20 de septiembre de 2026: una hora menos que España en invierno y dos en verano.' },
  ],
  de: [
    { q: 'Wie lange darf mein Auto mit europäischem Kennzeichen in Marokko bleiben?', a: '180 Tage insgesamt pro Kalenderjahr, in einem oder mehreren Aufenthalten, ohne Verlängerung außer Jahresendregelungen. Verfolge deine Tage mit unserem kostenlosen Zähler.' },
    { q: 'Was kostet der Kauf einer Wohnung in Marokko?', a: 'Zum Kaufpreis kommen etwa 6–8 % für Registrierungsgebühr, Grundbuchamt und Notar. Unser Rechner zeigt dir die Details in Sekunden.' },
    { q: 'Können Auslandsmarokkaner (MRE) die Wohnbauhilfe Daam Sakane erhalten?', a: 'Ja. Im Ausland lebende Marokkaner sind berechtigt: 100.000 MAD für eine Neubauwohnung bis 300.000 MAD, 70.000 MAD bis 700.000 MAD, unter Bedingungen (Ersterwerb, 5 Jahre Selbstnutzung).' },
    { q: 'Wie überweise ich am günstigsten Geld nach Marokko?', a: 'Vergleiche den Betrag, der bei deiner Familie in Dirham wirklich ankommt, nicht die angezeigte Gebühr: Die Marge im Wechselkurs ist oft der größte Kostenpunkt.' },
    { q: 'Welche Uhrzeit gilt in Marokko?', a: 'Seit dem 20. September 2026 gilt in Marokko ganzjährig GMT: im Winter eine Stunde, im Sommer zwei Stunden hinter Deutschland.' },
  ],
  ar: [
    { q: 'كم من الوقت يمكن لسيارتي ذات الترقيم الأوروبي أن تبقى في المغرب؟', a: '180 يوماً في المجموع خلال السنة الميلادية، في إقامة واحدة أو عدة إقامات، دون تمديد باستثناء أحكام نهاية السنة. تتبّع أيامك بعدّادنا المجاني.' },
    { q: 'كم تكلفة شراء شقة في المغرب؟', a: 'بالإضافة إلى الثمن، احسب حوالي 6 إلى 8 % لرسوم التسجيل والمحافظة العقارية والموثق. تعطيك حاسبتنا التفاصيل في ثوانٍ.' },
    { q: 'هل يستفيد مغاربة العالم من دعم «دعم سكن»؟', a: 'نعم. مغاربة العالم مؤهلون: 100 000 درهم لسكن جديد حتى 300 000 درهم، و70 000 درهم حتى 700 000 درهم، وفق شروط (أول سكن، الإقامة لمدة 5 سنوات).' },
    { q: 'ما أرخص طريقة لإرسال المال إلى المغرب؟', a: 'قارن المبلغ الذي تتلقاه عائلتك فعلياً بالدرهم، وليس الرسوم المعروضة: هامش سعر الصرف غالباً هو أكبر تكلفة.' },
    { q: 'ما هو التوقيت المعتمد في المغرب؟', a: 'يعتمد المغرب توقيت غرينيتش (GMT) طوال السنة منذ 20 شتنبر 2026: ساعة أقل من إسبانيا وفرنسا شتاءً وساعتان صيفاً.' },
  ],
});
