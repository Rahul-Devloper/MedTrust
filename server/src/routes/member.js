const express = require("express");
const router = express.Router();

// Middlewares
const { authCheck } = require("../middlewares/auth");

// Controllers
const { currentMember } = require("../controllers/memberController");

// Routes
router.post("/currentMember", authCheck, currentMember);

module.exports = router;
