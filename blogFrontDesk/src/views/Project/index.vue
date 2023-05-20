<template>
  <div ref="project" class="project-container" v-loading="isLoading">
    <ul class="container" v-if="data">
      <li class="project-item" v-for="item in data" :key="item.id">
        <a
          :target="item.url ? '_blank' : '_self'"
          :href="
            item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`
          "
        >
          <img v-lazy="item.thumb" :alt="item.name" class="thumb" />
        </a>
        <div class="info">
          <h2>
            <a
              :target="item.url ? '_blank' : '_self'"
              :href="
                item.url
                  ? item.url
                  : `javascript:alert('该项目无法通过外网访问')`
              "
              >{{ item.name }}</a
            >
          </h2>
          <a
            v-if="item.github"
            target="_blank"
            :href="item.github"
            class="github"
            >github</a
          >
          <p v-for="(des, i) in item.description" :key="i">{{ des }}</p>
        </div>
      </li>
    </ul>
    <Empty v-if="data.length === 0 && !isLoading" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mainScroll } from "@/mixins";
import { Empty } from "@/components";
export default {
  name: "Project",
  components: {
    Empty,
  },
  mixins: [mainScroll("project")],
  computed: mapState("project", ["data", "isLoading"]),
  async created() {
    await this.$store.dispatch("project/fetchProject");
  },
};
</script>
<style lang="less" scoped>
@import "~@/styles/var.less";
.project-container {
  width: 100%;
  height: 100vh;
  padding: 20px 20px 40px;
  position: relative;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow-x: hidden;
  scroll-behavior: smooth;
  .container {
    width: 100%;
    .project-item {
      padding: 20px;
      display: flex;
      margin-bottom: 20px;
      width: 100%;
      transition: 1s;
      a {
        cursor: pointer;
      }
      &:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 1);
        transform: scale(1.01) translate(3px, -3px);
      }

      .thumb {
        width: 250px;
        margin-right: 15px;
        min-height: 200px;
        border-radius: 5px;
      }
      .info {
        user-select: none;
        line-height: 1.7;
        .github {
          color: @primary;
          font-size: 14px;
        }
        p {
          margin: 16px 0;
        }
      }
      @media screen and (max-width: 1023px) {
        & {
          box-shadow: 0 0 5px rgba(0, 0, 0, 1);
          transform: scale(1.01) translate(3px, -3px);
        }
      }
      @media screen and (max-width: 768px) {
        & {
          flex-direction: column;
          align-items: center;
        }
        & .info {
          h2,
          .github {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
