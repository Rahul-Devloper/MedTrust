import { ACTION_TYPES } from '../constants/actionTypes'

import {
  getAllDoctors,
  getDoctorSpeciality,
  getDoctorProfileData,
} from '../../api/patient'

import { ErrorNotification } from '../../components'

/********************************************
  Get All Doctors
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
/********************************************
  Get Speciality
*********************************************/

export const getDoctorSpecialityAction =
  ({ setOk, setDoctorsBySpecialization, speciality }) =>
  async (dispatch) => {
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: true },
    })

    try {
      // Fetch response from server
      const res = await getDoctorSpeciality(speciality)
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: res?.data?.message,
        },
      })
      setOk(true)
      setDoctorsBySpecialization(res?.data?.doctors)
    } catch (error) {
      ErrorNotification(error?.response?.status)

      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: error.response.status,
        },
      })
    }
  }

/********************************************
  Get Doctor Profile Data
*********************************************/
export const getDoctorProfileDataAction =
  ({ setOk, setDoctorData, physicianName, physicianId }) =>
  async (dispatch) => {
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: true },
    })
    try {
      // Fetch response from server
      const res = await getDoctorProfileData(physicianName, physicianId)
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: res?.data?.message,
        },
      })
      setOk(true)
      setDoctorData(res?.data?.doctor)
    } catch (error) {
      ErrorNotification(
        `Status: ${error?.response?.status} - Error in Finding Doctor`
      )

      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: error.response.status,
        },
      })
    }
  }
