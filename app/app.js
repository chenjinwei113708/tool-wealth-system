const Koa = require('koa')
const bodyparser = require('koa-body');
const koaStatic = require('koa-static');
const consola = require('consola')
const path = require('path');
const { Nuxt, Builder } = require('nuxt')
const router = require('./router');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const Conf = require('../conf/index');

const app = new Koa()
const env = process.env.NODE_ENV || 'production';

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = env === 'development';

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || 'localhost',
    port = process.env.PORT || Conf.network.port || 3000
  } = nuxt.options.server

  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(bodyparser({
    multipart: false, // 支持文件上传
    // formidable: {
    //   uploadDir: path.join(__dirname, '../tmp/upload'),
    //   keepExtensions: true, // 保持文件的后缀
    // }
  }));
  app.use(loggerMiddleware);
  !config.dev && app.use(koaStatic(
    path.join(__dirname, '../dist')
  ));
  app.use(router.routes());

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://localhost:${port}`,
    badge: true
  })
}

start()
