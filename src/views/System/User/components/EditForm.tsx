import React, { useContext, useEffect } from 'react';
import { Form, Input, message, Modal, Select } from 'antd';
import { Context } from '@/Store';
import { UserApi } from '@/api';

interface IProps {
  editData: any;
  onClose: () => void;
  onFresh: () => void;
}

const FormItem = Form.Item;
const { Option } = Select;

const EditForm: React.FC<IProps> = props => {
  const { dispatch } = useContext(Context);
  const [form] = Form.useForm();
  const {editData} = props;

  const onSubmit = async () => {
    const values = await form.validateFields().catch(_ => Promise.resolve(null));
    if (!values) {
      return;
    }

    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });
    try {
      if (editData) {
        await UserApi.updateUser({
          id: editData.id,
          ...values,
        });
        message.success('修改成功');
      } else {
        await UserApi.createUser({
          ...values,
        });
        message.success('已添加');
      }
      props.onClose();
      props.onFresh();
    } catch (e) {
      console.error('[onSubmit]', e);
      message.error(`${editData ? '修改' : '添加'}失败: ${e}`);
    }
    dispatch({
      type: 'SET_LOADING',
      payload: false,
    });
  }

  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
    }
  }, [editData, form]);

  return (
    <Modal
      visible
      title={editData ? '修改' : '添加用户'}
      maskClosable={false}
      onCancel={props.onClose}
      onOk={onSubmit}
    >
      <Form
        size="middle"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <FormItem
          name="username"
          label="用户名"
          rules={[
            { required: true, message: '请输入' },
          ]}
        >
          <Input placeholder="用户名" disabled={!!editData} />
        </FormItem>
        <FormItem
          name="is_admin"
          label="角色"
          rules={[
            { required: true, message: '请选择' },
          ]}
        >
          <Select
            placeholder="请选择"
          >
            <Option value={0}>普通用户</Option>
            <Option value={1}>超级管理员</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  )
}

export default EditForm;