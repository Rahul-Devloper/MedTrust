import api from "./index";

// Check if the user is an admin
export const currentAdmin = async () => {
  return await api.post("/currentAdmin", {});
};

// Get all plans
export const getAllPlans = async () => {
  return await api.get("/plans");
};

// Get admin subscription
export const getAdminSubscription = async () => {
  return await api.get("/admin/subscription");
};
