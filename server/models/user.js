const mongoose = require("mongoose");
const { Objectid } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: false,
    },
    accountType: {
      type: String,
      default: "local",
    },
    role: {
      type: String,
      default: "normal",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
