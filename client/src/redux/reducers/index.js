import { combineReducers } from "redux";

// Reducers
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import adminReducer from "./adminReducer";
import customizeReducer from "./customizeReducer";
import patientReducer from './patientReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  admin: adminReducer,
  customize: customizeReducer,
  patient: patientReducer,
})

export default rootReducer;
