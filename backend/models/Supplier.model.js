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
      product: { type: String, required: true },
      site: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
      quantity: { type: Number, required: true },
      requiredDate: { type: String, required: true },
      status: { type: String, required: true, default: "pending" },
      orderRef: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
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
