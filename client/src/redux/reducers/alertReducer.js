import { ACTION_TYPES } from "../constants/actionTypes";

// Initial state
const initialState = {};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ALERT:
      return action?.payload;
    default:
      return state;
  }
};

export default alertReducer;
