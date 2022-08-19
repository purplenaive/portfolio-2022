<template>
  <main-header></main-header>
  <main class="main">
    <main-carousel></main-carousel>
    <resume-cards></resume-cards>
    <project-cards></project-cards>
  </main>
</template>

<script>
import mainHeader from "@/components/mainHeader.vue";
import mainCarousel from "@/components/mainCarousel.vue";
import resumeCards from "@/components/resumeCards.vue";
import projectCards from "@/components/projectCards.vue";

export default {
  name: 'App',
  components: {
    mainHeader, mainCarousel, resumeCards, projectCards,
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
