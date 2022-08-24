<template>
  <main class="main page">
    <main-carousel></main-carousel>
    <resume-cards></resume-cards>
  </main>
</template>

<script>
import mainCarousel from "@/components/mainCarousel.vue";
import resumeCards from "@/components/resumeCards.vue";

  export default {
    name: "mainView",
    components: {
      mainCarousel, resumeCards,
    }
  }
</script>

<style lang="scss" scoped>
</style>