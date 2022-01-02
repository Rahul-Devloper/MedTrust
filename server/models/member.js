const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const memberSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    // Invited by
    invitedBy: {
      type: ObjectId,
      ref: "Admin",
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
