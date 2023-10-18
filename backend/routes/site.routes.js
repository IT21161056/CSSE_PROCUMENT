const express = require("express");
const router = express.Router();

const {
  createSite,
  getSiteById,
  getAllSites,
  updatAllocatedBudget,
} = require("../controllers/site.controller");

router.post("/", createSite);
router.get("/", getAllSites);
router.delete("/:id", getSiteById);
router.put("/updateBudget", updatAllocatedBudget);

module.exports = router;
