import api from "./index";

// Create a subscription
export const createSubscription = async (data) => {
  return await api.post("/subscriptions", data);
};

// Manage a subscription
export const manageSubscription = async () => {
  return await api.get("/subscriptions/manage");
};
