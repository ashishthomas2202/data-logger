exports.config = require("../data/config.json");

exports.setConfig = (newConfig) => {
  const data = JSON.stringify(newConfig, null, 4);
  fs.writeFileSync(configPath, data);
};
