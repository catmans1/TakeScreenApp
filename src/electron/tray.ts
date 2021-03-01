import { app, BrowserWindow, Tray, Menu, nativeImage } from 'electron';
import path from 'path';

import { getAppBasePath } from './helper';

export default class TrayBuilder {
  mainWindow: BrowserWindow;
  tray: Tray;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    const trayIcon = nativeImage.createFromPath(
      path.join(getAppBasePath(), 'public', 'logo192.png')
    );
    this.tray = new Tray(trayIcon.resize({ height: 20, width: 20 }));
    const menu = Menu.buildFromTemplate([
      {
        label: 'Show',
        click: function () {
          mainWindow.show();
        },
      },
      {type:"separator"},
      {
        label: 'Exit',
        click: function () {
          app.quit();
        },
      },
    ]);
    this.tray.on('double-click', function () {
      mainWindow.show();
    });
    this.tray.setToolTip('Screen app');
    this.tray.setContextMenu(menu);
  }

  quitTray() {
    this.tray.destroy();
  }
}
