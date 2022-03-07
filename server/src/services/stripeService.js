const User = require("../models/user");
const Admin = require("../models/admin");
const stripeAPI = require("../utils/stripe");

class StripeService {
  // Create or update subscription
  static createOrUpdateSubscription = async (type, data) => {
    try {
      console.log(`Customer Subscription ${type}`, data);
      const customer = await stripeAPI.customers.retrieve(data.customer);
      // Update the admin's subscription and plan
      await Admin.findOneAndUpdate(
        { user: customer.metadata.userId },
        {
          $push: { subscriptionsHistory: data },
          currentPlan: data.plan.nickname.split("-")[1].trim(),
          currentSubscription: data,
        },
        { new: true }
      ).exec();

      // Find the admin
      const admin = await Admin.findOne({ user: customer.metadata.userId })
        .populate({
          path: "members",
          select: "name email user",
        })
        .populate({
          path: "managers",
          select: "name email user",
        })
        .sort({ createdAt: -1 })
        .exec();

      // Update the admins user model with the current plan
      await User.findOneAndUpdate(
        { _id: admin.user },
        {
          currentPlan: data.plan.nickname.split("-")[1].trim(),
        },
        { new: true }
      ).exec();

      // If admin has managers
      if (admin.managers.length > 0) {
        // For each of the admin mangers, find the user, update the user's plan
        admin.managers.map((manager) => {
          return User.findOneAndUpdate(
            { _id: manager.user },
            {
              currentPlan: data.plan.nickname.split("-")[1].trim(),
            },
            { new: true }
          ).exec();
        });
      }

      // If admin has members
      if (admin.members.length > 0) {
        // For each of the admin members, find the user, update the user's plan
        admin.members.map((member) => {
          return User.findOneAndUpdate(
            { _id: member.user },
            {
              currentPlan: data.plan.nickname.split("-")[1].trim(),
            },
            { new: true }
          ).exec();
        });
      }
    } catch (error) {
      throw error;
    }
  };

  // Delete subscription
  static deleteSubscription = async (data) => {
    console.log("Customer Subscription Deleted", data);
    const customer = await stripeAPI.customers.retrieve(data.customer);

    // Update the admin's subscription and plan
    await Admin.findOneAndUpdate(
      { user: customer.metadata.userId },
      {
        $push: { subscriptionsHistory: data },
        currentPlan: "Free",
        currentSubscription: {},
        subscriptionStatus: "CANCELLED",
      },
      { new: true }
    ).exec();

    // Find the admin
    const admin = await Admin.findOne({ user: customer.metadata.userId })
      .populate({
        path: "members",
        select: "name email user",
      })
      .populate({
        path: "managers",
        select: "name email user",
      })
      .sort({ createdAt: -1 })
      .exec();

    // Update the admins user model with the current plan
    await User.findOneAndUpdate(
      { _id: admin.user },
      {
        currentPlan: "Free",
      },
      { new: true }
    ).exec();

    // If admin has managers
    if (admin.managers.length > 0) {
      // For each of the admin mangers, find the user, update the user's plan
      admin.managers.map((manager) => {
        return User.findOneAndUpdate(
          { _id: manager.user },
          {
            currentPlan: "Free",
          },
          { new: true }
        ).exec();
      });
    }

    // If admin has members
    if (admin.members.length > 0) {
      // For each of the admin members, find the user, update the user's plan
      admin.members.map((member) => {
        return User.findOneAndUpdate(
          { _id: member.user },
          {
            currentPlan: "Free",
          },
          { new: true }
        ).exec();
      });
    }
  };

  // Invoice payment succeeded
  static invoicePaymentSucceeded = async (data) => {
    console.log("Invoice Payment Succeeded", data);
    // Retrieve full customer from stripe
    const customer = await stripeAPI.customers.retrieve(data.customer);
    // If invoice status is paid, update the admin's subscription and status
    if (data.status === "paid") {
      await Admin.findOneAndUpdate(
        { user: customer.metadata.userId },
        {
          subscriptionStatus: "ACTIVE",
        },
        { new: true }
      ).exec();
    }
  };

  // Invoice payment failed
  static invoicePaymentFailed = async (data) => {
    console.log("Invoice Payment Failed", data);
    // Retrieve full customer from stripe
    const customer = await stripeAPI.customers.retrieve(data.customer);
    // Update admin's subscriptionStatus to PAST_DUE
    await Admin.findOneAndUpdate(
      { user: customer.metadata.userId },
      { subscriptionStatus: "PAST_DUE" },
      { new: true }
    );
  };
}

module.exports = StripeService;
