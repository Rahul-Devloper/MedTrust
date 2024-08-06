import api from './index'

// Check current user
export const currentDoctor = () => {
  return api.post('/currentDoctor')
}
