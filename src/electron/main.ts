import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';

import TrayBuilder from './tray';
import NewRecord from './monitor';

// let mainWindow: any;
Menu.setApplicationMenu(null);
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    autoHideMenuBar: true,
    center: true,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3333/index.html'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    try {
      require('electron-reloader')(module);
    } catch (_) {}
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
  }

  let tray: any = null;
  let monitor: any = null;
  mainWindow.on('minimize', function (event: any) {
    event.preventDefault();
    mainWindow.setSkipTaskbar(true);
    tray = new TrayBuilder(mainWindow);
    monitor = new NewRecord(mainWindow);
  });

  mainWindow.on('restore', function (event: any) {
    mainWindow.show();
    mainWindow.setSkipTaskbar(false);
    tray.quitTray();
    monitor.quit();
    mainWindow.webContents.send('show-user', 'minimize');
  });

  return mainWindow;
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('message-send', (event, arg) => {
  console.log('react send to electron', arg);
});

export {};
