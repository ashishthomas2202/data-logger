const config = require("../data/config.json");

exports.allTasks = (req, res) => {
  let tasks = [];

  if (config && config.tasks) {
    tasks = config.tasks;
  }

  return res.json({ tasks: tasks });
};

exports.createTask = (req, res) => {
  console.log(req.body);
  return res.json({
    message: "Task created",
    task: [],
  });
};
