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

const productRoutes = require("./routes/product.routes.js");
app.use("/product", productRoutes);

const siteRoutes = require("./routes/site.routes.js");
app.use("/site", siteRoutes);

// pasindu route
const supplierRoute = require("./routes/supplier.route.js");
app.use("/supplier", supplierRoute);

const orderRoute = require("./routes/order.routes.js");
app.use("/order", orderRoute);

const requestRoutes = require("./routes/request.routes");
app.use("/requestlist", requestRoutes);


mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
