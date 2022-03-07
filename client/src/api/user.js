import api from "./index";

// Check current user
export const currentUser = () => {
  return api.post("/currentUser");
};

// Get an user by ID
export const getUserById = (id) => {
  return api.get(`/user/id/${id}`);
};
