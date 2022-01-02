const express = require("express");
const router = express.Router();

// Middlewares
const {
  authCheck,
  adminCheck,
  superAdminCheck,
} = require("../middlewares/auth");

// Controllers
const {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCouponById,
  deleteCouponById,
} = require("../controllers/coupon");

// Routes
router.post("/coupon", authCheck, superAdminCheck, createCoupon);
router.get("/coupons", authCheck, adminCheck, getAllCoupons);
router.get("/coupon/:id", authCheck, adminCheck, getCouponById);
router.put("/coupon/:id", authCheck, superAdminCheck, updateCouponById);
router.delete("/coupon/:id", authCheck, superAdminCheck, deleteCouponById);

module.exports = router;
