const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: Array,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
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
    },
    // Organization name
    organization: {
      type: String,
    },
    // Normal or admin
    role: {
      type: String,
      enum: ["member", "manager", "admin", "superadmin"],
      default: "admin",
    },
    // Account activation fields
    activated: {
      type: Boolean,
    },
    activationToken: {
      type: String,
    },
    activationTokenSentAt: {
      type: Date,
    },
    activatedAt: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
  },
  { timestamps: true }
);

// Limit what fields you want to send back to the user
userSchema.statics.toClientObject = function (user) {
  const userObject = user?.toObject();

  const clientObject = {
    _id: userObject._id,
    email: userObject.email,
    name: userObject.name,
    organization: userObject.organization,
    role: userObject.role,
    activated: userObject.activated,
    createdAt: userObject.createdAt,
    updatedAt: userObject.updatedAt,
  };

  return clientObject;
};

module.exports = mongoose.model("User", userSchema);
