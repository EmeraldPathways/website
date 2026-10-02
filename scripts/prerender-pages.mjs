import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const basePath = process.env.GITHUB_PAGES === "true" ? "/website" : "";
const root = process.cwd();
const outputRoot = resolve(root, "dist-pages");
const server = await createServer({
  configFile: resolve(root, "vite.pages.config.ts"),
  appType: "custom",
  logLevel: "error",
  // SSR module loading does not need a dev server or HMR websocket. Disabling
  // both keeps this prerender step usable in restricted CI environments.
  server: { middlewareMode: true, hmr: false, watch: null },
});

try {
  const { routePages } = await server.ssrLoadModule("/app/route-pages.tsx");
  const homeHtml = await readFile(resolve(outputRoot, "index.html"), "utf8");
  const styles = [...homeHtml.matchAll(/<link[^>]+href="([^"]+\.css)"[^>]*>/g)]
    .map((match) => match[0])
    .join("\n    ");
  const scripts = [...homeHtml.matchAll(/<script[^>]+src="([^"]+\.js)"[^>]*><\/script>/g)]
    .map((match) => match[0])
    .join("\n    ");

  for (const { path, Component } of routePages) {
    globalThis.window = { location: { pathname: `${basePath}${path === "/" ? "/" : `${path}/`}` } };
    const content = renderToString(createElement(Component));
    const routeDirectory = path === "/" ? outputRoot : resolve(outputRoot, path.slice(1));
    const htmlPath = path === "/" ? resolve(outputRoot, "index.html") : resolve(routeDirectory, "index.html");
    const sourceHtml = path === "/" ? homeHtml : await readFile(resolve(root, path.slice(1), "index.html"), "utf8");
    const renderedHtml = sourceHtml
      .replace('<div id="root"></div>', `<div id="root">${content}</div>`)
      .replace(/\s*<script[^>]+src="[^"]+\.js"[^>]*><\/script>/g, "")
      .replace(/\s*<link[^>]+href="[^"]+\.css"[^>]*>/g, "")
      .replace("</head>", `    ${styles}\n  </head>`)
      .replace("</body>", `    ${scripts}\n  </body>`);
    await mkdir(dirname(htmlPath), { recursive: true });
    await writeFile(htmlPath, renderedHtml);
  }
} finally {
  delete globalThis.window;
  await server.close();
}
