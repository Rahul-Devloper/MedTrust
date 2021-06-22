import { GOOGLE_LOG_IN, EMAIL_LOG_IN, LOG_OUT } from "./constants/actionTypes";
import Cookies from "js-cookie";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    // Save user to redux store & set google JWT to the browser cookie
    case GOOGLE_LOG_IN:
      Cookies.set("token", action?.data.token, { expires: 0.02 });
      return { ...state, authData: action?.data };
    // Save user to redux store & set email JWT to the browser cookie
    case EMAIL_LOG_IN:
      Cookies.set("token", action?.data.token, { expires: 0.02 });
      return { ...state, authData: action?.data };

    case LOG_OUT:
      break;
    default:
      return state;
  }
};

export default authReducer;
