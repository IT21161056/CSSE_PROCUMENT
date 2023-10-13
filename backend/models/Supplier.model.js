const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
    supplierName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    location: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    productList: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
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
});

module.exports = Supplier = mongoose.model("Supplier", SupplierSchema);
