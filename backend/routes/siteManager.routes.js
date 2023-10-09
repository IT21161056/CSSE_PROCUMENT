const express = require("express");
const router = express.Router();
// const auth = require("../middleware/auth");

const {
  getSiteManagerDetails,
  loginSiteManager,
  registerSiteManager,
  getAllSiteManagers,
  getSiteManagerSiteList,
  getOrderListOfSiteManager,
} = require("../controllers/siteManager.controller");

router.post("/register", registerSiteManager);
router.post("/login", loginSiteManager);
router.get("/orders", getOrderListOfSiteManager);
router.get("/", getSiteManagerDetails);
router.get("/all", getAllSiteManagers);
router.get("/sites", getSiteManagerSiteList);

module.exports = router;
