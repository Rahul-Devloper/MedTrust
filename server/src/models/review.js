const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId, //gets id from patientRecord model
      ref: 'Patient',
      required: true,
    },
    patientNHSNumber: {
      type: String,
      required: true,
      index: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId, //gets doctor model from doctorRecord
      ref: 'Doctor',
      required: true,
    },
    doctorGMCNumber: {
      type: String,
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    reviewTitle: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

// Compound indexes for efficient querying
reviewSchema.index({ doctorGMCNumber: 1, date: -1 })
reviewSchema.index({ patientNHSNumber: 1, date: -1 })

module.exports = mongoose.model('Review', reviewSchema)
