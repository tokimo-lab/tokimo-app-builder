import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { SHELL_DEP_PACKAGES } from "./shared.js";

/**
 * Vite preset for Tokimo third-party app UIs. Produces an ESM library bundle
 * at `dist/index.js` (+ `dist/index.css`) where React, ReactDOM, @tokimo/ui,
 * and @tokimo/sdk are kept external — the shell injects them at runtime via
 * importmap. This is mandatory: a second React instance breaks hooks.
 *
 * Typical usage:
 *
 *   // apps/<id>/ui/vite.config.ts
 *   import { defineTokimoApp } from "@tokimo/app-builder/vite";
 *   export default defineTokimoApp();
 *
 * @param {import("./vite").DefineTokimoAppOptions} [options]
 */
export function defineTokimoApp(options = {}) {
  const root = options.root ?? process.cwd();
  const entry = resolve(root, options.entry ?? "src/index.tsx");
  const externals = new Set([
    ...SHELL_DEP_PACKAGES,
    ...(options.extraExternal ?? []),
  ]);

  /** @type {import("vite").UserConfig} */
  const base = {
    plugins: [react(), tailwindcss()],
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env": JSON.stringify({}),
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
      cssCodeSplit: false,
      sourcemap: false,
      target: "es2022",
      lib: {
        entry,
        formats: ["es"],
        fileName: () => "index.js",
        cssFileName: "index",
      },
      rollupOptions: {
        external: (id) => externals.has(id),
        output: {
          codeSplitting: false,
        },
      },
    },
  };

  return defineConfig({ ...base, ...options.overrides });
}
