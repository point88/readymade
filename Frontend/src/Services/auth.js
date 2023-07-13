import API from './API'
import { toast } from 'react-toast'
import { encryptPassword } from '../Utils/Validation'
import axios from 'axios'
import AbstractService from './Abstract'

class AuthService extends AbstractService {
  constructor() {
    super()
    this.uid = null
    this.email = null
    this.token = null
    this.user = null
  }

  getUid() {
    return this.uid
  }

  getEmail() {
    return this.email
  }

  getToken() {
    return this.token
  }

  getUser() {
    const user = JSON.parse(localStorage?.getItem('userInfo'))
    return this.user || user
  }

  getUserType() {
    const user = this.getUser()
    return !!user?.freelancerId ? 0 : !!user?.clientId ? 2 : 1
  }

  async register(payload, setLoadingOpen, setStep) {
    const password = encryptPassword(payload.password)
    try {
      const { data } = await API.post('register', {
        ...payload,
        password,
      })
      this.uid = data.user.pk
      this.email = data.user.email
      this.token = data.access_token
      localStorage.setItem('token', data.access_token)
      setStep()
    } catch (error) {
      console.error(error)
      const err = error.response.data
      toast.error(
        err.email[0] ===
          'A user is already registered with this e-mail address.'
          ? err.email[0]
          : err.messages[0].message,
      )
    }
    setLoadingOpen(false)
  }

  async createProfile(payload, setLoadingOpen) {
    const uid = this.getUid()
    try {
      await API.put(`user/${uid}`, {
        ...payload,
        UserId: uid,
      })
      return true
    } catch (err) {
      console.error(err)
      toast.error(err.response.data.messages[0].message)
    }
    setLoadingOpen(false)
  }

  async fetchCategories() {
    try {
      const { data } = await API.get('user/categories')
      return data
    } catch (err) {
      console.error(err)
      toast.error(err.response.data.messages[0].message)
    }
  }

  async fetchSkills(id) {
    try {
      const { data } = await API.get(`user/skill/${id}`)
      return data
    } catch (err) {
      console.error(err)
      toast.error(err.response.data.messages[0].message)
    }
  }

  async uploadSelectedSkills(skills) {
    const id = this.getUid()
    const payload = skills.map((skill) => ({ UserId: id, SkillId: skill.id }))
    try {
      API.post(`user/hasskills`, {
        skills: payload,
      })
      return true
    } catch (err) {
      console.error(err)
      toast.error(JSON.parse(err.response.data).message)
    }
  }

  async sendEmail(email, setLoadingOpen) {
    try {
      await API.post('/resend-email', { email })
      toast.success('Send!')
    } catch (error) {
      toast.error('Error Occurs While Send Email.')
    }
    setLoadingOpen(false)
  }

  async verifyEmail(key) {
    try {
      await API.post('/verify-email', { key })
      toast.success('Successfully Verified!')
      return true
    } catch (error) {
      toast.error('Error Occurs While Verify Email.')
      return false
    }
  }

  async signin(payload, setLoadingOpen) {
    localStorage.removeItem('token')
    const password = encryptPassword(payload.password)
    try {
      const { data } = await API.post('login', {
        ...payload,
        password,
      })
      this.uid = data.user.pk
      this.email = data.user.email
      this.token = data.access_token
      this.user = data.user
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      toast.success('Successfully Login!')
    } catch (err) {
      console.error('signin error: ', err)
      if (err.response.data.message[0] === 'Provided email is not registered')
        toast.error(err.response.data.message[0])
      else
        toast.error(
          'Unable to log in with provided credentials. please try with another credentials or social signin',
        )
    }
    setLoadingOpen(false)
  }

  async sendNewPassword(email, setLoadingOpen) {
    try {
      const { data } = await API.post('password/reset', { email })
      this.uid = data.uid
      toast.success('Successfully Login!')
    } catch (err) {
      console.error(err)
      toast.error(JSON.parse(err.request.response).message)
    }
    setLoadingOpen(false)
  }

  async verifyCode(key, setLoadingOpen) {
    try {
      const { data } = await API.post('verify-code', key)
      console.log('Verify Code data : ', data)
      toast.success('Successfully Login!')
    } catch (err) {
      console.error(err)
      toast.error(JSON.parse(err.request.response).message)
    }
    setLoadingOpen(false)
  }

  async resetPassword(password, setLoadingOpen) {
    try {
      const uid = this.getUid()
      await API.post('password/reset/confirm', {
        uid,
        new_password: encryptPassword(password),
      })
      toast.success('Successfully Login!')
    } catch (err) {
      console.error(err)
      toast.error(JSON.parse(err.request.response).message)
    }
    setLoadingOpen(false)
  }

  isSigned() {
    const data = localStorage.getItem('token')
    return !!data
  }

  async getTopRates(count) {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_BASE_URL + '/user/toprated/' + count,
      )
      return data
    } catch (err) {
      console.error(err)
      toast.error(JSON.parse(err.request.response).message)
    }
  }

  async fetchData(searchQuery) {
    try {
      const response = await API.get(`/search/${searchQuery}`)

      const users = response.data.users || []
      const projects = response.data.projects || []

      return { users, projects }
    } catch (error) {
      console.error('Error fetching data:', error)
      return { users: [], projects: [] }
    }
  }
}

export default new AuthService()
