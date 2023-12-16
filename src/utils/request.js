import axios from 'axios'
import { Loading, Message } from 'element-ui'
import { baseURL } from './constants'

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10_000
})
let loadingInstance = null
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (!config.hideLoading) {
    loadingInstance = Loading.service({ fullscreen: false, text: '我也很急，你别急...' })
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (loadingInstance) {
    loadingInstance.close()
  }
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  if (loadingInstance) {
    loadingInstance.close()
  }

  Message({
    message: '服务器好像出了点问题哦！！！再试试看?',
    type: 'error',
    showClose: true
  })
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default instance
