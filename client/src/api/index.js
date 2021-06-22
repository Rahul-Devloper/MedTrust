import axios from "axios";
import Cookies from "js-cookie";

// Set the base url of the backend api
const BASE_URL = process.env.REACT_APP_BACKEND_API;
// Create api with base url
const api = axios.create({ baseURL: BASE_URL });

// Before making any request, check for token saved in the browser cookie
api.interceptors.request.use((req) => {
  // If token exists
  if (Cookies.get("token")) {
    req.headers.authorization = `Bearer ${Cookies.get("token")}`;
  }
});

export default api;
