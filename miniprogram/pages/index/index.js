import { reqCourse } from '../../api/course'
Page({
  data: {
    classList: [],
    week: '',
    weekCount: '',
    weekArr: [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六'
    ]
  },
  onLoad() {
    this.getClassList()
    this.getNowTime()
  },
  async getClassList() {
    const res = await reqCourse()
    const todayClass = []
    res.data.forEach((item) => {
      if (item.week + 1 === this.data.week) {
        item.weeks.forEach((element) => {
          if (element === this.data.weekCount) {
            todayClass.push(item)
          }
        })
      }
    })
    this.setData({
      classList: todayClass
    })
  },
  getNowTime() {
    const date = new Date()
    // 学期开始时间
    const startDate = date.getFullYear() + '-09-01'
    // 计算当前距离学期开始的周数
    const weekCount = Math.ceil(
      (date.getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24 * 7)
    )
    // 当前星期
    const nowWeek = date.getDay() + 1
    this.setData({
      weekCount,
      week: nowWeek
    })
  }
})
