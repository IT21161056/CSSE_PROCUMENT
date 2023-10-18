const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  rid: {
    type: String,
  },
  oid: {
    type: String,
  },
  orderList: [
    {
      orderRef: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
      tbudget: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
      status: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
      default:[],
    },
  ],
  abudget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site"
  },
  state: {
    type: String,
  },
});


module.exports = Request = mongoose.model("Request", RequestSchema);