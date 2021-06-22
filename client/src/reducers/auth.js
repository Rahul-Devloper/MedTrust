import {
  GOOGLE_LOG_IN,
  GOOGLE_JWT_COOKIE,
  LOG_OUT,
} from "./constants/actionTypes";
import Cookies from "js-cookie";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case GOOGLE_LOG_IN:
      return { ...state, authData: action?.data };
    case GOOGLE_JWT_COOKIE:
      Cookies.set("token", action?.data.token, { expires: 0.02 });
      return { ...state, authData: action?.data.token };
    case LOG_OUT:
      break;
    default:
      return state;
  }
};

export default authReducer;
