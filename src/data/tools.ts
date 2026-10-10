/**
 * Catalogue des calculateurs (accueil, page hub, pages calculateurs, maillage interne).
 * Chaque outil documente sa méthode, ses hypothèses, ses sources et la date de vérification
 * de ses valeurs par défaut : un résultat chiffré n'est jamais affiché sans son contexte.
 */
import type { Locale } from '../i18n/config';
import type { IconName } from './icons';
import { MRE_LAST_CHECKED } from '../config/mre';
import { COSTS_LAST_UPDATED } from '../config/costs';
import { EUR_TO_MAD_DATE } from '../config/site';
import { CUSTOMS_LAST_CHECKED } from '../config/customs';

type T = Record<Locale, string>;

export interface Tool {
  key: string; // translationKey de la page du calculateur
  icon: IconName;
  audience: 'mre' | 'visitors';
  title: T;
  text: T;
  /** Méthode de calcul, en une ou deux phrases */
  method: T;
  /** Hypothèses principales */
  assumptions: Record<Locale, string[]>;
  /** Organismes officiels (id de src/data/sources.ts) */
  sources: string[];
  /** Date de vérification des valeurs par défaut (ISO) */
  checked: string;
  /** Guide lié (translationKey) */
  guideKey: string;
}

export const TOOLS: Tool[] = [
  {
    key: 'calc-property-fees', icon: 'home', audience: 'mre', guideKey: 'buy-property-abroad', checked: MRE_LAST_CHECKED, sources: ['ancfcc', 'dgi', 'daamsakane'],
    title: { en: 'Property buying costs', fr: 'Frais d’achat immobilier', es: 'Gastos de compra de vivienda', de: 'Kaufnebenkosten Immobilie', ar: 'مصاريف شراء العقار' },
    text: { en: 'Registration, land registry, notary and Daam Sakane aid.', fr: 'Enregistrement, conservation foncière, notaire et aide Daam Sakane.', es: 'Registro, registro de la propiedad, notario y ayuda Daam Sakane.', de: 'Registrierung, Grundbuch, Notar und Förderung Daam Sakane.', ar: 'التسجيل، المحافظة العقارية، الموثق ودعم السكن.' },
    method: {
      fr: 'Chaque frais est un pourcentage du prix (taux modifiables), plus un montant fixe pour la conservation foncière et un minimum pour le notaire, TVA comprise. L’aide Daam Sakane est déduite si vous cochez la case et que le prix respecte le plafond.',
      en: 'Each fee is a percentage of the price (editable rates), plus a fixed amount for the land registry and a minimum notary fee, VAT included. Daam Sakane aid is deducted if you tick the box and the price is under the ceiling.',
      es: 'Cada gasto es un porcentaje del precio (tasas editables), más un importe fijo para el registro de la propiedad y un mínimo para el notario, IVA incluido. La ayuda Daam Sakane se descuenta si marcas la casilla y el precio respeta el límite.',
      de: 'Jede Gebühr ist ein Prozentsatz des Preises (änderbare Sätze), plus ein Fixbetrag fürs Grundbuch und eine Mindestgebühr für den Notar inkl. MwSt. Die Förderung Daam Sakane wird abgezogen, wenn das Kästchen aktiv ist und der Preis unter der Obergrenze liegt.',
      ar: 'كل مصروف هو نسبة من السعر (نسب قابلة للتعديل)، مع مبلغ ثابت للمحافظة العقارية وحد أدنى لأتعاب الموثق شاملة الضريبة. يُخصم دعم السكن إذا فعّلت الخانة وكان السعر تحت السقف.',
    },
    assumptions: {
      fr: ['Droits d’enregistrement : 4 % pour un logement (taux différent pour un terrain ou un local commercial)', 'Conservation foncière : 1,5 % + 200 DH', 'Notaire : environ 1 % (minimum usuel 4 000 DH) + TVA 20 %', 'Daam Sakane : 100 000 DH jusqu’à 300 000 DH, 70 000 DH jusqu’à 700 000 DH (logement neuf, première acquisition)'],
      en: ['Registration duty: 4% for a home (a different rate applies to land or commercial premises)', 'Land registry: 1.5% + 200 MAD', 'Notary: about 1% (usual minimum 4,000 MAD) + 20% VAT', 'Daam Sakane: 100,000 MAD up to 300,000 MAD, 70,000 MAD up to 700,000 MAD (new home, first purchase)'],
      es: ['Impuesto de registro: 4 % para una vivienda (otra tasa para terrenos o locales)', 'Registro de la propiedad: 1,5 % + 200 MAD', 'Notario: alrededor del 1 % (mínimo habitual 4.000 MAD) + IVA del 20 %', 'Daam Sakane: 100.000 MAD hasta 300.000 MAD, 70.000 MAD hasta 700.000 MAD (vivienda nueva, primera compra)'],
      de: ['Registrierungsgebühr: 4 % für Wohnimmobilien (anderer Satz für Grundstücke oder Gewerbe)', 'Grundbuch: 1,5 % + 200 MAD', 'Notar: etwa 1 % (übliches Minimum 4.000 MAD) + 20 % MwSt.', 'Daam Sakane: 100.000 MAD bis 300.000 MAD, 70.000 MAD bis 700.000 MAD (Neubau, Ersterwerb)'],
      ar: ['رسوم التسجيل: 4% للسكن (نسبة مختلفة للأرض أو المحل التجاري)', 'المحافظة العقارية: 1.5% + 200 درهم', 'الموثق: حوالي 1% (حد أدنى معتاد 4000 درهم) + ضريبة 20%', 'دعم السكن: 100000 درهم حتى 300000 درهم، و70000 درهم حتى 700000 درهم (سكن جديد، أول اقتناء)'],
    },
  },
  {
    key: 'calc-mortgage', icon: 'landmark', audience: 'mre', guideKey: 'mre-mortgage', checked: MRE_LAST_CHECKED, sources: ['bkam'],
    title: { en: 'Mortgage simulator', fr: 'Simulateur de crédit immobilier', es: 'Simulador de hipoteca', de: 'Baufinanzierungsrechner', ar: 'محاكي القرض العقاري' },
    text: { en: 'Monthly payment, interest and share of your income.', fr: 'Mensualité, coût des intérêts et part de vos revenus.', es: 'Cuota mensual, intereses y parte de tus ingresos.', de: 'Monatsrate, Zinskosten und Anteil am Einkommen.', ar: 'القسط الشهري وكلفة الفوائد ونسبة الدخل.' },
    method: {
      fr: 'Mensualité calculée avec la formule classique du prêt amortissable à taux fixe (mensualités constantes) sur le montant emprunté (prix moins apport).',
      en: 'Monthly payment computed with the standard fixed-rate amortising loan formula (constant payments) on the borrowed amount (price minus down payment).',
      es: 'Cuota calculada con la fórmula clásica del préstamo amortizable a tipo fijo (cuotas constantes) sobre el importe prestado (precio menos aportación).',
      de: 'Monatsrate nach der klassischen Annuitätenformel mit festem Zins (gleichbleibende Raten) auf den Kreditbetrag (Preis minus Eigenkapital).',
      ar: 'يُحسب القسط بصيغة القرض الكلاسيكي بسعر ثابت وأقساط متساوية، على المبلغ المقترض (السعر ناقص المساهمة الشخصية).',
    },
    assumptions: {
      fr: ['Taux et durée saisis par vous : le taux par défaut est un exemple, pas une offre', 'Hors assurance emprunteur, frais de dossier et garanties', 'Taux fixe sur toute la durée'],
      en: ['Rate and term are yours to enter: the default rate is an example, not an offer', 'Excludes borrower insurance, arrangement fees and guarantees', 'Fixed rate over the whole term'],
      es: ['Tipo y plazo los introduces tú: el tipo por defecto es un ejemplo, no una oferta', 'Sin seguro de préstamo, comisiones ni garantías', 'Tipo fijo durante todo el plazo'],
      de: ['Zins und Laufzeit gibst du ein: Der Standardzins ist ein Beispiel, kein Angebot', 'Ohne Kreditversicherung, Bearbeitungsgebühren und Sicherheiten', 'Fester Zins über die gesamte Laufzeit'],
      ar: ['السعر والمدة تدخلهما أنت: السعر الافتراضي مثال وليس عرضاً', 'دون تأمين القرض ورسوم الملف والضمانات', 'سعر ثابت طوال المدة'],
    },
  },
  {
    key: 'calc-transfer', icon: 'send', audience: 'mre', guideKey: 'send-money', checked: EUR_TO_MAD_DATE, sources: ['bkam', 'oc'],
    title: { en: 'Real cost of a money transfer', fr: 'Coût réel d’un transfert d’argent', es: 'Coste real de una transferencia', de: 'Echte Kosten einer Überweisung', ar: 'التكلفة الحقيقية للتحويل' },
    text: { en: 'Fees + hidden exchange-rate margin, in one number.', fr: 'Frais + marge cachée sur le taux, en un seul chiffre.', es: 'Comisión + margen oculto del tipo de cambio, en una sola cifra.', de: 'Gebühr + versteckte Kursmarge in einer Zahl.', ar: 'الرسوم + الهامش الخفي في سعر الصرف، في رقم واحد.' },
    method: {
      fr: 'Le coût caché est l’écart entre le montant au taux de référence et le montant au taux proposé, converti en euros ; on y ajoute les frais affichés.',
      en: 'The hidden cost is the gap between the amount at the reference rate and the amount at the offered rate, converted to euros; the displayed fee is added on top.',
      es: 'El coste oculto es la diferencia entre el importe al tipo de referencia y el importe al tipo ofrecido, convertida a euros; se le suma la comisión mostrada.',
      de: 'Die versteckten Kosten sind die Differenz zwischen dem Betrag zum Referenzkurs und dem zum angebotenen Kurs, umgerechnet in Euro; die angezeigte Gebühr kommt hinzu.',
      ar: 'التكلفة الخفية هي الفرق بين المبلغ بسعر الصرف المرجعي والمبلغ بالسعر المعروض، محولاً إلى الأورو؛ وتضاف إليه الرسوم المعروضة.',
    },
    assumptions: {
      fr: ['Frais prélevés en plus du montant envoyé (cas le plus courant)', 'Taux par défaut indicatif (1 € ≈ 11 DH) : saisissez le taux du jour', 'Ne tient pas compte des frais éventuels côté bénéficiaire'],
      en: ['Fees charged on top of the amount sent (the most common case)', 'Indicative default rate (1 € ≈ 11 MAD): enter today’s rate', 'Does not include any fees charged to the recipient'],
      es: ['Comisión cobrada aparte del importe enviado (el caso más habitual)', 'Tipo por defecto orientativo (1 € ≈ 11 MAD): introduce el tipo del día', 'No incluye posibles gastos del lado del beneficiario'],
      de: ['Gebühr zusätzlich zum gesendeten Betrag (häufigster Fall)', 'Richtkurs als Standard (1 € ≈ 11 MAD): den Tageskurs eingeben', 'Ohne eventuelle Gebühren beim Empfänger'],
      ar: ['الرسوم تُقتطع إضافة إلى المبلغ المرسل (الحالة الأكثر شيوعاً)', 'سعر افتراضي تقريبي (1 € ≈ 11 درهم): أدخل سعر اليوم', 'لا يشمل الرسوم المحتملة لدى المستفيد'],
    },
  },
  {
    key: 'calc-summer', icon: 'ship', audience: 'mre', guideKey: 'marhaba-guide', checked: EUR_TO_MAD_DATE, sources: [],
    title: { en: 'Summer-in-Morocco budget', fr: 'Budget été au bled', es: 'Presupuesto de verano en Marruecos', de: 'Sommerbudget Marokko', ar: 'ميزانية الصيف في البلاد' },
    text: { en: 'Ferry or plane, days, spending and gifts for the family.', fr: 'Ferry ou avion, durée, dépenses et cadeaux pour la famille.', es: 'Ferri o avión, días, gastos y regalos para la familia.', de: 'Fähre oder Flug, Tage, Ausgaben und Geschenke für die Familie.', ar: 'عبّارة أو طائرة، المدة، المصاريف وهدايا العائلة.' },
    method: {
      fr: 'Addition de vos postes : transport (ferry et carburant, ou billets d’avion et location), dépenses quotidiennes multipliées par le nombre de jours et cadeaux, convertie en dirhams.',
      en: 'Adds up your items: transport (ferry and fuel, or flights and car hire), daily spending times the number of days, and gifts, converted to dirhams.',
      es: 'Suma de tus partidas: transporte (ferri y combustible, o vuelos y alquiler), gasto diario por número de días y regalos, convertido a dírhams.',
      de: 'Summe deiner Posten: Anreise (Fähre und Sprit oder Flüge und Mietwagen), Tagesausgaben mal Anzahl Tage und Geschenke, umgerechnet in Dirham.',
      ar: 'جمع بنودك: النقل (العبّارة والوقود أو تذاكر الطائرة والكراء)، المصاريف اليومية مضروبة في عدد الأيام والهدايا، محولة إلى الدرهم.',
    },
    assumptions: {
      fr: ['Toutes les valeurs par défaut sont des exemples à remplacer par vos devis', 'Conversion au taux indicatif 1 € ≈ 11 DH'],
      en: ['All default values are examples: replace them with your own quotes', 'Converted at the indicative rate 1 € ≈ 11 MAD'],
      es: ['Todos los valores por defecto son ejemplos: sustitúyelos por tus presupuestos', 'Conversión al tipo orientativo 1 € ≈ 11 MAD'],
      de: ['Alle Standardwerte sind Beispiele: durch eigene Angebote ersetzen', 'Umrechnung zum Richtkurs 1 € ≈ 11 MAD'],
      ar: ['كل القيم الافتراضية أمثلة: عوضها بعروضك الخاصة', 'التحويل بالسعر التقريبي 1 € ≈ 11 درهم'],
    },
  },
  {
    key: 'calc-retirement-budget', icon: 'home', audience: 'mre', guideKey: 'retire-in-morocco', checked: COSTS_LAST_UPDATED, sources: ['dgi', 'mremin'],
    title: { en: 'Retirement budget in Morocco', fr: 'Budget de retraite au Maroc', es: 'Presupuesto de jubilación en Marruecos', de: 'Ruhestandsbudget Marokko', ar: 'ميزانية التقاعد في المغرب' },
    text: { en: 'Estimate your monthly cost of living and compare it with the net pension you enter.', fr: 'Estimez votre coût de vie mensuel et comparez-le à la pension nette que vous saisissez.', es: 'Estima tu coste de vida mensual y compáralo con la pensión neta que introduces.', de: 'Schätzen Sie Ihre monatlichen Lebenshaltungskosten und vergleichen Sie sie mit der eingegebenen Netto-Rente.', ar: 'قدّر تكلفة معيشتك الشهرية وقارنها بالمعاش الصافي الذي تدخله.' },
    method: {
      fr: 'Addition de vos postes (logement, alimentation, transport, santé, énergie et télécoms, loisirs) plus une marge d’imprévus en pourcentage, convertie dans la devise et la périodicité choisies. La pension nette que vous saisissez est ensuite comparée à ce budget : solde et taux de couverture. Aucun impôt n’est calculé.',
      en: 'Adds up your items (housing, food, transport, health, energy and telecoms, leisure) plus a contingency margin as a percentage, converted to the currency and period you choose. The net pension you enter is then compared with that budget: balance and coverage rate. No tax is calculated.',
      es: 'Suma de tus partidas (vivienda, alimentación, transporte, salud, energía y telecomunicaciones, ocio) más un margen de imprevistos en porcentaje, convertida a la divisa y periodicidad elegidas. La pensión neta que introduces se compara con ese presupuesto: saldo y tasa de cobertura. No se calcula ningún impuesto.',
      de: 'Summe Ihrer Posten (Wohnen, Ernährung, Verkehr, Gesundheit, Energie und Telekommunikation, Freizeit) plus eine prozentuale Reserve für Unvorhergesehenes, umgerechnet in die gewählte Währung und den gewählten Zeitraum. Die eingegebene Netto-Rente wird mit diesem Budget verglichen: Saldo und Deckungsgrad. Es werden keine Steuern berechnet.',
      ar: 'جمع بنودك (السكن، التغذية، النقل، الصحة، الطاقة والاتصالات، الترفيه) مع هامش للطوارئ بنسبة مئوية، محولاً إلى العملة والدورية التي تختارها. ثم يُقارن المعاش الصافي الذي تدخله بهذه الميزانية: الرصيد ونسبة التغطية. لا تُحسب أي ضريبة.',
    },
    assumptions: {
      fr: ['Valeurs de départ tirées d’estimations de coûts datées, à remplacer par vos chiffres ; santé, énergie/eau/internet/téléphone et imprévus : exemples modifiables', 'Pension saisie par vous, nette et stable : aucun impôt ni avantage fiscal n’est calculé', 'Taux indicatif 1 € ≈ 11 DH ; un mois = 30 jours'],
      en: ['Starting values come from dated cost estimates: replace them with your own figures; health, energy/water/internet/phone and contingency are editable examples', 'Pension entered by you, net and stable: no tax or tax advantage is calculated', 'Indicative rate €1 ≈ 11 MAD; one month = 30 days'],
      es: ['Los valores iniciales proceden de estimaciones de costes fechadas: sustitúyelos por tus cifras; salud, energía/agua/internet/teléfono e imprevistos son ejemplos editables', 'Pensión introducida por ti, neta y estable: no se calcula ningún impuesto ni ventaja fiscal', 'Tipo orientativo 1 € ≈ 11 MAD; un mes = 30 días'],
      de: ['Die Startwerte stammen aus datierten Kostenschätzungen: durch eigene Zahlen ersetzen; Gesundheit, Energie/Wasser/Internet/Telefon und Unvorhergesehenes sind änderbare Beispiele', 'Von Ihnen eingegebene Rente, netto und stabil: Steuern oder Steuervorteile werden nicht berechnet', 'Richtkurs 1 € ≈ 11 MAD; ein Monat = 30 Tage'],
      ar: ['القيم الابتدائية مأخوذة من تقديرات تكاليف مؤرخة: عوّضها بأرقامك؛ الصحة والطاقة/الماء/الإنترنت/الهاتف والطوارئ أمثلة قابلة للتعديل', 'المعاش من إدخالك، صافٍ وثابت: لا تُحسب أي ضريبة أو امتياز ضريبي', 'سعر تقريبي 1 € ≈ 11 درهم؛ الشهر = 30 يوماً'],
    },
  },
  {
    key: 'calc-car-days', icon: 'car', audience: 'mre', guideKey: 'car-180-days', checked: MRE_LAST_CHECKED, sources: ['douane'],
    title: { en: '180-day car counter', fr: 'Compteur des 180 jours (voiture)', es: 'Contador de 180 días (coche)', de: '180-Tage-Zähler (Auto)', ar: 'عداد 180 يوماً للسيارة' },
    text: { en: 'How many days your foreign-plated car has left this year.', fr: 'Combien de jours il reste à votre voiture immatriculée à l’étranger.', es: 'Cuántos días le quedan este año a tu coche con matrícula extranjera.', de: 'Wie viele Tage dein Auto mit ausländischem Kennzeichen dieses Jahr noch hat.', ar: 'كم يوماً بقي لسيارتك ذات الترقيم الأجنبي هذه السنة.' },
    method: {
      fr: 'Somme des jours passés au Maroc pour chaque séjour de l’année civile (jour d’entrée et jour de sortie inclus), comparée au plafond de 180 jours.',
      en: 'Adds up the days spent in Morocco for each stay in the calendar year (entry and exit days included) and compares them with the 180-day limit.',
      es: 'Suma de los días pasados en Marruecos en cada estancia del año natural (día de entrada y de salida incluidos), comparada con el límite de 180 días.',
      de: 'Summe der Tage in Marokko pro Aufenthalt im Kalenderjahr (Ein- und Ausreisetag inklusive), verglichen mit der Grenze von 180 Tagen.',
      ar: 'جمع الأيام التي قضيتها في المغرب في كل إقامة خلال السنة الميلادية (يوم الدخول ويوم الخروج محسوبان)، ومقارنتها بسقف 180 يوماً.',
    },
    assumptions: {
      fr: ['Règle générale de l’admission temporaire : 180 jours par année civile, en une ou plusieurs fois', 'Les cas particuliers (prolongation, fin d’année, statut de résident) relèvent de la douane'],
      en: ['General temporary-admission rule: 180 days per calendar year, in one or several stays', 'Special cases (extension, year-end, resident status) are for customs to decide'],
      es: ['Regla general de admisión temporal: 180 días por año natural, en una o varias estancias', 'Los casos particulares (prórroga, fin de año, residencia) los decide la aduana'],
      de: ['Allgemeine Regel der vorübergehenden Einfuhr: 180 Tage pro Kalenderjahr, in einem oder mehreren Aufenthalten', 'Sonderfälle (Verlängerung, Jahresende, Wohnsitz) entscheidet der Zoll'],
      ar: ['القاعدة العامة للقبول المؤقت: 180 يوماً في السنة الميلادية، دفعة واحدة أو على عدة مرات', 'الحالات الخاصة (التمديد، نهاية السنة، صفة المقيم) تحسم فيها الجمارك'],
    },
  },
  {
    key: 'calc-customs', icon: 'calculator', audience: 'mre', guideKey: 'import-car-permanent-return', checked: CUSTOMS_LAST_CHECKED, sources: ['douane', 'mremin', 'narsa'],
    title: { en: 'Car customs clearance costs', fr: 'Frais de dédouanement d’une voiture', es: 'Costes de despacho aduanero de un coche', de: 'Zollkosten für ein Auto', ar: 'تكاليف التخليص الجمركي لسيارة' },
    text: { en: 'Duties and VAT on a car brought to Morocco, with the 90% abatement if you qualify.', fr: 'Droits et TVA sur une voiture importée au Maroc, avec l’abattement de 90 % si vous y avez droit.', es: 'Derechos e IVA de un coche llevado a Marruecos, con el abatimiento del 90 % si cumples las condiciones.', de: 'Zoll und Mehrwertsteuer für ein nach Marokko gebrachtes Auto, mit dem 90-%-Abschlag bei Anspruch.', ar: 'الرسوم والضريبة على القيمة المضافة لسيارة تُدخل إلى المغرب، مع تخفيض 90% إن كنت مؤهلاً.' },
    method: {
      fr: 'Vous saisissez la valeur retenue par la douane. L’outil en déduit l’abattement (90 % jusqu’à 300 000 DH si les conditions sont remplies), puis applique le droit d’importation et la taxe parafiscale sur la base obtenue, et la TVA sur base + droits. Chaque ligne est arrondie au dirham.',
      en: 'You enter the value customs has set. The tool deducts the abatement (90% up to 300,000 MAD if the conditions are met), then applies import duty and the parafiscal tax to the resulting base, and VAT on base + duties. Each line is rounded to the dirham.',
      es: 'Introduces el valor fijado por la aduana. La herramienta descuenta el abatimiento (90 % hasta 300.000 MAD si se cumplen las condiciones), aplica el derecho de importación y la tasa parafiscal a la base resultante y el IVA sobre base + derechos. Cada línea se redondea al dírham.',
      de: 'Du gibst den vom Zoll festgesetzten Wert ein. Das Tool zieht den Abschlag ab (90 % bis 300.000 MAD bei erfüllten Voraussetzungen), wendet Einfuhrzoll und parafiskalische Abgabe auf die entstandene Grundlage an und die Umsatzsteuer auf Grundlage + Abgaben. Jede Zeile wird auf den Dirham gerundet.',
      ar: 'تُدخل القيمة التي حددتها الجمارك. تخصم الأداة التخفيض (90% حتى 300000 درهم إذا استوفيت الشروط)، ثم تطبق رسم الاستيراد والضريبة شبه الجبائية على الوعاء الناتج، والضريبة على القيمة المضافة على الوعاء + الرسوم. يُقرَّب كل سطر إلى الدرهم.',
    },
    assumptions: {
      fr: ['La valeur retenue et le barème d’âge relèvent de la douane : l’outil ne les détermine pas', 'TVA 20 % ; taxe parafiscale 0,25 % ; droit d’importation indicatif (17,5 % thermique, 2,5 % hybride ou électrique), à confirmer auprès de l’ADII', 'Hors frais de transitaire, transport, droit de timbre sur les voitures de valeur élevée, carte grise, vignette et assurance'],
      en: ['The value used and any age-based scale are for customs to set: the tool does not determine them', 'VAT 20%; parafiscal tax 0.25%; indicative import duty (17.5% petrol or diesel, 2.5% hybrid or electric), to confirm with ADII', 'Excludes broker fees, transport, stamp duty on high-value cars, registration card, annual vehicle tax and insurance'],
      es: ['El valor considerado y la escala por antigüedad corresponden a la aduana: la herramienta no los determina', 'IVA 20 %; tasa parafiscal 0,25 %; derecho de importación orientativo (17,5 % gasolina o diésel, 2,5 % híbrido o eléctrico), a confirmar con la ADII', 'Sin honorarios de transitario, transporte, impuesto de timbre sobre coches de alto valor, permiso de circulación, viñeta ni seguro'],
      de: ['Angesetzter Wert und eine eventuelle Alterstabelle bestimmt der Zoll: das Tool legt sie nicht fest', 'MwSt. 20 %; parafiskalische Abgabe 0,25 %; Richtsatz Einfuhrzoll (17,5 % Benzin/Diesel, 2,5 % Hybrid/Elektro), bei der ADII zu bestätigen', 'Ohne Zollagent, Transport, Stempelsteuer auf hochwertige Pkw, Zulassung, Vignette und Versicherung'],
      ar: ['القيمة المعتمدة وأي سلّم حسب العمر من اختصاص الجمارك: الأداة لا تحددها', 'ضريبة القيمة المضافة 20%؛ الضريبة شبه الجبائية 0.25%؛ رسم استيراد إرشادي (17.5% للبنزين أو الديزل و2.5% للهجينة أو الكهربائية)، يؤكد لدى إدارة الجمارك', 'دون أتعاب الوسيط الجمركي والنقل ورسم الطابع على السيارات مرتفعة القيمة والبطاقة الرمادية والملصق والتأمين'],
    },
  },
  {
    key: 'prayer-times', icon: 'sunrise', audience: 'visitors', guideKey: 'time-zone', checked: '2026-10-10', sources: ['habous'],
    title: { en: 'Prayer times in Morocco', fr: 'Horaires de prière au Maroc', es: 'Horarios de oración en Marruecos', de: 'Gebetszeiten in Marokko', ar: 'مواقيت الصلاة بالمغرب' },
    text: { en: 'Fajr to Isha for 35 Moroccan cities, with next-prayer countdown.', fr: 'Du Fajr à l’Icha pour 35 villes marocaines, avec la prochaine prière.', es: 'Del Fajr al Isha en 35 ciudades marroquíes, con cuenta atrás.', de: 'Von Fadschr bis Ischa für 35 marokkanische Städte, mit Countdown.', ar: 'من الفجر إلى العشاء لـ35 مدينة مغربية مع العدّ التنازلي للصلاة القادمة.' },
    method: {
      fr: 'Calcul astronomique effectué dans votre navigateur à partir des coordonnées de la ville (déclinaison du soleil et équation du temps), avec les paramètres de la méthode du ministère des Habous : Fajr à 19°, Icha à 17°, Asr à l’ombre simple (rite malékite), ajustements de −3 min au Chourouq et +5 min au Dhohr et au Maghrib. Aucune donnée n’est envoyée.',
      en: 'Astronomical calculation run in your browser from the city coordinates (solar declination and equation of time), using the Moroccan Ministry of Habous method: Fajr at 19°, Isha at 17°, Asr at single shadow length (Maliki school), adjustments of −3 min for sunrise and +5 min for Dhuhr and Maghrib. No data is sent anywhere.',
      es: 'Cálculo astronómico hecho en tu navegador a partir de las coordenadas de la ciudad (declinación solar y ecuación del tiempo), con los parámetros del método del Ministerio de Habous: Fajr a 19°, Isha a 17°, Asr con sombra simple (rito malikí), ajustes de −3 min en el amanecer y +5 min en Dhuhr y Magrib. No se envía ningún dato.',
      de: 'Astronomische Berechnung in deinem Browser aus den Koordinaten der Stadt (Sonnendeklination und Zeitgleichung) mit den Parametern der Methode des marokkanischen Habous-Ministeriums: Fadschr bei 19°, Ischa bei 17°, Asr bei einfacher Schattenlänge (malikitische Schule), Anpassungen von −3 Min. beim Sonnenaufgang und +5 Min. bei Dhuhr und Maghrib. Es werden keine Daten gesendet.',
      ar: 'حساب فلكي يتم في متصفحك انطلاقاً من إحداثيات المدينة (ميل الشمس ومعادلة الزمن) بمعايير وزارة الأوقاف المغربية: الفجر عند 19°، العشاء عند 17°، العصر بظل المثل (المذهب المالكي)، مع تعديلات: −3 دقائق للشروق و+5 دقائق للظهر والمغرب. لا تُرسل أي بيانات.',
    },
    assumptions: {
      fr: ['Horaires calculés : ils peuvent différer de quelques minutes du calendrier officiel du ministère des Habous et des Affaires islamiques, seul à faire foi', 'Écart constaté avec le calendrier officiel pour 7 villes (octobre 2026) : 1 minute au maximum', 'Heure légale du Maroc, GMT+0 depuis le 20 septembre 2026 (voir notre guide du fuseau horaire)', 'La date hégirienne affichée est indicative (calendrier Umm al-Qura) : la date officielle dépend de l’observation de la lune'],
      en: ['Calculated times: they can differ by a few minutes from the official calendar of the Ministry of Habous and Islamic Affairs, which is the only authoritative source', 'Gap with the official calendar for 7 cities (October 2026): 1 minute at most', 'Moroccan legal time, GMT+0 since 20 September 2026 (see our time zone guide)', 'The Hijri date shown is indicative (Umm al-Qura calendar): the official date depends on moon sighting'],
      es: ['Horarios calculados: pueden diferir unos minutos del calendario oficial del Ministerio de Habous y Asuntos Islámicos, el único que hace fe', 'Diferencia con el calendario oficial en 7 ciudades (octubre de 2026): 1 minuto como máximo', 'Hora legal de Marruecos, GMT+0 desde el 20 de septiembre de 2026 (consulta nuestra guía del huso horario)', 'La fecha hegirana mostrada es orientativa (calendario Umm al-Qura): la fecha oficial depende de la observación de la luna'],
      de: ['Berechnete Zeiten: Sie können um einige Minuten vom offiziellen Kalender des Ministeriums für Habous und islamische Angelegenheiten abweichen, der allein maßgeblich ist', 'Abweichung zum offiziellen Kalender in 7 Städten (Oktober 2026): höchstens 1 Minute', 'Marokkanische Normalzeit, GMT+0 seit dem 20. September 2026 (siehe unseren Zeitzonen-Ratgeber)', 'Das angezeigte Hidschri-Datum ist ein Richtwert (Umm-al-Qura-Kalender): Das offizielle Datum hängt von der Mondsichtung ab'],
      ar: ['مواقيت محسوبة: قد تختلف بضع دقائق عن التقويم الرسمي لوزارة الأوقاف والشؤون الإسلامية، وهو وحده المعتمد', 'الفارق مع التقويم الرسمي في 7 مدن (أكتوبر 2026): دقيقة واحدة على الأكثر', 'التوقيت القانوني للمغرب، GMT+0 منذ 20 شتنبر 2026 (راجع دليلنا حول المنطقة الزمنية)', 'التاريخ الهجري المعروض تقريبي (تقويم أم القرى): التاريخ الرسمي يعتمد على رؤية الهلال'],
    },
  },
  {
    key: 'budget-calculator', icon: 'luggage', audience: 'visitors', guideKey: 'cost-of-living', checked: COSTS_LAST_UPDATED, sources: [],
    title: { en: 'Trip & monthly budget', fr: 'Budget voyage ou mensuel', es: 'Presupuesto de viaje o mensual', de: 'Reise- oder Monatsbudget', ar: 'ميزانية الرحلة أو الشهر' },
    text: { en: 'Cost of a trip or a month in 7 Moroccan cities.', fr: 'Coût d’un voyage ou d’un mois dans 7 villes marocaines.', es: 'Coste de un viaje o un mes en 7 ciudades marroquíes.', de: 'Kosten einer Reise oder eines Monats in 7 marokkanischen Städten.', ar: 'تكلفة رحلة أو شهر في 7 مدن مغربية.' },
    method: {
      fr: 'Coûts de référence par poste (logement, repas, transport, loisirs) selon le style de vie, multipliés par un coefficient propre à chaque ville et par la durée.',
      en: 'Reference costs per item (housing, food, transport, leisure) by lifestyle, multiplied by a city coefficient and by the length of stay.',
      es: 'Costes de referencia por partida (alojamiento, comida, transporte, ocio) según el estilo de vida, multiplicados por un coeficiente de cada ciudad y por la duración.',
      de: 'Referenzkosten pro Posten (Unterkunft, Essen, Transport, Freizeit) je nach Lebensstil, multipliziert mit einem Stadtkoeffizienten und der Dauer.',
      ar: 'تكاليف مرجعية لكل بند (السكن، الأكل، النقل، الترفيه) حسب نمط العيش، مضروبة في معامل خاص بكل مدينة وفي المدة.',
    },
    assumptions: {
      fr: ['Fourchettes moyennes indicatives, à recalibrer chaque trimestre', 'Hors vols internationaux et assurance', 'Les prix varient fortement selon la saison et le quartier'],
      en: ['Indicative average ranges, recalibrated every quarter', 'Excludes international flights and insurance', 'Prices vary a lot by season and neighbourhood'],
      es: ['Horquillas medias orientativas, recalibradas cada trimestre', 'Sin vuelos internacionales ni seguro', 'Los precios varían mucho según la temporada y el barrio'],
      de: ['Unverbindliche Durchschnittswerte, vierteljährlich neu kalibriert', 'Ohne internationale Flüge und Versicherung', 'Preise schwanken stark nach Saison und Viertel'],
      ar: ['نطاقات متوسطة تقريبية تُراجع كل ثلاثة أشهر', 'دون الرحلات الدولية والتأمين', 'تختلف الأسعار كثيراً حسب الموسم والحي'],
    },
  },
];

export const toolByKey = (key: string) => TOOLS.find((t) => t.key === key);
