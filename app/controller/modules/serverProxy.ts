import Util from 'util/util';
import log4js from 'util/log4js';
import http, { IResponse } from 'lib/axios';
import md5 from 'md5';
import crypto from 'crypto';

import Conf from 'conf';
import { toolCashServerKey, dataServerKey, toolCashServerAesConfig } from '@/config/common';

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

  encodeProxyServerData (data: any) {
    const cipher = crypto.createCipheriv('aes128', toolCashServerAesConfig.key, toolCashServerAesConfig.iv);
    const res = cipher.update(JSON.stringify(data), 'utf8', 'base64') + cipher.final('base64');
    return res;
  },

  decodeProxyServerData (data: string) {
    const decipher = crypto.createDecipheriv('aes128', toolCashServerAesConfig.key, toolCashServerAesConfig.iv);
    const decrypted = decipher.update(data, 'base64', 'utf8') + decipher.final('utf8');
    return JSON.parse(decrypted);
  },

  decodeProxyServerResData (resData: IResponse) {
    resData = {
      ...resData
    };
    if ((typeof resData.data === 'string') && resData.data) {
      try {
        resData.data = this.decodeProxyServerData(resData.data);
      } catch (err) {
        logger.error('[decodeProxyServerResData]', err, resData.data);
      }
    }
    return resData;
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
      timestamp: Date.now(),
    };

    const resData = await http({
      url: `${serverHost}/user/getByPage`,
      headers: AssistFn.createProxyHeader(reqData),
      method: 'POST',
      data: {
        data: AssistFn.encodeProxyServerData(reqData),
      }
    });
    ctx.resHandler(AssistFn.decodeProxyServerResData(resData));
  },

  async queryUserGoldDetail (ctx: Context) {
    const { puid = '', appname = '', userId: userid, pageNumber = 1, pageSize = 20, startDate, endDate } = ctx.request.body;

    ctx.validator(startDate).required().isString().isDate();
    ctx.validator(endDate).required().isString().isDate();
    ctx.validator(puid).isString();
    ctx.validator(appname).isString();
    ctx.validator(userid).required().isString();
    ctx.checkValidator();

    const ts = Date.now();
    const sign = AssistFn.createDataServerSign(ctx.username, ts);

    const resData = await http({
      url: `${dataCodeServerHost}/api/s1/redirect/aliyun/data/sqlQuery/queryByIdWithSign`,
      method: 'POST',
      headers: {
        apiToken: `1513843088526,apiuser,C474C7F63547BF735E49F6A67096A07A`,
      },
      data: {
        id: 176,
        timeStamp: ts,
        variable: [
          { key: 'odps_priority', value: '2' },
          { key: '$startDate', value: startDate },
          { key: '$endDate', value: endDate },
          { key: '$puid', value: puid },
          { key: '$page', value: pageNumber + '' },
          { key: '$size', value: pageSize + '' },
          { key: '$appname', value: appname },
          { key: '$userid', value: userid },
        ],
        queryUser: ctx.username,
        sign,
      }
    });

    ctx.resHandler(resData);
  },

  /**
   * 暂时废弃
   */
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
      timestamp: Date.now(),
    };

    const resData = await http({
      url: `${serverHost}/review/getByPage`,
      headers: AssistFn.createProxyHeader(reqData),
      method: 'POST',
      data: {
        data: AssistFn.encodeProxyServerData(reqData),
      }
    });
    ctx.resHandler(AssistFn.decodeProxyServerResData(resData));
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
      id,
      timestamp: Date.now(),
    };

    const resData = await http({
      url: `${serverHost}/review/refuse`,
      headers: AssistFn.createProxyHeader(reqData),
      method: 'POST',
      data: {
        data: AssistFn.encodeProxyServerData(reqData),
      }
    });
    ctx.resHandler(AssistFn.decodeProxyServerResData(resData));
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
      id,
      timestamp: Date.now(),
    };

    const resData = await http({
      url: `${serverHost}/review/access`,
      headers: AssistFn.createProxyHeader(reqData),
      method: 'POST',
      data: {
        data: AssistFn.encodeProxyServerData(reqData),
      }
    });
    ctx.resHandler(AssistFn.decodeProxyServerResData(resData));
  },
}