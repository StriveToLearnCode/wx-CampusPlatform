import { reqAttendance } from '../../api/attendance'
Page({
  data: {
    option: [],
    value: 0,
    attendanceList: []
  },
  onLoad() {
    this.getAttendanceList()
  },
  async getAttendanceList() {
    const res = await reqAttendance()
    const option = []
    res.data.forEach((item, index) => {
      option.push({
        text: item.termName,
        value: index
      })
    })
    this.setData({
      attendanceList: res.data[this.data.value].attendanceList,
      option
    })
  },
  chooseTerm(value) {
    this.setData({
      value: value.detail
    })
    this.getAttendanceList()
  }
})
