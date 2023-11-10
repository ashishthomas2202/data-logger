const { app } = require("electron");
const path = require("path");
const fs = require("fs");

const appRegistryFilePath = path.join(
  app.getPath("userData"),
  "appRegistry.json"
);

// Function to get the app registry data
const getAppRegistry = () => {
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
};

const resetAppRegistry = () => {
  const registryData = {
    tasks: [],
  };
  fs.writeFileSync(
    appRegistryFilePath,
    JSON.stringify(registryData, null, 2),
    "utf8"
  );
};

// Function to add a task to the app registry
const addTaskToRegistry = (taskData) => {
  const registryData = getAppRegistry();
  registryData.tasks.push(taskData);
  fs.writeFileSync(
    appRegistryFilePath,
    JSON.stringify(registryData, null, 2),
    "utf8"
  );
};

const createFolder = (location, folderName) => {
  // Construct folder path
  const folderPath = path.join(location, folderName);

  // Synchronously create the directory if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const createFile = (location, fileName, fileContent) => {
  const filePath = path.join(location, fileName);
  fs.writeFileSync(filePath, fileContent, "utf8");
};

module.exports = {
  getAppRegistry,
  resetAppRegistry,
  addTaskToRegistry,
  createFolder,
  createFile,
};
