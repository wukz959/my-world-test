import request from '@/utils/request'
export const blogSaveReq = (obj) => {
  return request.post('/saveBlog', obj)
}
export const blogGetReq = () => {
  return request.get('/getAllBlogs')
}
export const openSourceGetReq = () => {
  return request.get('/getOpenSource')
}
