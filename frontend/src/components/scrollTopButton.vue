<template>
  <transition>
  <button 
    v-show="scroll > 120"
    class="common-button button--active button--fab scroll-top-button"
    @click="scroll2Top"
  >
    <i class="icon arrow-right white"></i>
    <span class="sr-only">최상단으로 이동하기</span>
  </button>
  </transition>
</template> 

<script>
  export default {
    name: "scrollTop",
    data() {
      return {
        scroll: 0,
      }
    },
    mounted() {
      window.addEventListener("scroll", () => {
        this.scrollEvent();
      });
    },
    methods: {
      scrollEvent() {
        const value = window.scrollY;
    
        this.scroll = value;
      },
      scroll2Top() {
        window.scrollTo(0, 0);
      },
    }
  }
</script>

<style lang="scss" scoped>

  .scroll-top-button {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 15;

    .icon {
      transform: rotate(-90deg);
    }
  }
</style>