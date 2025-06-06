import api from './index'

// Check current user
export const currentPatient = () => {
  return api.post('/currentPatient')
}

// Get All Patients
export const getAllPatients = () => {
  return api.get('/patients')
}

// Get All Doctors
export const getAllDoctors = () => {
  return api.get('/doctors')
}

// Get Doctor Speciality
export const getDoctorSpeciality = (speciality) => {
  return api.get(`/doctors/speciality/${speciality}`)
} 

// Get Doctor Profile
export const getDoctorProfileData = (physicianName, physicianId) => {
  return api.get(`/doctor/profile?name=${physicianName}&gmcNumber=${physicianId}`)
}

export const getPatientDetailsByNHSNumber = (nhsNumber) => {
  return api.get(`/patient/${nhsNumber}`)
}

export const changePatientStatus = ({patientId, status}) => {
  return api.patch('/patient/changeStatus', {patientId, status})
}


