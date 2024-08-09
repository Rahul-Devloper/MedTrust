import { ACTION_TYPES } from '../constants/actionTypes'

import {
  getAllDoctors,
  getDoctorSpeciality,
  getDoctorProfileData,
} from '../../api/patient'

import { ErrorNotification } from '../../components'
import {
  getAllReviews,
  postReview,
  getReviewById,
  postResponse,
  updateReviewById,
} from '../../api/review'

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
      console.log('error==>', error?.response)
      ErrorNotification(error?.response?.data?.message)
      // data.setLoading(false)
      // Dispatch a error alert
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: error.response.data?.message,
        },
      })
    }
  }

export const updateReviewAction =
  ({
    setReviewsList,
    values,
    doctorGMCNumber,
    patientNHSNumber,
    setOk,
    reviewId,
  }) =>
  async (dispatch) => {
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: true },
    })

    try {
      // Post response to server
      const res = await updateReviewById({
        doctorGMCNumber,
        patientNHSNumber,
        values,
        reviewId,
      })
      console.log('resAction==>', {
        res: res,
        doctorGMCNumber,
        patientNHSNumber,
        values,
        reviewId,
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
      console.log('error==>', error?.response)
      ErrorNotification(error?.response?.data?.message)
      // data.setLoading(false)
      // Dispatch a error alert
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: error.response.data?.message,
        },
      })
    }
  }
/********************************************
  Get Review by Id
*********************************************/

export const getReviewByIdAction =
  ({ setOk, reviewId, setReviewData }) =>
  async (dispatch) => {
    // Dispatch a loading alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: true },
    })
    try {
      // Fetch response from server
      const res = await getReviewById(reviewId)

      // Dispatch a success/error login notify
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: res?.data?.message,
        },
      })
      setOk(true)
      setReviewData(res?.data?.review)
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

/********************************************
  Post Response based on ReviewId
*********************************************/
export const postResponseAction =
  ({ setReviewData, values, reviewId, setOk }) =>
  async (dispatch) => {
    dispatch({ type: ACTION_TYPES.ALERT, payload: { loading: true } })

    try {
      // Post response to server
      const res = await postResponse({
        reviewId,
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
        getReviewByIdAction({
          setOk,
          reviewId,
          setReviewData,
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

