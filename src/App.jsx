import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Form, Input, Select, Modal } from 'antd';
import _ from 'lodash';

import { apiSubmitForm, apiCreateOrder } from './backend/api'
import { loadRazorpay } from './shared/loadRazorpay'
import ListPlayer from './components/ListPlayer'

var rzp;

const App = () => {

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFill = () => {
    form.setFieldsValue({
      choiceno: "10", contact: "7506988717", email: "jay416505@gmail.com",
      full_name: "Jayambar Harer", skill: "Bowling", tshirtsize: "L (40 inch)"
    });
  };

  const saveFormdetails = async (mergedResp) => {
    const resp = await apiSubmitForm(mergedResp);
    if (resp.status === 200) {
      toast.success("Success form submit")
    } else {
      toast.error("Failed form submit")
    }
  }

  const handlePayment = async (values, order) => {
    const loaded = await loadRazorpay()

    if (!loaded) {
      alert('Razorpay SDK failed to load')
      return
    }
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order["amount"],
      currency: 'INR',
      name: 'HPL Paymet',
      description: 'Player admission fees',
      order_id: order["id"],
      prefill: {
        name: values.full_name,
        email: values.email,
        contact: "+91" + values.contact
      },
      theme: {
        color: "#3399cc"
      },
      handler: function (resp) {
        console.log(resp)
      },
    }
    console.log("options", options)
    rzp = new Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', function (resp) {
      console.log("payment failed", resp);
    });

    rzp.on('payment.success', function (resp) {
      console.log("success payment", resp);
      const mergedResp = _.merge({}, values, resp.payload.payment);
      _.set(mergedResp, "payment_id", mergedResp["id"]);
      _.unset(mergedResp, "id");
      console.log(mergedResp);
      toast.success(`Success Payment By ${values.full_name}`)
      saveFormdetails(mergedResp);
    });
  }

  const handleOk = async () => {
    const values = form.getFieldsValue();
    console.log('Player data: ', values);
    const resp = await apiCreateOrder();
    if (resp.status === 200) {
      handlePayment(values, resp.data.order);
    } else {
      console.log(resp)
      toast.error("Failed to create order")
    }
    setIsModalOpen(false);
    form.resetFields();
  };

  const onSkillChange = value => {
    switch (value) {
      case 'batting':
        form.setFieldsValue({ skill: 'Batting' });
        break;
      case 'bowling':
        form.setFieldsValue({ skill: 'Bowling' });
        break;
      case 'allrounder':
        form.setFieldsValue({ skill: 'All-Rounder' });
        break;
      default:
    }
  };

  const onSizeChange = value => {
    switch (value) {
      case 'xs':
        form.setFieldsValue({ tshirtsize: 'XS (34 inch)' });
        break;
      case 's':
        form.setFieldsValue({ tshirtsize: 'S (36 inch)' });
        break;
      case 'l':
        form.setFieldsValue({ tshirtsize: 'L (40 inch)' });
        break;
      case 'xl':
        form.setFieldsValue({ tshirtsize: 'XL (42 inch)' });
        break;
      case '2xl':
        form.setFieldsValue({ tshirtsize: '2XL (44 inch)' });
        break;
      case '3xl':
        form.setFieldsValue({ tshirtsize: '3XL (46 inch)' });
        break;
      case '4xl':
        form.setFieldsValue({ tshirtsize: '4XL (48 inch)' });
        break;
      default:
    }
  };

  const onFinish = (values) => {
    showModal();
  };

  return (
    <div className="mt-10 ms-10">
      <div className="ml-50">Hattiwade Premier League</div>
      <br></br>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="full_name"
          rules={[{ required: true, message: 'Please input your full name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="WhatsApp No"
          name="contact"
          rules={[{ required: true, message: 'Please input your contact' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="skill" label="Skills" rules={[{ required: true }]}>
          <Select
            allowClear
            placeholder="Select skill"
            onChange={onSkillChange}
            options={[
              { label: 'Batting', value: 'batting' },
              { label: 'Bowling', value: 'bowling' },
              { label: 'All-Rounder', value: 'allrounder' },
            ]}
          />
        </Form.Item>

        <Form.Item name="tshirtsize" label="T-Shirt Size" rules={[{ required: true }]}>
          <Select
            allowClear
            placeholder="Select T-Shirt Size"
            onChange={onSizeChange}
            options={[
              { label: 'XS (34 inch)', value: 'xs' },
              { label: 'S (36 inch)', value: 's' },
              { label: 'L (40 inch)', value: 'l' },
              { label: 'XL (42 inch)', value: 'xl' },
              { label: '2XL (44 inch)', value: '2xl' },
              { label: '3XL (46 inch)', value: '3xl' },
              { label: '4XL (48 inch)', value: '4xl' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Choice Number on T-Shirt"
          name="choiceno"
          rules={[{ required: false, message: 'Please input your choice no' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit & Pay
          </Button>
        </Form.Item>
        {/* <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button> */}
      </Form>
      <Modal
        title="Confirm Details and Pay"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p> Email : {form.getFieldValue("email")}</p>
        <p> Full Name : {form.getFieldValue("full_name")}</p>
        <p> WhatsApp No : {form.getFieldValue("contact")}</p>
        <p> Skills : {form.getFieldValue("skill")}</p>
        <p> T-Shirt Size : {form.getFieldValue("tshirtsize")}</p>
        <p> Choice Number on T-Shirt : {form.getFieldValue("choiceno")}</p>
      </Modal>
      <div>
        <ListPlayer></ListPlayer>
      </div>
    </div>
  )
}

export default App
