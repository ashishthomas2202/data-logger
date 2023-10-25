const express = require("express");
const router = express.Router();

const { allTasks } = require("../controllers/tasks");

router.get("/", allTasks);

module.exports = router;
