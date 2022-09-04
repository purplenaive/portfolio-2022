<template>
  <main-header></main-header>
  <router-view></router-view>
  <main-footer></main-footer>
</template>

<script>
import mainHeader from "@/components/mainHeader.vue";
import mainFooter from "@/components/mainFooter.vue";

export default {
  name: 'App',
  components: {
    mainHeader, mainFooter,
  },
  data() {
    return {
    }
  },
}
</script>

<style lang="scss">
  html, body {
    padding: 0;
    margin: 0;
    min-height: 100vh;
  }
</style>
