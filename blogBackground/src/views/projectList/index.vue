<template>
  <div class="app-container" v-loading="isLoading">
    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="项目名称" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="项目预览图"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px; height: 200px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="imgList"
            ></el-image>
            <a
              slot="reference"
              href="#"
              target="_blank"
              @click.prevent="goToTitleHandle(scope.row.url)"
              >{{ scope.row.name }}</a
            >
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="项目描述" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="预览图" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="单击预览"
            :hide-after="2000"
            placement="top"
          >
            <el-image
              style="width: 100px"
              :src="scope.row.thumb"
              fit="fill"
              :preview-src-list="imgList"
            ></el-image>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <!-- 跳转github -->
          <el-tooltip
            class="item"
            effect="dark"
            content="github"
            :hide-after="2000"
            placement="top"
            v-if="scope.row.github"
          >
            <el-button
              type="danger"
              icon="iconfont icon-GitHub"
              class="github"
              circle
              size="mini"
              @click="goToGitHubHandle(scope.row.github)"
            ></el-button>
          </el-tooltip>
          <!-- 修改 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            :hide-after="2000"
            placement="top"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editProject(scope.row)"
            ></el-button>
          </el-tooltip>
          <!-- 删除 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            :hide-after="2000"
            placement="top"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteProject(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑项目 -->
    <el-dialog
      title="请编辑信息"
      :visible.sync="dialogFormVisible"
      center
      fullscreen
    >
      <el-form :model="form">
        <!-- 项目名称 -->
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- 项目描述 -->
        <el-form-item label="项目描述(每一项描述以英文逗号分隔)">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <!-- 项目链接 -->
        <el-form-item label="项目链接">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <!-- github 地址 -->
        <el-form-item label="github 地址">
          <el-input v-model="form.github"></el-input>
        </el-form-item>
        <!-- 预览图 -->
        <el-form-item label="项目预览图">
          <Upload v-model="form.thumb" />
        </el-form-item>
        <!-- 等级排序 -->
        <el-form-item label="等级排序">
          <el-select
            class="select"
            v-model="form.order"
            placeholder="请选择项目等级"
          >
            <el-option
              v-for="i in 5"
              :key="i"
              :label="i"
              :value="i"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editProjectConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { service_URL } from "@/urlConfig.js";
import { findProject, delProject, setProject } from "@/api/project";
import Upload from "@/components/Upload";
export default {
  name: "projectList",
  data() {
    return {
      data: [], // 存储原数据
      isLoading: true,
      imgList: [],
      form: {},
      dialogFormVisible: false, // 编辑对话框是否显示
    };
  },
  components: { Upload },
  async created() {
    await this.fetchData();
  },
  methods: {
    // 获取数据
    async fetchData() {
      try {
        this.isLoading = true;
        const res = await findProject();
        this.data = res.data;
        this.data.forEach((item) => {
          // if (item.thumb) {
          //   const reg = /^\/static/;
          //   item.thumb = reg.test(item.thumb)
          //     ? service_URL + item.thumb
          //     : item.thumb;
          // }
          this.imgList.push(item.thumb);
          item.description = item.description.join(",");
        });
        this.isLoading = false;
      } catch (err) {
        this.$message.error(err);
      }
    },

    editProject(projectInfo) {
      this.form = { ...projectInfo };
      this.dialogFormVisible = true;
    },
    // 编辑项目
    async editProjectConfirm() {
      // 表单拿到用户修改的数据，发送给服务器
      let obj = { ...this.form };
      // obj.thumb = obj.thumb.startsWith(service_URL)
      //   ? obj.thumb.replace(service_URL, "")
      //   : obj.thumb;
      obj.description = obj.description.split(",");
      obj.order = +obj.order;
      try {
        await setProject(obj.id, obj);
        this.$message.success("修改成功");
        this.dialogFormVisible = false;
        await this.fetchData();
      } catch (err) {
        this.$message.error(err);
      }
    },
    // 删除项目
    deleteProject({ id }) {
      // 确认弹框
      this.$confirm("删除该项目, 是否继续?", "是否删除此项目", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await delProject(id);
          this.fetchData();
          this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 跳转到项目部署地址
    goToTitleHandle(url) {
      if (!url) return;
      window.open(url);
    },
    // 跳转到github
    goToGitHubHandle(github) {
      if (!github) return;
      window.open(github);
    },
  },
};
</script>

<style lang="scss" scoped>
.github {
  background: rgba(163, 163, 163, 1);
  border-color: rgba(163, 163, 163, 1);
}
</style>
