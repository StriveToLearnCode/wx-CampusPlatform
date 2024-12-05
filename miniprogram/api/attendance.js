import request from '../utils/request'
export const reqAttendance = () => {
  return request({
    url: '/attendances',
    method: 'GET'
  })
}