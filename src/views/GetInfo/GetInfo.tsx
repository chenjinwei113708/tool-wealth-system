import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Result, Spin } from 'antd';
import { Context } from '@/Store';
import { UserApi } from '@/api';

import './GetInfo.scss';

const GetInfo: React.FC = props => {
  const [isError, setError] = useState(false);
  const { dispatch } = useContext(Context);
  const location = useLocation();
  const history = useHistory();

  const getInfo = () => {
    setError(false);

    const searchParams = new URLSearchParams(location.search);

    UserApi.getInfo({
      token: searchParams.get('token') || '',
      username: searchParams.get('username') || '',
    })
      .then(resData => {
        const searchParams = new URLSearchParams(location.search)
        searchParams.delete('token');
        searchParams.delete('username');
        searchParams.delete('expireAt');
        history.replace({
          search: searchParams.toString(),
        });
        dispatch({
          type: 'SET_USER_INFO',
          payload: resData
        });
      })
      .catch(e => {
        console.error('[getInfo]', e);
        setError(true);
      });
  }

  useEffect(() => {
    getInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="get_info">
      {
        isError ? (
          <Result
            status="500"
            title="Error"
            subTitle="获取信息中出现了一些错误"
            extra={<Button type="primary" onClick={getInfo}>点击重试</Button>}
          />
        ) : (
          <Spin tip="加载中..." />
        )
      }
    </div>
  )
}

export default GetInfo;