import React, { useState } from 'react';
import {Button, Modal, Form, message, Input} from 'antd';
import {API_ROOT} from '../../_helpers/set_root.js';
import axios from 'axios';
const {TextArea} = Input;

const SendTreat = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
   const showModal = () => {
     setIsModalOpen(true);
   };
   const handleOk = () => {
     setIsModalOpen(false);
   };
   const handleCancel = () => {
     setIsModalOpen(false);
   };

   const onFinish = (values) => {
      let msg = {
        to: props.user.email,
        from: 'platform@canvaspad.org',
        subject: `You have a message from your therapist!`,
        html: `<p>${values.treat}</p>`,
        text: `${values.treat}`
      }
      axios.post(`${API_ROOT}/send/email`, msg).then((val) => {
        handleOk()
        message.success('Treat successfully sent');
      })
        .catch((err) => {
          message.error('Something went wrong. Contact Dr.Simone@Canvaspad.org if this persists.')
        })
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
   return (
     <>
       <Button className="button-primary" onClick={showModal}>
         Send Treat
       </Button>
       <Modal title="Send Treat" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
       <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout={"vertical"}
        >
          <Form.Item
            label={`What do you want to tell ${props.user.firstName}?`}
            layout={"vertical"}
            name="treat"
            rules={[
              {
                required: true,
                message: 'Please input your treat',
              },
            ]}
          >
            <TextArea rows={3} size="large"/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="button-tertiary" style={{ width: "100% !important" }}>
              Send Now!
            </Button>
          </Form.Item>
        </Form>
       </Modal>
     </>
   );
}



export default SendTreat;
