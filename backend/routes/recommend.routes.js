const express = require("express");
const router = express.Router();

const {
  getRecommendById,
  getRecommend,
  registerRecommend,
  getSingleRecommend,
  updateRecommend,
  deleteRecommend,
} = require("../controllers/recommends.controller");

router.post("/",registerRecommend);
router.get("/", getRecommend);
router.put("/updateRequestList",updateRecommend);
router.delete("/deleteRequestList/:id", deleteRecommend);
router.get("/byId/:id", getRecommendById);



module.exports = router;

