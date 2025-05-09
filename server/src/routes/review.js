const express = require('express')
const router = express.Router()

// Middlewares
const { authCheck } = require('../middlewares/auth')

// Controllers
const {
  getAllReviews,
  postReview,
  getReviewById,
  postResponse,
  updateReviewById,
  deleteReviewbyId,
  getAllReviewsByPatient,
} = require('../controllers/reviewController')

// Routes
router.get('/reviews/:physicianId', getAllReviews)
router.post('/reviews', postReview)
router.get('/review/:reviewId', getReviewById)
router.patch('/review/:reviewId', postResponse)
router.patch('/review/update/:reviewId', updateReviewById)
router.delete('/review/:reviewId', deleteReviewbyId)

router.get('/reviews/patient/:patientNHSNumber', getAllReviewsByPatient)

module.exports = router
