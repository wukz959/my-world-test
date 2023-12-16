import request from '@/utils/request'

export const barrageGetReq = () => {
  return request.get('/getBarrage')
}
export const barrageSaveReq = (obj) => {
  return request.post('/saveBarrage', obj)
}
