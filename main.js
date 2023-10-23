require("dotenv").config();

const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: `${__dirname}/preload.js`,
    },
  });

  win.loadFile("index.html");

  if (process.env.NODE_ENV === "development") {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  // create a window if none exists when the app is activate (Mac)
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed (windows and linux).
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
