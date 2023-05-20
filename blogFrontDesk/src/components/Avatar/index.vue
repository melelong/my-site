<template>
  <img
    :src="url"
    :style="{ '--size': size }"
    class="avatar-container"
    alt="avatar"
  />
</template>
<script>
export default {
  name: "Avatar", // 组件名
  props: {
    url: {
      type: String, // url属性必须是一个字符串
      required: true, // 属性必传
    }, //属性约束
    size: {
      type: String,
      default: "150px", // 默认
    },
  },
};
</script>
<style scoped>
.avatar-container {
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>
