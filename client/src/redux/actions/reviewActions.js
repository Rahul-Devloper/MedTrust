import { ACTION_TYPES } from '../constants/actionTypes'

import {
  getAllDoctors,
  getDoctorSpeciality,
  getDoctorProfileData,
} from '../../api/patient'

import { ErrorNotification } from '../../components'
import { getAllReviews, postReview } from '../../api/review'

/********************************************
  Get All Reviews based on Params
*********************************************/

export const getAllReviewsAction =
  (
    { setOk, setReviewsList, physicianId } //physicianId is gmcNumber
  ) =>
  async (dispatch) => {
    // Dispatch a loading alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: true },
    })

    try {
      // Fetch response from server
      const res = await getAllReviews(physicianId)

      // Dispatch a success/error login notify
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: res?.data?.message,
        },
      })
      setOk(true)
      setReviewsList(res?.data?.reviews)
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
      setReviewsList([])
    }
  }

/********************************************
  Post Reviews based on DoctorGmcNumber and PatientNhsNumber
*********************************************/
export const postReviewAction =
  ({ setReviewsList, values, doctorGMCNumber, patientNHSNumber, setOk }) =>
  async (dispatch) => {
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: true },
    })

    try {
      // Post response to server
      const res = await postReview({
        doctorGMCNumber,
        patientNHSNumber,
        values,
      })

      // Dispatch a success/error login notify
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: res?.data?.message,
        },
      })
      dispatch(
        getAllReviewsAction({
          setReviewsList,
          physicianId: doctorGMCNumber,
          setOk,
        })
      )
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
    }
  }