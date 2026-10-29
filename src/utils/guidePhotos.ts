import type { ImageMetadata } from 'astro';
import type { Locale } from '../i18n';
import type { CategoryId } from '../i18n/categories';
import specific from '../assets/photos/guides/editorial-photos.json';

/** Real photographs only. Source and reuse licence checked on the photographer's page, 28 October 2026. */
const images = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/guides/*.webp', { eager: true });
const subjectImages = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', { eager: true });
const unsplash = 'https://unsplash.com/license';
const photos = {
  housing: {
    author: 'Jakub Żerdzicki', source: "https://unsplash.com/photos/a-person-holding-a-bunch-of-keys-in-their-hand-Ebj87ehFNNU", license: 'Unsplash', licenseUrl: unsplash,
    alt: { fr: 'Une main tenant les clés d’un logement, photo d’illustration', en: 'A hand holding house keys, illustrative photograph', es: 'Una mano con llaves de vivienda, foto ilustrativa', de: 'Eine Hand mit Hausschlüsseln, Symbolfoto', ar: 'يد تحمل مفاتيح منزل، صورة توضيحية' },
  },
  documents: {
    author: 'Guille B', source: "https://unsplash.com/photos/a-man-in-a-suit-signing-a-document-with-a-pen-xYnominUM0I", license: 'Unsplash', licenseUrl: unsplash,
    alt: { fr: 'Signature et lecture de documents sur un bureau, photo d’illustration', en: 'Signing and reading documents at a desk, illustrative photograph', es: 'Firma y lectura de documentos, foto ilustrativa', de: 'Dokumente werden am Schreibtisch unterschrieben, Symbolfoto', ar: 'قراءة وثائق وتوقيعها على مكتب، صورة توضيحية' },
  },
  money: {
    author: 'Mediamodifier', source: "https://unsplash.com/photos/black-calculator-beside-black-pen-on-white-printer-paper-I3HPUolh5hA", license: 'Unsplash', licenseUrl: unsplash,
    alt: { fr: 'Calculatrice, stylo et feuilles pour préparer un budget, photo d’illustration', en: 'Calculator, pen and paper for planning a budget, illustrative photograph', es: 'Calculadora, bolígrafo y papel para un presupuesto, foto ilustrativa', de: 'Taschenrechner, Stift und Papier zur Budgetplanung, Symbolfoto', ar: 'آلة حاسبة وقلم وأوراق لإعداد ميزانية، صورة توضيحية' },
  },
  car: {
    author: 'Ivan Kazlouskij', source: "https://unsplash.com/photos/a-bunch-of-car-keys-sitting-on-the-center-console-of-a-car-b-e-mUl_q68", license: 'Unsplash', licenseUrl: unsplash,
    alt: { fr: 'Clés posées dans l’habitacle d’une voiture, photo d’illustration', en: 'Keys inside a car, illustrative photograph', es: 'Llaves en el interior de un coche, foto ilustrativa', de: 'Schlüssel im Innenraum eines Autos, Symbolfoto', ar: 'مفاتيح داخل سيارة، صورة توضيحية' },
  },
  travel: {
    author: 'Marissa Grootes', source: "https://unsplash.com/photos/open-suitcase-with-travel-essentials-and-hat-TVllFyGaLEA", license: 'Unsplash', licenseUrl: unsplash,
    alt: { fr: 'Valise ouverte avec vêtements, chapeau et appareil photo, photo d’illustration', en: 'Open suitcase with clothes, hat and camera, illustrative photograph', es: 'Maleta abierta con ropa, sombrero y cámara, foto ilustrativa', de: 'Offener Koffer mit Kleidung, Hut und Kamera, Symbolfoto', ar: 'حقيبة مفتوحة تضم ملابس وقبعة وآلة تصوير، صورة توضيحية' },
  },
  ferry: {
    author: 'Bertrand SOUBEYRAND', source: 'https://commons.wikimedia.org/wiki/File:Le_cruise-ferry_Excellent_de_GNV_dans_le_port_de_Tanger_MED_au_Maroc_le_30-10-2023.jpg', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    alt: { fr: 'Le ferry Excellent amarré au port de Tanger Med, le 30 octobre 2023', en: 'The ferry Excellent at Tanger Med port on 30 October 2023', es: 'El ferry Excellent en el puerto de Tánger Med el 30 de octubre de 2023', de: 'Die Fähre Excellent im Hafen Tanger Med am 30. Oktober 2023', ar: 'باخرة إكسيلنت راسية بميناء طنجة المتوسط يوم 30 أكتوبر 2023' },
  },
  flag: {
    author: 'Mees Hofland', source: "https://unsplash.com/photos/moroccan-flag-hangs-on-a-clay-building-in-desert-landscape-xNs31EGSq2M", license: 'Unsplash', licenseUrl: unsplash,
    alt: { fr: 'Drapeau marocain sur un bâtiment en terre à Agafay, photo d’illustration', en: 'Moroccan flag on an earthen building in Agafay, illustrative photograph', es: 'Bandera marroquí en un edificio de tierra en Agafay, foto ilustrativa', de: 'Marokkanische Flagge an einem Lehmgebäude in Agafay, Symbolfoto', ar: 'علم مغربي على بناية ترابية بأكفاي، صورة توضيحية' },
  },
  life: {
    author: 'Luigi Ritchie', source: "https://unsplash.com/photos/close-up-of-elderly-hands-clasped-together-EljMmcGmeGA", license: 'Unsplash', licenseUrl: unsplash,
    alt: { fr: 'Mains jointes d’une personne âgée, photo d’illustration', en: 'An older person’s clasped hands, illustrative photograph', es: 'Manos juntas de una persona mayor, foto ilustrativa', de: 'Gefaltete Hände einer älteren Person, Symbolfoto', ar: 'يدان متشابكتان لشخص مسن، صورة توضيحية' },
  },
};

export function getGuidePhoto(key: string, category: CategoryId, lang: Locale) {
  const subject = (specific as Record<string, {file: string; credit: string; license: string; source: string}>)[key];
  if (subject) {
    const src = subjectImages[`../assets/photos/${subject.file}`]?.default;
    if (!src) throw new Error(`Missing guide subject photograph: ${subject.file}`);
    const cc = subject.license.match(/^CC (BY(?:-SA)?) ([\d.]+)$/);
    const licenseUrl = cc ? `https://creativecommons.org/licenses/${cc[1].toLowerCase()}/${cc[2]}/` : subject.license === 'CC0' ? 'https://creativecommons.org/publicdomain/zero/1.0/' : 'https://creativecommons.org/publicdomain/mark/1.0/';
    // These photographs illustrate the adjacent guide heading; they add no separate instructional content.
    return {src, alt: '', credit: subject.credit, source: subject.source, license: subject.license, licenseUrl};
  }
  let id: keyof typeof photos | undefined;
  if (/military-service/.test(key)) id = 'flag';
  else if (/life-certificate|retire-in-morocco/.test(key)) id = 'life';
  else if (/car|driving-licence|motorway/.test(key)) id = 'car';
  else if (/marhaba|ferry/.test(key)) id = 'ferry';
  else if (/checklist|permanent-return|kids-pets|cheap-flights|parcels-moving/.test(key)) id = 'travel';
  else if (category === 'money' || /mortgage|property-taxes/.test(key)) id = 'money';
  else if (/buy-property|daam-sakane|short-term-rental|rent-long-term/.test(key)) id = 'housing';
  else if (category === 'demarches' || /power-of-attorney|property-inheritance/.test(key)) id = 'documents';
  if (!id) return null;
  const hit = images[`../assets/photos/guides/${id}.webp`];
  if (!hit) throw new Error(`Missing licensed guide photograph: ${id}`);
  const p = photos[id];
  return { src: hit.default, alt: p.alt[lang], credit: p.author, source: p.source, license: p.license, licenseUrl: p.licenseUrl };
}
