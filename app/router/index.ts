import Router from 'koa-router';
import ctrl from '@/controller';

const router = new Router();

router.all('/api/test', ctrl.system.test);

router.all('/api/*', ctrl.users.loginAuthMid);

// 用户账户相关
router.post('/api/login', ctrl.users.login);
router.post('/api/logout', ctrl.users.logout);
router.post('/api/user/info', ctrl.users.getUserInfo);

// 用户管理
router.post('/api/user/create', ctrl.users.adminAuthMid, ctrl.users.createUser);
router.post('/api/user/update', ctrl.users.adminAuthMid, ctrl.users.updateUser);
router.post('/api/user/delete', ctrl.users.adminAuthMid, ctrl.users.deleteUser);
router.post('/api/user/list', ctrl.users.adminAuthMid, ctrl.users.getUserList);

// 网赚用户相关
router.post('/api/wealth/user/gold', ctrl.serverProxy.getUserGold);
router.post('/api/wealth/user/gold/detail', ctrl.serverProxy.queryUserGoldDetail);
router.post('/api/wealth/user/gold/update', ctrl.serverProxy.updateUserGold);
router.post('/api/wealth/user/cash', ctrl.serverProxy.getUserCashRecord);
router.post('/api/wealth/user/cash/withdraw/reject', ctrl.serverProxy.rejectCashWithdraw);
router.post('/api/wealth/user/cash/withdraw/resolve', ctrl.serverProxy.resolvetCashWithdraw);

// 放在最后，404
router.all('/api/*', ctrl.system.notFound);

export default router;