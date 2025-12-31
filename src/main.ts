import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import Store from 'electron-store';

// Define the store schema
interface StoreSchema {
  baseDirs: string[];
}

// Initialize electron-store
const store = new Store<StoreSchema>({
  defaults: {
    baseDirs: [],
  },
});

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Load the index.html file
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist-renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC handlers for base directories management
ipcMain.handle('basedirs:get', () => {
  return store.get('baseDirs', []);
});

ipcMain.handle('basedirs:add', (_event, dir: string) => {
  const baseDirs = store.get('baseDirs', []);
  if (!baseDirs.includes(dir)) {
    baseDirs.push(dir);
    store.set('baseDirs', baseDirs);
  }
});

ipcMain.handle('basedirs:remove', (_event, dir: string) => {
  const baseDirs = store.get('baseDirs', []);
  const filtered = baseDirs.filter((d) => d !== dir);
  store.set('baseDirs', filtered);
});

ipcMain.handle('basedirs:browse', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  
  if (result.canceled) {
    return null;
  }
  
  return result.filePaths[0] || null;
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
