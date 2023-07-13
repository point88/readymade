import API from './API'
import AbstractService from './Abstract'
import { toast } from 'react-toast'

class PostService extends AbstractService {
  constructor() {
    super()
  }

  async getAllSkills() {
    try {
      const { data } = await API.get('user/skills')
      return data
    } catch (error) {
      this._throwError(error.response.data)
      toast.error(JSON.parse(error.request.response).message)
    }
  }
  async postProject(payload) {
    try {
      const { data } = await API.post('jobs', payload)
      toast.success('Project successfully posted')
    } catch (error) {
      this._throwError(error.response.data)
      toast.error(`There's some issues in post project. Try it later`)
    }
  }

  async createPayment(payload) {
    try {
      const { data } = await API.post('payment/create', payload)
      console.log('createPayment: ', data)
      window.open(data?.source?.transaction_url)
      return data
    } catch (error) {
      this._throwError(error.response.data)
      toast.error('validation failed. please input correct card information')
    }
  }
  // async getPayLevels() {
  //   try {
  //     const { data } = await API.get('payment_types')
  //     console.log('data: ', data)
  //     return data
  //   } catch (error) {
  //     console.error(error)
  //     toast.error(JSON.parse(error.request.response).message)
  //   }
  // }
}

export default new PostService()
