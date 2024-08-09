const express = require('express')
const router = express.Router()

// Middlewares
const { authCheck } = require('../middlewares/auth')

// Controllers
const {
  currentDoctor,
  deactivateDoctorProfileById,
  reactivateDoctorProfileById,
} = require('../controllers/doctorController')

// Routes
router.post('/currentDoctor', authCheck, currentDoctor)
router.patch('/doctor/deactivate', deactivateDoctorProfileById)
router.patch('/doctor/reactivate', reactivateDoctorProfileById)

module.exports = router
