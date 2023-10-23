require("dot-env").config();
const fs = require("fs");
const path = require("path");
const { app } = require("electron");

function getConfig() {
  if (!fs.existsSync(configPath)) {
    return {};
  }

  const rawData = fs.readFileSync(configPath);
  return JSON.parse(rawData);
}

function setConfig(newConfig) {
  const data = JSON.stringify(newConfig, null, 4);
  fs.writeFileSync(configPath, data);
}

function setDataFolderLocation(location) {
  const config = getConfig();
  config.dataFolderLocation = location;
  setConfig(config);
}

module.exports = {
  getConfig,
  setConfig,
  setDataFolderLocation,
};
