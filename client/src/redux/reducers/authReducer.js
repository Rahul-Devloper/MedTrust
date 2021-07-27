import { ACTION_TYPES } from "../constants/actionTypes";
import Cookies from "js-cookie";

// Initial state
const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Save user to redux store & set google JWT to the browser cookie
    case ACTION_TYPES.AUTH:
      Cookies.set("access", action?.payload.accessToken, { expires: 0.0125 }); // 18 minutes
      return action?.payload;
    case ACTION_TYPES.LOGOUT:
      Cookies.remove("access");
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
