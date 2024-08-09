const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
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
    reviewScores: {
      communication: { type: Number, required: true, min: 1, max: 5 },
      bedsideManner: { type: Number, required: true, min: 1, max: 5 },
      officeEnvironment: { type: Number, required: true, min: 1, max: 5 },
      waitTime: { type: Number, required: true, min: 1, max: 5 },
      professionalism: { type: Number, required: true, min: 1, max: 5 },
      treatmentSatisfaction: { type: Number, required: true, min: 1, max: 5 },
    },
    response: {
      type: String,
      trim: true,
    },
    responseDate: {
      type: Date,
      // default: Date.now,
    },
    isResponse: {
      type: Boolean,
      default: false,
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
