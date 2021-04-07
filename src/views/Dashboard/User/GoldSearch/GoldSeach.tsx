import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { RouteChildrenProps } from 'react-router-dom';
import { Button, Form, Input, message, Table, Pagination } from 'antd';
import EditForm from './components/EditForm';

import { WealthUserApi } from '@/api';

const FormItem = Form.Item;
const { Column } = Table;

const GoldSeach: React.FC<RouteChildrenProps> = props => {
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [dataList, setDataList] = useState<any[]>([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const [form] = Form.useForm();

  // const onClickEdit = (item: any) => {
  //   if (!item) {
  //     return;
  //   }
  //   setEditData(item);
  //   setShowEditForm(true);
  // }

  const onEditFormClose = () => {
    setShowEditForm(false);
    setEditData(null);
  }

  const onEditFormFinish = () => {
    getList({
      ...form.getFieldsValue(),
    });
  }

  const onPageChange = (page: number) => {
    setPageNumber(page);
    getList({
      ...form.getFieldsValue(),
      pageNumber: page,
    });
  }

  const onClickSearch = async (values: any = {}) => {
    setPageNumber(1);
    getList({
      ...values,
      pageNumber: 1,
    });
  }

  const getList = async (data: { 
    userId?: 
    string, appname?: 
    string, pageNumber?: number, 
    pageSize?: number 
  }) => {
    setLoading(true);
    try {
      const resData = await WealthUserApi.getUserGold({
        pageNumber,
        pageSize,
        ...data,
      });
      setTotal(resData.totalCount);
      setDataList(resData.list);
    } catch (e) {
      console.error('[getList]', e);
      message.error('查询失败：' + e);
    }
    setLoading(false);
  }

  return (
    <main className="user_gold_search">
      <Helmet>
        <title>金币查询 - { window.originTitle }</title>
      </Helmet>

      <Form
        layout="inline"
        form={form}
        onFinish={onClickSearch}
        style={{
          marginBottom: 15,
        }}
      >
        <FormItem
          name="userId"
          label="用户ID"
        >
          <Input placeholder="用户ID" allowClear />
        </FormItem>
        <FormItem
          name="appname"
          label="应用名称"
        >
          <Input placeholder="应用名称" />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
          >
            查询
          </Button>
        </FormItem>
      </Form>

      <Table
        className="table"
        size="small"
        rowKey="id"
        bordered
        loading={loading}
        dataSource={dataList}
        pagination={false}
        scroll={{
          x: 'max-content'
        }}
      >
        <Column title="id" dataIndex="id" key="id" width="200px" />
        <Column title="用户ID" dataIndex="userId" key="userId" width="150px" />
        <Column title="应用名称" dataIndex="appname" key="appname" width="160px" />
        <Column title="包名" dataIndex="pn" key="pn" width="160px" />
        <Column title="cgi" dataIndex="cgi" key="cgi" width="110px" />
        <Column title="idfa" dataIndex="idfa" key="idfa" width="180px" />
        <Column title="puid" dataIndex="puid" key="puid" width="140px" />
        <Column 
          title="操作系统" 
          dataIndex="os" 
          key="os" 
          width="80px" 
          render={ value => 
            <p className="ellipsis" style={{ width: 80 }} title={value}>{value}</p> 
          } 
        />
        <Column title="SDK版本" dataIndex="sdkVersion" key="sdkVersion" width="80px" />
        <Column title="剩余金币" dataIndex="leftCash" key="leftCash" width="110px" />
        <Column title="冻结金币" dataIndex="frozenCash" key="frozenCash" width="100px" />
        <Column title="累计获得金币" dataIndex="accumulateCash" key="accumulateCash" width="130px" />
        <Column title="累计提现" dataIndex="accumulateReview" key="accumulateReview" width="110px" />
        <Column title="创建时间" dataIndex="createTime" key="createTime" width="175px" />
        <Column title="修改时间" dataIndex="updateTime" key="updateTime" width="175px" />
        {/* <Column 
          title="操作" 
          dataIndex="ctrl" 
          key="ctrl" 
          width="100px" 
          fixed="right" 
          render={(value, record) => (<>
            <Button size="small" type="primary" onClick={() => { onClickEdit(record) }}>修改</Button>
          </>)}
        /> */}
      </Table>

      <div className="paginationDiv">
        <Pagination
          current={pageNumber}
          pageSize={pageSize}
          total={total}
          showTotal={total => `共 ${total} 条数据`}
          onChange={onPageChange}
        />
      </div>

      {
        showEditForm ? (
          <EditForm
            editData={editData}
            onClose={onEditFormClose}
            onFresh={onEditFormFinish}
          />
        ) : null
      }
    </main>
  )
}

export default GoldSeach;