import{ ParameterizedContext, Next } from 'koa';
import Util, { IResData } from '../util/util';

const isDev = process.env.NODE_ENV === 'development';

function resHandler (this: ParameterizedContext, data: IResData, statusCode = 200, encrypt = !isDev) {
  Util.resHandler(this, data, statusCode);
}

export default function (ctx: ParameterizedContext, next: Next) {
  ctx.resHandler = resHandler.bind(ctx);
  return next();
}