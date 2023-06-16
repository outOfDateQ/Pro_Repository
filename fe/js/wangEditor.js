const { createEditor, createToolbar } = window.wangEditor
const wangEditor = {
  data() {
    return {
      // wangEditor: null
      toolbarConfig: {
        excludeKeys: [
          'group-image', 'insertVideo', 'insertLink'
        ]
      }
    }
  },
  methods: {
    editorChange (editor) {
      this.$emit('change', editor.getHtml())
    },
    initWangeEditor () {
      const editorConfig = {
        placeholder: 'Type here...',
        onChange: this.editorChange
      }
      const editor = createEditor({
          selector: '#wang-editor',
          html: '<p><br></p>',
          config: editorConfig,
          mode: 'simple', // or 'simple'
      })
      const toolbar = createToolbar({
          editor,
          selector: '#toolbar-container',
          config: this.toolbarConfig,
          mode: 'simple', // or 'simple'
      })
    },
  },
  mounted() {
    this.initWangeEditor()
  },
  template: `<div id="wangeditor—wrapper">
    <div id="toolbar-container"><!-- 工具栏 --></div>
    <div id="wang-editor"><!-- 编辑器 --></div>
  </div>
  `
}

export default wangEditor