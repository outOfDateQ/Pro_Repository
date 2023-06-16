const ArticleModel = require('../model/article_model') // 引入集合对象, 操作数据库数据
const ArticlesSchema = require('../model/articleSchema')
const UserModel = require('../model/user_model') // 引入集合对象, 操作数据库数据
const { success, fail } = require('../utils/api_response')
module.exports = {
  // #region 发布文章模块
  // 发布文章
  async publishArticle (ctx) {
    const {
      id,
      articleTitle,
      articleContent,
      type,
      articleCoverImg,
      userId
      // username = ''
    } = ctx.request.body

    let existUser = await UserModel.findById(id)

    if (!await ArticleModel.findOne({ userId: id })) {
      await ArticleModel.create({
        userId: id,
        username: existUser.username
      })
    }

    await ArticleModel.findOneAndUpdate({ userId: id }, { username: existUser.username })

    let currentUserData = await ArticleModel.findOne({ userId: id })

    let userArticleData = {
      username: existUser.username,
      type,
      articleTitle,
      articleContent,
      articleCoverImg,
      publishTime: Date.now(),
      id: Date.now(),
      userId
    }

    currentUserData.articleData.push(userArticleData)

    let res = await ArticleModel
      .findOneAndUpdate({ userId: id }, {
        articleData: currentUserData.articleData
      }, { new: true })

    success(ctx, res.articleData)
  },
  async createArticle (ctx) {
    try {
      const { id } = ctx.state.user
      const { title, type, content, coverImage } = ctx.request.body
      if (!title || !type || !content) {
        return fail('缺少参数')
      }
      const article = new ArticlesSchema({
        title,
        content,
        type,
        coverImage: coverImage ?? '',
        author: id
      })
      const { _id } = await article.save()
      const { articles } = await UserModel.findOne({ _id: id })
      articles.push(_id)
      const user = await UserModel.findByIdAndUpdate({ _id: id }, { articles })
      success(ctx, '发布成功')
    } catch (e) {
      console.log(e)
      fail(ctx, '发布失败')
    }

  },
  // 获取首页文章
  async getIndexArticle (ctx) {
    // let res = await ArticleModel.find({})
    // success(ctx, res)
    try {
      const { id, type } = ctx.request.query
      let article
      if (id) {
        article = await ArticlesSchema.findById({ _id: id }).populate('author', 'username userAvatar')
      } else if (type) {
        article = await ArticlesSchema.find({ type }).populate('author', 'username userAvatar')
      }
      else {
        article = await ArticlesSchema.find().populate('author', 'username userAvatar')
      }
      if (!article) {
        return success(ctx, '没有文章')
      }
      success(ctx, article)
    } catch (e) {
      console.log(e)
      fail(ctx, '获取失败')
    }
  },

  // 获取详情页文章(暂时没有使用)
  async getDetailsArticle (ctx) {
    const { articleId } = ctx.request.query

    let res = await ArticleModel.find({ articleId })

    let currentArticle = res.articleData.find(item => item.id === articleId * 1)

    success(ctx, currentArticle)
  },

  // 搜索、获取分类
  async searchArticle (ctx) {

    const { keyWord, type } = ctx.request.query
    if (!keyWord) {
      fail(ctx, '关键词不能为空')
    }
    let result = await ArticlesSchema.find().populate('author', 'username userAvatar')
    if (type != '综合') {
      result = await ArticlesSchema.find({ type }).populate('author', 'username userAvatar')
    }
    if (keyWord) {
      const reg = new RegExp(keyWord)
      result = await ArticlesSchema.find({ $or: [{ title: reg, content: reg }] }).populate('author', 'username userAvatar')
    }
    if (!result) {
      success(ctx, '没有数据')
    }
    success(ctx, result)
  },

  // 获取单个用户发表的数据
  async getOwnArticle (ctx) {
    const { userId } = ctx.request.params
    let res = await UserModel.findById({ _id: userId }, 'username userAvatar').populate('articles', 'title content type coverImage createAt')
    success(ctx, res.articles)
  },

  // 修改文章中用户的用户名
  async changeUsername (ctx) {
    const { username, userId } = ctx.request.body

    let res = await ArticleModel.findOneAndUpdate({ userId }, { username }, { new: true })

    success(ctx, res)
  }
  // #endregion
}

