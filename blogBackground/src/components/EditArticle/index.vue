<template>
  <div class="app-container">
    <!-- 文章标题 -->
    <div class="block">文章标题(必填)</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>
    <!-- 文章编辑 -->
    <div class="block">文章编辑(必填)</div>
    <div style="margin-bottom: 15px">
      <editor
        ref="toastuiEditor"
        height="600px"
        :initialValue="form.editorText"
        :options="defaultOptions"
      />
    </div>
    <!-- 文章描述 -->
    <div class="block">文章描述(必填)</div>
    <div style="margin-bottom: 15px">
      <el-input type="textarea" :rows="6" v-model="form.description"></el-input>
    </div>
    <!-- 文章头图 -->
    <Upload v-model="form.thumb" uploadTitle="文章头图(选填)" />
    <!-- 选择分类 -->
    <div class="block">选择分类(必填)</div>
    <div style="margin-bottom: 15px">
      <el-select
        class="select"
        v-model="form.select"
        placeholder="请选择文章分类"
      >
        <el-option
          v-for="item in blogType"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <!-- 文章修改 -->
    <div style="margin-bottom: 15px">
      <el-button
        type="primary"
        style="margin-top: 15px"
        @click="editArticleHandler"
        >{{ btnText }}</el-button
      >
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn.js";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload";
import { getBlogType } from "@/api/blogType";
// import { service_URL } from "@/urlConfig";
import { editBlog, addBlog, FindOneBlog } from "@/api/blog";
export default {
  name: "EditArticle",
  components: {
    editor: Editor,
    Upload,
  },
  props: {
    model: {
      type: String,
      default: "add",
    },
  },
  data() {
    return {
      // 表单
      form: {
        title: "", // 文章标题
        editorText: "", // 用户编辑的内容
        description: "", // 文章描述
        thumb: "", // 文章头图
        select: "", // 选择分类
      },
      // 编辑器语言
      defaultOptions: {
        language: "zh-CN",
      },
      // 存储文章分类
      blogType: [],
    };
  },
  computed: {
    blogId() {
      return this.model === "add" ? "" : this.$route.params.id;
    },
    btnText() {
      return this.model === "add" ? "添加文章" : "修改文章";
    },
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    // 获取数据
    async fetchData() {
      try {
        const blogTypeResp = await getBlogType();
        this.blogType = blogTypeResp.data;
        if (this.model === "edit") {
          // 数据回填
          const oneBlogResp = await FindOneBlog(this.blogId);
          const { title, description, thumb, category, htmlContent } =
            oneBlogResp.data;
          // if (thumb) {
          //   const reg = /^\/static/;
          //   thumb = reg.test(thumb) ? service_URL + thumb : thumb;
          // }
          // 编辑器内容回填
          this.$refs.toastuiEditor.invoke("setHTML", htmlContent);
          this.form = {
            title,
            description,
            thumb,
            select: category ? category.id : "",
          };
        }
      } catch (err) {
        this.$message.error(err);
      }
    },
    // 提交数据
    async editArticleHandler() {
      try {
        const htmlContent = this.$refs.toastuiEditor.invoke("getHTML");
        const markdownContent = this.$refs.toastuiEditor.invoke("getMarkdown");
        // 数据组装
        const formInfo = {
          title: this.form.title,
          description: this.form.description,
          createDate: new Date().getTime(),
          categoryId: this.form.select,
          // 服务器自动生成
          toc: [],
          htmlContent,
          // thumb: this.form.thumb.startsWith(service_URL)
          //   ? this.form.thumb.replace(service_URL, "")
          //   : this.form.thumb,
          thumb: this.form.thumb,
          markdownContent,
        };
        if (
          !(
            formInfo.title &&
            formInfo.description &&
            formInfo.categoryId &&
            formInfo.htmlContent &&
            formInfo.markdownContent
          )
        ) {
          // 验证
          this.$message.error("请填写必填内容");
          return;
        }
        this.model === "add"
          ? await addBlog(formInfo)
          : await editBlog({ id: this.blogId, data: formInfo });
        this.$message.success(
          this.model === "add" ? "添加文章成功" : "修改文章成功"
        );
        this.$router.push("/blogList");
      } catch (err) {
        this.$message.error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
.select {
  width: 180px;
}
</style>
