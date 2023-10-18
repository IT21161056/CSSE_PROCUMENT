const express = require("express");
const router = express.Router();

const {
 loginProcumentOfficer,
 registerProcumentOfficer
} = require("../controllers/procumentStaff.controller");

router.post("/login", loginProcumentOfficer);
router.post("/register", registerProcumentOfficer);

module.exports = router;