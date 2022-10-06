<template>
  <main-header></main-header>
  <router-view></router-view>
  <scroll-top></scroll-top>
  <main-footer></main-footer>
</template>

<script>
import mainHeader from "@/components/mainHeader.vue";
import mainFooter from "@/components/mainFooter.vue";
import scrollTop from "@/components/scrollTopButton.vue";

export default {
  name: 'App',
  components: {
    mainHeader, mainFooter, scrollTop
  },
  data() {
    return {
    }
  },
}
</script>

<style lang="scss">
  @import "~@/assets/css/common";

  html, body {
    padding: 0;
    margin: 0;
    min-height: 100vh;
  }
</style>
