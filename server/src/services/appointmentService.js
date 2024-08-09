const Appointment = require('../models/appointment')

class AppointmentService {
  static hasCompletedAppointment = async ({
    patientNHSNumber,
    doctorGMCNumber,
  }) => {
    try {
      const appointment = await Appointment.findOne({
        patientNHSNumber,
        doctorGMCNumber,
        status: 'completed',
      })

      // This line of code checks if the 'appointment' variable is not equal to null.
      // If it is not null, it means that a completed appointment was found in the database.
      // The '!' symbol is the negation operator, which means "not".
      // So, 'appointment !== null' is saying "if appointment is not null, then return true".
      // If 'appointment' is null, it means that no completed appointment was found, so the function will return false.
      return appointment
    } catch (error) {
      throw error
    }
  }
}

module.exports = AppointmentService
