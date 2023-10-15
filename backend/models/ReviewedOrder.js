const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewedSchema = new Schema({
  orderID: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  productList: [
    {
      subOrderId: { type: String },
      isComplete: { type: Boolean },
      product: { type: String },
      price: { type: Number },
      qnty: { type: Number },
      supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
    },
  ],
  review: { type: String },
  totalCost: { type: String },
  deliveryList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
    },
  ],
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
  },
  placedDate: {
    type: String,
  },
  requiredDate: {
    type: String,
  },
  approvalStatus: {
    type: Boolean,
  },
  status: {
    type: String,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice",
  },
});

module.exports = Order = mongoose.model("Reviewed", ReviewedSchema);
