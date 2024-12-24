import autoprefixer from "autoprefixer";
import { defineConfig, loadEnv } from "vite";
import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";
import react from "@vitejs/plugin-react";
import { BuildSettings } from "./devtools/dev-server";

const ENV = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  resolve: {
    alias: BuildSettings.aliases,
  },
  server: {
    host: "localhost",
    port: 3000,
    open: true,
  },
  build: {
    sourcemap: BuildSettings.PRODUCTION,
    minify: "terser",
    target: "es2015",
    outDir: "build",
  },
  esbuild: { target: "es2022" },
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: [
            "classProperties",
            [
              "decorators",
              { decoratorsBeforeExport: true, allowCallParenthesized: true },
            ],
          ],
        },
      },
    }),
    createHtmlPlugin({
      minify: true,
      entry: BuildSettings.alias("Root/index.tsx"),
      template: "public/index.html",
    }),
    viteCompression({
      algorithm: "gzip",
      filter: /.(js|mjs|json|css|html|jpg|webp|png|avif)$/i,
    }),
    viteCompression({
      algorithm: "brotliCompress",
      filter: /.(js|mjs|json|css|html|jpg|webp|png|avif)$/i,
    }),
  ],
});
