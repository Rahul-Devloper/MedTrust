import { PATIENT_TYPES } from '../constants/patientTypes'

// Initial state
const initialState = {}

const getAllDoctorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PATIENT_TYPES.GET_ALL_DOCTORS:
      return action?.payload
    default:
      return state
  }
}

export default getAllDoctorsReducer
