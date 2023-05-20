<template>
  <div class="about-container" v-loading="isLoading || !srcLoading">
    <iframe
      v-if="src"
      class="about-content"
      :src="src"
      frameborder="0"
      @load="srcLoading = true"
    ></iframe>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "About",
  computed: mapState("about", {
    src: "data",
    isLoading: "isLoading",
  }),
  data() {
    return {
      srcLoading: false,
    };
  },
  methods: {},
  async created() {
    this.$store.dispatch("about/fetchAbout");
  },
};
</script>
<style lang="less" scoped>
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .about-content {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
