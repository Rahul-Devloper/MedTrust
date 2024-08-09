const Appointment = require('../models/appointment')
const AppointmentService = require('../services/appointmentService')

exports.checkAppointmentStatus = async (req, res) => {
  const { doctorGMCNumber, patientNHSNumber } = req?.query

  const hasCompletedAppointment =
    await AppointmentService.hasCompletedAppointment({
      patientNHSNumber,
      doctorGMCNumber,
    })

  if (!hasCompletedAppointment) {
    return res.status(403).json({
      message: 'You can only review doctors you have had appointments with.',
    })
  } else {
    return res.status(200).json({
      message: 'You have completed an appointment with this doctor.',
      appointment: hasCompletedAppointment,
    })
  }
}
