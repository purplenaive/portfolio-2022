<template>
  <section class="component contact-cards">
    <article class="contact-here">
      <h3 class="contact__title">
        <img src="@/assets/image/contact-typo.svg" alt="감사합니다" class="title-typo" aria-hidden="true">
        <span class="title__text">연락을 기다리고 있습니다</span>
      </h3>
      <ul class="contact-info-list">
        <li class="contact__item">
          <i class="icon mail" aria-hidden="true"></i>
          <a href="mailto:purplenaive@gmail.com" class="contact__text">purplenaive@gmail.com</a>
        </li>
        <li class="contact__item">
          <i class="icon call" aria-hidden="true"></i>
          <a href="tel:01084353663" class="contact__text">010 8304 3663</a>
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
  export default {
    name: "contactCard",
  }
</script>

<style lang="scss" scoped>

  .contact-cards {
    @include flex(false, row, nowrap, center, center);

    width: 100%;
    height: 70vh;
  }

  .contact-here {
    @include flex(false, column, nowrap, center, center);
    @include section-1200;

    .contact__title {
      @include flex(false, column, nowrap, flex-start, center);

      gap: 64px;
      
      .title__text {
        font-size: 18px;
        font-weight: $font-md;
      }
    }

    .contact-info-list {
      margin-top: 16px;

      .contact__item {
        @include flex(false, row, nowrap, center, center);

        gap: 6px;
        font-size: 18px;
        line-height: 1.6;
      }
    }
  }

</style>