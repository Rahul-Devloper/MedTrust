import api from './index'

// Check current user
export const currentPatient = () => {
  return api.post('/currentPatient')
}

// Get All Doctors
export const getAllDoctors = () => {
  return api.get('/doctors')
}

// Get Doctor Speciality
export const getDoctorSpeciality = (speciality) => {
  return api.get(`/doctors/speciality/${speciality}`)
} 

