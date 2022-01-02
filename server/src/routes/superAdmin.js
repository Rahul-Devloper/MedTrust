const express = require("express");
const router = express.Router();

// Middlewares
const { authCheck, superAdminCheck } = require("../middlewares/auth");

// Controllers
const { currentSuperAdmin } = require("../controllers/superAdminController");

// Routes
router.post(
  "/currentSuperAdmin",
  authCheck,
  superAdminCheck,
  currentSuperAdmin
);
// router.get("/admins", authCheck, superAdminCheck, getAllAdmins); // Get all the admins //TODO: Add get all admins

module.exports = router;
