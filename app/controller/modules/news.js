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
  },
}
