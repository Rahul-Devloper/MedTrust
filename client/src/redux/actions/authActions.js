import { ACTION_TYPES } from "../constants/actionTypes";
import {
  signUp,
  login,
  googleCreateOrLogin,
  refreshAccessToken,
  logout,
} from "../../api/auth";
import { toast } from "react-toastify";
import { RoleBasedRedirect } from "../../utils/roleBasedRedirect";

/********************************************
  Sign up a user
*********************************************/
export const signupAction = (data) => async (dispatch) => {
  // Dispatch a loading alert
  dispatch({
    type: ACTION_TYPES.ALERT,
    payload: { loading: true },
  });

  try {
    let errorMessage = "";

    // Fetch response from server
    const res = await signUp(data.name, data.email, data.password);

    // Success or error toast message
    if (res.data.error === true) {
      toast.error(res.data.type[0].message);
      errorMessage = res.data.type[0].message;
    } else {
      toast.success(res.data.message);
    }

    // Dispatch a success/error sign up alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: errorMessage ? errorMessage : res.data.message,
      },
    });
  } catch (error) {
    // Dispatch a error alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: "SIGNUP_AUTH_ACTION_ERROR",
      },
    });
  }
};

/********************************************
  Login an user
*********************************************/
export const loginAction = (data) => async (dispatch) => {
  // Dispatch a loading notify
  dispatch({
    type: ACTION_TYPES.ALERT,
    payload: { loading: true },
  });

  try {
    let errorMessage = "";

    // Fetch response from server
    const res = await login(data.email, data.password);
    // Dispatch token and user
    dispatch({
      type: ACTION_TYPES.AUTH,
      payload: {
        accessToken: res.data.accessToken,
        user: res.data.user,
      },
    });

    localStorage.setItem("firstLogin", true);

    // Error toast message
    if (res.data.error === true) {
      toast.error(res.data.type[0].message);
      errorMessage = res.data.type[0].message;
    }

    // Dispatch a success/error login notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: errorMessage ? errorMessage : res.data.message,
      },
    });

    // Redirect user based on role
    RoleBasedRedirect(res, data.history);
  } catch (error) {
    // Dispatch a error notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: "LOGIN_AUTH_ACTION_ERROR",
      },
    });
  }
};

/********************************************
 Google login an user 
*********************************************/
export const googleLoginAction = (data) => async (dispatch) => {
  // Dispatch a loading alert
  dispatch({
    type: ACTION_TYPES.ALERT,
    payload: { loading: true },
  });

  try {
    let errorMessage = "";

    // Fetch response from server
    const res = await googleCreateOrLogin(data.name, data.email);
    // Dispatch token and user
    dispatch({
      type: ACTION_TYPES.AUTH,
      payload: {
        accessToken: res.data.accessToken,
        user: res.data.user,
      },
    });

    localStorage.setItem("firstLogin", true);

    // Error toast message
    if (res.data.error === true) {
      toast.error(res.data.type[0].message);
      errorMessage = res.data.type[0].message;
    }

    // Dispatch a success/error login notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: errorMessage ? errorMessage : res.data.message,
      },
    });

    // Redirect user based on role
    RoleBasedRedirect(res, data.history);
  } catch (error) {
    // Dispatch a error notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: "GOOGLE_LOGIN_AUTH_ACTION_ERROR",
      },
    });
  }
};

/********************************************
  Update access token using refresh token
*********************************************/
export const refreshTokenAction = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    // Dispatch a loading alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: true },
    });
    try {
      // Fetch response from server
      const res = await refreshAccessToken();

      // Dispatch token and user
      dispatch({
        type: ACTION_TYPES.AUTH,
        payload: {
          accessToken: res.data.accessToken,
          user: res.data.user,
        },
      });
    } catch (error) {
      // Dispatch a error notify
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: "REFRESH_TOKEN_ACTION_ERROR",
        },
      });
    }
  }
};

/********************************************
  Log out an user
*********************************************/
export const logoutAction = () => async (dispatch) => {
  // Dispatch a loading alert
  dispatch({
    type: ACTION_TYPES.ALERT,
    payload: { loading: true },
  });
  try {
    // Fetch response from server
    const res = await logout();

    // Dispatch logout
    dispatch({
      type: ACTION_TYPES.LOGOUT,
      payload: {},
    });

    localStorage.removeItem("firstLogin");

    // Dispatch a success/error logout alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: res.data.message,
      },
    });
  } catch (error) {
    // Dispatch a error notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: "REFRESH_TOKEN_ACTION_ERROR",
      },
    });
  }
};
