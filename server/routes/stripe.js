const express = require("express");
const router = express.Router();

// Middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// Controllers
const { createPaymentIntent } = require("../controllers/stripe");

// Routes
router.post("/create-payment-intent", createPaymentIntent);

module.exports = router;
