import request from '@/utils/request'

export const getMsgMaxLength = () => {
  return request.get('/getMsgMaxLength')
}
export const talkToGPT = (obj) => {
  return request.post('/talkToGPT', obj, { hideLoading: true, timeout: 60_000 })
}
