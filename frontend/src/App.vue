<template>
  <main-header></main-header>
  <router-view></router-view>
  <main-footer></main-footer>
  <main-dialog :active="main_dialog" @close="main_dialog = false"></main-dialog>
</template>

<script>
import mainHeader from "@/components/mainHeader.vue";
import mainFooter from "@/components/mainFooter.vue";
import mainDialog from "@/components/mainDialog.vue";

export default {
  name: 'App',
  components: {
    mainHeader, mainFooter, mainDialog,
  },
  data() {
    return {
      main_dialog: true,
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
