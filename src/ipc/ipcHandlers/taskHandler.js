const { ipcMain, dialog } = require("electron");
const path = require("path");
const { mainWindow } = require("../../electron/main");
const {
  getAppRegistry,
  addTaskToRegistry,
  resetAppRegistry,
  createFolder,
  createFile,
} = require("../registryUtils");

ipcMain.handle("create-task", async (event, taskData) => {
  try {
    const task = {
      ...taskData,
      id: `${new Date().getTime()}`,
      totalRecords: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    createFolder(task.location, task.name);

    const folderLocation = path.join(task.location, task.name);

    createFile(folderLocation, "data.json", JSON.stringify({ task }, null, 2));

    addTaskToRegistry(task);

    return { status: "success", data: task };
  } catch (error) {
    return { status: "error", message: error.message };
  }
});

ipcMain.handle("choose-location", async (event) => {
  try {
    const location = await dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory", "createDirectory"], // Allow users to open or create a directory
    });

    console.log(location);
    if (location.canceled) {
      return {
        status: "canceled",
      };
    }

    return { status: "success", path: location.filePaths[0] };
  } catch (error) {
    return { status: "error", message: error.message };
  }
});

ipcMain.handle("get-all-tasks", async (event) => {
  try {
    const registry = getAppRegistry();
    return { status: "success", tasks: registry.tasks };
  } catch (error) {
    return { status: "error", message: error.message };
  }
});

ipcMain.handle("reset", async (event) => {
  try {
    resetAppRegistry();
    return { status: "success" };
  } catch (error) {
    return { status: "error", message: error.message };
  }
});
