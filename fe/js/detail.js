// import PublicHeader from "../components/header/index.js"
// import * as api from '../api/index.js'
// import utils from "../utils/index.js"

import PublicHeader from "../js/header.js"
import * as api from '../js/api.js'
import utils from "../js/utils.js"
const detail = new Vue({
  el: '#detail',
  components: {
    PublicHeader
  },
  data () {
    return {
      article: {},
      // 头部数据
      navList: ['首页', '沸点', '课程', '直播', '活动', '竞赛', '商城'],
      originPlaceholder: '搜索稀土掘金',
      focusedPlaceholder: '搜索文章/小册/标签/用户',
      isFocus: false,
      userAvatar: '',
      username: '',
      userInfo: null,
      isLogin: false
    }
  },
  computed: {
    author () {
      return this.article.author
    }
  },
  methods: {
    getUserInfo () {
      const user = JSON.parse(localStorage.getItem('userinfo'))
      if (!user) {
        return this.userInfo = null
      }
      this.userInfo = user
    },
    async getArticleDetail () {
      const { id } = utils.formatQuery(location.href)
      const res = await api.getArticle({ id })
      this.article = res.data
      document.title = this.article.title
    },

    // 头部导航栏部分
    handleFocus () {
      this.$refs.search.style.width = 375 + 'px'
      this.$refs.write.style.right = -95 + 'px'
      this.$refs.search.style.border = '1px solid #1E80FF'
      this.$refs.icon.style.backgroundColor = '#EAF2FF'
      this.$refs.icon.style.color = '#1E80FF'
      this.$refs.icon.style.cursor = 'pointer'
      this.isFocus = true
    },

    handleBlur () {
      this.$refs.search.style.width = 260 + 'px'
      this.$refs.write.style.right = 0 + 'px'
      this.$refs.search.style.border = '1px solid #D5D9DF'
      this.$refs.icon.style.backgroundColor = '#F2F3F5'
      this.$refs.icon.style.color = '#515767'
      this.$refs.icon.style.cursor = 'default'
      this.isFocus = false
    },

    // 切换显示/隐藏菜单
    toggleMenu () {
      const { width } = this.$refs.menu.getBoundingClientRect()
      if (width === 0) {
        this.$refs.menu.style.transform = 'scale(1)'
      } else if (width === 200) {
        this.$refs.menu.style.transform = 'scale(0)'
      }
    },

    toMyPage () {
      location.href = '../html/myPage.html'
    },

    toIndex (index) {
      if (index === 0) {
        location.href = '../html/homepage.html'
      }
    },

    toLogin () {
      location.href = '../html/login.html'
    },
    handleLogout () {
      location.reload()
      localStorage.removeItem('token')
      localStorage.removeItem('userinfo')
      localStorage.removeItem('id')
    },
    toRegister () {
      location.href = '../html/register.html'
    },

    toWrite () {
      if (!localStorage.id) {
        return alert('登陆后才能发布文章')
      }
      location.href = '../html/editor.html'
    },
  },
  async mounted () {
    this.getArticleDetail()
    this.getUserInfo()
    // let articleItem = JSON.parse(localStorage.articleItem)
    // this.article = articleItem

    // let res = await axios({
    //   method: 'GET',
    //   url: `http://127.0.0.1:4000/api/getAllUser`,
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8',
    //     // 'Authorization': 'Bearer ' + localStorage.token
    //   }
    // })

    // console.log(this.article)
    // res.data.data.forEach(item => {
    //   console.log(item._id)
    //   if (item._id === this.article.userId) {

    //     this.userAvatar = item.userAvatar;
    //   }
    // })

    // let articleItem = await axios({
    //   method: 'GET',
    //   url: `http://127.0.0.1:4000/api/getDetailsArticle`,
    //   params: {
    //     // userId: this.id,
    //     articleId: location.href.split('=')[1]
    //   },
    //   headers: {
    //     'Content-Type': 'application/json;cahrset=utf-8',
    //     Authorization: 'Bearer ' + this.token
    //   }
    // })

    // this.article = articleItem.data.data

    // this.id = localStorage.id
    // this.token = localStorage.token

    // if (localStorage.id) {
    //   this.isLogin = true
    //   //请求获取个人资料
    //   let res = await axios({
    //     method: 'GET',
    //     url: `http://127.0.0.1:4000/api/getUserData/${this.id}`,
    //     headers: {
    //       'Content-Type': 'application/json;charset=utf-8',
    //       Authorization: 'Bearer ' + this.token
    //     }
    //   })

    //   this.userAvatar = res.data.data.userAvatar;
    //   this.username = res.data.data.username
    // }

  },
  filters: {
    formatTime (val) {
      return utils.formatFullTime(val)
    }
  },
  watch: {
    'location.href': {
      handler (val) {
        if (!location.href.includes('?id=')) {
          location.href = './homepage.html'
        }
      },
      immediate: true
    }
  }
})