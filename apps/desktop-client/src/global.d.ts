// src/global.d.ts
interface Window {
  electron: {
    ipcRenderer: {
      invoke(channel: string, ...args: any[]): Promise<any>;
      on(channel: string, listener: (event: any, ...args: any[]) => void): void;
    };
    shell: {
      openExternal(url: string): void;
    };
  };
}