<template>
  <div class="app-container" v-loading="isLoading">
    <!-- 数据表格 -->
    <el-table :data="showData" style="width: 100%" border>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{
          scope.$index + (curPage - 1) * eachPage + 1
        }}</template>
      </el-table-column>
      <el-table-column label="文章名称" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="文章预览图"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px; height: 200px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            ></el-image>
            <a
              slot="reference"
              :href="`/article/${scope.row.id}`"
              target="_blank"
              >{{ scope.row.title }}</a
            >
          </el-popover></template
        >
      </el-table-column>
      <el-table-column label="文章描述" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="浏览数" align="center">
        <template slot-scope="scope">{{ scope.row.scanNumber }}</template>
      </el-table-column>
      <el-table-column label="评论量" align="center">
        <template slot-scope="scope">{{ scope.row.commentNumber }}</template>
      </el-table-column>
      <el-table-column label="所属分类" align="center">
        <template slot-scope="scope">{{
          scope.row.category !== null ? scope.row.category.name : "未分类"
        }}</template>
      </el-table-column>
      <el-table-column label="创建日期" align="center">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
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
              @click="editBlog(scope.row)"
            ></el-button>
          </el-tooltip>
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
              @click="deleteBlog(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      style="margin-top: 30px"
      background
      :page-size="eachPage"
      layout="prev, pager, next,total,->,sizes,jumper"
      :total="count"
      :current-page.sync="pagerCurrentPage"
      :page-sizes="[5, 10, 20]"
      @size-change="sizeChange"
      @current-change="currentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
    >
    </el-pagination>
  </div>
</template>

<script>
// import { service_URL, frontDesk_URL } from "@/urlConfig.js";
import { findBlog, delBlog } from "@/api/blog";
import { formatDate } from "@/utils/tools";
export default {
  name: "blogList",
  data() {
    return {
      data: [], // 存储原数据
      showData: [], // 处理过的数据
      srcList: [], // 预览图链接数组
      curPage: 1, // 当前页数，默认是1
      eachPage: 5, // 每一页显示的条数
      totalPage: 0, // 总页数
      count: 0, // 数据总条数
      pagerCurrentPage: 1, // 分页栏当前页码
      isLoading: true,
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
        const res = await findBlog(this.curPage, this.eachPage);
        // 保存数据
        this.data = res.data;
        // 处理数据
        this.showData = JSON.parse(JSON.stringify(this.data.rows));
        this.showData.forEach((item) => {
          // item.thumb = service_URL + item.thumb;
          item.createDate = formatDate(item.createDate);
          this.srcList.push(item.thumb);
        });
        // 分页需要的数据
        this.count = this.data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);
        // 删除文章时，页面刚好减一，当前页码数就会大于总页面数
        if (this.curPage > this.totalPage) {
          this.curPage = this.totalPage;
          this.fetchData();
        }
        this.isLoading = false;
      } catch (err) {
        this.$message.error(err);
      }
    },

    // 跳转到具体文章
    // goToTitleHandle(blogInfo) {
    // window.open(`${frontDesk_URL}/article/${blogInfo.id}`);
    //   window.open(`/article/${blogInfo.id}`);
    // },
    // 编辑文章
    editBlog(blogInfo) {
      this.$router.push({
        name: "EditBlog",
        params: {
          id: blogInfo.id,
        },
      });
    },

    // 删除文章
    deleteBlog({ id }) {
      // 确认弹框
      this.$confirm(
        "删除该文章会将文章下面的评论一并删除, 是否继续?",
        "是否删除此篇文章",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          await delBlog(id);
          this.fetchData();
          this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },

    // 分页方法
    sizeChange(newEachPage) {
      this.eachPage = newEachPage;
      this.pagerCurrentPage = 1;
      this.curPage = 1;
      this.fetchData();
    },
    currentChange(pageNum) {
      this.curPage = +pageNum;
      this.fetchData();
    },
    prevClick() {
      if (this.curPage <= 0) return;
      this.curPage -= 1;
      this.fetchData();
    },
    nextClick() {
      if (this.curPage > this.totalPage) return;
      this.curPage += 1;
      this.fetchData();
    },
  },
};
</script>

<style scoped lang="scss"></style>
