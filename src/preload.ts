import { contextBridge, ipcRenderer } from 'electron';

// Define the API shape
export interface BaseDirsAPI {
  getBaseDirs: () => Promise<string[]>;
  addBaseDir: (dir: string) => Promise<void>;
  removeBaseDir: (dir: string) => Promise<void>;
  browseDirectory: () => Promise<string | null>;
}

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('baseDirsAPI', {
  getBaseDirs: () => ipcRenderer.invoke('basedirs:get'),
  addBaseDir: (dir: string) => ipcRenderer.invoke('basedirs:add', dir),
  removeBaseDir: (dir: string) => ipcRenderer.invoke('basedirs:remove', dir),
  browseDirectory: () => ipcRenderer.invoke('basedirs:browse'),
} as BaseDirsAPI);

// Declare global types for TypeScript
declare global {
  interface Window {
    baseDirsAPI: BaseDirsAPI;
  }
}
