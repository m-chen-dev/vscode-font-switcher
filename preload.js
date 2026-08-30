const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    loadFonts: () => ipcRenderer.invoke("load-fonts")
});