import { copyFile } from "node:fs/promises";
import { resolve } from "node:path";

// Pages can cache HTML from the preceding deployments after replacing their
// assets. Keep those entrypoint URLs available during the transition to stable
// filenames so previously loaded HTML does not render without CSS or script.
const assetRoot = resolve("dist-pages/assets");
const aliases = {
  "main.css": ["main-Bmi5Pt8E.css", "main-6vDRUVHk.css"],
  "site.js": ["main-CbMsfslx.js", "main-C22QwayC.js"],
};

for (const [source, names] of Object.entries(aliases)) {
  for (const name of names) await copyFile(resolve(assetRoot, source), resolve(assetRoot, name));
}
