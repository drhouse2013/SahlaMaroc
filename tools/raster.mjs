/**
 * Génère les images matricielles (PNG) à partir des SVG, avant le build :
 * - public/og-default.png (1200x630) : image de partage réseaux sociaux
 * - public/logo.png (512x512) : logo pour le JSON-LD
 * Le dépôt ne contient ainsi que des fichiers texte. Utilise sharp (dépendance d'Astro).
 */
import sharp from 'sharp';
await sharp('public/og-default.svg').png().toFile('public/og-default.png');
await sharp('public/logo.svg').resize(512, 512).png().toFile('public/logo.png');
console.log('[raster] og-default.png + logo.png générés');
