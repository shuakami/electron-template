import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('native', {
  openExternal: (url: string) => ipcRenderer.invoke('open-external', url)
}) 