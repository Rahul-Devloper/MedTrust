const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**********************************
  Create payment intent
***********************************/
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

exports.createPaymentIntent = async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    description: "Software development services",
    shipping: {
      name: "Jenny Rosen",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "Bangalore",
        state: "KA",
        country: "IN",
      },
    },
    amount: 1099,
    currency: "inr",
    payment_method_types: ["card"],
  });
  res.json({
    clientSecret: paymentIntent.client_secret,
  });
};
