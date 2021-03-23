import React, { Suspense } from 'react';
import { Router } from 'react-router-dom';
import Loading from './components/Loading';
import Routes from './routes';
import history from '@/plugins/history';

import './App.scss';

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading height="100vh" />}>
      <Router history={history}>
        <Routes />
      </Router>
    </Suspense>
  );
}

export default App;
