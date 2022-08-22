<template>
  <main-header></main-header>
  <router-view></router-view>
</template>

<script>
import mainHeader from "@/components/mainHeader.vue";

export default {
  name: 'App',
  components: {
    mainHeader,
  }
}
</script>

<style lang="scss">
  html, body {
    padding: 0;
    margin: 0;
    min-height: 100vh;
  }
</style>
