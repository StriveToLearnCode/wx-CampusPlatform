import request from '../utils/request'

// 获取最新学期课表
export const reqCourse = () => {
  return request({
    url: '/courses',
    method: 'GET'
  })
}
