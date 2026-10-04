import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/website/" : "/",
  plugins: [react()],
  resolve: {
    alias: { "@": root },
  },
  build: {
    outDir: "dist-pages",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/main.js",
        chunkFileNames: "assets/site.js",
        assetFileNames: "assets/[name].[ext]",
      },
      input: {
        home: resolve(root, "index.html"),
        "web-design/index": resolve(root, "web-design/index.html"),
        "social-media/index": resolve(root, "social-media/index.html"),
        "apps/index": resolve(root, "apps/index.html"),
        "seo/index": resolve(root, "seo/index.html"),
        "contact/index": resolve(root, "contact/index.html"),
      },
    },
  },
});
