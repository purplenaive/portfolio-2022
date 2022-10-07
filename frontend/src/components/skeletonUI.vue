<template>
  <transition>

  <div 
    class="skeleton-ui"
    :style="{
      gap: gap + 'px',
    }"
  >
    <template v-if="type === 'intro'">
      <!-- ========== intro  ========== -->
      <div 
        class="ui__item skeleton--type-intro"
        :style="{
          gap: gap + 'px',
        }"
      >
        <p class="skeleton__item skeleton--blue intro__title"></p>
        <div class="intro__content">
          <p class="skeleton__item skeleton--blue skeleton__line content__line-1"></p>
          <p class="skeleton__item skeleton--blue skeleton__line content__line-2"></p>
        </div>
        <div class="intro__actions">
          <span class="skeleton__item skeleton--blue action__item action--fab"></span>
          <span class="skeleton__item skeleton--blue action__item"></span>
          <span class="skeleton__item skeleton--blue action__item"></span>
        </div>
      </div>
    </template>
    <template v-else-if="type === 'grid'">
      <!-- ========== grid  ========== -->
      <div 
        class="ui__item skeleton--type-grid"
        :class="responsive"
        :style="{
          gridTemplateColumns: `repeat(${this.column}, 1fr)`,
          gap: gap + 'px',
        }"
      >
      <p
        v-for="number in (column * row)" 
        :key="number"
        class="skeleton__item"
        :style="{
          height: height + 'px',
        }"
        ></p>
      </div>
    </template>
  </div>

  </transition>
</template>

<script>
  export default {
    name: "skeletonUI",
    props: {
      type: {
        type: String,
        default: "grid"
      },
      height: {
        type: Number,
        default: 140,
      },
      column: {
        type: Number,
        default: 5,
      },
      row: {
        type: Number,
        default: 2,
      },
      gap: {
        type: Number,
        default: 16,
      },
      responsive: {
        type: String,
        default: "",
      }
    },
    methods: {
    },
  }
</script>

<style lang="scss" scoped>
  // ========== default ========== //
  .skeleton-ui {
    @include flex(false, column, nowrap, flex-start, flex-start);
    
    width: 100%;

    .ui__item {
      width: 100%;
    }

    .skeleton__item {
      @keyframes ghostMoving {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(1200px);
        }
      }
      @include card(false, true);
      
      position: relative;
      background-color: rgba(white, .7);

      &::before {
        content: "";
        display: block;
        width: 60px;
        height: 100%;
        animation: ghostMoving 1.4s infinite linear forwards;
        position: absolute;
        left: -60px;
        background: linear-gradient(to right, transparent, white, transparent);
      }

      &.skeleton--blue {
        background-color: rgba($deep-blue, 0.08);
      }
    }
    .skeleton__line {
      height: 24px;
    }
  }

  // ========== grid ========== //
  .skeleton--type-grid {
    display: grid;

    // ===== grid responsive project ===== //
    &.skeleton--responsive-project {

      @include responsive-custom(1024) {
        grid-template-columns: repeat(4, 1fr) !important;
      }
      @include responsive-tablet {
        grid-template-columns: repeat(2, 1fr) !important;
      }
      @include responsive-custom(540) {
        grid-template-columns: 1fr !important;

        .skeleton__item {
  
          &:nth-child(n + 6) { display: none; }
        }
      }

    }

    // ===== grid responsive note ===== //
    &.skeleton--responsive-note {

      @include responsive-1280 {
        grid-template-columns: repeat(5, 1fr) !important;
      }
      @include responsive-custom(1024) {
        grid-template-columns: repeat(3, 1fr) !important;
      }
      @include responsive-custom(640) {
        grid-template-columns: repeat(2, 1fr) !important;

        .skeleton__item {

          &:nth-child(n + 5) { display: none; }
        }
      }
      @include responsive-custom(480) {
        grid-template-columns: 1fr !important;
      }
    }
  }
  // ========== intro ========== //
  .skeleton--type-intro {
    @include flex(false, column, nowrap, flex-start, flex-start);
    @include card(true, true);

    height: 240px;
    padding: 32px;
    background-color: rgba(white, .7);

    @include responsive-tablet {
      height: 280px;
    }
    @include responsive-custom(420) {
      height: 340px;
    }

    .intro__title {
      width: 350px;
      height: 52px;

      @include responsive-tablet {
        width: 45%;
        min-width: 190px;
      }
    }
    .intro__content {
      @include flex(false, column, nowrap, flex-start, flex-start);

      width: 100%;
      gap: 12px;

      .content__line-1 { 
        width: 220px; 

        @include responsive-tablet {
          width: 55%;
        }
      }
      .content__line-2 { 
        width: 245px; 

        @include responsive-tablet {
          width: 62%;
        }
      }
    }
    .intro__actions {
      @include flex(false, row, wrap, flex-end, center);

      align-self: flex-end;
      gap: 12px;
      width: 100%;
      margin-top: auto;

      @include responsive-custom(420) {
        justify-content: flex-start;
      }

      .action__item {
        width: 110px;
        height: 45px;
        border-radius: 25px;
        
        &.action--fab {
          width: 45px;
        }
        &:last-child {

          @include responsive-custom(420) {
            min-width: 200px;
          }
        }
      }
    }
  }
</style>