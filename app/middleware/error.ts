import{ ParameterizedContext, Next } from 'koa';
import log4js from 'util/log4js';

const logger = log4js('error mid');

export default async function (ctx: ParameterizedContext, next: Next) {
  try {
    await next();
  } catch (e) {
    logger.error(e);
    ctx.resHandler({
      isSuccess: false,
      msg: e?.message || e + '',
    }, 500);
  }
}