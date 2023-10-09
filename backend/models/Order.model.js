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
      supplier: { type: String, required: true },
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

// order_document = {
//   requiredDate: { type: String, required: true },
//   site: { type: String, required: true },
// };

// productList: [
//   {
//     item: { type: String, required: true },
//     suppliers: [
//       {
//         name: { type: String, required: true },
//         qty: { type: Number, required: true },
//       },
//     ],
//   },
// ]
module.exports = Order = mongoose.model("Order", OrderSchema);
