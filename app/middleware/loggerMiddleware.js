const koa = require('koa');
const logger = require('../util/log4js')('server-middleware');
/**
 * @param {koa.ParameterizedContext} ctx
 * @param {() => Promise<any>} next
 * @return {Promise<any>}
 */
module.exports = async function(ctx, next) {
  if (ctx.path.indexOf('/static/') === 0 || ctx.path.indexOf('/_nuxt/') === 0 || 
    ctx.path.indexOf('/api/test') === 0 || ctx.path.indexOf('/images/') === 0 ||
    ctx.path.indexOf('/lib/') === 0 || ctx.path.indexOf('/favicon.ico') === 0 ||
    ctx.path.indexOf('/rem.js') === 0 || ctx.path.indexOf('/member/uploadfile') === 0 ||
    ctx.path.indexOf('/dayrui/statics/') === 0
  ) {
    logger.debug(`request: ${ctx.method} ${ctx.path}`);
    return next();
  }
  // if (ctx.path.indexOf('/api/') === -1 || ctx.path !== '/admin.php') {
  //   logger.debug(`request: ${ctx.method} ${ctx.path}`);
  //   return next();
  // }
  logger.info("====================request info====================")
  logger.info('request: ', ctx.method, ctx.path);
  // logger.info('username: ', ctx.cookies.get('username'));
  let ip = ((
    ctx.headers['x-forwarded-for'] ||
    ctx.headers['x-forward-for'] ||
    ctx.ip || 
    ctx.req.connection.remoteAddress ||
    ctx.req.socket.remoteAddress ||
    ctx.req.connection.socket && ctx.req.connection.socket.remoteAddress || ''
  )
    .match(/\d+\.\d+\.\d+\.\d+/) || [])[0] || '';
  logger.info('ip: ', ip);
  logger.info('referer: ',ctx.headers['referer']);
  logger.info('user-agent: ' + ctx.headers['user-agent']);
  if (ctx.method.toLowerCase() === 'get') {
    logger.info("query: ", ctx.search);
  } else if (ctx.path !== '/api/login') {
    logger.info("body: ", ctx.request.body);
  }
  return next();
}