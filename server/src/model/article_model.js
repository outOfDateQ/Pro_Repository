const mongoose = require('mongoose')

const Schema = mongoose.Schema

const articleSchema = new Schema({
  username: String,
  userId: String,
  // 用于存放一个用户所有的文章数据
  articleData: Array
}, { versionKey: false })

const ArticleModel = mongoose.model('articledatas', articleSchema)

module.exports = ArticleModel