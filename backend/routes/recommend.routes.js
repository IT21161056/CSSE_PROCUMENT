const express = require("express");
const router = express.Router();

const {
  getRecommendDetailsById,
  getRecommend,
  registerRecommend,
  getSingleRecommend,
  updateRecommend,
  deleteRecommend,
} = require("../controllers/recommends.controller");

router.post("/add",registerRecommend);
router.get("/", getRecommend);
router.put("/updateRecommend",updateRecommend);
router.delete("/deleteRecommend/:id", deleteRecommend);
router.get("/byId/:id", getRecommendDetailsById);
router.get("/recommend/id", getSingleRecommend)



module.exports = router;

