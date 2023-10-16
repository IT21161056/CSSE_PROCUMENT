const express = require("express");
const router = express.Router();

const {
  getOrderList,
  addOrderBySiteManager,
  updateOrderBySiteManager,
  getOrderByOrderId,
} = require("../controllers/order.controller");

router.get("/", getOrderList);
router.post("/:id", addOrderBySiteManager);
router.put("/:id", updateOrderBySiteManager);
router.get("/:id", getOrderByOrderId);

module.exports = router;
