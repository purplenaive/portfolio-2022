<template>
  <transition>
  <div 
    v-if="active"
    class="component loading-spinner"
    :class="{'spinner--absolute': absolute}"
  >
    <div class="spinner">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        :width="size" 
        :height="size" 
        fill="none" 
        :viewBox="`0 0 ${size} ${size}`"
      >
        <circle 
          :cx="size / 2" 
          :cy="size / 2" 
          :r="(size - strokeWidth) / 2" 
          :stroke="color" 
          stroke-linejoin="round" 
          stroke-linecap="round"
          :stroke-width="strokeWidth"
        />
      </svg>
    </div>
  </div>
  </transition>
</template>

<script>
  export default {
    name: "loadingSpinner",
    props: {
      active: {
        type: Boolean,
        default: false,
      },
      size: {
        type: Number,
        default: 46,
      },
      strokeWidth: {
        type: Number,
        default: 6,
      },
      color: {
        type: String,
        default: "#315E7A",
      },
      absolute: {
        type: Boolean,
        default: false,
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  @keyframes loadingRotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loading-spinner {
    @include flex(false, column, nowrap, center, center);

    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 29;
    background-color: rgba(white, .5);

    &.spinner--absolute {
      position: absolute;
    }

    .spinner {
      
      svg {
        animation: loadingRotate 1s linear infinite;

        circle {
          stroke-dasharray: 500;
          stroke-dashoffset: -20;
        }
      }
    }
  }
</style>