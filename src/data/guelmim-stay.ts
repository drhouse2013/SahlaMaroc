import type { Locale } from '../i18n';
// Regional council: https://rgon.ma/en/identity-card/guelmim-province/oasis-tighmart/
// Asrir and Tighmert belong to the same oasis area; these are two relaxed days, not two distant excursions.
export const GUELMIM_STAY = {
  fr: {
    title: 'Deux jours au rythme des oasis',
    intro: 'Depuis Guelmim, prenez le temps de découvrir le secteur oasien d’Asrir et de Tighmert. Ces deux étapes proches peuvent aussi se regrouper selon votre rythme.',
    titles: ['Une première découverte à Asrir', 'Marcher dans le secteur de Tighmert'],
    texts: ['Organisez votre transport et confirmez un point de rencontre avec un hébergement ou un accompagnateur local. Découvrez les villages depuis les voies publiques ; demandez avant de photographier les habitants et d’entrer dans une propriété.', 'Revenez pour une promenade adaptée à la chaleur et aux chemins accessibles. Les palmeraies sont des espaces agricoles, dont certaines parties ont souffert d’incendies : respectez les cultures et les travaux de restauration, sans attendre un paysage uniforme.'],
    source: 'Découvrir Tighmert avec la région Guelmim-Oued Noun',
    preparation: 'Confirmer transport et accès avec un interlocuteur local ; vérifier la chaleur et prévoir eau, protection solaire et pauses.',
  },
  en: {
    title: 'Two days at the pace of the oases',
    intro: 'From Guelmim, explore the oasis area of Asrir and Tighmert at leisure. These nearby stops can also be combined to suit your pace.',
    titles: ['A first look at Asrir', 'A walk around Tighmert'],
    texts: ['Arrange transport and confirm a meeting point with local accommodation or a guide. Explore the villages from public paths; ask before photographing residents or entering private property.', 'Return for a walk suited to the heat and accessible paths. The palm groves are farmland, and parts have suffered fires: respect crops and restoration work rather than expecting a uniform landscape.'],
    source: 'Discover Tighmert with the Guelmim-Oued Noun region',
    preparation: 'Confirm transport and access locally; check the heat and plan water, sun protection and breaks.',
  },
  es: {
    title: 'Dos días al ritmo de los oasis',
    intro: 'Desde Guelmim, descubre con calma la zona de oasis de Asrir y Tighmert. Estas etapas cercanas también pueden combinarse según tu ritmo.',
    titles: ['Un primer paseo por Asrir', 'Caminar por la zona de Tighmert'],
    texts: ['Organiza el transporte y confirma un punto de encuentro con un alojamiento o guía local. Recorre los pueblos por los caminos públicos; pide permiso antes de fotografiar a los habitantes o entrar en una propiedad.', 'Vuelve para un paseo adaptado al calor y a los caminos accesibles. Los palmerales son tierras agrícolas y algunas zonas han sufrido incendios: respeta los cultivos y los trabajos de restauración, sin esperar un paisaje uniforme.'],
    source: 'Descubrir Tighmert con la región de Guelmim-Oued Noun',
    preparation: 'Confirma transporte y acceso con alguien de la zona; comprueba el calor y prevé agua, protección solar y descansos.',
  },
  de: {
    title: 'Zwei Tage im Rhythmus der Oasen',
    intro: 'Entdecken Sie von Guelmim aus in Ruhe das Oasengebiet von Asrir und Tighmert. Die nah beieinanderliegenden Stationen lassen sich je nach Reisetempo auch verbinden.',
    titles: ['Ein erster Rundgang in Asrir', 'Spaziergang im Gebiet von Tighmert'],
    texts: ['Organisieren Sie den Transport und vereinbaren Sie einen Treffpunkt mit einer örtlichen Unterkunft oder Begleitung. Erkunden Sie die Dörfer auf öffentlichen Wegen; fragen Sie vor Fotos von Bewohnern und vor dem Betreten privater Grundstücke.', 'Kehren Sie für einen an Hitze und zugängliche Wege angepassten Spaziergang zurück. Die Palmenhaine sind landwirtschaftliche Flächen, teils von Bränden betroffen: respektieren Sie Anbau und Wiederherstellung, statt eine einheitliche Landschaft zu erwarten.'],
    source: 'Tighmert bei der Region Guelmim-Oued Noun entdecken',
    preparation: 'Transport und Zugang vor Ort bestätigen; Hitze prüfen sowie Wasser, Sonnenschutz und Pausen einplanen.',
  },
  ar: {
    title: 'يومان على إيقاع الواحات',
    intro: 'انطلاقا من كلميم، اكتشف بهدوء المجال الواحي لأسرير وتيغمرت. المحطتان متقاربتان ويمكن جمعهما حسب وتيرة رحلتك.',
    titles: ['جولة أولى في أسرير', 'المشي في محيط تيغمرت'],
    texts: ['نظم وسيلة النقل وأكد نقطة اللقاء مع مكان إقامتك أو مرافق محلي. اكتشف القرى عبر المسالك العمومية، واستأذن قبل تصوير السكان أو دخول الأملاك الخاصة.', 'عد لجولة تراعي الحرارة والمسالك المتاحة. بساتين النخيل أراض زراعية وقد تضررت أجزاء منها بسبب الحرائق؛ احترم المزروعات وأعمال التأهيل ولا تتوقع مشهدا موحدا في كل الأماكن.'],
    source: 'اكتشف تيغمرت مع جهة كلميم واد نون',
    preparation: 'أكد النقل وإمكانية الزيارة محليا، وتحقق من الحرارة وخذ الماء ووسائل الوقاية من الشمس وخطط للاستراحات.',
  },
} satisfies Record<Locale, { title: string; intro: string; titles: string[]; texts: string[]; source: string; preparation: string }>;

