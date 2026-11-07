import type { Locale } from '../i18n';

/** A flexible city itinerary; confirm current access and opening times locally. */
export const MEKNES_STAY: Record<Locale, { title: string; intro: string; titles: [string, string]; texts: [string, string]; source: string; preparation: string }> = {
  fr: {
    title: 'Deux jours dans la ville impériale',
    intro: 'Un parcours souple entre la place Lahdim, la médina et les monuments de Meknès. Adaptez les visites aux horaires et aux conditions d’accès du moment.',
    titles: ['Bab Mansour et la place Lahdim', 'Médina et monuments'],
    texts: [
      'Commencez sur la place Lahdim pour découvrir Bab Mansour depuis la place, puis prenez le temps de parcourir la médina à votre rythme. Gardez une marge pour les pauses et les détours.',
      'Choisissez les monuments que vous souhaitez visiter, par exemple la médersa Bou Inania ou le mausolée de Moulay Ismaïl. Vérifiez leurs horaires et conditions d’accès avant de partir ; renseignez-vous aussi sur l’ouverture éventuelle de Heri es-Souani.',
    ],
    source: 'Découvrir Meknès avec l’Office national marocain du tourisme',
    preparation: 'Vérifier les horaires et l’accès des monuments, ainsi que l’ouverture de Heri es-Souani, avant de partir.',
  },
  en: {
    title: 'Two days in the imperial city',
    intro: 'A flexible route through Lahdim Square, the medina and Meknes landmarks. Adapt visits to current opening times and access conditions.',
    titles: ['Bab Mansour and Lahdim Square', 'Medina and monuments'],
    texts: [
      'Start at Lahdim Square to see Bab Mansour from the square, then take time to explore the medina at your own pace. Leave room for breaks and detours.',
      'Choose the monuments you would like to visit, such as Bou Inania Madrasa or the Mausoleum of Moulay Ismail. Check opening times and access conditions before setting out; also ask whether Heri es-Souani is open.',
    ],
    source: 'Explore Meknes with the Moroccan National Tourist Office',
    preparation: 'Check monument opening times and access, and whether Heri es-Souani is open, before setting out.',
  },
  es: {
    title: 'Dos días en la ciudad imperial',
    intro: 'Un recorrido flexible por la plaza Lahdim, la medina y los monumentos de Mequinez. Adapta las visitas a los horarios y condiciones de acceso actuales.',
    titles: ['Bab Mansour y la plaza Lahdim', 'Medina y monumentos'],
    texts: [
      'Empieza en la plaza Lahdim para contemplar Bab Mansour desde allí y después recorre la medina a tu ritmo. Reserva tiempo para descansar y desviarte del camino.',
      'Elige los monumentos que quieras visitar, como la madrasa Bou Inania o el mausoleo de Mulay Ismail. Comprueba los horarios y el acceso antes de salir; pregunta también si Heri es-Souani está abierto.',
    ],
    source: 'Descubrir Mequinez con la Oficina Nacional de Turismo de Marruecos',
    preparation: 'Comprueba los horarios y el acceso a los monumentos, y si Heri es-Souani está abierto, antes de salir.',
  },
  de: {
    title: 'Zwei Tage in der Kaiserstadt',
    intro: 'Ein flexibler Rundgang über den Lahdim-Platz, durch die Medina und zu den Bauwerken von Meknès. Richten Sie die Besuche nach den aktuellen Öffnungszeiten und Zugangsbedingungen aus.',
    titles: ['Bab Mansour und Lahdim-Platz', 'Medina und Bauwerke'],
    texts: [
      'Beginnen Sie am Lahdim-Platz und betrachten Sie Bab Mansour von dort aus. Erkunden Sie anschließend die Medina in Ihrem eigenen Tempo und planen Sie Pausen und Abstecher ein.',
      'Wählen Sie die Bauwerke aus, die Sie besuchen möchten, etwa die Bou-Inania-Madrasa oder das Mausoleum von Moulay Ismail. Prüfen Sie Öffnungszeiten und Zugang vorab und erkundigen Sie sich, ob Heri es-Souani geöffnet ist.',
    ],
    source: 'Meknès beim marokkanischen Fremdenverkehrsamt entdecken',
    preparation: 'Öffnungszeiten und Zugang der Bauwerke sowie die Öffnung von Heri es-Souani vorab prüfen.',
  },
  ar: {
    title: 'يومان في المدينة الإمبراطورية',
    intro: 'مسار مرن بين ساحة الهديم والمدينة العتيقة ومعالم مكناس. عدّل الزيارات بحسب مواعيد الفتح وشروط الوصول الحالية.',
    titles: ['باب المنصور وساحة الهديم', 'المدينة العتيقة والمعالم'],
    texts: [
      'ابدأ من ساحة الهديم لمشاهدة باب المنصور من الساحة، ثم تجوّل في المدينة العتيقة على إيقاعك. اترك وقتاً للاستراحة والتوقفات الجانبية.',
      'اختر المعالم التي ترغب في زيارتها، مثل المدرسة البوعنانية أو ضريح مولاي إسماعيل. تحقّق من المواعيد وشروط الوصول قبل الانطلاق، واستفسر أيضاً عن إمكانية زيارة هري السواني.',
    ],
    source: 'اكتشف مكناس مع المكتب الوطني المغربي للسياحة',
    preparation: 'التحقق من المواعيد وشروط الوصول للمعالم، ومن فتح هري السواني، قبل الانطلاق.',
  },
};
