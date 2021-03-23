import React, { Suspense, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import RoutesConfig, { IRoute } from './routesConfig';
import Loading from '@/components/Loading';

const renderRoutes = (routes: IRoute[]) => (
  <Switch>
    {
      routes.map(route => (
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
  return useMemo(() => renderRoutes(RoutesConfig), []);
}

export default Routes;