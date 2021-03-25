const koa = require('koa');
const logger = require('../../util/log4js')('job');
const Util = require('../../util/util');
const Schemas = require('../schemas');

const AssistFn = {
  /**
   * 获取 jobs 相关
   * @param {'0' | '1'} type 0 社招 1 校招
   */
  async getJobs (type = '0') {
    const name = type === '0' ? '社会招聘' : '校园招聘';
    const dirname = type === '0' ? 'shehuizhaopin' : 'xiaoyuanzhaopin';

    const topCategories = await Schemas.job.getTopCategories();
    const socialCat = topCategories.find(item => item.name === name || item.dirname === dirname);

    if (!socialCat) {
      return {
        categories: [],
        jobs: []
      };
    }

    const childCategories = await Schemas.job.getChildCategories(socialCat.id);
    const jobs = await Schemas.job.getJobByCatids(childCategories.map(item => item.id));

    return {
      categories: childCategories,
      jobs,
    };
  }
};

module.exports = {
  /**
   * @param {koa.ParameterizedContext} ctx
   * @param {() => Promise<any>} next
   */
  async getJobs (ctx) {
    const { type = '0' } = ctx.query;
    if (!['0', '1'].includes(type)) {
      return Util.resHandler(ctx, {
        isSuccess: false,
        msg: '参数错误'
      });
    }

    try {
      const data = await AssistFn.getJobs(type);

      Util.resHandler(ctx, {
        isSuccess: true,
        data,
      });
    } catch (e) {
      logger.error('[getSocialJobs]', e);
      return Util.resHandler(ctx, {
        isSuccess: false,
        msg: '503'
      });
    }
  }
};
