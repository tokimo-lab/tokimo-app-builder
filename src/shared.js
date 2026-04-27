/**
 * Single source of truth for modules the shell shares with third-party apps
 * via `<script type="importmap">` + `window.__TKM_DEPS__`.
 *
 * Both `packages/web/vite-plugins/shell-deps.ts` (shell side: serves shims +
 * injects importmap) and `defineTokimoApp` in this package (app side: marks
 * these as Vite externals) consume this list. Keeping it in one place
 * guarantees they stay in sync.
 *
 * To add a new shared dep: append its package name here, restart dev server,
 * rebuild any apps that need it.
 */
export const SHELL_DEP_PACKAGES = Object.freeze([
  "react",
  "react/jsx-runtime",
  "react-dom",
  "react-dom/client",
  "@tokimo/ui",
  "@tokimo/sdk",
]);

/**
 * URL-safe slug for a package name — used as the shim file basename under
 * `/__deps__/`. Examples:
 *   "react"              → "react"
 *   "react/jsx-runtime"  → "react-jsx-runtime"
 *   "@tokimo/ui"         → "tokimo-ui"
 *   "@tokimo/sdk"        → "tokimo-sdk"
 *
 * @param {string} name
 * @returns {string}
 */
export function shellDepSlug(name) {
  return name.replace(/^@/, "").replace(/\//g, "-");
}
