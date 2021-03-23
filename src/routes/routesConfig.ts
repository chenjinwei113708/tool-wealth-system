import { lazy } from 'react';

export interface IRoute {
  exact?: boolean;
  hidden?: boolean;
  component?: React.ComponentType;
  children?: IRoute[];
  name: string;
  title: string;
  path: string;
}

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
        name: '404',
        title: '404',
        path: '*',
        component: lazy(() => import(/* webpackChunkName: "404" */ '../views/Error/404')),
      }
    ]
  }
]

export default Routes;