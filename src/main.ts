import electron from 'electron';
const { app, BrowserWindow, ipcMain, dialog } = electron;
import * as path from 'path';
import Store from 'electron-store';

// Define the store schema
interface StoreSchema {
  baseDirs: string[];
}

// Store will be initialized after app is ready
let store: Store<StoreSchema>;

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
function setupIpcHandlers(): void {
  ipcMain.handle('basedirs:get', () => {
    return store.get('baseDirs', []);
  });

  ipcMain.handle('basedirs:add', (_event, dir: string) => {
    const baseDirs = store.get('baseDirs', []);
    if (!baseDirs.includes(dir)) {
      baseDirs.push(dir);
      store.set('baseDirs', baseDirs);
      return { success: true, alreadyExists: false };
    }
    return { success: true, alreadyExists: true };
  });

  ipcMain.handle('basedirs:remove', (_event, dir: string) => {
    const baseDirs = store.get('baseDirs', []);
    const filtered = baseDirs.filter((d) => d !== dir);
    store.set('baseDirs', filtered);
    return { success: true };
  });

  ipcMain.handle('basedirs:browse', async () => {
    if (!mainWindow) {
      return null;
    }
    
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    });
    
    if (result.canceled) {
      return null;
    }
    
    return result.filePaths[0] || null;
  });
}

app.whenReady().then(() => {
  // Initialize electron-store after app is ready
  store = new Store<StoreSchema>({
    name: 'styr-config',
    defaults: {
      baseDirs: [],
    },
  });

  // Setup IPC handlers
  setupIpcHandlers();

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
