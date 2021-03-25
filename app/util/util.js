/*
 * @Author: Willie Chen
 * @LastEditors  : Willie Chen
 * @Date: 2019-09-30 16:12:38
 * @LastEditTime : 2020-04-21 09:56:05
 * @Description: 工具集
 */

const koa = require('koa');

module.exports = {
  /**
   * 返回值处理
   * @param {koa.ParameterizedContext} ctx
   * @param {object} resData
   * @param {boolean} resData.isSuccess 
   * @param {string} [resData.msg] 自定义返回描述，默认错误是 'error', 成功是 'success'
   * @param {object} [resData.data] json数据
   * @param {number} [statusCode] 状态码，默认200
   */
  resHandler(ctx, resData, statusCode = 200) {
    let json = {
      isSuccess: resData.isSuccess,
      msg: resData.msg || (resData.isSuccess ? 'success' : 'request error')
    };
    if (resData.isSuccess && resData.data != undefined) json.data = resData.data;
    
    ctx.status = statusCode;
    ctx.body = json;
  },
}