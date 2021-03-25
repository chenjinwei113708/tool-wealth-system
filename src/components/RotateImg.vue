<template>
  <img 
    :src="src" 
    class="v_rotate_img" 
    :class="rotateType"
    :style="{
      width: px2rem(width),
      height: px2rem(height),
      animationDelay: delay,
    }"
  >
</template>

<script lang="ts">
import Vue from 'vue';

const designWidth = 1920;

export default Vue.extend({
  name: 'rotate-img',
  props: {
    src: {
      type: String,
      required: true
    },
    rotateType: {
      type: String,
      default: 'default',
      validator (value: string) {
        return ['default', 'reverse'].indexOf(value) !== -1;
      }
    },
    width: {
      type: [Number, String],
      required: true,
    },
    height: {
      type: [Number, String],
      required: true,
    },
    delay: {
      type: String,
      default: '0s'
    }
  },

  methods: {
    px2rem (val: any) {
      val = val as any - 0;
      if (val === 0) {
        return 0;
      }
      if (!val) {
        return 'auto';
      }
      return (val / (designWidth * 0.1)).toFixed(5) as any - 0 + 'rem';
    }
  },
});
</script>

<style lang="scss" scoped>
.v_rotate_img {
  vertical-align: middle;
  &.default {
    animation: rotate 10s linear infinite;
  }
  &.reverse {
    animation: rotate2 10s linear infinite;
  }
}
@keyframes rotate {
  0% {
    transform: translate(0, 0) rotateY(0deg) rotateZ(0deg);
  }
  50% {
    transform: translate(-10%, -2%) rotateY(90deg) rotateZ(180deg);
  }
  100% {
    transform: translate(0, 0%) rotateY(0deg) rotateZ(360deg);
  }
}

@keyframes rotate2 {
  0% {
    transform: translate(0, 0) rotateY(0deg) rotateZ(360deg);
  }
  50% {
    transform: translate(-10%, -2%) rotateY(90deg) rotateZ(180deg);
  }
  100% {
    transform: translate(0, 0%) rotateY(0deg) rotateZ(0deg);
  }
}
</style>
