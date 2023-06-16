const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const solveCORS = require('@koa/cors')
const judgeJwt = require('koa-jwt')

const router = require('./src/router') // 引入路由
const { PORT, TOKEN_SECRET } = require('./config') // 引入JS配置文件

require('./src/utils/db_connection') // 启动服务器的同时, 连接数据库

const app = new Koa()

// 解决跨域, 建议在最前面使用, 因为后续的操作都是通过向服务器发请求而执行的
app.use(solveCORS())

// 当用户打开页面时, 进行Token验证
app.use(judgeJwt({ secret: TOKEN_SECRET }).unless({
  path: [
    '/api/login',
    '/api/register',
    '/api/getIndexArticle',
    '/api/getDetailsArticle',
    '/api/article-search',
    '/api/getAllUser'
  ] // 以上路径不需要鉴权
}))

// 解析请求体参数
app.use(bodyParser())

// 使用路由
app.use(router.routes())

// 监听服务器的启动
app.listen(PORT, () => {
  console.log(`服务器启动成功: http://127.0.0.1:${PORT}`)
})