import type { UserConfig, UserConfigExport } from "vite";

export interface DefineTokimoAppOptions {
  /** Entry file relative to the app's project root. Default: `src/index.tsx`. */
  entry?: string;
  /** App project root. Default: `process.cwd()`. */
  root?: string;
  /**
   * Extra packages to mark as Rollup external in addition to the shell-shared
   * ones. Anything you want bundled into the app must NOT go here.
   */
  extraExternal?: string[];
  /** Shallow-merged into the resulting Vite config (top level). */
  overrides?: UserConfig;
}

export declare function defineTokimoApp(
  options?: DefineTokimoAppOptions,
): UserConfigExport;
