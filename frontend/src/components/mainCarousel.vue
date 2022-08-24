<template>
  <section class="component main-carousel">
    <div class="carousel__item">
      <img src="@/assets/image/main-carousel.jpg" alt="바다의 파도가 꽉 차있는" class="carousel-image">
    </div>
    <div class="carousel__typo">
      <div class="typo-portfolio">
        <img src="@/assets/image/purpleniave-typo-top.svg" alt="port" class="typo-image typo__top">
        <img src="@/assets/image/purpleniave-typo-bottom.svg" alt="folio" class="typo-image typo__bottom">
      </div>
      <img src="@/assets/image/portfolio-typo.svg" alt="은희의 포트폴리오" class="typo-image typo-korean-portfolio">
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

    // ********** CAROUSEL ********** //
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

    // ********** TYPO CARD ********** //
    .carousel__typo {
      position: absolute;
      bottom: 0;
      left: 20px;

      .typo-portfolio {
        position: relative;
      }
      .typo-image {
        display: block;
        transform: scale(0.85);
        transform-origin: left bottom;
      }
      .typo__bottom {
        position: absolute;
        bottom: 0%;
        left: 0;
        transform: scale(0.85) translate(0, 100%);
      }

      .typo-korean-portfolio {
        position: absolute;
        bottom: -190px;
        transform: unset;
      }
    }
  }
</style>