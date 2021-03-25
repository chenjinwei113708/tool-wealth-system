const mysql = require("mysql");
const config = require("../../conf/index");
const logger = require("../util/log4js")("db.js");
const pool = mysql.createPool(config.database);
logger.info("数据库环境", config.database);

module.exports = {
  /**
   * 单次数据库连接
   * @param {object} data
   * @param {String} data.query - 数据库语句 变量传'?' 防止mysql注入
   * @param {Array} data.params - 变量数组
   * @return {Promise} - 结果的Promise
   */
  createQuery: ({ query, params }) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          logger.error("创建connection出错", err);
          return reject(err);
        }
        connection.query(query, params, (err, rows) => {
          connection.release();
          if (err) {
            logger.error("数据库操作出错", err);
            return reject(err);
          }
          logger.debug({ query, params }, "数据库操作成功");
          // logger.debug(rows);
          return resolve(rows);
        });
      });
    });
  },
};
