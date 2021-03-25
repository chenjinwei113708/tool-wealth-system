<template>
  <transition name="fade">
    <div class="v_dialog" v-if="visible" @click="onClose">
      <div class="dialog_inner" @click.stop>
        <div class="close_wrap" v-if="!hideClose">
          <img src="/images/header/close.png" @click="onClose" class="v_dialog_close">
        </div>
        <div class="dialog_body">
          <slot/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'v-dialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    hideClose: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    visible (isShow) {
      if (isShow) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keyup', this.onActiEsc);
      } else {
        document.body.style.overflow = 'auto';
        document.removeEventListener('keyup', this.onActiEsc);
      }
    }
  },
  methods: {
    onActiEsc (e) {
      if (e.keyCode === 27) {
        this.onClose();
      }
    },
    onClose () {
      this.$emit('close');
    }
  },
}
</script>

<style lang="scss" scoped>
.v_dialog {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: .4);
  display: flex;
  align-items: center;
  justify-content: center;

  .dialog_inner {
    // position: absolute;
    // top: 0;
    // bottom: 0;
    // left: 0;
    // right: 0;
    // margin: auto;
    // margin: px2rem(150px) auto auto;
    position: relative;
    max-width: px2rem(1100px);
    max-height: 64%;
    padding: 3% 5% 2%;
    background-color: #fff;
    overflow: auto;
    border-radius: px2rem(6px);
  }
  .close_wrap {
    font-size: 0;
    &::before {
      content: '';
      display: inline-block;
      width: 100%;
      height: 0;
    }
  }
  .v_dialog_close {
    position: fixed;
    // top: px2rem(30px);
    // right: px2rem(30px);
    margin-top: - px2rem(15px);
    margin-left: px2rem(25px);
    @include setWH(20px, 20px);
    cursor: pointer;
  }
  .dialog_body {
    padding-bottom: 3%;
  }
  .dialog_hd {
    line-height: 1;
    margin-bottom: px2rem(10px);
    font-size: px2rem(26px);
    font-weight: bold;
    text-align: center;
    color: #097dea;
  }
  .d_line {
    height: 1px;
    width: px2rem(50px);
    margin: 0 auto px2rem(50px);
    background-color: #097dea;
  }
}

@media only screen and (max-width: 750px) {
  .v_dialog {
    $design-width: 750px;
    @import '@/assets/scss/mixin.scss';

    .dialog_inner {
      max-width: 80%;
      max-height: 80vh;
      border-radius: px2rem(6px);
    }
    .v_dialog_close {
      // top: px2rem(25px);
      // right: px2rem(25px);
      margin-top: px2rem(5px);
      margin-left: - px2rem(10px);
      @include setWH(20px, 20px);
    }

    .dialog_hd {
      margin-bottom: px2rem(10px);
      font-size: px2rem(26px);
    }
    .d_line {
      width: px2rem(50px);
      margin: 0 auto px2rem(50px);
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .6s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
