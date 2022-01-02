const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const adminSchema = new mongoose.Schema(
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
    // Organization name
    organization: {
      type: String,
    },
    // Current subscription plan
    currentPlan: {
      type: ObjectId,
      ref: "Plan",
    },
    // Team invites
    invitations: [
      {
        email: {
          type: String,
          lowercase: true,
          unique: true,
          index: true,
          sparse: true,
        },
        role: {
          type: String,
          enum: ["member"],
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
      },
    ],
    // List of members
    members: [
      {
        type: ObjectId,
        ref: "Member",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
