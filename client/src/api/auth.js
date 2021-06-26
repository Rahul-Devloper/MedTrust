import api from "./index";

// Signup user to send verification email
export const signUp = async (name, email, password) => {
  return await api.post("/signup", {
    name,
    email,
    password,
  });
};

// Login user
export const login = async (email, password) => {
  return await api.post("/login", {
    email,
    password,
  });
};

// Google signup or login
export const googleCreateOrLogin = async (name, email) => {
  return await api.post("/googleAuth", {
    name,
    email,
  });
};

// Activate user account
export const accountActivate = async (token) => {
  return await api.post("/account/activate", {
    token,
  });
};

// Send reset user password email
export const resetPassword = async (email) => {
  return await api.post("/password/reset", {
    email,
  });
};

// Set new password
export const newPassword = async (token, newPassword) => {
  return await api.post("/password/reset/verify", {
    token,
    newPassword,
  });
};
