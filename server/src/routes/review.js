const express = require('express')
const router = express.Router()

// Middlewares
const { authCheck } = require('../middlewares/auth')

// Controllers
const { getAllReviews } = require('../controllers/reviewController')

// Routes
router.get('/reviews/:physicianId', getAllReviews)

module.exports = router
