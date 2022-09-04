<template>
  <section class="component main-carousel">
    <div class="carousel__item">
      <span class="sr-only">바다의 파도가 꽉 차 있는</span>
    </div>
    <div class="carousel__typo">
      <div class="typo-portfolio">
        <img src="@/assets/images/purpleniave-typo-top.svg" alt="port" class="typo-image typo__top">
        <img src="@/assets/images/purpleniave-typo-bottom.svg" alt="folio" class="typo-image typo__bottom">
        <img src="@/assets/images/purpleniave-typo-mobile.svg" alt="portfolio" class="typo-image typo__mobile">
      </div>
      <img src="@/assets/images/portfolio-typo.svg" alt="은희의 포트폴리오" class="typo-image typo-korean-portfolio">
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

    @include responsive-tablet {
      height: 200px;
    }

    // ********** CAROUSEL ********** //
    .carousel__item {
      @include card(false);

      width: 100%;
      height: 100%;
      overflow: hidden;
      background: url(@/assets/images/main-carousel.jpg) no-repeat center center;
      background-size: cover;
    }

    // ********** TYPO CARD ********** //
    .carousel__typo {
      position: absolute;
      bottom: 0;
      left: 20px;

      @include responsive-1280 {
        bottom: 50%;
        transform: translate(0, 50%);
      }

      .typo-portfolio {
        position: relative;
      }
      .typo-image {
        display: block;
        width: 340px;
        height: auto;
        transform-origin: left bottom;

        @include responsive-1280 {
          display: none;
          width: 220px;
        }
      }
      .typo__bottom {
        position: absolute;
        bottom: 0%;
        left: 0;
        transform: translate(0, 100%);
      }
      .typo__mobile {
        display: none;

        @include responsive-1280 {
          display: block;
        }
      }

      .typo-korean-portfolio {
        width: 200px;
        position: absolute;
        bottom: -190px;
        transform: unset;
        
        @include responsive-1280 {
          display: block;
          width: 16vw;
          bottom: -192px;
          margin-left: -20px;
          transform: rotate(90deg) translate(0, -100%);
          transform-origin: left top;
        };
        @include responsive-custom(950) {
          display: none;
        }
      }
    }
  }
</style>