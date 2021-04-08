import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Form, Input, message, Table, Pagination, Popconfirm } from 'antd';
import { CashStatusMap } from '../config';

import { WealthUserApi } from '@/api';

const FormItem = Form.Item;
const { Column } = Table;

const CashVerify: React.FC = props => {
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [dataList, setDataList] = useState<any[]>([]);

  const [form] = Form.useForm();

  const onClickResolve = async (item: any) => {
    if (!item) {
      return;
    }
    setLoading(true);
    try {
      await WealthUserApi.resolveUserCashRecord({ id: item.id });
      message.success('已通过');
    } catch (e) {
      console.error('[onClickResolve]', e);
      message.error('操作失败：' + e);
    }
    getList(form.getFieldsValue());
  }

  const onClickReject = async (item: any) => {
    if (!item) {
      return;
    }
    setLoading(true);
    try {
      await WealthUserApi.rejectUserCashRecord({ id: item.id });
      message.success('已拒绝');
    } catch (e) {
      console.error('[onClickReject]', e);
      message.error('操作失败：' + e);
    }
    getList(form.getFieldsValue());
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
      const resData = await WealthUserApi.getUserCashRecord({
        pageNumber,
        pageSize,
        ...data,
        status: 1,
      });
      setTotal(resData.totalCount);
      setDataList(resData.list);
    } catch (e) {
      console.error('[getList]', e);
      message.error('查询失败：' + e);
    }
    setLoading(false);
  }

  useEffect(() => {
    getList({});
    // eslint-disable-next-line
  }, [])

  return (
    <main className="">
      <Helmet>
        <title>提现审核 - { window.originTitle }</title>
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
            disabled={loading}
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
        <Column title="id" dataIndex="id" key="id" width="110px" />
        <Column title="用户ID" dataIndex="userId" key="userId" width="160px" />
        <Column title="应用名称" dataIndex="appname" key="appname" width="180px" />
        <Column title="包名" dataIndex="pn" key="pn" width="160px" />
        <Column title="cgi" dataIndex="cgi" key="cgi" width="110px" />
        <Column title="idfa" dataIndex="idfa" key="idfa" width="160px" />
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
        <Column title="类型" dataIndex="itemName" key="itemName" width="140px" />
        <Column 
          title="状态" 
          dataIndex="status" 
          key="status" 
          width="130px" 
          render={(value) => (
            <span>
              {(CashStatusMap as any)[value] || value}
            </span>
          )}
        />
        <Column title="提现金币数" dataIndex="frozenCash" key="frozenCash" width="100px" />
        <Column 
          title="提现金额/元" 
          dataIndex="reviewCash" 
          key="reviewCash"
          width="130px" 
          render={(text) => (
            text / 100 || 0
          )}
        />
        <Column 
          title="商户订单号" 
          dataIndex="partnerTradeNo" 
          key="partnerTradeNo" 
          width="160px" 
          render={ value => 
            <p style={{ width: 160, wordBreak: 'break-all' }} title={value}>{value}</p> 
          } 
        />
        <Column 
          title="微信付款单号" 
          dataIndex="paymentNo" 
          key="paymentNo" 
          width="160px" 
          render={ value => 
            <p style={{ width: 160, wordBreak: 'break-all' }} title={value}>{value}</p> 
          } 
        />
        <Column 
          title="支付时间" 
          dataIndex="paymentTime" 
          key="paymentTime" 
          width="170px" 
          render={ value => 
            <p className="ellipsis" style={{ width: 170 }} title={value}>{value}</p> 
          } 
        />
        <Column title="创建时间" dataIndex="createTime" key="createTime" width="175px" />
        <Column title="修改时间" dataIndex="updateTime" key="updateTime" width="175px" />
        <Column 
          title="操作" 
          dataIndex="ctrl" 
          key="ctrl" 
          width="140px" 
          fixed="right" 
          render={(value, record) => (<>
            <Popconfirm
              placement="topRight"
              title="确认通过？"
              onConfirm={() => { onClickResolve(record) }}
            >
              <Button 
                size="small" 
                type="primary" 
                style={{
                  marginRight: 10,
                }}
              >
                通过
              </Button>
            </Popconfirm>
            <Popconfirm
              placement="topRight"
              title="确认拒绝？"
              onConfirm={() => { onClickReject(record) }}
            >
              <Button size="small" type="primary" danger>拒绝</Button>
            </Popconfirm>
          </>)}
        />
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
    </main>
  )
}

export default CashVerify;