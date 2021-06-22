import api from "./index";

// Signup user
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
