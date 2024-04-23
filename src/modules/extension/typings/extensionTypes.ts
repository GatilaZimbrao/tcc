export enum EXTENSION_TYPES {
  program = "program",
  project = "project",
}

export type ExtensionTypes = keyof typeof EXTENSION_TYPES;
