// import tabs from './constant.js'
// import articleItem from '../article-item/article-item.js'

import tabs from '../js/constantArticle.js'
import articleItem from '../js/articleItem.js'
// 消息订阅与发布
import '../js/pubsubJS.js'
const ArticleList = {
  props: {
    list: Array
  },
  components: {
    articleItem
  },
  data () {
    return {
      currentIndex: 0,
      tabs,
      articleList: this.list
    }
  },
  methods: {
    handleChangeType (index, type) {
      this.currentIndex = index
      this.$emit('switch-type', type)
      sessionStorage.setItem('currentHomeTab', index)
    },
    setActiveType () {
      const tab = sessionStorage.getItem('currentHomeTab')
      this.currentIndex = tab ?? this.currentIndex
    }
  },
  mounted () {
    this.setActiveType()
    // 订阅消息
    // PubSub.subscribe('getFilterArticleList', (_, data) => {
    //   this.articleList = data
    //   // 在开发中不建议直接修改props, 即使页面可以有效果, 但是控制台会报错
    //   // this.list = data
    // })
  },
  computed: {
    articles () {
      // return this.articleList
      return this.list
    }
  },
  template: `<div class="article-list">
    <div class="content">
      <div class="article-header">
        <div class="tabs-content">
          <div 
            class="tab"
            v-for="(item, index) of tabs"
            :key="item.id"
            :class="{ active: currentIndex == index}" 
            @click="handleChangeType(index, item.title)">
          {{ item.title }}
          </div>
        </div>
      </div>
      <div class="article-content">
        <article-item
          v-for="item of articles" 
          :key="item.id"
          :article="item"
        ></article-item>
        <div style="text-align: center; heigth: 300px" class="no-data" v-if="articles.length == 0">
          <h1>没有数据</h1>
        </div>
      </div>
    </div>
  </div>`
}
// document.head.innerHTML += '<link rel="stylesheet" href="../components/article-list/article.css">'
document.head.innerHTML += '<link rel="stylesheet" href="../css/article.css">'
export default ArticleList