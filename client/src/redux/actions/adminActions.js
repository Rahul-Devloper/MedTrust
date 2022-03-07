import { ACTION_TYPES } from "../constants/actionTypes";
import { ADMIN_TYPES } from "../constants/adminTypes";
import { getAdminSubscription } from "../../api/admin";
import { SuccessNotification, ErrorNotification } from "../../components";

/********************************************
  Get admin subscription action
*********************************************/
export const getAdminSubscriptionAction = () => async (dispatch) => {
  // Dispatch a loading alert
  dispatch({
    type: ACTION_TYPES.ALERT,
    payload: { loading: true },
  });

  try {
    // Fetch response from server
    const res = await getAdminSubscription();

    // Dispatch subscription
    dispatch({
      type: ADMIN_TYPES.GET_ADMIN_SUBSCRIPTION,
      payload: res.data,
    });

    // Dispatch a success/error sign up alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: false },
    });
  } catch (error) {
    // Dispatch a error alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: "GET_ADMIN_SUBSCRIPTION_ACTION_ERROR",
      },
    });
  }
};
