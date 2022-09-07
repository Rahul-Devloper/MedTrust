import { AUTH_TYPES } from "../constants/authTypes";
import Cookies from "js-cookie";

// Initial state
const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Save user to redux store & set google JWT to the browser cookie
    case AUTH_TYPES.AUTH:
      Cookies.set("access", action?.payload.accessToken, { expires: 0.0125 }); // 18 minutes
      // Local storage set "allgin" to true
      localStorage.setItem("allgin", true);
      return action?.payload;
    case AUTH_TYPES.IS_USER:
      return action?.payload;
    case AUTH_TYPES.IS_SUPER_ADMIN:
      return action?.payload;
    case AUTH_TYPES.IS_ADMIN:
      return action?.payload;
    case AUTH_TYPES.IS_MEMBER:
      return action?.payload;
    case AUTH_TYPES.LOGOUT:
      Cookies.remove("access");
      localStorage.removeItem("allgin");
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
