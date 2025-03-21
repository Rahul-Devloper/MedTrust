import { ACTION_TYPES } from '../constants/actionTypes'

import {
  getAllDoctors,
  getDoctorSpeciality,
  getDoctorProfileData,
  getPatientDetailsByNHSNumber,
  getAllPatients,
  changePatientStatus,
} from '../../api/patient'

import { ErrorNotification, SuccessNotification } from '../../components'

/********************************************
  Get All Patients
*********************************************/
export const getAllPatientsAction =
  ({ setOk, setPatientsList }) =>
  async (dispatch) => {
    // Dispatch a loading alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: true },
    })

    try {
      // Fetch response from server
      const res = await getAllPatients()

      // Dispatch a success/error login notify
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: res?.data?.message,
        },
      })
      setOk(true)
      setPatientsList(res?.data?.patients)

      // SuccessNotification(res.data.message)
    } catch (error) {
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
      return res?.data?.doctor
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

/********************************************
   Get Patient Details with NHS number
  *********************************************/

export const getPatientByNHSNumberAction = (nhsNumber) => async (dispatch) => {
  // Dispatch a loading alert
  dispatch({
    type: ACTION_TYPES.ALERT,
    payload: { loading: true },
  })

  try {
    // Fetch response from server
    const res = await getPatientDetailsByNHSNumber(nhsNumber)

    // Dispatch a success/error login notify
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: {
        message: res?.data?.message,
      },
    })
    return res?.data?.patient
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

//********************************************
//   PatientStatus Change
//*********************************************/
export const changePatientStatusAction =
  ({ patientId, setOk, setPatientsList, status }) =>
  async (dispatch) => {
    // Dispatch a loading alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: true },
    })
    try {
      console.log('patientID==>', patientId)
      console.log('status==>', status)
      const res = await changePatientStatus({ patientId, status })
      // setOk(true)
      // setPatientsList(res?.data?.patient)
      dispatch(getAllPatientsAction({ setOk, setPatientsList }))
      SuccessNotification(res.data.message)
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: res?.data?.message,
        },
      })
    } catch (error) {
      ErrorNotification(error?.response?.data?.message)

      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: error.response.data?.message,
        },
      })
    }
  }

