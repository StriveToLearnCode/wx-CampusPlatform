import { login } from '../../api/login'
Page({
  data: {
    isChecked: false,
    stuId: '',
    password: ''
  },
  async login() {
    if (!this.data.stuId) {
      wx.showToast({
        title: '请输入学号',
        icon: 'none'
      })
      return
    }
    if (!this.data.password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return
    }
    const res = await login({
      stuId: this.data.stuId,
      password: this.data.password
    })
    if (res.code === 0) {
      console.log(res)
      const cookie = res.data.cookie
      wx.showToast({
        title: '登录成功',
        icon: 'none'
      })
      wx.setStorageSync('cookie', cookie)
      this.setData({
        stuId: '',
        password: '',
        isChecked: false
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }, 1000)
    } else {
      wx.showToast({
        title: `登录失败,${res.msg}`,
        icon: 'none'
      })
      this.setData({
        stuId: '',
        password: '',
        isChecked: false
      })
    }
  }
})
