// news-image-20261117 v5 — "The Day the Bridge Fell".
//
// The program emits one file: a 1024x1024 front page that sums up
// Tuesday 17 November 2026 in 43 stories. The page is built around
// a single idea — the Kerch Bridge collapse is the story of the
// day, so it gets the whole top half of the page as one giant
// cinematic hero ("THE BRIDGE FELL"), with a three-step timeline
// underneath tracing how the bridge fell: Monday's first strike,
// Tuesday's second strike, and the span falling overnight. Twelve
// compact panels and a thirty-item list carry the rest of the day.
//
// The artwork itself was composed offline (PIL + flat-vector panel
// art, every figure verified against at least two news sources),
// so this program's only job is to place the finished page in the
// output directory. It reads no clock, no network and no random
// source: run it twice and the bytes are identical.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ARTWORK = "entry.png";
const STORY_COUNT = 43;

function emitArtwork(): string {
  const entryDir = dirname(fileURLToPath(import.meta.url));
  const sourcePath = join(entryDir, ARTWORK);
  if (!existsSync(sourcePath)) {
    throw new Error(`missing artwork next to main.ts: ${ARTWORK}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const destPath = join(outDir, ARTWORK);
  copyFileSync(sourcePath, destPath);
  if (!existsSync(destPath) || statSync(destPath).size === 0) {
    throw new Error(`copy failed: ${destPath} is missing or empty after copy`);
  }
  return destPath;
}

const written = emitArtwork();
console.log(
  `wrote ${written} — ${STORY_COUNT} stories, Tuesday 17 November 2026, ` +
    "one giant hero: the bridge fell",
);
