const { ipcMain, dialog } = require("electron");
const { mainWindow } = require("../../electron/main");
const path = require("path");
const fs = require("fs");
ipcMain.handle("create-task", async (event, task) => {
  try {
    // const result = await createTask(taskDetails); // This should be an async function

    console.log("Task Received", task);

    const folderPath = path.join(task.location, task.task);
    await fs.promises
      .mkdir(folderPath, { recursive: true })
      .catch(console.error);
    const taskPath = path.join(folderPath, "data.json");
    await fs.promises.writeFile(
      taskPath,
      JSON.stringify(task.fields, null, 2),
      "utf8"
    );

    const result = task;

    return { status: "success", data: result };
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
