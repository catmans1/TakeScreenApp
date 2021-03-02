import { BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';

export default class NewRecord {
  mainWindow: BrowserWindow;

  constructor(mainWP: BrowserWindow) {
    this.mainWindow = new BrowserWindow({
      width: 260,
      height: 26,
      resizable: false,
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      },
      autoHideMenuBar: true,
      center: true,
    });
    this.mainWindow.loadURL(
      isDev
        ? 'http://localhost:3333/index.html#/record'
        : `file://${path.join(__dirname, '../build/index.html#/record')}`
    );
    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow.show();
    });

    this.mainWindow.on('close',  () => {
      mainWP.show();
    });
  }

  quit() {
    this.mainWindow.destroy();
  }

  show() {
    this.mainWindow.show();
  }
}
