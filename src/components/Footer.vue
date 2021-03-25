<template>
  <footer class="v_footer">
    <section class="footer_info">
      <h1 class="tmp_footer_tit">THIS IS FOOTER</h1>
    </section>

    <div class="footer_line"></div>

    <div class="footer_extra">
      <p class="beian footer_text">
        <nuxt-link :to="localePath('/legal')" target="_blank" class="footer_text">{{$t('footer.legal')}}</nuxt-link>
        <span class="split">|</span>
        <nuxt-link :to="localePath('/privacy')" target="_blank" class="footer_text">{{$t('footer.policy')}}</nuxt-link>
        <span class="split">|</span>
        <a target="_blank" href="https://beian.miit.gov.cn" class="footer_text">粤ICP备12082196号</a>
      </p>
      <p class="copyright footer_text">
        COPYRIGHT {{ getYear() }} © 广州天之梦网络科技有限公司. ALL RIGHTS
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'v-footer',

  data () {
    return {
      navList: [
        {
          title: 'header.story.title',
          subNavList: [
            { name: 'header.story.subs.profile', link: '/story' },
            { name: 'header.story.subs.team', link: '/story#team' },
            // { name: 'header.story.subs.env', link: '/story#environment' },
            { name: 'header.story.subs.honor', link: '/story#honor' },
            { name: 'header.story.subs.history', link: '/story#history' }
          ]
        },
        {
          title: 'header.service.title',
          subNavList: [
            { name: 'header.service.subs.bigData', link: '/service/bigData' },
            { name: 'header.service.subs.software', link: '/service/software' },
            { name: 'header.service.subs.game', link: '/service/game' },
            { name: 'header.service.subs.enterprise', link: '/service/enterprise' },
            { name: 'header.service.subs.ecommerce', link: '/service/ecommerce' },
          ]
        },
        {
          title: 'header.news.title',
          subNavList: [
            { name: 'header.news.subs.company', link: '/news?tab=company' },
            { name: 'header.news.subs.activity', link: '/news?tab=activity' },
            { name: 'header.news.subs.training', link: '/news?tab=train' }
          ]
        },
        {
          title: 'header.join.title',
          enHidden: true, // 英语语言下隐藏
          subNavList: [
            { name: 'header.join.subs.society', link: '/job#jobs' },
            { name: 'header.join.subs.campus', link: '/job/campus' },
            { name: 'header.join.subs.welfare', link: '/job#welfare' },
            { name: 'header.join.subs.grow', link: '/job#training' }
          ]
        }
      ]
    }
  },

  computed: {
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
    getYear () {
      return new Date().getFullYear();
    }
  },
});
</script>

<style lang="scss">
.v_footer {
  padding: px2rem(60px) px2rem(250px) px2rem(40px);
  // background-color: #111b28;
  background-color: #005fd5;
  font-size: 0;

  .footer_hd {
    line-height: 1.2;
    font-size: px2rem(20px);
    color: #fff;
  }
  .footer_text {
    line-height: 1.2;
    font-size: px2rem(16px);
    // color: #95989e;
    color: #abc6e6;
  }
  .footer_line {
    // height: px2rem(2px);
    height: 1px;
    background-color: #a2afc7;
  }

  .footer_info {
    display: flex;
    justify-content: space-between;
    margin-bottom: px2rem(110px);
    padding: 0 px2rem(50px) 0 px2rem(20px);

    .tmp_footer_tit{
      color: white;
      font-size: px2rem(30px);
    }
  }

  .footer_nav {
    flex: 1;

    .nav_item {
      width: px2rem(240px);
      display: inline-block;
      vertical-align: top;
    }
    .nav_hd {
      margin-bottom: px2rem(50px);
    }
    .nav_li + .nav_li {
      margin-top: px2rem(16px);
    }
    .nav_li_link {
      transition: color .3s;
    }
    .nav_li_link:hover {
      color: #fff;
      text-decoration: underline;
    }
  }

  .footer_aside {
    .footer_line {
      width: px2rem(231px);
    }

    .info_link {
      color: #abc6e6;
      transition: color .3s;
      text-transform: uppercase;

      &:hover {
        text-decoration: underline;
        color: #fff;
      }
    }

    .partner {
      margin-bottom: px2rem(22px);
      .footer_hd {
        margin-bottom: px2rem(30px);
      }
      .footer_line {
        margin-top: px2rem(13px);
      }
    }

    .focus {
      font-size: 0;
      .footer_hd {
        margin-bottom: px2rem(18px);
      }
      .focus_ways {
        margin-bottom: px2rem(68px);
      }
      .focus_img_wrap {
        position: relative;
        display: inline-block;
        vertical-align: top;

        &:hover {
          .hover_img_wrap {
            display: block;
          }
        }
      }
      .focus_img {
        vertical-align: middle;
        @include setWH(35px, 34px);

        & + .focus_img {
          margin-left: px2rem(15px);
        }
      }
      .hover_img_wrap {
        position: absolute;
        display: none;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 107%);
        @include setWH(179px, 179px);

        &::before {
          content: '';
          display: block;
          position: absolute;
          left: 50%;
          top: px2rem(3px);
          transform: translate(-50%, -100%);
          border-bottom: px2rem(15px) solid #fff;
          border-left: px2rem(20px) solid transparent;
          border-right: px2rem(20px) solid transparent;
        }

        .hover_img {
          vertical-align: middle;
          width: 100%;
          height: 100%;
        }
      }
    }

    .contact {
      margin-top: px2rem(40px);

      .footer_text + .footer_text {
        margin-top: px2rem(20px);
      }
    }
  }

  .footer_extra {
    margin-top: px2rem(15px);
    display: flex;
    justify-content: space-between;

    .beian {
      text-transform: capitalize;
      .split {
        margin: 0 px2rem(6px);
      }
      a {
        transition: color .3s;
      }
      a:hover {
        color: #fff;
        text-decoration: underline;
      }
    }
  }
}

@media only screen and (max-width: 750px) {
  .v_footer {
    $design-width: 750px;
    @import '@/assets/scss/mixin.scss';

    padding: px2rem(35px) px2rem(52px) px2rem(68px);

    .footer_text {
      font-size: px2rem(22px);
    }

    .footer_info, .footer_line {
      display: none;
    }

    .footer_extra {
      margin-top: 0;

      .split {
        color: transparent;
      }

      .copyright {
        display: none;
      }
    }
  }
}
</style>
