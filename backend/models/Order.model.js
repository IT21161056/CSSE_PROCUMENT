const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  isDraft: {
    type: Boolean,
  },
  productList: [
    {
      price: { type: Number, required: true },
      product: { type: String, required: true },
      qnty: { type: Number, required: true },
      supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
      supplierName: { type: String, required: true },
    },
  ],
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
  siteName: {
    type: String,
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

module.exports = Order = mongoose.model("Order", OrderSchema);
