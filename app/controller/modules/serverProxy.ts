import Util from 'util/util';
import log4js from 'util/log4js';
import http from 'lib/axios';

import Conf from 'conf';

import { Next, ParameterizedContext as Context } from 'koa';
import { CookiesName } from '@/config/common';

const { serverHost } = Conf.network;

export default {
  async getUserGold (ctx: Context) {
    const { userId, appname, pageNumber = 1, pageSize = 20 } = ctx.request.body;

    const resData = await http({
      url: `${serverHost}/user/getByPage`,
      method: 'POST',
      data: {
        page: {
          params: {
            userId,
            appname,
          },
          pageNumber,
          pageSize,
        }
      }
    });
    ctx.resHandler(resData);
  },
}