const formatTime = (time) => {
  let t = Date.now() - new Date(time).getTime()
  if (isNaN(t)) return
  t = (Date.now() - new Date(time).getTime()) / 1000
  const d = t / (24 * 60 * 60)
  if (d > 30 ) {
    return `${ parseInt(t / (30 * 24 * 60 * 60)) }个月前`
  }
  if (d > 7) {
    return `${ parseInt(t / (7 * 24 * 60 * 60))}个星期前`
  }
  if (d > 1) {
    return `${ parseInt(t / (24 * 60 * 60)) }天前`
  }
  if (t / ( 60 * 60) > 1) {
    return `${ parseInt(t / (60 * 60)) }小时前`
  }
  if (t / 60 > 1) {
    return `${ parseInt(t / 60 ) }分钟前`
  }
  return `${ parseInt(t) }秒前`
  
}

const formatQuery = (url) => {
  if (typeof url !== 'string') return
  const query = decodeURIComponent(url).split('?')[1].split('&')
  const queryObject = {}
  for(let item of query) {
    queryObject[item.split('=')[0]] = item.split('=')[1]
  }
  return queryObject
}
const format = (time) => {
  return String(time).length == 2 ? time : '0' + time
}
const formatFullTime = (time) => {
  if (isNaN(time)) true
  const t = new Date(time)
  const year = t.getFullYear()
  const month = t.getMonth() + 1
  const day = t.getDate()
  const hour = format(t.getHours())
  const min = format(t.getMinutes())
  const sec = format(t.getSeconds())
  return `${year}/${month}/${day} ${hour}:${min}:${sec}`
}
export default {
  formatTime,
  formatFullTime,
  formatQuery 
}
