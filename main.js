const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fontList = require("font-list");

let mainWindow;

ipcMain.removeHandler("load-fonts");
ipcMain.handle("load-fonts", async () => {
  return fontList.getFonts2({ disableQuoting: true });
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1020,
    height: 750,
    webPreferences: {
      nodeIntegration: false,    
      contextIsolation: true,    
      preload: path.join(__dirname, 'preload.js') 
    }
  });

  mainWindow.removeMenu();

  const startUrl = app.isPackaged 
    ? `file://${path.join(__dirname, 'dist/index.html')}`
    : 'http://localhost:5173';                             

  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
