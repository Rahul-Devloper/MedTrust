const Coupon = require("../models/coupon");

/**********************************
  Create a coupon
***********************************/
exports.createCoupon = async (req, res) => {
  const { name, code } = req.body;

  try {
    // Create a coupon
    const newCouponCreate = new Coupon({
      name,
      code,
    });

    await coupon.save();

    res.json({
      status: "Coupon created successfully",
      newCouponCreate,
    });
  } catch (error) {
    console.log("CREATE_COUPON_ERROR", error);
  }
};

/**********************************
  Get all coupons
***********************************/
exports.getAllCoupons = async (req, res) => {
  const coupons = await Coupon.find({});

  res.json({
    status: "success",
    coupons,
  });
};

/**********************************
  Get a coupon
***********************************/
exports.getCoupon = async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);

  res.json({
    status: "success",
    coupon,
  });
};

/**********************************
  Delete a coupon
***********************************/
exports.deleteCoupon = async (req, res) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.id);

  res.json({
    status: "deleted",
    coupon,
  });
};

/**********************************
  Update a coupon
***********************************/
exports.updateCoupon = async (req, res) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json({
    status: "updated",
    coupon,
  });
};
