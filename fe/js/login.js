const login = {
  props: {
    show: Boolean
  },
  data() {
    return {
      showLogin: true
    }
  },
  methods: {
    handleClose() { 
      console.log(1)
      this.$emit('close', !this.show)
    },
    handleChangeTab() {
      this.showLogin = !this.showLogin
    }
  }, 
  watch: {},
  template: `
  <div class="box">
    <div class="login-wrap" v-if="showLogin">
      <div class="loginTop">
        <span class="loginTop-span1">登录掘金畅享更多权益</span>
        <span class="loginTop-span2" @click="handleClose">×</span>
      </div>
      <div class="line"></div>
      <div class="loginUnder">
        <div class="mm">密码登录</div>
        <div class="loginUnder-form">
          <div class="form-item">
            <input type="text" id="username" placeholder="请输入邮箱/手机号（国际号码加区号）">
          </div>
          <div class="form-item">
            <input type="password" id="password" placeholder="请输入密码">
          </div>
          <div class="form-item">
            <button>登录</button>
          </div>
        </div>
        <div class="other">
          <span class="other-span1">其他登录</span>
          <span class="other-span2" @click="handleChangeTab">注册</span>
        </div>
        <div class="bottom">
          <span>注册登录即表示同意 <span style="color: #1e80ff;">用户协议</span> 和 <span
          style="color: #1e80ff;">隐私政策</span></span>
        </div>
      </div>
    </div>
    <div v-else>
    <div class="regTop">
    <span class="regTop-span1">登录掘金畅享更多权益</span>
    <span class="regTop-span2" @click="handleClose">×</span>
  </div>

  <div class="line"></div>

  <div class="regUnder">
    <div class="mm">用户注册</div>
    <div class="regUnder-form">
      <div class="form-item">
        <input
          type="text"
          id="username"
          placeholder="请输入邮箱/手机号（国际号码加区号）"
        />
      </div>
      <div class="form-item">
        <input type="password" id="password" placeholder="请输入密码" />
      </div>
      <div class="form-item">
        <input type="password" id="checkPwd" placeholder="请再次输入密码" />
      </div>
      <div class="key">
        <input type="checkbox" />
        <span
          >我已阅读并同意
          <span style="color: #1e80ff"
            >《用户服务协议》《隐私服务条款》</span
          ></span
        >
      </div>
      <div class="form-item">
        <button>立即注册</button>
      </div>
    </div>
    <div class="bottom" @click="handleChangeTab">
      <span>已有账号？ <span style="color: #1e80ff">立即登录</span></span>
    </div>
  </div>
    </div>
</div>
  
  `
}
// document.head.innerHTML += '<link ref="stylesheet" href="../components/login/login.css" />'
document.head.innerHTML += '<link ref="stylesheet" href="../css/login.css" />'
export default login