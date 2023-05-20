<template>
  <div class="app-container" v-loading="isLoading">
    <!-- 搜索框 -->
    <div style="margin-top: 15px">
      <el-input
        placeholder="请输入要添加的分类，左边选择该分类的等级"
        v-model="input"
        class="input-with-select blogAddInput"
      >
        <el-select
          class="blogOrder"
          v-model="select"
          slot="prepend"
          placeholder="请选择"
        >
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-input>
      <el-button
        @click="addBlogTypeHandle"
        type="primary"
        style="margin-left: 10px"
        >添加</el-button
      >
    </div>
    <!-- 表格 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="文章类别" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="文章数量" align="center">
        <template slot-scope="scope">{{ scope.row.articleCount }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
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
              @click="editBlogType(scope.row)"
            ></el-button>
          </el-tooltip>
          <!-- 删除按钮 -->
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
              @click="delBlogTypeHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑文章 -->
    <el-dialog
      title="请编辑信息"
      width="400px"
      :visible.sync="dialogFormVisible"
      top="5vh"
    >
      <el-form :model="form">
        <!-- 标题 -->
        <el-form-item label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <!-- 描述 -->
        <el-form-item label="排序等级">
          <el-select
            class="blogOrder"
            v-model="form.order"
            placeholder="请选择"
          >
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBlogTypeConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogType,
  addBlogType,
  delBlogType,
  findOneBlogType,
  updateOneBlogType,
} from "@/api/blogType";
export default {
  name: "blogType",
  data() {
    return {
      input: "",
      select: "",
      data: [], // 存储原数据
      isLoading: true,
      dialogFormVisible: false,
      form: {
        name: "",
        order: "",
      },
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    // 获取数据
    async fetchData() {
      try {
        this.isLoading = true;
        const res = await getBlogType();
        this.data = res.data;
        this.isLoading = false;
      } catch (err) {
        this.$message.error(err);
      }
    },
    // 添加博客文章分类
    async addBlogTypeHandle() {
      // 判断内容是否为空
      if (!this.input) {
        this.$message.error("分类名称不能为空");
        return;
      }
      try {
        const data = {
          // 文章分类名
          name: this.input,
          // 文章分类等级，默认为1
          order: this.select || "1",
        };
        await addBlogType(data);
        // 复原
        this.input = "";
        this.select = "";
        this.$message.success("添加成功");
        // 重新发请求，渲染列表
        await this.fetchData();
      } catch (err) {
        this.$message.error(err);
      }
    },
    // 修改单个文章分类
    async editBlogTypeConfirm() {
      try {
        await updateOneBlogType({
          id: this.form.id,
          data: this.form,
        });
        this.$message.success("修改成功");
        this.dialogFormVisible = false;
        await this.fetchData();
      } catch (err) {
        this.$message.error(err);
      }
    },
    async editBlogType({ id }) {
      try {
        // 回填form,显示弹框
        const res = await findOneBlogType(id);
        this.form = res.data;
        this.dialogFormVisible = true;
      } catch (err) {
        this.$message.error(err);
      }
    },
    // 删除文章分类
    async delBlogTypeHandle({ id }) {
      // 确认弹框
      this.$confirm(
        "删除该文章分类后，该文章分类下面的所有文章将变为未分类状态, 是否继续?",
        "是否删除此文章分类",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          await delBlogType(id);
          this.fetchData();
          this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.blogAddInput {
  width: 420px;
  margin-bottom: 20px;
}
.blogOrder {
  width: 90px;
}
</style>
