const express = require("express");
const router = express.Router();

// Middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// Controllers
const {
  currentAdmin,
  teamInvite,
  teamAccountActivate,
  getTeamMembers,
  getAdminSubscription,
} = require("../controllers/adminController");

// Routes
router.post("/currentAdmin", authCheck, adminCheck, currentAdmin);
router.post("/admin/team/invite", authCheck, adminCheck, teamInvite); // Invite a new account to the team
router.post("/admin/team/account/activate", teamAccountActivate); // Team account activation
router.get("/admin/team/members", authCheck, adminCheck, getTeamMembers);
// Subscription
router.get("/admin/subscription", authCheck, adminCheck, getAdminSubscription);

module.exports = router;
