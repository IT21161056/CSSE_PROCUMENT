const express = require("express");
const router = express.Router();

const {
  getRequestList,
  registerRequestList,
  getRequestListDetailsById,
  updateRequestListDetails,
  deleteRequestList,
  requestsBySiteID,
} = require("../controllers/request.controller");

router.post("/", registerRequestList);
router.get("/", getRequestList);
router.put("/updateRequestList", updateRequestListDetails);
router.delete("/deleteRequestList/:id", deleteRequestList);
router.get("/byId/:id", getRequestListDetailsById);
router.get("/bySiteId/:id", requestsBySiteID);

module.exports = router;
