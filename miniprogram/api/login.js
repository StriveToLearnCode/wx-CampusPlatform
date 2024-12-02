import request from '../utils/request'
// 登录
export const login = ({ stuId, password }) => {
  return request({
    url: '/login',
    method: 'POST',
    data: {
      stuId,
      password
    }
  })
}
