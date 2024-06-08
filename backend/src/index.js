require("dotenv").config();
const app = require("./app");
const config = require("./config/config.js");
const { connectDB } = require("./db");

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Express server connection failed ", error);
    });
    app.listen(config.port, () => {
      console.log(`🚀Express server is running at port:${config.port}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection failed !!!, ${error}`);
  });
