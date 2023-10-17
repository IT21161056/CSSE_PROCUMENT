const mongoose = require("mongoose");

const recommendsSchema = new mongoose.Schema(
  {
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
