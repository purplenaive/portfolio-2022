<template>
  <section class="component main-carousel">
    hi
  </section>
</template>

<script>
  export default {
    name: "mainCarousel",
  }
</script>

<style lang="scss" scoped>
  .main-carousel {
    @include section-1200(false);
    @include card(false);

    height: 240px;
    margin-bottom: 24px;
  }
</style>