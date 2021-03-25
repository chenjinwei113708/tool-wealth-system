<template>
  <section class="service-banner" :style="style">
    <video class="service-banner_video" :src="videoSrc" v-if="videoSrc" width="100%" preload="true" autoplay muted loop></video>
    <h2 class="service-banner_hd watch__animation">
      <slot/>
    </h2>
    <p class="service-banner_desc watch__animation">
      <slot name="desc" />
    </p>

    <span class="service-banner_icon"></span>

    <div class="service-banner__mask" v-if="showMask"></div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

const designWidth = 1920;
const mDesignWidth = 750;

let resizeEvt = 'resize';
if (process.client) {
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
}

export default Vue.extend({
  name: 'service-banner',
  props: {
    backgroundColor: {
      type: String,
      default: '#00517f'
    },
    backgroundImage: {
      type: String,
    },
    height: {
      type: [Number, String],
      default: 820
    },
    mobileHeight: {
      type: [Number, String],
      default: 442
    },
    animation: {
      type: Boolean,
      default: false,
    },
    video: String,
    mobileVideo: String,
    showMask: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isMobile: false,
    }
  },

  watch: {
    animation () {
      this.setAnimation();
    }
  },

  computed: {
    style () {
      const h = this.isMobile ? this.mobileHeight : this.height;
      const styleObj: any = {
        height: this.px2rem(h),
        backgroundColor: this.backgroundColor,
      };
      if (this.backgroundImage) {
        styleObj.backgroundImage = `url('${this.backgroundImage}')`;
      }

      return styleObj;
    },

    videoSrc (): string {
      return this.isMobile ? this.mobileVideo : this.video;
    }
  },

  mounted () {
    this.setAnimation();
    this.onResize();
    window.addEventListener(resizeEvt, this.onResize);
  },

  beforeDestroy() {
    window.removeEventListener(resizeEvt, this.onResize);
  },

  methods: {
    px2rem (val: any) {
      val = (val + '').replace('px', '');
      val = val as any - 0;
      if (val === 0) {
        return 0;
      }
      if (!val) {
        return 'auto';
      }
      const dw = this.isMobile ? mDesignWidth : designWidth;
      return (val / (dw * 0.1)).toFixed(5) as any - 0 + 'rem';
    },

    setAnimation () {
      const els = [...document.querySelectorAll('.watch__animation')];
      const methodName = this.animation ? 'setAttribute' : 'removeAttribute'
      els.forEach(el => {
        el[methodName]('need-animation', '');
      });
    },

    onResize () {
      const clientWidth = document.documentElement.clientWidth;
      if (!clientWidth) {
        return;
      }

      this.isMobile = clientWidth <= mDesignWidth;
    },
  },
});
</script>

<style lang="scss" scoped>
.service-banner {
  z-index: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  color: #fff;

  .service-banner_video {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: block;
  }

  .service-banner_hd {
    line-height: 1;
    font-size: px2rem(66px);
    font-weight: bold;
    text-transform: capitalize;
    z-index: 2;
  }
  .service-banner_desc {
    z-index: 2;
    line-height: 1.7;
    width: 90%;
    margin: px2rem(42px) auto 0;
    font-size: px2rem(32px);
  }

  .service-banner_icon {
    z-index: 2;
    position: absolute;
    bottom: px2rem(49px);
    // left: 50%;
    left: 0;
    right: 0;
    display: block;
    @include setWH(25px, 39px);
    margin: 0 auto;
    background: url('/images/service/banner-icon.png') center/contain no-repeat;
    // transform: translateX(-50%);
    animation: beat 0.5s infinite alternate;
  }

  .service-banner__mask {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(1, 1, 12, 0.3);
  }
}

@media only screen and (max-width: 750px) {
  .service-banner {
    $design-width: 750px;
    @import '@/assets/scss/mixin.scss';

    .service-banner_hd {
      font-size: px2rem(46px);
    }
    .service-banner_desc {
      margin-top: px2rem(25px);
      padding: 0 px2rem(50px);
      font-size: px2rem(24px);
    }

    .service-banner_icon {
      display: none;
    }
  }
}

@keyframes beat {
  0% {
    transform: translateY(-1px);
  }
  100% {
    transform: translateY(5px);
  }
}
</style>
