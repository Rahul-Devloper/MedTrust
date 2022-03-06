import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_TYPES } from "../redux/constants/authTypes";
import { store } from "../redux/store";

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

/*
If the response has status code of 401, fetch new token before the next request 
*/
api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401 && localStorage.getItem("firstLogin")) {
      return api
        .post(
          "/refresh_token",
          {},
          {
            withCredentials: true,
            credentials: "include",
          }
        )
        .then((res) => {
          // Save the new token to the browser cookie
          Cookies.set("access", res.data.accessToken, { expires: 0.0125 }); // 14 minutes
          // Dispatch action to update user and token in the store
          store.dispatch({
            type: AUTH_TYPES.AUTH,
            payload: {
              accessToken: res.data.accessToken,
              user: res.data.user,
            },
          });

          // Retry the request
          return api.request(err.config);
        });
    }
    return Promise.reject(err);
  }
);

export default api;
