const dialog = {
  props: {
    isShow: Boolean
  },
  data () {
    return {
      showDialog: false
    }
  },
  methods: {
  },
  watch: {
    isShow: {
      handler (value) {
        value ? document.body.style = 'overflow: hidden' : document.body.style = ''
        this.showDialog = value
      },
      immediate: true
    }
  },
  template: `<div class="dialog" :class="{ hidden: !showDialog}">
    <div class="dialog-content">
      <slot name="header" />
      <slot />
      <slot name="footer" />
    </div>
  </div>`
}

// document.head.innerHTML += '<link rel="stylesheet" href="../components/dialog/dialog.css">'
document.head.innerHTML += '<link rel="stylesheet" href="../css/dialog.css">'
export default dialog