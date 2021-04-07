<template>
  <header class="v_home_header">
    <h1 class="logo h_title">
      <img src="../../../assets/images/home/logo.png" alt="logo" class="logo_img">
      天之梦
    </h1>

    <nav class="h_nav">
      <a 
        class="nav_link"
        v-for="item in navList"
        :key="item.name"
        :href="`#${item.name}`" 
        @click.prevent
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
          name: 'dongtai',
        },
        {
          textImg: require('../../../assets/images/home/youxi01.png'),
          name: 'youxi',
        },
        {
          textImg: require('../../../assets/images/home/guanyuwomen01.png'),
          name: 'guanyuwomen',
        },
        {
          textImg: require('../../../assets/images/home/lianxiwomen01.png'),
          name: 'lianxiwomen',
        },
      ]
    }
  },
}
</script>

<style lang="scss">
.v_home_header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: px2rem(132px);
  padding: 0 px2rem(45px);
  background-color: #000;

  .h_title {
    overflow: hidden;
    width: px2rem(212px);
    height: px2rem(120px);
    font-size: 16px;

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
    height: px2rem(42px);
    padding: px2rem(20px) px2rem(25px);
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
