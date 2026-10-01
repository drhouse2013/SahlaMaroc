#!/usr/bin/env node
/**
 * Traduction automatique des articles anglais (DeepL ou OpenAI).
 * =================================================================
 * Usage :
 *   npm run translate -- src/content/articles/en/best-sim-card-esim-morocco.mdx
 *   npm run translate -- src/content/articles/en/xxx.mdx --to fr,es --provider openai
 *   npm run translate -- --all            # traduit tous les articles EN sans traduction
 *   npm run translate -- --all --force    # écrase les traductions existantes
 *   npm run translate -- <fichier> --provider mock   # test hors-ligne, sans clé API
 *
 * Variables d'environnement (.env) :
 *   DEEPL_API_KEY   (prioritaire ; les clés gratuites finissent par ":fx")
 *   OPENAI_API_KEY  + OPENAI_MODEL (optionnel, défaut "gpt-4o-mini")
 *
 * Sécurité SEO : chaque fichier généré reçoit `machineTranslated: true`
 *   => la page est en noindex et hors hreflang/RSS tant que vous ne l'avez pas relue.
 *   Après relecture humaine : passez la valeur à false. (Google tolère la traduction
 *   automatique seulement si elle apporte de la valeur ; une relecture évite la
 *   qualification de "scaled content abuse".)
 *
 * Ce qui est protégé (jamais envoyé à la traduction) :
 *   balises de composants MDX, blocs de code, `code`, URLs, commentaires {/* *\/}, import/export.
 * Les liens internes /en/<slug> sont réécrits vers le slug traduit s'il existe.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const CONTENT_DIRS = ['src/content/articles', 'src/content/pages'];
const ALL_TARGETS = ['fr', 'es', 'de', 'ar'];
const DEEPL_LANG = { fr: 'FR', es: 'ES', de: 'DE', ar: 'AR' };
const LANG_NAME = { fr: 'French', es: 'Spanish', de: 'German', ar: 'Modern Standard Arabic' };

// ---------------------------------------------------------------- CLI
await loadDotEnv();
const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name) => {
  const i = args.indexOf(`--${name}`);
  return i > -1 ? args[i + 1] : undefined;
};
const targets = (option('to')?.split(',') ?? ALL_TARGETS).filter((l) => ALL_TARGETS.includes(l));
const provider = option('provider') ?? (process.env.DEEPL_API_KEY ? 'deepl' : process.env.OPENAI_API_KEY ? 'openai' : null);
const force = flag('force');

if (!provider) fail('Aucune clé trouvée : définissez DEEPL_API_KEY ou OPENAI_API_KEY dans .env (ou --provider mock).');

const optionValues = new Set(['to', 'provider'].map(option).filter(Boolean));
let files = args.filter((a) => !a.startsWith('--') && !optionValues.has(a));
if (flag('all')) files = await listFiles('en');
if (!files.length) fail('Indiquez un fichier .md/.mdx anglais ou --all.');

const index = await buildSlugIndex();

for (const file of files) {
  for (const lang of targets) {
    try {
      await translateFile(path.resolve(ROOT, file), lang);
    } catch (err) {
      console.error(`✗ ${file} -> ${lang} : ${err.message}`);
    }
  }
}

// ---------------------------------------------------------------- Pipeline
async function translateFile(absPath, lang) {
  const raw = await fs.readFile(absPath, 'utf8');
  const { data, content } = matter(raw);
  if (data.lang !== 'en') throw new Error('le fichier source doit avoir lang: "en"');

  const dir = path.dirname(absPath).replace(/\/en$/, `/${lang}`);
  const existing = index.byKey.get(`${lang}:${data.translationKey}`);
  if (existing && !force) {
    console.log(`↷ ${lang} existe déjà (${path.relative(ROOT, existing.file)}) — utilisez --force pour écraser`);
    return;
  }

  // 1) Protection des segments non traduisibles
  const { text: protectedBody, restore } = protect(content, lang);

  // 2) Traduction en un seul appel : [titre, description, corps]
  const [title, description, body] = await translate([data.title, data.description, protectedBody], lang);

  // 3) Slug : latin & lisible. Arabe => on garde le slug anglais (URLs arabes encodées = illisibles).
  const slug = lang === 'ar' ? data.slug : slugify(title) || data.slug;

  const fm = {
    ...data,
    title: title.slice(0, 70),
    description: description.slice(0, 160),
    slug,
    lang,
    machineTranslated: true,
  };
  const out = matter.stringify(restore(body), fm);
  const ext = path.extname(absPath);
  const target = existing?.file ?? path.join(dir, `${slug}${ext}`);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, out, 'utf8');
  console.log(`✓ ${lang} -> ${path.relative(ROOT, target)}  (à relire puis machineTranslated: false)`);
}

/**
 * Remplace les éléments à protéger par des balises <x i="n"/> que DeepL (tag_handling=xml)
 * et OpenAI conservent telles quelles.
 */
