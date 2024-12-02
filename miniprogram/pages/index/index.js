import { reqCourse } from '../../api/course'
Page({
  data: {
    classList: [],
    time: '',
    week: ''
  },
  onLoad() {
    this.getClassList()
  },
  async getClassList() {
    const res = await reqCourse()
    console.log(res)
  }
})
