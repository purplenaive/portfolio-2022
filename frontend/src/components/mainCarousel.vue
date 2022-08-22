<template>
  <section class="component main-carousel">
    <div class="carousel__item">
      <img src="@/assets/image/main-carousel.jpg" alt="바다의 파도가 꽉 차있는" class="carousel-image">
    </div>
    <div class="carousel__typo">
      <img src="@/assets/image/purpleniave-typo-top.svg" alt="purple" class="typo-image typo__top">
      <img src="@/assets/image/purpleniave-typo-bottom.svg" alt="naive" class="typo-image typo__bottom">
    </div>
  </section>
</template>

<script>
  export default {
    name: "mainCarousel",
  }
</script>

<style lang="scss" scoped>
  .main-carousel {
    @include section-1200(false, false);

    height: 240px;
    margin-bottom: 24px;
    position: relative;


    .carousel__item {
      @include card(false);

      width: 100%;
      height: 100%;
      overflow: hidden;

      .carousel-image {
        display: block;
        width: 100%;
        height: auto;
      }
    }

    .carousel__typo {
      position: absolute;
      bottom: 0;
      left: 30px;

      .typo-image {
        display: block;
      }
      .typo__bottom {
        position: absolute;
        bottom: 0%;
        left: 0;
        transform: translate(0, 100%);
      }
    }
  }
</style>