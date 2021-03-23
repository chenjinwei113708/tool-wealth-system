import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '@/Store';

// components
import { Helmet } from 'react-helmet';
import { Layout, message, Spin, Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import GetInfo from '@/views/GetInfo';

// config
import { IRoute, MainRoutes, AdminRoutes } from '@/routes/routesConfig';

// api
import { UserApi } from '@/api';

// d.ts
import { MenuClickEventHandler } from 'rc-menu/lib/interface';

// style
import './index.scss';

const { Header, Content, Sider } = Layout;
const { SubMenu, Item: MenuItem } = Menu;

const VLayout: React.FC = props => {
  const [routes, setRoutes] = useState<IRoute[]>(MainRoutes);
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
    // console.log(params)
    // history.push(params.key + '');
    setSelectKeys([params.key + '']);
    // const orginPath = params.keyPath[1] || (params.key + '').split('/')[1];
    // orginPath && setOpenKeys([`/${orginPath}`]);
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
            <Link to={route.path}>
              { route.title }
            </Link>
          </MenuItem>
        )
    ))
  )

  const menu = useMemo(() => (
    <Menu
      theme="dark"
      mode="inline"
      className="layout_sider_menu"
      selectedKeys={selectKeys}
      defaultOpenKeys={openKeys}
      onClick={onClickItem}
    >
      { renderMenu(routes) }
    </Menu>
    // eslint-disable-next-line
  ), [selectKeys, openKeys, routes])

  useEffect(() => {
    const path = history.location.pathname;
    if (path && path !== '/') {
      setSelectKeys([path]);
      const orginPath = path.split('/')[1];
      orginPath && setOpenKeys([`/${orginPath}`]);
    }
  }, [history]);

  useEffect(() => {
    if (state.userInfo.isAdmin) {
      setRoutes([...MainRoutes, ...AdminRoutes]);
    } else {
      setRoutes(MainRoutes);
    }
  }, [state.userInfo])

  if (!state.userInfo.username) {
    return <GetInfo/>;
  }

  return (
    <Layout className="layout">
      <Helmet>
        <title>网赚管理系统</title>
      </Helmet>
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
          { menu }
        </Sider>

        <Content className="layout_main">
          { props.children }
        </Content>
      </Layout>
    </Layout>
  )
}

export default VLayout;
