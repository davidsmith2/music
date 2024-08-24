// src/global.d.ts
interface Window {
  electron: {
    ipcRenderer: {
      invoke(channel: string, ...args: any[]): Promise<any>;
    };
  };
}