<template>
  <transition>
    <div class="component main-dialog" v-if="active">
    <section class="dialog common-dialog">
      <h2 class="dialog__title">
        알려드립니다
      </h2>
      <p class="dialog__content">
        현재 포트폴리오 사이트 수정 중에 있습니다.<br>
        최대한 빠른 시일 내 완성할 수 있도록 하겠습니다.
      </p>
      <div class="dialog__actions">
        <button 
          class="action-button common-button button--active button--escape"
          @click="$emit('close')"
        >닫기</button>
      </div>
    </section>
  </div>
</transition>
</template>

<script>
  export default {
    name: "mainDialog",
    props: {
      active: {
        type: Boolean,
        default: true,
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .main-dialog {
    @include flex(false, row, nowrap, center, center);

    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 49;
    background-color: rgba($black, 0.6);
  }
</style>