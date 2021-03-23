import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '@/Store';

// components
import { Layout, message, Spin, Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import GetInfo from '@/views/GetInfo';

// config
import { IRoute, MainRoutes } from '@/routes/routesConfig';

// api
import { UserApi } from '@/api';

// d.ts
import { MenuClickEventHandler } from 'rc-menu/lib/interface';

// style
import './index.scss';

const { Header, Content, Sider } = Layout;
const { SubMenu, Item: MenuItem } = Menu;

const VLayout: React.FC = props => {
  const [selectKeys, setSelectKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
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

  const onClickItem: MenuClickEventHandler = (params) => {
    console.log(params)
    history.push(params.key + '');
    setSelectKeys([params.key + '']);
  }

  const renderMenu = (routes: IRoute[]) => (
    routes.map(route => (
      route.children 
        ? (
          <SubMenu
            key={route.path}
            title={route.title}
            icon={route.meta?.icon && React.createElement(route.meta?.icon)}
          >
            { renderMenu(route.children) }
          </SubMenu>
        )
        : (
          <MenuItem
            key={route.path}
          >
            { route.title }
          </MenuItem>
        )
    ))
  )

  useEffect(() => {
    const path = history.location.pathname;
    if (path && path !== '/') {
      setSelectKeys([path]);
      const orginPath = path.split('/')[1];
      orginPath && setOpenKeys([`/${orginPath}`]);
    }
  }, [history]);

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
        </div>

        <div className="layout_header_user">
          <span className="user_hello">
            <UserOutlined />
            欢迎，{ state.userInfo.username }
          </span>
          <LogoutOutlined className="user_out" title="退出" onClick={logout} />
        </div>
      </Header>

      <Layout className="layout_content">
        <Sider
          width={220}
          collapsible
          className="layout_sider"
        >
          <Menu
            theme="dark"
            mode="inline"
            className="layout_sider_menu"
            defaultSelectedKeys={selectKeys}
            defaultOpenKeys={openKeys}
            onClick={onClickItem}
          >
            { renderMenu(MainRoutes) }
          </Menu>
        </Sider>

        <Content className="layout_main">
          { props.children }
        </Content>
      </Layout>
    </Layout>
  )
}

export default VLayout;
