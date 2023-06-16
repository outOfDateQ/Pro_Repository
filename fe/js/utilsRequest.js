import config from "../js/index.js"
// import axios from "../js/axios.js"
const token = localStorage.getItem('token')
const request = axios.create({
  baseURL: config.BASE_URL,
  timeout: 5000
})

request.interceptors.request.use(req => {
  req.headers.authorization = `Bearer ${ token }`
  return req

})

request.interceptors.response.use(res => {
  return res.data
})

export default request
