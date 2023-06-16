const mongoose = require('mongoose')
const config = require('../../config')
// 获取创建约束的属性
const Schema = mongoose.Schema

// 创建用户登录&注册约束
const userSchema = new Schema({
  // 用户名, 如果注册的用户没有修改自己的用户名, 那么系统会自动生成一个用户名
  username: {
    type: String,
    default: Date.now
  },
  // 注册时间
  registerTime: {
    type: String,
    default: Date.now
  },
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'articles'
    },
  ],
  // 登录账户&密码
  account: String,
  password: String,
  // 个人资料数据
  userAvatar: {
    type: String,
    default: config.DEFAULT_AVATAR.avatar
  }, // 用户头像(因为是单文件上传, 且前端使用的方式会生成一个字符串, 因此用字符串存储头像数据)
  position: String, // 职位
  company: String, // 公司
  personalPage: String, // 个人主页信息
  personalIntroduce: String, // 个人介绍信息
}, { versionKey: false }) // 关闭版本字段的显示

// 把创建好的约束生成集合
const UserModel = mongoose.model('userdatas', userSchema)

module.exports = UserModel