import React, { useContext } from 'react';
import { Layout, message, Spin } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Context } from '@/Store';
import { useHistory } from 'react-router-dom';

import { UserApi } from '@/api';

import './index.scss';
import GetInfo from '@/views/GetInfo';

const { Header, Content } = Layout;

const VLayout: React.FC = props => {
  console.log('🚀 ~ props', props);
  const { state, dispatch } = useContext(Context);
  const history = useHistory();

  const logout = () => {
    dispatch({
      type: 'SET_LOADING',
      payload: true
    });

    UserApi.logout()
      .catch(() => {})
      .finally(() => {
        message.success('已退出');
        dispatch({
          type: 'SET_LOADING',
          payload: false
        });
        history.push('/login');
        dispatch({
          type: 'SET_USER_INFO',
          payload: {
            username: '',
            roleId: 0,
            isAdmin: false,
          }
        });
      });
  }

  if (!state.userInfo.username) {
    return <GetInfo/>;
  }

  return (
    <Layout className="layout">
      <div className={`layout_loading ${state.loading ? 'show' : ''}`}>
        <Spin size="large" tip="loading..." />
      </div>

      <Header className="layout_header">
        <div className="layout_header_nav">
          <h1 className="layout_header_title">网赚管理系统</h1>
          {/* <Nav/> */}
        </div>

        <div className="layout_header_user">
          <span className="user_hello">
            <UserOutlined />
            欢迎，{ state.userInfo.username }
          </span>
          <LogoutOutlined className="user_out" title="退出" onClick={logout} />
        </div>
      </Header>

      <Content className="layout_content">
        { props.children }
      </Content>
    </Layout>
  )
}

export default VLayout;
