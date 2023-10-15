const express = require("express");
const router = express.Router();

const {
  addReviewedOrder,
  getReviewedOrders,
} = require("../controllers/orderReview.controller");

router.post("/add", addReviewedOrder);
router.get("/", getReviewedOrders);

module.exports = router;
