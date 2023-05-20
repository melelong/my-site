<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="scss" scoped>
#app {
  user-select: none;
}
@media screen and (min-width: 320px) {
  html {
    font-size: 14px;
  }
}

@media screen and (min-width: 768px) {
  html {
    font-size: 16px;
  }
}

@media screen and (min-width: 1280px) {
  html {
    font-size: 18px;
  }
}
</style>
