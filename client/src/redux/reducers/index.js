import { combineReducers } from "redux";

// Reducers
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import adminReducer from "./adminReducer";
import customizeReducer from "./customizeReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  admin: adminReducer,
  customize: customizeReducer,
});

export default rootReducer;
