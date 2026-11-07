import type { Locale } from '../i18n';

/** Editorial two-day suggestion. Access, wind, tides and transport must be checked locally. */
export const DAKHLA_STAY: Record<Locale, { title: string; intro: string; titles: [string, string]; texts: [string, string]; source: string; preparation: string }> = {
  fr: {
    title: 'Deux jours entre ville, lagune et désert',
    intro: 'Prenez le temps de découvrir la ville et la lagune, puis choisissez une sortie encadrée selon la météo, le vent et les conditions d’accès.',
    titles: ['La ville et la lagune', 'Une sortie sur la presqu’île'],
    texts: [
      'Commencez par vos repères en ville, puis rejoignez la lagune pour observer les activités nautiques. Si vous souhaitez pratiquer le kitesurf, choisissez une école avec encadrement et vérifiez les conditions adaptées à votre niveau.',
      'Consacrez la journée à une excursion organisée vers l’île du Dragon ou la Dune Blanche, selon l’itinéraire proposé et les conditions du jour. Ces lieux sont éloignés : confirmez le transport, les accès, la météo et les horaires auprès d’un opérateur local avant de partir.',
    ],
    source: 'Découvrir Dakhla avec l’Office national marocain du tourisme',
    preparation: 'Confirmer l’itinéraire, le transport et les conditions de la lagune ou de l’excursion auprès de l’opérateur local.',
  },
  en: {
    title: 'Two days between town, lagoon and desert',
    intro: 'Take time to explore the town and lagoon, then choose a guided outing based on the weather, wind and access conditions.',
    titles: ['The town and lagoon', 'An outing on the peninsula'],
    texts: [
      'Get your bearings in town, then head to the lagoon to watch the water activities. If you want to kitesurf, choose a school with proper supervision and check that conditions suit your level.',
      'Set aside a day for an organised trip to Dragon Island or the White Dune, depending on the route offered and conditions that day. These places are far apart: confirm transport, access, weather and timings with a local operator before setting off.',
    ],
    source: 'Explore Dakhla with the Moroccan National Tourist Office',
    preparation: 'Confirm the route, transport and lagoon or excursion conditions with the local operator.',
  },
  es: {
    title: 'Dos días entre la ciudad, la laguna y el desierto',
    intro: 'Dedica tiempo a conocer la ciudad y la laguna, y después elige una excursión guiada según el tiempo, el viento y las condiciones de acceso.',
    titles: ['La ciudad y la laguna', 'Una salida por la península'],
    texts: [
      'Empieza orientándote en la ciudad y después acércate a la laguna para observar las actividades acuáticas. Si quieres practicar kitesurf, elige una escuela con supervisión y comprueba que las condiciones sean adecuadas para tu nivel.',
      'Reserva un día para una excursión organizada a la Isla del Dragón o a la Duna Blanca, según la ruta disponible y las condiciones del día. Están lejos: confirma el transporte, el acceso, el tiempo y los horarios con un operador local antes de salir.',
    ],
    source: 'Descubrir Dajla con la Oficina Nacional de Turismo de Marruecos',
    preparation: 'Confirma la ruta, el transporte y las condiciones de la laguna o de la excursión con el operador local.',
  },
  de: {
    title: 'Zwei Tage zwischen Stadt, Lagune und Wüste',
    intro: 'Nehmen Sie sich Zeit für die Stadt und die Lagune. Wählen Sie anschließend je nach Wetter, Wind und Zugang eine geführte Tour.',
    titles: ['Stadt und Lagune', 'Ein Ausflug auf die Halbinsel'],
    texts: [
      'Orientieren Sie sich zunächst in der Stadt und fahren Sie dann zur Lagune, um die Wassersportaktivitäten zu beobachten. Wenn Sie kitesurfen möchten, wählen Sie eine Schule mit Betreuung und prüfen Sie, ob die Bedingungen zu Ihrem Niveau passen.',
      'Planen Sie einen Tag für einen organisierten Ausflug zur Dracheninsel oder zur Weißen Düne ein – je nach angebotener Route und den Bedingungen vor Ort. Die Ziele liegen weit auseinander: Bestätigen Sie Transport, Zugang, Wetter und Zeiten vorab bei einem lokalen Anbieter.',
    ],
    source: 'Dakhla mit dem marokkanischen Fremdenverkehrsamt entdecken',
    preparation: 'Route, Transport sowie die Bedingungen an der Lagune oder für den Ausflug beim lokalen Anbieter bestätigen.',
  },
  ar: {
    title: 'يومان بين المدينة واللاجون والصحراء',
    intro: 'خصّص وقتاً لاكتشاف المدينة واللاجون، ثم اختر خرجة مؤطرة وفق الطقس والرياح وشروط الوصول.',
    titles: ['المدينة واللاجون', 'خرجة في شبه الجزيرة'],
    texts: [
      'ابدأ بالتعرّف على المدينة، ثم توجّه إلى اللاجون لمشاهدة الأنشطة المائية. إذا رغبت في ممارسة الكايت سيرف، اختر مدرسة توفر التأطير وتأكد من ملاءمة الظروف لمستواك.',
      'خصّص يوماً لخرجة منظمة إلى جزيرة التنين أو الكثيب الأبيض، بحسب المسار المتاح وظروف اليوم. هذه المواقع متباعدة؛ تأكد مسبقاً من النقل وإمكانية الوصول والطقس والمواعيد لدى منظم محلي.',
    ],
    source: 'اكتشف الداخلة مع المكتب الوطني المغربي للسياحة',
    preparation: 'تأكيد المسار والنقل وظروف اللاجون أو الخرجة لدى المنظم المحلي.',
  },
};
