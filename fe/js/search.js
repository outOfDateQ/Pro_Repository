// import PublicHeader from "../components/header/index.js"
// import ArticleItem from "../components/article-item/article-item.js"
// import * as api from '../api/index.js'
// import utils from "../utils/index.js"

import PublicHeader from "../js/header.js"
import ArticleItem from "../js/articleItem.js"
import * as api from '../js/api.js'
import utils from "../js/utils.js"
const searchPage = new Vue ({
  el: '#search-page',
  components: {
    PublicHeader,
    ArticleItem
  },
  data() {
    return {
      article: []
    }
  },
  methods: {
    async getSearchKeyWord () {
      const { keyWord } = utils.formatQuery(location.href)
      const res = await api.searchArticle({ keyWord })
      this.article = res.data
      document.title = `${keyWord} - 搜索`
    }
  },
  mounted() {
    this.getSearchKeyWord()
  },
})