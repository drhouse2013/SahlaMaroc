import type { Locale } from '../i18n';

type StayCopy = { title: string; intro: string; titles: [string, string]; texts: [string, string]; source: string; preparation: string };

/** Editorial suggestions. No transport, admission or reservation is included. */
export const ATLANTIC_CITY_STAYS: Record<'tangier' | 'casablanca', Record<Locale, StayCopy>> = {
  tangier: {
    fr: {
      title: 'Deux jours entre ruelles et Atlantique',
      intro: 'Gardez une journée pour Tanger à pied et une autre pour une sortie sur la côte. Ce découpage laisse de la place aux pauses et aux changements de météo.',
      titles: ['Médina et Kasbah', 'Une échappée vers les grottes d’Hercule'],
      texts: ['Prenez vos repères dans la médina, puis montez vers la Kasbah. Choisissez une visite au musée si ses conditions d’accès vous conviennent, et gardez du temps pour revenir dans les ruelles plutôt que de multiplier les étapes.', 'Réservez cette journée à une sortie vers les grottes d’Hercule. Organisez un transport aller-retour depuis Tanger et confirmez l’ouverture avant de partir. Un arrêt au cap Spartel peut compléter la sortie selon la météo et le trajet convenu.'],
      source: 'Découvrir Tanger avec l’Office national marocain du tourisme',
      preparation: 'Confirmer le transport aller-retour et l’ouverture des grottes avant la sortie sur la côte.',
    },
    en: {
      title: 'Two days between lanes and the Atlantic',
      intro: 'Keep one day for exploring Tangier on foot and another for the coast. This leaves space for breaks and changes in the weather.',
      titles: ['Medina and Kasbah', 'An outing to the Hercules Caves'],
      texts: ['Find your bearings in the medina, then head uphill to the Kasbah. Include the museum if its visiting arrangements suit you, and leave time to revisit the lanes rather than adding too many stops.', 'Set aside this day for the Hercules Caves. Arrange return transport from Tangier and confirm opening before leaving. A stop at Cape Spartel can complement the outing, depending on the weather and the route agreed with your driver.'],
      source: 'Explore Tangier with the Moroccan National Tourist Office',
      preparation: 'Confirm return transport and cave opening before your coastal outing.',
    },
    es: {
      title: 'Dos días entre callejuelas y Atlántico',
      intro: 'Dedica un día a recorrer Tánger a pie y otro a la costa. Deja margen para descansar y adaptar la salida al tiempo.',
      titles: ['Medina y Kasbah', 'Una escapada a las cuevas de Hércules'],
      texts: ['Oriéntate en la medina y sube después hacia la Kasbah. Visita el museo si sus condiciones de acceso te convienen y reserva tiempo para volver a las callejuelas sin acumular demasiadas paradas.', 'Dedica este día a las cuevas de Hércules. Organiza el transporte de ida y vuelta desde Tánger y confirma la apertura antes de salir. Puedes añadir una parada en el cabo Espartel según el tiempo y el recorrido acordado.'],
      source: 'Descubrir Tánger con la Oficina Nacional de Turismo de Marruecos',
      preparation: 'Confirma el transporte de ida y vuelta y la apertura de las cuevas antes de salir hacia la costa.',
    },
    de: {
      title: 'Zwei Tage zwischen Gassen und Atlantik',
      intro: 'Planen Sie einen Tag für Tanger zu Fuß und einen weiteren für die Küste. So bleibt Zeit für Pausen und wetterbedingte Änderungen.',
      titles: ['Medina und Kasbah', 'Ein Ausflug zu den Herkulesgrotten'],
      texts: ['Orientieren Sie sich in der Medina und gehen Sie anschließend hinauf zur Kasbah. Besuchen Sie das Museum, wenn die Besuchsbedingungen für Sie passen. Lassen Sie Zeit, um in die Gassen zurückzukehren, statt zu viele Stationen einzuplanen.', 'Reservieren Sie diesen Tag für die Herkulesgrotten. Organisieren Sie Hin- und Rückfahrt ab Tanger und bestätigen Sie die Öffnung vor dem Aufbruch. Je nach Wetter und vereinbarter Strecke kann ein Halt am Kap Spartel den Ausflug ergänzen.'],
      source: 'Tanger beim marokkanischen Fremdenverkehrsamt entdecken',
      preparation: 'Hin- und Rückfahrt sowie die Öffnung der Grotten vor dem Küstenausflug bestätigen.',
    },
    ar: {
      title: 'يومان بين الأزقة والمحيط الأطلسي',
      intro: 'خصّص يوماً لاكتشاف طنجة مشياً ويوماً آخر للساحل. اترك وقتاً للاستراحة وتعديل الخروج حسب الطقس.',
      titles: ['المدينة العتيقة والقصبة', 'خرجة إلى مغارة هرقل'],
      texts: ['تعرّف على أزقة المدينة العتيقة ثم اصعد نحو القصبة. اختر زيارة المتحف إذا ناسبتك شروط الدخول، واترك وقتاً للعودة إلى الأزقة بدل الإكثار من المحطات.', 'خصّص هذا اليوم لخرجة نحو مغارة هرقل. نسّق وسيلة الذهاب والعودة من طنجة وتأكّد من الفتح قبل الانطلاق. يمكن إضافة توقف في رأس سبارطيل حسب الطقس والمسار المتفق عليه.'],
      source: 'اكتشف طنجة مع المكتب الوطني المغربي للسياحة',
      preparation: 'تأكيد وسيلة الذهاب والعودة وفتح المغارة قبل الخروج إلى الساحل.',
    },
  },
  casablanca: {
    fr: {
      title: 'Deux jours pour changer de regard sur Casa',
      intro: 'Alternez grand monument, façades du centre et promenade aux Habous. Prévoyez des déplacements entre les quartiers plutôt qu’une journée entière à pied.',
      titles: ['Hassan II et les façades du centre', 'Les Habous, sans se presser'],
      texts: ['Commencez autour de la mosquée Hassan II. Pour une visite intérieure, vérifiez directement les horaires et les conditions d’accès. Rejoignez ensuite le centre pour observer les façades Art déco et choisir une pause selon vos envies.', 'Gardez cette journée pour les Habous : arcades, petites places et boutiques à découvrir à votre rythme. La corniche peut compléter la journée si vous souhaitez retrouver l’océan ; prévoyez un déplacement distinct et ne cherchez pas à tout relier à pied.'],
      source: 'Découvrir Casablanca avec l’Office national marocain du tourisme',
      preparation: 'Vérifier les modalités de visite de la mosquée Hassan II et organiser les trajets entre les quartiers.',
    },
    en: {
      title: 'Two days to see Casa differently',
      intro: 'Combine a major landmark, city-centre facades and a walk around the Habous. Plan transport between neighbourhoods rather than a full day on foot.',
      titles: ['Hassan II and city-centre facades', 'An unhurried day in the Habous'],
      texts: ['Start around the Hassan II Mosque. If you wish to visit inside, check opening times and admission arrangements directly. Then head to the centre to look at Art Deco facades and choose a place for a break.', 'Keep this day for the Habous: arcades, small squares and shops to explore at your own pace. Add the corniche if you want time by the ocean; allow for a separate journey rather than trying to walk between every stop.'],
      source: 'Explore Casablanca with the Moroccan National Tourist Office',
      preparation: 'Check Hassan II Mosque visiting arrangements and plan transport between neighbourhoods.',
    },
    es: {
      title: 'Dos días para mirar Casa de otra manera',
      intro: 'Combina un gran monumento, las fachadas del centro y un paseo por Habous. Prevé transporte entre barrios en lugar de hacerlo todo a pie.',
      titles: ['Hassan II y las fachadas del centro', 'Habous, sin prisas'],
      texts: ['Empieza por los alrededores de la mezquita Hassan II. Para entrar, consulta directamente los horarios y las condiciones de visita. Después acércate al centro para observar las fachadas Art déco y elegir una pausa a tu gusto.', 'Dedica este día a Habous: soportales, pequeñas plazas y tiendas para descubrir a tu ritmo. Añade la corniche si quieres volver al océano; prevé un desplazamiento aparte sin intentar enlazarlo todo a pie.'],
      source: 'Descubrir Casablanca con la Oficina Nacional de Turismo de Marruecos',
      preparation: 'Consulta las condiciones de visita de la mezquita Hassan II y organiza los trayectos entre barrios.',
    },
    de: {
      title: 'Zwei Tage für einen anderen Blick auf Casa',
      intro: 'Verbinden Sie ein bedeutendes Bauwerk, Fassaden im Zentrum und einen Spaziergang durch Habous. Planen Sie Fahrten zwischen den Vierteln ein.',
      titles: ['Hassan II und die Fassaden im Zentrum', 'Habous ohne Eile entdecken'],
      texts: ['Beginnen Sie im Umfeld der Hassan-II.-Moschee. Prüfen Sie für eine Innenbesichtigung Öffnungszeiten und Zugangsbedingungen direkt bei der Moschee. Fahren Sie anschließend ins Zentrum, um Art-déco-Fassaden anzusehen und eine Pause nach Ihren Wünschen einzulegen.', 'Nehmen Sie sich diesen Tag für Habous: Arkaden, kleine Plätze und Geschäfte in Ihrem eigenen Tempo. Ergänzen Sie die Corniche, wenn Sie Zeit am Meer verbringen möchten. Planen Sie dafür eine eigene Fahrt, statt alle Stationen zu Fuß verbinden zu wollen.'],
      source: 'Casablanca beim marokkanischen Fremdenverkehrsamt entdecken',
      preparation: 'Besuchsbedingungen der Hassan-II.-Moschee prüfen und Fahrten zwischen den Vierteln planen.',
    },
    ar: {
      title: 'يومان لرؤية الدار البيضاء بنظرة أخرى',
      intro: 'اجمع بين معلم بارز وواجهات وسط المدينة ونزهة في الأحباس. خطّط للتنقل بين الأحياء بدل قضاء اليوم كله مشياً.',
      titles: ['الحسن الثاني وواجهات وسط المدينة', 'الأحباس على مهل'],
      texts: ['ابدأ بمحيط مسجد الحسن الثاني. إذا رغبت في زيارة الداخل فراجع المواعيد وشروط الدخول مباشرة. انتقل بعد ذلك إلى وسط المدينة لمشاهدة واجهات الآرت ديكو واختيار استراحة حسب رغبتك.', 'خصّص هذا اليوم للأحباس: أروقة وساحات صغيرة ومتاجر تكتشفها بإيقاعك. يمكن إضافة الكورنيش إذا رغبت في وقت قرب المحيط؛ خطّط لتنقل منفصل ولا تحاول وصل جميع المحطات مشياً.'],
      source: 'اكتشف الدار البيضاء مع المكتب الوطني المغربي للسياحة',
      preparation: 'مراجعة شروط زيارة مسجد الحسن الثاني وتنظيم التنقل بين الأحياء.',
    },
  },
};
