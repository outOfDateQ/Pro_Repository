const Router = require('@koa/router')
const { userController, articleController } = require('./controller/index')

const router = new Router()

// 所有接口第一个路径名
router.prefix('/api')

// 注册路由
router
  // 用户登录注册接口
  .post('/login', userController.login) // 登录
  .post('/register', userController.register) // 注册
  // 修改/获取用户个人资料接口
  .post('/updateUserData/:id', userController.updateUserData) // 修改用户个人资料
  .get('/getUserData/:id', userController.getUserData) // 获取用户个人资料
  .get('/getUser', userController.getUser)
  .get('/getAllUser', userController.getAllUser) // 获取所有用户
  // 文章相关接口
  .post('/publishArticle', articleController.createArticle) // 发布用户个人文章
  .get('/getIndexArticle', articleController.getIndexArticle) // 获取首页所有文章
  .get('/getDetailsArticle', articleController.getDetailsArticle) // 获取详情页文章
  .get('/article-search', articleController.searchArticle) // 搜索文章
  .get('/getOwnArticle/:userId', articleController.getOwnArticle) // 获取个人文章
  .post('/changeArticleUsername', articleController.changeUsername) // 修改文章集合的用户名


module.exports = router