const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SiteSchema = new Schema({
  siteName: {
    type: String,
  },
  siteAddress: {
    type: String,
  },
  siteContactNumber: {
    type: String,
  },
  orderList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: [],
    },
  ],
  siteManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SiteManager",
  },
  allocatedBudget: {
    type: Number,
  }
});

module.exports = mongoose.model("Site", SiteSchema);
