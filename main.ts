// South Africa in Numbers — make.fun entry for
// best-national-statistics-site-20261126-0539 (Node 22, standard library only).
// The site is static files under app/ (index.html + local CSS/JS, no build step,
// no network requests). This program hands it in: it copies app/ and
// screenshots/ to $MAKEFUN_OUTPUT_DIR (which stands in for /output outside
// the grader) and writes dossier.json there with buildDossier from the
// vendored make.fun library, exactly as the kit starter's main.ts does.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = dirname(fileURLToPath(import.meta.url));
const appDir = join(here, 'app');
const shotsDir = join(here, 'screenshots');
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error('MAKEFUN_OUTPUT_DIR is not set');
}

const indexHtml = join(appDir, 'index.html');
if (!existsSync(indexHtml)) {
  throw new Error('app/index.html is missing');
}
for (const need of ['data.js', 'app.js', 'styles.css']) {
  if (!existsSync(join(appDir, need))) {
    throw new Error(`app/${need} is missing`);
  }
}
if (!existsSync(shotsDir)) {
  throw new Error('screenshots/ is missing');
}
const shots = readdirSync(shotsDir).filter((n) => !statSync(join(shotsDir, n)).isDirectory());
if (shots.length < 3 || shots.length > 4) {
  throw new Error(`screenshots/ holds ${shots.length} files, expected 3 or 4`);
}
for (const shot of shots) {
  if (!/\.(png|jpe?g)$/i.test(shot)) {
    throw new Error(`screenshots/${shot} is not a PNG or JPEG screenshot`);
  }
  if (statSync(join(shotsDir, shot)).size === 0) {
    throw new Error(`screenshots/${shot} is empty`);
  }
}

// The site must work offline: fail if any shipped file pulls from the network.
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}
for (const file of walk(appDir)) {
  // The SVG namespace URI is an identifier, never fetched — allow it.
  const text = readFileSync(file, 'utf8').replaceAll('http://www.w3.org/2000/svg', '');
  if (/https?:\/\//.test(text) || /src\s*=\s*["']\/\//.test(text)) {
    throw new Error(`${file} references an external URL — the site must be self-contained`);
  }
}

mkdirSync(outDir, { recursive: true });
cpSync(appDir, join(outDir, 'app'), { recursive: true });
mkdirSync(join(outDir, 'screenshots'), { recursive: true });
cpSync(shotsDir, join(outDir, 'screenshots'), { recursive: true });
const copied = walk(join(outDir, 'app')).length;
if (copied < 4) {
  throw new Error(`only ${copied} files copied to ${outDir}/app, expected at least 4`);
}

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the
// bytes; the others refuse an entry the scorer would refuse (more than 4
// screenshots or one over 256 KiB; more than 993 files and directories in
// app/ or 16 MiB of app files).
writeFileSync(
  join(outDir, 'dossier.json'),
  buildDossier(outDir, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
console.log(`copied ${copied} files from app/ to ${outDir}/app, screenshots/ copied, dossier.json written`);
