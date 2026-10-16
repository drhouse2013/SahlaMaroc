# Relecture des traductions (registre es/de)

Décision (voir DECISIONS_LOG.md) : espagnol = tuteiement (tú), allemand = vouvoiement (Sie).
UI (`src/i18n/ui/*.json`) et `src/content/pages/de` harmonisés. Reste à relire (non mécanique, impératifs « Gib/Wähle… » à passer à « Geben Sie/Wählen Sie… ») :

## Allemand : formes « du » restantes dans les articles (src/content/articles/de/)
auto-einfuehren-endgueltige-rueckkehr-marokko, auto-kaufen-marokko-neu-gebraucht-mre, auto-marokko-180-tage-regel (5), autobahn-tanger-med-maut-route (3), bankkonto-marokko-eroeffnen-mre, checkliste-sommerrueckkehr-mre (10), faehre-nach-marokko-guide (3), guenstige-fluege-europa-marokko-ratgeber (16), kfz-versicherung-marokko-gruene-karte-grenze (13), krankenversicherung-amo-rueckkehr-marokko-mre, lebenshaltungskosten-marokko, marokkanischen-pass-cnie-ausland-erneuern, marokko-reise-kinder-haustiere (10), operation-marhaba-praktischer-guide (5), wo-schlafen-in-merzouga, wo-uebernachten-in-{agadir,al-hoceima,nador,ouarzazate,oujda,taghazout,tetouan-mdiq}.

## Allemand : chaînes « du » dans le code (src/)
src/data/home.ts (lignes ~23, 30, 269, 283, 305, 308), src/data/tools.ts (~90, 121, 154, 216, 273),
src/components/calc/{TransferCalc,SummerBudget,PropertyFees,PrayerTimes,CustomsCalc,MortgageCalc,CarDaysCounter}.astro.

## Espagnol
Aucune forme « usted » relevée dans l'UI ni dans les pages ; articles majoritairement en tú (472 vs 320 formes ambiguës su/puede) : relecture ciblée possible des occurrences « usted/Consulte/Compruebe ».
