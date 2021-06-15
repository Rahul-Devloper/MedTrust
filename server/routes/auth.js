const express = require("express");
const router = express.Router();

// controllers
const { testRoute } = require("../controllers/auth");

// routes
router.get("/test-url", testRoute, (req, res) => res.send("Final"));

module.exports = router;
