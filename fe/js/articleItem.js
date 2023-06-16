// import utils from '../../utils/index.js'
import utils from '../js/utils.js'
import '../js/pubsubJS.js'
const articleItem = {
  props: {
    article: Object
  },
  data() {
    return {
      username: this.article.username
    }
  },
  filters: {
    formatTime(value) {
      return utils.formatTime(value)
    }
  },
  methods: {
    navigatorToDetail(id) {
      location.href = `../html/detail.html?id=${id}`
      localStorage.articleItem = ''
      localStorage.articleItem = JSON.stringify(article)
      // history.pushState(`./detail?id=${id}`)
    }
  },
  async mounted() {
    // 请求获取个人资料
    // let res = await axios({
    //   method: 'GET',
    //   url: `http://127.0.0.1:4000/api/getUserData/${localStorage.id}`,
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8',
    //     'Authorization': 'Bearer ' + localStorage.token
    //   }
    // })

    // if (this.article.userId === res.data.data.userId) {
    //   this.article.username = res.data.data.username
    // }
    // console.log(this.article.userId)
    // console.log(res.data.data.userId)

    // if (typeof parseInt(this.article.username) === 'number' && this.article.username.length === 13) {
    //   // 因为代码过于冗杂, 所以图方便直接修改了props传过来的数据(在正式开发中不建议修改props数据)
    //   this.article.username = `用户${this.article.username}`
    // }

    // let res = await axios({
    //   method: 'GET',
    //   url: `http://127.0.0.1:4000/api/getAllUser`,
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8',
    //     // 'Authorization': 'Bearer ' + localStorage.token
    //   }
    // })


    // res.data.data.forEach(item => {
    //   if (item._id === this.article.userId) {
    //     this.article.username = item.username
    //   }
    // })


    // if (localStorage.localUsername) {
    //   let userInfo = JSON.parse(localStorage.localUsername)
    //   console.log(userInfo, this.article.userId)
    //   if (userInfo.userId === this.article.userId) {
    //     this.article.username = userInfo.username
    //   }
    // }

    // PubSub.subscribe('changeName', (_, data) => {
    //   localStorage.xx = JSON.stringify(data)
    // })
  },

  template: `
    <div
      class="article-item" 
      @click="navigatorToDetail(article._id)"
    >
      <div class="content">
        <div class="header">
          <span class="author-name">{{ article.author?.username }}</span>
          <span class="line">|</span>
          <span class="time">{{ article.createAt | formatTime }}</span>
          <span class="line">|</span>
          <span class="category">{{ article.type }}</span>
        </div>
        <div class="article-desc">
          <div class="left">
            <h4 class="article-title">{{ article.title }}</h4>
            <div class="abstract" v-html="article.content"></div>
          </div>
          <div class="right" v-if="article.coverImage">
            <img :src="article.coverImage" class="cover-img" />
          </div>
        </div>
      </div>
    </div>`
}
// document.head.innerHTML += '<link rel="stylesheet" href="../components/article-item/article-item.css">'
document.head.innerHTML += '<link rel="stylesheet" href="../css/articleItem.css">'
export default articleItem