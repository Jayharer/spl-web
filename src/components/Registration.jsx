import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Form, Input, Select, Modal, Upload, Spin, Checkbox, ConfigProvider } from 'antd';
import _ from 'lodash';
import { UploadOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux'
import { listCouponLoadFlow } from '../backend/listCouponSlice'

import { apiSubmitForm, apiCreateOrder, apiSaveFile, apiUpdateCoupon } from '../backend/api'
import { loadRazorpay } from '../shared/loadRazorpay'
import AppTitleBar from './AppTitleBar';
import TermsAndCondition from './TermsAndCondition'

var rzp;

const Registration = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [loading, setLoading] = useState(false);
    const [couponData, setCouponData] = useState({ click: false, code: "", used: false });
    const couponList = useSelector((state) => state.coupon.couponList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listCouponLoadFlow());
    }, [dispatch])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setOpenModel(false);
    };

    const onFill = () => {
        form.setFieldsValue({
            choiceno: "10", contact: "7506988717",
            full_name: "Jayambar Harer", skill: "Bowling", tshirtsize: "L (40 inch)"
        });
    };

    const saveFormdetails = async (mergedResp, formData) => {
        const resp1 = await apiSaveFile(formData);
        if (resp1.status === 200) {
            mergedResp = { ...mergedResp, filename: resp1.data.file_name };
            const resp2 = await apiSubmitForm(mergedResp);
            if (resp2.status === 200) {
                toast.success("Success form submit")
                _.unset(couponData, "click");
                if (couponData.used) {
                    const resp3 = await apiUpdateCoupon(couponData);
                    if (resp3.status === 200) {
                        toast.success("Success coupon DB updated")
                    } else {
                        toast.error("Failed coupon DB updated")
                    }
                }
            } else {
                toast.error("Failed form submit")
            }
        } else {
            toast.error("Failed to save photo")
        }
    }

    const handlePayment = async (values, order, formData) => {
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
                email: "jay416505@gmail.com",
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
            toast.success(`Success Payment By ${values.full_name}`)
            const mergedResp = _.merge({}, values, resp.payload.payment);
            _.set(mergedResp, "payment_id", mergedResp["id"]);
            _.unset(mergedResp, "id");
            console.log(mergedResp);
            saveFormdetails(mergedResp, formData);
        });
    }

    const handleSubmit = async () => {
        const email = uuidv4();
        var values = form.getFieldsValue();
        values = { ...values, email: email }
        if (!couponData.used)
            _.unset(values, "couponcode");
        const file = values.aadharid[0]?.originFileObj;
        console.log("file", file)
        const formData = new FormData();
        formData.append("file", file);
        _.unset(values, "aadharid");
        _.unset(values, "terms");
        if (couponData.used === true) {
            setLoading(true)
            setIsModalOpen(false);
            await saveFormdetails(values, formData);
            form.resetFields();
            setCouponData(prevData => ({ ...prevData, click: false }));
            setLoading(false)
            return;
        }

        const resp = await apiCreateOrder();
        if (resp.status === 200) {
            handlePayment(values, resp.data.order, formData);
        } else {
            console.log(resp)
            toast.error("Failed to create order")
        }
        setIsModalOpen(false);
        form.resetFields();
        setCouponData(prevData => ({ ...prevData, click: false }));
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

    const CheckCodeApply = (e) => {
        const coupon_code = form.getFieldValue("couponcode");
        setCouponData(prevData => ({ ...prevData, click: true }));
        const applied_coupon = couponList.find(cp => cp.code === coupon_code && cp.used === false);
        if (applied_coupon && !applied_coupon.used) {
            setCouponData(prevData => ({ ...prevData, used: true, code: coupon_code }));
        } else {
            setCouponData(prevData => ({ ...prevData, used: false, code: "" }));
        }
    };

    const couponStatus = () => {
        if (couponData.click && couponData.used)
            return <CheckCircleOutlined style={{ fontSize: '25px' }}
                className="bg-green-300 rounded-full mt-1" />
        if (couponData.click && !couponData.used)
            form.resetFields(["couponcode"]);
        return <div></div>
    }

    return (
        <Spin spinning={loading} size="large">
            <div className="mt-10 ms-20" style={{ minHeight: 200 }}>
                <AppTitleBar />
                <div className="mt-5">
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
                        {/* <Form.Item
                        label="Email"
                        name="email"

                        rules={[{ required: true, message: 'Please input your email' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item> */}

                        <Form.Item
                            label="Full Name"
                            name="full_name"
                            rules={[{ required: true, message: 'Please input your full name' }]}
                        >
                            <Input
                                onChange={(e) => {
                                    form.setFieldsValue({
                                        full_name: e.target.value.toUpperCase(),
                                    });
                                }}
                                placeholder="Full Name" />
                        </Form.Item>

                        <Form.Item
                            label="WhatsApp No"
                            name="contact"
                            rules={[
                                { required: true, message: "Please enter phone number" },
                                {
                                    pattern: /^[6-9]\d{9}$/,
                                    message: "Enter valid 10 digit mobile number",
                                },
                            ]}
                        >
                            <Input maxLength={10} placeholder="Contact No" />
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
                            label="Photo: "
                            name="aadharid"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => {
                                if (Array.isArray(e)) return e;
                                return e?.fileList;
                            }}
                            rules={[{ required: true, message: 'Please upload Aadhar photo ID' }]}
                        >
                            <Upload
                                listType="picture"
                                maxCount={1}
                                beforeUpload={(file) => {
                                    const isImage =
                                        file.type === "image/jpeg" ||
                                        file.type === "image/png" ||
                                        file.type === "image/jpg";
                                    if (!isImage) {
                                        toast.warning("Only JPG/PNG/JPEG files allowed");
                                        return Upload.LIST_IGNORE;
                                    }
                                    console.log("file.size", file.size)
                                    const isLt5M = (file.size / 1024) < 1024.0;
                                    console.log("isLt5M", isLt5M)
                                    if (!isLt5M) {
                                        console.log("ok")
                                        toast.warning("Image must be smaller than 1MB");
                                        return Upload.LIST_IGNORE;
                                    }
                                    return false;
                                }}
                            >
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label="Choice Number"
                            name="choiceno"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your choice no',
                                }
                            ]}
                        >
                            <Input placeholder="Choice No on T-Shirt" />
                        </Form.Item>

                        <Form.Item
                            label="Coupon Code"
                            name="couponcode"
                            rules={[{ required: false, message: 'CODE' }]}
                        >
                            <div className="flex">
                                <Input placeholder="COUPON CODE" />
                                <Button color="purple" variant="solid" className="ml-3 mr-3" onClick={CheckCodeApply}>Apply</Button>
                                <div>{couponStatus()}</div>
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="Terms & Conditions"
                            name="terms"
                            valuePropName="checked"   // 🔥 IMPORTANT
                            rules={[
                                {
                                    required: true,
                                    validator: (_, value) =>
                                        value
                                            ? Promise.resolve()
                                            : Promise.reject("You must accept terms"),
                                },
                            ]}
                        >
                            <div className="ml-20">
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            controlInteractiveSize: 20,   // bigger box
                                            colorPrimary: "#7c3aed",
                                            colorBorder: "#7c3aed",          // 🔥 outline border
                                            borderRadiusSM: 4,               // rounded corner
                                            controlOutline: "#ddd6fe",       // tick color
                                        },
                                    }}
                                >
                                    <Checkbox style={{
                                        fontSize: 16,
                                        color: "#360113f", width: "50px"
                                    }} > </Checkbox>
                                </ConfigProvider>
                                <Button onClick={() => setOpenModel(true)}>
                                    Show Terms</Button>
                            </div>
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
                </div>
                <Modal
                    title="Confirm and Pay"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    footer={[
                        <div style={{ textAlign: "right" }} key="key1">
                            <Button type="primary" onClick={handleSubmit}>
                                Submit
                        </Button>
                        </div>,
                    ]}
                    onCancel={handleCancel} >
                    <p> Full Name : {form.getFieldValue("full_name")}</p>
                    <p> WhatsApp No : {form.getFieldValue("contact")}</p>
                    <p> Skills : {form.getFieldValue("skill")}</p>
                    <p> T-Shirt Size : {form.getFieldValue("tshirtsize")}</p>
                    <p> Choice Number on T-Shirt : {form.getFieldValue("choiceno")}</p>
                </Modal>
                <Modal
                    title="Terms & Conditions"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={openModel}
                    footer={[]}
                    onCancel={handleCancel} >
                    <TermsAndCondition />
                </Modal>
            </div>
        </Spin>
    )
}

export default Registration;

// const resp = await apiSaveFile(formData);
// console.log(resp)
// if (resp.status === 200) {
//     toast.success("File upload success")
// } else {
//     console.log(resp)
//     toast.error("File upload failed")
// }
