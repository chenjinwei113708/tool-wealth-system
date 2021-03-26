import Util from 'util/util';
import log4js from 'util/log4js';
import http from 'lib/axios';

import Conf from 'conf';

import { Next, ParameterizedContext as Context } from 'koa';
import { CookiesName } from '@/config/common';

const { serverHost } = Conf.network;
const logger = log4js('serverProxy');

export default {
  async getUserGold (ctx: Context) {
    const { userId, appname, pageNumber = 1, pageSize = 20 } = ctx.request.body;

    const resData = await http({
      url: `${serverHost}/user/getByPage`,
      method: 'POST',
      data: {
        params: {
          userId,
          appname,
        },
        pageNumber,
        pageSize,
      }
    });
    ctx.resHandler(resData);
  },

  async updateUserGold (ctx: Context) {
    const { id, leftCash, frozenCash, accumulateCash, accumulateReview } = ctx.request.body;
    if (!id) {
      return ctx.resHandler({
        isSuccess: false,
        msg: '参数有误',
      });
    }

    const resData = await http({
      url: `${serverHost}/user/update`,
      method: 'POST',
      data: {
        ...ctx.request.body,
      }
    });
    ctx.resHandler(resData);
  },

  async getUserCashRecord (ctx: Context) {
    const { userId, appname, pageNumber = 1, pageSize = 20, status, } = ctx.request.body;

    const resData = await http({
      url: `${serverHost}/review/getByPage`,
      method: 'POST',
      data: {
        params: {
          userId,
          appname,
          status: status === undefined ? '' : status + '',
        },
        pageNumber,
        pageSize,
      }
    });
    ctx.resHandler(resData);
  },

  async rejectCashWithdraw (ctx: Context) {
    const { id } = ctx.request.body;
    if (id - 0 !== id - 0) {
      return ctx.resHandler({
        isSuccess: false,
        msg: '参数有误',
      });
    }

    const resData = await http({
      url: `${serverHost}/review/refuse/${id}`,
      method: 'POST',
    });
    ctx.resHandler(resData);
  },

  async resolvetCashWithdraw (ctx: Context) {
    const { id } = ctx.request.body;
    if (id - 0 !== id - 0) {
      return ctx.resHandler({
        isSuccess: false,
        msg: '参数有误',
      });
    }

    const resData = await http({
      url: `${serverHost}/review/access/${id}`,
      method: 'POST',
    });
    ctx.resHandler(resData);
  },
}