const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestListSchema = new Schema({
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
  },
  rid: {
    type: String,
  },
  oid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  tbudget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  abudget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
  },
  state: {
    type: String,
  },
});

module.exports = mongoose.model("RequestList", RequestListSchema);