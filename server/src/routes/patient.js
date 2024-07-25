const express = require('express')
const router = express.Router()

// Middlewares
const { authCheck } = require('../middlewares/auth')

// Controllers
const {
  currentPatient,
  getAllDoctors,
} = require('../controllers/patientController')

// Routes
router.post('/currentPatient', authCheck, currentPatient)
router.get('/doctors', getAllDoctors)

module.exports = router
