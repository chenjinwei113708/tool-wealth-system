<template>
  <header class="v_home_header">
    <h1 class="logo h_title">
      <router-link class="h_link" to="/">
        <img src="../../../assets/images/home/logo.png" alt="logo" class="logo_img">
      </router-link>
      天之梦
    </h1>

    <nav class="h_nav">
      <a 
        class="nav_link"
        v-for="item in navList"
        :key="item.name"
        :href="`#${item.name}`"
      >
        <img :src="item.textImg" class="nav_link_img">
      </a>
    </nav>
  </header>
</template>

<script>
export default {
  data () {
    return {
      navList: [
        {
          textImg: require('../../../assets/images/home/dongtai01.png'),
          name: 'moment',
        },
        {
          textImg: require('../../../assets/images/home/youxi01.png'),
          name: 'game',
        },
        {
          textImg: require('../../../assets/images/home/guanyuwomen01.png'),
          name: 'about',
        },
        {
          textImg: require('../../../assets/images/home/lianxiwomen01.png'),
          name: 'contact',
        },
      ]
    }
  },
}
</script>

<style lang="scss">
.v_home_header {
  z-index: 11;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: px2rem(132px);
  padding: 0 px2rem(45px);
  // background-color: #000;
  background-color: #000;
  // background-color: transparent;

  .h_title {
    overflow: hidden;
    width: px2rem(212px);
    height: px2rem(120px);
    font-size: 16px;

    .h_link,
    .logo_img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .h_nav {
    font-size: 0;
  }
  .nav_link {
    display: inline-block;
    vertical-align: top;
    height: px2rem(90px);
    padding: px2rem(10px) px2rem(15px);
    margin: 0 px2rem(10px);
    text-align: center;

    .nav_link_img {
      height: 100%;
      width: auto;
      vertical-align: middle;
    }
  }
}
</style>
