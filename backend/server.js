const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8072;
dotenv.config();

connectDB();

app.use(cors());

app.use(express.json()); //this is a buit in middleware

const siteManagerRoute = require("./routes/siteManager.routes.js");
app.use("/siteManager", siteManagerRoute);

const supplierRoute = require("./routes/supplier.route.js");
app.use("/supplier", supplierRoute);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
