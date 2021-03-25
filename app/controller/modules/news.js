const koa = require('koa');
const logger = require('../../util/log4js')('news');
const Util = require('../../util/util');
const Schemas = require('../schemas');

module.exports = {
  /**
   * @param {koa.ParameterizedContext} ctx
   * @param {() => Promise<any>} next
   */
  async getNewsList (ctx) {
    let { catid, offset, limit, order_prior = 'false' } = ctx.query || {};
    offset = offset - 0 || 0;
    limit = limit - 0 || 5;

    if (!catid) {
      return Util.resHandler(ctx, {
        isSuccess: false,
        msg: 'catid is empty'
      });
    }

    try {
      const list = await Schemas.news.getSummarysByCatId(catid, offset, limit, order_prior === 'true');

      Util.resHandler(ctx, {
        isSuccess: true,
        data: list
      });
    } catch (e) {
      logger.error('[getNewsList]', e);
      return Util.resHandler(ctx, {
        isSuccess: false,
        msg: '503'
      });
    }
  },

  /**
   * @param {koa.ParameterizedContext} ctx
   * @param {() => Promise<any>} next
   */
  async getNewsDetail (ctx) {
    const { id } = ctx.query || {};

    if (!id) {
      return Util.resHandler(ctx, {
        isSuccess: false,
        msg: 'id is empty'
      });
    }

    try {
      const data = await Schemas.news.getNewsById(id - 0);

      data.content && (
        data.content = data.content.replace(/http\:\/\/jodoadmin\.jodoinc\.com/g, '')
      );

      Util.resHandler(ctx, {
        isSuccess: true,
        data
      });
    } catch(e) {
      logger.error('[getNewsDetail]', e);
      return Util.resHandler(ctx, {
        isSuccess: false,
        msg: '503'
      });
    }
  },

  /**
   * @param {koa.ParameterizedContext} ctx
   * @param {() => Promise<any>} next
   */
  async getRelatedNews (ctx) {
    const { id } = ctx.query || {};

    if (!id) {
      return Util.resHandler(ctx, {
        isSuccess: false,
        msg: 'id is empty'
      });
    }

    try {
      const data = await Schemas.news.getRelatedNews(id - 0);

      Util.resHandler(ctx, {
        isSuccess: true,
        data
      });
    } catch(e) {
      logger.error('[getRelatedNews]', e);
      return Util.resHandler(ctx, {
        isSuccess: false,
        msg: '503'
      });
    }
  }
}
