import { reqCourse } from '../../api/course'
Page({
  data: {
    option: [],
    weekCount: 0,//weekCount
    month: 0,
    weeks: [],
    totalClassCount: [],
    chineseNumbers: ['一', '二', '三', '四', '五', '六', '日'],
    todayWeekClass: []
  },
  onLoad: function () {
    this.getClassList()
    this.getNowTime()
    this.getWeek()
  },
  async getClassList() {
    const res = await reqCourse()
    // 获取Option
    let optionArr = []
    res.data.forEach(item => {
      item.weeks.forEach(item => {
        optionArr.push(item)
      })
    })
    optionArr = [...new Set(optionArr)].sort((a, b) => a - b)
    const option = []
    optionArr.forEach((item, index) => {
      option.push({
        text: '第' + item + '周',
        value: index + 1
      })
    })
    // 获取一天最多有多少节课
    const maxClassCount = Math.max(...res.data.map(item => Number(item.sectionCount) + Number(item.section)))
    // 总节数
    const totalClassCount = []
    for (let i = 1; i <= maxClassCount; i++) {
      if (i < 10) {
        totalClassCount.push('0' + i)
      } else {
        totalClassCount.push(i)
      }
    }
    console.log(maxClassCount)
    // 获取这周课程
    const todayWeekClass = []
    res.data.forEach(item => {
      item.weeks.forEach(element => {
        if (element === this.data.weekCount) {
          todayWeekClass.push(item)
        }
      });
    })
    wx.setStorageSync('todayWeekClass', todayWeekClass)
    this.setData({
      option, totalClassCount, todayWeekClass
    })
  },
  getNowTime() {
    const date = new Date()
    // 学期开始时间
    const startDate = date.getFullYear() + '-09-01'
    // 计算当前距离学期开始的周数
    const weekCount = Math.ceil((date.getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24 * 7))
    // 当前月份
    const nowMonth = date.getMonth() + 1
    this.setData({
      weekCount,
      month: nowMonth
    })
  },
  // 计算当前周（7天）
  getWeek() {
    const date = new Date()
    // 今天是星期几
    const day = date.getDay()
    // 周一是几月几号
    const startDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - day + 1)
    // 周一的号数
    const startDayNum = startDay.getDate()
    const weekArr = []
    for (let i = 0; i < 7; i++) {
      weekArr.push(startDayNum + i)
    }
    this.setData({
      weeks: weekArr
    })
  },
  // 切换周
  onChangeWeek(value) {
    this.setData({
      weekCount: value.detail
    })
    this.getClassList()
  }
})
