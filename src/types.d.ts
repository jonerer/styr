// Type definitions for window.baseDirsAPI

export interface BaseDirsAPI {
  getBaseDirs: () => Promise<string[]>;
  addBaseDir: (dir: string) => Promise<void>;
  removeBaseDir: (dir: string) => Promise<void>;
  browseDirectory: () => Promise<string | null>;
}

declare global {
  interface Window {
    baseDirsAPI: BaseDirsAPI;
  }
}

export {};
