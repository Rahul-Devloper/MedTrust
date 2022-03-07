import { ADMIN_TYPES } from "../constants/adminTypes";

// Initial state
const initialState = {};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_TYPES.GET_ADMIN_SUBSCRIPTION:
      return {
        ...state,
        currentSubscription: action?.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
