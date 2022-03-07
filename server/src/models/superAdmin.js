const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const superAdminSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    // List of plans
    plans: [
      {
        type: ObjectId,
        ref: "Plan",
      },
    ],
    // Subscription orders
    orders: [
      {
        type: ObjectId,
        ref: "Order",
      },
    ],
    // List of coupons
    coupons: [
      {
        type: ObjectId,
        ref: "Coupon",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SuperAdmin", superAdminSchema);
