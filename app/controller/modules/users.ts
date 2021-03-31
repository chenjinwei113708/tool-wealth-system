import Schemas from '../schemas';
import Util from 'util/util';
import log4js from 'util/log4js';
import http from 'lib/axios';
import { CookiesName } from '@/config/common';
import Conf from 'conf';

import { Next, ParameterizedContext as Context } from 'koa';

const logger = log4js('users');
const { ssoCenter } = Conf.network;

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

  async loginAuthMid (ctx: Context, next: Next) {
    if (['/api/login', '/api/logout'].includes(ctx.url)) {
      return next();
    }

    const username = ctx.username;
    if (!username) {
      return Util.resHandler(ctx, {
        isSuccess: false,
        msg: '请登录',
        data: {
          ssoCenter,
        }
      }, 203);
    }

    // 已登录
    const userItem = await Schemas.users.getByUsername(username);
    if (!userItem) {
      return ctx.resHandler({
        isSuccess: false,
        msg: '无登录权限，请联系管理员',
      });
    }
    return next();
  },

  async getUserInfo (ctx: Context) {
    const username = ctx.username;
    if (!username) {
      return ctx.resHandler({
        isSuccess: false,
        msg: 'auth error',
      }, 203);
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

  async adminAuthMid (ctx: Context, next: Next) {
    const username = ctx.username;
    if (!username) {
      return ctx.resHandler({
        isSuccess: false,
        msg: 'auth error',
      }, 203);
    }
    const isAdmin = await Schemas.common.isAdmin(username);
    if (!isAdmin) {
      return ctx.resHandler({
        isSuccess: false,
        msg: '权限不足，请联系管理员',
      }, 403);
    }
    return next();
  },

  async createUser (ctx: Context) {
    const operator = ctx.username;

    const { username, is_admin = 0, role_id } = ctx.request.body;
    if (!username || !(username + '').trim()) {
      return ctx.resHandler({
        isSuccess: false,
        msg: '参数有误',
      });
    }
    if (await Schemas.users.getByUsername(username)) {
      return ctx.resHandler({
        isSuccess: false,
        msg: '用户名已存在',
      });
    }

    const res = await Schemas.users.create({
      username,
      is_admin,
      role_id,
      create_user: operator,
    });

    ctx.resHandler({
      isSuccess: true,
      data: {
        id: res.insertId,
      }
    });
  },

  async updateUser (ctx: Context) {
    const operator = ctx.username;

    const { is_admin = 0, role_id, id } = ctx.request.body;

    const res = await Schemas.users.update(id, {
      is_admin,
      role_id,
      update_user: operator,
    });

    ctx.resHandler({
      isSuccess: true,
    });
  },

  async deleteUser (ctx: Context) {
    const operator = ctx.username;
    const { id } = ctx.request.body;

    await Schemas.users.delete(id);
    ctx.resHandler({
      isSuccess: true,
    });
  },

  async getUserList (ctx: Context) {
    const list = await Schemas.users.getAll();
    ctx.resHandler({
      isSuccess: true,
      data: {
        list,
      }
    });
  },
}