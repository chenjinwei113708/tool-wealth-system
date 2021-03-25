const Router = require('koa-router');
const Util = require('./util/util');
const ctrl = require('./controller');

const router = new Router();

router.get('/api/test', async (ctx, next) => {
  Util.resHandler(ctx, {
    isSuccess: true,
    data: {
      msg: 'ok'
    },
    msg: 'ok'
  });
});

// // 新闻相关
// router.get('/api/getNewsList', ctrl.news.getNewsList);
// router.get('/api/getNewsDetail', ctrl.news.getNewsDetail);
// router.get('/api/getRelatedNews', ctrl.news.getRelatedNews);

// // 招聘相关
// router.get('/api/getJobs', ctrl.job.getJobs);

// // 游戏相关
// router.get('/api/getGame/:game', ctrl.game.getGame);

// // redirect
// router.get('/j_redirect/*', ctrl.redirect.getRedirectImage);
// router.get('/member/uploadfile/*', ctrl.redirect.getRedirectImage);
// router.get('/admin.php', ctrl.redirect.adminRedirect);

module.exports = router;
