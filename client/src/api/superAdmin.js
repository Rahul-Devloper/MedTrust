import api from "./index";

// Check if the user is a super admin
export const currentSuperAdmin = async () => {
  return await api.post("/currentSuperAdmin", {});
};
