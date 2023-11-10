const { ipcMain } = require("electron");

ipcMain.handle("create-task", async (event, task) => {
  try {
    // const result = await createTask(taskDetails); // This should be an async function
    const result = task;
    return { status: "success", data: result };
  } catch (error) {
    return { status: "error", message: error.message };
  }
});
