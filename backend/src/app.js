const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Blog Test</h1>");
});

const userRoutes = require("../src/routes/user.routes");

app.use("/v1/users", userRoutes);

module.exports = app;
