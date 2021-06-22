import axios from "axios";

// Signup user
export const signUp = async (name, email, password) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_API}/signup`, {
    name,
    email,
    password,
  });
};

// Login user
export const login = async (email, password) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_API}/login`, {
    email,
    password,
  });
};
