// 请求接口时的逻辑业务处理文件
const UserModel = require('../model/user_model') // 引入集合对象, 操作数据库数据
const jwt = require('jsonwebtoken') // 引入jsonwebtoken, 用于进行登录鉴权
const { success, fail } = require('../utils/api_response')
const { TOKEN_SECRET } = require('../../config')


module.exports = {
  // #region 用户登录模块(实现)
  // 用户注册
  async register (ctx) {
    const { account, password } = ctx.request.body
    // 如果账号或密码为空
    if (!account || !password) {
      return fail(ctx, '账号或密码尚未填写')
    }
    // 在数据库中匹配是否当前注册账号已经注册, 如果没有找到就返回null
    let isRegister = await UserModel.findOne({ account })
    // 如果被注册
    if (isRegister) {
      return fail(ctx, '当前账号已存在')
    }
    // 注册时账号和密码必须有
    let newUserData = {
      account,
      password,
      // 指定一个默认头像, 因为注册时候不需要填写用户其他信息, 所以暂时都为空
      position: '',
      company: '',
      personalPage: '',
      personalIntroduce: '',
      username: `用户${Date.now()}`
    }
    let toRegister = await UserModel.create(newUserData)
    // 返回用户一些可暴露的数据给前端
    success(ctx, {
      id: toRegister._id,
      username: toRegister.username,
      registerTime: toRegister.registerTime
    })
  },

  // 用户登录
  async login (ctx) {
    try {
      const { account, password } = ctx.request.body
      // 如果账号或密码为空
      if (!account || !password) {
        return fail(ctx, '账号或密码尚未填写')
      }
      let isExist = await UserModel.findOne({ account })
      // 如果当前账号不存在
      if (!isExist) {
        return fail(ctx, '当前账号未注册')
      }
      let isCorrect = await UserModel.findOne({ account, password }).select({ password: false })
      if (!isCorrect) {
        return fail(ctx, '账号或密码不正确')
      }
      console.log(isCorrect)
      // 登录成功生成Token
      let token = jwt.sign({
        id: isCorrect._id,
        name: '普通用户',
        power: 0 // 权限: 0(普通用户) 1(管理员)
      }, TOKEN_SECRET, { expiresIn: 604800 }) // 一周后过期(过期时间单位时s)

      // 返回用户一些可暴露的数据给前端(携带token)
      const { username, userAvatar, position, company, personalPage, personalIntroduce, _id } = isCorrect
      success(ctx, {
        id: _id,
        token,
        username,
        userAvatar,
        position,
        company,
        personalPage,
        personalIntroduce
      })
    } catch (e) {
      fail('登录失败')
    }
  },
  // #endregion

  // #region 用户数据修改模块(实现)
  // 修改用户个人资料
  async updateUserData (ctx) {
    // 该接口的id必传, 因为要根据用户的id从而去更改用户数据
    const { id } = ctx.state.user
    const { username, position, company, personalPage, personalIntroduce, userAvatar } = ctx.request.body
    // 因为用try...catch捕获了错误, 所以如果id存在的话, 那么try包裹块中的代码就能正常执行, 反之则执行catch中的代码
    try {
      // 当前用户
      let currentUser = await UserModel.findById(id)
      // 判断如果前端传传过来的数据没有变化, 则不操作数据修改, 直接返回提示
      if (username === currentUser.username &&
        position === currentUser.position &&
        company === currentUser.company &&
        personalPage === currentUser.personalPage &&
        personalIntroduce === currentUser.personalIntroduce &&
        userAvatar === currentUser.userAvatar
      ) {
        return fail(ctx, '当前无任何数据修改')
      }
      // 查询数据库的username
      let usernameAlreadyOccupy = await UserModel.findOne({ username })
      // 如果用户还是提交原来的用户名或者更改了数据库不存在的用户名
      if (currentUser.username === username || !usernameAlreadyOccupy) {
        // 通过findById()方法去数据库查找数据的时候, 不用传对象形式的参数, 因为id是唯一的, 因此可以直接传入id字符串
        let updatedUserData = await UserModel
          .findByIdAndUpdate(id, ctx.request.body, { new: true }) // 拿到更新之后的数据
        // 因为不能把私密数据返回给前端, 所以只把个人资料页可以修改的数据返回出去(用户名, 职位, 公司, 个人主页, 个人介绍, 头像)
        let responseData = {
          username: updatedUserData.username,
          userAvatar: updatedUserData.userAvatar,
          position: updatedUserData.position,
          company: updatedUserData.company,
          personalPage: updatedUserData.personalPage,
          personalIntroduce: updatedUserData.personalIntroduce,
          userId: updatedUserData._id
        }
        return success(ctx, responseData)
      } else {
        return fail(ctx, '当前用户名已被使用')
      }
    } catch (e) {
      return fail(ctx, '用户不存在')
    }
  },

  // 获取用户个人资料
  async getUserData (ctx) {
    const { id } = ctx.state.user
    let userData = await UserModel.findById(id)
    success(ctx, {
      username: userData.username,
      userAvatar: userData.userAvatar,
      position: userData.position,
      company: userData.company,
      personalPage: userData.personalPage,
      personalIntroduce: userData.personalIntroduce,
      registerTime: userData.registerTime,
      userId: userData._id
    })


  },
  async getUser (ctx) {
    try {
      const { id } = ctx.state.user
      let userData = await UserModel.findById({ _id: id })
      if (!userData) {
        return fail(ctx, '没用用户信息')
      }
      const { username, userAvatar, position, company, personalPage, personalIntroduce, _id } = userData
      success(ctx, {
        id: _id,
        username,
        userAvatar,
        position,
        company,
        personalPage,
        personalIntroduce
      })
    } catch (e) {
      console.log(e)
      fail(ctx, '查询失败')
    }
  },

  // 获取所有用户
  async getAllUser (ctx) {
    let res = await UserModel.find({})
    success(ctx, res)
  }
  // #endregion
}