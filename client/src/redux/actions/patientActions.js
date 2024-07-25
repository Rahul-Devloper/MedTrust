import { ACTION_TYPES } from '../constants/actionTypes'
import { AUTH_TYPES } from '../constants/authTypes'
import { signUp, login, googleCreateOrLogin, logout } from '../../api/auth'
import { currentUser } from '../../api/user'
import { currentAdmin } from '../../api/admin'
import { currentSuperAdmin } from '../../api/superAdmin'
import { currentMember } from '../../api/member'
import { currentPatient, getAllDoctors } from '../../api/patient'
import {
  RoleBasedRedirect,
  RedirectOnLogout,
} from '../../utils/roleBasedRedirect'
import {
  SuccessNotification,
  ErrorNotification,
  InfoNotification,
} from '../../components'

/********************************************
  Sign up a user
*********************************************/
export const getAllDoctorsAction =
  ({ setOk, setDoctorsList }) =>
  async (dispatch) => {
    // Dispatch a loading alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: true },
    })

    try {
      // Fetch response from server
      const res = await getAllDoctors()

      // Dispatch a success/error login notify
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: res?.data?.message,
        },
      })
      setOk(true)
      setDoctorsList(res?.data?.doctors)

      // SuccessNotification(res.data.message)
      // InfoNotification('🥴 Check mail spam if not found 🥴')
      // Clear the form on success
      // data.setFormData(data.initialFormData)
      // data.setLoading(false)
    } catch (error) {
      ErrorNotification(error?.response?.data?.type[0].message)
      // data.setLoading(false)
      // Dispatch a error alert
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: error.response.data?.type[0].message,
        },
      })
      setOk(false)
      setDoctorsList([])
    }
  }
