import HeaderNav from '../js/constantHeader.js'
const PublicHeader = {
  props: ['init'],
  data() {
    return {
      HeaderNav,
      keyWord: '',
      originPlaceholder: '搜索',
      focusedPlaceholder: '搜索文章/小册/标签/用户',
      isFocus: false,
      isLogin: false,
      searchContent: '',
      userInfo: null,
      showMenu: false,
      // init: true
    }
  },
  methods: {
    onFoucsSearchInput() {
      this.isFocus = true
    },

    blurSearchInput() {
      setTimeout(() => {
        this.isFocus = false
      }, 150)
    },

    searchArticle() {
      if (!this.keyWord) return
      location.href = `../html/search.html?keyWord=${this.keyWord}`
    },

    // 切换显示/隐藏菜单
    toggleMenu() {
      this.showMenu = !this.showMenu
    },

    toWrite() {
      if (!localStorage.getItem('userinfo')) {
        return alert('登陆后才能发布文章')
      }
      this.searchContent = ''
      this.keyWord = ''
      location.href = '../html/editor.html'
    },

    handleSearch() {
      console.log(this.keyWord)
      if (!this.keyWord) return

      location.href = `./search.html?keyWord=${this.keyWord}`
    },

    exitLogin() {
      localStorage.removeItem('userinfo')
      localStorage.removeItem('token')
      location.href = '../html/homepage.html'
      this.userInfo = null
    },

    getUserInfo() {
      const user = JSON.parse(localStorage.getItem('userinfo'))
      if (!user) {
        return this.userInfo = null
      }
      this.userInfo = user
    }
    // *****************************************************

  },
  mounted() {
    // this.init = true
    this.getUserInfo()
  },

  template: `
  <div class="top-nav" v-cloak>
  <div class="box">
    <div class="left">
      <div class="logo-box">
        <img src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg" alt=""
          class="logo">
      </div>

      <ul class="nav-list" v-for="(item, index) in HeaderNav" :key="index">
        <li :class="index === 0 && init ? 'first': ''"><a :href="item.url">{{ item.title }}</a></li>
      </ul>
    </div>

    <div class="right">
      <div class="search-box" :class="{ 'active': isFocus }">
        <div class="search-input" ref="search" :class="isFocus ? 'search-change' : ''">
          <input
            @keyup.enter="handleSearch"
            @focus="onFoucsSearchInput"
            @blur="blurSearchInput"
            type="text"
            v-model="keyWord"
            :placeholder="isFocus ? focusedPlaceholder : originPlaceholder"
          >
          <div class="btn-sarch" @click="handleSearch">
            <i class="iconfont icon-sousuo search-icon" ref="icon" :class="isFocus ? 'icon-change' : ''"></i>
          </div>
         
        </div>
        <div @click="toWrite" class="create-article" ref="write">写文章</div>
      </div>
      <div @click="toggleMenu" class="avatar-box" v-if="userInfo">
        <img :src="userInfo?.userAvatar" alt="">
      </div>
      <div class="login-box" v-else>
        <a href="./login.html" >登录</a>
        <span class="line"></span>
        <a href="./register.html">注册</a>
      </div>
    </div>

    <!-- 点击头像菜单 -->
      <div class="menu" :class="{ 'active': showMenu }">
        <div class="user-info">
          <img :src="userInfo?.userAvatar" alt="" class="menu-avatar">
          <div class="username">{{userInfo?.username}}</div>
        </div>
        <div class="bottom-box">
          <div class="my-page">
           <a href="./myPage.html">我的主页</a>
          </div>
          <div class="exit" @click="exitLogin">退出登录</div>
        </div>
      </div>
  </div>
</div>
  `
}

// document.head.innerHTML += '<link rel="stylesheet" href="../components/header/header.css">'
document.head.innerHTML += '<link rel="stylesheet" href="../css/header.css">'
export default PublicHeader