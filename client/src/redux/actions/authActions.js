import { ACTION_TYPES } from "../constants/actionTypes";
import { AUTH_TYPES } from "../constants/authTypes";
import {
  signUp,
  login,
  googleCreateOrLogin,
  logout,
  verifyOtp,
} from '../../api/auth'
import { currentUser } from '../../api/user'
import { currentAdmin } from '../../api/admin'
import { currentSuperAdmin } from '../../api/superAdmin'
import { currentMember } from '../../api/member'
import { currentPatient } from '../../api/patient'
import {
  RoleBasedRedirect,
  RedirectOnLogout,
} from '../../utils/roleBasedRedirect'
import {
  SuccessNotification,
  ErrorNotification,
  InfoNotification,
} from '../../components'
import { currentDoctor } from '../../api/doctor'

/********************************************
  Sign up a user
*********************************************/
export const signupAction = (data) => async (dispatch) => {
  // Dispatch a loading alert
  dispatch({
    type: ACTION_TYPES.ALERT,
    payload: { loading: true },
  })

  data.setLoading(true)

  try {
    // Fetch response from server
    const res = await signUp(
      data.name,
      data.email,
      data.password,
      data.nhsNumber,
      data?.gmcNumber
    )

    // Dispatch a success/error login notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: res.data.message,
      },
    })

    SuccessNotification(res.data.message)
    InfoNotification('🥴 Check mail spam if not found 🥴')
    // Clear the form on success
    data.setFormData(data.initialFormData)
    data.setLoading(false)
  } catch (error) {
    ErrorNotification(error.response.data?.type[0].message)
    data.setLoading(false)
    // Dispatch a error alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: error.response.data?.type[0].message,
      },
    })
  }
}

/********************************************
  Login an user
*********************************************/
export const loginAction = (data) => async (dispatch) => {
  // Dispatch a loading notify
  dispatch({
    type: ACTION_TYPES.ALERT,
    payload: { loading: true },
  })

  data.setLoading(true)

  try {
    let errorMessage = ''

    // Fetch response from server
    const res = await login(data.email, data.password)
    console.log('res.data==>', res?.data)

    if (res.data.error === true) {
      ErrorNotification(res.data.type[0].message)
      errorMessage = res.data.type[0].message
      data.setLoading(false)
      return
    }

    // Dispatch token and user
    dispatch({
      type: AUTH_TYPES.AUTH,
      payload: {
        accessToken: res.data.accessToken,
        user: res.data.user,
      },
    })

    // Dispatch a success/error login notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: errorMessage ? errorMessage : res.data.message,
      },
    })

    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: false },
    })

    data.setLoading(false)

    return res?.data
    // Redirect user based on role
    // RoleBasedRedirect(res, data.history)
  } catch (error) {
    data.setLoading(false)
    // Dispatch a error notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: 'LOGIN_AUTH_ACTION_ERROR',
      },
    })
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: false },
    })
  }
}

/********************************************
  VerifyOTP
*********************************************/
export const verifyOtpAction = (data) => async (dispatch) => {
  // Dispatch a loading alert
  dispatch({
    type: ACTION_TYPES.ALERT,
    payload: { loading: true },
  })

  try {
    // Fetch response from server
    const res = await verifyOtp(data.userId, data.otp)
    if (res.data.error === true) {
      ErrorNotification(res.data.message)
      return
    }

    // Dispatch token and user
    dispatch({
      type: AUTH_TYPES.AUTH,
      payload: {
        accessToken: res.data.accessToken,
        user: res.data.user,
      },
    })

    // Dispatch a success/error login notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: res.data.message,
      },
    })

    // Redirect user based on role
    RoleBasedRedirect(res, data.history)
  } catch (error) {
    // Dispatch a error alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: error.response.data?.message,
      },
    })
    ErrorNotification(error.response.data?.message)
  }
}

/********************************************
 Google login an user 
*********************************************/
export const googleLoginAction = (data) => async (dispatch) => {
  // Dispatch a loading alert
  dispatch({
    type: ACTION_TYPES.ALERT,
    payload: { loading: true },
  })

  try {
    let errorMessage = ''

    // Fetch response from server
    const res = await googleCreateOrLogin(data.name, data.email)

    // Error toast message
    if (res.data.error === true) {
      ErrorNotification(res.data.type[0].message)
      errorMessage = res.data.type[0].message
      return
    }

    // Dispatch token and user
    dispatch({
      type: AUTH_TYPES.AUTH,
      payload: {
        accessToken: res.data.accessToken,
        user: res.data.user,
      },
    })

    // Dispatch a success/error login notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: errorMessage ? errorMessage : res.data.message,
      },
    })

    // Redirect user based on role
    RoleBasedRedirect(res, data.history)
  } catch (error) {
    // Dispatch a error notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: 'GOOGLE_LOGIN_AUTH_ACTION_ERROR',
      },
    })
  }
}

/********************************************
  Is user action to check if user is logged in
*********************************************/
export const isUserAction = (data) => async (dispatch) => {
  // Dispatch a loading alert
  dispatch({
    type: ACTION_TYPES.ALERT,
    payload: { loading: true },
  })

  try {
    let errorMessage = ''

    // Fetch response from server
    const res = await currentUser()

    if (res.data.error === true) {
      ErrorNotification(res.data.type[0].message)
      errorMessage = res.data.type[0].message
      return
    }

    // Dispatch token and user
    dispatch({
      type: AUTH_TYPES.IS_USER,
      payload: {
        user: res.data.user,
      },
    })

    // If data.setOk exists, set it to true
    if (data?.setOk) {
      data.setOk(true)
    }

    // Dispatch a success/error login notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: errorMessage ? errorMessage : res.data.message,
      },
    })

    // If data.history exists, redirect user based on role
    if (data?.history) {
      // Redirect user based on role
      RoleBasedRedirect(res, data.history)
    }
  } catch (error) {
    // Dispatch a error notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: 'IS_USER_ACTION_ERROR',
      },
    })
  }
}

