import type { Locale } from '../i18n';

type StayCopy = { title: string; intro: string; titles: [string, string]; texts: [string, string]; source: string; preparation: string };

/** Editorial city stay; visiting conditions must be checked directly with venues. */
export const CHEFCHAOUEN_STAY: Record<Locale, StayCopy> = {
  fr: {
    title: 'Deux jours pour prendre le temps du bleu',
    intro: 'Une proposition centrée sur la ville : médina et Kasbah, puis une promenade vers Ras el-Ma. Adaptez les étapes aux pentes, à la météo et au rythme de votre groupe.',
    titles: ['Médina, artisanat et Kasbah', 'Une promenade vers Ras el-Ma'],
    texts: ['Commencez dans les ruelles de la médina, puis gardez du temps pour la Kasbah et ses jardins. Confirmez les conditions de visite du musée. Revenez vers les ateliers et boutiques qui vous intéressent, sans chercher à tout parcourir dans la même matinée.', 'Consacrez la seconde journée à une promenade vers Ras el-Ma et à un retour tranquille dans la médina. Choisissez votre chemin selon les pentes et votre aisance à pied ; ménagez des pauses et prévoyez de l’eau. Demandez l’accord des personnes avant de les photographier.'],
    source: 'Découvrir Chefchaouen avec l’Office national marocain du tourisme',
    preparation: 'Choisir un chemin adapté aux pentes et confirmer les conditions de visite de la Kasbah.',
  },
  en: {
    title: 'Two days to slow down in the blue city',
    intro: 'A stay focused on the town: the medina and Kasbah, then a walk towards Ras El Ma. Adapt the stops to the slopes, weather and pace of your group.',
    titles: ['Medina, crafts and Kasbah', 'A walk towards Ras El Ma'],
    texts: ['Start in the medina’s lanes, then leave time for the Kasbah and its gardens. Confirm the museum’s visiting arrangements. Return to the workshops and shops that interest you rather than trying to cover everything in one morning.', 'Spend the second day walking towards Ras El Ma and returning through the medina at your own pace. Choose a route that suits your walking ability and the slopes; allow for breaks and carry water. Ask people for permission before photographing them.'],
    source: 'Explore Chefchaouen with the Moroccan National Tourist Office',
    preparation: 'Choose a route suited to the slopes and confirm Kasbah visiting arrangements.',
  },
  es: {
    title: 'Dos días para disfrutar del azul sin prisas',
    intro: 'Una propuesta centrada en la ciudad: medina y alcazaba, después un paseo hacia Ras el-Ma. Adapta las etapas a las pendientes, al tiempo y al ritmo del grupo.',
    titles: ['Medina, artesanía y alcazaba', 'Un paseo hacia Ras el-Ma'],
    texts: ['Empieza por las callejuelas de la medina y reserva tiempo para la alcazaba y sus jardines. Confirma las condiciones de visita del museo. Vuelve a los talleres y tiendas que te interesen sin intentar verlo todo en una mañana.', 'Dedica el segundo día a pasear hacia Ras el-Ma y regresar con calma por la medina. Elige el camino según las pendientes y tu comodidad al caminar; prevé descansos y lleva agua. Pide permiso antes de fotografiar a las personas.'],
    source: 'Descubrir Chefchaouen con la Oficina Nacional de Turismo de Marruecos',
    preparation: 'Elegir un camino adecuado a las pendientes y confirmar las condiciones de visita de la alcazaba.',
  },
  de: {
    title: 'Zwei Tage, um das Blau in Ruhe zu entdecken',
    intro: 'Ein Aufenthalt mit Schwerpunkt auf der Stadt: Medina und Kasbah, danach ein Spaziergang nach Ras el-Ma. Passen Sie die Etappen an Steigungen, Wetter und Gruppentempo an.',
    titles: ['Medina, Handwerk und Kasbah', 'Ein Spaziergang nach Ras el-Ma'],
    texts: ['Beginnen Sie in den Gassen der Medina und nehmen Sie sich anschließend Zeit für die Kasbah und ihre Gärten. Bestätigen Sie die Besuchsbedingungen des Museums. Kehren Sie zu interessanten Werkstätten und Geschäften zurück, statt alles an einem Vormittag sehen zu wollen.', 'Nutzen Sie den zweiten Tag für einen Spaziergang nach Ras el-Ma und einen ruhigen Rückweg durch die Medina. Wählen Sie den Weg nach Steigung und eigener Gehfähigkeit; planen Sie Pausen ein und nehmen Sie Wasser mit. Fragen Sie Menschen vor dem Fotografieren um Erlaubnis.'],
    source: 'Chefchaouen beim marokkanischen Fremdenverkehrsamt entdecken',
    preparation: 'Einen Weg mit passenden Steigungen wählen und Besuchsbedingungen der Kasbah bestätigen.',
  },
  ar: {
    title: 'يومان لاكتشاف الأزرق على مهل',
    intro: 'اقتراح يركّز على المدينة: الأزقة والقصبة، ثم نزهة نحو رأس الماء. كيّف المراحل مع المنحدرات والطقس وإيقاع مجموعتك.',
    titles: ['المدينة العتيقة والصناعة التقليدية والقصبة', 'نزهة نحو رأس الماء'],
    texts: ['ابدأ بأزقة المدينة العتيقة، ثم اترك وقتاً للقصبة وحدائقها. تأكّد من شروط زيارة المتحف. عُد إلى الورش والمتاجر التي تهمك بدل محاولة زيارة كل شيء في صباح واحد.', 'خصّص اليوم الثاني لنزهة نحو رأس الماء والعودة على مهل عبر المدينة العتيقة. اختر الطريق وفق المنحدرات وقدرتك على المشي، واترك وقتاً للاستراحات وأحضر الماء. استأذن الأشخاص قبل تصويرهم.'],
    source: 'اكتشف شفشاون مع المكتب الوطني المغربي للسياحة',
    preparation: 'اختيار طريق مناسب للمنحدرات والتأكّد من شروط زيارة القصبة.',
  },
};
