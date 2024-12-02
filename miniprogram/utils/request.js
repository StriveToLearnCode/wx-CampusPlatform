import axios from 'axios-miniprogram'
const token = wx.getStorageSync('cookie')
const request = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    token: token ? token : ''
  }
})
// 请求拦截
request.interceptors.request.use((config) => {
  return config
})
// 响应拦截
request.interceptors.response.use((res) => {
  return res.data
})

export default request
