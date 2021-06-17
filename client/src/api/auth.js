import axios from "axios";

// Signup user
export const signUp = async (email, password) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_API}/signup`, {
    email,
    password,
  });
};
