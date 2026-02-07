import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { authCheckerLoadSuccess } from "../backend/authCheckerSlice"

const USERNAME = "hbsdbhh"
const PASSWORD = "jhb12454"

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = async (values) => {
        console.log("Login Values:", values);
        if (values.username === USERNAME && values.password == PASSWORD) {
            dispatch(authCheckerLoadSuccess())
            localStorage.setItem("isAuth", "true");
            navigate("/players")
        }
    };

    return (
        <Card style={{ width: 350, margin: "100px auto" }}>
            <h2 style={{ textAlign: "center" }}>Admin Login</h2>

            <Form onFinish={onFinish}>
                <Form.Item
                    name="username"
                    rules={[
                        { required: true, message: "Please enter username" },
                        { min: 3, message: "Minimum 3 characters" },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined />}
                        placeholder="Username"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: "Please enter password" },
                        { min: 6, message: "Minimum 6 characters" },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
                    />
                </Form.Item>

                <Button type="primary" htmlType="submit" block>
                    Login
                </Button>
            </Form>
        </Card>
    );
};

export default LoginPage;


// import { Navigate, useLocation } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const auth = useSelector((state) => state.auth.auth);
//   const location = useLocation();

//   if (!auth) {
//     return <Navigate to="/" state={{ from: location }} />;
//   }

//   return children;
// };

