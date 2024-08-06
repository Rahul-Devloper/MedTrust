const express = require('express')
const router = express.Router()

// Middlewares
const { authCheck } = require('../middlewares/auth')

// Controllers
const { currentDoctor } = require('../controllers/doctorController')

// Routes
router.post('/currentDoctor', authCheck, currentDoctor)

module.exports = router
