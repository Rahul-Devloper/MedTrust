import api from "./index";

export const createPaymentIntent = async (items) => {
  return await api.post("/create-payment-intent", {
    items,
  });
};
