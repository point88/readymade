import axios from 'axios'
import AuthService from './auth'

const API_BASE = process.env.REACT_APP_BASE_URL

const API = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})
API.defaults.withToken = true

API.interceptors.request.use((config) => {
  if (config.withToken) {
    // const token = localStorage.token || sessionStorage.token
    // if (token) {
    //   // eslint-disable-next-line no-param-reassign
    //   config.headers.Authorization = `Bearer ${
    //     localStorage.token || sessionStorage.token
    //   }`
    // }
    const token = AuthService.getToken() || localStorage.getItem('token')
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export default API
