import api from "./index";

// Check current user
export const currentUser = () => {
  return api.post("/currentUser");
};

// Get an user by ID
export const getUserById = (id) => {
  return api.get(`/user/id/${id}`);
};

// find and update user image
export const saveImageUrl = (ImgUrl, id, role, number) => {
  return api.put(`/user/image/${id}`, { ImgUrl, role, number });
};

// Get all users
export const getAllUsers = () => {
  return api.get("/users");
}