const koa = require('koa');
const fs = require('fs');
const logger = require('../../util/log4js')('redirect');
const axios = require('axios');
// import axios from 'axios';

const env = process.env.NODE_ENV || 'production';
const isDev = env === 'development';

const originImagesPath = '/data/web/jodoinc/member/uploadfile/';

module.exports = {
  /**
   * @param {koa.ParameterizedContext} ctx
   * @param {() => Promise<any>} next
   */
  async getRedirectImage (ctx, next) {
    const path = ctx.path;
    const imageTypeMatch = path.match(/\.(png|jpg|jpeg|gif)/);

    // if (path.indexOf('/member/uploadfile') === 0) {
    //   path = '/j_redirect' + path;
    // }

    if (/*path.indexOf(/j_redirect/) !== 0 || */!imageTypeMatch) {
      return next();
    }

    let image = null;

    if (isDev) {
      const serverUrl = 'http://www.jodoinc.com';

      image = await axios({
        url: serverUrl + path.replace('/j_redirect', ''),
        method: 'get',
        responseType: 'stream'
      })
        .then(res => Promise.resolve(res.data))
        .catch(e => Promise.resolve(null));
    } else {
      const imagePath = originImagesPath + path.replace('/member/uploadfile/', '');

      if (fs.existsSync(imagePath)) {
        try {
          image = fs.readFileSync(imagePath);
        } catch (e) {}
      }
    }

    const imageType = imageTypeMatch && imageTypeMatch[1] || null;

    ctx.status = image ? 200 : 404;
    image && (
      ctx.body = image,
      imageType && (ctx.type = `image/${imageType}`)
    );

    image = null;
  },

  /**
   * @param {koa.ParameterizedContext} ctx
   * @param {() => Promise<any>} next
   */
  async adminRedirect (ctx) {
    const adminUrl = 'http://jodoadmin.jodoinc.com/admin.php';
    const search = '?c=login&m=index&backurl=http%253A%252F%252Fjodoadmin.jodoinc.com%252Fadmin.php'; // ctx.search

    ctx.response.redirect(adminUrl + search);
  }
}