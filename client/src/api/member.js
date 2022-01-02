import api from "./index";

// Check current user
export const currentMember = () => {
  return api.post("/currentMember");
};
