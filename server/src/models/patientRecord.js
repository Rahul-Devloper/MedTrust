const mongoose = require('mongoose')

const patientRecordSchema = new mongoose.Schema({
  ImgUrl: {
    type: String,
    // default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  },
  isDeactivated: { type: Boolean, default: false },
  personalDetails: {
    name: String,
    dateOfBirth: String,
    nhsNumber: String,
    gender: String,
    address: {
      line1: String,
      line2: String,
      city: String,
      postcode: String,
      country: String,
    },
    contactDetails: {
      phoneNumber: String,
      email: String,
    },
  },
  appointments: [
    {
      appointmentId: String,
      doctorId: String,
      doctorName: String,
      specialization: String,
      appointmentDate: Date,
      appointmentType: String,
      notes: String,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
})

module.exports = mongoose.model('patient_records', patientRecordSchema)
