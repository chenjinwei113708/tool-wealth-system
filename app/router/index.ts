import Router from 'koa-router';
import ctrl from '@/controller';

const router = new Router();

router.all('/api/test', ctrl.system.test);

// 用户账户相关
// router.post('/api/login', ctrl.login.login);
// router.post('/api/logout', ctrl.login.logout);

// 放在最后，404
router.all('/api/*', ctrl.system.notFound);

export default router;