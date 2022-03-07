import api from "./index";

// Check current user is super admin
export const currentSuperAdmin = async () => {
  return await api.post("/currentSuperAdmin", {});
};

// Get all admins
export const getAllAdmins = async () => {
  return await api.get("/admins");
};

// Get all visitors
export const getAllVisitors = async () => {
  return await api.get("/visitors");
};

// Get all leads
export const getAllLeads = async () => {
  return await api.get("/leads");
};
