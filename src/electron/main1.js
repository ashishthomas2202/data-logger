const { app, BrowserWindow, ipcMain, dialog } = require("electron");
// require("../react/ipc/ipcHandlers/taskHandler");
// const server = require("../src/server");
const path = require("node:path");
const isDev = require("electron-is-dev");
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    // frame: false,
    // transparent: true,
    minWidth: 350,
    minHeight: 350,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),

      contextIsolation: true,
    },
  });

  console.log("**************preload link", path.join(__dirname, "preload.js"));

  const root = isDev
    ? "http://localhost:5173/"
    : `file://${path.join(__dirname, "../dist-electron/index.html")}`;

  // if (!config.initialized) {
  //   mainWindow.loadURL(`${root}initialize`);
  // } else {
  //   mainWindow.loadURL(root);
  // }

  mainWindow.loadURL(root);

  // // Load the index.html file
  // if (app.isPackaged) {
  //   // If the app is packaged, load from the 'dist' directory
  //   const indexHTML = path.join(__dirname, "../../dist-electron/index.html");
  //   mainWindow.loadFile(indexHTML);
  // } else {
  //   // If in development, load from the Vite dev server
  //   const indexHTML = url.format({
  //     protocol: "http:",
  //     host: "localhost:5173", // or wherever your Vite dev server is running
  //     pathname: "index.html",
  //     slashes: true,
  //   });
  //   mainWindow.loadURL(indexHTML);
  // }

  // close the window
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // open dev tools
  mainWindow.webContents.openDevTools();
}

// create the window on electron initialization
app.whenReady().then(() => createWindow());
// app.on("ready", () => setTimeout(createWindow, 3000));

// quit the app when all windows are closed (Windows & Linux)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// create the window when app is activated (macOS)
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle("open-directory-dialog", async (event) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
  });
  if (result.canceled) {
    return null; // User cancelled the dialog
  } else {
    return result.filePaths[0]; // The path of the selected directory
  }
});
// ipcMain.handle("get-tasks", async (event) => {
//   console.log("handle:get-tasks", config.tasks);
//   return config.tasks;
// });
