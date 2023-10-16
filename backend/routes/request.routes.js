const express = require("express");
const router = express.Router();

const {
  getRequestList,
  registerRequestList,
  getRequestListDetailsById,
  updateRequestListDetails,
  deleteRequestList
} = require("../controllers/request.controller");

router.post("/", registerRequestList);
router.get("/", getRequestList);
router.put("/updateRequestList",updateRequestListDetails);
router.delete("/deleteRequestList/:id", deleteRequestList);
router.get("/byId/:id", getRequestListDetailsById);



module.exports = router;

