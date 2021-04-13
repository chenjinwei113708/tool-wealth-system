import{ ParameterizedContext, Next } from 'koa';
import Validator from 'better-validator';
import Util, { IResData } from 'util/util';
import log4js from 'util/log4js';

const logger = log4js('ext mid');

const isDev = process.env.NODE_ENV === 'development';

function resHandler (this: ParameterizedContext, data: IResData, statusCode = 200, encrypt = !isDev) {
  Util.resHandler(this, data, statusCode);
}

export default async function (ctx: ParameterizedContext, next: Next) {
  ctx.resHandler = resHandler.bind(ctx);

  const validator = Validator.create();
  ctx.validator = validator;
  ctx.checkValidator = function () {
    const errors = validator.run();
    if (errors.length) {
      logger.error(errors);
      throw new Error(`参数有误`);
    }
  }

  return next();
}