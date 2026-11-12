import type { Locale } from '../i18n';

/** Two-day editorial route based on ONMT's northeast land-and-sea itinerary. */
export const NADOR_STAY: Record<Locale, { title: string; intro: string; titles: [string, string]; texts: [string, string]; source: string; preparation: string }> = {
  fr: {
    title: 'Deux jours entre Marchica et Gourougou',
    intro: 'Un séjour au rythme de la lagune et des collines : une première journée au bord de l’eau, puis une sortie nature à adapter à la météo et aux conditions d’accès.',
    titles: ['La corniche et la lagune', 'Marchica et les hauteurs de Gourougou'],
    texts: [
      'Commencez par la corniche de Nador, puis prolongez la promenade vers les rives de Marchica selon le temps disponible. Gardez une marge pour les trajets et choisissez un endroit ouvert au public.',
      'Réservez cette journée à une balade dans les reliefs autour du parc Marchica et du mont Gourougou. Vérifiez les accès, la météo et les règles locales avant de partir ; restez sur les itinéraires adaptés à votre niveau.',
    ],
    source: 'Lire l’itinéraire du Nord-Est avec l’Office national marocain du tourisme',
    preparation: 'Vérifier la météo, les accès et les conditions de marche autour de Gourougou ; prévoir de l’eau et des chaussures adaptées.',
  },
  en: {
    title: 'Two days between Marchica and Gourougou',
    intro: 'A stay shaped by the lagoon and surrounding hills: a waterside first day, followed by a nature outing adapted to the weather and access conditions.',
    titles: ['The corniche and the lagoon', 'Marchica and the Gourougou heights'],
    texts: [
      'Start along Nador’s corniche, then continue towards the shores of Marchica as time allows. Leave room for travel between places and choose an area open to the public.',
      'Set aside this day for a walk in the hills around Marchica Park and Mount Gourougou. Check access, weather and local guidance before setting off, and choose a route suited to your level.',
    ],
    source: 'Read the northeast itinerary from the Moroccan National Tourist Office',
    preparation: 'Check weather, access and walking conditions around Gourougou; bring water and suitable footwear.',
  },
  es: {
    title: 'Dos días entre Marchica y Gourougou',
    intro: 'Una estancia al ritmo de la laguna y las colinas: un primer día junto al agua y después una salida a la naturaleza, adaptada al tiempo y a las condiciones de acceso.',
    titles: ['La corniche y la laguna', 'Marchica y las alturas de Gourougou'],
    texts: [
      'Empieza por la corniche de Nador y continúa hacia las orillas de Marchica si tienes tiempo. Deja margen para los desplazamientos y elige una zona abierta al público.',
      'Reserva este día para caminar por las colinas que rodean el parque Marchica y el monte Gourougou. Comprueba los accesos, el tiempo y las indicaciones locales antes de salir; escoge una ruta adecuada a tu nivel.',
    ],
    source: 'Consulta la ruta del Nordeste de la Oficina Nacional de Turismo de Marruecos',
    preparation: 'Comprueba el tiempo, los accesos y las condiciones para caminar por Gourougou; lleva agua y calzado adecuado.',
  },
  de: {
    title: 'Zwei Tage zwischen Marchica und Gourougou',
    intro: 'Ein Aufenthalt im Rhythmus der Lagune und der umliegenden Hügel: ein erster Tag am Wasser, danach ein Naturausflug, angepasst an Wetter und Zugangsbedingungen.',
    titles: ['Promenade und Lagune', 'Marchica und die Höhen von Gourougou'],
    texts: [
      'Beginnen Sie an der Promenade von Nador und setzen Sie den Spaziergang nach Möglichkeit am Ufer der Marchica fort. Planen Sie Wegezeiten ein und wählen Sie einen öffentlich zugänglichen Bereich.',
      'Planen Sie diesen Tag für einen Spaziergang in den Hügeln rund um den Marchica-Park und den Berg Gourougou ein. Prüfen Sie Zugang, Wetter und lokale Hinweise vor dem Aufbruch und wählen Sie eine Route passend zu Ihrer Erfahrung.',
    ],
    source: 'Die Nordost-Route des marokkanischen Fremdenverkehrsamts lesen',
    preparation: 'Wetter, Zugänge und Wanderbedingungen rund um Gourougou prüfen; Wasser und geeignetes Schuhwerk mitnehmen.',
  },
  ar: {
    title: 'يومان بين مارتشيكا وكوروكو',
    intro: 'إقامة على إيقاع البحيرة والتلال المحيطة: يوم أول قرب الماء، ثم نزهة في الطبيعة تُكيّف مع الطقس وظروف الوصول.',
    titles: ['الكورنيش والبحيرة', 'مارتشيكا ومرتفعات كوروكو'],
    texts: [
      'ابدأ بكورنيش الناظور، ثم تابع نحو ضفاف مارتشيكا بحسب الوقت المتاح. اترك هامشاً للتنقل واختر مكاناً مفتوحاً للعموم.',
      'خصّص هذا اليوم لنزهة في التلال المحيطة بمنتزه مارتشيكا وجبل كوروكو. تحقّق من إمكانية الوصول والطقس والإرشادات المحلية قبل الانطلاق، واختر مساراً يناسب مستواك.',
    ],
    source: 'اقرأ مسار شمال شرق المغرب لدى المكتب الوطني المغربي للسياحة',
    preparation: 'تحقّق من الطقس وإمكانية الوصول وظروف المشي حول كوروكو؛ أحضر الماء وانتعل حذاءً مناسباً.',
  },
};
