import React, { useContext, useEffect } from 'react';
import { Form, InputNumber, message, Modal } from 'antd';
import { Context } from '@/Store';
import { WealthUserApi } from '@/api';

interface IProps {
  editData: any;
  onClose: () => void;
  onFresh: () => void;
}

const FormItem = Form.Item;

const EditForm: React.FC<IProps> = props => {
  const { dispatch } = useContext(Context);
  const [form] = Form.useForm();
  const {editData} = props;

  const onSubmit = async () => {
    const values = await form.validateFields().catch(_ => Promise.resolve(null));
    if (!values || !editData) {
      return;
    }

    dispatch({
      type: 'SET_LOADING',
      payload: true,
    });
    try {
      await WealthUserApi.updateUserGold({
        id: editData.id,
        ...values,
      });
      message.success('修改成功');
      props.onClose();
      props.onFresh();
    } catch (e) {
      console.error('[onSubmit]', e);
      message.error(`修改失败: ${e}`);
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
      title="修改用户金币信息"
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
          name="leftCash"
          label="剩余金币"
          rules={[
            { required: true, message: '请输入' },
          ]}
        >
          <InputNumber 
            placeholder="剩余金币" 
            min={0} 
            // precision={0} 
            style={{
              width: '100%',
            }}
          />
        </FormItem>
        <FormItem
          name="frozenCash"
          label="冻结金币"
          rules={[
            { required: true, message: '请输入' },
          ]}
        >
          <InputNumber 
            placeholder="冻结金币" 
            min={0} 
            // precision={0} 
            style={{
              width: '100%',
            }}
          />
        </FormItem>
        <FormItem
          name="accumulateCash"
          label="累计金币"
          rules={[
            { required: true, message: '请输入' },
          ]}
        >
          <InputNumber 
            placeholder="累计金币" 
            min={0} 
            // precision={0} 
            style={{
              width: '100%',
            }}
          />
        </FormItem>
        <FormItem
          name="accumulateReview"
          label="累计提现"
          rules={[
            { required: true, message: '请输入' },
          ]}
        >
          <InputNumber 
            placeholder="累计提现" 
            min={0} 
            // precision={0} 
            style={{
              width: '100%',
            }}
          />
        </FormItem>
      </Form>
    </Modal>
  )
}

export default EditForm;