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

    <main class="main">
      <section class="sec sec_moment">
        <h2 class="sec_title">
          <img src="../assets/images/home/dongtai01.png" class="sec_title_img">
          动态
        </h2>

        <section class="moment_content_wrap">
          <section
            class="moment_item"
            v-for="(item, index) in momentList"
            :key="item.title"
            :class="index & 1 ? 'reverse' : ''"
          >
            <img :src="item.imgUrl" class="item_img">
            <article class="item_content">
              <h3 class="item_hd">
                {{item.title}}
                <span class="item_time">
                  {{item.time}}
                </span>
              </h3>
              <p class="item_text">{{ item.text }}</p>
            </article>
          </section>
        </section>
      </section>

      <section class="sec sec_game">
        <h2 class="sec_title">
          <img src="../assets/images/home/youxi01.png" class="sec_title_img">
          游戏
        </h2>

        <section class="game_content_wrap">
          <article 
            class="game_item"
            v-for="item in gameList"
            :key="item.title"
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

    <section class="about">
      <h2 class="sec_title">
        <img src="../assets/images/home/guanyuwomen01.png" class="sec_title_img">
        关于我们
      </h2>
      <article class="about_art">
        <h3 class="a_title">公司简介</h3>
        <p class="a_text">
          天之梦成立于2019年，由一群热爱游戏的年轻人组成。<br>
          旗下的大吉工作室，站在玩家的立场上，旨在研发出让玩家所喜欢热爱的精品独立手游，<br>
          维系玩家体验一直都是大吉工作室的使命。<br>
          旗下的大力发行，立志于为国内外的独立开发者提供优质的发行服务。我们能提供一流的便携发行服务；<br>
          提供针对性的开发建议;联系发行去到进行上架；<br>
          提供优质的宣传渠道。让更多的独立开发者能够迅速的实现产品的落地也是大力发行的宗旨。
        </p>
      </article>
    </section>

    <section class="contact">
      <h2 class="sec_title">
        <img src="../assets/images/home/lianxiwomen01.png" class="sec_title_img">
        联系我们
      </h2>

      <article class="contact_art">
        <p class="contact_text">
          商务洽谈/邮件：<a href="mailto:tianzhimeng@qq.com" class="contact_link">tianzhimeng@qq.com</a>
        </p>
      </article>
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
      momentList: [
        {
          title: '艾泽远征',
          time: '2021.03.04',
          text: '艾泽远征第二次删档内测正式开始',
          imgUrl: '/images/home/01.png',
        },
        {
          title: '美食餐厅',
          time: '2021.01.01',
          text: 'Taptap开启预约通道，探索美食餐厅致富之道！',
          imgUrl: '/images/home/02.png',
        },
        {
          title: '智械纪年',
          time: '2022待定',
          text: '在机械迷城里体验畅快的动作闯关',
          imgUrl: '/images/home/03.png',
        }
      ],
      gameList: [
        {
          title: '艾泽远征',
          text: '魔兽题材放置类游戏，休闲养肝，与艾泽一起，击退魔兽，守护世界和平！',
          imgUrl: '/images/home/01-1.png',
        },
        {
          title: '美食餐厅',
          text: '休闲放置餐厅游戏，轻松放置，开发食谱，打造美食商业帝国！',
          imgUrl: '/images/home/01-2.png',
        },
        {
          title: '智械纪年',
          text: '像素风动作游戏，体验不同风格的武器与技能搭配，带来不一样的闯关体验！',
          imgUrl: '/images/home/01-3.png',
        },
        {
          title: '敬请期待',
          imgUrl: '/images/home/01-4.png',
        },
      ]
    }
  },
});
</script>

<style lang="scss">
@import './indexPage/index.scss';
</style>
