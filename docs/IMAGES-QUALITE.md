# Contrôle des dimensions des images

Généré par `node tools/audit-image-quality.mjs` le 2026-11-12.

**497 fichiers examinés**, dont 111 vectoriels ; 0 photos sous 720 px après recadrage 4:3 ; 0 fichier(s) non lisible(s) par Sharp ; 0 référence(s) de manifeste manquante(s).

Périmètre : toutes les images de `src/assets` et `public`, y compris les images non utilisées et les variantes déjà générées. Les sorties `dist` et les dépendances sont exclues. Les dimensions tiennent compte de la rotation EXIF. Seules les photographies de `src/assets/photos` sont soumises aux seuils : largeur disponible après recadrage 4:3 pour les cartes (720 px) et 16:9 pour les héros (1600 px). Les seuils repèrent les sources à examiner : le rôle réel, le ratio et le cadrage doivent être contrôlés dans les pages. Une grande dimension ne prouve ni la netteté, ni la date, ni le lieu, ni la licence. Les fichiers ICO sont signalés si le décodeur ne les lit pas.

## Photos sous 720 px après recadrage 4:3

| Fichier | Dimensions orientées | Poids Ko | Revue à prévoir |
|---|---:|---:|---|

## Références manquantes

Aucune.

## Inventaire complet

