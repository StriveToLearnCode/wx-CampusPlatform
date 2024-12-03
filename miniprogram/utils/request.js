import axios from 'axios-miniprogram'
const request = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})
// 请求拦截
request.interceptors.request.use((config) => {
  const token = wx.getStorageSync('cookie')
  if (token) {
    config.headers.token = token
  } else {
    wx.showModal({
      title: '提示',
      content: '请先登录',
      complete: (res) => {
        if (res.cancel) {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  }
  return config
})
// 响应拦截
request.interceptors.response.use((res) => {
  return res.data
})

export default request
