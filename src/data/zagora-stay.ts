import type { Locale } from '../i18n';

/** Three-day editorial route based on ONMT's Ouarzazate–Zagora–Tinghir destination guide. */
export const ZAGORA_STAY: Record<Locale, { title: string; intro: string; titles: [string, string, string]; texts: [string, string, string]; source: string; preparation: string }> = {
  fr: {
    title: 'Trois jours dans la vallée du Drâa',
    intro: 'Un séjour souple entre palmeraie, artisanat de Tamegroute et reliefs au sud de Zagora. Les excursions et visites dépendent des accès et des conditions locales.',
    titles: ['Palmeraie et repères en ville', 'Tamegroute et la poterie verte', 'Prendre de la hauteur à Jebel Zagora'],
    texts: [
      'Commencez par découvrir Zagora et la palmeraie de la vallée du Drâa, en choisissant des chemins accessibles au public. Gardez du temps pour les pauses et confirmez les conditions de promenade sur place.',
      'Rejoignez Tamegroute pour découvrir son artisanat de poterie. La bibliothèque de la zaouïa Naciria est une visite distincte : renseignez-vous localement sur l’ouverture, les horaires et les conditions d’accès avant d’y aller.',
      'Selon la météo, votre niveau et les indications locales, consacrez la journée à une sortie vers Jebel Zagora ou à une étape plus calme dans la vallée. Vérifiez l’itinéraire, le transport et les conditions de marche avant le départ.',
    ],
    source: 'Découvrir la région de Zagora avec l’Office national marocain du tourisme',
    preparation: 'Vérifier la météo, les accès et les horaires à Tamegroute ; confirmer le transport et les conditions de marche avant toute excursion.',
  },
  en: {
    title: 'Three days in the Draa Valley',
    intro: 'A flexible stay combining the palm grove, Tamegroute pottery and the hills south of Zagora. Excursions and visits depend on access and local conditions.',
    titles: ['Palm grove and town bearings', 'Tamegroute and green pottery', 'Gain a little height at Jebel Zagora'],
    texts: [
      'Start by exploring Zagora and the Draa Valley palm grove, choosing paths open to the public. Leave time for breaks and check local walking conditions.',
      'Head to Tamegroute to discover its pottery craft. The Naciria zawiya library is a separate visit: check locally whether it is open, its hours and access conditions before going.',
      'Depending on the weather, your ability and local guidance, set aside the day for an outing towards Jebel Zagora or a gentler stop in the valley. Check the route, transport and walking conditions before setting off.',
    ],
    source: 'Explore the Zagora region with the Moroccan National Tourist Office',
    preparation: 'Check weather, access and opening hours in Tamegroute; confirm transport and walking conditions before any excursion.',
  },
  es: {
    title: 'Tres días en el valle del Draa',
    intro: 'Una estancia flexible entre el palmeral, la cerámica de Tamegroute y las colinas al sur de Zagora. Las excursiones y visitas dependen del acceso y de las condiciones locales.',
    titles: ['Palmeral y primeros pasos por la ciudad', 'Tamegroute y la cerámica verde', 'Subir hacia Jebel Zagora'],
    texts: [
      'Empieza descubriendo Zagora y el palmeral del valle del Draa; elige caminos abiertos al público. Reserva tiempo para descansar y consulta las condiciones locales para caminar.',
      'Ve a Tamegroute para conocer su artesanía de cerámica. La biblioteca de la zawiya Naciria es una visita distinta: infórmate localmente sobre apertura, horarios y acceso antes de ir.',
      'Según el tiempo, tu nivel y las indicaciones locales, dedica el día a una salida hacia Jebel Zagora o a una etapa más tranquila en el valle. Confirma el itinerario, el transporte y las condiciones para caminar antes de salir.',
    ],
    source: 'Descubrir la región de Zagora con la Oficina Nacional de Turismo de Marruecos',
    preparation: 'Comprueba el tiempo, el acceso y los horarios en Tamegroute; confirma el transporte y las condiciones para caminar antes de cada excursión.',
  },
  de: {
    title: 'Drei Tage im Draa-Tal',
    intro: 'Ein flexibler Aufenthalt mit Palmenhain, Tamegroutes Töpferhandwerk und den Höhen südlich von Zagora. Ausflüge und Besuche hängen von Zugang und örtlichen Bedingungen ab.',
    titles: ['Palmenhain und erste Orientierung', 'Tamegroute und grüne Keramik', 'Ein Ausflug zum Jebel Zagora'],
    texts: [
      'Entdecken Sie zunächst Zagora und den Palmenhain im Draa-Tal; wählen Sie Wege, die öffentlich zugänglich sind. Planen Sie Pausen ein und erkundigen Sie sich vor Ort nach den Spazierbedingungen.',
      'Fahren Sie nach Tamegroute und lernen Sie dort das Töpferhandwerk kennen. Die Bibliothek der Zaouia Naciria ist ein eigener Besuch: Erkundigen Sie sich vorher vor Ort nach Öffnung, Zeiten und Zugang.',
      'Je nach Wetter, eigener Erfahrung und örtlichen Hinweisen können Sie einen Ausflug zum Jebel Zagora unternehmen oder einen ruhigeren Tag im Tal verbringen. Prüfen Sie Route, Transport und Wegbedingungen vor dem Aufbruch.',
    ],
    source: 'Die Region Zagora beim marokkanischen Fremdenverkehrsamt entdecken',
    preparation: 'Wetter, Zugang und Öffnungszeiten in Tamegroute prüfen; Transport und Wegbedingungen vor Ausflügen bestätigen.',
  },
  ar: {
    title: 'ثلاثة أيام في وادي درعة',
    intro: 'إقامة مرنة تجمع بين واحة النخيل وحرف تامكروت والتلال جنوب زاكورة. تعتمد الرحلات والزيارات على إمكانية الوصول والظروف المحلية.',
    titles: ['واحة النخيل والتعرّف على المدينة', 'تامكروت والفخار الأخضر', 'نزهة نحو جبل زاكورة'],
    texts: [
      'ابدأ باكتشاف زاكورة وواحة النخيل في وادي درعة، واختر المسارات المفتوحة للعموم. اترك وقتاً للاستراحة واستفسر محلياً عن ظروف المشي.',
      'توجّه إلى تامكروت لاكتشاف حرفة الفخار. مكتبة الزاوية الناصرية زيارة مستقلة؛ تحقّق محلياً من فتحها ومواعيدها وشروط الدخول قبل الذهاب.',
      'حسب الطقس ومستوى لياقتك والإرشادات المحلية، خصّص اليوم لنزهة نحو جبل زاكورة أو ليوم هادئ في الوادي. تحقّق من الطريق والنقل وظروف المشي قبل الانطلاق.',
    ],
    source: 'اكتشف منطقة زاكورة مع المكتب الوطني المغربي للسياحة',
    preparation: 'تحقّق من الطقس وإمكانية الوصول والمواعيد في تامكروت؛ وأكّد النقل وظروف المشي قبل الرحلات.',
  },
};

