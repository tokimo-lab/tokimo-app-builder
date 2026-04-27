export declare const SHELL_DEP_PACKAGES: readonly [
  "react",
  "react/jsx-runtime",
  "react-dom",
  "react-dom/client",
  "@tokimo/ui",
  "@tokimo/sdk",
];

export type ShellDepPackage = (typeof SHELL_DEP_PACKAGES)[number];

export declare function shellDepSlug(name: string): string;
