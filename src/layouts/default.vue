<template>
  <div class="v_layout">
    <v-header />
    <div class="header_placeholder"/>
    <!-- <div class="v_header">
      <nuxt-link :to="localePath('/')" tag="a">首页</nuxt-link>
      <nuxt-link :to="localePath('/about')" tag="a">关于</nuxt-link>
    </div> -->
    <nuxt class="v_main" />
    <client-only>
      <vue-to-top class="jodo_top" title="返回顶部" type="4" />
    </client-only>
    <v-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VHeader from '@/components/Header.vue';
import VFooter from '@/components/Footer.vue';

export default Vue.extend({
  name: 'layout',
  components: {
    VHeader,
    VFooter,
  },

  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale || 'en'
      }
    }
  }
});
</script>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
}
html, body, #__nuxt, #__layout, .v_layout {
  height: 100%;
}

.v_layout {
  // display: flex;
  // flex-direction: column;

  .v_header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .header_placeholder {
    height: px2rem(73px);
  }
  .v_main {
    z-index: 1;
    // padding-top: px2rem(73px);
    // flex: 1;

    &.__nuxt-error-page {
      z-index: 2;
    }
  }
  .v_footer {
    z-index: 0;
  }

  .jodo_top {
    font-size: 0;
    z-index: 1;
    opacity: .8;
    transition: opacity .3s;

    &:hover {
      opacity: 1;
    }
  }
}

.__nuxt-error-page {
  font-size: 16px;

  .title {
    font-size: 24px;
  }
}

.page-enter-active, .page-leave-active {
  transition: opacity .25s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}

@media only screen and (max-width: 750px) {
  .v_layout {
    $design-width: 750px;
    @import '@/assets/scss/mixin.scss';

    .header_placeholder {
      height: px2rem(90px);
    }
  }
}

::-webkit-scrollbar-thumb {
  background: #097dea;
  // background: #a1a3a9;
  border-radius: 6px;
  -webkit-border-radius: 6px;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
</style>
