const { app, ipcMain, dialog } = require("electron");
const { mainWindow } = require("../../electron/main");
const path = require("path");
const fs = require("fs");

const appRegistryFilePath = path.join(
  app.getPath("userData"),
  "appRegistry.json"
);

// Function to get the app registry data
function getAppRegistry() {
  console.log(appRegistryFilePath);
  if (!fs.existsSync(appRegistryFilePath)) {
    // If the registry file doesn't exist, create it with an empty tasks array
    fs.writeFileSync(
      appRegistryFilePath,
      JSON.stringify({ tasks: [] }, null, 2),
      "utf8"
    );
  }
  const registryData = fs.readFileSync(appRegistryFilePath, "utf8");
  return JSON.parse(registryData);
}

// Function to add a task to the app registry
function addTaskToRegistry(taskData) {
  const registry = getAppRegistry();
  registry.tasks.push(taskData);
  fs.writeFileSync(
    appRegistryFilePath,
    JSON.stringify(registry, null, 2),
    "utf8"
  );
}

ipcMain.handle("create-task", async (event, task) => {
  try {
    // const result = await createTask(taskDetails); // This should be an async function

    console.log("Task Received", task);

    const folderPath = path.join(task.location, task.name);
    await fs.promises
      .mkdir(folderPath, { recursive: true })
      .catch(console.error);
    const taskPath = path.join(folderPath, "data.json");
    await fs.promises.writeFile(
      taskPath,
      JSON.stringify(task.fields, null, 2),
      "utf8"
    );

    addTaskToRegistry({
      name: task.name,
      location: task.location,
      createdAt: new Date(),
    });
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

ipcMain.handle("get-all-tasks", async (event) => {
  try {
    const registry = getAppRegistry();

    return { status: "success", tasks: registry.tasks };
  } catch (error) {
    return { status: "error", message: error.message };
  }
});
