import { ACTION_TYPES } from '../constants/actionTypes'

import {
  getAllDoctors,
  getDoctorSpeciality,
  getDoctorProfileData,
} from '../../api/patient'

import { ErrorNotification, SuccessNotification } from '../../components'
import {
  getAllReviews,
  postReview,
  getReviewById,
  postResponse,
  updateReviewById,
  deleteReviewbyId,
} from '../../api/review'
import {
  deactivateDoctorProfileById,
  reactivateDoctorProfileById,
} from '../../api/doctor'
import { getAllDoctorsAction } from './patientActions'

/********************************************
  Deactivate Account
*********************************************/
export const deactivateDoctorProfileAction =
  ({ doctorId, setOk, setDoctorsList }) =>
  async (dispatch) => {
    // Dispatch a loading alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: true },
    })

    try {
      // Fetch response from server
      const res = await deactivateDoctorProfileById(doctorId)

      // Dispatch a success/error login notify
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: res.data.message,
        },
      })
      dispatch(getAllDoctorsAction({ setOk, setDoctorsList }))
      //   setOk(true)
      // setDoctorsList(res.data.doctors)

      SuccessNotification(res.data.message)
    } catch (error) {
      // Dispatch a error notify
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: 'DEACTIVATE_ACCOUNT_ERROR',
        },
      })

      ErrorNotification(error.response.data.message)
    }
  }

export const reactivateDoctorProfileAction =
  ({ doctorId, setOk, setDoctorsList }) =>
  async (dispatch) => {
    // Dispatch a loading alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: true },
    })

    try {
      // Fetch response from server
      const res = await reactivateDoctorProfileById(doctorId)

      // Dispatch a success/error login notify
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: res.data.message,
        },
      })

      dispatch(getAllDoctorsAction({ setOk, setDoctorsList }))
      //   setOk(true)
      // setDoctorsList(res.data.doctors)

      SuccessNotification(res.data.message)
    } catch (error) {
      // Dispatch a error notify
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: 'DEACTIVATE_ACCOUNT_ERROR',
        },
      })

      ErrorNotification(error.response.data.message)
    }
  }
