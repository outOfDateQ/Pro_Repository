const mongoose = require('mongoose')

const articlesSchema = mongoose.Schema({
  title: String,
  type: String,
  content: String,
  coverImage: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userdatas'
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  deleteAt: Date
})

module.exports = mongoose.model('articles', articlesSchema)