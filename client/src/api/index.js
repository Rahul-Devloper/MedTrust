import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_TYPES } from "../redux/constants/authTypes";
import { store } from "../redux/store";

const BASE_URL = process.env.REACT_APP_BACKEND_API;
const api = axios.create({ baseURL: BASE_URL })

// Debounce-related flags
let isRefreshing = false
let refreshSubscribers = []

const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token))
}

const addSubscriber = (callback) => {
  refreshSubscribers.push(callback)
}

// Add Authorization header if access token exists
api.interceptors.request.use((req) => {
  const token = Cookies.get('access')
  if (token) {
    req.headers.authorization = `Bearer ${token}`
  }
  return req
})

// Handle 401 and refresh token logic
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config

    // If unauthorized and retry not done yet
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve) => {
          addSubscriber((token) => {
            originalRequest.headers.authorization = `Bearer ${token}`
            resolve(api(originalRequest))
          })
        })
      }

      isRefreshing = true

      try {
        const res = await api.post(
          '/refresh_token',
          {},
          {
            withCredentials: true,
            credentials: 'include',
          }
        )

        const newToken = res.data.accessToken

        // Save token to cookies
        Cookies.set('access', newToken, { expires: 0.0125 }) // ~18 minutes

        // Dispatch new auth state
        store.dispatch({
          type: AUTH_TYPES.AUTH,
          payload: {
            accessToken: newToken,
            user: res.data.user,
          },
        })

        onRefreshed(newToken)
        refreshSubscribers = []
        isRefreshing = false

        originalRequest.headers.authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (refreshErr) {
        isRefreshing = false
        return Promise.reject(refreshErr)
      }
    }

    return Promise.reject(err)
  }
)

export default api;
