const express = require("express");
const router = express.Router();

const {
  addNewSupplier,
  getSupplierList,
  loginSupplier,
  registerSupplier,
  getAcceptedOrCompletedOrdersForEachSupplier,
  getSupplierDetailsById,
  getSuppliersByProduct,
  updateSupplierDetails,
  deleteSupplier,
} = require("../controllers/supplier.controller");

router.post("/add", addNewSupplier)
router.post("/supplierRegister", registerSupplier);
router.post("/supplierLogin", loginSupplier);
router.get("/all", getSupplierList);
router.put("/update/:id",updateSupplierDetails);
router.delete("/deleteSupplier/:id", deleteSupplier);
router.get("/byItem", getSuppliersByProduct);
router.get("/byId/:id", getSupplierDetailsById);
router.get("/:id/acceptedorcompletedorders",getAcceptedOrCompletedOrdersForEachSupplier);

module.exports = router;
