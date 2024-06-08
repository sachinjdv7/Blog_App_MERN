const mongoose = require("mongoose");
const config = require("../config/config.js");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(config.mongoose.url);
    console.log(
      `\n🚀MongoDB connected DB HOST: ${connectionInstance.connection.host} `
    );
  } catch (error) {
    console.log("MongoDB connection Failed:", error);
    process.exit(1);
  }
};

module.exports = { connectDB };
