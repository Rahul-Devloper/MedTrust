const stripeAPI = require("../utils/stripe");
const { getStripeCustomer } = require("../utils/stripeCustomer");
const StripeService = require("../services/stripeService");
const AdminService = require("../services/adminService");

/**********************************
  Stripe webhook
***********************************/
exports.webhookHandler = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  const webhookHandlers = {
    // ******************* PAYMENT INTENT FAILED *******************
    "payment_intent.payment_failed": async (data) => {
      console.log("Payment Intent Failed", data);
    },
    // ******************* CUSTOMER SUBSCRIPTION CREATED *******************
    "customer.subscription.created": async (data) => {
      await StripeService.createOrUpdateSubscription("Created", data);
    },
    // ******************* CUSTOMER SUBSCRIPTION UPDATED *******************
    "customer.subscription.updated": async (data) => {
      await StripeService.createOrUpdateSubscription("Updated", data);
    },
    // ******************* CUSTOMER SUBSCRIPTION DELETED *******************
    "customer.subscription.deleted": async (data) => {
      await StripeService.deleteSubscription(data);
    },
    // ******************* INVOICE PAYMENT SUCCESS *******************
    "invoice.payment_succeeded": async (data) => {
      await StripeService.invoicePaymentSucceeded(data);
    },
    // ******************* INVOICE PAYMENT FAILED *******************
    "invoice.payment_failed": async (data) => {
      await StripeService.invoicePaymentFailed(data);
    },
  };

  let event;

  try {
    event = stripeAPI.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.WEBHOOK_SECRET
    );

    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle the checkout.session
  if (webhookHandlers[event.type]) {
    webhookHandlers[event.type](event.data.object);
  }

  return;
};

/**********************************
  Create a subscription
***********************************/
exports.createUserSubscription = async (req, res) => {
  const { _id } = req.user;
  const { pricingId } = req.body;

  // Get stripe customer
  const customer = await getStripeCustomer(_id);

  try {
    const session = await stripeAPI.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: pricingId,
          quantity: 1,
        },
      ],
      customer: customer.id,
      success_url: `${process.env.STRIPE_REDIRECT_URL}/success`,
      cancel_url: `${process.env.STRIPE_REDIRECT_URL}/cancel`,
    });

    res.status(200).json({ checkoutUrl: session.url });
  } catch (error) {
    console.log("CREATE_USER_EUB_ERROR", error);
    return res.status(400).json({
      status: "error",
      message: "Create subscription server error",
    });
  }
};

/**********************************
  Manage a subscription
***********************************/
exports.manageSubscription = async (req, res) => {
  const { _id } = req.user;

  // Get stripeCustomerId from Admin
  const admin = await AdminService.findOneAdmin({ user: _id });
  const { stripeCustomerId } = admin;

  try {
    // Create a portal session
    const portalSession = await stripeAPI.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${process.env.STRIPE_REDIRECT_URL}/profile/subscription`,
    });

    res.status(200).json({ portalUrl: portalSession.url });
  } catch (error) {
    console.log("MANAGE_SUBSCRIPTION_ERROR", error);
    return res.status(400).json({
      status: "error",
      message: "Manage subscription server error",
    });
  }
};
