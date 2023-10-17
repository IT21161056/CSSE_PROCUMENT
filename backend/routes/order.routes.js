const express = require("express");
const router = express.Router();

const {
  getOrderList,
  addOrderBySiteManager,
  updateOrderBySiteManager,
  getOrderByOrderId,
  getOrdersBySite,
  updateOrderStatus,
} = require("../controllers/order.controller");

router.get("/", getOrderList);
// router.post("/:id", addOrderBySiteManager);
// router.put("/:id", updateOrderBySiteManager);
// router.get("/:id", getOrderByOrderId);
router.get("/bySiteId/:id", getOrdersBySite);
router.put("/updateStatus", updateOrderStatus);

module.exports = router;
