const Conf = require('./conf');
const env = process.env.NODE_ENV || 'production';

module.exports = {
  mode: 'universal',
  srcDir: 'src/', // Nuxt.js 应用的源码目录
  /*
  ** Headers of the page
  */
  head: {
    // title: process.env.npm_package_name || '',
    title: '广州天之梦网络科技有限公司',
    htmlAttrs: {
      lang: 'zh-CN',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
      // { hid: 'description', name: 'description', content: '广州卓动信息科技公司是一家以运营起家，专注于海外市场，集研运一体，自研自发的游戏公司。公司规模150人，领导出身于阿里和网易，团队年轻有活力，为全球玩家提供优质游戏是我们的使命。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/rem.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { 
    // color: '#097dea',
    color: '#f1f050',
    continuous: true,
  },

  router: {
    prefetchLinks: false, // 全局禁用所有链接上的预取
    linkExactActiveClass: 'active',
  },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/reset.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~/plugins/vue-totop"
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    // '@nuxtjs/axios',
    'nuxt-i18n',
    '@nuxtjs/style-resources',
  ],
  i18n: {
    // locales: ['en', 'zh-CN'],
    locales: [
      {
        code: 'en',
        iso: 'en-US',
      },
      {
        code: 'zh-hans',
        iso: 'zh-CN'
      }
    ],
    defaultLocale: 'zh-hans',
    locale: 'zh-hans',
    vueI18n: {
      fallbackLocale: 'zh-hans',
      messages: {
        en: require('./src/locales/en'),
        'zh-hans': require('./src/locales/zh-CN'),
      }
    },

    // detectBrowserLanguage: {
    //   fallbackLocale: 'zh-hans',
    // }
    detectBrowserLanguage: false
  },

  styleResources: {
    scss: [
      '@/assets/scss/mixin.scss'
    ]
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  // axios: {
  // },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    // cache: true, // 实验性的，开启后css貌似有问题
    // parallel: true,

    transpile: [
      'vue-totop'
    ],

    extractCSS: env === 'production', // CSS提取

    postcss: {
      // 添加插件名称作为键，参数作为值
      // 使用npm或yarn安装它们
      plugins: {
        // 通过传递 false 来禁用插件
        'postcss-nested': {},
        'postcss-hexrgba': {}
      },
      preset: {
        // 更改postcss-preset-env 设置
        autoprefixer: {
          grid: true,
          overrideBrowserslist: [
            "iOS >= 8",
            "IE >= 9",
            "Firefox >= 20",
            "Android >= 4"
          ]
        }
      }
    }
  },
  buildDir: env !== 'production' ? '.nuxt' : '.nuxt-prod',
  server: {
    port: Conf.network.port || 3000,
    host: process.env.HOST || (env === 'production' ? '0.0.0.0' : '0.0.0.0'),
  },
}
