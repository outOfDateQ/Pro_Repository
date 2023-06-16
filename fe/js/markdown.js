const markdownEditor = {
  props: {
    isPublish: Boolean
  },
  data() {
    return {
      editor: null,
      type: 'markdown'
    }
  },
  methods: {
    initEditor () {
      this.editor = new toastui.Editor({
        el: document.querySelector('#markdown'),
        height: '100%',
        initialEditType: 'markdown',
        previewStyle: 'vertical',
        language: 'zh-CN',
      })
      this.editor.getHTML()
      this.editor.on('change', (type) => {
        this.type = type
        this.$emit('change', this.editor.getHTML())
      })
    }
  },
  mounted() {
    this.initEditor()
  },
  template: `<div id="markdown"></div>`
}

export default markdownEditor