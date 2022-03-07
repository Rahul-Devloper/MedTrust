const express = require("express");
const router = express.Router();

// Middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// Controllers
const {
  webhookHandler,
  // Subscription
  createUserSubscription,
  manageSubscription,
} = require("../controllers/stripeController");

// Routes
router.post("/webhook", webhookHandler);
// Subscription
router.post("/subscriptions", authCheck, adminCheck, createUserSubscription);
router.get("/subscriptions/manage", authCheck, adminCheck, manageSubscription);

module.exports = router;
