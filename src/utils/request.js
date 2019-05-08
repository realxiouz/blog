import axios from 'axios'
import { Message } from 'iview'
import store from '@/store'

console.log('token', store.state.token)

axios.interceptors.request.use(
  r => {
    r.headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${store.state.token}`
    }
    return r
  },
  e => {
    console.log(e)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.data && response.status === 200) {
      if (response.data.status === 0) {
        return response.data
      } else {
        Message.error(response.data.msg)
        return Promise.reject(new Error(response.data.msg))
      }
    } else {
      Message.error('网络故障...')
      return Promise.reject(new Error('后端相应不是json???'))
    }
  },
  e => {
    if (e.data) {
      console.log(e.status)
    }
    Message.error('网络不通...')
    return Promise.reject(new Error('网络不通'))
  }
)

export default axios
