import api from './index'

// Get All Doctors
export const getAllReviews = (physicianId) => {
  return api.get('/reviews/' + physicianId)
}

export const postReview = ({ doctorGMCNumber, patientNHSNumber, values }) => {
  return api.post('/reviews', { doctorGMCNumber, patientNHSNumber, values })
}