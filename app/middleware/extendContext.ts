import{ ParameterizedContext, Next } from 'koa';
import Validator from 'better-validator';
import Util, { IResData } from '../util/util';

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
      throw new Error(`参数${errors.map(e => e.value).join(', ')}有误`);
    }
  }

  return next();
}