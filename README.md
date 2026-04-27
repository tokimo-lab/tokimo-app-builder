# @tokimo/app-builder

Shared Vite preset and shell-deps constants for Tokimo third-party app UIs.

## Purpose

Eliminates the ~50-line boilerplate `vite.config.ts` that every app previously
duplicated, and provides a **single source of truth** for which packages the
shell exposes to apps at runtime via `<script type="importmap">`.

## Exports

### `@tokimo/app-builder/shared`

Constants consumed by both sides of the shell/app boundary:

- `SHELL_DEP_PACKAGES` — tuple of package names the shell injects at runtime
- `shellDepSlug(name)` — converts a package name to its `/__deps__/<slug>.js` basename
- `ShellDepPackage` — union type of the above names

### `@tokimo/app-builder/vite`

- `defineTokimoApp(options?)` — returns a fully-configured Vite config for
  library-mode builds. Bundles app code + CSS into `dist/index.js` /
  `dist/index.css`; keeps React, ReactDOM, `@tokimo/ui`, and `@tokimo/sdk`
  external so the browser resolves them from the shell's importmap.

## Usage

```ts
// apps/<id>/ui/vite.config.ts
import { defineTokimoApp } from "@tokimo/app-builder/vite";
export default defineTokimoApp();
```

Optional options: `entry`, `root`, `extraExternal`, `overrides`.
