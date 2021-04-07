<template>
  <main class="v_home">
    <VHeader/>
    <div class="header_holder" />

    <section class="banner">
      <div class="banner_content">
        <h2 class="title">智械纪年</h2>
        <p class="desc">当前画面不代表最终品质，敬请期待</p>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from './indexPage/components/header.vue';

export default Vue.extend({
  name: 'index',

  head () {
    return {
      meta: [
        // { name: 'keywords', content: '全球领先的互联网服务提供商,jodo,jodoinc' },
        // { hid: 'description', name: 'description', content: '广州卓动信息科技公司(Guangzhou JODO InfoTech Ltd.)是一家以运营起家，专注于海外市场，集研运一体，自研自发的游戏公司。公司规模150人，领导出身于阿里和网易，团队年轻有活力，为全球玩家提供优质游戏是我们的使命。' }
      ],
    };
  },

  components: {
    VHeader: Header,
  },

  data () {
    return {
    }
  },
});
</script>

<style lang="scss">
@import './indexPage/index.scss';
</style>
