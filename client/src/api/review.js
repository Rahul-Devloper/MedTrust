import api from './index'

// Get All Doctors
export const getAllReviews = (physicianId) => {
  return api.get('/reviews/' + physicianId)
}
