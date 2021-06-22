import { GOOGLE_LOG_IN, LOG_OUT } from "./constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case GOOGLE_LOG_IN:
      console.log(action?.data);
      return state;
    case LOG_OUT:
      break;
    default:
      return state;
  }
};

export default authReducer;
