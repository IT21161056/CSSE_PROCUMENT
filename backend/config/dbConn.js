const mongoose = require("mongoose");
const dotenv = require("dotenv");

let connectionInstance; //create a instance 

const connectDB = async () => {
  try {
    if (!connectionInstance) {
      // Create a new connection only if it doesn't exist
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      connectionInstance = mongoose.connection;
      console.log("Connected to MongoDB");
    }
    return connectionInstance;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};

module.exports = connectDB;
