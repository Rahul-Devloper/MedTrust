const Coupon = require("../models/coupon");

/**********************************
  Create a coupon
***********************************/
exports.createCoupon = async (req, res) => {
  const { name, code, expiry, discount, limit, used } = req.body;

  // Validate request
  if (!name || !code || !expiry || !discount || !limit || !used) {
    return res.status(400).json({
      message: "Please provide all required fields",
      status: "error",
    });
  }

  // If coupon code already exists, return error
  const coupon = await Coupon.findOne({ code }).exec();

  if (coupon) {
    return res.status(400).json({
      message: "Coupon code already exists",
      status: "error",
    });
  }

  try {
    const newCoupon = await new Coupon(req.body).save();

    res.status(201).json(newCoupon);
  } catch (error) {
    console.log("CREATE_COUPON_ERROR", error);
  }
};

/**********************************
  Get all coupons
***********************************/
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 }).exec();

    // If no coupons found return 404
    if (coupons.length === 0) {
      return res.status(404).json({
        message: "No coupons found",
        status: "error",
      });
    }

    res.status(200).json(coupons);
  } catch (error) {
    console.log("GET_ALL_COUPONS_ERROR", error);
  }
};

/**********************************
  Get a coupon by id
***********************************/
exports.getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id).exec();

    // If no coupon found return 404
    if (!coupon) {
      return res.status(404).json({
        message: "No coupon found",
        status: "error",
      });
    }

    res.status(200).json(coupon);
  } catch (error) {
    console.log("GET_COUPON_BY_ID_ERROR", error);
  }
};

/**********************************
  Update a coupon by id
***********************************/
exports.updateCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();

    // If no coupon found return 404
    if (!coupon) {
      return res.status(404).json({
        message: "No coupon found",
        status: "error",
      });
    }

    res.status(200).json(coupon);
  } catch (error) {
    console.log("UPDATE_COUPON_BY_ID_ERROR", error);
  }
};

/**********************************
  Delete a coupon by id
***********************************/
exports.deleteCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id).exec();

    res.status(200).json(coupon);
  } catch (error) {
    console.log("DELETE_COUPON_BY_ID_ERROR", error);
  }
};