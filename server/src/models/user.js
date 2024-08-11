const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: Array,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
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
      required: true,
      // unique: true,
    },
    nhsNumber: {
      type: String,
      index: true,
    },
    gmcNumber: {
      type: String,
      index: true,
    },
    // Local account or Google
    accountType: {
      type: String,
      default: 'local',
    },
    // Normal or admin
    role: {
      type: String,
      // enum: ["member", "admin", "superadmin"],
      enum: ['patient', 'doctor', 'admin', 'superadmin'],
      default: 'patient',
    },
    // Current plan
    currentPlan: {
      type: String,
      default: 'Free',
    },
    // Account activation fields
    activated: {
      type: Boolean,
      default: false,
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
    lastActive: {
      type: Date,
    },
    // OTP fields
    otp: {
      type: String,
      index: true,
    },
    otpExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
)

// Limit what fields you want to send back to the user
userSchema.statics.toClientObject = function (user) {
  const userObject = user?.toObject()

  const clientObject = {
    _id: userObject._id,
    email: userObject.email,
    name: userObject.name,
    role: userObject.role,
    nhsNumber: userObject.nhsNumber,
    gmcNumber: userObject.gmcNumber,
    activated: userObject.activated,
    currentPlan: userObject.currentPlan,
    createdAt: userObject.createdAt,
    updatedAt: userObject.updatedAt,
  }

  return clientObject
}

module.exports = mongoose.model("User", userSchema);
