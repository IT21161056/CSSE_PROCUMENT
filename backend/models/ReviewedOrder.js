const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewedSchema = new Schema({
  productList: [
    {
      price: { type: Number, required: true },
      product: { type: String, required: true },
      qnty: { type: Number, required: true },
      supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
    },
  ],
  deliveryList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
    },
  ],
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
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
