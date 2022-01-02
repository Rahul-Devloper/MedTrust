const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: true,
      minlength: [5, "Too Short"],
      maxlength: [10, "Too Long"],
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    used: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