| Fichier | Dimensions orientées | Poids Ko | Revue à prévoir |
|---|---:|---:|---|
| public/favicon.svg | 200 × 220 | 0 | vectoriel |
| public/images/moroccan-zellige.webp | 480 × 853 | 144 | hors photographie : rôle spécifique à examiner |
| public/logo.png | 512 × 512 | 19 | hors photographie : rôle spécifique à examiner |
| public/logo.svg | 220 × 220 | 1 | vectoriel |
| public/og-default.png | 1200 × 630 | 58 | hors photographie : rôle spécifique à examiner |
| public/og-default.svg | 1200 × 630 | 3 | vectoriel |
| src/assets/illustrations/atlas.svg | 1200 × 750 | 13 | vectoriel |
| src/assets/illustrations/casablanca.svg | 1200 × 750 | 17 | vectoriel |
| src/assets/illustrations/chefchaouen.svg | 1200 × 750 | 35 | vectoriel |
| src/assets/illustrations/essaouira.svg | 1200 × 750 | 13 | vectoriel |
| src/assets/illustrations/fes.svg | 1200 × 750 | 25 | vectoriel |
| src/assets/illustrations/guides/airports.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/amo-health-return-mre.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/apostille.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/bank-account.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/birth-certificate-civil-registry.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/build-house.svg | 1600 × 1000 | 1 | vectoriel |
| src/assets/illustrations/guides/business-auto-entrepreneur-mre.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/buy-car-morocco-mre.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/buy-property-abroad.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/car-180-days.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/car-insurance.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/car-rental.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/casablanca-airport.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/cash-atms.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/cheap-flights-europe-morocco.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/chefchaouen-trip.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/civil-status.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/cost-of-living.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/ctm-supratours.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/customs.svg | 1600 × 1000 | 4 | vectoriel |
| src/assets/illustrations/guides/daam-sakane.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/dakhla.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/darija-phrases.svg | 1600 × 1000 | 1 | vectoriel |
| src/assets/illustrations/guides/driving-licence.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/e-visa.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/essaouira-day-trip.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/etiquette.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/ferry-guide.svg | 1600 × 1000 | 4 | vectoriel |
| src/assets/illustrations/guides/fes-merzouga.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/hammam.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/health-travellers.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/holidays-2027.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/import-car-permanent-return.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/international-schools.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/internet-coworking.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/kids-pets.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/life-certificate-pension.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/marhaba-2027.svg | 1600 × 1000 | 4 | vectoriel |
| src/assets/illustrations/guides/marhaba-guide.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/marrakech-airport.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/marrakech-day-trips.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/merzouga-tour.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/military-service-mre.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/moroccan-food.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/motorway.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/mre-mortgage.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/mre-taxes.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/nomad-cities.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/parcels-moving-europe-morocco.svg | 1600 × 1000 | 4 | vectoriel |
| src/assets/illustrations/guides/passport-cnie.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/permanent-return.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/power-of-attorney.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/property-inheritance.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/property-taxes.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/rent-long-term-mre.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/repatriation-insurance-mre.svg | 1600 × 1000 | 1 | vectoriel |
| src/assets/illustrations/guides/residence-permit.svg | 1600 × 1000 | 1 | vectoriel |
| src/assets/illustrations/guides/retire-in-morocco.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/return-morocco-with-children.svg | 1600 × 1000 | 1 | vectoriel |
| src/assets/illustrations/guides/riad-or-hotel.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/scams-safety.svg | 1600 × 1000 | 1 | vectoriel |
| src/assets/illustrations/guides/send-money.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/short-term-rental.svg | 1600 × 1000 | 1 | vectoriel |
| src/assets/illustrations/guides/sim-esim-morocco.svg | 1600 × 1000 | 1 | vectoriel |
| src/assets/illustrations/guides/summer-checklist.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/taghazout-surf.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/time-zone.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/tipping.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/toubkal.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/trains.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/tram-brt.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/transfer-savings-mre.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/transport-apps.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/travel-insurance-compare-mre.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/visa-90-days.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/where-to-stay-agadir.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/where-to-stay-al-hoceima.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/where-to-stay-casablanca.svg | 1600 × 1000 | 4 | vectoriel |
| src/assets/illustrations/guides/where-to-stay-chefchaouen.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/guides/where-to-stay-essaouira.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/where-to-stay-fes.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/where-to-stay-marrakech.svg | 1600 × 1000 | 4 | vectoriel |
| src/assets/illustrations/guides/where-to-stay-meknes.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/where-to-stay-merzouga.svg | 1600 × 1000 | 4 | vectoriel |
| src/assets/illustrations/guides/where-to-stay-nador.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/where-to-stay-ouarzazate.svg | 1600 × 1000 | 4 | vectoriel |
| src/assets/illustrations/guides/where-to-stay-oujda.svg | 1600 × 1000 | 4 | vectoriel |
| src/assets/illustrations/guides/where-to-stay-rabat.svg | 1600 × 1000 | 5 | vectoriel |
| src/assets/illustrations/guides/where-to-stay-taghazout.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/where-to-stay-tangier.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/where-to-stay-tetouan-mdiq.svg | 1600 × 1000 | 4 | vectoriel |
| src/assets/illustrations/guides/world-cup-2030-stadiums.svg | 1600 × 1000 | 4 | vectoriel |
| src/assets/illustrations/guides/world-cup-2030-transport.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/world-cup-2030-trip-planning.svg | 1600 × 1000 | 3 | vectoriel |
| src/assets/illustrations/guides/world-cup-2030-where-to-stay.svg | 1600 × 1000 | 1 | vectoriel |
| src/assets/illustrations/guides/world-cup-2030.svg | 1600 × 1000 | 2 | vectoriel |
| src/assets/illustrations/marrakech.svg | 1200 × 750 | 31 | vectoriel |
| src/assets/illustrations/rabat.svg | 1200 × 750 | 9 | vectoriel |
| src/assets/illustrations/riad.svg | 1200 × 750 | 13 | vectoriel |
| src/assets/illustrations/sahara.svg | 1200 × 750 | 9 | vectoriel |
| src/assets/illustrations/souk.svg | 1200 × 750 | 9 | vectoriel |
| src/assets/illustrations/taghazout.svg | 1200 × 750 | 10 | vectoriel |
| src/assets/illustrations/tangier.svg | 1200 × 750 | 12 | vectoriel |
| src/assets/photos/aeroport-agadir-2023.jpg | 1600 × 1029 | 211 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/aeroport-agadir.jpg | 1600 × 1067 | 215 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/aeroport-casablanca.jpg | 1600 × 1143 | 235 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/aeroport-marrakech.jpg | 1600 × 1200 | 228 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/agadir-plage.jpg | 1600 × 1200 | 122 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/al-hoceima-plage.jpg | 1200 × 800 | 177 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/animaux-chat-chefchaouen.jpg | 1600 × 1066 | 137 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/argent-dirhams.jpg | 1600 × 1200 | 667 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/artisan-poterie.jpg | 1600 × 1067 | 220 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/assurance-voyage-ram.jpg | 1600 × 1048 | 87 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/autoroute-marrakech-agadir.jpg | 1600 × 778 | 219 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/banque-barid-casablanca.jpg | 1600 × 1063 | 241 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/banque-casablanca-cfc.jpg | 1920 × 1440 | 777 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/bus-ctm-arret.jpg | 1600 × 1200 | 614 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/casablanca-hassan2-corniche-2024.jpg | 1600 × 720 | 139 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/casablanca-hassan2.jpg | 1600 × 1064 | 173 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cascades-ouzoud.jpg | 1600 × 1068 | 233 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cdm-stade-ibn-batouta.jpg | 2048 × 686 | 211 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/cdm2030-stade-moulay-abdellah.jpg | 1600 × 1067 | 234 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/chefchaouen-fontaine.jpg | 1600 × 1064 | 242 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/chefchaouen-place-haouta-2025.jpg | 1600 × 1064 | 239 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/chefchaouen-ruelle.jpg | 1600 × 1200 | 219 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/agadir.jpg | 1600 × 1202 | 182 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/al-hoceima.jpg | 3024 × 4032 | 3272 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/asilah.jpg | 1600 × 901 | 188 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/casablanca.jpg | 1600 × 1067 | 203 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/chefchaouen.jpg | 1600 × 1064 | 229 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/dakhla.jpg | 4124 × 1657 | 2463 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/el-jadida.jpg | 5686 × 7581 | 5876 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/errachidia.jpg | 1200 × 800 | 494 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/cities/essaouira.jpg | 1600 × 1042 | 211 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/fes.jpg | 1400 × 821 | 249 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/cities/guelmim.jpg | 1600 × 797 | 96 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/cities/home-hero.jpg | 1600 × 1067 | 170 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/ifrane-lake-2025.jpg | 4080 × 2296 | 3542 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/kenitra.jpg | 1600 × 720 | 185 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/cities/laayoune.jpg | 1600 × 900 | 222 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/larache.jpg | 4080 × 3060 | 3806 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/marrakech-jemaa-night-2026.jpg | 3072 × 4080 | 3517 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/marrakech.jpg | 1600 × 1067 | 196 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/meknes.jpg | 1600 × 1200 | 248 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/merzouga.jpg | 6016 × 4016 | 9880 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/nador-corniche-2026.jpg | 2268 × 4032 | 1128 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/nador.jpg | 1600 × 1067 | 241 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/ouarzazate.jpg | 1600 × 1044 | 233 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/oujda.jpg | 1600 × 1067 | 163 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/rabat.jpg | 4032 × 3024 | 2577 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/saidia.jpg | 1600 × 900 | 171 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/sidi-ifni.jpg | 1600 × 1200 | 222 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/tafraout.jpg | 5906 × 2367 | 2996 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/taghazout.jpg | 1920 × 1440 | 1032 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/tangier.jpg | 1600 × 1200 | 239 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/taroudant.jpg | 4160 × 1968 | 1908 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/tetouan.jpg | 1600 × 1200 | 221 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/tiznit.jpg | 8000 × 6000 | 6865 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cities/zagora.jpg | 3024 × 4032 | 2085 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/construire-chantier-casa.jpg | 1600 × 1067 | 230 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/consulat-maroc-pontoise.jpg | 1600 × 1200 | 234 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/corniche-casablanca.jpg | 1920 × 1440 | 492 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cout-vie-etal-legumes.jpg | 1600 × 1205 | 237 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/credit-immeubles-casa.jpg | 1600 × 1204 | 232 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/cuisine-tajine.jpg | 1600 × 1067 | 225 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/daam-sakane-logements.jpg | 1600 × 1200 | 229 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/darija-souk-haddadine.jpg | 1600 × 1170 | 222 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/distributeur-cih.jpg | 1600 × 1200 | 240 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/douane-tanger-med.jpg | 1600 × 1063 | 243 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/ecoles-lycee.jpg | 1600 × 1067 | 230 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/envoi-argent-wafacash.jpg | 1600 × 1063 | 187 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/epargne-bank-al-maghrib-rabat.jpg | 1600 × 1066 | 194 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/epargne-casablanca-cfc.jpg | 1920 × 1440 | 1056 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/essaouira-barques.jpg | 1600 × 1068 | 241 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/essaouira-medina-2023.jpg | 1600 × 1067 | 203 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/essaouira-remparts.jpg | 1600 × 1067 | 235 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/evisa-aeroport-marrakech.jpg | 1600 × 1200 | 229 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/ferry-quai.jpg | 1600 × 1063 | 206 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/fes-medina-panorama-2024.jpg | 1600 × 938 | 223 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/fes-medina.jpg | 1600 × 1067 | 243 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/fibre-casa-cfc.jpg | 1600 × 1200 | 232 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/finance-casablanca-cfc.jpg | 1920 × 1440 | 520 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/fuseau-horloge.jpg | 1600 × 1200 | 237 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/gare-casa-voyageurs.jpg | 1920 × 1029 | 613 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/gare-rabat-ville.jpg | 1600 × 1199 | 212 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/gare-routiere-tata.jpg | 1600 × 1200 | 209 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/grand-taxi-casablanca.jpg | 1920 × 1078 | 309 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/grand-taxi-inezgane.jpg | 1600 × 1200 | 204 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/guides/car.webp | 1400 × 2097 | 246 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/guides/documents.webp | 1400 × 788 | 35 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/guides/ferry.webp | 1400 × 930 | 236 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/guides/flag.webp | 1400 × 937 | 176 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/guides/housing.webp | 1400 × 934 | 61 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/guides/life.webp | 1400 × 1400 | 164 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/guides/money.webp | 1400 × 933 | 30 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/guides/travel.webp | 1400 × 2114 | 380 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/hammam-interieur.jpg | 1600 × 1200 | 226 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/hammam-saffarin-2026.jpg | 3000 × 2250 | 1152 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/immo-acheter-casa-2025.jpg | 1600 × 1578 | 206 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/immo-acheter.jpg | 1280 × 960 | 184 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/immo-construire.jpg | 1280 × 960 | 585 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/immo-credit.jpg | 1920 × 1440 | 527 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/immo-daam-sakane.jpg | 1632 × 1224 | 862 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/immo-heritage.jpg | 1920 × 1280 | 878 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/immo-impots-casa-2025.jpg | 1600 × 1204 | 232 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/immo-louer.jpg | 1920 × 1280 | 770 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/immo-procuration.jpg | 2838 × 1902 | 918 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/marhaba-port.jpg | 1600 × 1071 | 234 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/marrakech-jemaa.jpg | 1600 × 1200 | 211 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/meknes-bab-mansour-2019.jpg | 1600 × 1067 | 230 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/meknes-bab-mansour.jpg | 1600 × 1060 | 232 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/merzouga-camp-2019.jpg | 1600 × 900 | 238 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/merzouga-caravane.jpg | 1600 × 1200 | 221 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/merzouga-dunes.jpg | 1600 × 1006 | 60 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/nador-ville.jpg | 1600 × 1201 | 232 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/ouarzazate-taourirt-2024.jpg | 1600 × 1044 | 235 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/ouarzazate-taourirt.jpg | 1600 × 1033 | 184 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/oujda-bab-sidi-aissa-2019.jpg | 1600 × 1067 | 107 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/oujda-mosquee.jpg | 1600 × 1000 | 185 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/permis-autoroute-2025.jpg | 1600 × 1200 | 239 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/permis-route-r203.jpg | 1800 × 1205 | 398 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/pourboire-jemaa-terrasse.jpg | 1600 × 960 | 240 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/rabat-oudayas-tour-2024.jpg | 1600 × 1200 | 227 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/rabat-oudayas.jpg | 1600 × 1055 | 238 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/regions/beni-mellal-khenifra.jpg | 1600 × 960 | 224 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/regions/casablanca-settat.jpg | 1600 × 1067 | 203 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/regions/dakhla-oued-ed-dahab.jpg | 1600 × 1067 | 199 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/regions/draa-tafilalet.jpg | 1600 × 990 | 224 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/regions/fes-meknes.jpg | 1600 × 1200 | 221 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/regions/guelmim-oued-noun.jpg | 1600 × 900 | 241 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/regions/laayoune-sakia-el-hamra.jpg | 1600 × 1067 | 219 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/regions/marrakech-safi.jpg | 1600 × 1067 | 230 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/regions/oriental.jpg | 1600 × 1050 | 239 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/regions/rabat-sale-kenitra.jpg | 1600 × 1200 | 239 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/regions/souss-massa.jpg | 1600 × 1205 | 238 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/regions/tanger-tetouan-al-hoceima.jpg | 1600 × 872 | 175 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/retour-rabat-bouregreg.jpg | 1600 × 900 | 154 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/retraite-plage-dakhla.jpg | 1600 × 1205 | 191 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/riad-patio-dar-el-bacha.jpg | 1600 × 1200 | 228 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/sante-chu-tanger.jpg | 1600 × 1073 | 218 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/savoir-vivre-the-menthe.jpg | 1600 × 1205 | 225 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/souk-semmarine-marrakech.jpg | 1920 × 1277 | 741 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/agadir-amazigh-museum.jpg | 1400 × 680 | 183 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/agadir-beach.jpg | 1800 × 1350 | 267 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/agadir-bert-flint-museum.jpg | 1400 × 930 | 184 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/agadir-coco-polizzi-medina.jpg | 1400 × 1050 | 165 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/agadir-crocodile-park.jpg | 1400 × 788 | 168 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/agadir-ibn-zaidoun-garden.jpg | 1440 × 1080 | 343 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/agadir-marina.jpg | 4381 × 1611 | 3413 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/agadir-mohammed-v-mosque.jpg | 1400 × 933 | 108 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/agadir-olhao-garden.jpg | 1400 × 930 | 181 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/agadir-oufella.jpg | 1400 × 1050 | 189 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/agadir-poste-centrale.jpg | 1400 × 973 | 174 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/agadir-souk-el-had.jpg | 1400 × 1400 | 191 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/agadir-valley-of-birds.jpg | 1400 × 930 | 187 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/al-hoceima-alhucemas-islands.jpg | 1400 × 655 | 177 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/al-hoceima-cala-iris.jpg | 11550 × 3255 | 8397 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/al-hoceima-national-park.jpg | 1400 × 1050 | 190 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/al-hoceima-quemado.jpg | 1400 × 681 | 197 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/al-hoceima-sfiha.jpg | 9168 × 1840 | 3910 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/asilah-grand-mosque.jpg | 1400 × 1123 | 126 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/asilah-medina.jpg | 1400 × 1050 | 181 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/asilah-murals.jpg | 1400 × 934 | 155 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/asilah-raissouli-palace.jpg | 1400 × 937 | 108 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/asilah-ramparts-towers.jpg | 1400 × 788 | 159 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/casablanca-art-deco.jpg | 1400 × 1050 | 180 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/casablanca-corniche.jpg | 1400 × 930 | 190 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/casablanca-el-hank-lighthouse.jpg | 1400 × 934 | 86 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/casablanca-habous.jpg | 1400 × 933 | 193 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/casablanca-hassan-ii.jpg | 1400 × 1065 | 173 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/casablanca-mahkama-pacha.jpg | 1400 × 937 | 184 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/casablanca-marche-central.jpg | 1400 × 1050 | 182 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/casablanca-mohammed-v-square.jpg | 1400 × 1070 | 184 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/casablanca-morocco-mall.jpg | 1400 × 1063 | 181 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/casablanca-old-medina.jpg | 1400 × 1050 | 184 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/casablanca-poste-centrale.jpg | 1400 × 933 | 184 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/casablanca-ricks-cafe.jpg | 1400 × 1167 | 189 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/casablanca-sacre-coeur.jpg | 1400 × 1050 | 155 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/casablanca-slaoui-museum.jpg | 1400 × 930 | 180 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/casablanca-stade-mohammed-v.jpg | 1400 × 787 | 186 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/casablanca-twin-center.jpg | 1400 × 1050 | 185 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/casablanca-villa-des-arts.jpg | 1400 × 932 | 185 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/chefchaouen-bouzafar-mosque.jpg | 1400 × 1186 | 184 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/chefchaouen-el-haouta.jpg | 1400 × 931 | 180 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/chefchaouen-grand-mosque.jpg | 1400 × 936 | 154 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/chefchaouen-kasbah.jpg | 1400 × 785 | 192 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/chefchaouen-outa-el-hammam.jpg | 2400 × 1600 | 726 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/chefchaouen-ras-el-ma.jpg | 1185 × 889 | 165 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/chefchaouen-spanish-mosque.jpg | 1400 × 788 | 189 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/dakhla-beach.jpg | 1400 × 700 | 150 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/dakhla-dragon-island.jpg | 1400 × 937 | 164 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/dakhla-lagoon.jpg | 1400 × 787 | 90 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/dakhla-lighthouse.jpg | 1400 × 1050 | 98 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/dakhla-mount-carmel-church.jpg | 1400 × 788 | 181 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/dakhla-national-park.jpg | 1400 × 933 | 170 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/el-jadida-assumption-church.jpg | 1400 × 1050 | 178 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/el-jadida-cistern.jpg | 1400 × 1000 | 183 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/el-jadida-deauville-plage.jpg | 1400 × 788 | 130 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/el-jadida-lighthouse.jpg | 1872 × 4000 | 1299 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/el-jadida-mazagan.jpg | 5686 × 7581 | 5876 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/el-jadida-municipal-theatre.jpg | 1400 × 788 | 188 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/el-jadida-resistance-museum.jpg | 1400 × 788 | 82 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/el-jadida-sidi-bouzid.jpg | 1400 × 787 | 146 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/errachidia-ziz-valley.jpg | 1400 × 765 | 194 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/essaouira-beach.jpg | 1800 × 1350 | 355 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/essaouira-fishing-port.jpg | 1800 × 1200 | 399 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/essaouira-medina.jpg | 1400 × 933 | 185 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/essaouira-mogador-island.jpg | 1400 × 933 | 137 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/essaouira-place-moulay-hassan.jpg | 1400 × 1050 | 133 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/essaouira-sidi-kaouki.jpg | 1400 × 1050 | 133 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/essaouira-skala.jpg | 1400 × 1003 | 192 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/fes-al-attarine.jpg | 1600 × 1067 | 717 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/fes-andalusian-mosque.jpg | 1400 × 1867 | 177 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/fes-borj-nord.jpg | 1400 × 1089 | 192 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/fes-borj-sud.jpg | 1400 × 840 | 89 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/fes-bou-inania.jpg | 1400 × 1050 | 187 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/fes-cherratine.jpg | 4208 × 1888 | 3010 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/fes-chouara-2026.jpg | 5296 × 3535 | 12376 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/fes-chouara.jpg | 1185 × 929 | 193 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/fes-dar-batha.jpg | 1400 × 1050 | 194 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/fes-fes-el-bali.jpg | 1330 × 886 | 190 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/fes-glaoui-palace.jpg | 1400 × 1050 | 195 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/fes-jnan-sbil.jpg | 1400 × 2091 | 190 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/fes-merenid-tombs.jpg | 1400 × 1050 | 165 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/fes-moulay-idriss-shrine.jpg | 1250 × 831 | 195 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/fes-nejjarine.jpg | 1400 × 930 | 173 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/fes-quaraouiyine.jpg | 1400 × 1867 | 186 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/fes-tijani.jpg | 1400 × 1050 | 232 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/guelmim-tighmert-oasis.jpg | 1400 × 932 | 193 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/ifrane-akhawayn-university.jpg | 1400 × 1050 | 179 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/ifrane-cedre-gouraud.jpg | 1400 × 2114 | 192 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/ifrane-lion-statue.jpg | 1400 × 1048 | 190 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/ifrane-macaques.jpg | 1400 × 1050 | 176 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/ifrane-national-park.jpg | 1600 × 980 | 365 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/ifrane-ras-el-ma.jpg | 1400 × 1400 | 185 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/ifrane-vittel-spring.jpg | 1400 × 933 | 174 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/kenitra-kasbah-mahdiyya.jpg | 1400 × 788 | 125 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/kenitra-kasbah.jpg | 3120 × 2340 | 1074 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/kenitra-mehdia-beach.jpg | 1400 × 1050 | 185 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/kenitra-merja-zerga.jpg | 1400 × 933 | 140 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/kenitra-sidi-boughaba.jpg | 1400 × 788 | 180 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/kenitra-thamusida.jpg | 1400 × 928 | 192 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/laayoune-beach.jpg | 1400 × 933 | 107 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/laayoune-cathedral.jpg | 1400 × 1050 | 188 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/larache-beach.jpg | 1400 × 1867 | 101 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/larache-lixus.jpg | 1400 × 1050 | 190 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/larache-medina.jpg | 1400 × 1050 | 176 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/larache-pilar-church.jpg | 1400 × 1867 | 137 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/larache-place-liberation.jpg | 4080 × 3060 | 3806 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/larache-port.jpg | 1400 × 1050 | 129 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-agdal.jpg | 1400 × 569 | 67 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-ali-ben-youssef.jpg | 1400 × 916 | 195 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-almoravid-koubba.jpg | 1400 × 930 | 159 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-bahia.jpg | 1400 × 935 | 195 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-ben-youssef.jpg | 1400 × 1291 | 194 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-culinary-museum.jpg | 1400 × 1050 | 193 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-dar-si-said.jpg | 1400 × 1050 | 187 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-el-badi.jpg | 1400 × 934 | 177 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-jemaa-el-fna.jpg | 1400 × 762 | 191 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-koutoubia.jpg | 1400 × 1259 | 194 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-maison-photographie.jpg | 768 × 1024 | 177 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-majorelle.jpg | 1330 × 884 | 170 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-marrakech-museum.jpg | 1400 × 1050 | 187 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-menara.jpg | 1400 × 933 | 183 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-saadian-tombs.jpg | 1330 × 1016 | 166 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-souks.jpg | 1400 × 925 | 193 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-tanneries.jpg | 1400 × 1050 | 192 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/marrakech-ysl-museum.jpg | 1400 × 1050 | 194 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/meknes-agdal-basin.jpg | 1400 × 603 | 98 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/meknes-bab-mansour.jpg | 1400 × 927 | 190 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/meknes-borj-belkari.jpg | 1400 × 935 | 120 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/meknes-bou-inania.jpg | 1400 × 1867 | 198 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/meknes-dar-jamai.jpg | 1400 × 1050 | 192 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/meknes-heri-souani.jpg | 1400 × 2100 | 193 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/meknes-lahdim.jpg | 1400 × 933 | 199 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/meknes-moulay-ismail.jpg | 1400 × 930 | 190 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/meknes-sidi-ben-aissa.jpg | 1400 × 949 | 151 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/merzouga-dayet-srji.jpg | 1400 × 933 | 144 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/merzouga-erg-chebbi.jpg | 1400 × 933 | 120 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/merzouga-grand-dune.jpg | 1400 × 934 | 187 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/merzouga-khamlia.jpg | 1280 × 960 | 52 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/nador-boucana.jpg | 1400 × 928 | 139 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/nador-charrana.jpg | 1400 × 933 | 180 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/nador-city-hill.jpg | 1400 × 788 | 182 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/nador-corniche.jpg | 1400 × 832 | 138 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/nador-gourougou.jpg | 1400 × 840 | 192 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/nador-kariat-arekmane.jpg | 1400 × 788 | 126 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/nador-mar-chica-beach.jpg | 1400 × 838 | 182 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/nador-marchica.jpg | 1400 × 989 | 181 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/ouarzazate-ait-benhaddou.jpg | 1400 × 930 | 188 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/ouarzazate-atlas-studios.jpg | 1400 × 1062 | 170 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/ouarzazate-cinema-museum.jpg | 1400 × 1428 | 184 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/ouarzazate-cla-studios.jpg | 1400 × 1050 | 194 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/ouarzazate-fint-oasis.jpg | 1400 × 932 | 189 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/ouarzazate-main-square.jpg | 1400 × 850 | 155 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/ouarzazate-solar-park.jpg | 1400 × 700 | 186 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/ouarzazate-taourirt.jpg | 1400 × 935 | 189 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/oujda-bab-el-gharbi.jpg | 1600 × 1200 | 306 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/oujda-bab-sidi-abdelwahab.jpg | 1400 × 1050 | 198 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/oujda-grand-mosque.jpg | 1400 × 1053 | 128 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/oujda-honor-stadium.jpg | 1400 × 1050 | 173 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/oujda-lalla-aicha.jpg | 1400 × 1050 | 192 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/oujda-medina.jpg | 1400 × 2024 | 171 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/oujda-sidi-maafa.jpg | 1400 × 1050 | 191 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/oujda-sidi-yahya.jpg | 1400 × 1050 | 195 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/rabat-bab-el-had.jpg | 1400 × 1050 | 181 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/rabat-bab-rouah.jpg | 1400 × 788 | 188 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/rabat-chellah.jpg | 3986 × 3000 | 3847 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/rabat-currency-museum.jpg | 1400 × 1039 | 191 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/rabat-hassan-tower.jpg | 4032 × 2839 | 2226 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/rabat-history-museum.jpg | 1400 × 840 | 139 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/rabat-marinid-madrasa.jpg | 1400 × 933 | 183 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/rabat-medina.jpg | 1400 × 933 | 181 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/rabat-mmvi-museum.jpg | 1400 × 1086 | 195 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/rabat-mohammed-vi-tower.jpg | 1400 × 1046 | 187 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/rabat-oudayas-museum.jpg | 1400 × 933 | 183 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/rabat-oudayas.jpg | 3899 × 2602 | 2027 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/rabat-rabat-beach.jpg | 1400 × 1050 | 186 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/rabat-royal-palace.jpg | 1400 × 1000 | 185 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/rabat-sale-medina.jpg | 1400 × 904 | 180 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/rabat-st-peters.jpg | 1400 × 933 | 180 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/rabat-zoo.jpg | 1400 × 933 | 176 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/saidia-beach.jpg | 1400 × 1005 | 136 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/saidia-marina.jpg | 1400 × 933 | 111 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/saidia-moulouya-reserve.jpg | 1400 × 933 | 135 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/sidi-ifni-art-deco.jpg | 1400 × 1050 | 188 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/sidi-ifni-former-cathedral.jpg | 1400 × 1523 | 170 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/sidi-ifni-legzira.jpg | 1400 × 933 | 173 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/sidi-ifni-lighthouse.jpg | 1400 × 1050 | 71 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tafraout-ammeln-valley.jpg | 1400 × 737 | 179 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tafraout-napoleons-hat.jpg | 1400 × 933 | 195 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tafraout-painted-rocks.jpg | 1800 × 2700 | 784 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/taghazout-anchor-point.jpg | 1600 × 1067 | 255 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/taghazout-panorama.jpg | 1400 × 1050 | 197 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/taghazout-paradise-valley.jpg | 1400 × 1400 | 199 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/taghazout-taghazout-beach.jpg | 1600 × 1200 | 292 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/tangier-american-legation.jpg | 1400 × 933 | 182 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tangier-cap-malabata.jpg | 1400 × 1036 | 191 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tangier-cervantes-theatre.jpg | 1400 × 970 | 174 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tangier-grand-socco.jpg | 1400 × 933 | 187 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tangier-great-mosque.jpg | 1400 × 1867 | 168 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tangier-hercules-caves.jpg | 1400 × 934 | 184 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tangier-ibn-battuta-tomb.jpg | 1400 × 1050 | 183 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tangier-kasbah-museum.jpg | 1330 × 1862 | 158 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tangier-marshan-palace.jpg | 1400 × 1299 | 186 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tangier-medina.jpg | 1400 × 933 | 145 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tangier-mendoubia.jpg | 1400 × 1091 | 191 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tangier-petit-socco.jpg | 1400 × 1139 | 186 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tangier-plaza-de-toros.jpg | 1400 × 933 | 153 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tangier-sidi-bou-abib.jpg | 1400 × 778 | 120 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tangier-st-andrews.jpg | 1400 × 1050 | 173 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/taroudant-arab-souk.jpg | 1400 × 1867 | 186 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/taroudant-ramparts.jpg | 4160 × 1968 | 1908 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/taroudant-tannery.jpg | 1400 × 933 | 170 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/taroudant-tiout-palm-grove.jpg | 1400 × 1050 | 185 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tetouan-archaeological-museum.jpg | 1400 × 1050 | 183 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tetouan-bab-okla-2024.jpg | 2448 × 3264 | 3073 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/tetouan-bab-okla.jpg | 1400 × 1050 | 189 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tetouan-dersa-kasbah-2026.jpg | 960 × 2005 | 368 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tetouan-medina.jpg | 1400 × 1867 | 196 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tetouan-modern-art.jpg | 1400 × 1050 | 187 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tetouan-royal-palace.jpg | 1400 × 796 | 174 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tetouan-tannery.jpg | 1600 × 1200 | 442 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/tiznit-aglou-beach.jpg | 1400 × 836 | 111 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/tiznit-medina-walls.jpg | 6000 × 8000 | 8257 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/tiznit-souss-massa.jpg | 1400 × 933 | 156 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/zagora-jebel-zagora.jpg | 1400 × 788 | 191 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/zagora-tamegroute-pottery.jpg | 1400 × 931 | 190 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/spots/zagora-timbuktu-sign-2026.jpg | 4000 × 6000 | 7673 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/spots/zagora-tissergate.jpg | 960 × 640 | 129 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/stades-rabat-moulay-abdellah.jpg | 1600 × 1067 | 220 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/surf-taghazout-baie.jpg | 1600 × 1200 | 207 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/taghazout-surf-2026.jpg | 5568 × 3712 | 1344 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/tanger-grand-socco.jpg | 1600 × 1067 | 237 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/tetouan-medina.jpg | 1600 × 1200 | 221 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/the-menthe-marrakech.jpg | 1920 × 1280 | 489 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/toubkal-imlil.jpg | 1600 × 1066 | 229 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/toubkal-randonneurs.jpg | 1600 × 1200 | 241 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/train-al-boraq.jpg | 1600 × 916 | 218 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/tram-rabat-sale.jpg | 1600 × 900 | 207 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/tramway-casablanca.jpg | 1920 × 1079 | 593 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/visa-aeroport-oujda.jpg | 1600 × 1222 | 190 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/voiture-achat-garage-casablanca.jpg | 1600 × 910 | 202 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/voiture-autoroute.jpg | 1600 × 1067 | 166 | dimensions suffisantes ; cadrage à vérifier |
| src/assets/photos/voiture-traversee-mre.jpg | 1600 × 772 | 192 | recadrage 16:9 sous 1600 px : héro à examiner |
| src/assets/photos/vols-ryanair-rabat.jpg | 1600 × 1200 | 147 | dimensions suffisantes ; cadrage à vérifier |

