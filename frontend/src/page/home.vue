<template>
  <main class="main">
    <main-carousel></main-carousel>
    <resume-cards></resume-cards>
    <project-cards></project-cards>
    <note-cards></note-cards>
    <contact-card></contact-card>
  </main>
</template>

<script>
import mainCarousel from "@/components/mainCarousel.vue";
import resumeCards from "@/components/resumeCards.vue";
import projectCards from "@/components/projectCards.vue";
import noteCards from "@/components/noteCards.vue";
import contactCard from "@/components/contactCard.vue";

  export default {
    name: "mainView",
    components: {
      mainCarousel, resumeCards, projectCards, noteCards, contactCard
    }
  }
</script>

<style lang="scss" scoped></style>