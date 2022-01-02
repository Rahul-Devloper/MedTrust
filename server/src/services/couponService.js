const Coupon = require("../models/coupon");

// Create a new coupon
exports.CreateCoupon = async (coupon) => {
  try {
    const newCoupon = new Coupon(coupon);
    await newCoupon.save();

    return newCoupon;
  } catch (error) {
    throw error;
  }
};

// Find one coupon
exports.FindOneCoupon = async (query) => {
  try {
    const coupon = await Coupon.findOne(query).exec();

    return coupon;
  } catch (error) {
    throw error;
  }
};

// Find all coupons
exports.FindAllCoupons = async () => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 }).exec();

    return coupons;
  } catch (error) {
    throw error;
  }
};

// Find coupon by id
exports.FindCouponById = async (id) => {
  try {
    const coupon = await Coupon.findById(id).exec();

    return coupon;
  } catch (error) {
    throw error;
  }
};

// Find one coupon and update
exports.FindOneCouponAndUpdate = async (query, update) => {
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
exports.DeleteCouponById = async (id) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(id).exec();

    return coupon;
  } catch (error) {
    throw error;
  }
};
