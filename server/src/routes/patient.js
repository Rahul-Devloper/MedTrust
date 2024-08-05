const express = require('express')
const router = express.Router()

// Middlewares
const { authCheck } = require('../middlewares/auth')

// Controllers
const {
  currentPatient,
  getAllDoctors,
  getDoctorSpeciality,
  getDoctorProfileData,
  getPatientDetailsByNHSNumber,
} = require('../controllers/patientController')

// Routes
router.post('/currentPatient', authCheck, currentPatient)
router.get('/doctors', getAllDoctors)
router.get('/doctors/speciality/:speciality', getDoctorSpeciality)
router.get('/doctor/profile', getDoctorProfileData)
router.get('/patient/:nhsNumber', getPatientDetailsByNHSNumber)

module.exports = router
