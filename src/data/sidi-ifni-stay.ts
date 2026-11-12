import type { Locale } from '../i18n';
// Regional council: https://rgon.ma/ar/نبذة-تاريخية/ and https://rgon.ma/en/legzira-beach/
export const SIDI_IFNI_STAY = {
  fr: {
    title: 'Deux jours entre ville et océan',
    intro: 'Une découverte de Sidi Ifni à pied, puis une sortie vers Legzira selon les conditions du littoral.',
    titles: ['Le phare et les rues du centre', 'Les paysages de Legzira'],
    texts: ['Repérez le phare depuis les espaces publics et poursuivez dans les rues du centre. Cette promenade extérieure ne suppose aucune entrée dans les bâtiments ; adaptez-la à la chaleur et prenez le temps des pauses.', 'Organisez le transport aller-retour et confirmez localement les accès, la météo et les marées. Restez sur les passages autorisés, à distance des falaises et des arches ; renoncez si les conditions sont défavorables. Aucune baignade ni passage sous une arche n’est prévu dans ce parcours.'],
    source: 'Découvrir Legzira avec la région Guelmim-Oued Noun',
    preparation: 'Confirmer transport, marées, météo et accès autorisés ; prévoir eau et protection solaire.',
  },
  en: {
    title: 'Two days between town and ocean',
    intro: 'Explore Sidi Ifni on foot, then plan an outing to Legzira according to coastal conditions.',
    titles: ['The lighthouse and central streets', 'The landscapes of Legzira'],
    texts: ['View the lighthouse from public areas and continue through the central streets. This outdoor walk includes no entry to buildings; adapt it to the heat and allow time for breaks.', 'Arrange return transport and confirm access, weather and tides locally. Stay on permitted paths, away from cliffs and arches; cancel if conditions are unsuitable. This itinerary includes neither swimming nor walking beneath an arch.'],
    source: 'Discover Legzira with the Guelmim-Oued Noun region',
    preparation: 'Confirm transport, tides, weather and permitted access; bring water and sun protection.',
  },
  es: {
    title: 'Dos días entre ciudad y océano',
    intro: 'Descubre Sidi Ifni a pie y prepara una salida a Legzira según las condiciones de la costa.',
    titles: ['El faro y las calles del centro', 'Los paisajes de Legzira'],
    texts: ['Observa el faro desde los espacios públicos y continúa por las calles del centro. Este paseo exterior no incluye entrar en edificios; adáptalo al calor y reserva tiempo para descansar.', 'Organiza el transporte de ida y vuelta y confirma localmente los accesos, el tiempo y las mareas. Sigue los pasos autorizados, lejos de acantilados y arcos; cancela si las condiciones no son favorables. El recorrido no incluye baño ni pasar bajo un arco.'],
    source: 'Descubrir Legzira con la región de Guelmim-Oued Noun',
    preparation: 'Confirma transporte, mareas, tiempo y accesos autorizados; lleva agua y protección solar.',
  },
  de: {
    title: 'Zwei Tage zwischen Stadt und Ozean',
    intro: 'Erkunden Sie Sidi Ifni zu Fuß und planen Sie je nach Küstenbedingungen einen Ausflug nach Legzira.',
    titles: ['Leuchtturm und Straßen im Zentrum', 'Die Landschaft von Legzira'],
    texts: ['Betrachten Sie den Leuchtturm von öffentlichen Flächen aus und gehen Sie durch die Straßen im Zentrum weiter. Dieser Spaziergang im Freien umfasst keine Gebäudezutritte; passen Sie ihn an die Hitze an und planen Sie Pausen.', 'Organisieren Sie Hin- und Rückfahrt und bestätigen Sie Zugang, Wetter und Gezeiten vor Ort. Bleiben Sie auf erlaubten Wegen, fern von Klippen und Felsbögen; verzichten Sie bei ungünstigen Bedingungen auf den Ausflug. Baden und Wege unter einem Felsbogen sind nicht Teil dieser Route.'],
    source: 'Legzira bei der Region Guelmim-Oued Noun entdecken',
    preparation: 'Transport, Gezeiten, Wetter und erlaubte Zugänge bestätigen; Wasser und Sonnenschutz mitnehmen.',
  },
  ar: {
    title: 'يومان بين المدينة والمحيط',
    intro: 'اكتشف سيدي إفني سيرا ثم خطط لخرجة إلى لكزيرة بحسب أحوال الساحل.',
    titles: ['المنارة وشوارع وسط المدينة', 'مناظر لكزيرة'],
    texts: ['شاهد المنارة من الفضاءات العمومية ثم تابع جولتك في شوارع وسط المدينة. الجولة خارجية ولا تشمل دخول المباني؛ كيفها مع الحرارة وخطط للاستراحات.', 'نظم النقل ذهابا وإيابا وأكد محليا المداخل والطقس والمد والجزر. التزم بالمسالك المسموح بها وابتعد عن الجروف والأقواس الصخرية، وألغ الخرجة إذا كانت الظروف غير ملائمة. لا تشمل الجولة السباحة ولا المرور تحت قوس صخري.'],
    source: 'اكتشف لكزيرة مع جهة كلميم واد نون',
    preparation: 'أكد النقل والمد والجزر والطقس والمداخل المسموح بها وخذ الماء ووسائل الوقاية من الشمس.',
  },
} satisfies Record<Locale, { title: string; intro: string; titles: string[]; texts: string[]; source: string; preparation: string }>;

