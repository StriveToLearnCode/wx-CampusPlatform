Page({
  data: {
    thisClass: {}
  },
  onLoad(options) {
    const num = options.detail
    const todayWeekClass = wx.getStorageSync('todayWeekClass')
    console.log(todayWeekClass)
    todayWeekClass.forEach(item => {
      if (item.num == num) {
        this.setData({
          thisClass: item
        })
      }
    })

  }
})