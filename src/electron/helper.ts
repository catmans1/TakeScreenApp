import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';

export const getBuildBasePath = () =>
  isDev ? path.join(__dirname, '..') : path.join(app.getAppPath(), '..');

export const getAppBasePath = () =>
  isDev ? path.join(__dirname, '..', '..') : path.join(app.getAppPath());

export const addCloseListener = (win: BrowserWindow) => {
  win.setSkipTaskbar(false);
  win.show();
  closeListener(win);
};

export const closeListener = (win: BrowserWindow) => {
  win.addListener('close', (e) => {
    e.preventDefault();
    win.minimize();
    win.setSkipTaskbar(true);
    return win.removeAllListeners();
  });
  win.addListener('minimize', () => {
    return () => {
      win.removeAllListeners();
      win.addListener('show', () => {
        addCloseListener(win);
      });
    };
  });
};
