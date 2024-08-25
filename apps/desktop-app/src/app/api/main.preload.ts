import { contextBridge, ipcRenderer, shell } from 'electron';
const path = require('path');

contextBridge.exposeInMainWorld('electron', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,
  ipcRenderer: {
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
    on: (channel, listener) => ipcRenderer.on(channel, listener)
  },
  shell: {
    openExternal: (url) => shell.openExternal(url)
  },
  path: path,
});
