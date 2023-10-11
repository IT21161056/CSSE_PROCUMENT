const express = require("express");
const router = express.Router();

const {
  createSite,
  getSiteById,
  getAllSites,
} = require("../controllers/site.controller");

router.post("/", createSite);
router.get("/", getAllSites);
router.delete("/:id", getSiteById);

module.exports = router;
