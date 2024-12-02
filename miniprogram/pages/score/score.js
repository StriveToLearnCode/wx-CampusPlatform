import { reqScore, reqRawScore } from '../../api/score'
Page({
  data: {
    option: [],
    value: 0,
    scoreList: [],
    title: '',
    activeIndex: 0,
    isActive: true,
    isRawScore: false
  },
  onLoad() {
    this.getScoreList()
  },
  chooseTerm(value) {
    console.log(value.detail)
    this.setData({
      activeIndex: value.detail
    })
    this.getScoreList()
  },
  async getScoreList() {
    const res = this.data.isRawScore ? await reqRawScore() : await reqScore()
    const term = []
    if (res.code === 0) {
      res.data.forEach((item, index) => {
        term.push({
          text: item.termName,
          value: index
        })
      })
      this.setData({
        option: term,
        scoreList: res.data[this.data.activeIndex].scoreList, // 默认选中第一项
        title: res.data[this.data.activeIndex].termName
      })
    }
  },
  changeType(e) {
    console.log(e._relatedInfo.anchorTargetText)
    if (e._relatedInfo.anchorTargetText === '有效成绩') {
      this.setData({
        isActive: true,
        isRawScore: false
      })
    } else {
      this.setData({
        isActive: false,
        isRawScore: true
      })
    }
    this.getScoreList()
  }
})
