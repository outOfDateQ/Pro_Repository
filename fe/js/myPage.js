import utils from "./utils.js"
import ComHeader from './header.js'
var vm = new Vue({
    el: "#app",
    components: {
        ComHeader
    },
    data: {
        navList: ['首页', '沸点', '课程', '直播', '活动', '竞赛', '商城'],
        originPlaceholder: '搜索稀土掘金',
        focusedPlaceholder: '搜索文章/小册/标签/用户',
        isFocus: false,
        isLogin: true,
        keyWord: '',
        hasArticle: false,

        // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi5pmu6YCa55So5oi3IiwicG93ZXIiOjAsImlhdCI6MTY4NjQ5MjgwMCwiZXhwIjoxNjg3MDk3NjAwfQ.b-DWWnYtzwtwbIhCx5xZAWNxeFpl_9Z3LQI3heGvr7U',

        activeTab: 0,//当前选项卡
        userInfo: null,
        userdetil: {},//用户详细
        headimg: '',//用户头像
        userId: '',//用户id
        tablist: //选项卡
            [{
                name: "动态",
                context: []
            },
            {
                name: "文章",
                context: []
            },
            {
                name: "专栏",
                context: []
            },
            {
                name: "沸点",
                context: []
            },
            {
                name: "收藏集",
                context: []
            },
            {
                name: "关注",
                context: []
            }
            ],
    },
    filters: {
        formatTime(val) {
            return utils.formatFullTime(val)
        }
    },
    methods: {
        handleSearch() {
            console.log(111)
            if (!this.keyWord) return
            location.href = `./search.html?keyWord=${this.keyWord}`
        },
        // 切换显示/隐藏菜单
        toggleMenu() {
            const { width } = this.$refs.menu.getBoundingClientRect()
            if (width === 0) {
                this.$refs.menu.style.transform = 'scale(1)'
            } else if (width === 200) {
                this.$refs.menu.style.transform = 'scale(0)'
            }
        },

        toMyPage() {
            location.href = '../html/myPage.html'
        },

        toWrite() {
            location.href = '../html/editor.html'
        },
        toIndex(index) {
            if (index === 0) {
                location.href = '../html/homepage.html'
            }
        },
        // *****************************************************
        toPersonalPage() {
            location.href = '../html/personal.html'
        },
        //改变选项卡
        changeTab(index) {
            this.activeTab = index;//改变当前选项卡索引
            this.updateTabContent();
            // this.getUsers();
            // this.getArtcle();
        },
        //改变选项卡内容
        updateTabContent() {
            const tabContents = this.$refs.tabContent;
            const null_div = this.$refs.null_div;
            //获取选项卡元素
            tabContents.forEach((tab, index) => {
                if (index === this.activeTab) {

                    tab.style.display = 'block';
                    //如果内有内容显示
                    if (this.tablist[index].context == '' || this.tablist[index].context == []) {
                        null_div[this.activeTab].style.display = 'block';
                    }
                    else {
                        null_div[this.activeTab].style.display = 'none';
                    }
                } else {
                    tab.style.display = 'none';

                }
            });
        },


        handleFocus() {
            this.$refs.search.style.width = 375 + 'px'
            this.$refs.write.style.right = -95 + 'px'
            this.$refs.search.style.border = '1px solid #1E80FF'
            this.$refs.icon.style.backgroundColor = '#EAF2FF'
            this.$refs.icon.style.color = '#1E80FF'
            this.$refs.icon.style.cursor = 'pointer'
            this.isFocus = true
        },

        handleBlur() {
            this.$refs.search.style.width = 260 + 'px'
            this.$refs.write.style.right = 0 + 'px'
            this.$refs.search.style.border = '1px solid #D5D9DF'
            this.$refs.icon.style.backgroundColor = '#F2F3F5'
            this.$refs.icon.style.color = '#515767'
            this.$refs.icon.style.cursor = 'default'
            this.isFocus = false
        },
        //时间戳转时间函数
        formatDate(str) {
            let date = new Date(str);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            month = month < 10 ? ('0' + month) : month;
            let day = date.getDate();
            day = day < 10 ? ('0' + day) : day;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;

        },

        exitLogin() {
            localStorage.removeItem('id')
            localStorage.removeItem('token')
            localStorage.removeItem('userinfo')
            location.href = '../html/homepage.html'
        },
        getUserInfo() {
            const user = JSON.parse(localStorage.getItem('userinfo'))
            if (!user) {
                return this.userInfo = null
            }
            this.userInfo = user
        },
        getPersonArticle() { }

    },
    async mounted() {
        this.getUserInfo()
        // this.userId = localStorage.id
        // this.token = localStorage.token
        // //请求获取个人资料
        // let res = await axios({
        //     method: 'GET',
        //     url: `http://127.0.0.1:4000/api/getUserData/${this.userId}`,
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8',
        //         'Authorization': 'Bearer ' + this.token
        //     }
        // })
        // this.userdetil = res.data.data;
        // this.headimg = res.data.data.userAvatar;


        try {
            //获取用户的文章数
            // 
            const res = JSON.parse(localStorage.getItem('userinfo'))
            const token = localStorage.getItem('token')
            let { data: { data: articles } } = await axios({
                method: 'GET',
                url: `http://127.0.0.1:4000/api/getOwnArticle/${res.id}`,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': 'Bearer ' + token
                }
            })
            this.tablist[0].context = articles

            if (articles.length === 0) {
                this.updateTabContent()
            }
        } catch (error) {
            return
        }
    },
})
// vm.getUsers();
// vm.getArtcle();
