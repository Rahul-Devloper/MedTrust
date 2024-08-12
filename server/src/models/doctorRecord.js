const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
  ImgUrl: {
    type: String,
    // default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  },
  gmcNumber: { type: String, required: true },
  isDeactivated: { type: Boolean, default: false },
  personalInfo: {
    name: { type: String, required: true },
    degree: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    languagesSpoken: { type: [String], required: true },
  },
  contactInfo: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  professionalInfo: {
    specialty: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    education: { type: String, required: true },
    certifications: { type: [String], required: true },
    hospitalAffiliations: { type: [String], required: true },
    insuranceAccepted: { type: [String], required: true },
  },
  ratings: {
    overallEffectiveness: { type: Number, required: true },
    patientScores: {
      communication: { type: Number, required: true },
      bedsideManner: { type: Number, required: true },
      waitTime: { type: Number, required: true },
      treatmentSatisfaction: { type: Number, required: true },
      professionalism: { type: Number, required: true },
      officeEnvironment: { type: Number, required: true },
    },
  },
  createdAt: Date,
  updatedAt: Date,
})

module.exports = mongoose.model('doctor_records', doctorSchema)
