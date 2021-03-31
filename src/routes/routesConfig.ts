import { lazy } from 'react';
import { UserOutlined, SettingOutlined, TagsOutlined } from '@ant-design/icons';

export interface IRoute {
  exact?: boolean;
  hidden?: boolean;
  meta?: {
    icon?: React.ComponentType;
    [key: string]: any;
  };
  component?: React.ComponentType<any>;
  children?: IRoute[];
  auth?: string;
  redirect?: string;
  parent?: string;
  name: string;
  title: string;
  path: string;
}

export const MainRoutes: IRoute[] = [
  {
    name: 'user',
    title: '用户信息',
    path: '/user',
    component: lazy(() => import(/* webpackChunkName: "dashboard-user" */ '../views/Dashboard/User')),
    meta: {
      icon: UserOutlined,
    },
    children: [
      {
        hidden: true,
        exact: true,
        name: 'user-index',
        title: 'user-index',
        path: '/user',
        redirect: '/user/gold_search',
      },
      {
        name: 'user-gold-search',
        title: '金币查询',
        path: '/user/gold_search',
        component: lazy(() => import(/* webpackChunkName: "gold-search" */ '../views/Dashboard/User/GoldSearch')),
      },
      {
        name: 'user-gold-detail',
        title: '金币明细',
        path: '/user/gold_detail',
        component: lazy(() => import(/* webpackChunkName: "gold-detail" */ '../views/Dashboard/User/GoldDetail')),
      }
    ]
  },
  {
    name: 'cash',
    title: '提现管理',
    path: '/cash',
    component: lazy(() => import(/* webpackChunkName: "dashboard-cash" */ '../views/Dashboard/Cash')),
    meta: {
      icon: TagsOutlined,
    },
    children: [
      {
        hidden: true,
        exact: true,
        name: 'cash-index',
        title: 'cash-index',
        path: '/cash',
        redirect: '/cash/verify',
      },
      {
        name: 'cash-verify',
        title: '提现审核',
        path: '/cash/verify',
        component: lazy(() => import(/* webpackChunkName: "cash-verify" */ '../views/Dashboard/Cash/Verify')),
      },
      {
        name: 'cash-record',
        title: '提现记录',
        path: '/cash/record',
        component: lazy(() => import(/* webpackChunkName: "cash-record" */ '../views/Dashboard/Cash/Record')),
      },
    ]
  }
]

export const AdminRoutes: IRoute[] = [
  {
    name: 'system',
    title: '系统管理',
    path: '/system',
    parent: 'index',
    auth: 'system',
    component: lazy(() => import(/* webpackChunkName: "system" */ '../views/System')),
    meta: {
      icon: SettingOutlined,
    },
    children: [
      {
        name: 'system-user',
        title: '用户管理',
        path: '/system/user',
        component: lazy(() => import(/* webpackChunkName: "system-user" */ '../views/System/User')),
      }
    ]
  }
]

const Routes: IRoute[] = [
  {
    exact: true,
    hidden: true,
    name: 'login',
    title: '登录',
    path: '/login',
    component: lazy(() => import(/* webpackChunkName: "login" */ '../views/Login')),
  },
  {
    exact: true,
    hidden: true,
    name: '403',
    title: '403',
    path: '/403',
    component: lazy(() => import(/* webpackChunkName: "403" */ '../views/Error/403')),
  },
  {
    hidden: true,
    name: 'index',
    title: 'index',
    path: '/',
    component: lazy(() => import(/* webpackChunkName: "layout" */ '../layout')),
    children: [
      {
        hidden: true,
        exact: true,
        name: 'home',
        title: 'home',
        path: '/',
        component: lazy(() => import(/* webpackChunkName: "home" */ '../views/Dashboard/Home')),
      },
      ...MainRoutes,
      {
        hidden: true,
        name: '404',
        title: '404',
        path: '*',
        component: lazy(() => import(/* webpackChunkName: "404" */ '../views/Error/404')),
      }
    ]
  }
]

export default Routes;