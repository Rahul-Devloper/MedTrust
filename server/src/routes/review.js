const express = require('express')
const router = express.Router()

// Middlewares
const { authCheck } = require('../middlewares/auth')

// Controllers
const { getAllReviews, postReview } = require('../controllers/reviewController')

// Routes
router.get('/reviews/:physicianId', getAllReviews)
router.post('/reviews', postReview)

module.exports = router
