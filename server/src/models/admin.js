const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const adminSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    // Current subscription plan
    currentPlan: {
      type: String,
      default: 'Free',
    },
    subscriptionsHistory: {
      type: Array,
      default: [],
    },
    currentSubscription: {
      type: Object,
      default: {},
    },
    subscriptionStatus: {
      type: String,
      default: '',
    },
    // Stripe customer id
    stripeCustomerId: {
      type: String,
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
          enum: ['admin'],
          default: 'admin',
        },
        status: {
          type: String,
          enum: ['pending', 'accepted', 'rejected'],
          default: 'pending',
        },
      },
    ],
    // List of members
    members: [
      {
        type: ObjectId,
        ref: 'Member',
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Admin", adminSchema);
