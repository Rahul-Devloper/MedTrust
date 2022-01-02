const express = require("express");
const router = express.Router();

// Middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// Controllers
const { currentAdmin } = require("../controllers/adminController");

// Routes
router.post("/currentAdmin", authCheck, adminCheck, currentAdmin);

module.exports = router;
