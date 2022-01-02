import { combineReducers } from "redux";

// Reducers
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import customizeReducer from "./customizeReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  customize: customizeReducer,
});

export default rootReducer;
