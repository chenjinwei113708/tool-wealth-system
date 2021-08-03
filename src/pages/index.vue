<template>
  <main class="v_home">
    <VHeader/>
    <div class="header_holder" />

    <section class="banner">
      <!-- <div class="banner_content">
        <h2 class="title" need-animation>智械纪年</h2>
        <p class="desc" need-animation>当前画面不代表最终品质，敬请期待</p>
      </div> -->
      <div class="banner_list_top">
        <div class="banner_list">
          <div class="swiper-wrapper ">
            <div class="banner_item swiper-slide"
              v-for="(item, i) in bannerlist"
              :key="i"
            >
              <img :src="item.imgUrl" class="banner_img">
            </div>
          </div>
          <div class="swiper-pagination" style=""></div>
        </div>
      </div>
    </section>

    <main class="main">
      <section class="sec sec_moment" id="moment">
        <h2 class="sec_title" need-animation>
          <img src="../assets/images/home/dongtai.png" class="sec_title_img">
          动态
        </h2>

        <section class="moment_content_wrap">
          <section
            class="moment_item"
            v-for="(item, index) in momentList"
            :key="item.title"
            :class="index & 1 ? 'reverse' : ''"
            need-animation
          >
          
            <img :src="item.imgUrl" class="item_img" v-if="!item.videoUrl">
            <div class="video_bg" v-else>
              <div class="video_bg_under">
                <!-- 覆盖图 -->
                <div v-if="item.isplay"  @mouseover="play(index,$event)" @mouseout="pause(index,$event)" class="item_video_bg" :style="{ 'background': 'url(' + item.imgUrl + ') no-repeat center center', 'background-size': '100% 100%'}"></div>
                <!-- 视频 -->
                <video class="item_video" @mouseover="play(index,$event)" @mouseout="pause(index,$event)" preload="true"  muted loop :poster="item.imgUrl" ref="video">
                  <source type="video/mp4" :src='item.videoUrl' >
                </video>
                
              </div>
            </div>
            <article class="item_content">
              <h3 class="item_hd">
                {{item.title}}
                <a :href="item.url" target="_blank" class="item_btn" v-if="item.url">点击预约</a>
              </h3>
              <div 
                class="item_text_wrap" 
                v-for="(content, index) in item.contentList"
                :key="content.title"
                :class="index & 1 ? 'reverse' : ''"
              >
                <p class="item_time_new">{{content.time}}</p><br>
                <p class="item_text">
                  {{ content.text }}</p>
              </div>
            </article>
          </section>
        </section>
      </section>

      <section class="sec sec_game" id="game">
        <h2 class="sec_title" need-animation>
          <img src="../assets/images/home/youxi.png" class="sec_title_img">
          游戏
        </h2>

        <section class="game_content_wrap">
          <article 
            class="game_item"
            v-for="item in gameList"
            :key="item.title"
            need-animation
          >
            <div class="item_content">
              <h3 class="item_hd">{{item.title}}</h3>
              <p class="item_text" v-if="item.text">{{item.text}}</p>
            </div>
            <img :src="item.imgUrl" class="item_img">
          </article>
        </section>
      </section>
    </main>

    <section class="about" id="about">
      <h2 class="sec_title" need-animation>
        <img src="../assets/images/home/guanyuwomen.png" class="sec_title_img">
        关于我们
      </h2>
      <article class="about_art">
        <h3 class="a_title" need-animation>公司简介</h3>
        <p class="a_text" need-animation>
          天之梦成立于2019年，由一群热爱游戏的年轻人组成。<br>
          致力于提供一流的便捷发行服务，制定针对性的开发建议与计划，提供高质量的宣发渠道；<br>
          打造一站式服务体系，为国内外优秀独立开发者提供全方位的孵化支持；迅速实现产品的落地。
        </p>
      </article>
    </section>

    <section class="contact" id="contact">
      <h2 class="sec_title" need-animation>
        <img src="../assets/images/home/lianxiwomen.png" class="sec_title_img">
        联系我们
      </h2>

      <article class="contact_art" need-animation>
        <p class="contact_text">
          商务洽谈/邮件：<a href="mailto:tech@skydream.xyz" class="contact_link">tech@skydream.xyz</a>
        </p>
      </article>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { BounceInUp } from '@/util/animation';
import Header from './indexPage/components/header.vue';
import { log } from 'console';

declare const Swiper: any;

let mySwiper: typeof Swiper | null = null;

