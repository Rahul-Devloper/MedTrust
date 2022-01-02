import api from "./index";

// Check if the user is an admin
export const currentAdmin = async () => {
  return await api.post("/currentAdmin", {});
};
