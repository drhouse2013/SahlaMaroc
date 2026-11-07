import type { Locale } from '../i18n';

/** Suggested two-day stay. Check access, transport and opening times locally. */
export const AGADIR_STAY: Record<Locale, { title: string; intro: string; titles: [string, string]; texts: [string, string]; source: string; preparation: string }> = {
  fr: {
    title: 'Deux jours entre baie et souk',
    intro: 'Alternez le panorama sur la baie, la promenade du front de mer et la vie du souk. Prévoyez un transport entre les lieux et adaptez le programme à la chaleur.',
    titles: ['La baie depuis Oufella', 'Plage et Souk El Had'],
    texts: [
      'Commencez par le point de vue d’Agadir Oufella pour lire la baie et le port depuis les hauteurs. Vérifiez l’accès au site et choisissez un transport adapté avant de monter.',
      'Gardez une journée pour la promenade du front de mer, puis le Souk El Had si ses horaires vous conviennent. Les deux lieux sont éloignés : organisez le trajet, prévoyez de l’eau et gardez du temps pour flâner.',
    ],
    source: 'Découvrir Agadir-Taghazout avec l’Office national marocain du tourisme',
    preparation: 'Vérifier l’accès à Oufella, les horaires du Souk El Had et le transport entre les lieux.',
  },
  en: {
    title: 'Two days between the bay and the souk',
    intro: 'Balance a view over the bay with the seafront promenade and the life of the souk. Plan transport between places and adapt the day to the heat.',
    titles: ['The bay from Oufella', 'Beach and Souk El Had'],
    texts: [
      'Start at the Agadir Oufella viewpoint for a broad look at the bay and harbour from above. Check access to the site and arrange suitable transport before going up.',
      'Keep a day for the seafront promenade, then Souk El Had if its opening times suit you. The two places are some distance apart: plan the journey, bring water and leave time to browse.',
    ],
    source: 'Explore Agadir-Taghazout with the Moroccan National Tourist Office',
    preparation: 'Check access to Oufella, Souk El Had opening times and transport between places.',
  },
  es: {
    title: 'Dos días entre la bahía y el zoco',
    intro: 'Combina las vistas de la bahía con el paseo marítimo y el ambiente del zoco. Prevé transporte entre los lugares y adapta el día al calor.',
    titles: ['La bahía desde Oufella', 'Playa y Souk El Had'],
    texts: [
      'Empieza en el mirador de Agadir Oufella para contemplar la bahía y el puerto desde lo alto. Comprueba el acceso al lugar y organiza un transporte adecuado antes de subir.',
      'Reserva un día para el paseo marítimo y después visita Souk El Had si sus horarios te convienen. Los dos lugares están separados: organiza el trayecto, lleva agua y deja tiempo para recorrerlo sin prisa.',
    ],
    source: 'Descubrir Agadir-Taghazout con la Oficina Nacional de Turismo de Marruecos',
    preparation: 'Comprueba el acceso a Oufella, los horarios de Souk El Had y el transporte entre los lugares.',
  },
  de: {
    title: 'Zwei Tage zwischen Bucht und Souk',
    intro: 'Verbinden Sie den Blick über die Bucht mit der Strandpromenade und dem Treiben im Souk. Planen Sie Fahrten zwischen den Orten ein und passen Sie den Tag an die Hitze an.',
    titles: ['Die Bucht von Oufella aus', 'Strand und Souk El Had'],
    texts: [
      'Beginnen Sie am Aussichtspunkt Agadir Oufella und betrachten Sie Bucht und Hafen von oben. Prüfen Sie den Zugang und organisieren Sie vor dem Aufstieg eine passende Fahrt.',
      'Planen Sie einen Tag für die Strandpromenade und anschließend den Souk El Had ein, wenn die Öffnungszeiten passen. Die Orte liegen auseinander: planen Sie die Fahrt, nehmen Sie Wasser mit und lassen Sie Zeit zum Bummeln.',
    ],
    source: 'Agadir-Taghazout mit dem marokkanischen Fremdenverkehrsamt entdecken',
    preparation: 'Zugang zu Oufella, Öffnungszeiten des Souk El Had und Fahrten zwischen den Orten prüfen.',
  },
  ar: {
    title: 'يومان بين الخليج والسوق',
    intro: 'اجمع بين الإطلالة على الخليج والممشى البحري وأجواء السوق. خطط للتنقل بين المواقع وعدّل البرنامج بحسب الحرارة.',
    titles: ['الخليج من أوفلا', 'الشاطئ وسوق الأحد'],
    texts: [
      'ابدأ من إطلالة أكادير أوفلا لرؤية الخليج والميناء من الأعلى. تحقق من شروط الوصول ورتّب وسيلة نقل مناسبة قبل الصعود.',
      'خصص يوماً للممشى البحري ثم سوق الأحد إذا ناسبتك مواعيد فتحه. الموقعان متباعدان؛ رتّب التنقل واحمل الماء واترك وقتاً للتجول.',
    ],
    source: 'اكتشف أكادير-تغازوت مع المكتب الوطني المغربي للسياحة',
    preparation: 'التحقق من الوصول إلى أوفلا ومواعيد سوق الأحد ووسيلة التنقل بين المواقع.',
  },
};
