<template>
  <nav class="menu-container" :style="{ '--color': color }">
    <!-- <RouterLink
      v-for="item in data"
      :key="item.link"
      :to="item.link"
      :style="{ '--hoverColor': hoverColor, '--bgColor': bgColor }"
      :class="{ selected: isSelected(item) }"
    > -->
    <RouterLink
      v-for="item in data"
      :exact="item.exact"
      :key="item.link"
      :to="{ name: item.name }"
      active-class="selected"
      exact-active-class=""
      :style="{ '--hoverColor': hoverColor, '--bgColor': bgColor }"
    >
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </RouterLink>
  </nav>
</template>
<script>
import Icon from "@/components/Icon";
export default {
  name: "Menu",
  data() {
    return {};
  },
  components: {
    Icon,
  },
  methods: {},
  props: {
    data: {
      type: Array,
      required: true,
    },
    color: {
      type: String,
      default: "#b4b8bc",
    },
    hoverColor: {
      type: String,
      default: "#fff",
    },
    bgColor: {
      type: String,
      default: "#2f2f2f",
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/styles/var.less";
.menu-container {
  color: var(--color);
  a {
    display: flex;
    align-items: center;
    height: 45px;
    padding: 0 50px;
    color: inherit;
    .icon {
      width: 24px;
    }
    &:hover {
      color: var(--hoverColor);
    }
    &.selected {
      background: var(--bgColor);
    }
  }
}
</style>
