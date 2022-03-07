const express = require("express");
const router = express.Router();

// Middlewares
const { authCheck, superAdminCheck } = require("../middlewares/auth");

// Controllers
const {
  currentSuperAdmin,
  getAllAdmins,
} = require("../controllers/superAdminController");

// Routes
router.post(
  "/currentSuperAdmin",
  authCheck,
  superAdminCheck,
  currentSuperAdmin
);
router.get("/admins", authCheck, superAdminCheck, getAllAdmins);

module.exports = router;
