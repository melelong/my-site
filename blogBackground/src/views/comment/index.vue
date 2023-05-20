<template>
  <div class="app-container" v-loading="isLoading">
    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{
          scope.$index + (curPage - 1) * eachPage + 1
        }}</template>
      </el-table-column>
      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.avatar"
            fit="contain"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>
      <el-table-column label="评论文章" align="center">
        <template slot-scope="scope">
          <a
            slot="reference"
            href="#"
            target="_blank"
            @click.prevent="goToTitleHandle(scope.row.blog)"
            >{{ scope.row.blog.title }}</a
          >
        </template>
      </el-table-column>
      <el-table-column label="评论内容" align="center">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <el-table-column label="评论日期" align="center">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
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
              @click="deleteComment(scope.row)"
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
import { findComment, delComment } from "@/api/comment";
import { formatDate } from "@/utils/tools";
export default {
  name: "comment",
  data() {
    return {
      data: [], // 存储原数据
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
        const res = await findComment(this.curPage, this.eachPage);
        // 保存数据
        this.data = res.data.rows;
        this.data.forEach((item) => {
          item.createDate = formatDate(+item.createDate);
          // if (item.avatar) {
          //   const reg = /^\/static/;
          //   item.avatar = reg.test(item.avatar)
          //     ? service_URL + item.avatar
          //     : item.avatar;
          // }
        });
        // 分页需要的数据
        this.count = res.data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);
        // 删除评论时，页面刚好减一，当前页码数就会大于总页面数
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
    goToTitleHandle(blogInfo) {
      // window.open(`${frontDesk_URL}/article/${blogInfo.id}`);
      window.open(`/article/${blogInfo.id}`);
    },
    // 删除评论
    deleteComment({ id }) {
      // 确认弹框
      this.$confirm("删除该评论, 是否继续?", "是否删除此评论", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await delComment(id);
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
