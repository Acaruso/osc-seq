const { app, BrowserWindow } = require('electron');

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1400,
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile(__dirname + '/index.html');
  
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})
