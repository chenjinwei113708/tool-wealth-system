import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import App from './App';
// import { Provider } from './Store';

import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';

import './assets/scss/reset.scss';
import './assets/scss/common.scss';
import './assets/scss/rtf.scss';
import './index.css';

// const isDev = process.env.NODE_ENV === 'development'

const Index = () => (
  // <Provider>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  // </Provider>
)

ReactDOM.render(
  <Index/>,
  document.getElementById('root')
);
