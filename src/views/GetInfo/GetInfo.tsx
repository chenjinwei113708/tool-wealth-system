import React, { useContext, useEffect, useState } from 'react';
import { Button, Result, Spin } from 'antd';
import { Context } from '@/Store';
import { UserApi } from '@/api';

import './GetInfo.scss';

const GetInfo: React.FC = props => {
  const [isError, setError] = useState(false);
  const { dispatch } = useContext(Context);

  const getInfo = () => {
    setError(false);

    UserApi.getInfo()
      .then(resData => {
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