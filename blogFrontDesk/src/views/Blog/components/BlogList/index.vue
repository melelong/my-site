<template>
  <div class="blogList-container" ref="blogList" v-loading="isLoading">
    <ul :class="{ isLoading }">
      <li v-for="(item, i) in data.rows" :key="item.id">
        <div class="thumb">
          <RouterLink
            :to="{
              name: 'Detail',
              params: {
                id: item.id,
              },
            }"
          >
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink
            :to="{
              name: 'Detail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <template v-if="item.category !== null">
              <span @click="setTitle(item.category.name)">
                <RouterLink
                  :to="{
                    name: 'CategoryBlog',
                    params: {
                      categoryId: item.category.id,
                    },
                  }"
                  >{{ item.category.name }}</RouterLink
                >
              </span>
            </template>
            <template v-else>
              <span>未分类</span>
            </template>
          </div>
          <p class="desc">{{ item.description }}</p>
        </div>
      </li>
    </ul>
    <Pager
      :total="data.total"
      :limit="routeInfo.limit"
      :current="routeInfo.page"
      @pageChange="pageChangeDo"
      :class="{ isLoading }"
    />
    <Empty v-if="data.rows.length === 0 && !isLoading" />
  </div>
</template>

<script>
import { blog } from "@/api";
import { fetchData, mainScroll } from "@/mixins";
import { Pager, Empty } from "@/components";
import { formatDate, titleController } from "@/utils";
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("blogList")],
  name: "BlogList",
  components: {
    Pager,
    Empty,
  },
  watch: {
    async $route() {
      this.isLoading = true;
      this.$refs.blogList.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
  data() {
    return {};
  },
  computed: {
    // 获取路由信息
    routeInfo() {
      const categoryId = this.$route.params.categoryId || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      const keyword = this.$route.query.keyword || "";
      return {
        categoryId,
        page,
        limit,
        keyword,
      };
    },
  },
  methods: {
    async fetchData() {
      const resp = await blog.getBlogs(this.routeInfo);
      return resp;
    },
    setTitle(name) {
      titleController.setRouteTitle(name);
    },
    pageChangeDo(page) {
      const query = {
        page,
        limit: this.routeInfo.limit,
      };
      this.routeInfo.categoryId === -1
        ? this.$router.push({ name: "Blog", query })
        : this.$router.push({
            name: "CategoryBlog",
            query,
            params: {
              categoryId: this.routeInfo.categoryId,
            },
          });
    },
    formatDate,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
.blogList-container {
  padding: 2px;
  user-select: none;
  line-height: 1.7;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  scroll-behavior: smooth;
  & .isLoading {
    display: none;
  }
  ul {
    margin-bottom: 20px;
    li {
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid @gray;
      a:hover {
        cursor: pointer;
      }
      .thumb {
        width: 11.2rem;
        flex: 0 0 auto;
        margin-right: 15px;
        img {
          width: 100%;
          height: auto;
          border-radius: 5px;
        }
      }
      .main {
        h2,
        .desc {
          .goBeyond();
        }
        .aside {
          color: @gray;
          font-size: 12px;
          span {
            margin-right: 15px;
          }
        }
        .desc {
          -webkit-line-clamp: 4;
          font-size: 14px;
          max-height: 220px;
          margin: 15px 0;
        }
      }
    }
    @media screen and (max-width: 768px) {
      li {
        flex-direction: column;
        align-items: center;
        .thumb {
          width: 50vw;
          margin-right: 0;
        }
        .main {
          text-align: center;
        }
      }
    }
  }
}
</style>
