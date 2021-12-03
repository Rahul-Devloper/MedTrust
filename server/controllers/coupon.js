const Coupon = require("../models/coupon");

/**********************************
  Create a coupon
***********************************/
exports.createCoupon = async (req, res) => {
  const { name, code } = req.body;

  // Validate name and code
  if (!name || !code) {
    return res.status(400).json({
      status: "error",
      message: "Please enter a name and code",
    });
  }

  try {
    const coupon = new Coupon({
      name,
      code,
    });

    await coupon.save();

    res.status(201).json({
      status: "success",
      data: coupon,
    });
  } catch (error) {
    console.log("CREATE_COUPON_ERROR", error);
  }
};

/**********************************
  Get all coupons
***********************************/
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    // If no coupons are found then return error
    if (!coupons.length) {
      return res.status(404).json({
        status: "error",
        message: "No coupons found",
      });
    }

    res.status(200).json({
      status: "success",
      coupons,
    });
  } catch (error) {
    console.log("GET_ALL_COUPONS_ERROR", error);
  }
};

/**********************************
  Get a coupon
***********************************/
exports.getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    // If id is not sent then return error
    if (!coupon) {
      return res.status(404).json({
        status: "error",
        message: "Coupon not found",
      });
    }

    res.status(200).json({
      status: "success",
      coupon,
    });
  } catch (error) {
    console.log("GET_COUPON_ERROR", error);
  }
};

/**********************************
  Update a coupon
***********************************/
exports.updateCoupon = async (req, res) => {
  // Validate name and code
  if (!req.body.name && !req.body.code) {
    return res.status(400).json({
      status: "error",
      message: "Please enter a name and code",
    });
  }

  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "updated",
      coupon,
    });
  } catch (error) {
    console.log("UPDATE_COUPON_ERROR", error);
  }
};

/**********************************
  Delete a coupon
***********************************/
exports.deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    // If no coupon is found then return error
    if (!coupon) {
      return res.status(404).json({
        status: "error",
        message: "Coupon not found",
      });
    }

    res.status(200).json({
      status: "deleted",
      coupon,
    });
  } catch (error) {
    console.log("DELETE_COUPON_ERROR", error);
  }
};
