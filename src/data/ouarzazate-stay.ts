import type { Locale } from '../i18n';

/** Three-day editorial route based on the Moroccan National Tourist Office's Ouarzazate guide. */
export const OUARZAZATE_STAY: Record<Locale, { title: string; intro: string; titles: [string, string, string]; texts: [string, string, string]; source: string; preparation: string }> = {
  fr: {
    title: 'Trois jours entre kasbahs et cinéma',
    intro: 'Un séjour en trois temps : découvrir Ouarzazate, consacrer une journée à Aït Ben Haddou, puis choisir une visite autour du cinéma. Vérifiez les accès et horaires avant chaque déplacement.',
    titles: ['Taourirt et le cœur de la ville', 'Excursion à Aït Ben Haddou', 'Cinéma et décors de tournage'],
    texts: [
      'Commencez par la kasbah de Taourirt, puis prenez le temps de découvrir le centre de Ouarzazate. Vérifiez les conditions de visite de la kasbah le jour même.',
      'Consacrez la journée au ksar d’Aït Ben Haddou, situé à environ 30 minutes de Ouarzazate selon l’Office national marocain du tourisme. Prévoyez le trajet et vérifiez les conditions locales avant de partir.',
      'Choisissez le Musée du cinéma en ville ou, si les conditions d’ouverture et d’accès le permettent, les studios. Ce sont des visites distinctes : confirmez les horaires et l’accès directement auprès des sites.',
    ],
    source: 'Préparer une visite à Ouarzazate avec l’Office national marocain du tourisme',
    preparation: 'Confirmer les horaires, tarifs et conditions d’accès de Taourirt, d’Aït Ben Haddou et des lieux de cinéma ; organiser le transport de l’excursion.',
  },
  en: {
    title: 'Three days among kasbahs and cinema',
    intro: 'A three-part stay: discover Ouarzazate, set aside a day for Aït Ben Haddou, then choose a film-related visit. Check access and opening hours before each trip.',
    titles: ['Taourirt and the town centre', 'Aït Ben Haddou day trip', 'Cinema and film sets'],
    texts: [
      'Start at Taourirt Kasbah, then take time to explore central Ouarzazate. Check the kasbah’s visiting conditions on the day.',
      'Set aside a day for the Ksar of Aït Ben Haddou, about 30 minutes from Ouarzazate according to the Moroccan National Tourist Office. Allow time for the journey and check local conditions before setting off.',
      'Choose the Cinema Museum in town or, if opening and access conditions allow, one of the studios. These are separate visits: confirm hours and access directly with each venue.',
    ],
    source: 'Plan a visit to Ouarzazate with the Moroccan National Tourist Office',
    preparation: 'Confirm opening hours, prices and access conditions for Taourirt, Aït Ben Haddou and film venues; arrange transport for the day trip.',
  },
  es: {
    title: 'Tres días entre kasbahs y cine',
    intro: 'Una estancia en tres etapas: descubrir Uarzazat, dedicar un día a Aït Ben Haddou y después elegir una visita relacionada con el cine. Comprueba los accesos y horarios antes de cada desplazamiento.',
    titles: ['Taourirt y el centro de la ciudad', 'Excursión a Aït Ben Haddou', 'Cine y escenarios de rodaje'],
    texts: [
      'Empieza por la kasbah de Taourirt y después dedica tiempo al centro de Uarzazat. Comprueba las condiciones de visita de la kasbah ese mismo día.',
      'Reserva el día para el ksar de Aït Ben Haddou, a unos 30 minutos de Uarzazat según la Oficina Nacional de Turismo de Marruecos. Prevé el trayecto y comprueba las condiciones locales antes de salir.',
      'Elige el Museo del Cine en la ciudad o, si los horarios y el acceso lo permiten, uno de los estudios. Son visitas distintas: confirma directamente las condiciones con cada lugar.',
    ],
    source: 'Preparar una visita a Uarzazat con la Oficina Nacional de Turismo de Marruecos',
    preparation: 'Confirma horarios, precios y acceso a Taourirt, Aït Ben Haddou y los lugares de cine; organiza el transporte de la excursión.',
  },
  de: {
    title: 'Drei Tage zwischen Kasbahs und Kino',
    intro: 'Ein Aufenthalt in drei Etappen: Ouarzazate entdecken, einen Tag für Aït Ben Haddou einplanen und anschließend einen Filmbesuch auswählen. Prüfen Sie vor jeder Fahrt Zugang und Öffnungszeiten.',
    titles: ['Taourirt und das Stadtzentrum', 'Tagesausflug nach Aït Ben Haddou', 'Kino und Filmkulissen'],
    texts: [
      'Beginnen Sie bei der Kasbah Taourirt und nehmen Sie sich anschließend Zeit für das Zentrum von Ouarzazate. Prüfen Sie die Besuchsbedingungen der Kasbah am selben Tag.',
      'Planen Sie einen Tag für den Ksar von Aït Ben Haddou ein, der laut marokkanischem Fremdenverkehrsamt etwa 30 Minuten von Ouarzazate entfernt liegt. Berücksichtigen Sie die Fahrt und prüfen Sie die örtlichen Bedingungen.',
      'Wählen Sie das Filmmuseum in der Stadt oder, sofern Öffnungszeiten und Zugang es erlauben, eines der Studios. Dies sind getrennte Besuche; bestätigen Sie Bedingungen direkt bei den jeweiligen Orten.',
    ],
    source: 'Einen Besuch in Ouarzazate mit dem marokkanischen Fremdenverkehrsamt planen',
    preparation: 'Öffnungszeiten, Preise und Zugangsbedingungen für Taourirt, Aït Ben Haddou und Filmorte bestätigen; Transport für den Tagesausflug organisieren.',
  },
  ar: {
    title: 'ثلاثة أيام بين القصبات والسينما',
    intro: 'إقامة من ثلاث مراحل: اكتشاف ورزازات، وتخصيص يوم لقصر آيت بن حدو، ثم اختيار زيارة مرتبطة بالسينما. تحقّق من شروط الدخول والمواعيد قبل كل تنقّل.',
    titles: ['قصبة تاوريرت ووسط المدينة', 'رحلة يوم إلى آيت بن حدو', 'السينما ومواقع التصوير'],
    texts: [
      'ابدأ بقصبة تاوريرت، ثم خصّص وقتاً لاكتشاف وسط ورزازات. تحقّق في اليوم نفسه من شروط زيارة القصبة.',
      'خصّص يوماً لقصر آيت بن حدو، الذي يبعد نحو 30 دقيقة عن ورزازات وفق المكتب الوطني المغربي للسياحة. احسب وقت الطريق وتحقّق من الظروف المحلية قبل الانطلاق.',
      'اختر متحف السينما داخل المدينة أو أحد الاستوديوهات إذا سمحت مواعيد العمل وشروط الدخول. الزيارتان منفصلتان؛ أكّد المواعيد وإمكانية الدخول مباشرة مع كل موقع.',
    ],
    source: 'التخطيط لزيارة ورزازات مع المكتب الوطني المغربي للسياحة',
    preparation: 'تأكيد المواعيد والأسعار وشروط الدخول إلى تاوريرت وآيت بن حدو ومواقع السينما؛ وترتيب النقل للرحلة اليومية.',
  },
};

