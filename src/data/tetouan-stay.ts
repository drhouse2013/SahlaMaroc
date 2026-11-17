import type { Locale } from '../i18n';

/** Two-day editorial route grounded in ONMT's Tetouan guide. Confirm access locally. */
export const TETOUAN_STAY: Record<Locale, { title: string; intro: string; titles: [string, string]; texts: [string, string]; source: string; preparation: string }> = {
  fr: {
    title: 'Deux jours entre médina et Ensanche',
    intro: 'Un parcours souple entre les ruelles historiques de Tétouan et les façades de son quartier espagnol. Gardez du temps pour les pauses et vérifiez les visites accessibles le jour même.',
    titles: ['Médina et métiers d’art', 'Ensanche et architecture moderne'],
    texts: [
      'Parcourez la médina à pied et repérez ses portes et ses places. Si le musée ethnographique de Bab El Okla est ouvert, ajoutez-le à la visite ; vérifiez ses horaires avant de partir.',
      'Découvrez l’Ensanche et ses édifices de l’époque du protectorat, puis passez au Centre d’art moderne installé dans l’ancienne gare si les conditions de visite le permettent. Le Palais royal se contemple depuis le Méchouar ; l’accès intérieur n’est pas présumé.',
    ],
    source: 'Découvrir Tétouan avec l’Office national marocain du tourisme',
    preparation: 'Vérifier les horaires et les conditions de visite des musées ; prévoir des chaussures adaptées aux ruelles pavées.',
  },
  en: {
    title: 'Two days between the medina and Ensanche',
    intro: 'A flexible route through Tetouan’s historic lanes and the façades of its Spanish district. Leave time for breaks and check which visits are open on the day.',
    titles: ['Medina and crafts', 'Ensanche and modern architecture'],
    texts: [
      'Explore the medina on foot and look out for its gates and squares. If the Bab El Okla Ethnographic Museum is open, add it to the visit; check its hours before setting off.',
      'Discover the Ensanche and its buildings from the protectorate period, then visit the Modern Art Centre in the former railway station if access is available. The Royal Palace can be viewed from the Mechouar; interior access is not assumed.',
    ],
    source: 'Explore Tetouan with the Moroccan National Tourist Office',
    preparation: 'Check museum hours and visiting conditions; wear shoes suited to paved lanes.',
  },
  es: {
    title: 'Dos días entre la medina y el Ensanche',
    intro: 'Una ruta flexible por las callejuelas históricas de Tetuán y las fachadas de su barrio español. Deja tiempo para descansar y comprueba qué visitas están abiertas ese día.',
    titles: ['Medina y artesanía', 'Ensanche y arquitectura moderna'],
    texts: [
      'Recorre la medina a pie y fíjate en sus puertas y plazas. Si está abierto el Museo Etnográfico de Bab El Okla, añádelo a la visita; consulta el horario antes de salir.',
      'Descubre el Ensanche y sus edificios de la época del protectorado, y visita después el Centro de Arte Moderno, instalado en la antigua estación, si las condiciones lo permiten. El Palacio Real se contempla desde el Mechouar; no se presupone el acceso al interior.',
    ],
    source: 'Descubrir Tetuán con la Oficina Nacional de Turismo de Marruecos',
    preparation: 'Comprueba los horarios y las condiciones de visita de los museos; lleva calzado adecuado para las calles empedradas.',
  },
  de: {
    title: 'Zwei Tage zwischen Medina und Ensanche',
    intro: 'Eine flexible Route durch die historischen Gassen von Tétouan und die Fassaden des spanischen Viertels. Planen Sie Pausen ein und prüfen Sie, welche Besichtigungen am jeweiligen Tag möglich sind.',
    titles: ['Medina und Kunsthandwerk', 'Ensanche und moderne Architektur'],
    texts: [
      'Erkunden Sie die Medina zu Fuß und achten Sie auf ihre Tore und Plätze. Falls das Ethnografische Museum Bab El Okla geöffnet ist, können Sie es einbeziehen; prüfen Sie die Öffnungszeiten vorab.',
      'Entdecken Sie den Ensanche und seine Bauten aus der Protektoratszeit. Besuchen Sie anschließend das Zentrum für Moderne Kunst im ehemaligen Bahnhof, sofern der Zugang möglich ist. Der Königspalast lässt sich vom Mechouar aus betrachten; ein Zutritt zum Inneren wird nicht vorausgesetzt.',
    ],
    source: 'Tétouan beim marokkanischen Fremdenverkehrsamt entdecken',
    preparation: 'Öffnungszeiten und Besuchsbedingungen der Museen prüfen; geeignetes Schuhwerk für gepflasterte Gassen tragen.',
  },
  ar: {
    title: 'يومان بين المدينة العتيقة والحي الإسباني',
    intro: 'مسار مرن بين أزقة تطوان التاريخية وواجهات حيها الإسباني. اترك وقتاً للاستراحة وتحقّق من المواقع المتاحة للزيارة في ذلك اليوم.',
    titles: ['المدينة العتيقة والصناعات التقليدية', 'الحي الإسباني والعمارة الحديثة'],
    texts: [
      'تجوّل في المدينة العتيقة على قدميك وتأمّل أبوابها وساحاتها. إذا كان متحف باب العقلة الإثنوغرافي مفتوحاً، أضفه إلى الزيارة وتحقّق من مواعيده قبل الانطلاق.',
      'اكتشف الحي الإسباني ومباني فترة الحماية، ثم زر مركز الفن الحديث في محطة القطار القديمة إذا كانت الزيارة متاحة. يمكن مشاهدة القصر الملكي من ساحة المشور؛ ولا نفترض إمكان الدخول إلى داخله.',
    ],
    source: 'اكتشف تطوان مع المكتب الوطني المغربي للسياحة',
    preparation: 'تحقّق من مواعيد المتاحف وشروط زيارتها، وانتعل حذاءً مناسباً للأزقة المرصوفة.',
  },
};
