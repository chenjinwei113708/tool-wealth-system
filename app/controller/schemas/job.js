const db = require('../../lib/db');
const moment = require('moment');

// const env = process.env.NODE_ENV || 'production';

const JOB_TABLE_NAME = 'dr_1_job';
const CATEGORY_TABLE_NAME = 'dr_1_job_category';

const CATEGORY_FIELDS = [
  'id', 'pid', 'pids', '`name`', 'letter', 'dirname', 
  'child', 'childids', '`show`', 'displayorder'
];
const JOB_FIELDS = [
  'id', 'catid', 'title', 'status', 'updatetime', 'displayorder', 
  'renzhiyaoqiu', 'zhaopinwailianjie', 'gangweizhize'
];

module.exports = {
  /**
   * 获取所有顶级目录列表
   * @return {Promise<any[]>}
   */
  async getTopCategories () {
    const list = await db.createQuery({
      query: `
        select ${CATEGORY_FIELDS.join(',')}
        from ?? 
        WHERE pid = 0;
      `,
      params: [CATEGORY_TABLE_NAME]
    }).catch(() => Promise.resolve([]));

    return list;
  },

  /**
   * 获取子目录
   * @param {number} topId 
   * @return {Promise<any[]>}
   */
  async getChildCategories (topId) {
    if (!topId) {
      throw new TypeError('topId cannot be empty');
    }

    const list = await db.createQuery({
      query: `
        select ${CATEGORY_FIELDS.join(',')}
        from ?? 
        WHERE pid = ?
        ORDER BY id;
      `,
      params: [CATEGORY_TABLE_NAME, topId]
    }).catch(() => Promise.resolve([]));

    return list;
  },

  async getJobByCatid (catid) {
    if (!catid) {
      throw new TypeError('catid cannot be empty');
    }

    const jobItem = (await module.exports.getJobByCatids([catid])).pop() || null;

    return jobItem;
  },

  /**
   * 根据catid列表获取job数据
   * @param {number[]} catids 
   * @return {Promise<any[]>}
   */
  async getJobByCatids (catids) {
    if (!catids || !Array.isArray(catids) || !catids.length) {
      return [];
    }

    const list = await db.createQuery({
      query: `
        select ${JOB_FIELDS.join(',')}
        from ?? 
        WHERE catid in ?;
      `,
      params: [JOB_TABLE_NAME, [catids]]
    }).catch(() => Promise.resolve([]));

    list.forEach(item => {
      item.updatetime = moment(item.updatetime * 1000).format('YYYY-MM-DD');
    });

    return list;
  },
}
