import api from './index'

// Check current user
export const currentDoctor = () => {
  return api.post('/currentDoctor')
}

// deactivae a doctor
export const deactivateDoctorProfileById = (doctorId) => {
  return api.patch('/doctor/deactivate', { doctorId })
}

// reactivate a doctor
export const reactivateDoctorProfileById = (doctorId) => {
  return api.patch('/doctor/reactivate', { doctorId })
}