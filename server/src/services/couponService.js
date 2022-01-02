const Coupon = require("../models/coupon");

class CouponService {
  // Create a new coupon
  static CreateCoupon = async (coupon) => {
    try {
      const newCoupon = new Coupon(coupon);
      await newCoupon.save();

      return newCoupon;
    } catch (error) {
      throw error;
    }
  };

  // Find one coupon
  static FindOneCoupon = async (query) => {
    try {
      const coupon = await Coupon.findOne(query).exec();

      return coupon;
    } catch (error) {
      throw error;
    }
  };

  // Find coupon by id
  static FindCouponById = async (id) => {
    try {
      const coupon = await Coupon.findById(id).exec();

      return coupon;
    } catch (error) {
      throw error;
    }
  };

  // Find all coupons

  static FindAllCoupons = async () => {
    try {
      const coupons = await Coupon.find().exec();

      return coupons;
    } catch (error) {
      throw error;
    }
  };

  // Find one coupon and update
  static FindOneCouponAndUpdate = async (query, update) => {
    try {
      const coupon = await Coupon.findOneAndUpdate(query, update, {
        new: true,
      }).exec();

      return coupon;
    } catch (error) {
      throw error;
    }
  };

  // Delete coupon by id
  static DeleteCouponById = async (id) => {
    try {
      const coupon = await Coupon.findByIdAndDelete(id).exec();

      return coupon;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CouponService;
