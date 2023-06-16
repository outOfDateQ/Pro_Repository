import ComHeader from "../js/header.js"
import ComArticle from "../js/articleList.js"
import * as api from '../js/api.js'

const index = new Vue({
  el: '#index',
  components: {
    ComHeader,
    ComArticle,
  },
  data() {
    return {
      articleList: [],
    }
  },
  methods: {
    async handleSwitchType(type) {
      this.getArticleList(type)
    },
    async getArticleList(type = '综合') {
      const { code, data } = await api.searchArticle({ type })
      if (code !== 200) {
        return alert('网络错误')
      }
      this.articleList = data
    }
  },

  mounted() {
    this.getArticleList()
  },
})