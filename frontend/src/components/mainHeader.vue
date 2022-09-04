<template>
  <header class="component main-header">
    <div class="header__inner">
      <nav class="header-nav">
        <router-link
          v-for="nav in nav.data"
          :key="nav.name"
          :to="{name: nav.path}" 
          class="nav__item"
          :class="'nav-' + nav.name"
        >
          <i class="icon deep-blue" :class="nav.icon" aria-hidden="true"></i>
          <h2 class="nav__text">{{nav.title}}</h2>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
  export default {
    name: "mainHeader",
    data() {
      return {
        nav: {
          active: "",
          data: [
            { name: "self-introduce", title: "자기소개", icon: "profile", path: "home"},
            { name: "project", title: "프로젝트", icon: "code", path: "project"},
            { name: "note", title: "공책", icon: "note", path: "note"},
          ]
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .main-header {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid $deep-blue;
    position: fixed;
    left: 0%;
    top: 0;
    z-index: 19;
    backdrop-filter: blur(6px);
    background-color: rgba($pale, 0.6);

    .header__inner {
      @include flex(false, row, nowrap, flex-end, center);
      @include section-1200(false);

      height: 100%;

      @include responsive-mobile {
        justify-content: center;
      }
    }
  }

  .header-nav {
    @include flex(true, row, nowrap, flex-end, center);

    height: 100%;
    transform: translate(12px, 0);

    @include responsive-mobile {
      justify-content: center;
      transform: unset;
    }

    .nav__item {
      @include flex(true, row, nowrap, flex-end, center);

      gap: 4px;
      height: 100%;
      text-decoration: none;
      color: $deep-blue;
      padding: 12px;
      transition: all 0.3s;
      cursor: pointer;

      @include responsive-mobile {
        padding: 12px 8px;
      }

      .nav__text {
        font-size: 16px;
        font-weight: $font-md;

        @include responsive-mobile {
          font-size: 15px;
        }
      }

      .icon {

        @include responsive-mobile {
          @include icon-custom(20);
        }
      }
    }
  }
</style>