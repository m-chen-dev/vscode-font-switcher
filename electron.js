// electron.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1020,
    height: 750,
    webPreferences: {
      nodeIntegration: false,    // Set to false for security
      contextIsolation: true,     // Protects your application
      preload: path.join(__dirname, 'preload.js') // Optional: For Node APIs
    }
  });

  // If in development, load the localhost server; otherwise, load local build files
  const startUrl = app.isPackaged 
    ? `file://${path.join(__dirname, 'build/index.html')}` // Change 'build' to 'dist' if using Vite
    : 'http://localhost:3000';                              // Change port to 5173 if using Vite

  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