export default Vue.extend({
  name: 'index',

  head () {
    return {
      meta: [
        // { name: 'keywords', content: '全球领先的互联网服务提供商,jodo,jodoinc' },
        // { hid: 'description', name: 'description', content: '广州卓动信息科技公司(Guangzhou JODO InfoTech Ltd.)是一家以运营起家，专注于海外市场，集研运一体，自研自发的游戏公司。公司规模150人，领导出身于阿里和网易，团队年轻有活力，为全球玩家提供优质游戏是我们的使命。' }
      ],
      script: [
        { src: '/lib/swiper-4.5.3.min.js' }
      ],
      link: [
        { href: '/lib/swiper-4.5.3.min.css',  rel: 'stylesheet' }
      ]
    };
  },

  components: {
    VHeader: Header,
  },

  data () {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        // preventClicks: false,
        loop : true,
        autoplay: true,
        // grabCursor: true,
        // centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
        },
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev'
        // }
      },

      bannerlist: [
        {
          imgUrl: '/images/home/banner-02.png',
        },
        {
          imgUrl: '/images/home/banner-03.png',
        },
        {
          imgUrl: '/images/home/banner-04.png',
        }
      ],

      momentList: [
        {
          title: '凯瑞尔轮回',
          imgUrl: '/images/home/03-2.png',
          videoUrl: 'http://dodo.jodocdn.com/video/kai.mp4',
          url:'https://www.taptap.com/app/198254',
          isplay:true,
          contentList: [
            {
              time: '2021年 9月 4日-5日',
              text: '参加机核网举行的GameRally游戏创作市集',
            },
            {
              time: '2021年 11 月',
              text: '参加WePlay文化展',
            }
          ]
        },
        {
          title: '艾泽远征',
          imgUrl: '/images/home/01.png',
          videoUrl: 'http://dodo.jodocdn.com/video/ai.mp4',
          url:'https://www.taptap.com/app/210170',
          isplay:true,
          contentList: [
            {
              time: '2021年 9月',
              text: '艾泽远征第四次删档内测正火热进行中！',
            }
          ]
        },
        {
          title: '美食餐厅',
          imgUrl: '/images/home/02.png',
          videoUrl: 'http://dodo.jodocdn.com/video/IdleCook.mp4',
          url:'https://www.taptap.com/app/191183',
          isplay:true,
          contentList: [
            {
              time: '2021年 1月',
              text: 'TapTap开启预约通道，探索美食餐厅致富之道！',
            }
          ]
        },
        {
          title: '代号 : 消除',
          imgUrl: '/images/home/04.png',
          // videoUrl: '/images/home/video/IdleCook.mp4',
          isplay:true,
          contentList: [
            {
              time: '2021年',
              text: '项目立项，正在研发中',
            }
          ]
        }
        
      ],
      gameList: [
        {
          title: '凯瑞尔轮回',
          text: '在凯瑞尔的地牢里与最凶险的敌人斗智斗勇，寻找并击败预言中的终焉之龙！',
          imgUrl: '/images/home/01-3-2.png',
        },
        {
          title: '艾泽远征',
          text: '魔兽题材的非传统战棋类游戏，打造一支属于自己的强大军队，一举出发击溃敌军！',
          imgUrl: '/images/home/01-1.png',
        },
        {
          title: '美食餐厅',
          text: '休闲放置餐厅游戏，轻松放置，开发食谱，打造美食商业帝国！',
          imgUrl: '/images/home/01-2.png',
        },
        {
          title: '敬请期待',
          text: '一款充满趣味的消除游戏，正在马不停蹄地研发当中',
          imgUrl: '/images/home/01-4.png',
        },
      ]
    }
  },

  mounted () {
    setTimeout(this.initSwiper, 800);
    BounceInUp.init();
    // window.addEventListener('scroll',this.scrollHandle);//绑定页面滚动事件
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
      mySwiper = new Swiper('.banner_list', this.swiperOption);
    },
    destroySwiper () {
      try {
        mySwiper && mySwiper.destroy();
      } catch (e) {}
      mySwiper = null;
    },
    // scrollHandle(e:any){
    //   let top = e.srcElement.scrollingElement.scrollTop;    // 获取页面滚动高度
    //   // console.log(top);
    //     }

    play (num:number,e: Event) {
      const target = e.target as HTMLVideoElement || null;
      target?.play?.();
      this.momentList[num].isplay=false;
    },
    pause (num:number,e: Event) {
      const target = e.target as HTMLVideoElement || null;
      target?.pause?.();
      this.momentList[num].isplay=true;
    },
    img_play (num:number){
      !this.momentList[num].isplay;
    }
  },
});
</script>

<style lang="scss">
@import '@/assets/scss/animation.scss';
@import './indexPage/index.scss';
</style>