/********************************************
  Is user super admin action
*********************************************/
export const isSuperAdminAction = (data) => async (dispatch) => {
  // Dispatch a loading alert
  dispatch({
    type: ACTION_TYPES.ALERT,
    payload: { loading: true },
  })

  try {
    let errorMessage = ''

    // Fetch response from server
    const res = await currentSuperAdmin()

    if (res.data.error === true) {
      ErrorNotification(res.data.type[0].message)
      errorMessage = res.data.type[0].message
      data.setOk(false)
      return
    }

    // Dispatch token and user
    dispatch({
      type: AUTH_TYPES.IS_SUPER_ADMIN,
      payload: {
        user: res.data.user,
      },
    })

    // Dispatch a success/error login notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: errorMessage ? errorMessage : res.data.message,
      },
    })

    data.setOk(true)
  } catch (error) {
    // Dispatch a error notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: 'IS_SUPER_ADMIN_ACTION_ERROR',
      },
    })
  }
}

/********************************************
  Is user admin action
*********************************************/
export const isAdminAction = (data) => async (dispatch) => {
  // Dispatch a loading alert
  dispatch({
    type: ACTION_TYPES.ALERT,
    payload: { loading: true },
  })

  try {
    let errorMessage = ''

    // Fetch response from server
    const res = await currentAdmin()

    if (res.data.error === true) {
      ErrorNotification(res.data.type[0].message)
      errorMessage = res.data.type[0].message
      data.setOk(false)
      return
    }

    // Dispatch token and user
    dispatch({
      type: AUTH_TYPES.IS_ADMIN,
      payload: {
        user: res.data.user,
      },
    })

    // Dispatch a success/error login notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: errorMessage ? errorMessage : res.data.message,
      },
    })

    data.setOk(true)
  } catch (error) {
    // Dispatch a error notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: 'IS_ADMIN_ACTION_ERROR',
      },
    })
  }
}

/********************************************
  Is user member action
*********************************************/
export const isMemberAction = (data) => async (dispatch) => {
  // Dispatch a loading alert
  dispatch({
    type: ACTION_TYPES.ALERT,
    payload: { loading: true },
  })

  try {
    let errorMessage = ''

    // Fetch response from server
    const res = await currentMember()

    if (res.data.error === true) {
      ErrorNotification(res.data.type[0].message)
      errorMessage = res.data.type[0].message
      data.setOk(false)
      return
    }

    // Dispatch token and user
    dispatch({
      type: AUTH_TYPES.IS_MEMBER,
      payload: {
        user: res.data.user,
      },
    })

    // Dispatch a success/error login notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: errorMessage ? errorMessage : res.data.message,
      },
    })

    data.setOk(true)
  } catch (error) {
    // Dispatch a error notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: 'IS_MEMBER_ACTION_ERROR',
      },
    })
  }
}

/********************************************
  Is user patient action
*********************************************/
export const isPatientAction = (data) => async (dispatch) => {
  // Dispatch a loading alert
  dispatch({
    type: ACTION_TYPES.ALERT,
    payload: { loading: true },
  })

  try {
    let errorMessage = ''

    // Fetch response from server
    const res = await currentPatient()

    if (res.data.error === true) {
      ErrorNotification(res.data.type[0].message)
      errorMessage = res.data.type[0].message
      data.setOk(false)
      return
    }

    // Dispatch token and user
    dispatch({
      type: AUTH_TYPES.IS_PATIENT,
      payload: {
        user: res.data.user,
      },
    })

    // Dispatch a success/error login notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: errorMessage ? errorMessage : res.data.message,
      },
    })

    data.setOk(true)
  } catch (error) {
    // Dispatch a error notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: 'IS_MEMBER_ACTION_ERROR',
      },
    })
  }
}

/********************************************
Is User Doctor Action
********************************************/
export const isDoctorAction = (data) => async (dispatch) => {
  // Dispatch a loading alert
  dispatch({
    type: ACTION_TYPES.ALERT,
    payload: { loading: true },
  })

  try {
    let errorMessage = ''

    // Fetch response from server
    const res = await currentDoctor()

    if (res.data.error === true) {
      ErrorNotification(res.data.type[0].message)
      errorMessage = res.data.type[0].message
      data.setOk(false)
      return
    }

    // Dispatch token and user
    dispatch({
      type: AUTH_TYPES.IS_DOCTOR,
      payload: {
        user: {
          ...res.data.user, checking: true},
      },
    })

    // Dispatch a success/error login notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: errorMessage ? errorMessage : res.data.message,
      },
    })

    data.setOk(true)
  } catch (error) {
    // Dispatch a error notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: 'IS_MEMBER_ACTION_ERROR',
      },
    })
  }
}

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
      type: AUTH_TYPES.LOGOUT,
      payload: {},
    });

    // Dispatch a success/error logout alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: res.data.message,
      },
    });

    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: false },
    });

    // Redirect user to login page
    RedirectOnLogout(res);
  } catch (error) {
    // Dispatch a error notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: "LOGOUT_ACTION_ERROR",
      },
    });

    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: false },
    });
  }
};
