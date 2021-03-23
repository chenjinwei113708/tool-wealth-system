import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import { Helmet } from 'react-helmet';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import md5 from 'md5';
import { Context } from '@/Store';

import './Login.scss';
import { UserApi } from '@/api';

const Login: React.FC = (props) => {
  const [username, setUsername] = useState('');
  const [psw, setPsw] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(Context);

  const history = useHistory();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !psw) {
      message.error('请输入用户名/密码');
      return;
    }

    setLoading(true);

    UserApi.login({
      username,
      password: md5(psw),
    })
      .then(resData => {
        message.success('登录成功');
        dispatch({
          type: 'SET_USER_INFO',
          payload: resData
        });

        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get('redirect');
        const url = redirectUrl && !['/', '/404'].includes(redirectUrl) ? decodeURIComponent(redirectUrl) : '/';
        history.push(url);
      })
      .catch(e => {
        setLoading(false);
        message.error(e + '');
      })
  }

  return (
    <div className="v_login">
      <Helmet>
        <title>登录</title>
      </Helmet>

      <div className="login_content">
        <div className="login_left">
          <svg 
            enableBackground="new 0 0 300 302.5" 
            version="1.1" 
            viewBox="0 0 300 302.5" 
            xmlns="http://www.w3.org/2000/svg"
            style={{
              height: 40,
              width: 'auto',
            }}
          >
            <path className="st01"
              d="m126 302.2c-2.3 0.7-5.7 0.2-7.7-1.2l-105-71.6c-2-1.3-3.7-4.4-3.9-6.7l-9.4-126.7c-0.2-2.4 1.1-5.6 2.8-7.2l93.2-86.4c1.7-1.6 5.1-2.6 7.4-2.3l125.6 18.9c2.3 0.4 5.2 2.3 6.4 4.4l63.5 110.1c1.2 2 1.4 5.5 0.6 7.7l-46.4 118.3c-0.9 2.2-3.4 4.6-5.7 5.3l-121.4 37.4zm63.4-102.7c2.3-0.7 4.8-3.1 5.7-5.3l19.9-50.8c0.9-2.2 0.6-5.7-0.6-7.7l-27.3-47.3c-1.2-2-4.1-4-6.4-4.4l-53.9-8c-2.3-0.4-5.7 0.7-7.4 2.3l-40 37.1c-1.7 1.6-3 4.9-2.8 7.2l4.1 54.4c0.2 2.4 1.9 5.4 3.9 6.7l45.1 30.8c2 1.3 5.4 1.9 7.7 1.2l52-16.2z" />
          </svg>
        </div>
        <div className="login_form_wrap">
          <h1 className="login_title">Login</h1>
          <p className="login_tip">欢迎 !</p>

          <form className="login_form" onSubmit={onSubmit}>
            <div className="form_item">
              <input 
                type="text" 
                name="username" 
                id="username" 
                className="item_input" 
                placeholder="用户名" 
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <label htmlFor="username" className="item_label">用户名：</label>
              <div className="item_icon_wrap">
                <UserOutlined className="item_icon" />
              </div>
            </div>

            <div className="form_item">
              <input 
                type="password" 
                name="password" 
                id="password" 
                className="item_input" 
                placeholder="密码" 
                value={psw}
                onChange={e => setPsw(e.target.value)}
              />
              <label htmlFor="password" className="item_label">密码：</label>
              <div className="item_icon_wrap">
                <LockOutlined className="item_icon" />
              </div>
            </div>

            <div className="login_btn_wrap">
              <button type="submit" className={`login_btn ${loading ? 'disabled' : ''}`}>
                {
                  loading ? <LoadingOutlined className="login_btn_loading" /> : null
                }
                Log in
              </button>
            </div>
          </form>

          <p className="login_add_tip">
            <b>提示：</b><br/>
            账号同wiki账号
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;