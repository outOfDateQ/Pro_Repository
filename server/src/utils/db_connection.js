// 该文件专门用于连接数据库
const mongoose = require('mongoose')
const { DB_URL } = require('../../config')

// 连接MongoDB服务器并创建数据库
mongoose.connect(DB_URL + '/user')

const db = mongoose.connection

// 监听数据库的连接状态
db.on('open', () => {
  console.log('MongoDB数据库连接成功...')
})

db.on('error', () => {
  console.log('MongoDB数据库连接失败...')
})