const express = require("express");
const router = express.Router();

const {
  getSupplierList,
  loginSupplier,
  registerSupplier,
  getAcceptedOrCompletedOrdersForEachSupplier,
  getSupplierDetailsById,
  getSuppliersByProduct,
  updateSupplierDetails,
  deleteSupplier
} = require("../controllers/supplier.controller");

router.post("/", registerSupplier);
router.post("/login", loginSupplier);
router.get("/", getSupplierList);
router.put("/updateSupplier",updateSupplierDetails);
router.delete("/deleteSupplier/:id", deleteSupplier);
router.get("/byItem", getSuppliersByProduct);
router.get("/byId/:id", getSupplierDetailsById);
router.get("/:id/acceptedorcompletedorders",getAcceptedOrCompletedOrdersForEachSupplier);

module.exports = router;
