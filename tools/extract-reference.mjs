/**
 * Extrait uniquement le bandeau checklists de la maquette de référence.
 * Les cartes de villes et les bandeaux sont rendus en HTML à partir de vraies photos afin d'éviter
 * les captures basse résolution et les bords des tuiles voisines.
 * Usage : node tools/extract-reference.mjs [reference.png]
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const ref = process.argv[2] ?? 'visual-audit/reference.png';
await mkdir('public/assets/cards/ref', { recursive: true });

// Bandeau checklists : 1312 × 80, centré (x = 68), sous les cartes.
const bannerTop = Number(process.env.BANNER_TOP ?? 1002);
await sharp(ref).extract({ left: 68, top: bannerTop, width: 1312, height: 80 }).png().toFile('public/assets/cards/ref/checklist-banner.png');
console.log('bandeau checklist extrait dans public/assets/cards/ref/');
