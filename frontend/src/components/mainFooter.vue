<template>
  <footer class="component main-footer">
    <div class="footer__inner">
      <p class="footer__title">
        <i class="icon purplenaive-line white" aria-hidden="true"></i>
        <span class="title__text">이은희 | 포트폴리오</span>
      </p>

      <div class="footer__contact-here">
        <ul class="footer-contact-list">
          <li 
            v-for="contact in contact_links"
            :key="contact.name"
            class="contact__item"
          >
            <a :href="contact.path" class="contact__router" target="_blank" :title="contact.title">
              <i class="icon white" :class="contact.icon" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: "mainFooter",
    data() {
      return {
        contact_links: [
          { title: "전화 걸기", name: "call", icon: "call", path: "tel:01084353663" },
          { title: "이메일 보내기", name: "email", icon: "mail", path: "mailto:purplenaive@gmail.com" },
          { title: "블로그 방문하기", name: "blog", icon: "note", path: "https://purplenaive.notion.site/d1619275de714a158cc8d90bef99ddb4?v=d7be502b8a17444a8b8f7c45f627715e" },
          { title: "이력서 보러가기", name: "resume", icon: "paper", path: "https://purplenaive.notion.site/833eb81908cc490ea33a5596d5c0de42" },
        ],
      };
    },
  }
</script>

<style lang="scss" scoped>
  .main-footer {
    width: 100%;
    height: 150px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-color: $pale-blue;

    .footer__inner {
      @include section-1200(false);
      @include flex(false, row, nowrap, space-between, center);

      height: 100%;
    }

    .footer__title {
      @include flex(false, row, nowrap, flex-start, center);

      gap: 6px;
      color: white;
      font-size: 18px;
    }

    .footer-contact-list {
      @include flex(false, row, nowrap, flex-end, center);

      gap: 6px;

      .contact__item {
        padding: 6px;
      }
    }
  }
</style>