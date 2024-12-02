import request from '../utils/request'
// 获取全部有效成绩
export const reqScore = () => {
  return request({
    url: '/scores',
    method: 'GET'
  })
}
// 获取全部原始成绩
export const reqRawScore = () => {
  return request({
    url: '/raw-scores',
    method: 'GET'
  })
}
