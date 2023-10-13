const express = require("express");
const router = express.Router();

const { addReviewedOrder } = require("../controllers/orderReview.controller");

router.post("/", addReviewedOrder);

module.exports = router;
