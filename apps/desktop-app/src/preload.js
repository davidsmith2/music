// preload.js
const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: ipcRenderer,
  path: path,
});