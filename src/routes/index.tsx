import React, { Suspense, useContext, useEffect, useMemo, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Context } from '@/Store';
import RoutesConfig, { IRoute, AdminRoutes } from './routesConfig';
import Loading from '@/components/Loading';

const renderRoutes = (routes: IRoute[]) => (
  <Switch>
    {
      routes.map(route => (route.redirect ? 
        <Redirect 
          key={route.name + route.path} 
          exact={route.exact} 
          from={route.path} 
          to={route.redirect} 
        />
        :
        <Route
          key={route.name + route.path}
          path={route.path}
          exact={route.exact}
        >
          {
            (props: any = {}) => !route.children 
              ? React.createElement(route.component || 'div', props) 
              : (
                React.createElement(route.component || 'div', props, (
                  <Suspense fallback={<Loading/>}>
                    { renderRoutes(route.children) }
                  </Suspense>
                ))
              )
          }
        </Route>
      ))
    }
  </Switch>
);

const Routes: React.FC = props => {
  const [routes, setRoutes] = useState<IRoute[]>(RoutesConfig);
  const { state } = useContext(Context);

  useEffect(() => {
    if (state.userInfo.isAdmin) {
      const routeList = RoutesConfig.slice();
      AdminRoutes.forEach(item => {
        const index = RoutesConfig.findIndex(r => r.name === item.parent);
        if (~index) {
          routeList[index] = {
            ...RoutesConfig[index],
            children: [
              item,
              ...(RoutesConfig[index].children || []),
            ]
          }
        } else {
          routeList.push(item);
        }
      });
      setRoutes(routeList);
    } else {
      setRoutes(RoutesConfig);
    }
  }, [state.userInfo])

  return useMemo(() => renderRoutes(routes), [routes]);
}

export default Routes;