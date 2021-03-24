import { lazy } from 'react';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';

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
        name: 'user-gold-search',
        title: '金币查询',
        path: '/user/gold_search',
        component: lazy(() => import(/* webpackChunkName: "gold-search" */ '../views/Dashboard/User/GoldSearch')),
        meta: {
          auth: '',
          a: 1,
        }
      }
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