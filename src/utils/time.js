export const getLocalTime = () => {
  const now = new Date()
  // 转换为东八区时间
  const localTime = now.getTime()
  const localOffset = now.getTimezoneOffset() * 60000 // 获得当地时间偏移的毫秒数
  const utc = localTime + localOffset // utc即为GMT时间
  const offset = 8 // 东八区
  const beijingTime = new Date(utc + (3600000 * offset))

  // 格式化时间
  const year = beijingTime.getFullYear()
  const month = beijingTime.getMonth() + 1 // getMonth() 返回0-11
  const day = beijingTime.getDate()
  const hour = beijingTime.getHours()
  const minute = beijingTime.getMinutes()
  const second = beijingTime.getSeconds()

  // 补零操作
  const formatNumber = (n) => n < 10 ? '0' + n : n

  return `${year}/${formatNumber(month)}/${formatNumber(day)} ${formatNumber(hour)}:${formatNumber(minute)}:${formatNumber(second)}`
}
