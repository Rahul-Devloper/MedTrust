const express = require("express");
const router = express.Router();

// Middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// Controllers
const {
  createCoupon,
  getAllCoupons,
  getCoupon,
  deleteCoupon,
  updateCoupon,
} = require("../controllers/coupon");

// Routes
router.post("/coupon", authCheck, adminCheck, createCoupon);
router.get("/coupons", getAllCoupons);
router.get("/coupon/:id", getCoupon);
router.put("/coupon/:id", authCheck, adminCheck, updateCoupon);
router.delete("/coupon/:id", authCheck, adminCheck, deleteCoupon);

module.exports = router;