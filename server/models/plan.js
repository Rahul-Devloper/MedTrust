const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    description: {
      type: String,
      maxlength: 200,
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
      enum: ["$", "€", "£", "¥"],
      default: "$",
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);
