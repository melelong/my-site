<template>
  <div class="app-container">
    <!-- 项目名称 -->
    <div class="block">项目名称(必填)</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
    </div>
    <!-- 项目描述 -->
    <div class="block">项目描述(每一项描述以英文逗号分隔，必填)</div>
    <div style="margin-bottom: 15px">
      <el-input
        v-model="form.description"
        placeholder="请输入项目名称"
      ></el-input>
    </div>
    <!-- 项目链接 -->
    <div class="block">项目链接(必填)</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.url" placeholder="请输入项目名称"></el-input>
    </div>
    <!-- github 地址 -->
    <div class="block">github 地址(必填)</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.github" placeholder="请输入项目名称"></el-input>
    </div>
    <!-- 项目预览图 -->
    <Upload v-model="form.thumb" uploadTitle="项目预览图(必填)" />
    <!-- 项目等级 -->
    <div class="block">项目等级(必填)</div>
    <div style="margin-bottom: 15px">
      <el-select
        class="select"
        v-model="form.order"
        placeholder="请选择项目等级"
      >
        <el-option v-for="i in 5" :key="i" :label="i" :value="i"></el-option>
      </el-select>
    </div>
    <!-- 文章修改 -->
    <div style="margin-bottom: 15px">
      <el-button
        type="primary"
        style="margin-top: 15px"
        @click="addProjectHandler(form)"
        >添加项目</el-button
      >
    </div>
  </div>
</template>

<script>
import { addProject } from "@/api/project";
import Upload from "@/components/Upload";
export default {
  name: "addProject",
  components: {
    Upload,
  },
  data() {
    return {
      form: {
        id: "",
        description: "",
        github: "",
        order: "1",
        thumb: "",
        url: "",
        name: "",
      },
    };
  },
  methods: {
    // 提交数据
    async addProjectHandler({ name, description, url, github, order, thumb }) {
      if (!name || !description || !url || !github || !order || !thumb) {
        this.$message.error("请填写必填内容");
        return;
      }
      let obj = { ...this.form };
      obj.description = description.split(",");
      obj.order = +order;
      try {
        await addProject(obj);
        this.$router.push({
          name: "ProjectList",
        });
        this.$message.success("添加成功");
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
