import type { Locale } from '../i18n';

export const PDF_WORDS = {
  fr: ['Télécharger le carnet PDF', 'Préparation du PDF…', 'PDF prêt pour l’impression.', 'Impossible de préparer le PDF. Vérifiez votre connexion et réessayez.', 'Mon carnet de voyage', 'Liste de favoris. Les guides complets sont à consulter en ligne.', 'Préparé le'],
  en: ['Download notebook PDF', 'Preparing PDF…', 'PDF ready to print.', 'Unable to prepare the PDF. Check your connection and try again.', 'My travel notebook', 'Favourites list. Read the full guides online.', 'Prepared on'],
  es: ['Descargar cuaderno PDF', 'Preparando el PDF…', 'PDF listo para imprimir.', 'No se pudo preparar el PDF. Comprueba la conexión e inténtalo de nuevo.', 'Mi cuaderno de viaje', 'Lista de favoritos. Consulta las guías completas en línea.', 'Preparado el'],
  de: ['Reiseheft als PDF herunterladen', 'PDF wird vorbereitet…', 'PDF ist zum Drucken bereit.', 'PDF konnte nicht erstellt werden. Prüfen Sie die Verbindung und versuchen Sie es erneut.', 'Mein Reiseheft', 'Favoritenliste. Die vollständigen Reiseführer finden Sie online.', 'Erstellt am'],
  ar: ['تنزيل الدفتر بصيغة PDF', 'جارٍ إعداد PDF…', 'ملف PDF جاهز للطباعة.', 'تعذّر إعداد PDF. تحقّق من الاتصال وأعد المحاولة.', 'دفتر رحلتي', 'قائمة المفضلة. تتوفر الأدلة الكاملة على الموقع.', 'تاريخ الإعداد'],
} satisfies Record<Locale, string[]>;

