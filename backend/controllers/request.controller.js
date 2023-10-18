const Order = require("../models/Order.model");
const Request = require("../models/Request.model");

// // Get Orders for a Specific Site
// const getOrdersForSite = async (req, res) => {
//   try {
//     const siteID = req.params.siteID; // Assuming you pass the site ID as a parameter

//     const orders = await Order.find({ site: siteID });

//     if (!orders || orders.length === 0) {
//       return res.status(404).json({ message: "No orders found for this site." });
//     }

//     res.json(orders);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send("Server Error");
//   }
// };


const getRequestList = async (req, res) => {
  try {
    const requestList = await Request.find();

    if (!requestList) {
      return res.send("No orders!");
    }
    res.json(requestList);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getRequestList
};



  
  
  
  
