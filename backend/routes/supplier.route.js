const express = require("express");
const router = express.Router();

const {
  getSupplierList,
  loginSupplier,
  registerSupplier,
  getAcceptedOrCompletedOrdersForEachSupplier,
  getSupplierDetailsById,
  getSuppliersByProduct,
} = require("../controllers/supplier.controller");

router.get(
  "/:id/acceptedorcompletedorders",
  getAcceptedOrCompletedOrdersForEachSupplier
);
router.post("/", registerSupplier);
router.post("/login", loginSupplier);
router.get("/", getSupplierList);
router.get("/byItem", getSuppliersByProduct);
router.get("/:id", getSupplierDetailsById);

module.exports = router;
