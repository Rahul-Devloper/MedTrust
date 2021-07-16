import axios from "axios";
import Cookies from "js-cookie";

// Set the base url of the backend api
const BASE_URL = process.env.REACT_APP_BACKEND_API;
// Create api with base url
const api = axios.create({ baseURL: BASE_URL });

/*
Before making any request, check for token saved in the browser cookie,
if theres a token in the cookie, add it to the request authorization
header
*/
api.interceptors.request.use((req) => {
  // If token exists, add to req auth header
  if (Cookies.get("access")) {
    req.headers.authorization = `Bearer ${Cookies.get("access")}`;
  }
  return req;
});

export default api;
