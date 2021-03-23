import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import '../404/index.scss';

const NotFound: React.FC = () => (
  <div className="notfound">
    <Helmet>
      <title>403</title>
    </Helmet>
    <h3 className="notfound-title">403</h3>
    <p>
      暂无权限，请联系管理员
      <br/>
      返回
      <Link to="/" className="notfound-home">
        首页
      </Link>
      继续浏览
    </p>
  </div>
);

export default NotFound;
