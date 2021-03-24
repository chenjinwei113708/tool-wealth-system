import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button, message, Popconfirm, Table } from 'antd';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import EditForm from './components/EditForm';

import { UserApi } from '@/api';

import './User.scss';

const { Column } = Table;

const SystemUser: React.FC = props => {
  const [dataList, setDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const onEditFormClose = () => {
    setShowEditForm(false);
    setEditData(null);
  }

  const onClickEdit = (item: any) => {
    if (!item) {
      return;
    }
    setEditData(item);
    setShowEditForm(true);
  }

  const onClickDelete = async (item: any) => {
    if (!item) {
      return;
    }

    setLoading(true);
    try {
      await UserApi.deleteUser({ id: item.id });
      message.success('已删除');
      setLoading(false);
      getUserList();
    } catch (e) {
      setLoading(false);
      console.error('[SystemUser onClickDelete]', e);
      message.error('删除失败：' + e);
    }
  }

  const getUserList = async () => {
    setLoading(true);
    try {
      const resData = await UserApi.getUserList();
      setDataList(resData.list);
    } catch (e) {
      console.error('[getUserList]', e);
      message.error('获取失败：' + e);
    }
    setLoading(false);
  }

  useEffect(() => {
    getUserList();
  }, [])

  return (
    <main className="system_user">
      <Helmet>
        <title>用户管理_系统管理 - { window.originTitle }</title>
      </Helmet>

      <div className="ctrl">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowEditForm(true)}>添加</Button>
        <Button type="primary" icon={<SyncOutlined />} onClick={getUserList}>刷新</Button>
      </div>

      <Table
        className="table"
        size="small"
        rowKey="id"
        bordered
        loading={loading}
        dataSource={dataList}
        pagination={{
          pageSize: 50,
          hideOnSinglePage: true,
        }}
      >
        <Column title="id" dataIndex="id" key="id" width="100px" />
        <Column title="用户名" dataIndex="username" key="username" />
        <Column 
          title="是否超管" 
          dataIndex="is_admin" 
          key="is_admin" 
          width="150px" 
          render={(value, record) => (
            value === 1 ? '是' : '否'
          )}
        />
        <Column title="创建时间" dataIndex="create_time" key="create_time" width="200px" />
        <Column title="修改时间" dataIndex="update_time" key="update_time" width="200px" />
        <Column 
          title="操作" 
          dataIndex="ctrl" 
          key="ctrl" 
          width="200px" 
          render={(value, record) => (<>
            <Button size="small" type="primary" onClick={() => { onClickEdit(record) }}>修改</Button>
            <Popconfirm
              placement="bottomRight"
              title="确认删除？"
              onConfirm={() => { onClickDelete(record) }}
            >
              <Button size="small">删除</Button>
            </Popconfirm>
          </>)}
        />
      </Table>

      {
        showEditForm ? (
          <EditForm
            editData={editData}
            onClose={onEditFormClose}
            onFresh={getUserList}
          />
        ) : null
      }
    </main>
  )
}

export default SystemUser;