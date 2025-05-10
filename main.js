// main.js (Electron)
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Express-Server einbinden:
require('./server.js');   // <-- Startet den Server, wenn Electron startet

function createWindow () {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: false,
    kiosk: true,
    autoHideMenuBar: true,
  });

  win.loadURL('http://localhost:3001/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});