// 检查用户会话
import jwt from "jsonwebtoken"; // 用来创建和确认用户信息摘要
import { ParameterizedContext, Next } from 'koa';
import Util from "../util/util";
import { CookiesName } from "@/config/common";
import log4js from "../util/log4js";

const logger = log4js("tokenAuth");
const jwtSecret = "j_act_TokenSecret"; // token secret

export default {
  setToken(userInfo: any) {
    let token = jwt.sign({ userInfo: userInfo }, jwtSecret, {
      expiresIn: "15d"
    });
    return token;
  },

  /**
   * 用户token验证
   * @param {koa.ParameterizedContext} ctx
   * @param {() => Promise<any>} next
   */
  async auth(ctx: ParameterizedContext, next: Next) {
    if (ctx.url.indexOf('/api/login') === 0 || ctx.url.indexOf('/api/logout') === 0 || ctx.url.indexOf('/api/') !== 0) {
      return next();
    }

    //检查cookie或者post的信息或者url查询参数或者头信息
    const token =
      ctx.cookies.get(CookiesName.TOKEN) ||
      ctx.request.body.token ||
      ctx.query.token ||
      ctx.headers["x-access-token"];
    const username = ctx.cookies.get(CookiesName.USERNAME) || ctx.request.body.operator || ctx.query.username;

    // 解析 token
    if (token) {
      // 确认token
      const decoded = jwt.verify(token, jwtSecret) as any;
      logger.debug(decoded)
      if (decoded.userInfo.username !== username) {
        logger.info("TOKEN AUTH ERROR");
        ctx.cookies.set(CookiesName.USERNAME, '', {
          expires: new Date(Date.now() - 1000)
        });
        ctx.cookies.set(CookiesName.TOKEN, '', {
          expires: new Date(Date.now() - 1000)
        });
        Util.resHandler(ctx, {
          isSuccess: false,
          msg: "TOKEN AUTH ERROR"
        }, 203);
      } else {
        // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
        ctx.username = username;
        ctx.userId = decoded.userInfo.id;
        // let userInfo = decoded.userInfo;

        // 检测权限是否有修改
        // todo...

        return next();
      }
    } else {
      // 如果没有token，则返回错误
      logger.info("no token");
      ctx.cookies.set(CookiesName.USERNAME, '', {
        expires: new Date(Date.now() - 1000)
      });
      ctx.cookies.set(CookiesName.TOKEN, '', {
        expires: new Date(Date.now() - 1000)
      });
      Util.resHandler(ctx, {
        isSuccess: false,
        msg: "请登录"
      }, 203);
    }
  }
};
