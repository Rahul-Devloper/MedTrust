const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 20,
      unique: true,
    },
    metaDescription: {
      type: String,
      maxlength: 30,
      required: true,
    },
    monthlyPrice: {
      type: Number,
      required: true,
    },
    annualPrice: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["usd", "inr"],
      default: "usd",
    },
    stripeProductId: {
      type: String,
      required: true,
    },
    stripeMonthlyPriceId: {
      type: String,
      required: true,
    },
    stripeAnnualPriceId: {
      type: String,
      required: true,
    },
    seatType: {
      type: String,
      required: true,
    },
    trialDays: {
      type: Number,
      required: true,
    },
    maxUsers: {
      type: Number,
      required: true,
    },
    maxProjects: {
      type: Number,
      required: true,
    },
    maxStorage: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);
