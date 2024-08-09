const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema(
  {
    patientNHSNumber: {
      type: String,
      required: true,
      index: true,
    },
    doctorGMCNumber: {
      type: String,
      required: true,
      index: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentDetails: {
      type: String,
      required: true,
    },
    isReviewed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

appointmentSchema.index({ doctorGMCNumber: 1, appointmentDate: -1 })
appointmentSchema.index({ patientNHSNumber: 1, appointmentDate: -1 })

module.exports = mongoose.model('Appointment', appointmentSchema)
