import { ACTION_TYPES } from '../constants/actionTypes'

import { ErrorNotification } from '../../components'
import { checkAppointmentStatus } from '../../api/appointment'

/********************************************
  Check Appointment Status
*********************************************/

export const checkAppointmentStatusAction =
  ({ setOk, setAppointmentData, doctorGMCNumber, patientNHSNumber }) =>
  async (dispatch) => {
    console.log('doctorGMCNumberAction==>', doctorGMCNumber)
    // Dispatch a loading alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: true },
    })

    try {
      // Fetch response from server
      const res = await checkAppointmentStatus({
        doctorGMCNumber,
        patientNHSNumber,
      })

      // Dispatch a success/error login notify
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: res?.data?.message,
        },
      })
      setOk(true)
      setAppointmentData(res?.data?.appointment)
    } catch (error) {
      ErrorNotification(error?.response?.data?.message)
      // data.setLoading(false)
      // Dispatch a error alert
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: error.response.data?.type?.message,
        },
      })
      setOk(false)
      setAppointmentData({})
    }
  }
