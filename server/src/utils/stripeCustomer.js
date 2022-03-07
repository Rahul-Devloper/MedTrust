const stripeAPI = require("./stripe");
const Admin = require("../models/admin");

// Create stripe customer helper function
async function createStripeCustomer(id) {
  const admin = await Admin.findOne({ user: id }).exec();

  const customer = await stripeAPI.customers.create({
    email: admin.email,
    metadata: {
      userId: id,
    },
  });

  // Update admin with stripe customer id
  await Admin.findOneAndUpdate(
    { user: id },
    { stripeCustomerId: customer.id },
    { new: true }
  ).exec();

  return customer;
}

// Get stripe customer helper function
async function getStripeCustomer(id) {
  const admin = await Admin.findOne({ user: id }).exec();

  const { stripeCustomerId } = admin;

  let customer;

  if (!stripeCustomerId) {
    return createStripeCustomer(id);
  }

  customer = await stripeAPI.customers.retrieve(stripeCustomerId);

  return customer;
}

module.exports = { getStripeCustomer };
