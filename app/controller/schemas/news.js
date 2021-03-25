const db = require('../../lib/db');
const moment = require('moment');

const env = process.env.NODE_ENV || 'production';

const NEWS_TABLE_NAME = 'dr_1_news';
const THUMB_TABLE_NAME = 'dr_attachment_1';
const CONTENT_TABLE_NAME = 'dr_1_news_data_0';

module.exports = {
  /**
   * 根据目录ID获取摘要目录
   * @param {number} catid 
   * @return {Promise<any[]>}
   */
  async getSummarysByCatId (catid, offset = 0, limit = 5, isOrderPrior = false) {
    if (!catid) {
      throw new TypeError('catid cannot be empty');
    }

    // const urlPrefix = env === 'development' ? '//test.jodoinc.com/' : '//www.jodoinc.com/';
    // const urlPrefix = '/j_redirect/';
    const urlPrefix = '/';

    let order = '';
    if (isOrderPrior) {
      order = 'displayorder ASC,';
    }

    const list = await db.createQuery({
      query: `
        select id, catid, title, thumb, keywords, description, hits, updatetime
        from ?? 
        WHERE catid=? 
        ORDER BY ${order} updatetime desc
        LIMIT ?, ?;
      `,
      params: [NEWS_TABLE_NAME, catid, offset - 0, limit - 0]
    }).catch(() => Promise.resolve([]));

    // 查找 thumb 信息
    const thumbList = await module.exports.getThumbByIds(list.map(item => item.thumb));
    const thumbMap = thumbList.reduce((obj, item) => (
      obj[item.id] = item,
      obj
    ), {});

    list.forEach(item => {
      item.updatetime = moment(item.updatetime * 1000).format('YYYY-MM-DD');
      const thumbItem = thumbMap[item.thumb];
      if (thumbItem) {
        item.thumbUrl = thumbItem.remote ? thumbItem.attachment : (urlPrefix + thumbItem.attachment);
      }
    });

    return list;
  },

  /**
   * 根据id获取缩略图
   * @param {number[]} ids 
   * @return {Promise<any[]>}
   */
  async getThumbByIds (ids) {
    if (!ids || !ids.length) {
      return Promise.resolve([]);
    }

    const list = await db.createQuery({
      query: `
        select *
        from ?? 
        WHERE id in ?;
      `,
      params: [THUMB_TABLE_NAME, [ids]]
    }).catch(() => Promise.resolve([]));

    return list;
  },

  /**
   * 获取新闻
   * @param {number} id 
   */
  async getNewsById (id) {
    if (!id) {
      throw new TypeError('id cannot be empty');
    }

    const list = await db.createQuery({
      query: `
        select id, catid, title, thumb, keywords, description, hits, updatetime
        from ?? 
        WHERE id = ? LIMIT 1;
      `,
      params: [NEWS_TABLE_NAME, id]
    }).catch(() => Promise.resolve([]));

    const newsItem = list.pop() || null;

    if (!newsItem) {
      return null;
    }

    newsItem.updatetime = moment(newsItem.updatetime * 1000).format('YYYY-MM-DD');

    const content = await module.exports.getNewsContentById(id);

    await module.exports.addNewsHits(id);

    newsItem.content = (content || {}).content;

    return newsItem;
  },

  /**
   * 获取新闻内容
   * @param {number} id 
   */
  async getNewsContentById (id) {
    if (!id) {
      throw new TypeError('id cannot be empty');
    }

    const list = await db.createQuery({
      query: `
        select *
        from ?? 
        WHERE id = ? LIMIT 1;
      `,
      params: [CONTENT_TABLE_NAME, id]
    }).catch(() => Promise.resolve([]));

    return list.pop() || null;
  },

  /**
   * 获取相关新闻
   * @param {number} id 
   */
  async getRelatedNews (id) {
    if (!id) {
      throw new TypeError('id cannot be empty');
    }

    const tlist = await db.createQuery({
      query: `
        select *
        from ?? 
        WHERE id = ? LIMIT 1;
      `,
      params: [NEWS_TABLE_NAME, id]
    }).catch(() => Promise.resolve([]));

    const newsItem = tlist.pop() || null;

    if (!newsItem) {
      return [];
    }

    const newsList = await module.exports.getSummarysByCatId(newsItem.catid);

    return newsList.filter(item => item.id !== newsItem.id).slice(0, 4);
  },

  /**
   * 阅读量+1
   * @param {number} id 
   */
  async addNewsHits (id) {
    if (!id) {
      return false;
    }

    try {
      await db.createQuery({
        query: `UPDATE ?? SET hits = hits + 1 WHERE id = ?;`,
        params: [NEWS_TABLE_NAME, id]
      });

      return true;
    } catch (e) {
      return false;
    }
  }
}
