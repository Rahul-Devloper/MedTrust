import api from './index'

// Get All Doctors
export const checkAppointmentStatus = ({
  patientNHSNumber,
  doctorGMCNumber,
}) => {
  console.log('checkAppointmentStatus==>', patientNHSNumber)
  return api.get('/appointments/checkStatus', {
    params: {
      doctorGMCNumber,
      patientNHSNumber,
    },
  })
}
