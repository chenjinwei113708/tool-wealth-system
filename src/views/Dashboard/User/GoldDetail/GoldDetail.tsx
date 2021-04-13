import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { RouteChildrenProps } from 'react-router-dom';
import moment from 'moment';
import { Button, Form, Input, message, Table, Pagination, DatePicker } from 'antd';

import { WealthUserApi } from '@/api';

import './GoldDetail.scss';

const FormItem = Form.Item;
const { Column } = Table;
const { RangePicker } = DatePicker;

const GoldDetail: React.FC<RouteChildrenProps> = props => {
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [dataList, setDataList] = useState<any[]>([]);

  const [form] = Form.useForm();

  const onPageChange = (page: number) => {
    setPageNumber(page);

    const values = form.getFieldsValue();
    const searchTime: moment.Moment[] = values.searchTime || [];
    getList({
      ...values,
      startDate: (searchTime[0] || moment()).format('yyyy-MM-DD'),
      endDate: (searchTime[1] || moment()).format('yyyy-MM-DD'),
      pageNumber: page,
    });
  }

  const onClickSearch = async (values: any = {}) => {
    console.log(`🚀 ~ onClickSearch ~ values`, values);
    setPageNumber(1);

    const searchTime: moment.Moment[] = values.searchTime || [];
    getList({
      ...values,
      startDate: (searchTime[0] || moment()).format('yyyy-MM-DD'),
      endDate: (searchTime[1] || moment()).format('yyyy-MM-DD'),
      pageNumber: 1,
    });
  }

  const getList = async (data: Parameters<typeof WealthUserApi.getUserGoldDetail>['0']) => {
    setLoading(true);
    try {
      const resData = await WealthUserApi.getUserGoldDetail({
        pageNumber,
        pageSize,
        ...data,
      }) as {
        data: {
          columnPoints: string[][];
          pointHeadMeta: {
            key: string;
            value: any[];
          }[]
        }
      };

      const { columnPoints = [] } = resData.data || {};
      try {
        let total = 0;
        const dataList = columnPoints
          .map(values => {
            total = Math.max(total, values[1] as any - 0 || 0);
            return values[0] && JSON.parse(values[0]);
          })
          .filter(item => item);

        setTotal(total);
        setDataList(dataList);
        console.log(`🚀 ~ getList ~ dataList`, dataList);
      } catch (e) {
        message.error('数据处理失败');
      }
    } catch (e) {
      console.error('[getList]', e);
      message.error('查询失败：' + e);
    }
    setLoading(false);
  }

  return (
    <main className="user_gold_detail">
      <Helmet>
        <title>金币明细 - { window.originTitle }</title>
      </Helmet>

      <Form
        layout="inline"
        form={form}
        onFinish={onClickSearch}
      >
        <FormItem
          name="userId"
          label="用户ID"
          rules={[
            { required: true, message: '请输入' }
          ]}
        >
          <Input placeholder="用户ID" />
        </FormItem>
        <FormItem
          name="puid"
          label="puid"
        >
          <Input placeholder="puid" />
        </FormItem>
        <FormItem
          name="appname"
          label="应用名称"
        >
          <Input placeholder="应用名称" />
        </FormItem>
        <FormItem
          name="searchTime"
          label="查询时间"
          initialValue={[moment().subtract(6, 'days'), moment()]}
          rules={[
            { required: true, message: '请选择' }
          ]}
        >
          <RangePicker
            allowClear={false}
            format="YYYY-MM-DD"
            separator="至"
            ranges={{
              '今天': [moment(), moment()],
              '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
              '过去7天': [moment().subtract(7, 'days'), moment()],
              '过去14天': [moment().subtract(14, 'days'), moment()],
              '过去30天': [moment().subtract(30, 'days'), moment()],
              '上周': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
              '本周': [moment().startOf('week'), moment().endOf('week')],
              '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
              '本月': [moment().startOf('month'), moment()],
            }}
          />
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
        rowKey="change_id"
        bordered
        loading={loading}
        dataSource={dataList}
        pagination={false}
        scroll={{
          x: 'max-content'
        }}
      >
        <Column title="行为" dataIndex="action" key="action" width="160px" />
        <Column title="用户ID" dataIndex="user_id" key="user_id" width="170px" />
        <Column title="应用名称" dataIndex="appname" key="appname" width="160px" />
        <Column title="包名" dataIndex="pn" key="pn" width="160px" />
        <Column title="cgi" dataIndex="cgi" key="cgi" width="110px" />
        {/* <Column title="idfa" dataIndex="idfa" key="idfa" width="180px" /> */}
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
        <Column title="变更金币" dataIndex="coin" key="coin" width="100px" />
        <Column title="变更后金币" dataIndex="after_coin" key="after_coin" width="120px" />
        <Column title="修改时间" dataIndex="time" key="time" width="175px" />
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

export default GoldDetail;