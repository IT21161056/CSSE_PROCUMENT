const express = require("express");
const router = express.Router();

const {
  getOrderDetails,
  getDraftOrderListBySiteId,
  getOrderList,
  addOrderBySiteManager,
  updateProductPriceInOrderBySupplier,
  getDeliveryListByOrderId,
  comfirmOrderBySiteManager,
  acceptOrderBySuppiler,
  unacceptOrderBySuppiler,
  approvedOrDisapprovedOrderByManager,
  placedOrderByProcurementOfficer,
  closeOrderAfterDeliveryCompletedBySiteManager,
  getOrderListBySiteId,
  getOrderProductListByOrderId,
} = require("../controllers/order.controller");

// router.get("/:id", getOrderDetails);
router.get("/", getOrderList);
router.post("/:id", addOrderBySiteManager);
// router.post("/sitemanager/confirmorder/:id", comfirmOrderBySiteManager);
// router.post("/manager/approve/:orderid", approvedOrDisapprovedOrderByManager);
// router.post(
//   "/procurementofficer/placedorder/:orderid",
//   placedOrderByProcurementOfficer
// );
// router.post("/supplier/accept/:orderid", acceptOrderBySuppiler);
// router.post("/supplier/unaccept/:orderid", unacceptOrderBySuppiler);
// router.post(
//   "/supplier/pricechange/:orderid/:orderproductid",
//   updateProductPriceInOrderBySupplier
// );
// router.post(
//   "/sitemanager/closed/:orderid",
//   closeOrderAfterDeliveryCompletedBySiteManager
// );
// router.get("/sitemanager/site/:siteid", getOrderListBySiteId);
// router.get("/draft/sitemanager/site/:siteid", getDraftOrderListBySiteId);
// router.get("/productlist/:orderid", getOrderProductListByOrderId);
// router.get("/deliverylist/:orderid", getDeliveryListByOrderId);

module.exports = router;
