/*
 * @Author: Willie Chen
 * @LastEditors: Willie Chen
 * @Date: 2019-09-30 16:12:38
 * @LastEditTime: 2021-03-31 11:18:11
 * @Description: 工具集
 */

import { ParameterizedContext } from 'koa';
import jwt from 'jsonwebtoken'; // 用来创建和确认用户信息摘要
import md5 from 'md5';
import { jwtPublicKey, jwtSecret } from '@/config/common';

const isDev = process.env.NODE_ENV === 'development';

export interface IResData {
  msg?: string;
  data?: any;
  isSuccess: boolean;
}

export default {
  /**
   * 返回值处理
   * @param ctx
   * @param {object} resData
   * @param {boolean} resData.isSuccess 
   * @param {string} [resData.msg] 自定义返回描述，默认错误是 'error', 成功是 'success'
   * @param {object} [resData.data] json数据
   * @param {number} [resData.dataVersion] dataVersion
   * @param {number} [statusCode] 状态码，默认200
   */
  resHandler (ctx: ParameterizedContext, resData: IResData, statusCode = 200) {
    const json = {
      ...resData,
      isSuccess: resData.isSuccess,
      msg: resData.msg || (resData.isSuccess ? 'success' : 'request error'),
    };
    if (resData.isSuccess && resData.data != undefined) {
      json.data = resData.data;
    }
    
    ctx.status = statusCode;
    ctx.body = json;
  },

  getRandomInt (min = 0, max = 10) {
    if (min - 0 !== min || max - 0 !== max || min > max) {
      return 0;
    }
    return (Math.random() * (max - min + 1) + min) | 0;
  },

  getRandomFloat (min = 0, max = 1, decimal = 2) {
    if (min - 0 !== min || max - 0 !== max || min > max) {
      return 0;
    }
    const res = Math.random() * (max - min) + min;
    return (res as any).toFixed(decimal) - 0;
  },

  createUuid () {
    return Math.random().toString(36).substring(2) + ((new Date()).getTime() + ((Math.random() * 10 | 0) << 24)).toString(36);
  },

  filterUndefined (obj: {[key: string]: any}) {
    if (!obj) {
      return obj;
    }
    return Object.keys(obj)
      .filter(key => obj[key] !== undefined)
      .reduce((newObj, key) => (
        newObj[key] = obj[key],
        newObj
      ), {} as {[key: string]: any});
  },

  setToken(userInfo: any, expiresIn: string | number = '15d') {
    const token = jwt.sign({ userInfo: userInfo }, jwtSecret, {
      expiresIn,
    });
    return token;
  },

  decodeSSOToken (token: string) {
    if (!token) {
      throw new jwt.JsonWebTokenError('token 为空');
    }
    const decode = jwt.verify(token, jwtPublicKey, { algorithms: ['RS256'] });
    return decode as any;
  },
}