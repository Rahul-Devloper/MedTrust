import { LOGGED_IN_USER, LOG_OUT_USER } from "./constants/actionTypes";
import Cookies from "js-cookie";

const authReducer = (state = null, action) => {
  switch (action.type) {
    // Save user to redux store & set google JWT to the browser cookie
    case LOGGED_IN_USER:
      Cookies.set("access", action?.payload.access, { expires: 0.000231481 }); // 20 seconds
      Cookies.set("refresh", action?.payload.refresh, { expires: 365 });
      return action?.payload;
    case LOG_OUT_USER:
      Cookies.remove("access");
      Cookies.remove("refresh");
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