function protect(md, lang) {
  const saved = [];
  const keep = (s) => `<x i="${saved.push(s) - 1}"/>`;
  let t = md;
  t = t.replace(/^(import|export)\s.*$/gm, keep); // import/export MDX
  t = t.replace(/```[\s\S]*?```/g, keep); // blocs de code
  t = t.replace(/\{\/\*[\s\S]*?\*\/\}/g, keep); // commentaires MDX
  t = t.replace(/`[^`\n]+`/g, keep); // code inline
  t = t.replace(/<\/?[A-Z][\w.]*(?:\s(?:"[^"]*"|'[^']*'|\{[^}]*\}|[^>"'{])*)?\/?>/g, keep); // balises composants
  t = t.replace(/\]\(([^)\s]+)([^)]*)\)/g, (_m, url, rest) => `](${keep(rewriteLink(url, lang) + rest)})`); // URLs Markdown
  t = t.replace(/https?:\/\/[^\s)<>"]+/g, keep); // URLs nues
  // Échappement XML pour DeepL
  t = t.replace(/&(?!amp;|lt;|gt;)/g, '&amp;');
  const restore = (s) =>
    s.replace(/&amp;/g, '&').replace(/<x i="(\d+)"\s*\/>/g, (_m, n) => saved[Number(n)] ?? '');
  return { text: t, restore };
}

/** /en/<slug> -> /<lang>/<slug traduit> si la traduction existe, sinon lien anglais conservé. */
function rewriteLink(url, lang) {
  const m = url.match(/^\/en\/([a-z0-9-]+)(.*)$/);
  if (!m) return url;
  const key = index.bySlug.get(`en:${m[1]}`);
  const target = key && index.byKey.get(`${lang}:${key}`);
  return target ? `/${lang}/${target.slug}${m[2]}` : url;
}

// ---------------------------------------------------------------- Providers
async function translate(texts, lang) {
  if (provider === 'deepl') return deepl(texts, lang);
  if (provider === 'openai') return Promise.all(texts.map((t) => openai(t, lang)));
  if (provider === 'mock') return texts.map((t) => `[${lang}] ${t}`);
  fail(`Fournisseur inconnu : ${provider}`);
}

async function deepl(texts, lang) {
  const key = process.env.DEEPL_API_KEY ?? fail('DEEPL_API_KEY manquant');
  const host = key.endsWith(':fx') ? 'https://api-free.deepl.com' : 'https://api.deepl.com';
  const res = await fetch(`${host}/v2/translate`, {
    method: 'POST',
    headers: { Authorization: `DeepL-Auth-Key ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: texts,
      source_lang: 'EN',
      target_lang: DEEPL_LANG[lang],
      tag_handling: 'xml',
      ignore_tags: ['x'],
      preserve_formatting: true,
      formality: lang === 'ar' ? undefined : 'prefer_less', // ton "tu/du" naturel pour un blog
    }),
  });
  if (!res.ok) throw new Error(`DeepL ${res.status} : ${await res.text()}`);
  const json = await res.json();
  return json.translations.map((t) => t.text);
}

async function openai(text, lang) {
  const key = process.env.OPENAI_API_KEY ?? fail('OPENAI_API_KEY manquant');
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content:
            `Translate the user's Markdown from English to ${LANG_NAME[lang]} for a travel guide about Morocco. ` +
            'Keep Markdown syntax, tables and line breaks. Keep every <x i="N"/> tag exactly as is and in a sensible position. ' +
            'Keep brand names, prices, MAD/€ amounts and place names. Natural, friendly tone. Output only the translation.',
        },
        { role: 'user', content: text },
      ],
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status} : ${await res.text()}`);
  const json = await res.json();
  return json.choices[0].message.content.trim();
}

// ---------------------------------------------------------------- Helpers
function slugify(s) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss')
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .split('-')
    .slice(0, 8)
    .join('-');
}

async function listFiles(lang) {
  const out = [];
  for (const d of CONTENT_DIRS) {
    const dir = path.join(ROOT, d, lang);
    const entries = await fs.readdir(dir).catch(() => []);
    for (const f of entries) if (/\.mdx?$/.test(f)) out.push(path.join(dir, f));
  }
  return out;
}

async function buildSlugIndex() {
  const byKey = new Map();
  const bySlug = new Map();
  for (const lang of ['en', ...ALL_TARGETS]) {
    for (const file of await listFiles(lang)) {
      const { data } = matter(await fs.readFile(file, 'utf8'));
      byKey.set(`${lang}:${data.translationKey}`, { file, slug: data.slug });
      bySlug.set(`${lang}:${data.slug}`, data.translationKey);
    }
  }
  return { byKey, bySlug };
}

async function loadDotEnv() {
  const file = await fs.readFile(path.join(path.dirname(new URL(import.meta.url).pathname), '../../.env'), 'utf8').catch(() => '');
  for (const line of file.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

function fail(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}
