import { contextBridge, ipcRenderer } from 'electron';
const path = require('path');

console.log(typeof ipcRenderer.invoke);

contextBridge.exposeInMainWorld('electron', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,
  ipcRenderer: {
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args)
  },
  path: path,
});
