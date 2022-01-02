const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    admin: {
      type: ObjectId,
      ref: "Admin",
      required: true,
    },
    // Plan
    plan: {
      type: ObjectId,
      ref: "Plan",
      required: true,
    },
    // Status
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    // Payment method
    paymentMethod: {
      type: String,
      enum: ["paypal", "stripe"],
      default: "stripe",
    },
    paymentDate: {
      type: Date,
    },
    // User address // TODO: Add address model
    address: {
      type: ObjectId,
      ref: "Address",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
