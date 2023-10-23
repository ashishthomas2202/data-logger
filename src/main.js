// const { app, BrowserWindow, ipcMain } = require("electron");
// // const path = require("path");
// const isDev = require("electron-is-dev");
// const { config } = require("../utils/initialization");

// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 900,
//     height: 680,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//     },
//   });

//   console.log("config:", config);
//   // const root = isDev
//   //   ? "http://localhost:5173"
//   //   : `file://${path.join(__dirname, "../dist/index.html")}`;

//   const root = "http://localhost:5173";

//   console.log("config.initialized:", config.initialized);
//   // if (!config.initialized || config.tasks.length === 0) {
//   //   mainWindow.loadURL(root);
//   // } else {
//   //   mainWindow.loadURL(root);
//   // }
//   mainWindow.loadURL(root);
//   mainWindow.on("closed", () => {
//     mainWindow = null;
//   });

//   mainWindow.webContents.openDevTools();
// }

// // Create window on electron initialization
// app.whenReady().then(() => createWindow());

// // Quit when all windows are closed (Windows & Linux)
// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") app.quit();
// });

// // Re-create window on app activation (macOS)
// app.on("activate", () => {
//   if (mainWindow === null) createWindow();
// });

// // ipcMain.handle("get-tasks", async (event) => {
// //   console.log("handle:get-tasks");
// //   return config.tasks;
// // });

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { config } = require("../utils/initialization");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  console.log("preload link", path.join(__dirname, "preload.js"));

  const root = isDev
    ? "http://localhost:5173/"
    : `file://${path.join(__dirname, "../dist/index.html")}`;

  if (!config.initialized) {
    mainWindow.loadURL(`${root}initialize`);
  } else {
    mainWindow.loadURL(root);
  }
  // close the window
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // open dev tools
  mainWindow.webContents.openDevTools();
}

// create the window on electron initialization
app.whenReady().then(() => createWindow());

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

ipcMain.handle("get-tasks", async (event) => {
  console.log("handle:get-tasks", config.tasks);
  return config.tasks;
});
