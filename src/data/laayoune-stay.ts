import type { Locale } from '../i18n';
// ONMT general brochure, p. 23: cathedral, Mechouar and lagoon near Laayoune.
// Historical destination reference only; no current opening or access guarantee.
export const LAAYOUNE_STAY = {
  fr: {
    title: 'Deux jours pour découvrir Laâyoune',
    intro: 'Une promenade urbaine puis une sortie vers la lagune, à organiser selon les accès autorisés et la météo.',
    titles: ['Cathédrale et découverte de la ville', 'Une sortie vers la lagune'],
    texts: ['Repérez la cathédrale depuis l’espace public puis découvrez la ville à votre rythme. Cette étape ne comprend pas de visite intérieure : confirmez directement toute possibilité d’entrée et respectez les activités du lieu.', 'Préparez le déplacement avec votre hébergement ou un accompagnateur local et confirmez un point d’observation accessible. Restez sur les voies autorisées, gardez vos distances avec les oiseaux et renoncez si le vent ou les accès ne permettent pas une sortie adaptée.'],
    source: 'Consulter la brochure de l’Office national marocain du tourisme — Laâyoune, page 23',
    preparation: 'Confirmer transport et accès localement ; vérifier vent et chaleur, prévoir eau et protection solaire.',
  },
  en: {
    title: 'Two days to discover Laayoune',
    intro: 'A town walk followed by an outing towards the lagoon, subject to permitted access and weather.',
    titles: ['Cathedral and town discovery', 'An outing towards the lagoon'],
    texts: ['View the cathedral from public space, then explore town at your own pace. This stop includes no interior visit: confirm any possibility of entry directly and respect the activities of the site.', 'Plan transport with your accommodation or a local guide and confirm an accessible viewing point. Stay on permitted routes, keep your distance from birds and cancel if wind or access conditions make the outing unsuitable.'],
    source: 'Read the Moroccan National Tourist Office brochure — Laayoune, page 23',
    preparation: 'Confirm transport and access locally; check wind and heat, and bring water and sun protection.',
  },
  es: {
    title: 'Dos días para descubrir El Aaiún',
    intro: 'Un paseo urbano y una salida hacia la laguna, según los accesos permitidos y el tiempo.',
    titles: ['La catedral y la ciudad', 'Una salida hacia la laguna'],
    texts: ['Observa la catedral desde el espacio público y descubre la ciudad a tu ritmo. La etapa no incluye una visita interior: confirma directamente cualquier posibilidad de entrada y respeta las actividades del lugar.', 'Prepara el transporte con tu alojamiento o un guía local y confirma un punto de observación accesible. Sigue las vías autorizadas, mantén la distancia con las aves y cancela si el viento o los accesos hacen que la salida no sea adecuada.'],
    source: 'Consultar el folleto de la Oficina Nacional Marroquí de Turismo — El Aaiún, página 23',
    preparation: 'Confirma transporte y acceso localmente; comprueba viento y calor y lleva agua y protección solar.',
  },
  de: {
    title: 'Zwei Tage für Laâyoune',
    intro: 'Ein Stadtspaziergang und ein Ausflug zur Lagune, abhängig von erlaubten Zugängen und Wetter.',
    titles: ['Kathedrale und Stadt entdecken', 'Ein Ausflug zur Lagune'],
    texts: ['Betrachten Sie die Kathedrale vom öffentlichen Raum aus und erkunden Sie die Stadt in Ihrem Tempo. Ein Innenbesuch ist nicht enthalten: bestätigen Sie mögliche Zutritte direkt und respektieren Sie die Nutzung des Ortes.', 'Planen Sie den Transport mit Ihrer Unterkunft oder einer örtlichen Begleitung und bestätigen Sie einen zugänglichen Aussichtspunkt. Bleiben Sie auf erlaubten Wegen, halten Sie Abstand zu Vögeln und verzichten Sie bei ungeeigneten Wind- oder Zugangsbedingungen auf den Ausflug.'],
    source: 'Broschüre des marokkanischen Fremdenverkehrsamts — Laâyoune, Seite 23',
    preparation: 'Transport und Zugang vor Ort bestätigen; Wind und Hitze prüfen sowie Wasser und Sonnenschutz mitnehmen.',
  },
  ar: {
    title: 'يومان لاكتشاف العيون',
    intro: 'جولة في المدينة ثم خرجة نحو البحيرة، بحسب المداخل المسموح بها وأحوال الطقس.',
    titles: ['الكاتدرائية واكتشاف المدينة', 'خرجة نحو البحيرة'],
    texts: ['شاهد الكاتدرائية من الفضاء العمومي ثم اكتشف المدينة على وتيرتك. لا تشمل هذه المحطة زيارة الداخل؛ أكد أي إمكانية للدخول مباشرة واحترم أنشطة المكان.', 'نظم التنقل مع مكان إقامتك أو مرافق محلي وأكد نقطة مشاهدة متاحة. التزم بالطرق المسموح بها وابتعد عن الطيور، وألغ الخرجة إذا لم تسمح الرياح أو ظروف الولوج بزيارة ملائمة.'],
    source: 'اطلع على دليل المكتب الوطني المغربي للسياحة — العيون، الصفحة 23',
    preparation: 'أكد النقل والولوج محليا وتحقق من الرياح والحرارة وخذ الماء ووسائل الوقاية من الشمس.',
  },
} satisfies Record<Locale, { title: string; intro: string; titles: string[]; texts: string[]; source: string; preparation: string }>;

