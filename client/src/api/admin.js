import api from "./index";

// Check if the user is an admin
export const currentAdmin = async () => {
  return await api.post("/currentAdmin", {});
};

// Get admin subscription
export const getAdminSubscription = async () => {
  return await api.get("/admin/subscription");
};
