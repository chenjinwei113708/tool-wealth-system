import{ ParameterizedContext, Next } from 'koa';
import { CookiesName } from '@/config/common';
import log4js from '../util/log4js';
const logger = log4js('server-middleware');

const passPath = ['/api/event/item/create', '/api/event/item/update', '/api/test'];

export default async function(ctx: ParameterizedContext, next: Next) {
  if (ctx.path.indexOf('/static/') === 0 || ctx.path.indexOf('/api/test') === 0) {
    ctx.path.indexOf('/static/') === -1 && logger.debug(`request: ${ctx.method} ${ctx.path}`);
    return next();
  }
  if (ctx.path.indexOf('/api/') === -1 || passPath.includes(ctx.path)) {
    logger.debug(`request: ${ctx.method} ${ctx.path}`);
    return next();
  }

  logger.info("====================request info====================")
  logger.info('request: ', ctx.method, ctx.path);
  logger.info('username: ', ctx.cookies.get(CookiesName.USERNAME));
  // logger.info('token: ', ctx.cookies.get(CookiesName.TOKEN));
  const ip = ((
    ctx.headers['x-forwarded-for'] ||
    ctx.headers['x-forward-for'] ||
    ctx.ip || 
    ctx.req.connection.remoteAddress ||
    ctx.req.socket.remoteAddress ||
    (ctx.req.connection as any).socket && (ctx.req.connection as any).socket.remoteAddress || ''
  )
    .match(/\d+\.\d+\.\d+\.\d+/) || [])[0] || '';

  // 传入上下文
  ctx.UserIP = ip;
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