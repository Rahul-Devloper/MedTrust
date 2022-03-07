const Coupon = require("../models/coupon");

class CouponService {
  // Create a new coupon
  static createCoupon = async (coupon) => {
    try {
      const newCoupon = new Coupon(coupon);
      await newCoupon.save();

      return newCoupon;
    } catch (error) {
      throw error;
    }
  };

  // Find one coupon
  static findOneCoupon = async (query) => {
    try {
      const coupon = await Coupon.findOne(query).exec();

      return coupon;
    } catch (error) {
      throw error;
    }
  };

  // Find coupon by id
  static findCouponById = async (id) => {
    try {
      const coupon = await Coupon.findById(id).exec();

      return coupon;
    } catch (error) {
      throw error;
    }
  };

  // Find all coupons

  static findAllCoupons = async () => {
    try {
      const coupons = await Coupon.find().exec();

      return coupons;
    } catch (error) {
      throw error;
    }
  };

  // Find coupon by id and update
  static findCouponByIdAndUpdate = async (id, update) => {
    try {
      const coupon = await Coupon.findByIdAndUpdate(id, update, {
        new: true,
      }).exec();

      return coupon;
    } catch (error) {
      throw error;
    }
  };

  // Delete coupon by id
  static deleteCouponById = async (id) => {
    try {
      const coupon = await Coupon.findByIdAndDelete(id).exec();

      return coupon;
    } catch (error) {
      throw error;
    }
  };

  // Validate the coupon
  static validateCoupon = async (code) => {
    try {
      const coupon = await Coupon.findOne({ code }).exec();

      // If coupon exists and not used return true else false
      if (coupon && coupon?.used === 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  };

  // Update coupon usage
  static updateCouponUsage = async (code) => {
    try {
      const coupon = await Coupon.findOneAndUpdate(
        { code },
        { used: 1 },
        { new: true }
      ).exec();

      return coupon;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CouponService;
