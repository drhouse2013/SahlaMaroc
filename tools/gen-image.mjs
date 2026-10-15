/**
 * Génère une illustration IA (Gemini image) pour un guide.
 * Usage : node tools/gen-image.mjs <sortie.jpg> "<prompt>"
 * Clé : GEMINI_API_KEY (variable d'environnement ou .env.local, jamais committé).
 * Les images produites doivent être étiquetées « Illustration générée par IA » sur le site.
 */
import fs from 'node:fs';
import sharp from 'sharp';

const env = fs.existsSync('.env.local') ? fs.readFileSync('.env.local', 'utf8') : '';
const key = process.env.GEMINI_API_KEY || /GEMINI_API_KEY=(.+)/.exec(env)?.[1]?.trim();
const [out, prompt] = process.argv.slice(2);
if (!key || !out || !prompt) { console.error('Usage: node tools/gen-image.mjs <sortie.jpg> "<prompt>" (GEMINI_API_KEY requise)'); process.exit(1); }

const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';
const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
  method: 'POST',
  headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
  body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseModalities: ['IMAGE'] } }),
});
const json = await res.json();
if (!res.ok) { console.error('Erreur API', res.status, json.error?.message ?? ''); process.exit(2); }
const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
if (!part) { console.error('Aucune image renvoyée'); process.exit(3); }
await sharp(Buffer.from(part.inlineData.data, 'base64')).resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 78 }).toFile(out);
console.log('OK', out, fs.statSync(out).size, 'octets');
