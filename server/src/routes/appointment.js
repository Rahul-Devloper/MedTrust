const express = require('express')
const router = express.Router()

// Middlewares
const { authCheck } = require('../middlewares/auth')
const {
  checkAppointmentStatus,
} = require('../controllers/appointmentController')

// Controllers

// Routes
router.get('/appointments/checkStatus', checkAppointmentStatus)

module.exports = router
