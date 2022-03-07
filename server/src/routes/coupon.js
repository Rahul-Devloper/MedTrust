const express = require("express");
const router = express.Router();

// Middlewares
const {
  authCheck,
  superAdminCheck,
  superOrAdminCheck,
} = require("../middlewares/auth");

// Controllers
const {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCouponById,
  deleteCouponById,
  validateCoupon,
} = require("../controllers/couponController");

// Routes
router.post("/coupon", authCheck, superAdminCheck, createCoupon);
router.get("/coupons", authCheck, superOrAdminCheck, getAllCoupons);
router.get("/coupon/:id", authCheck, superOrAdminCheck, getCouponById);
router.put("/coupon/:id", authCheck, superAdminCheck, updateCouponById);
router.delete("/coupon/:id", authCheck, superAdminCheck, deleteCouponById);
router.post("/coupon/validate", validateCoupon);

module.exports = router;
