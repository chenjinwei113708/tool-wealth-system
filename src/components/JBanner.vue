<template>
  <section class="j_banner">
    <h2 class="j_hd">
      <slot />
    </h2>
    <p class="j_banner_p">
      <slot name="info" />
    </p>
  </section>
</template>

<script>
export default {
  name: 'j-banner'
}
</script>

<style lang="scss">
.j_banner {
  height: px2rem(430px);
  background: url('/images/banner.png') center/cover no-repeat;
  text-align: center;
  line-height: 1.05;

  .j_hd {
    padding-top: px2rem(164px);
    margin-bottom: px2rem(20px);
    font-size: px2rem(54px);
    font-weight: bold;
    color: #000;
    text-transform: capitalize;
  }
  .j_banner_p {
    font-size: px2rem(24px);
    color: #12181a;
  }
}

@media only screen and (max-width: 750px) {
  .j_banner {
    $design-width: 750px;
    @import '@/assets/scss/mixin.scss';

    height: px2rem(182px);
    background-image: url('/images/banner-m.png');

    .j_hd {
      padding-top: px2rem(50px);
      margin-bottom: px2rem(10px);
      font-size: px2rem(42px);
    }
    .j_banner_p {
      font-size: px2rem(20px);
    }
  }
}
</style>
