import Schemas from '../schemas';
import Util from 'util/util';
import log4js from 'util/log4js';
import http from 'lib/axios';

import { ParameterizedContext as Context } from 'koa';
import { CookiesName } from '@/config/common';

const logger = log4js('users');

export default {
  async login (ctx: Context) {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      return ctx.resHandler({
        isSuccess: false,
        msg: '缺少用户名或密码',
      });
    }

    const loginUrl = 'http://api.outer.ldap.jodoplay.com/auth';
    const resData = await http({
      url: loginUrl,
      method: 'POST',
      data: {
        username,
        password,
      },
      headers: {
        "Connection": "keep-alive",
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    if (!resData.isSuccess) {
      return ctx.resHandler(resData);
    }

    // 登录成功
    const userItem = await Schemas.users.getByUsername(username);
    if (!userItem) {
      return ctx.resHandler({
        isSuccess: false,
        msg: '无登录权限，请联系管理员',
      });
    }

    const token = Util.setToken({
      username,
      id: userItem.id,
    });

    ctx.cookies.set(CookiesName.USERNAME, username, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
      httpOnly: true,
    }); // 设置cookie
    ctx.cookies.set(CookiesName.TOKEN, token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
      httpOnly: true,
    }); // 设置cookie

    ctx.resHandler({
      isSuccess: true,
      data: {
        username,
        isAdmin: userItem.is_admin === 1,
        roleId: userItem.role_id,
      }
    });
  },

  /**
   * 退出
   */
  async logout(ctx: Context) {
    const username = ctx.cookies.get(CookiesName.USERNAME);
    if (!username) {
      return Util.resHandler(ctx, {
        isSuccess: false,
        msg: "???",
      }, 403);
    }

    logger.debug(username);
    ctx.cookies.set(CookiesName.USERNAME, '', {
      expires: new Date(Date.now() - 1000)
    });
    ctx.cookies.set(CookiesName.TOKEN, '', {
      expires: new Date(Date.now() - 1000)
    });

    Util.resHandler(ctx, {
      isSuccess: true,
      msg: "已退出登录",
      data: {
        msg: "已退出登录",
      }
    });
  },

  async getUserInfo (ctx: Context) {
    const username = ctx.cookies.get(CookiesName.USERNAME);
    if (!username) {
      return ctx.resHandler({
        isSuccess: false,
        msg: 'auth error',
      });
    }

    const userItem = await Schemas.users.getByUsername(username);
    if (!userItem) {
      return ctx.resHandler({
        isSuccess: false,
        msg: '用户不存在',
      });
    }

    ctx.resHandler({
      isSuccess: true,
      data: {
        username,
        isAdmin: userItem.is_admin === 1,
        roleId: userItem.role_id,
      }
    })
  },
}