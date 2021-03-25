<template>
  <header class="v_header">
    <nuxt-link :to="localePath('/')" class="logo_link">
      <h1 class="v_logo">
        <img src="/images/jodo.png" alt="卓动科技" class="logo_img">
        大吉工作室
      </h1>
    </nuxt-link>

    <aside class="v_aside">
      <div class="nav_mask" :class="{open: isMobileMenuShow}" @click="toggleMenuOpen"></div>
      <nav class="nav" :class="{open: isMobileMenuShow}">
        <!-- mobile close menu botton -->
        <img src="/images/header/close.png" class="mobile_menu_close_img" @click="toggleMenuOpen">

        <div class="nav_item" v-for="item in showNavList" :key="item.title">
          <!-- pc -->
          <nuxt-link :to="localePath(item.link)" :class="{ 'js_active': activeParentPath === localePath(item.link) }" class="nav_link nav_link_pc">{{$t(item.title)}}</nuxt-link>

          <!-- mobile -->
          <div 
            class="nav_link_mobile" 
            :class="{ 'js_active': activeParentPath === localePath(item.link) }"
            v-if="hasChildNav(item)" 
            @click="toggleNavOpen(item)"
          >
            {{$t(item.title)}}
            <span class="triangle" :class="{ rotate: ~openNavs.indexOf(item.link) }" />
          </div>
          <nuxt-link v-else :to="localePath(item.link)" :class="{ 'js_active': activeParentPath === localePath(item.link) }" class="nav_link_mobile">{{$t(item.title)}}</nuxt-link>

          <!-- pc sub nav -->
          <template v-if="hasChildNav(item)">
            <div class="nav_sub_item_wrap pc">
              <nuxt-link 
                class="sub_nav_link"
                v-for="(sub, index) in item.subNavList"
                :key="index"
                :to="localePath(sub.link)" 
              >
                {{$t(sub.name)}}
              </nuxt-link>
            </div>
          </template>

          <!-- mobile sub nav -->
          <template v-if="hasChildNav(item)">
            <collapse-transition>
              <div class="nav_sub_item_wrap mobile" v-if="~openNavs.indexOf(item.link)">
                <nuxt-link 
                  class="sub_nav_link"
                  v-for="(sub, index) in item.subNavList"
                  :key="index"
                  :to="localePath(sub.mLink || sub.link)" 
                >
                  {{$t(sub.name)}}
                </nuxt-link>
              </div>
            </collapse-transition>
          </template>
        </div>
      </nav>

      <span class="language">
        <nuxt-link :to="switchLocalePath('zh-hans')" class="language_link">
          <span class="language_button">中文</span>
        </nuxt-link>
        |
        <nuxt-link :to="switchLocalePath('en')" class="language_link">
          <span class="language_button">English</span>
        </nuxt-link>
      </span>

      <img src="/images/header/menu.png" class="mobile_menu_img" @click="toggleMenuOpen">
    </aside>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import CollapseTransition from '@/plugins/collapse-transition';

