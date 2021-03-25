<template>
  <main class="home">
    <section class="home_banner" need-animation>
      <!-- <video id="vid" width="100%" preload="true" autoplay muted loop class="banner_video pc">
        <source type="video/mp4" src="//dodo.jodocdn.com/video/jodo.mp4">
        <source type="video/webm" src="//dodo.jodocdn.com/video/jodo.webm">
      </video> -->
      <!-- <video width="100%" preload="true" autoplay muted loop class="banner_video mobile">
        <source type="video/mp4" src="//dodo.jodocdn.com/video/jodo-m.mp4">
        <source type="video/webm" src="//dodo.jodocdn.com/video/jodo-m.webm">
      </video> -->
      <div class="tmp_top_banner"></div>
      <img src="/images/home/mobile/banner.jpg" class="banner_img mobile">

      <div class="content_wrap">
        <article class="home_banner_info">
          <div class="home_banner_info_wrap">
            <h2 class="home_hd">
              title
            </h2>
            <ul class="info_ul">
              <li class="info_li">content</li>
              <li class="info_li_split">|</li>
              <li class="info_li">content</li>
            </ul>
            <img src="../assets/images/home/xialla.png" class="info_img">
          </div>
        </article>
      </div>
    </section>

    <section class="home_slogan" need-animation>
      <h3 class="home_block_hd">
        title
      </h3>
      <p class="home_block_p">
        content
      </p>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import VButton from '@/components/Button.vue';
// import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { BounceInUp } from '@/util/animation';
// import 'swiper/css/swiper.css';
import { getNewsList } from '../util/api';

interface IData {
  newsList: any[];
  [key: string]: any;
}

declare const Swiper: any;

const companyCatId = 31;

// let isIE = true;
let mySwiper: any = null;

// if (process.client) {
//   { src: "@/plugins/vue-swiper", ssr: false }
//   isIE = !!(window as any).ActiveXObject || 'ActiveXObject' in window;
//   isIE = false;
//   if (!isIE) {
//     require('@/plugins/vue-swiper');
//   }
// }

