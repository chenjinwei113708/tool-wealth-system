import Util from 'util/util';
import log4js from 'util/log4js';
import http from 'lib/axios';
import md5 from 'md5';

import Conf from 'conf';
import { toolCashServerKey, dataServerKey } from '@/config/common';

import { Next, ParameterizedContext as Context } from 'koa';

const { serverHost, dataCodeServerHost } = Conf.network;
const logger = log4js('serverProxy');

const AssistFn = {
  createProxyHeader (data: any) {
    // 对对象的key进行排序
    const sortObj = (obj: any): any => {
      if (Object.prototype.toString.call(obj) === '[object Object]') {
        return Object.keys(obj)
          .sort((a, b) => a > b ? 1 : -1)
          .reduce((o, key) => (
            o[key] = obj[key] && (typeof obj[key] === 'object') ? sortObj(obj[key]) : obj[key],
            o
          ), {} as any);
      } else if (Array.isArray(data)) {
        return data.reduce((arr, item) => (
          arr.push(item && (typeof item === 'object') ? sortObj(item) : item),
          arr
        ), [] as any[])
      } else {
        return obj;
      }
    }

    data = JSON.stringify(sortObj(data)) + `&secret=${toolCashServerKey}`;
    logger.debug('serverProxy createProxyHeader ~ data', data);
    const sign = md5(data);
    return {
      'admin-authentication': sign,
    }
  },

  createDataServerSign (username: string, timestamp: string | number) {
    return md5(`${username},${timestamp},${dataServerKey}`).toUpperCase();
  },
}

export default {
  async getUserGold (ctx: Context) {
    const { userId, appname, pageNumber = 1, pageSize = 20 } = ctx.request.body;

    const reqData = {
      params: {
        userId,
        appname,
      },
      pageNumber,
      pageSize,
    };

    const resData = await http({
      url: `${serverHost}/user/getByPage`,
      headers: AssistFn.createProxyHeader(reqData),
      method: 'POST',
      data: reqData
    });
    ctx.resHandler(resData);
  },

  async queryUserGoldDetail (ctx: Context) {
    const { puid = '', appname = '', userId: userid, pageNumber = 1, pageSize = 20, startDate, endDate } = ctx.request.body;

    ctx.validator(startDate).required().isString().isDate();
    ctx.validator(endDate).required().isString().isDate();
    ctx.validator(puid).isString();
    ctx.validator(appname).isString();
    ctx.validator(userid).required().isString().isEmpty();
    ctx.checkValidator();

    const ts = Date.now();

    const resData = await http({
      url: `${dataCodeServerHost}/data/sqlQuery/queryByIdWithSign`,
      method: 'POST',
      data: {
        id: 176,
        timeStamp: ts,
        variable: [
          { key: 'odps_priority', value: '2' },
          { key: '$startDate', value: startDate },
          { key: '$endDate', value: endDate },
          { key: '$puid', value: puid },
          { key: '$page', value: pageNumber },
          { key: '$size', value: pageSize },
          { key: '$appname', value: appname },
          { key: '$userid', value: userid },
        ],
        queryUser: ctx.username,
        sign: AssistFn.createDataServerSign(ctx.username, ts),
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

    const reqData = ctx.request.body;

    const resData = await http({
      url: `${serverHost}/user/update`,
      headers: AssistFn.createProxyHeader(ctx.username),
      method: 'POST',
      data: reqData
    });
    ctx.resHandler(resData);
  },

  async getUserCashRecord (ctx: Context) {
    const { userId, appname, pageNumber = 1, pageSize = 20, status, } = ctx.request.body;

    const reqData = {
      params: {
        userId,
        appname,
        status: status === undefined ? '' : status + '',
      },
      pageNumber,
      pageSize,
    };

    const resData = await http({
      url: `${serverHost}/review/getByPage`,
      headers: AssistFn.createProxyHeader(reqData),
      method: 'POST',
      data: reqData
    });
    ctx.resHandler(resData);
  },

  async rejectCashWithdraw (ctx: Context) {
    const { id } = ctx.request.body;
    if (!id) {
      return ctx.resHandler({
        isSuccess: false,
        msg: '参数有误',
      });
    }

    const reqData = {
      id
    };

    const resData = await http({
      url: `${serverHost}/review/refuse`,
      headers: AssistFn.createProxyHeader(reqData),
      method: 'POST',
      data: reqData
    });
    ctx.resHandler(resData);
  },

  async resolvetCashWithdraw (ctx: Context) {
    const { id } = ctx.request.body;
    if (!id) {
      return ctx.resHandler({
        isSuccess: false,
        msg: '参数有误',
      });
    }

    const reqData = {
      id
    };

    const resData = await http({
      url: `${serverHost}/review/access`,
      headers: AssistFn.createProxyHeader(reqData),
      method: 'POST',
      data: reqData,
    });
    ctx.resHandler(resData);
  },
}