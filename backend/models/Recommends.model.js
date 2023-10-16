const mongoose = require("mongoose");

const recommendsSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RecommendsModel", recommendsSchema);
