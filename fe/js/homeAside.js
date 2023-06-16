// import AsideNav from './constant.js'
import AsideNav from '../js/constantHomeaside.js'
const HomeAside = {
  data () {
    return {
      AsideNav,
      isActive: '10001'
    }
  },
  methods: {
    handleChange (id) {
      this.isActive = id
      this.$emit('change', this.isActive)
      sessionStorage.setItem('aside-nav', this.isActive)
    },
    setActive () {
      const id = sessionStorage.getItem('aside-nav')
      this.isActive = id ?? this.isActive
    }
  },
  mounted () {
    this.setActive()
  },
  template: `<div class="home-aside">
    <div class="aside-content">
      <ul class="aside-nav">
        <li 
          class="nav-item"
          :class="{ active: isActive == item.id }"
          v-for="item of AsideNav" 
          :key="item.id"
          @click="handleChange(item.id)"
          >
          
          <a href="javascript:" class="nav-link">
            <i class="iconfont" :class="item.icon"></i>
            <span> {{ item.title }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>`
}
// document.head.innerHTML += ' <link rel="stylesheet" href="../components/home-aside/home-aside.css">'
document.head.innerHTML += ' <link rel="stylesheet" href="../css/homeAside.css">'
export default HomeAside