export default Vue.extend({
  name: 'index',
  components: {
    VButton,
    // Swiper,
    // SwiperSlide
  },

  head () {
    return {
      meta: [
        { name: 'keywords', content: '全球领先的互联网服务提供商,jodo,jodoinc' },
        { hid: 'description', name: 'description', content: '广州卓动信息科技公司(Guangzhou JODO InfoTech Ltd.)是一家以运营起家，专注于海外市场，集研运一体，自研自发的游戏公司。公司规模150人，领导出身于阿里和网易，团队年轻有活力，为全球玩家提供优质游戏是我们的使命。' }
      ],
      script: [
        { src: '/lib/swiper-4.5.3.min.js' }
      ],
      link: [
        { href: '/lib/swiper-4.5.3.min.css',  rel: 'stylesheet' }
      ]
    };
  },

  data () {
    return {
      // isIE,
      swiperOption: {
        slidesPerView: 'auto',
        // preventClicks: false,
        loop : true,
        autoplay: true,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: '-45%',
          depth: 300,
          modifier: 1,
          slideShadows : true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      serviceList: [
        {
          title: 'index.service.contents.bigData.title',
          content: 'index.service.contents.bigData.content'
        },
        {
          title: 'index.service.contents.software.title',
          content: 'index.service.contents.software.content'
        },
        {
          title: 'index.service.contents.enterprise.title',
          content: 'index.service.contents.enterprise.content'
        },
        {
          title: 'index.service.contents.game.title',
          content: 'index.service.contents.game.content'
        }
      ],
      advantageList: [
        {
          title: 'index.advantage.contents.item1.title',
          content: [
            'index.advantage.contents.item1.content1',
            'index.advantage.contents.item1.content2'
          ]
        },
        {
          title: 'index.advantage.contents.item2.title',
          content: [
            'index.advantage.contents.item2.content1',
            'index.advantage.contents.item2.content2'
          ]
        },
        {
          title: 'index.advantage.contents.item3.title',
          content: [
            'index.advantage.contents.item3.content1',
            'index.advantage.contents.item3.content2'
          ]
        },
        {
          title: 'index.advantage.contents.item4.title',
          content: [
            'index.advantage.contents.item4.content1',
            'index.advantage.contents.item4.content2'
          ]
        },
        {
          title: 'index.advantage.contents.item5.title',
          content: [
            'index.advantage.contents.item5.content1',
            'index.advantage.contents.item5.content2'
          ]
        }
      ],
      newsList: <any[]>[],
    }
  },

  asyncData () {
    return getNewsList({ catid: companyCatId, order_prior: true, })
      .then((newsList: any[]) => ({
        newsList
      }));
  },

  mounted () {
    setTimeout(this.initSwiper, 800);
    BounceInUp.init();

    if (!this.newsList.length) {
      this.getNewsList();
    }

    // this.isIE = !!(window as any).ActiveXObject || 'ActiveXObject' in window;
  },

  beforeDestroy () {
    this.destroySwiper();
    BounceInUp.destroy();
  },

  methods: {
    initSwiper () {
      if (typeof Swiper === 'undefined') {
        return;
      }
      mySwiper = new Swiper('.moment_swiper-container', this.swiperOption);
    },
    destroySwiper () {
      try {
        mySwiper && mySwiper.destroy();
      } catch (e) {}
      mySwiper = null;
    },

    getNewsList () {
      getNewsList({ catid: companyCatId, order_prior: true, })
        .then((newsList: any[]) => {
          this.newsList = newsList;
        });
    }
  },
})
</script>

<style lang="scss">
@import '@/assets/scss/animation.scss';

.home {
  .home_block_hd {
    line-height: 1;
    font-weight: bold;
    font-size: px2rem(46px);
    color: #111b28;
    text-align: center;
    text-transform: capitalize;
  }
  .home_block_p {
    line-height: 1.5;
    font-size: px2rem(26px);
    color: #404040;
    text-align: center;
  }

  .home_banner {
    // height: px2rem(958px);
    overflow: hidden;
    position: relative;
    background-color: #091017;
    text-transform: capitalize;

    .tmp_top_banner{
      width: 10rem;
      height: 4.2rem;
      background: #d5d5d5;
    }

    .content_wrap {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
    }
  }
  .banner_video, .banner_img {
    display: block;
    z-index: 0;

    &.mobile {
      display: none;
    }
  }

  .home_banner_info, .home_banner_info_wrap {
    animation-duration: .8s;
    animation-delay: 3.2s;
    animation-fill-mode: forwards;
  }
  .home_banner_info {
    line-height: 1;
    text-align: center;
    color: #fff;
    animation-name: cd-mask-wrapper;
    overflow: hidden;
    transform: translateX(50%);

    &::before {
      content: '';
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      height: 100%;
      width: 2px;
      background-color: #fff;
      animation: cd-pulse 3s 1.8s both;
    }

    .home_banner_info_wrap {
      z-index: 1;
      padding: px2rem(30px) 0;
      animation-name: cd-mask-content;
      transform: translateX(-100%);
    }

    .home_hd {
      margin-bottom: px2rem(42px);
      font-size: px2rem(66px);
      font-weight: bold;
    }

    .info_ul {
      margin-bottom: px2rem(44px);
      font-size: 0;

      .info_li, .info_li_split {
        display: inline-block;
        vertical-align: top;
        font-size: px2rem(32px);
      }
      .info_li_split {
        margin: 0 px2rem(6px);
      }
    }
    .info_img {
      @include setWH(55px, 55px);
      display: block;
      margin: 0 auto;
      animation: beat 0.5s infinite alternate;
    }
  }

  .home_slogan {
    position: relative;
    height: px2rem(800px);
    background-color: #f7f7f7;
    background-image: url('/images/home/ditu.png');
    background-repeat: no-repeat;
    background-size: px2rem(730px) px2rem(367px);
    background-position: bottom center;
    text-align: center;

    .home_block_hd {
      padding: px2rem(112px) 0 px2rem(30px);
    }
    .home_block_p {
      & + .home_block_p {
        margin-top: px2ren(18px);
      }
    }
    .slogan_btn_wrap {
      font-size: 0;
      margin-top: px2rem(45px);
    }

    .slogan_dots {
      position: absolute;
      bottom: px2rem(19px);
      left: 0;
      right: 0;
      margin: 0 auto;
      @include setWH(719px, 303px);
      .dot1 {
        top: px2rem(168px);
        left: px2rem(353px);
      }
      .dot2 {
        top: px2rem(10px);
        left: px2rem(115px);
      }
      .dot3 {
        top: px2rem(134px);
        left: px2rem(80px);
      }
      .dot4 {
        top: px2rem(175px);
        left: - px2rem(20px);
      }
      .dot5 {
        top: px2rem(240px);
        left: px2rem(30px);
      }
      .dot6 {
        top: px2rem(2px);
        right: px2rem(190px);
      }
      .dot7 {
        top: px2rem(115px);
        right: px2rem(78px);
      }
      .dot8 {
        top: px2rem(146px);
        right: - px2rem(2px);
      }
      .dot9 {
        top: px2rem(220px);
        right: px2rem(64px);
      }
    }
    .dot {
      position: absolute;
      display: inline-block;
      .dot_cirle {
        position: relative;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        @include setWH(35px, 35px);
        border-radius: 50%;
        background-color: rgba($color: #005fd5, $alpha: .45);
        animation: breath 2s infinite alternate;

        &::before, &::after {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          content: '';
          display: block;
          border-radius: 50%;
        }
        &::before {
          @include setWH(27px, 27px);
          background-color: #005fd5;
        }
        &::after {
          @include setWH(13px, 13px);
          background-color: #d8ebff;
        }

        &.big {
          @include setWH(43px, 43px);
          &::before {
            @include setWH(33px, 33px);
          }
          &::after {
            @include setWH(17px, 17px);
          }
        }
      }

      .dot_text {
        position: absolute;
        bottom: - px2rem(3px);
        left: 50%;
        // margin-top: px2rem(1px);
        line-height: 1;
        font-size: px2rem(16px);
        color: #404040;
        text-align: center;
        transform: translate(-50%, 100%);
        white-space: nowrap;
      }
    }
  }

  .home_service {
    .home_block_hd {
      padding-top: px2rem(120px);
      margin-bottom: px2rem(20px);
    }
    .home_block_p {
      margin-bottom: px2rem(45px);
    }
    .home_service_content {
      display: flex;
    }
    .home_service_content_item {
      // z-index: 0;
      position: relative;
      flex: 1;
      height: px2rem(681px);
      padding: px2rem(140px) px2rem(20px) 0 px2rem(55px);
      box-sizing: border-box;
      color: #fff;
      &:hover .home_service_content_img {
        filter: brightness(40%);
      }
    }
    .home_service_content_img {
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      transition: all .3s;

      &.mobile {
        display: none;
      }
    }
    .home_service_content_hd, .home_service_content_num {
      // z-index: 1;
      line-height: 1;
      font-size: px2rem(36px);
    }
    .home_service_content_num {
      display: block;
      padding-bottom: px2rem(20px);
    }
    .home_service_content_hd {
      position: relative;
      line-height: 1.1;
      padding-bottom: px2rem(24px);
      margin-bottom: px2rem(80px);
      font-weight: bold;
      text-transform: capitalize;
      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        left: 0;
        bottom: 0;
        height: 1px;
        width: px2rem(92px);
        background-color: #fff;
      }
    }
    .home_service_content_p {
      padding-right: px2rem(40px);
      line-height: 1.6;
      font-size: px2rem(20px);
    }
  }

  .home_advantage {
    padding: px2rem(115px) px2rem(50px) px2rem(74px);
    background-color: #f7f7f7;

    .home_block_p {
      margin: px2rem(20px) 0 px2rem(46px);
    }

    .home_advantage_content {
      display: flex;
    }
    .home_advantage_item {
      flex: 1;
      // box-sizing: border-box;
      height: px2rem(466px);
      text-align: center;
      border: px2rem(3px) solid #fff;
      background-color: #fff;
      border-radius: px2rem(3px);
      transition: border-color .3s;

      & + .home_advantage_item {
        margin-left: px2rem(15px);
      }
      &:hover {
        border-color: #005FD5;
      }
    }
    .home_advantage_item_img {
      display: block;
      @include setWH(105px, 105px);
      margin: px2rem(105px) auto px2rem(60px);
    }
    .home_advantage_item_hd {
      line-height: 1;
      margin-bottom: px2rem(15px);
      font-size: px2rem(34px);
      font-weight: bold;
      color: #404040;
    }
    .home_advantage_item_p {
      line-height: 1.5;
      font-size: px2rem(20px);
      color: #404040;
    }
  }

  .home_moment {
    padding: px2rem(116px) 0 px2rem(110px);

    .home_block_hd {
      margin-bottom: px2rem(68px);
    }
    .btn_wrap {
      margin-top: px2rem(68px);
      font-size: 0;
      text-align: center;
    }

    .moment_wrap {
      position: relative;
      font-size: px2rem(18px);
    }
    .moment_list {
      overflow: hidden;
      .swiper-button-prev, .swiper-button-next {
        @include setWH(62px, 62px);
        background-size: contain;
        background-repeat: no-repeat;
        &::after {
          content: none;
        }
      }
      .swiper-button-prev {
        left: px2rem(368px);
        background-image: url('/images/home/lifthuise.png');
        &:hover {
          background-image: url('/images/home/left.png');
        }
      }
      .swiper-button-next {
        right: px2rem(368px);
        background-image: url('/images/home/righthuise.png');
        &:hover {
          background-image: url('/images/home/right.png');
        }
      }
    }
    .moment_item {
      @include setWH(905px, 461px);
      position: relative;
      background-color: #eee;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      cursor: pointer;
    }
    .moment_item_info_wrap {
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
    }
    .moment_item_info {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: px2rem(85px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 px2rem(25px);
      line-height: 1;
      font-size: px2rem(20px);
      color: #fff;
      background-color: rgba($color: #111b28, $alpha: 0.75);
    }
    .moment_item_info_hd {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .moment_item_info_time {
      margin-left: px2rem(15px);
      &::before {
        content: '|';
        margin-right: px2rem(4px);
      }
    }
  }
}

@media only screen and (max-width: 750px) {
  .home {
    $design-width: 750px;
    @import '@/assets/scss/mixin.scss';

    .home_block_hd {
      font-size: px2rem(38px);
    }
    .home_block_p {
      padding: 0 px2rem(50px);
      font-size: px2rem(24px);
    }

    .banner_video {
      &.pc {
        display: none;
      }
      // &.mobile {
      //   display: block;
      // }
    }
    .banner_img {
      &.mobile {
        display: block;
        width: 100%;
        // height: auto;
        height: px2rem(375px);
      }
    }

    .home_banner_info {
      .home_hd {
        margin-bottom: px2rem(28px);
        font-size: px2rem(46px);
      }

      .info_ul {
        margin-bottom: 0;

        .info_li, .info_li_split {
          font-size: px2rem(24px);
        }
        .info_li_split {
          margin: 0 px2rem(12px);
        }
      }

      .info_img {
        display: none;
      }
    }

    .home_slogan {
      height: px2rem(680px);
      background-image: url('/images/home/mobile/ditu.png');
      background-size: px2rem(522px) px2rem(301px);

      .home_block_hd {
        padding: px2rem(68px) 0 px2rem(34px);
      }
      .home_block_p {
        & + .home_block_p {
          margin-top: 0;
        }
      }
      .slogan_btn_wrap {
        margin-top: px2rem(35px);
      }

      .slogan_dots {
        bottom: px2rem(56px);
        @include setWH(530px, 215px);

        .dot1 {
          top: px2rem(119px);
          left: px2rem(252px);
        }
        .dot2 {
          top: px2rem(7px);
          left: px2rem(89px);
        }
        .dot3 {
          top: px2rem(97px);
          left: px2rem(68px);
        }
        .dot4 {
          top: px2rem(125px);
          left: - px2rem(5px);
        }
        .dot5 {
          top: px2rem(178px);
          left: px2rem(32px);
        }
        .dot6 {
          top: px2rem(2px);
          right: px2rem(150px);
        }
        .dot7 {
          top: px2rem(81px);
          right: px2rem(70px);
        }
        .dot8 {
          top: px2rem(106px);
          right: px2rem(14px);
        }
        .dot9 {
          top: px2rem(161px);
          right: px2rem(58px);
        }
      }
      .dot {
        .dot_cirle {
          @include setWH(26px, 26px);

          &::before {
            @include setWH(20px, 20px);
          }
          &::after {
            @include setWH(10px, 10px);
          }

          &.big {
            @include setWH(31px, 31px);
            &::before {
              @include setWH(24px, 24px);
            }
            &::after {
              @include setWH(13px, 13px);
            }
          }
        }

        .dot_text {
          bottom: - px2rem(3px);
          font-size: px2rem(12px);
        }
      }
    }

    .home_service {
      .home_block_hd {
        padding-top: px2rem(66px);
        margin-bottom: px2rem(26px);
      }
      .home_block_p {
        margin-bottom: px2rem(45px);
      }

      .home_service_content {
        flex-wrap: wrap;
      }
      .home_service_content_item {
        flex: 0 0 50%;
        width: 50%;
        height: px2rem(467px);
        padding: px2rem(50px) px2rem(20px) 0 px2rem(38px);
      }
      .home_service_content_img {
        &.pc {
          display: none;
        }
        &.mobile {
          display: block;
        }
      }

      .home_service_content_num {
        font-size: px2rem(36px);
        padding-bottom: px2rem(10px);
      }
      .home_service_content_hd {
        font-size: px2rem(30px);
        padding-bottom: px2rem(14px);
        margin-bottom: px2rem(46px);

        &::after {
          width: px2rem(52px);
        }
      }
      .home_service_content_p {
        padding-right: px2rem(25px);
        font-size: px2rem(24px);
      }
    }

    .home_advantage {
      padding: px2rem(58px) px2rem(36px) px2rem(53px);

      .home_block_p {
        margin: px2rem(26px) 0 px2rem(48px);
      }

      .home_advantage_content {
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .home_advantage_item {
        flex: 0 0 px2rem(330px);
        width: px2rem(330px);
        height: px2rem(366px);
        margin-bottom: px2rem(10px);
        border-radius: px2rem(3px);

        & + .home_advantage_item {
          margin-left: 0;
        }
      }
      .home_advantage_item_img {
        @include setWH(90px, 90px);
        margin: px2rem(69px) auto px2rem(27px);
      }
      .home_advantage_item_hd {
        margin-bottom: px2rem(25px);
        font-size: px2rem(30px);
      }
      .home_advantage_item_p {
        font-size: px2rem(24px);
      }
    }

    .home_moment {
      padding: px2rem(52px) 0 px2rem(100px);

      .home_block_hd {
        margin-bottom: px2rem(34px);
      }
      .btn_wrap {
        margin-top: px2rem(46px);
      }

      .moment_wrap {
        font-size: px2rem(18px);
      }
      .moment_list {
        .swiper-button-prev, .swiper-button-next {
          @include setWH(46px, 46px);
          margin-top: -12px;
        }
        .swiper-button-prev {
          left: px2rem(80px);
        }
        .swiper-button-next {
          right: px2rem(80px);
        }
      }
      .moment_item {
        @include setWH(480px, 245px);
        margin: 0 (- px2rem(20px)) 0 (- px2rem(12px));
      }
      .moment_item_info {
        display: none;
      }
    }
  }

  [lang="en"] .home {
    $design-width: 750px;
    @import '@/assets/scss/mixin.scss';

    .home_slogan {
      height: px2rem(770px);
    }

    .home_service {
      .home_service_content_item {
        height: px2rem(650px);
      }
    }

    .home_advantage {
      .home_advantage_item {
        height: px2rem(450px);
        padding: 0 px2rem(15px);
        box-sizing: border-box;
      }

      .home_advantage_item_hd {
        line-height: 1.2;
      }
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

@keyframes breath {
  0% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1.1);
  }
}

@keyframes cd-mask-wrapper {
  0% {
    transform: translateX(50%);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes cd-mask-content {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes cd-pulse {
  0%, 30.8% {
    opacity: 0;
  }
  15.4%, 46.2%, 61.5%, 70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