export default Vue.extend({
  name: 'v-header',

  components: {
    CollapseTransition
  },

  data () {
    return {
      navList: [
        {
          title: 'header.index.title',
          link: '/',
          enHidden: false, // 英语语言下隐藏
        },
        // {
        //   title: 'header.story.title',
        //   link: '/story',
        //   subNavList: [
        //     { name: 'header.story.subs.profile', link: '/story#profile', mLink: '/story' },
        //     { name: 'header.story.subs.team', link: '/story#team' },
        //     // { name: 'header.story.subs.env', link: '/story#environment' },
        //     { name: 'header.story.subs.honor', link: '/story#honor' },
        //     { name: 'header.story.subs.history', link: '/story#history' }
        //   ]
        // },
        // {
        //   title: 'header.service.title',
        //   link: '/service',
        //   subNavList: [
        //     { name: 'header.service.subs.bigData', link: '/service/bigData' },
        //     { name: 'header.service.subs.software', link: '/service/software' },
        //     { name: 'header.service.subs.game', link: '/service/game' },
        //     { name: 'header.service.subs.enterprise', link: '/service/enterprise' },
        //     { name: 'header.service.subs.ecommerce', link: '/service/ecommerce' },
        //   ]
        // },
        // {
        //   title: 'header.news.title',
        //   link: '/news',
        //   subNavList: [
        //     { name: 'header.news.subs.activity', link: '/news?tab=activity' },
        //     { name: 'header.news.subs.company', link: '/news?tab=company' },
        //     { name: 'header.news.subs.training', link: '/news?tab=train' }
        //   ]
        // },
        // {
        //   title: 'header.join.title',
        //   link: '/job',
        //   enHidden: true, // 英语语言下隐藏
        //   subNavList: [
        //     { name: 'header.join.subs.society', link: '/job#jobs', mLink: '/job' },
        //     { name: 'header.join.subs.campus', link: '/job/campus' },
        //     { name: 'header.join.subs.welfare', link: '/job#welfare' },
        //     { name: 'header.join.subs.grow', link: '/job#training' }
        //   ]
        // },
        // {
        //   title: 'header.contact.title',
        //   link: '/contact',
        // }
      ],

      openNavs: <string[]>[],

      isMobileMenuShow: false,
    }
  },

  watch: {
    '$route.path' () {
      this.isMobileMenuShow && this.toggleMenuOpen();
    },

    isMobileMenuShow (isShow) {
      if (isShow) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  },

  computed: {
    activeParentPath (): string {
      const match = this.$route.path.match(/((:?\/en)?\/\w+)(:?\/w+)*/);
      return match && match[1] || '';
    },

    localLanguage (): string {
      return this.$i18n.locale;
    },
    showNavList (): any[] {
      if (this.localLanguage !== 'en') {
        return this.navList;
      }
      return this.navList.filter(item => !item.enHidden);
    }
  },

  methods: {
    hasChildNav (item: any) {
      return item.subNavList && item.subNavList.length > 0;
    },

    toggleNavOpen (item: { link: string, [key: string]: any }) {
      if (!item) {
        return;
      }

      const index = this.openNavs.indexOf(item.link);
      if (~index) {
        this.openNavs.splice(index, 1);
      } else {
        this.openNavs.push(item.link);
      }
    },

    toggleMenuOpen () {
      this.isMobileMenuShow = !this.isMobileMenuShow;

      if (!this.isMobileMenuShow) {
        this.openNavs = [];
      } else if (!(~this.openNavs.indexOf(this.activeParentPath))) {
        this.openNavs.push(this.activeParentPath);
      }
    }
  },
});
</script>

<style lang="scss">
// $linkActiveColor: #005fd5;
$linkActiveColor: #fff;
.v_header {
  $headerHeight: px2rem(73px);
  $subHeaderHeight: px2rem(80px);

  position: relative;
  height: $headerHeight;
  padding: 0 px2rem(90px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: #111b28;
  background-color: #005fd5;

  .logo_link {
    display: block;
  }
  .v_logo {
    // @include setWH(287px, 33px);
    height: px2rem(33px);
    // overflow: hidden;
    line-height: 1;
    font-size: px2rem(24px);
    font-weight: bold;
    color: #fff;
    // background-image: url('../assets/images/home/logo.png');
    // background-size: contain;
    // background-repeat: no-repeat;
    .logo_img {
      // @include setWH(287px, 33px);
      height: px2rem(33px);
      width: auto;
      // display: block;
      vertical-align: - px2rem(8px);
      margin-right: px2rem(2px);
    }
  }

  .v_aside {
    display: flex;
    align-items: center;
    font-size: 0;

    .nav {
      margin-right: px2rem(110px);
      font-size: 0;
    }
    .nav_item {
      display: inline-block;
      vertical-align: top;

      & + .nav_item {
        margin-left: px2rem(55px);
      }

      &:hover {
        .nav_sub_item_wrap {
          height: $subHeaderHeight;
          z-index: 1;
        }

        .nav_link {
          color: $linkActiveColor;
          &::after {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            content: '';
            height: px2rem(4px);
            background-color: $linkActiveColor;
          }
        }
      }

      .nav_link {
        position: relative;
        display: block;
        padding: 0 px2rem(10px);
        height: $headerHeight;
        line-height: $headerHeight;
        text-align: center;
        font-size: px2rem(20px);
        // color: #fff;
        color: #abc6e6;
        transition: all .3s;

        &.active, &.js_active {
          color: $linkActiveColor;
          &::after {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            content: '';
            height: px2rem(4px);
            background-color: $linkActiveColor;
          }
        }
      }
    }
    .nav_sub_item_wrap {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      // height: px2rem(80px);
      overflow: hidden;
      height: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      transition: all .3s;

      .sub_nav_link {
        padding: px2rem(4px) px2rem(8px);
        height: $subHeaderHeight;
        line-height: $subHeaderHeight;
        color: #737373;
        font-size: px2rem(20px);
        transition: color .3s;

        & + .sub_nav_link {
          margin-left: px2rem(42px);
        }
        &:hover, &.active {
          color: #005fd5;
        }
      }
    }

    .nav_sub_item_wrap.mobile {
      display: none;
    }

    .nav_link_mobile, .nav_mask {
      display: none;
    }

    .language, .language_link {
      font-size: px2rem(18px);
      line-height: 1.5;
      // color: #95989e;
      color: #abc6e6;
    }
    .language_link.active {
      color: #fff;
      cursor: default;
    }

    .mobile_menu_img, .mobile_menu_close_img {
      display: none;
    }
  }
}

@media only screen and (max-width: 750px) {
  .v_header {
    $design-width: 750px;
    @import '@/assets/scss/mixin.scss';
    $headerHeight: px2rem(90px);

    height: $headerHeight;
    padding: 0 px2rem(28px);

    .v_logo {
      height: auto;
      font-size: px2rem(20px);
      font-weight: normal;

      .logo_img {
        height: px2rem(28px);
        vertical-align: - px2rem(4px);
        margin-right: px2rem(2px);
      }
    }

    .v_aside {
      .nav {
        // display: none;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
        padding: px2rem(42px) px2rem(26px) px2rem(42px) px2rem(44px);
        margin: 0;
        background-color: #fff;
        transform: translateX(100%);
        transition: transform .3s;

        &.open {
          // display: block;
          transform: translateX(0);
        }
      }
      .nav_item {
        display: block;
        width: px2rem(287px);

        & + .nav_item {
          margin-left: 0;
          margin-top: px2rem(74px);
        }
        &:hover {
          .nav_sub_item_wrap {
            height: auto;
          }
        }

        .nav_link_pc {
          display: none;
        }

        .nav_link_mobile {
          display: flex;
          align-items: center;
          padding-bottom: px2rem(8px);
          border-bottom: 1px solid #eee;
          font-size: px2rem(32px);
          text-align: left;
          color: #606060;

          &.js_active, &.active {
            color: #005fd5;
          }
        }
        .triangle {
          display: inline-block;
          margin: 0 px2rem(8px);
          border-top: px2rem(8px) solid #606060;
          border-left: px2rem(8px) solid transparent;
          border-right: px2rem(8px) solid transparent;
          transition: transform .3s;

          &.rotate {
            transform: rotate(180deg);
          }
        }
      }

      .mobile_menu_close_img {
        position: absolute;
        top: px2rem(40px);
        right: px2rem(30px);
        display: block;
        @include setWH(36px, 36px);
      }

      .nav_mask.open {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba($color: #000000, $alpha: 0.5);
      }

      .nav_sub_item_wrap.pc {
        display: none;
      }

      .nav_sub_item_wrap.mobile {
        position: static;
        top: unset;
        left: unset;
        right: unset;
        display: block;
        height: auto;

        .sub_nav_link {
          display: block;
          line-height: 1.2;
          font-size: px2rem(26px);
          color: #9a9a9a;

          & + .sub_nav_link {
            margin-top: px2rem(12px);
            margin-left: 0;
          }
          &:first-child {
            margin-top: 25px;
          }
          &.active {
            color: #005fd5;
          }
        }
      }

      .language, .language_link {
        font-size: px2rem(24px);
      }

      .mobile_menu_img {
        display: block;
        @include setWH(44px, 36px);
        margin-left: px2rem(47px);
        cursor: pointer;
      }
    }
  }
}
</style>
