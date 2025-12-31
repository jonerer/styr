import { contextBridge, ipcRenderer } from 'electron';
import type { BaseDirsAPI } from './types';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('baseDirsAPI', {
  getBaseDirs: () => ipcRenderer.invoke('basedirs:get'),
  addBaseDir: (dir: string) => ipcRenderer.invoke('basedirs:add', dir),
  removeBaseDir: (dir: string) => ipcRenderer.invoke('basedirs:remove', dir),
  browseDirectory: () => ipcRenderer.invoke('basedirs:browse'),
} as BaseDirsAPI);
