const koa = require('koa');
const logger = require('../../util/log4js')('job');
const Util = require('../../util/util');
const gameData = require('../data/game');

module.exports = {
  /**
   * @param {koa.ParameterizedContext} ctx
   * @param {() => Promise<any>} next
   */
  async getGame (ctx) {
    const { game } = ctx.params || {};
    if (!game) {
      return Util.resHandler(ctx, {
        isSuccess: false,
        msg: '游戏名不能为空'
      });
    }

    const data = gameData[game];
    if (!data) {
      return Util.resHandler(ctx, {
        isSuccess: false,
        msg: '该游戏名不存在'
      });
    }

    Util.resHandler(ctx, {
      isSuccess: true,
      data
    });
  }
}