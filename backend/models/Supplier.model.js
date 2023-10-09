const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  orderList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  productList: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

module.exports = Supplier = mongoose.model("Supplier", SupplierSchema);
