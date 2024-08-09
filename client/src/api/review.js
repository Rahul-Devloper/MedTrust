import api from './index'

// Get All Doctors
export const getAllReviews = (physicianId) => {
  return api.get('/reviews/' + physicianId)
}

export const postReview = ({ doctorGMCNumber, patientNHSNumber, values }) => {
  return api.post('/reviews', { doctorGMCNumber, patientNHSNumber, values })
}

export const getReviewById = (reviewId) => {
  return api.get('/review/' + reviewId)
}

export const postResponse = ({ reviewId, values }) => {
  return api.patch('/review/' + reviewId, { values })
}

export const updateReviewById = ({ reviewId, values }) => {
  return api.patch('/review/update/' + reviewId, { values })
}

export const deleteReviewbyId = (reviewId) => {
  return api.delete('/review/' + reviewId)
}