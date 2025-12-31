// Type definitions for window.baseDirsAPI

export interface AddBaseDirResult {
  success: boolean;
  alreadyExists: boolean;
}

export interface RemoveBaseDirResult {
  success: boolean;
}

export interface BaseDirsAPI {
  getBaseDirs: () => Promise<string[]>;
  addBaseDir: (dir: string) => Promise<AddBaseDirResult>;
  removeBaseDir: (dir: string) => Promise<RemoveBaseDirResult>;
  browseDirectory: () => Promise<string | null>;
}

declare global {
  interface Window {
    baseDirsAPI?: BaseDirsAPI;
  }
}

export {};
