import markdownEditor from "./markdown.js";
import wangEditor from "./wangEditor.js";
import * as api from "./api.js";
const write = new Vue({
  el: "#write",
  components: {
    markdownEditor,
    wangEditor,
  },
  data() {
    return {
      articleTitle: "",
      wangEditor: null,
      showMarkdown: true,
      isPulish: false,
      content: "",
      currCategory: "前端",
      articleCoverImg: null,
      imageUrl: "",
      dialogVisible: false,
      dialogImageUrl: "",
      file: null,
      type: '前端',
      userInfo: null,
      category: [
        {
          id: "1001",
          title: "前端",
        },
        {
          id: "1002",
          title: "后端",
        },
      ],
      user: {},
    };
  },
  methods: {
    // 发布文章
    async handlePublish() {
      try {
        if (!this.articleTitle) {
          return ELEMENT.Message({
            type: "error",
            message: "文章标题不能为空!",
          });
        }
        if (!this.content || this.content == "<p><br></p>") {
          return ELEMENT.Message({
            type: "error",
            message: "文章内容不能为空!",
          });
        }
        const article = {
          title: this.articleTitle,
          content: this.content,
          type: this.currCategory,
          coverImage: this.articleCoverImg
        }
        console.log(article)
        const res = await api.publishArticle(article);
        ELEMENT.Message({
          type: "success",
          message: "发布成功",
        });
        location.href = "./myPage.html";
      } catch (e) {
        console.log(e);
        ELEMENT.Message({
          type: "error",
          message: "发布失败",
        });
      }
    },
    // 切换分类
    handleChangeCategory(currCategory) {
      this.currCategory = currCategory;
    },
    handleEditorChange(content) {
      this.content = content;
      console.log(this.content);
    },
    // 切换编辑器
    handleSwtichEditor() {
      this.showMarkdown = !this.showMarkdown;
    },
    handleChangeType(type) {
      this.type = type;
    },
    handleInit() {
      const user = JSON.parse(localStorage.getItem("userinfo"))
      if (!user) {
        this.user = null
        location.href = './homepage.html'
      }
      this.user = user
    },
    // 图片上传判定
    handleUploadBefore(file) {
      const isJPG = /(jpg|jpeg|png)/.test(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isLt2M) {
        ELEMENT.Message({
          type: "error",
          message: "仅支持2Mb大小的jpg、jpeg、png格式图片",
        });
      }
      return isJPG && isLt2M;
    },
    handleUpload(files) {
      console.log(files);
      this.imageUrl = URL.createObjectURL(files.file);
      try {
        const reads = new FileReader();
        reads.readAsDataURL(files.file);
        reads.onload = (ev) => {
          this.articleCoverImg = ev.target.result;
        };
      } catch (error) {
        return;
      }
    },
    handleCancelPublish() {
      this.imageUrl = null;
    },
    handleUserBoxClick(command) {
      console.log("111");
      if (command == "goToPersonPage") {
        location.href = "./myPage.html";
      }
      if (command == "logout") {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("userinfo");
        location.href = "./homepage.html";
      }
    },
  },
  mounted() {
    this.handleInit();
  },
});
