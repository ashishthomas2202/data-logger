require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();

// Routes
const taskRoute = require("../server/routes/tasks");

const port = process.env.SERVER_PORT || 5173;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use(express.json());

app.use("/api/tasks", taskRoute);

app.listen(port, () => {
  console.log("Server is running on port " + port + "...");
});

module.exports = app;
